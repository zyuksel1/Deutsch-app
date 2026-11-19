"use strict";
// v0.7 📒 Ders notları: tüm mini dersler tek yerde + aramada; sorularda "?" balonuna ilgili ders notu eklenir.
(function () {
  // Sorudaki cümleden ilgili dersleri bulma (yalnız var olan dersler gösterilir)
  const DETECT = [
    ["possessiv", /\b(?:[Mm]ein|[Dd]ein|[Ss]ein|[Ii]hr|[Uu]nser|[Ee]uer)(?:e|en|em|er|es)?\s+[A-ZÄÖÜ][a-zäöüß]/],
    ["akkusativ", /\b(?:den|einen|keinen|meinen|deinen|seinen|ihren|unseren)\b/],
    ["sein-pronomen", /\b(?:bin|bist|ist|sind|seid)\b/],
    ["haben", /\b(?:habe|hast|hat|haben|habt)\b/],
    ["w-fragen", /^(?:Wer|Was|Wie|Wo|Woher|Wohin|Wann|Warum|Welche[rsnm]?)\b/]
  ];
  function lessonsFor(ex) {
    const ids = [];
    if (ex.ref && ex.ref.t === "gitem") { const u = unitById(ex.ref.u), t = u && u.grammar[ex.ref.gi]; if (t && t.lesson) ids.push(t.lesson); }
    if (ex.kind === "case") ids.push("nominativ", "akkusativ");
    if (ex.skill === "artikel") ids.push("artikel");
    const txt = [ex.full, ex.answers && ex.answers[0], ex.label].filter(x => typeof x === "string").join(" \n ");
    if (ex.skill !== "wort" && ex.skill !== "artikel") DETECT.forEach(([id, re]) => { if (re.test(txt)) ids.push(id); });
    return [...new Set(ids)].map(lessonById).filter(Boolean).slice(0, 3);
  }
  const noteBlock = ls => ls.length ? `<div class="notelinks">${ls.map(l => `<details class="note"><summary>📒 Ders notu: <b>${h(l.title)}</b></summary><div class="lessonbody">${l.html}</div></details>`).join("")}</div>` : "";

  const origHelp = actions.help;
  actions.help = (d, b) => { origHelp(d, b); const box = document.getElementById("helpBox"); if (box && box.innerHTML && run && run.items) box.firstElementChild.insertAdjacentHTML("beforeend", noteBlock(lessonsFor(run.items[run.i]))); };

  // Ders → ünite eşlemesi
  function groups() {
    const seen = new Set(), out = [];
    UNITS.forEach(u => { const ls = (u.grammar || []).map(t => t.lesson).filter(id => id && !seen.has(id) && lessonById(id)); ls.forEach(id => seen.add(id)); if (ls.length) out.push({ title: `Ünite ${u.no}: ${u.title}`, ids: ls }); });
    const rest = LESSONS.map(l => l.id).filter(id => !seen.has(id));
    if (rest.length) out.push({ title: "Genel", ids: rest });
    return out;
  }
  const plain = s => String(s || "").replace(/<[^>]+>/g, " ").toLowerCase();
  function listHtml(q) {
    q = (q || "").trim().toLowerCase();
    const res = groups().map(g => {
      const ls = g.ids.map(lessonById).filter(l => !q || (l.title + " " + (l.summary || "") + " " + plain(l.html)).toLowerCase().includes(q));
      return ls.length ? `<h3>${h(g.title)}</h3>${ls.map(l => { const r = S.lessons[l.id];
        return `<button class="big" data-a="note" data-id="${h(l.id)}"><b>${r ? "✓ " : ""}${h(l.title)}</b><small>${h(l.summary || "")}${r ? "" : " · henüz derste gelmedi"}</small></button>`; }).join("")}` : "";
    }).join("");
    return res || `<p class="muted">"${h(q)}" için not bulunamadı. Bu konu henüz derslere eklenmemiş olabilir (ör. Dativ: der → dem, A1.2'de gelecek).</p>`;
  }
  // R37: bir nota girip geri dönünce liste aynı kaydırma konumunda ve aynı arama kelimesiyle açılır.
  // Ana ekrandan her giriş temiz başlar. (app.js her ekran değişiminde en başa kaydırır; konumu o işlem bittikten sonra geri veririz.)
  const NS = { q: "", y: 0, back: false };
  function notesScreen(restore) {
    stopAudio(); run = null;
    const keep = restore === true && NS.back; NS.back = false;
    if (!keep) { NS.q = ""; NS.y = 0; }
    $app.innerHTML = `<div class="card"><h2>📒 Ders notları</h2>
      <p class="muted">Derslerde gördüğün tüm mini dersler burada. "Bu neydi?" dediğin kelimeyi ara: <i>sein, Akkusativ, den, mein, haben</i>…</p>
      <div class="typebox"><input id="noteq" type="search" placeholder="Ara: ör. sein, Akkusativ, den" autocomplete="off" value="${h(NS.q)}"></div>
      <div class="menu" id="notelist" style="margin-top:10px">${listHtml(NS.q)}</div></div>
      <button class="ghost" data-a="home">← Geri</button>`;
    const i = document.getElementById("noteq");
    i.addEventListener("input", () => { NS.q = i.value; document.getElementById("notelist").innerHTML = listHtml(i.value); });
    if (keep && NS.y > 0) setTimeout(() => window.scrollTo(0, NS.y), 0);
  }
  function noteScreen(id) {
    stopAudio(); const l = lessonById(id); if (!l) return notesScreen(false);
    $app.innerHTML = `<div class="card lessonbody"><div class="muted">📒 Ders notu${S.lessons[id] ? ` · ilk okuma: ${h(S.lessons[id])}` : ""}</div><h2>${h(l.title)}</h2>${l.html}
      <div class="row" style="margin-top:14px"><button class="primary" data-a="notesback">← Ders notları</button><button class="ghost" data-a="home">Ana ekran</button></div></div>`;
    window.scrollTo(0, 0);
  }
  actions.notes = () => notesScreen(false);
  actions.notesback = () => notesScreen(true);
  actions.note = d => {
    const qi = document.getElementById("noteq"); // listeden mi açıldı?
    if (qi) { NS.q = qi.value; NS.y = window.scrollY; NS.back = true; } else NS.back = false;
    noteScreen(d.id);
  };
  KEEP_AUDIO.add("help");
  window.lessonsFor = lessonsFor;
})();
// Yanlış / pas / yarım cevaptan sonra ilgili ders notu geri bildirimin altında kapalı olarak görünür
(function () {
  const orig = window.result;
  window.result = function (ex, given, check, pas) {
    orig.apply(this, arguments);
    if (check && check.score === 1 && !pas) return;
    const fb = document.getElementById("fb"), ls = window.lessonsFor(ex);
    if (fb && ls.length) fb.insertAdjacentHTML("beforeend", `<div class="notelinks">${ls.map(l => `<details class="note"><summary>📒 Unuttun mu? Ders notu: <b>${h(l.title)}</b></summary><div class="lessonbody">${l.html}</div></details>`).join("")}</div>`);
  };
})();
