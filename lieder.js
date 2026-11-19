"use strict";
// Deutsch-App v0.5: 🎵 Şarkılarla öğrenme. Hazır şarkılar (melodi tarayıcıda sentezlenir, hece hece karaoke)
// + "Kendi şarkım" (kullanıcının ses dosyası ve sözleri; yalnız bu cihazda saklanır).
// app.js'ten sonra yüklenir; onun S, SKILLS, begin, wordEx, checkText... tanımlarını kullanır.
(function () {
  const LIEDER = window.LIEDER || [];
  S.lieder = S.lieder || {}; S.mySongs = S.mySongs || [];
  SKILLS.sarki = "Şarkı"; S.stats.sarki = Object.assign({ c: 0, t: 0, half: 0, pas: 0 }, S.stats.sarki);
  // Şarkı kelimeleri genel kelime havuzuna girer: karışık tekrarda ve sonraki ünitelerde geri gelir.
  for (const s of LIEDER) for (const w of s.words || []) if (!wordByDe(w.de)) ALLWORDS.push(Object.assign({ unit: "lied:" + s.id }, w));

  const plain = l => l.de.replace(/\|/g, "");
  const clean = t => t.replace(/[.,!?:;]/g, "").replace(/\s+/g, " ").trim();
  const songById = id => LIEDER.find(s => s.id === id) || S.mySongs.find(s => s.id === id);
  const isMine = s => !!s.mine;
  const lState = id => (S.lieder[id] = S.lieder[id] || {});

  // ---------- melodi (WebAudio) ----------
  let ctx = null, nodes = [], timers = [], lrate = 1, segAudio = null, segTimer = 0;
  const myUrls = {};
  function freq(n) {
    const m = /^([A-G])(#|b)?(\d)$/.exec(n), semi = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    return 440 * Math.pow(2, (semi - 9 + (m[3] - 4) * 12) / 12);
  }
  function parse(l) {
    if (l._p) return l._p;
    const syls = []; l.de.split(" ").forEach(w => { const p = w.split("|"); p.forEach((s, k) => syls.push({ text: s, end: k === p.length - 1 })); });
    const notes = (l.n || "").split(" ").filter(Boolean).map(x => { const [p, d] = x.split(":"); return { f: freq(p), d: d ? +d : 1 }; });
    if (l.n && notes.length !== syls.length) console.warn("Hece/nota sayısı uyuşmuyor:", l.de);
    return (l._p = { syls, notes });
  }
  function clearMarks() { document.querySelectorAll(".syl.on,.lline.on").forEach(e => e.classList.remove("on")); }
  function liedStop() {
    timers.forEach(clearTimeout); timers = [];
    nodes.forEach(o => { try { o.stop(); } catch (e) {} }); nodes = [];
    clearTimeout(segTimer); if (segAudio) segAudio.pause();
    const a = document.getElementById("myAudio"); if (a && !a.paused) a.pause();
    clearMarks();
  }
  window.liedStop = liedStop;
  function tone(f, t, dur) {
    const g = ctx.createGain(); g.connect(ctx.destination);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.22, t + 0.02);
    g.gain.setValueAtTime(0.22, t + Math.max(0.03, dur - 0.08)); g.gain.linearRampToValueAtTime(0.0001, t + dur);
    for (const [type, mult, vol] of [["triangle", 1, 1], ["sine", 2, 0.25]]) {
      const o = ctx.createOscillator(), og = ctx.createGain(); o.type = type; o.frequency.value = f * mult; og.gain.value = vol;
      o.connect(og); og.connect(g); o.start(t); o.stop(t + dur + 0.03); nodes.push(o);
    }
  }
  function playLines(song, idxs) {
    liedStop();
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return alert("Bu tarayıcı melodi çalamıyor.");
    ctx = ctx || new AC(); if (ctx.state === "suspended") ctx.resume();
    const beat = 60 / (song.bpm || 110) / lrate; let t = ctx.currentTime + 0.12; const t0 = ctx.currentTime;
    for (const li of idxs) {
      const p = parse(song.lines[li]);
      timers.push(setTimeout(() => { document.querySelectorAll(".lline.on").forEach(e => e.classList.remove("on")); const el = document.querySelector(`.lline[data-l="${li}"]`); if (el) { el.classList.add("on"); el.scrollIntoView({ block: "nearest", behavior: "smooth" }); } }, (t - t0) * 1000));
      p.notes.forEach((n, si) => {
        const d = n.d * beat; tone(n.f, t, d * 0.94);
        timers.push(setTimeout(() => { document.querySelectorAll(".syl.on").forEach(e => e.classList.remove("on")); const el = document.querySelector(`.syl[data-l="${li}"][data-s="${si}"]`); if (el) el.classList.add("on"); }, (t - t0) * 1000));
        t += d;
      });
      t += beat * 0.5; // satır arası nefes
    }
    timers.push(setTimeout(() => { clearMarks(); nodes = []; }, (t - t0) * 1000 + 200));
  }

  // ---------- kendi şarkım: ses dosyası (IndexedDB) ----------
  const idb = () => new Promise((res, rej) => { const r = indexedDB.open("deutschapp", 1); r.onupgradeneeded = () => r.result.createObjectStore("audio"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const idbDo = (mode, fn) => idb().then(db => new Promise((res, rej) => { const tx = db.transaction("audio", mode), q = fn(tx.objectStore("audio")); tx.oncomplete = () => res(q.result); tx.onerror = () => rej(tx.error); }));
  function myUrl(id) { return myUrls[id] ? Promise.resolve(myUrls[id]) : idbDo("readonly", s => s.get(id)).then(b => b ? (myUrls[id] = URL.createObjectURL(b)) : null); }
  const hasTimes = s => s.lines.length && s.lines.every(l => typeof l.t === "number");
  function playSeg(song, li) {
    liedStop();
    myUrl(song.id).then(url => {
      if (!url) return;
      segAudio = segAudio || new Audio(); if (segAudio.src !== url) segAudio.src = url;
      const from = song.lines[li].t, next = song.lines[li + 1], to = next ? next.t : from + 8;
      segAudio.currentTime = from; segAudio.play().catch(() => {});
      segTimer = setTimeout(() => segAudio.pause(), Math.max(1, to - from) * 1000);
    });
  }
  function lineBtn(song, li) {
    if (!isMine(song)) return `<button class="sound" data-a="liedline" data-id="${song.id}" data-li="${li}" aria-label="Melodiyi çal">🎵</button>`;
    return hasTimes(song) ? `<button class="sound" data-a="liedline" data-id="${song.id}" data-li="${li}" aria-label="Şarkıdan dinle">🎵</button>` : "";
  }

  // ---------- alıştırmalar ----------
  const exLines = song => { const seen = new Set(); return song.lines.map((l, li) => ({ l, li })).filter(({ l }) => { const k = clean(plain(l)).toLowerCase(); if (l.noEx || l.rep || seen.has(k)) return false; seen.add(k); return true; }); };
  function glossFor(song, l) {
    const txt = plain(l).toLowerCase();
    const hits = (song.words || []).filter(w => txt.includes(w.de.toLowerCase().slice(0, Math.max(3, w.de.length - 2))));
    return hits.length ? `Bu satırdaki kelimeler: ${hits.map(w => `<b>${wHtml(w)}</b> = ${h(w.tr)}`).join(" · ")}` : "Bildiğin kelimelerden yola çık; emin değilsen Pas de, açıklamayı gör.";
  }
  function meaningEx(song, li) {
    const l = song.lines[li], pool = [];
    for (const s of [song, ...LIEDER, ...S.mySongs]) for (const x of s.lines) if (x.tr && x.tr !== l.tr && !pool.includes(x.tr)) pool.push(x.tr);
    const mine = pool.slice(0, Math.max(0, song.lines.length - 1)), wrong = shuffle(mine.length >= 2 ? mine : pool).slice(0, 2);
    return { kind: "choice", skill: "sarki", key: `lied:${song.id}:m:${li}`, label: plain(l), ref: { t: "lied", id: song.id, k: "m", li }, options: shuffle([l.tr, ...wrong]), answers: [l.tr],
      prompt: `<div class="muted">${song.icon || "🎵"} ${h(song.title)} · Bu satır ne demek?</div><div class="sentence">${h(plain(l))} ${lineBtn(song, li)}</div>`,
      full: plain(l), help: glossFor(song, l), explain: () => `<b>${h(plain(l))}</b> ${sayBtn(plain(l))}<br>= ${h(l.tr)}` };
  }
  function gapOf(song, l) {
    if (l.gap) return l.gap;
    if (!isMine(song)) return null;
    const c = clean(plain(l)).split(" ").filter(w => w.length >= 4); return c.length ? pick(c) : null;
  }
  function clozeEx(song, li, gap) {
    const l = song.lines[li], txt = plain(l), g = gap || gapOf(song, l); if (!g) return null;
    const re = new RegExp("(^|[^\\p{L}])" + g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\p{L}])", "u"); if (!re.test(txt)) return null;
    const shown = h(txt).replace(new RegExp("(^|[^\\p{L}])" + h(g).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\p{L}])", "u"), '$1<span class="gap">___</span>');
    return { kind: "type", skill: "sarki", key: `lied:${song.id}:c:${li}`, label: txt, ref: { t: "lied", id: song.id, k: "c", li, g }, answers: [g], opt: { typoOk: true },
      prompt: `<div class="muted">${song.icon || "🎵"} ${h(song.title)} · Eksik kelimeyi yaz:</div><div class="sentence">${shown} ${lineBtn(song, li)}</div>${l.tr ? `<div class="muted">${h(l.tr)}</div>` : ""}`,
      full: txt, help: isMine(song) ? "Şarkıyı hatırla; 🎵 varsa o satırı şarkıdan dinleyebilirsin." : "Melodiyi 🎵 ile çal ve satırı içinden söyle. " + glossFor(song, l),
      explain: () => `Doğru satır: <b>${h(txt)}</b> ${sayBtn(txt)}${l.tr ? `<br>= ${h(l.tr)}` : ""}` };
  }
  function lineOrderEx(song, li) {
    const l = song.lines[li], target = clean(plain(l)), tokens = target.split(" ");
    if (tokens.length < 4 || tokens.length > 9 || new Set(tokens.map(t => t.toLowerCase())).size !== tokens.length) return null;
    let tiles = shuffle(tokens); for (let k = 0; k < 5 && tiles.join(" ") === target; k++) tiles = shuffle(tokens);
    return { kind: "order", skill: "sarki", key: `lied:${song.id}:o:${li}`, label: target, ref: { t: "lied", id: song.id, k: "o", li }, tiles, answers: [target], opt: { caseMatters: false },
      prompt: `<div class="muted">${song.icon || "🎵"} ${h(song.title)} · Şarkıdaki satırı kur:</div>${l.tr ? `<div class="word small">${h(l.tr)}</div>` : ""}<div>${lineBtn(song, li)}</div>`,
      full: plain(l), help: isMine(song) ? "Şarkıdaki sırayı hatırla." : "Melodiyi 🎵 ile çal; satırı şarkıdaki sırayla kur. " + glossFor(song, l),
      explain: () => `Doğru: <b>${h(plain(l))}</b> ${sayBtn(plain(l))}${l.tr ? `<br>= ${h(l.tr)}` : ""}` };
  }
  window.liedExFromRef = r => {
    const s = songById(r.id); if (!s || !s.lines[r.li]) return null;
    return r.k === "m" ? (s.lines[r.li].tr ? meaningEx(s, r.li) : null) : r.k === "c" ? clozeEx(s, r.li, r.g) : lineOrderEx(s, r.li);
  };
  function startLied(id) {
    const song = songById(id), lines = shuffle(exLines(song)), q = [], learn = [];
    if (!isMine(song)) {
      const ws = song.words.map(w => wordByDe(w.de)).filter(Boolean);
      ws.filter(w => !isSeen(w)).forEach(w => learn.push({ kind: "learn", w }));
      ws.forEach(w => q.push(wordEx(w)));
    }
    const trs = new Set(song.lines.map(l => l.tr).filter(Boolean));
    if (trs.size >= 3) lines.filter(x => x.l.tr).slice(0, 5).forEach(x => q.push(meaningEx(song, x.li)));
    lines.map(x => clozeEx(song, x.li)).filter(Boolean).slice(0, isMine(song) ? 6 : 4).forEach(x => q.push(x));
    shuffle(lines).map(x => lineOrderEx(song, x.li)).filter(Boolean).slice(0, 3).forEach(x => q.push(x));
    if (!q.length) return songScreen(id, "Bu şarkıdan alıştırma üretilemedi: satırlar çok kısa.");
    begin({ u: null, cat: "lied", liedId: id, items: [...learn, ...shuffle(q)], title: `${song.icon || "🎵"} ${song.title}`,
      intro: `Şarkıyı dinledikten sonra: ${learn.length ? `<b>${learn.length} yeni kelime</b>, sonra ` : ""}<b>${q.length} soru</b> (${isMine(song) ? "" : "kelime, "}${trs.size >= 3 ? "satırın anlamı, " : ""}eksik kelime, satır kurma). Geçmek için %${CAT_PASS * 100}. Yanlışların karışık tekrarda geri gelir.` });
  }
  window.liedFinish = (run, pct, ratio) => {
    const st = lState(run.liedId); st.best = Math.max(st.best || 0, pct);
    if (ratio >= CAT_PASS) { st.done = true; return `Şarkı tamamlandı (%${pct}). ${isMine(songById(run.liedId) || {}) ? "Yanlış ve pas geçtiklerin" : "Kelimeleri ve yanlışların"} karışık tekrarda geri gelecek.`; }
    return `%${pct}. Şarkıyı tamamlamak için %${CAT_PASS * 100} gerekli; bir kez daha dinle ve tekrar dene.`;
  };

  // ---------- ekranlar ----------
  const status = id => { const st = S.lieder[id] || {}; return st.done ? `✅ tamamlandı · en iyi %${st.best}` : st.best != null ? `en iyi %${st.best}` : st.heard ? "dinlendi" : "yeni"; };
  function liederHome(msg) {
    stopAudio(); run = null;
    $app.innerHTML = `${msg ? `<div class="good">${h(msg)}</div>` : ""}<div class="card"><h2>🎵 Şarkılarla öğren</h2>
      <p class="muted">Önce dinle ve sözleri takip et, sonra kelime ve anlam soruları gelir. Şarkıdan öğrendiğin kelimeler karışık tekrara da girer.</p></div>
      <div class="menu">${LIEDER.map(s => `<button class="big" data-a="lied" data-id="${s.id}"><b>${s.icon} ${h(s.title)}</b><small>${h(s.tag)} · ${status(s.id)}</small></button>`).join("")}</div>
      <div class="card" style="margin-top:14px"><h2>🎧 Kendi şarkım</h2>
        <p class="muted">Sevdiğin Almanca şarkının ses dosyasını ve sözlerini ekle; sözler şarkıyla birlikte akar, uygulama sözlerden soru üretir. Dosya ve sözler yalnız bu cihazda kalır.</p>
        <div class="menu">${S.mySongs.map(s => `<button class="big" data-a="lied" data-id="${s.id}"><b>🎧 ${h(s.title)}</b><small>${s.lines.length} satır · ${hasTimes(s) ? "senkronlu" : "senkron yok"} · ${status(s.id)}</small></button>`).join("")}
        <button class="big" data-a="myadd"><b>＋ Şarkı ekle</b><small>Ses dosyası (mp3 vb.) + sözler</small></button></div></div>
      <button class="ghost" data-a="home">← Geri</button>`;
  }
  const lineHtml = (l, li) => { const p = parse(l); return p.syls.map((s, si) => `<span class="syl" data-l="${li}" data-s="${si}">${h(s.text)}</span>${s.end ? " " : ""}`).join(""); };
  const rateBtns = () => `<span class="speeds">${[0.75, 1].map(r => `<button class="ghost ${lrate === r ? "on" : ""}" data-a="liedrate" data-r="${r}">${r === 1 ? "normal" : "yavaş"}</button>`).join("")}</span>`;
  function songScreen(id, msg) {
    stopAudio(); run = null;
    const s = songById(id); if (!s) return liederHome();
    if (isMine(s)) return mySongScreen(s, msg);
    lState(id).heard = true; save();
    $app.innerHTML = `${msg ? `<div class="bubble">${h(msg)}</div>` : ""}<div class="card"><div class="muted">${h(s.tag)}</div><h2>${s.icon} ${h(s.title)}</h2><p>${h(s.about)}</p>
      <div class="player"><button class="primary" data-a="liedplay" data-id="${id}">▶ Çal</button><button class="ghost" data-a="stop">■ Durdur</button>${rateBtns()}
        <button class="ghost" data-a="liedtr">Çeviriyi gizle / göster</button></div>
      <div class="lyrics showtr">${s.lines.map((l, li) => `<div class="lline" data-l="${li}"><div class="lde">${lineHtml(l, li)} <button class="sound sm" data-a="liedline" data-id="${id}" data-li="${li}" aria-label="Bu satırın melodisi">🎵</button>${sayBtn(plain(l)).replace('class="sound"', 'class="sound sm"')}</div><div class="ltr muted">${h(l.tr)}</div></div>`).join("")}</div>
      <p class="muted">▶ melodiyi çalar, heceler sırayla yanar: birlikte söyle. 🎵 tek satırın melodisi, 🔊 satırın Almanca okunuşu. Melodi enstrümanla çalınır, şarkı söyleyen ses yoktur.</p></div>
      <div class="card"><h2>Kelimeler</h2>${s.words.map(w => `<div class="lword"><b>${wHtml(w)}</b>${w.pl ? ` <span class="muted">· çoğul: die ${h(w.pl)}</span>` : ""} = ${h(w.tr)} ${sayBtn(wLabel(w))}${w.tip ? `<div class="muted">💡 ${h(w.tip)}</div>` : ""}<div class="muted">${h(w.ex[0])} · ${h(w.ex[1])}</div></div>`).join("")}</div>
      <div class="card lessonbody"><h2>Bu şarkıdan gramer</h2><ul>${s.notes.map(n => `<li>${n}</li>`).join("")}</ul></div>
      <div class="row"><button class="primary" data-a="liedstart" data-id="${id}">Alıştırmalara başla</button><button class="ghost" data-a="lieder">← Şarkılar</button></div>`;
  }
  let sync = null;
  function mySongScreen(s, msg) {
    sync = null;
    $app.innerHTML = `${msg ? `<div class="bubble">${h(msg)}</div>` : ""}<div class="card"><div class="muted">Kendi şarkım</div><h2>🎧 ${h(s.title)}</h2>
      <audio id="myAudio" controls style="width:100%"></audio><div id="syncBox"></div>
      <div class="player"><button class="ghost" data-a="mysync" data-id="${s.id}">⏱ Sözleri şarkıyla eşle</button><button class="ghost" data-a="liedtr">Çeviriyi gizle / göster</button></div>
      <div class="lyrics showtr">${s.lines.map((l, li) => `<div class="lline" data-l="${li}" data-a="myseek" data-id="${s.id}" data-li="${li}"><div class="lde">${h(l.de)} ${sayBtn(l.de).replace('class="sound"', 'class="sound sm"')}</div>${l.tr ? `<div class="ltr muted">${h(l.tr)}</div>` : ""}</div>`).join("")}</div>
      <p class="muted">${hasTimes(s) ? "Sözler şarkıyla eşli: çalan satır yanar; bir satıra dokununca şarkı oraya gider." : "Sözler henüz şarkıyla eşli değil. ⏱ ile bir kez eşlersen çalan satır kendiliğinden yanar ve sorularda o satırı şarkıdan dinleyebilirsin."}
      ${s.lines.some(l => l.tr) ? "" : " Çeviri eklemediğin için “bu satır ne demek?” soruları çıkmaz; eksik kelime ve satır kurma soruları çıkar."}</p></div>
      <div class="row"><button class="primary" data-a="liedstart" data-id="${s.id}">Alıştırmalara başla</button><button class="ghost" data-a="lieder">← Şarkılar</button><button class="ghost" data-a="mydel" data-id="${s.id}">Sil</button></div>`;
    const a = document.getElementById("myAudio");
    myUrl(s.id).then(url => { if (url && document.getElementById("myAudio") === a) a.src = url; else if (!url) document.getElementById("syncBox").innerHTML = `<div class="bubble">Ses dosyası bu cihazda bulunamadı. Şarkıyı silip yeniden ekle.</div>`; });
    a.addEventListener("timeupdate", () => {
      if (sync || !hasTimes(s)) return; let cur = -1; s.lines.forEach((l, li) => { if (l.t <= a.currentTime + 0.05) cur = li; });
      document.querySelectorAll(".lline").forEach(el => { const on = +el.dataset.l === cur; if (on && !el.classList.contains("on")) el.scrollIntoView({ block: "nearest", behavior: "smooth" }); el.classList.toggle("on", on); });
    });
  }
  function syncBox(s) {
    const b = document.getElementById("syncBox"); if (!b) return;
    if (!sync) { b.innerHTML = ""; return; }
    b.innerHTML = sync.k >= s.lines.length ? "" : `<div class="infobox">Şarkı baştan çalıyor. Her satır <b>söylenmeye başladığı anda</b> düğmeye bas.<br>Sıradaki satır (${sync.k + 1}/${s.lines.length}): <b>${h(s.lines[sync.k].de)}</b>
      <div class="row" style="margin-top:8px"><button class="primary" data-a="mytap" data-id="${s.id}">Bu satır şimdi başladı</button><button class="ghost" data-a="mysyncoff" data-id="${s.id}">Vazgeç</button></div></div>`;
    document.querySelectorAll(".lline").forEach(el => el.classList.toggle("on", +el.dataset.l === sync.k));
  }
  function myAddScreen(msg, v) {
    stopAudio(); run = null; v = v || {};
    $app.innerHTML = `${msg ? `<div class="bubble">${h(msg)}</div>` : ""}<div class="card"><h2>＋ Şarkı ekle</h2>
      <div class="typebox"><label>Şarkının adı<input id="myTitle" value="${h(v.title || "")}" placeholder="ör. sanatçı – şarkı"></label>
      <label>Ses dosyası (bilgisayarındaki ya da telefonundaki mp3 / m4a / wav)<input id="myFile" type="file" accept="audio/*"></label>
      <label>Almanca sözler (her satır ayrı satırda)<textarea id="myLyrics" rows="8" spellcheck="false">${h(v.lyrics || "")}</textarea></label>
      <label>Türkçe çeviri (isteğe bağlı; sözlerle aynı sayıda satır)<textarea id="myTr" rows="6" spellcheck="false">${h(v.tr || "")}</textarea></label></div>
      <p class="muted">Dosya ve sözler internete gönderilmez; yalnız bu tarayıcıda saklanır. Çeviri eklersen “bu satır ne demek?” soruları da çıkar.</p>
      <div class="row"><button class="primary" data-a="mysave">Kaydet</button><button class="ghost" data-a="lieder">Vazgeç</button></div></div>`;
  }
  function mySave() {
    const v = { title: document.getElementById("myTitle").value.trim(), lyrics: document.getElementById("myLyrics").value, tr: document.getElementById("myTr").value };
    const f = document.getElementById("myFile").files[0], rows = t => t.split("\n").map(x => x.trim()).filter(Boolean);
    const de = rows(v.lyrics), tr = rows(v.tr);
    if (!v.title) return myAddScreen("Şarkının adını yaz.", v);
    if (!f) return myAddScreen("Bir ses dosyası seç.", v);
    if (de.length < 2) return myAddScreen("Sözleri satır satır yapıştır (en az 2 satır).", v);
    if (tr.length && tr.length !== de.length) return myAddScreen(`Çeviri satır sayısı sözlerle aynı olmalı: sözler ${de.length} satır, çeviri ${tr.length} satır.`, v);
    const id = "my" + Date.now();
    idbDo("readwrite", s => s.put(f, id)).then(() => {
      S.mySongs.push({ id, mine: true, title: v.title, lines: de.map((x, k) => ({ de: x, tr: tr[k] || "" })) }); save(); songScreen(id);
    }).catch(() => myAddScreen("Ses dosyası kaydedilemedi (tarayıcı depolaması dolu ya da kapalı olabilir).", v));
  }

  Object.assign(actions, {
    lieder: () => liederHome(), lied: d => songScreen(d.id), liedstart: d => startLied(d.id),
    liedplay: d => { const s = songById(d.id); playLines(s, s.lines.map((_, k) => k)); },
    liedline: d => { const s = songById(d.id); isMine(s) ? playSeg(s, +d.li) : playLines(s, [+d.li]); },
    liedrate: d => { lrate = +d.r; document.querySelectorAll('[data-a="liedrate"]').forEach(b => b.classList.toggle("on", +b.dataset.r === lrate)); },
    liedtr: () => { const l = document.querySelector(".lyrics"); if (l) l.classList.toggle("showtr"); },
    myadd: () => myAddScreen(), mysave: mySave,
    mydel: d => { const s = songById(d.id); if (!s || !confirm(`"${s.title}" silinsin mi? Ses dosyası ve sözler bu cihazdan kaldırılır.`)) return; S.mySongs = S.mySongs.filter(x => x.id !== d.id); delete S.lieder[d.id]; save(); idbDo("readwrite", st => st.delete(d.id)).catch(() => {}); liederHome("Şarkı silindi."); },
    myseek: (d, el) => { const s = songById(d.id), a = document.getElementById("myAudio"); if (sync || !a || !hasTimes(s)) return; a.currentTime = s.lines[+d.li].t; a.play().catch(() => {}); },
    mysync: d => { const s = songById(d.id), a = document.getElementById("myAudio"); if (!a || !a.src) return; sync = { k: 0, t: [] }; a.currentTime = 0; a.play().catch(() => {}); syncBox(s); },
    mysyncoff: d => { sync = null; const a = document.getElementById("myAudio"); if (a) a.pause(); syncBox(songById(d.id)); document.querySelectorAll(".lline.on").forEach(e => e.classList.remove("on")); },
    mytap: d => {
      const s = songById(d.id), a = document.getElementById("myAudio"); if (!sync || !a) return;
      sync.t.push(Math.max(0, a.currentTime - 0.2)); sync.k++;
      if (sync.k >= s.lines.length) { s.lines.forEach((l, k) => { l.t = sync.t[k]; }); sync = null; save(); a.pause(); return songScreen(s.id); }
      syncBox(s);
    }
  });
  ["liedline", "liedrate", "liedtr", "myseek", "mysync", "mytap"].forEach(a => KEEP_AUDIO.add(a));
})();
