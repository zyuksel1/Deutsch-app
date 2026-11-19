"use strict";
// Deutsch-App v0.10: önceden kaydedilmiş Almanca ses dosyaları (audio/, Deutsch-App-tools/make_audio.py). v0.9: yönetici modu yalnız localhost, ilerlemeyi sıfırla, güncelleme bildirimi. v0.8: çevrimdışı (sw.js, manifest), 💾 ilerleme yedeği (backup.js). v0.7: 📒 ders notları (notes.js). v0.6: karışık Bugünkü ders (bitmemiş tüm kategoriler + eski tekrar), kategoriler paralel açık.
// v0.5: 🎵 şarkılarla öğrenme (lieder.js + content/lieder.js).
// v0.4: Pas butonu (emin/tahmin yok), yazim hatasina kismi puan, kelime hedefi ve ustalik,
// metin bazli okuma/dinleme ilerlemesi, testte ayri metinler, ses durdurma, yonetici modu, 💼 is Almancasi.
const KEY = "deutschapp.v1";
const $app = document.getElementById("app");
const { FORMS, VERBS, LESSONS, ART_GENDER, GENDER_NAME, LEVELS, UNITS } = window;
const SKILLS = { wort: "Kelime", artikel: "Artikel", nominativ: "Nominativ", akkusativ: "Akkusativ", gramer: "Gramer",
  cumle: "Cümle kurma", okuma: "Okuma", dinleme: "Dinleme" };
const CATS = [
  { id: "kelime", name: "Kelime", icon: "🌱", has: u => (u.words || []).length },
  { id: "gramer", name: "Gramer", icon: "📘", has: u => (u.grammar || []).length },
  { id: "cumle", name: "Cümle kurma", icon: "🧩", has: u => (u.sentences || []).length },
  { id: "okuma", name: "Okuma", icon: "📖", has: u => (u.reading || []).length },
  { id: "dinleme", name: "Dinleme", icon: "🎧", has: u => (u.listening || []).length }
];
const CAT_PASS = 0.7, UNIT_PASS = 0.8, WORD_BATCH = 8, WORD_FINAL = 15;
const BOX_DAYS = [0, 1, 2, 4, 8, 16, 32];
const DAILY_GOAL = 20, DAY = 86400000;

// ---------- durum ----------
function fresh() {
  return { ver: 4, points: 0, streak: 0, lastDay: "", today: { day: "", n: 0 }, lessons: {}, words: {}, errors: {}, voiceName: "",
    prog: { units: {}, exams: {} }, stats: {}, admin: false };
}
let S;
try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { S = fresh(); }
// Yönetici modu yalnız geliştirme bilgisayarında (localhost); yayındaki sitede hiç yok
const DEV = ["localhost", "127.0.0.1"].includes(location.hostname);
if (!DEV) S.admin = false;
if (!S.ver || S.ver < 3) { S.words = {}; S.errors = {}; S.lessons = {}; S.stats = {}; S.prog = { units: {}, exams: {} }; }
if (S.ver < 4) { // v0.4: kelimede "gördüm" yerine "ustalaştım" (m) kullanılır
  for (const w of Object.values(S.words)) if (w.learned && (w.box || 0) > 0) w.m = true;
  for (const u of Object.values((S.prog && S.prog.units) || {})) for (const c of ["kelime", "okuma", "dinleme"]) if (u.cats && u.cats[c] && !u.passed) delete u.cats[c];
  S.ver = 4;
}
S.prog = S.prog || { units: {}, exams: {} }; S.lessons = S.lessons || {}; S.stats = S.stats || {};
for (const k of Object.keys(SKILLS)) S.stats[k] = Object.assign({ c: 0, t: 0, half: 0, pas: 0 }, S.stats[k]);
for (const [k, e] of Object.entries(S.errors)) if (!e.ref) delete S.errors[k];
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} header(); }
function dayStr(d = new Date()) { const p = n => String(n).padStart(2, "0"); return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()); }
function header() {
  document.getElementById("streak").textContent = S.streak; document.getElementById("points").textContent = S.points;
  const a = document.getElementById("adminBtn"); if (a) { a.classList.toggle("on", !!S.admin); a.title = S.admin ? "Yönetici modu açık (kapatmak için tıkla)" : "Yönetici modu: tüm içeriği aç"; }
}
function touchDay() {
  const t = dayStr();
  if (S.today.day !== t) S.today = { day: t, n: 0 };
  if (S.lastDay !== t) { const y = new Date(); y.setDate(y.getDate() - 1); S.streak = S.lastDay === dayStr(y) ? S.streak + 1 : 1; S.lastDay = t; }
  S.today.n++;
}

// ---------- yardimcilar ----------
const h = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const cap = s => s[0].toUpperCase() + s.slice(1);
const artSpan = a => `<span class="art-${a}">${a}</span>`;
const wLabel = w => w.art ? `${w.art} ${w.de}` : w.de;
const wHtml = w => w.art ? `${artSpan(w.art)} ${h(w.de)}` : h(w.de);
const biz = x => x && x.biz ? `<span class="biz" title="İş Almancası">💼</span> ` : "";
const unitById = id => UNITS.find(u => u.id === id);
const ALLWORDS = UNITS.flatMap(u => (u.words || []).map(w => Object.assign({ unit: u.id }, w)));
const wordByDe = de => ALLWORDS.find(w => w.de === de);
const wSt = w => S.words[w.de] || {};
const isSeen = w => !!wSt(w).learned;
const isMastered = w => !!wSt(w).m;
const lessonById = id => LESSONS.find(l => l.id === id);

// ---------- ses: yalniz Almanca ses ----------
let deVoices = [], deVoice = null;
function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  const score = v => (/natural/i.test(v.name) ? 30 : 0) + (/online/i.test(v.name) ? 20 : 0) + (/google/i.test(v.name) ? 10 : 0) + (v.lang === "de-DE" ? 1 : 0);
  deVoices = speechSynthesis.getVoices().filter(v => /^de([-_]|$)/i.test(v.lang)).sort((a, b) => score(b) - score(a));
  deVoice = deVoices.find(v => v.name === S.voiceName) || deVoices[0] || null;
  const el = document.getElementById("voiceState"); if (el) el.innerHTML = voiceStateHtml();
}
function voiceStateHtml() {
  return `🔊 Ses: <b>kayıtlı Almanca ses</b> (her cihazda aynı, internetsiz çalışır)`;
}
// v0.10 Önceden kaydedilmiş ses dosyaları (audio/index.js). Dosyası olmayan metinde cihazın Almanca sesi denenir.
// iPhone: sessiz mod düğmesi açıkken de ses (Safari 17+); eski sürümlerde etkisiz
try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
const AU = new Audio(); AU.preload = "auto"; let auQueue = [], auRate = 1;
const audioFile = (t, v) => { const m = window.AUDIO && window.AUDIO[v || "a"]; const n = m && m[String(t).trim()]; return n ? "audio/" + n : null; };
function auPlay(src, rate) { AU.src = src; AU.playbackRate = rate || 1; try { AU.preservesPitch = true; } catch (e) {} const p = AU.play(); if (p && p.catch) p.catch(() => {}); }
AU.addEventListener("ended", () => { const nx = auQueue.shift(); if (nx) auPlay(nx, auRate); });
const stopAudio = () => { auQueue = []; try { AU.pause(); } catch (e) {} if ("speechSynthesis" in window) speechSynthesis.cancel(); if (window.liedStop) window.liedStop(); };
function utter(text, voice, rate) { const u = new SpeechSynthesisUtterance(text); u.voice = voice; u.lang = voice.lang; u.rate = rate || 0.9; return u; }
function speak(text, auto) {
  const f = audioFile(text);
  if (f) { stopAudio(); return auPlay(f, 1); }
  if (!deVoice) return auto ? null : voiceScreen();
  stopAudio(); speechSynthesis.speak(utter(text, deVoice));
}
function playScript(lines, rate) {
  const who = {}; let k = 0;
  const files = lines.map(([sp, line]) => { if (!(sp in who)) who[sp] = k++ % 2 ? "b" : "a"; return audioFile(line, who[sp]) || audioFile(line, "a"); });
  stopAudio();
  if (files.every(Boolean)) { auRate = (rate || 0.85) / 0.85; auQueue = files.slice(1); return auPlay(files[0], auRate); }
  if (!deVoice) return voiceScreen();
  const second = deVoices.find(v => v !== deVoice) || deVoice, tv = {}; k = 0;
  for (const [sp, line] of lines) { if (!(sp in tv)) tv[sp] = k++ % 2 ? second : deVoice; speechSynthesis.speak(utter(line, tv[sp], rate)); }
}
const sayBtn = t => `<button class="sound" data-a="say" data-t="${h(t)}" aria-label="Dinle">🔊</button>`;
if ("speechSynthesis" in window) { speechSynthesis.onvoiceschanged = loadVoices; loadVoices(); setTimeout(loadVoices, 800); }

// ---------- metin kontrolu ----------
// sonuc: {score: 1 | 0.5 | 0, note}
const norm = s => s.normalize("NFC").replace(/[’`´]/g, "'").trim().replace(/\s+/g, " ").replace(/\s+([.,!?])/g, "$1").replace(/[.!?,]+$/, "");
const translit = s => s.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/Ä/g, "Ae").replace(/Ö/g, "Oe").replace(/Ü/g, "Ue");
const stripUml = s => s.replace(/[äÄ]/g, m => m === "ä" ? "a" : "A").replace(/[öÖ]/g, m => m === "ö" ? "o" : "O").replace(/[üÜ]/g, m => m === "ü" ? "u" : "U").replace(/ß/g, "ss");
function lev(a, b) {
  const m = a.length, n = b.length; if (Math.abs(m - n) > 2) return 9;
  // Damerau (OSA): yer degistirmis iki harf = 1 hata
  const d = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i ? (j ? 0 : i) : j));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[m][n];
}
// Gramer tasiyan kelimeler: bunlarda fark = gramer hatasi (yazim hatasi sayilmaz)
const GRAM = new Set("der die das den dem des ein eine einen einem einer eines kein keine keinen mein meine meinen dein deine deinen sein seine seinen ihr ihre ihren unser unsere euer eure ich du er sie es wir ihr bin bist ist sind seid habe hast hat haben habt nicht".split(" "));
function typoWord(i, a) { // tek kelimede yazim hatasi mi? (son 2 harf = ek; orada fark gramerdir)
  if (i === a) return true;
  if (GRAM.has(a) || GRAM.has(i)) return false;
  if (stripUml(i) === stripUml(a)) return false;       // umlaut farki anlam degistirir
  if (a.length < 4) return false;
  if (i.slice(-2) !== a.slice(-2)) return false;
  return lev(i, a) <= (a.length > 9 ? 2 : 1);
}
function nearMiss(input, answer) {
  const it = input.toLowerCase().split(" "), at = answer.toLowerCase().split(" ");
  if (it.length !== at.length) return false;
  let typos = 0;
  for (let k = 0; k < at.length; k++) { if (it[k] === at[k]) continue; if (!typoWord(it[k], at[k])) return false; typos++; }
  return typos > 0 && typos <= Math.max(1, Math.floor(at.length / 4));
}
function checkOne(input, answer, opt) {
  const a = norm(answer), i = norm(input);
  if (!i) return { score: 0, note: "" };
  if (i === a) return { score: 1, note: "" };
  if (i.toLowerCase() === a.toLowerCase()) return { score: 1, note: opt.caseMatters ? `Küçük not: Almancada isimler ve cümle başı büyük harfle yazılır (${h(a)}).` : "" };
  if (translit(i).toLowerCase() === translit(a).toLowerCase()) return { score: 1, note: "ae/oe/ue/ss yazımı kabul, ama ä ö ü ß tuşlarını kullanmayı alışkanlık yap." };
  if (opt.typoOk && nearMiss(i, a)) return { score: 0.5, note: `Neredeyse doğru: küçük bir yazım hatası var (doğrusu: <b>${h(a)}</b>). Yarım puan.` };
  if (stripUml(i).toLowerCase() === stripUml(a).toLowerCase()) return { score: 0, note: "Umlaut eksik ya da fazla. Almancada umlaut anlamı değiştirir (fahrt ≠ fährt, Bruder ≠ Brüder)." };
  return { score: 0, note: "" };
}
function checkText(input, answers, opt) {
  let best = { score: 0, note: "" };
  for (const a of answers) { const r = checkOne(input, a, opt); if (r.score > best.score || (!best.note && r.note)) best = r; if (best.score === 1) break; }
  return best;
}

// ---------- alistirma uretimi ----------
const helpArtikel = `Artikel kelimenin cinsiyetidir: ${artSpan("der")} eril, ${artSpan("die")} dişil, ${artSpan("das")} nötr. İpuçları: -ung/-heit/-keit → die; -chen → das; -e ile bitenlerin çoğu die.`;
function wordExplain(w) {
  return `${biz(w)}<b>${wHtml(w)}</b>${w.pl ? ` · çoğul: die ${h(w.pl)}` : ""} · ${h(w.tr)} ${sayBtn(wLabel(w))}<br>
    ${w.tip ? "💡 " + h(w.tip) + "<br>" : ""}${w.art ? "Cinsiyet: " + GENDER_NAME[ART_GENDER[w.art]] + "." : ""}
    ${w.ex ? `<div class="muted">Örnek: ${h(w.ex[0])} ${sayBtn(w.ex[0])}<br>${h(w.ex[1])}</div>` : ""}`;
}
function wordEx(w) {
  return { kind: "type", skill: "wort", key: "w:" + w.de, label: wLabel(w), ref: { t: "word", de: w.de }, biz: w.biz, answers: [wLabel(w), ...(w.alts || [])],
    opt: { caseMatters: true, typoOk: true }, placeholder: w.art ? "ör. das Buch" : "",
    prompt: `<div class="muted">${biz(w)}Almancasını ${w.art ? "artikeliyle " : ""}yaz:</div><div class="word">${h(w.tr)}</div>`,
    full: wLabel(w), explain: () => wordExplain(w), help: w.art ? helpArtikel : "Kelimeyi hatırlamaya çalış; bilmiyorsan Pas de, cevabı ve örneği göreceksin." };
}
function artikelEx(w) {
  return { kind: "choice", skill: "artikel", key: "a:" + w.de, label: wLabel(w), ref: { t: "artikel", de: w.de }, biz: w.biz, options: ["der", "die", "das"], answers: [w.art], colored: true,
    prompt: `<div class="muted">${biz(w)}Hangi artikel?</div><div class="word">___ ${h(w.de)}</div><div class="muted">${h(w.tr)}</div>`,
    full: wLabel(w), explain: () => wordExplain(w), help: helpArtikel };
}
let lastVerb = null;
function caseEx(w, caseIdx) {
  const g = ART_GENDER[w.art];
  const fam = pick(caseIdx ? ["def", "ein", "mein", "kein"] : ["def", "def", "ein", "mein"]);
  const famHint = { def: "der/die/das", ein: "ein/eine", mein: "mein/meine", kein: "kein/keine" }[fam];
  const answer = FORMS[fam][g][caseIdx];
  let shown, full, verb = null;
  if (caseIdx === 1) {
    verb = pick(VERBS.filter(v => v.for.includes(w.t) && v.s !== lastVerb)); lastVerb = verb.s;
    shown = `${h(verb.s)} <span class="gap">___</span> ${h(w.de)}.`; full = `${verb.s} ${answer} ${w.de}.`;
  } else {
    const adj = w.t === "p" ? "nett" : "neu";
    shown = `<span class="gap">___</span> ${h(w.de)} ist ${adj}.`; full = `${cap(answer)} ${w.de} ist ${adj}.`;
  }
  const ex = { kind: "case", skill: caseIdx ? "akkusativ" : "nominativ", key: (caseIdx ? "akk:" : "nom:") + w.de, label: w.de,
    ref: { t: caseIdx ? "akk" : "nom", de: w.de }, w, fam, g, caseIdx, verb, answers: [answer], opt: {}, full, role: caseIdx ? "nesne" : "özne", placeholder: famHint,
    prompt: `<div class="sentence">${shown}</div><div class="muted">${h(w.tr)} · kelime ailesi: <b>${famHint}</b></div>` };
  ex.help = `Önce fiile sor: <b>kim/ne?</b> → <b>özne</b> = Nominativ (artikel değişmez). <b>kimi/neyi?</b> → <b>nesne</b> = Akkusativ (yalnız maskulin değişir: der→den, ein→einen).${tableRows(fam, null)}`;
  ex.explain = () => {
    const v = verb ? verb.s.split(" ")[1] : "";
    const why = caseIdx === 1
      ? `Fiil <b>${h(v)}</b> (${h(verb.tr)}). Sor: <i>wen/was ${h(v)}...?</i> (kimi/neyi?) → cevap <b>${h(w.de)}</b>, yani <b>nesne → Akkusativ</b>.`
      : `Sor: <i>wer/was ist ...?</i> (kim/ne?) → cevap <b>${h(w.de)}</b>, yani <b>özne → Nominativ</b>; artikel değişmez.`;
    return `${why}<br>${wHtml(w)} = ${GENDER_NAME[g]}${caseIdx === 1 ? (g === "m" ? " → maskulin olduğu için değişir" : " → maskulin değil, değişmez") : ""}.
      <br>Doğru cümle: <b>${h(full)}</b> ${sayBtn(full)}${tableRows(fam, g)}`;
  };
  return ex;
}
function tableRows(fam, hlG) {
  const nm = { m: "maskulin", f: "feminin", n: "nötr" };
  return `<table><tr><th></th><th>Nominativ</th><th>Akkusativ</th></tr>` +
    ["m", "f", "n"].map(g => `<tr${g === hlG ? ' class="hl"' : ""}><td class="art-${{ m: "der", f: "die", n: "das" }[g]}">${nm[g]}</td><td>${FORMS[fam][g][0]}</td><td>${FORMS[fam][g][1]}</td></tr>`).join("") + `</table>`;
}
function grammarItemEx(u, gi, ii) {
  const topic = u.grammar[gi], it = topic.items[ii], lesson = lessonById(topic.lesson);
  const full = it.full || it.q.replace("___", it.a[0]);
  return { kind: it.o ? "choice" : "type", skill: "gramer", key: `g:${u.id}:${gi}:${ii}`, label: it.q, ref: { t: "gitem", u: u.id, gi, ii },
    options: it.o ? shuffle(it.o) : null, answers: it.a, opt: {}, placeholder: it.hint || "",
    prompt: `<div class="muted">${h(lesson ? lesson.title : "Gramer")}</div><div class="sentence">${h(it.q).replace("___", '<span class="gap">___</span>')}</div>${it.tr ? `<div class="muted">${h(it.tr)}</div>` : ""}`,
    full, help: topic.help || (lesson ? lesson.summary || "" : ""),
    explain: () => `${it.why ? h(it.why) + "<br>" : ""}Doğru cümle: <b>${h(full)}</b> ${sayBtn(full)}` };
}
function genGrammar(u, gi) {
  const topic = u.grammar[gi], nouns = unitNouns(u);
  if (!nouns.length) return [];
  if (topic.gen === "artikel") return shuffle(nouns).slice(0, 4).map(artikelEx);
  if (topic.gen === "case-nom") return shuffle(nouns.filter(w => w.t)).slice(0, 4).map(w => caseEx(w, 0));
  if (topic.gen === "case-akk") return shuffle(nouns.filter(w => w.t)).slice(0, 5).map(w => caseEx(w, Math.random() < 0.7 ? 1 : 0));
  return [];
}
function unitNouns(u) {
  const own = (u.words || []).filter(w => w.art);
  const old = ALLWORDS.filter(w => w.art && w.unit !== u.id && isMastered(w));
  return [...own, ...shuffle(old).slice(0, 4)];
}
const lemmaHelp = s => s.lemmas && s.lemmas.length
  ? `Cümlenin kelimeleri (sözlük hâli, karışık sırada; çekimi sen yap):<div class="lemmas">${shuffle(s.lemmas).map(l => `<span class="lemma">${h(l)}</span>`).join("")}</div>`
  : "";
const orderRule = "Ana cümlede çekimli fiil her zaman <b>2. sırada</b>. 1. sırada özne ya da zaman/yer ifadesi olabilir; özne o zaman fiilden sonra gelir: <i>Heute <b>arbeite</b> ich.</i> Evet/hayır sorusunda fiil başta.";
function orderEx(u, si) {
  const s = u.sentences[si], target = norm(s.de), tokens = target.split(" ");
  let tiles = shuffle(tokens); for (let k = 0; k < 5 && tiles.join(" ") === target && tokens.length > 1; k++) tiles = shuffle(tokens);
  return { kind: "order", skill: "cumle", key: `s:${u.id}:${si}`, label: s.de, ref: { t: "sent", u: u.id, si }, biz: s.biz, tiles, answers: [s.de, ...(s.alts || [])], opt: { caseMatters: false }, full: s.de,
    prompt: `<div class="muted">${biz(s)}Kelimeleri doğru sıraya diz:</div><div class="word small">${h(s.tr)}</div>`,
    help: orderRule, explain: () => `Doğru: <b>${h(s.de)}</b> ${sayBtn(s.de)}${s.alts && s.alts.length ? `<div class="muted">Bu da doğru: ${s.alts.map(h).join(" / ")}</div>` : ""}${s.why ? "<br>" + h(s.why) : ""}` };
}
function translateEx(u, si) {
  const s = u.sentences[si];
  return { kind: "type", skill: "cumle", key: `t:${u.id}:${si}`, label: s.de, ref: { t: "trans", u: u.id, si }, biz: s.biz, answers: [s.de, ...(s.alts || [])], opt: { caseMatters: true, typoOk: true }, full: s.de,
    prompt: `<div class="muted">${biz(s)}Almancaya çevir:</div><div class="word small">${h(s.tr)}</div>`,
    help: (lemmaHelp(s) || "") + `<div class="muted" style="margin-top:6px">${orderRule}</div>`,
    explain: () => `Doğru: <b>${h(s.de)}</b> ${sayBtn(s.de)}${s.alts && s.alts.length ? `<div class="muted">Bu da doğru: ${s.alts.map(h).join(" / ")}</div>` : ""}${s.why ? "<br>" + h(s.why) : ""}` };
}
// Okuma / dinleme. list: "reading" | "listening" | "testReading" | "testListening"
function passageEx(u, list, pi, qi, testMode) {
  const kind = /reading/i.test(list) ? "okuma" : "dinleme";
  const p = u[list][pi], q = p.qs[qi];
  const options = q.t === "rf" ? ["richtig", "falsch"] : q.o || null;
  const ctx = kind === "okuma"
    ? `<details class="passage" open><summary>${biz(p)}📖 ${h(p.title)}</summary><div>${p.text.split("\n").map(x => `<p>${h(x)}</p>`).join("")}</div></details>`
    : `<div class="passage"><b>${biz(p)}🎧 ${h(p.title)}</b><div class="player"></div></div>`;
  return { kind: options ? "choice" : "type", skill: kind, key: `${list}:${u.id}:${pi}:${qi}`, label: q.q, ref: { t: "passage", list, u: u.id, pi, qi }, biz: p.biz,
    options, answers: [].concat(q.a), opt: { typoOk: true }, ctx, passage: { kind, list, u: u.id, pi, p, testMode },
    prompt: `<div class="qtext">${h(q.q)}</div>${q.t === "rf" ? `<div class="muted">richtig = doğru · falsch = yanlış</div>` : ""}`,
    help: kind === "okuma" ? "Soruyu oku, sonra metinde soruyla ilgili kelimeleri ara (isim, sayı, saat, yer)." : "Önce soruyu oku, sonra dinle. Sayı, saat, yer ve isimlere dikkat et. Hızı düşürebilirsin.",
    explain: () => q.why ? h(q.why) : "" };
}

// ---------- ilerleme ----------
const uState = id => (S.prog.units[id] = S.prog.units[id] || { cats: {}, passed: false, best: 0 });
const cState = (u, c) => (uState(u.id).cats[c] = uState(u.id).cats[c] || {});
const catsOf = u => CATS.filter(c => c.has(u));
const levelOf = u => LEVELS.find(l => l.units.includes(u.id));
function levelOpen(l) { if (S.admin) return true; const i = LEVELS.indexOf(l); return i === 0 || !!(S.prog.exams[LEVELS[i - 1].id] && S.prog.exams[LEVELS[i - 1].id].passed); }
function unitOpen(u) {
  if (S.admin) return true;
  const l = levelOf(u); if (!l || !levelOpen(l)) return false;
  const i = l.units.indexOf(u.id); return i === 0 || uState(l.units[i - 1]).passed;
}
const catDone = (u, c) => !!(uState(u.id).cats[c] && uState(u.id).cats[c].done);
function catOpen(u, c) { return S.admin || unitOpen(u); } // v0.6: kategoriler paralel; gramer yine mini ders okunmadan soru sormaz
const allCatsDone = u => catsOf(u).every(c => catDone(u, c.id));
function catProgress(u, c) {
  if (c === "kelime") { const n = u.words.length, m = u.words.filter(isMastered).length; return `${m}/${n}`; }
  if (c === "okuma" || c === "dinleme") { const list = c === "okuma" ? u.reading : u.listening, d = Object.keys(cState(u, c).passages || {}).length; return `${d}/${list.length}`; }
  return "";
}
function nextStep() {
  for (const u of UNITS) {
    if (!unitOpen(u) || uState(u.id).passed) continue;
    const open = catsOf(u).filter(c => !catDone(u, c.id));
    if (!open.length && !S.admin) return { u, cat: "test", label: `${u.title} · 🏁 Ünite testi` };
    if (open.length) return { u, cat: "today", label: `${u.title} · karışık: ${open.map(c => `${c.icon} ${c.name}${catProgress(u, c.id) ? " " + catProgress(u, c.id) : ""}`).join(" · ")}` };
  }
  return null;
}

// ---------- kayit ----------
function bumpWord(de, score) {
  const w = S.words[de] || (S.words[de] = { box: 0, learned: true });
  if (score === 1) w.box = Math.min(BOX_DAYS.length - 1, (w.box || 0) + 1); else if (score === 0) w.box = 0;
  w.due = Date.now() + (score === 1 ? BOX_DAYS[w.box] * DAY : score ? DAY : 0);
}
function record(ex, score, pas) {
  touchDay();
  const st = S.stats[ex.skill]; st.t++; if (score === 1) st.c++; if (score === 0.5) st.half++; if (pas) st.pas++;
  S.points += score === 1 ? 10 : score ? 5 : 0;
  if (score === 1) { const e = S.errors[ex.key]; if (e) { e.fix = (e.fix || 0) + 1; if (e.fix >= 2) delete S.errors[ex.key]; } }
  else {
    const e = S.errors[ex.key] || { key: ex.key, label: ex.label, skill: ex.skill, ref: ex.ref, n: 0, pas: 0, half: 0 };
    if (pas) e.pas = (e.pas || 0) + 1; else if (score) e.half = (e.half || 0) + 1; else e.n++;
    e.fix = 0; e.last = dayStr(); S.errors[ex.key] = e;
  }
  if (ex.ref && ex.ref.de && ex.skill === "wort") { bumpWord(ex.ref.de, score); if (score > 0) S.words[ex.ref.de].m = true; }
  else if (ex.ref && ex.ref.de && S.words[ex.ref.de]) bumpWord(ex.ref.de, score);
  save();
}
function exFromRef(r) {
  const u = r.u && unitById(r.u);
  if (r.t === "word" || r.t === "artikel" || r.t === "nom" || r.t === "akk") {
    const w = wordByDe(r.de); if (!w) return null;
    const opts = [wordEx(w)];
    if (w.art) { opts.push(artikelEx(w)); if (w.t && S.lessons.nominativ) opts.push(caseEx(w, S.lessons.akkusativ && r.t !== "nom" ? 1 : 0)); }
    return pick(opts);
  }
  if (r.t === "lied") return window.liedExFromRef ? window.liedExFromRef(r) : null;
  if (!u) return null;
  if (r.t === "gitem") return u.grammar[r.gi] && u.grammar[r.gi].items[r.ii] ? grammarItemEx(u, r.gi, r.ii) : null;
  if (r.t === "sent" || r.t === "trans") return u.sentences[r.si] ? (Math.random() < 0.5 ? orderEx(u, r.si) : translateEx(u, r.si)) : null;
  if (r.t === "passage") return u[r.list] && u[r.list][r.pi] ? passageEx(u, r.list, r.pi, r.qi, false) : null;
  return null;
}

// ---------- oturum kurma ----------
let run = null;
function startCat(uid, cat) {
  const u = unitById(uid);
  if (cat === "kelime") {
    const all = u.words, notM = all.filter(w => !isMastered(w));
    if (notM.length) {
      const batch = [...shuffle(notM.filter(isSeen)), ...shuffle(notM.filter(w => !isSeen(w)))].slice(0, WORD_BATCH);
      const fresh = batch.filter(w => !isSeen(w));
      const items = [...fresh.map(w => ({ kind: "learn", w })), ...shuffle(batch).map(wordEx)];
      return begin({ u, cat, items, mode: "words", title: `${u.title} · Kelime`,
        intro: `<b>Hedef: ünitenin ${all.length} kelimesi.</b> Şu an doğru yazdığın: <b>${all.length - notM.length}/${all.length}</b>.<br>Bu tur: ${fresh.length} yeni kelime${batch.length - fresh.length ? ` + ${batch.length - fresh.length} tekrar` : ""}, sonra yazarak test. Doğru yazdığın kelime sayılır; bilemediklerin sonraki turda tekrar gelir.<br>Hepsi bitince <b>${Math.min(WORD_FINAL, all.length)} soruluk kelime testi</b> (%${CAT_PASS * 100}) ile kategori geçilir.` });
    }
    const items = shuffle(all).slice(0, Math.min(WORD_FINAL, all.length)).map(w => w.art && Math.random() < 0.25 ? artikelEx(w) : wordEx(w));
    return begin({ u, cat, items, mode: "wordfinal", title: `${u.title} · Kelime testi`, intro: `Ünitenin ${all.length} kelimesinin hepsini en az bir kez doğru yazdın. Şimdi <b>${items.length} soruluk kelime testi</b>: geçmek için %${CAT_PASS * 100}.` });
  }
  if (cat === "gramer") {
    const unread = u.grammar.find(t => t.lesson && !S.lessons[t.lesson]);
    if (unread) return lessonScreen(unread.lesson, () => startCat(uid, cat));
    let items = [];
    u.grammar.forEach((t, gi) => { (t.items || []).forEach((_, ii) => items.push(grammarItemEx(u, gi, ii))); items.push(...genGrammar(u, gi)); });
    return begin({ u, cat, items: shuffle(items).slice(0, 12), title: `${u.title} · Gramer` });
  }
  if (cat === "cumle") {
    const items = shuffle(u.sentences.map((_, si) => si)).slice(0, 10).map((si, k) => k % 3 === 2 ? translateEx(u, si) : orderEx(u, si));
    return begin({ u, cat, items, title: `${u.title} · Cümle kurma` });
  }
  if (cat === "okuma" || cat === "dinleme") {
    const list = cat === "okuma" ? "reading" : "listening", done = cState(u, cat).passages || {};
    let pi = u[list].findIndex((_, k) => !done[k]);
    if (pi < 0) pi = Math.floor(Math.random() * u[list].length); // hepsi bitti: tekrar icin rastgele
    const items = u[list][pi].qs.map((_, qi) => passageEx(u, list, pi, qi, false));
    return begin({ u, cat, items, title: `${u.title} · ${cat === "okuma" ? "Okuma" : "Dinleme"} ${pi + 1}/${u[list].length}`, passageIdx: pi, list });
  }
  if (cat === "test" || cat === "skip") return startUnitTest(u, cat === "skip");
}
// v0.6 Bugünkü ders: ünitenin bitmemiş tüm kategorilerinden karışık tur + eski konulardan tekrar
const MIX_HIST = 10;
function pushHist(c, v) { c.hist = (c.hist || []).concat(v).slice(-MIX_HIST); return c.hist.length >= MIX_HIST && c.hist.reduce((a, b) => a + b, 0) / c.hist.length >= CAT_PASS; }
const histPct = c => Math.round(c.hist.reduce((a, b) => a + b, 0) / c.hist.length * 100);
function passRatio(u, cat) { const list = cat === "okuma" ? "reading" : "listening"; return Object.keys(cState(u, cat).passages || {}).length / u[list].length; }
function startToday(uid) {
  const u = unitById(uid), items = [], tag = (x, c) => { if (x) { x.tcat = c; items.push(x); } };
  const notDone = c => catsOf(u).some(x => x.id === c) && !catDone(u, c);
  const learn = [], lessons = [];
  if (notDone("kelime")) {
    const notM = u.words.filter(w => !isMastered(w));
    if (notM.length) {
      const batch = [...shuffle(notM.filter(isSeen)), ...shuffle(notM.filter(w => !isSeen(w)))].slice(0, 5);
      batch.filter(w => !isSeen(w)).forEach(w => learn.push({ kind: "learn", w }));
      batch.forEach(w => tag(wordEx(w), "kelime"));
    } else shuffle(u.words).slice(0, 5).forEach(w => tag(w.art && Math.random() < 0.25 ? artikelEx(w) : wordEx(w), "kelimetest"));
  }
  if (notDone("gramer")) {
    // turda en çok 1 yeni mini ders; sorular yalnız okunmuş konulardan + bu turun konusundan
    const nu = u.grammar.findIndex(t => t.lesson && !S.lessons[t.lesson]);
    if (nu >= 0) lessons.push({ kind: "lesson", id: u.grammar[nu].lesson });
    const g = []; u.grammar.forEach((t, gi) => { if (t.lesson && !S.lessons[t.lesson] && gi !== nu) return; (t.items || []).forEach((_, ii) => g.push(grammarItemEx(u, gi, ii))); g.push(...genGrammar(u, gi)); });
    shuffle(g).slice(0, 4).forEach(x => tag(x, "gramer"));
  }
  if (notDone("cumle")) shuffle(u.sentences.map((_, si) => si)).slice(0, 3).forEach((si, k) => tag(k === 2 ? translateEx(u, si) : orderEx(u, si), "cumle"));
  // kalıcılık: tekrar listesinden / eski kelimelerden 2 soru
  const revN = Math.max(2, 10 - items.length); // az kategori kaldıysa tur kısalmasın
  const rev = []; shuffle(Object.values(S.errors)).slice(0, revN).forEach(e => { const x = exFromRef(e.ref); if (x) rev.push(x); });
  if (rev.length < revN) shuffle(ALLWORDS.filter(isMastered)).filter(w => !rev.some(x => x.ref && x.ref.de === w.de)).slice(0, revN - rev.length).forEach(w => { const x = exFromRef({ t: "word", de: w.de }); if (x) rev.push(x); });
  rev.forEach(x => tag(x, "rev"));
  // okuma ya da dinleme: ilerlemesi az olandan bir metin, sonda blok halinde
  const pc = ["okuma", "dinleme"].filter(notDone).sort((a, b) => passRatio(u, a) - passRatio(u, b) || Math.random() - 0.5)[0];
  let pass = [], passInfo = null;
  if (pc) {
    const list = pc === "okuma" ? "reading" : "listening", done = cState(u, pc).passages || {}, pi = u[list].findIndex((_, k) => !done[k]);
    if (pi >= 0) { pass = u[list][pi].qs.map((_, qi) => Object.assign(passageEx(u, list, pi, qi, false), { tcat: pc })); passInfo = { cat: pc, list, pi }; }
  }
  const all = [...learn, ...lessons, ...shuffle(items), ...pass];
  if (!items.length && !pass.length) return startUnitTest(u, false);
  const parts = catsOf(u).filter(c => !catDone(u, c.id)).map(c => `${c.icon} ${c.name}`).join(", ");
  begin({ u, cat: "today", items: all, passInfo, title: `${u.title} · Bugünkü ders`,
    intro: `Bu tur karışık: <b>${parts}</b>${rev.length ? " + eski konulardan tekrar" : ""}.<br>Her cevap kendi kategorisine sayılır; bir kategori bitince ✓ olur. Hepsi bitince ünite testi açılır. Tek bir kategoriye odaklanmak istersen haritadaki düğmeler de açık.` });
}
function startUnitTest(u, skip) {
  const own = [];
  shuffle(u.words || []).slice(0, 5).forEach(w => own.push(w.art && Math.random() < 0.3 ? artikelEx(w) : wordEx(w)));
  const g = []; (u.grammar || []).forEach((t, gi) => { (t.items || []).forEach((_, ii) => g.push(grammarItemEx(u, gi, ii))); g.push(...genGrammar(u, gi)); });
  own.push(...shuffle(g).slice(0, 5));
  shuffle((u.sentences || []).map((_, si) => si)).slice(0, 3).forEach((si, k) => own.push(k ? orderEx(u, si) : translateEx(u, si)));
  const prev = UNITS.slice(0, UNITS.indexOf(u)).filter(x => uState(x.id).passed), old = [];
  for (let k = 0; k < 4 && prev.length; k++) {
    const x = pick(prev), r = Math.random();
    if (r < 0.4 && x.words && x.words.length) old.push(wordEx(pick(x.words)));
    else if (r < 0.7 && x.sentences && x.sentences.length) old.push(orderEx(x, Math.floor(Math.random() * x.sentences.length)));
    else if (x.grammar && x.grammar.length) { const gi = Math.floor(Math.random() * x.grammar.length), t = x.grammar[gi]; if (t.items && t.items.length) old.push(grammarItemEx(x, gi, Math.floor(Math.random() * t.items.length))); }
  }
  // Testte pratikte gorulmeyen metinler (yoksa pratik metinlerine duser)
  const pass = [];
  for (const [tl, pl] of [["testReading", "reading"], ["testListening", "listening"]]) {
    const list = u[tl] && u[tl].length ? tl : pl; if (!u[list] || !u[list].length) continue;
    const pi = Math.floor(Math.random() * u[list].length);
    u[list][pi].qs.slice(0, 4).forEach((_, qi) => pass.push(passageEx(u, list, pi, qi, true)));
  }
  begin({ u, cat: skip ? "skip" : "test", items: [...shuffle([...own, ...old]), ...pass], title: `${u.title} · ${skip ? "Atlama testi" : "Ünite testi"}`,
    intro: `Geçmek için en az <b>%${UNIT_PASS * 100}</b>. Doğru = 1, küçük yazım hatası = ½, yanlış/pas = 0 puan. Okuma ve dinleme metinleri pratikte görmediğin yeni metinler. Dinlemede en çok 2 kez dinleyebilirsin.` });
}
function startMix() {
  const now = Date.now(), items = [];
  shuffle(Object.values(S.errors)).slice(0, 5).forEach(e => { const x = exFromRef(e.ref); if (x) items.push(x); });
  const mastered = ALLWORDS.filter(isMastered);
  const pool = [...shuffle(mastered.filter(w => (wSt(w).due || 0) <= now)), ...shuffle(mastered)];
  for (const w of pool) { if (items.length >= 10) break; if (!items.some(x => x.ref && x.ref.de === w.de)) items.push(exFromRef({ t: "word", de: w.de })); }
  for (const u of UNITS) {
    if (items.length >= 12) break;
    if (catDone(u, "cumle") && u.sentences.length) items.push(orderEx(u, Math.floor(Math.random() * u.sentences.length)));
    if (catDone(u, "gramer")) { const gi = Math.floor(Math.random() * u.grammar.length), t = u.grammar[gi]; if (t.items && t.items.length) items.push(grammarItemEx(u, gi, Math.floor(Math.random() * t.items.length))); }
  }
  if (!items.length) return home("Karışık tekrar için önce bir ünitede kelime öğren.");
  begin({ u: null, cat: "mix", items: shuffle(items).slice(0, 12), title: "Karışık tekrar" });
}
function begin(o) {
  stopAudio();
  run = Object.assign({ i: 0, score: 0, plays: {} }, o);
  if (o.intro) $app.innerHTML = `<div class="card"><h2>${h(o.title)}</h2><p>${o.intro}</p><button class="primary" data-a="go">Başla</button> <button class="ghost" data-a="home">Geri</button></div>`;
  else step();
}

// ---------- soru akisi ----------
// Bilgi kartları (yeni kelime, mini ders) soru sayılmaz: sayaç ve çubuk yalnız soruları sayar
const isInfo = x => x.kind === "learn" || x.kind === "lesson";
const qTotal = () => run.items.filter(x => !isInfo(x)).length;
const qDone = () => run.items.slice(0, run.i).filter(x => !isInfo(x)).length;
function progressBar() { const t = qTotal(); return `<div class="progress"><i style="width:${t ? qDone() / t * 100 : 0}%"></i></div>`; }
function step() {
  stopAudio();
  if (run.i >= run.items.length) return finish();
  const ex = run.items[run.i];
  ex.state = { phase: ex.kind === "case" ? "role" : ex.kind === "order" ? "order" : "answer", built: [], bk: [], used: {} };
  if (ex.kind === "lesson") {
    const l = lessonById(ex.id);
    $app.innerHTML = `${progressBar()}<div class="card lessonbody"><div class="muted">${h(run.title)} · mini ders · gramer sorularından önce</div><h2>${h(l.title)}</h2>${l.html}
      <div class="row" style="margin-top:14px"><button class="primary" data-a="lessonread" data-id="${l.id}">Anladım, devam</button></div></div>`;
    return;
  }
  if (ex.kind === "learn") {
    const w = ex.w;
    $app.innerHTML = `${progressBar()}<div class="card"><div class="muted">${h(run.title)} · ${biz(w)}yeni kelime ${run.items.slice(0, run.i + 1).filter(x => x.kind === "learn").length}/${run.items.filter(x => x.kind === "learn").length} · bilgi kartı, soru değil · birazdan yazarak soracağım</div>
      <div class="word">${wHtml(w)} ${sayBtn(wLabel(w))}</div>
      <div>${w.pl ? `çoğul: die ${h(w.pl)} · ` : w.art ? "çoğulu yok / yalnız bu biçim · " : ""}<b>${h(w.tr)}</b></div>
      ${w.ex ? `<div class="sentence">${h(w.ex[0])} ${sayBtn(w.ex[0])}</div><div class="muted">${h(w.ex[1])}</div>` : ""}
      ${w.tip ? `<div class="muted">💡 ${h(w.tip)}</div>` : ""}
      <div class="row" style="margin-top:14px"><button class="primary" data-a="learned">Anladım, sonraki</button></div></div>`;
    speak(wLabel(w), true);
    return;
  }
  const label = ex.kind === "case" ? "Hâl (özne mi, nesne mi?)" : SKILLS[ex.skill];
  $app.innerHTML = `${progressBar()}<div class="card"><div class="qhead"><span class="muted">Soru ${qDone() + 1}/${qTotal()} · ${label}</span>
    <button class="help" data-a="help" aria-label="Açıklama">?</button></div><div id="helpBox"></div>
    ${ex.ctx || ""}${ex.prompt}<div id="zone"></div><div id="fb"></div></div>`;
  if (ex.passage && ex.passage.kind === "dinleme") renderPlayer(ex);
  renderZone(ex);
}
function playsLeft(ex) { const key = ex.passage.list + ex.passage.u + ":" + ex.passage.pi; return ex.passage.testMode ? 2 - (run.plays[key] || 0) : Infinity; }
function renderPlayer(ex) {
  const el = document.querySelector(".player"); if (!el) return;
  const left = playsLeft(ex);
  el.innerHTML = `<button class="primary" data-a="play" ${left <= 0 ? "disabled" : ""}>▶ Dinle${left !== Infinity ? ` (${left} hak)` : ""}</button>
    <button class="ghost" data-a="stop">■ Durdur</button>
    <span class="speeds">${[0.7, 0.85, 1].map(r => `<button class="ghost ${(run.rate || 0.85) === r ? "on" : ""}" data-a="rate" data-r="${r}">${r === 1 ? "normal" : r + "×"}</button>`).join("")}</span>`;
}
const pasBtn = `<button class="ghost pas" data-a="pas">Pas · bilmiyorum</button>`;
function renderZone(ex) {
  const z = document.getElementById("zone"), st = ex.state;
  if (st.phase === "role") {
    z.innerHTML = `<div class="step">1. adım: <b>${h(ex.w.de)}</b> bu cümlede ne?</div>
      <div class="opts"><button data-a="role" data-r="özne">Özne<br><small>kim/ne? · Nominativ</small></button><button data-a="role" data-r="nesne">Nesne<br><small>kimi/neyi? · Akkusativ</small></button></div>${pasBtn}`;
  } else if (st.phase === "order") {
    z.innerHTML = `<div class="built">${st.built.map((t, k) => `<button class="tile on" data-a="untile" data-k="${k}">${h(t)}</button>`).join("") || '<span class="muted">Kelimelere dokun…</span>'}</div>
      <div class="tiles">${ex.tiles.map((t, k) => st.used[k] ? "" : `<button class="tile" data-a="tile" data-k="${k}">${h(t)}</button>`).join("")}</div>
      <div class="row"><button class="primary" data-a="ordersubmit" ${st.built.length === ex.tiles.length ? "" : "disabled"}>Kontrol et</button>${pasBtn}</div>`;
  } else if (st.phase === "answer") {
    if (ex.kind === "choice") z.innerHTML = `<div class="opts">${ex.options.map(o => `<button class="${ex.colored ? o : ""}" data-a="choose" data-o="${h(o)}">${h(o)}</button>`).join("")}</div>${pasBtn}`;
    else {
      z.innerHTML = (ex.kind === "case" ? `<div class="step">Seçimin: <b>${h(st.role)}</b> · 2. adım: boşluğa yaz</div>` : "") +
        `<div class="typebox"><input id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${h(ex.placeholder || "")}">
        <div class="uml">${["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"].map(c => `<button data-a="uml" data-c="${c}">${c}</button>`).join("")}</div>
        <div class="row"><button class="primary" data-a="submit">Kontrol et</button>${pasBtn}</div></div>`;
      const inp = document.getElementById("ans"); inp.focus(); inp.addEventListener("keydown", e => { if (e.key === "Enter") submitTyped(); });
    }
  } else z.innerHTML = "";
}
function submitTyped() {
  const ex = run.items[run.i], v = document.getElementById("ans").value; if (!norm(v)) return;
  result(ex, v, checkText(v, ex.answers, ex.opt || {}), false);
}
function result(ex, given, check, pas) {
  const st = ex.state, roleOk = ex.kind !== "case" || pas || st.role === ex.role;
  const score = pas ? 0 : roleOk ? check.score : 0;
  record(ex, score, pas); run.score += score;
  st.phase = "done"; st.check = check; st.score = score; renderZone(ex);
  let head;
  if (score === 1) head = `<div class="good">✓ Richtig! +10</div>`;
  else if (score === 0.5) head = `<div class="warnbox">≈ Neredeyse doğru: +5</div>`;
  else if (pas) head = `<div class="infobox">⏭ Pas. Doğru cevap: <b>${h(ex.answers[0])}</b>${ex.kind === "case" ? ` (rol: ${h(ex.role)})` : ""}. Bu öğrenme adımı; tekrar listene eklendi, yeni cümlelerde dönecek.</div>`;
  else head = `<div class="bubble">✗ Yanlış, tekrar listesine eklendi.<br>Senin cevabın: <b>${h(given)}</b>${ex.kind === "case" ? ` (rol: ${h(st.role)})` : ""} · Doğrusu: <b>${h(ex.answers[0])}</b>${ex.kind === "case" ? ` (rol: ${h(ex.role)})` : ""}</div>`;
  const roleNote = ex.kind === "case" && !pas && !roleOk ? `<div class="bubble">Rol yanlış: <b>${h(ex.w.de)}</b> burada <b>${h(ex.role)}</b>.</div>` : "";
  const exp = ex.explain ? ex.explain() : "";
  document.getElementById("fb").innerHTML = `${head}${roleNote}${check.note ? `<div class="muted">${check.note}</div>` : ""}
    ${exp ? `<div class="explain">${exp}</div>` : ""}<div class="row" style="margin-top:12px"><button class="primary" data-a="next">Weiter</button></div>`;
  if (score === 1 && ex.full && !ex.passage) speak(ex.full, true);
}
function finish() {
  stopAudio();
  const qs = run.items.filter(x => x.kind !== "learn" && x.kind !== "lesson"), t = qs.length;
  const ratio = t ? run.score / t : 1, pct = Math.round(ratio * 100);
  let msg = "", extra = "";
  if (run.u && ["kelime", "gramer", "cumle", "okuma", "dinleme"].includes(run.cat)) {
    const c = cState(run.u, run.cat); c.best = Math.max(c.best || 0, pct);
    if (run.cat === "kelime") {
      const left = run.u.words.filter(w => !isMastered(w)).length;
      if (run.mode === "wordfinal") msg = ratio >= CAT_PASS ? (c.done = true, `Kelime testi geçildi (%${pct}). Kategori ✓.`) : `%${pct}. Kelime testini geçmek için %${CAT_PASS * 100} gerekli. Yanlışların tekrar listesinde; testi tekrar dene.`;
      else msg = left ? `Bu tur %${pct}. Doğru yazdığın kelimeler sayıldı: <b>${run.u.words.length - left}/${run.u.words.length}</b>. Kalan ${left} kelime sonraki turlarda.`
        : `Tüm ${run.u.words.length} kelimeyi en az bir kez doğru yazdın. Sıradaki adım: kelime testi.`;
    } else if (run.cat === "okuma" || run.cat === "dinleme") {
      const n = run.u[run.list].length;
      if (ratio >= CAT_PASS) {
        c.passages = c.passages || {}; c.passages[run.passageIdx] = true;
        const d = Object.keys(c.passages).length;
        if (d >= n) { c.done = true; msg = `Metin geçildi (%${pct}). ${run.cat === "okuma" ? "Okuma" : "Dinleme"} kategorisi tamamlandı (${d}/${n}).`; }
        else msg = `Metin geçildi (%${pct}). ${d}/${n} metin tamam; sıradaki metin açıldı.`;
      } else msg = `%${pct}. Bu metni geçmek için %${CAT_PASS * 100} gerekli; metni ve çeviriyi incele, sonra tekrar dene.`;
      const p = run.u[run.list][run.passageIdx];
      extra = `<details class="passage"><summary>Metin ve çeviri</summary>${(p.text || p.script.map(([s, l]) => `${s}: ${l}`).join("\n")).split("\n").map(x => `<p>${h(x)}</p>`).join("")}<p class="muted">${h(p.tr || "").replace(/\n/g, "<br>")}</p></details>`;
    } else {
      if (ratio >= CAT_PASS) { c.done = true; msg = `Kategori tamamlandı (%${pct}). Kategori ✓.`; }
      else msg = `%${pct}. Geçmek için %${CAT_PASS * 100} gerekli; bir tur daha.`;
    }
  } else if (run.cat === "test" || run.cat === "skip") {
    const st = uState(run.u.id); st.best = Math.max(st.best || 0, pct);
    const bySkill = {}; qs.forEach(x => { const b = bySkill[x.skill] = bySkill[x.skill] || { t: 0, s: 0 }; b.t++; b.s += (x.state && x.state.score) || 0; });
    const table = `<table><tr><th>Alan</th><th>Puan</th></tr>${Object.entries(bySkill).map(([k, b]) => `<tr><td>${SKILLS[k]}</td><td>${b.s}/${b.t}</td></tr>`).join("")}</table>`;
    if (ratio >= UNIT_PASS) {
      st.passed = true; if (run.cat === "skip") catsOf(run.u).forEach(c => { cState(run.u, c.id).done = true; });
      run.u.words.forEach(w => { S.words[w.de] = Object.assign(S.words[w.de] || { box: 1, due: Date.now() + DAY }, { learned: true, m: true }); });
      msg = `🎉 Ünite geçildi: %${pct}. Sıradaki ünite açıldı.`; S.points += 50;
    } else {
      const weak = Object.entries(bySkill).filter(([, b]) => b.s / b.t < UNIT_PASS).map(([k]) => SKILLS[k]);
      msg = `%${pct}, geçmek için %${UNIT_PASS * 100} gerekli.${weak.length ? ` Zayıf alanlar: <b>${weak.join(", ")}</b>. Karışık tekrarda çalış, sonra testi tekrar dene.` : ""}`;
    }
    extra = table;
  } else if (run.cat === "today") {
    const u = run.u, got = {}, lines = [];
    qs.forEach(x => { if (!x.tcat) return; const g = got[x.tcat] = got[x.tcat] || { s: 0, t: 0, v: [] }, v = (x.state && x.state.score) || 0; g.s += v; g.t++; g.v.push(v); });
    const left = u.words.filter(w => !isMastered(w)).length;
    if (got.kelime) lines.push(`🌱 Kelime: doğru yazdığın <b>${u.words.length - left}/${u.words.length}</b>${left ? "" : " · bundan sonra kelime testi soruları gelecek"}`);
    const hist = (key, cat, nm) => { if (!got[key]) return; const c = cState(u, cat); let ok = false; got[key].v.forEach(v => { ok = pushHist(c, v); }); if (ok) c.done = true;
      lines.push(c.done ? `${nm} ✓ tamamlandı` : `${nm}: son ${c.hist.length} cevabın %${histPct(c)} (geçmek için en az ${MIX_HIST} cevap ve %${CAT_PASS * 100})`); };
    hist("kelimetest", "kelime", "🌱 Kelime testi"); hist("gramer", "gramer", "📘 Gramer"); hist("cumle", "cumle", "🧩 Cümle kurma");
    if (run.passInfo) {
      const pi = run.passInfo, g = got[pi.cat], c = cState(u, pi.cat), n = u[pi.list].length, nm = pi.cat === "okuma" ? "📖 Okuma" : "🎧 Dinleme";
      if (g && g.s / g.t >= CAT_PASS) { c.passages = c.passages || {}; c.passages[pi.pi] = true; const d = Object.keys(c.passages).length; if (d >= n) c.done = true; lines.push(`${nm}: metin geçildi, ${d}/${n}${c.done ? " ✓" : ""}`); }
      else lines.push(`${nm}: bu metin %${g ? Math.round(g.s / g.t * 100) : 0}, geçmek için %${CAT_PASS * 100}; sonraki derste tekrar gelecek`);
      const p = u[pi.list][pi.pi];
      extra = `<details class="passage"><summary>Metin ve çeviri</summary>${(p.text || p.script.map(([s, l]) => `${s}: ${l}`).join("\n")).split("\n").map(x => `<p>${h(x)}</p>`).join("")}<p class="muted">${h(p.tr || "").replace(/\n/g, "<br>")}</p></details>`;
    }
    msg = `%${pct}.<br>${lines.join("<br>")}${allCatsDone(u) && !uState(u.id).passed ? "<br><b>Tüm kategoriler tamam: 🏁 ünite testi açıldı.</b>" : ""}`;
  } else if (run.cat === "lied" && window.liedFinish) msg = window.liedFinish(run, pct, ratio);
  else msg = `${run.score}/${t} puan.`;
  if (t && run.score === t) S.points += 20;
  save();
  $app.innerHTML = `<div class="card"><h2>${h(run.title)}</h2><div class="word">${run.score}/${t} <small class="muted">puan</small></div>
    <p>${msg}</p>${extra}<div class="row">${run.cat === "lied" ? `<button class="primary" data-a="lied" data-id="${h(run.liedId)}">Şarkıya dön</button><button class="ghost" data-a="lieder">🎵 Şarkılar</button>` : ""}<button class="${run.cat === "lied" ? "ghost" : "primary"}" data-a="home">Haritaya dön</button></div></div>`;
}

// ---------- ekranlar ----------
function home(msg) {
  stopAudio(); run = null;
  if (!S.name) return nameScreen(true);
  const n = S.today.day === dayStr() ? S.today.n : 0, ns = nextStep();
  $app.innerHTML = `${msg ? `<div class="good">${h(msg)}</div>` : ""}
    ${S.admin ? `<div class="infobox">🔑 <b>Yönetici modu açık:</b> tüm hazır içerik kilitsiz. İlerleme yine kaydedilir. Kapatmak için sağ üstteki 🔑.</div>` : ""}
    <div class="card"><h2>Hallo, ${h(S.name)}! <button class="ghost small" data-a="name" aria-label="Adını değiştir">✏️</button></h2>
      <div class="muted">Bugünkü hedef: ${Math.min(n, DAILY_GOAL)}/${DAILY_GOAL} cevap</div>
      <div class="progress"><i style="width:${Math.min(100, n / DAILY_GOAL * 100)}%"></i></div>
      <div class="muted" id="voiceState">${voiceStateHtml()}</div></div>
    <div class="menu">
      ${ns ? `<button class="big today" data-a="cat" data-u="${ns.u.id}" data-c="${ns.cat}"><b>▶ Bugünkü ders</b><small>${h(ns.label)}</small></button>` : ""}
      <button class="big" data-a="mix"><b>🔀 Karışık tekrar</b><small>Eski + yeni, hatalar önce · ${Object.keys(S.errors).length} tekrar kaydı</small></button>
      <button class="big" data-a="notes"><b>📒 Ders notları</b><small>Unuttuğun konuyu aç: sein, Akkusativ, mein/sein… · ara ve oku</small></button>
      <button class="big" data-a="lieder"><b>🎵 Şarkılarla öğren</b><small>Dinle, sözleri takip et, anlamını çöz · kendi şarkını da ekleyebilirsin</small></button>
    </div>
    ${LEVELS.map(levelHtml).join("")}
    <div class="menu" style="margin-top:10px"><button class="big" data-a="level"><b>📊 Seviye paneli</b><small>Beceri bazlı durum ve tekrar listesi</small></button>
    <button class="big" data-a="voice"><b>🔊 Ses ayarı</b><small>Almanca sesi seç ve dene</small></button>
    <button class="big" data-a="backup"><b>💾 İlerleme yedeği</b><small>Telefon ↔ bilgisayar arasında ilerlemeni taşı</small></button></div>`;
}
// Kullanıcı adı: ilk açılışta bir kez sorulur, yalnız bu cihazda saklanır, ✏️ ile değişir
function nameScreen(first) {
  stopAudio(); run = null;
  $app.innerHTML = `<div class="card"><h2>${first ? "Willkommen! 👋" : "Adını değiştir"}</h2>
    <p>${first ? "Sana nasıl hitap edeyim?" : "Yeni adını yaz."} <span class="muted">Ad yalnız bu cihazda saklanır.</span></p>
    <form id="nameForm" class="typebox"><input id="nameIn" maxlength="30" autocomplete="given-name" placeholder="Adın" value="${h(S.name || "")}">
    <button class="primary" type="submit">Kaydet</button></form>${first ? "" : `<button class="ghost" data-a="home" style="margin-top:10px">Vazgeç</button>`}</div>`;
  const i = document.getElementById("nameIn"); i.focus();
  document.getElementById("nameForm").addEventListener("submit", e => { e.preventDefault(); const v = i.value.trim().slice(0, 30); if (!v) { i.focus(); return; } S.name = v; save(); home(); });
}
function levelHtml(l) {
  const open = levelOpen(l), units = l.units.map(unitById).filter(Boolean);
  const passed = units.filter(u => uState(u.id).passed).length, exam = S.prog.exams[l.id];
  return `<div class="level ${open ? "" : "locked"}"><div class="levelhead"><h3>${open ? "" : "🔒 "}${h(l.id)} · ${h(l.title)}</h3><span class="muted">${passed}/${l.plannedUnits || units.length} ünite</span></div>
    ${units.map(unitHtml).join("")}
    ${(l.planned || []).map(t => `<div class="unit locked"><b>🔒 ${h(t)}</b> <small class="muted">içerik hazırlanıyor</small></div>`).join("")}
    <div class="unit locked"><b>🎓 ${h(l.id)} seviye sınavı</b>
      <small class="muted">${exam && exam.passed ? `Geçildi: %${exam.pct}` : `Goethe formatına yakın · geçme %70 · ${(l.planned || []).length ? "ünitelerin içeriği tamamlanınca hazırlanacak" : "tüm üniteler geçilince açılır"}`}</small></div></div>`;
}
function unitHtml(u) {
  const open = unitOpen(u), st = uState(u.id), cs = catsOf(u);
  const doneN = cs.filter(c => catDone(u, c.id)).length, cur = nextStep(), isCur = cur && cur.u === u;
  const chips = cs.map(c => { const d = catDone(u, c.id), o = catOpen(u, c.id), pr = catProgress(u, c.id);
    return `<button class="chip ${d ? "done" : o ? "open" : ""}" ${o || d ? `data-a="cat" data-u="${u.id}" data-c="${c.id}"` : "disabled"}>${d ? "✓" : o ? c.icon : "🔒"} ${c.name}${pr ? ` <small>${pr}</small>` : ""}</button>`; }).join("");
  const testOpen = open && (allCatsDone(u) || S.admin);
  return `<details class="unit ${open ? "" : "locked"}" ${isCur ? "open" : ""}><summary><b>${st.passed ? "✅" : open ? "🟢" : "🔒"} Ünite ${u.no}: ${h(u.title)}</b>
    <small class="muted">${st.passed ? `geçildi · en iyi test %${st.best}` : `${doneN}/${cs.length} kategori`}</small></summary>
    ${u.canDo ? `<div class="muted cando">Hedef: ${u.canDo.map(h).join(" · ")}</div>` : ""}
    <div class="chips">${chips}
      <button class="chip test ${testOpen ? "open" : ""}" ${testOpen ? `data-a="cat" data-u="${u.id}" data-c="test"` : "disabled"}>🏁 Ünite testi</button></div>
    ${open && !st.passed && !doneN ? `<button class="ghost small" data-a="cat" data-u="${u.id}" data-c="skip">Bu üniteyi biliyorum → atlama testi</button>` : ""}</details>`;
}
function lessonScreen(id, then) {
  stopAudio(); const l = lessonById(id); run = { lessonThen: then };
  $app.innerHTML = `<div class="card lessonbody"><div class="muted">Mini ders · alıştırmadan önce</div><h2>${h(l.title)}</h2>${l.html}
    <div class="row" style="margin-top:14px"><button class="primary" data-a="lessonok" data-id="${l.id}">Anladım, alıştırmaya geç</button><button class="ghost" data-a="home">Sonra</button></div></div>`;
}
function voiceScreen() {
  stopAudio(); run = null;
  const list = deVoices.map(v => `<option ${v === deVoice ? "selected" : ""}>${h(v.name)}</option>`).join("");
  $app.innerHTML = `<div class="card"><h2>Ses ayarı</h2>
    <p>Uygulamadaki tüm Almanca kelime, cümle ve diyaloglar <b>önceden kaydedilmiş ses dosyası</b> olarak gelir: her telefonda ve bilgisayarda aynı ses, internetsiz de çalışır. Cihazın ses ayarı gerekmez.</p>
    <div class="row"><button class="primary" data-a="say" data-t="Ich sehe den Hund.">🔊 Dene: "Ich sehe den Hund."</button></div>
    <h3>Ses gelmiyorsa</h3>
    <ul><li><b>iPhone:</b> ses düğmesiyle medya sesini aç. Şarkı melodisi gelmiyorsa yandaki <b>sessiz mod düğmesini</b> kapat (eski iOS sürümlerinde gerekir).</li>
    <li>İlk kez internet açıkken uygulamayı bir süre açık tut; sesler cihaza iner, sonra internetsiz çalışır.</li></ul>
    <h3>Yedek ses (yalnız kendi şarkının sözleri gibi kayıtlı olmayan metinler için)</h3>
    ${deVoices.length ? `<select id="vsel">${list}</select><div class="row" style="margin-top:10px"><button class="ghost" data-a="vtest">Yedek sesi dene</button></div>`
      : `<p class="muted">Bu cihazda Almanca yedek ses yok; kayıtlı olmayan metinler sessiz kalır (Türkçe sesle yanlış okumasın diye).</p>`}
    <button class="ghost" data-a="home" style="margin-top:12px">← Geri</button></div>`;
}
function level() {
  stopAudio(); run = null;
  const lbl = p => p >= 80 ? "Güçlü" : p >= 50 ? "Gelişiyor" : "Çalışılmalı";
  const total = Object.values(S.stats).reduce((a, s) => a + s.t, 0);
  const rows = Object.entries(SKILLS).map(([k, name]) => {
    const s = S.stats[k], sc = s.c + s.half / 2, p = s.t ? Math.round(sc / s.t * 100) : 0;
    return `<div class="skill"><div><span>${name}</span><span>${s.t ? `${p}% · ${lbl(p)} <small class="muted">(${s.c} doğru, ${s.half} yazım hatası, ${s.pas} pas, ${s.t - s.c - s.half - s.pas} yanlış)</small>` : "henüz veri yok"}</span></div><div class="bar"><i style="width:${p}%"></i></div></div>`;
  }).join("");
  const errs = Object.values(S.errors).sort((a, b) => (b.n + (b.pas || 0)) - (a.n + (a.pas || 0)));
  $app.innerHTML = `<div class="card"><h2>Seviye paneli</h2>${rows}
    <p class="muted">${total < 20 ? `Yeterli veri için en az 20 cevap gerekir (şu an ${total}).` : `Toplam ${total} cevap.`} CEFR seviyesi seviye sınavıyla ölçülür. Son ölçüm (2026-11-17): A1 başı-orta.</p></div>
    <div class="card"><h2>Tekrar listesi</h2>${errs.length ? `<ul class="err">${errs.map(e => `<li>${h(e.label)} <span class="muted">(${h(SKILLS[e.skill] || e.skill)}: ${e.n}× yanlış, ${e.pas || 0}× pas)</span></li>`).join("")}</ul>` : `<p class="muted">Boş.</p>`}</div>
    <button class="ghost" data-a="home">← Geri</button>`;
}

const KEEP_AUDIO = new Set(["say", "play", "rate", "help", "uml", "tile", "untile"]);
const actions = {
  home: () => home(), name: () => nameScreen(false), level, voice: () => voiceScreen(), mix: startMix, go: step,
  cat: d => d.c === "today" ? startToday(d.u) : startCat(d.u, d.c), say: d => speak(d.t), stop: stopAudio,
  lessonok: d => { S.lessons[d.id] = dayStr(); save(); const then = run && run.lessonThen; then ? then() : home(); },
  lessonread: d => { S.lessons[d.id] = dayStr(); save(); run.i++; step(); },
  learned: () => { const w = run.items[run.i].w; S.words[w.de] = Object.assign(S.words[w.de] || { box: 0 }, { learned: true, due: Date.now() }); save(); run.i++; step(); },
  help: () => { const b = document.getElementById("helpBox"), ex = run.items[run.i]; b.innerHTML = b.innerHTML ? "" : `<div class="helpbox">${ex.state.phase === "done" && ex.explain ? ex.explain() : ex.help || ""}</div>`; },
  role: d => { const ex = run.items[run.i]; ex.state.role = d.r; ex.state.phase = "answer"; renderZone(ex); },
  choose: d => { const ex = run.items[run.i]; result(ex, d.o, { score: ex.answers.includes(d.o) ? 1 : 0, note: "" }, false); },
  submit: () => submitTyped(), pas: () => result(run.items[run.i], "", { score: 0, note: "" }, true),
  tile: d => { const ex = run.items[run.i], st = ex.state; st.used[d.k] = true; st.built.push(ex.tiles[d.k]); st.bk.push(+d.k); renderZone(ex); },
  untile: d => { const ex = run.items[run.i], st = ex.state, k = +d.k; delete st.used[st.bk[k]]; st.built.splice(k, 1); st.bk.splice(k, 1); renderZone(ex); },
  ordersubmit: () => { const ex = run.items[run.i], g = ex.state.built.join(" "); result(ex, g, checkText(g, ex.answers, { caseMatters: false }), false); },
  play: () => { const ex = run.items[run.i], key = ex.passage.list + ex.passage.u + ":" + ex.passage.pi; if (playsLeft(ex) <= 0) return; run.plays[key] = (run.plays[key] || 0) + 1; playScript(ex.passage.p.script, run.rate || 0.85); renderPlayer(ex); },
  rate: d => { run.rate = +d.r; renderPlayer(run.items[run.i]); },
  uml: d => { const i = document.getElementById("ans"); const p = i.selectionStart ?? i.value.length; i.value = i.value.slice(0, p) + d.c + i.value.slice(i.selectionEnd ?? p); i.focus(); i.setSelectionRange(p + 1, p + 1); },
  vtest: () => { const sel = document.getElementById("vsel"); deVoice = deVoices.find(v => v.name === sel.value) || deVoice; S.voiceName = deVoice ? deVoice.name : ""; save(); stopAudio(); if (deVoice) speechSynthesis.speak(utter("Ich sehe den Hund.", deVoice)); },
  next: () => { run.i++; step(); }
};
$app.addEventListener("click", e => {
  const b = e.target.closest("[data-a]"); if (!b || b.disabled) return;
  if (b.tagName !== "SUMMARY") e.preventDefault();
  if (!KEEP_AUDIO.has(b.dataset.a)) stopAudio();
  actions[b.dataset.a](b.dataset, b);
});
document.getElementById("homeBtn").addEventListener("click", () => home());
if (!DEV) document.getElementById("adminBtn").remove();
else document.getElementById("adminBtn").addEventListener("click", () => {
  if (!S.admin && !confirm("Yönetici modu: tüm hazır üniteler, kategoriler ve testler kilitsiz açılır. Açılsın mı?")) return;
  S.admin = !S.admin; save(); home();
});
window.addEventListener("pagehide", stopAudio);
header(); home();
