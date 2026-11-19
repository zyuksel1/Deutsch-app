// Seviye haritasi ve Claude denetim yamalari. Icerik: units-a1.js (Ünite 1-2).
(function () {
  window.LESSONS.push(...window.NEW_LESSONS);
  const U = window.UNIT_DRAFTS;

  // --- Ek icerik parcalarini birlestir (content/*.js: genel + 💼 is Almancasi). Claude denetimi: 2026-11-17 ---
  const dropWords = ["Ich bin ... von der Firma ...", "Ihr Ansprechpartner ist ..."]; // yazdirilamayan kaliplar
  const dropSent = ["Mit freundlichen Grüßen, Hannah Schmidt", "Viele Grüße, Sophie Richter"]; // kapanistan sonra virgul yanlis
  const allLemmas = {};
  for (const part of window.CONTENT_PARTS || []) {
    const u = U.find(x => x.id === part.unit); if (!u) continue;
    const have = new Set(u.words.map(w => w.de));
    (part.words || []).forEach(w => { if (!have.has(w.de) && !dropWords.includes(w.de)) { u.words.push(w); have.add(w.de); } });
    for (const [lesson, items] of Object.entries(part.grammarItems || {})) { const t = u.grammar.find(g => g.lesson === lesson); if (t) t.items.push(...items); }
    u.sentences.push(...(part.sentences || []).filter(s => !dropSent.includes(s.de)));
    for (const k of ["reading", "listening", "testReading", "testListening"]) u[k] = [...(u[k] || []), ...(part[k] || [])];
    Object.assign(allLemmas, part.lemmasFor || {});
  }
  U.forEach(u => u.sentences.forEach(s => { if (!s.lemmas && allLemmas[s.de]) s.lemmas = allLemmas[s.de]; }));
  U.forEach(u => u.words.forEach(w => {
    if (w.de === "Mit freundlichen Grüßen") w.ex = ["Mit freundlichen Grüßen\nHannah Schmidt", "Saygılarımla,\nHannah Schmidt (Almancada kapanıştan sonra virgül yok, ad alt satırda)"];
    if (w.de === "Viele Grüße") w.ex = ["Viele Grüße\nSophie Richter", "Selamlar,\nSophie Richter"];
    if (w.de === "Kunde") w.ex = ["Herr Berg ist ein Kunde.", "Bay Berg bir müşteri."];
  }));

  // Hal alistirmasinda yanlis/anlamsiz cumle uretecek isimler (n-dekl. Herr/Name, yalniz cogul, ulke, soyut)
  const noCase = ["Name", "Vorname", "Nachname", "Alter", "Adresse", "Straße", "Telefonnummer", "Sprache", "Stadt", "Jahr",
    "Türkei", "Deutschland", "Herr", "Eltern", "Geschwister", "Familie", "Postleitzahl", "Hausnummer", "E-Mail-Adresse",
    "Firma", "Büro", "E-Mail", "Angebot", "Rechnung", "Großeltern", "Kollege", "Kunde", "Lieferant"];
  U.forEach(u => u.words.forEach(w => { if (noCase.includes(w.de)) delete w.t; }));
  // Deutschland artikelsiz kullanilir; artikel sorusu yanlis ogretmesin
  U.forEach(u => u.words.forEach(w => { if (w.de === "Deutschland") { delete w.art; w.tip = "Artikelsiz kullanılır: in Deutschland, aus Deutschland (sözlükte: das)."; } }));
  U.forEach(u => u.words.forEach(w => { if (w.de === "Wie geht's?") w.alts = ["Wie geht es?", "Wie gehts?"]; }));

  // Cumle dizme / ceviri: gecerli diger dizilisler (fiil 2. sirada)
  const alts = {
    "Ich heiße Hannah.": ["Hannah heiße ich."],
    "Ich komme aus der Türkei.": ["Aus der Türkei komme ich."],
    "Ich wohne in Köln.": ["In Köln wohne ich."],
    "Ich bin 25 Jahre alt.": ["25 Jahre alt bin ich."],
    "Er spricht Deutsch und Türkisch.": ["Er spricht Türkisch und Deutsch.", "Deutsch und Türkisch spricht er."],
    "Wir lernen Deutsch.": ["Deutsch lernen wir."],
    "Anna arbeitet in Berlin.": ["In Berlin arbeitet Anna."],
    "Das ist Herr Müller.": ["Herr Müller ist das."],
    "Sie kommen aus Deutschland.": ["Aus Deutschland kommen sie."],
    "Das ist meine Familie.": ["Meine Familie ist das."],
    "Ich habe eine Schwester.": ["Eine Schwester habe ich."],
    "Meine Mutter heißt Sabine.": ["Sabine heißt meine Mutter."],
    "Mein Vater arbeitet in Köln.": ["In Köln arbeitet mein Vater."],
    "Er hat zwei Kinder.": ["Zwei Kinder hat er."],
    "Das ist mein Freund Tom.": ["Mein Freund Tom ist das."],
    "Meine Eltern kommen aus der Türkei.": ["Aus der Türkei kommen meine Eltern."],
    "Ihre Tochter ist drei Jahre alt.": ["Drei Jahre alt ist ihre Tochter."],
    "Seine Schwester lernt Deutsch.": ["Deutsch lernt seine Schwester."],
    "Mein Onkel wohnt in Hamburg.": ["In Hamburg wohnt mein Onkel."],
    "Mein Onkel und meine Tante sind verheiratet.": ["Meine Tante und mein Onkel sind verheiratet."]
  };
  U.forEach(u => u.sentences.forEach(s => { if (alts[s.de]) s.alts = [...(s.alts || []), ...alts[s.de]]; }));

  window.LEVELS = [
    { id: "A1.1", title: "Başlangıç 1", units: ["a1-u1", "a1-u2"], plannedUnits: 6,
      planned: ["Wohnen", "Essen, Trinken, Einkaufen", "Mein Tag", "Freizeit"] },
    { id: "A1.2", title: "Başlangıç 2", units: [], plannedUnits: 6,
      planned: ["Reisen und Verkehr", "Arbeit und Lernen", "Einkaufen und Dienstleistungen", "Umwelt", "Urlaub und Unterkunft", "Prüfungstraining A1"] }
  ];
  window.UNITS = U;
})();
