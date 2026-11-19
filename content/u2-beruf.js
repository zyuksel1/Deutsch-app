window.CONTENT_PART = {
  unit: "a1-u2",
  words: [
    { de: "Team", art: "das", pl: "Teams", tr: "ekip, takım", ex: ["Das Team ist in Bremen.", "Ekip Bremen'de."], biz: true },
    { de: "Mitarbeiter", art: "der", pl: "Mitarbeiter", tr: "çalışan, personel (erkek)", t: "p", ex: ["Wir sind vier Mitarbeiter.", "Dört çalışanız."], tip: "Kadın: die Mitarbeiterin (Mitarbeiterinnen). Çoğulda değişmez.", biz: true },
    { de: "Ansprechpartner", art: "der", pl: "Ansprechpartner", tr: "muhatap, irtibat kişisi (erkek)", t: "p", ex: ["Herr Lange ist mein Ansprechpartner.", "Bay Lange benim irtibat kişim."], tip: "Kadın: die Ansprechpartnerin. Çoğulda değişmez.", biz: true },
    { de: "Ansprechpartnerin", art: "die", pl: "Ansprechpartnerinnen", tr: "muhatap, irtibat kişisi (kadın)", t: "p", ex: ["Frau Krüger ist die Ansprechpartnerin.", "Bayan Krüger irtibat kişisi."], biz: true },
    { de: "Lieferant", art: "der", pl: "Lieferanten", tr: "tedarikçi", ex: ["Der Lieferant kommt aus Polen.", "Tedarikçi Polonya'dan."], tip: "Lieferant n-çekimli bir isimdir: der Lieferant, çoğul die Lieferanten.", biz: true },
    { de: "Kunde", art: "der", pl: "Kunden", tr: "müşteri (erkek)", ex: ["Herr Berg ist Kunde.", "Bay Berg müşteri."], tip: "Kunde n-çekimli bir isimdir. Kadın: die Kundin (Kundinnen).", biz: true },
    { de: "Angebot", art: "das", pl: "Angebote", tr: "teklif", t: "t", ex: ["Das Angebot ist gut.", "Teklif iyi."], biz: true },
    { de: "Preis", art: "der", pl: "Preise", tr: "fiyat", ex: ["Der Preis ist fünfzig Euro.", "Fiyat elli euro."], biz: true },
    { de: "Rechnung", art: "die", pl: "Rechnungen", tr: "fatura", t: "t", ex: ["Die Rechnung ist da.", "Fatura geldi."], biz: true },
    { de: "Bestellung", art: "die", pl: "Bestellungen", tr: "sipariş", ex: ["Die Bestellung ist von Herrn Berg.", "Sipariş Bay Berg'den."], biz: true },
    { de: "Produkt", art: "das", pl: "Produkte", tr: "ürün", t: "t", ex: ["Das Produkt ist neu.", "Ürün yeni."], biz: true },
    { de: "E-Mail-Adresse", art: "die", pl: "E-Mail-Adressen", tr: "e-posta adresi", ex: ["Meine E-Mail-Adresse ist info@firma.de.", "E-posta adresim info@firma.de."], tip: "Okunuş: @ = 'ät', . = 'Punkt'.", biz: true },
    { de: "Durchwahl", art: "die", pl: "Durchwahlen", tr: "dahili numara", ex: ["Meine Durchwahl ist 45.", "Dahili numaram 45."], tip: "Telefonnumarasının sonuna eklenen dahili numara.", biz: true },
    { de: "Erzählen Sie etwas über sich.", tr: "Kendinizden biraz bahsedin. (mülakat sorusu)", alts: ["Erzählen Sie etwas über sich"], ex: ["Erzählen Sie etwas über sich, Frau Schmidt.", "Kendinizden biraz bahsedin, Bayan Schmidt."], tip: "Mülakatta çok sık gelen açılış isteği; kalıp olarak ezberle.", biz: true },
    { de: "Willkommen im Team!", tr: "Ekibe hoş geldiniz!", alts: ["Willkommen im Team"], ex: ["Willkommen im Team, Herr Nowak!", "Ekibe hoş geldiniz, Bay Nowak!"], tip: "'im Team' kalıp.", biz: true },
    { de: "Ihr Ansprechpartner ist ...", tr: "İrtibat kişiniz ... (kalıp)", alts: ["Ihr Ansprechpartner ist"], ex: ["Ihr Ansprechpartner ist Herr Brandt.", "İrtibat kişiniz Bay Brandt."], tip: "Resmî 'Sie' için Ihr (büyük I) yazılır.", biz: true }
  ],
  sentences: [
    { de: "Das ist mein Team.", tr: "Bu benim ekibim.", lemmas: ["das", "sein", "mein", "das Team"], alts: [], why: "Team nötr (das) olduğu için mein (ek yok).", biz: true },
    { de: "Herr Lange ist mein Ansprechpartner.", tr: "Bay Lange benim irtibat kişim.", lemmas: ["der Herr", "Lange", "sein", "mein", "der Ansprechpartner"], alts: ["Mein Ansprechpartner ist Herr Lange."], why: "Ansprechpartner maskülen (der) → mein.", biz: true },
    { de: "Meine Durchwahl ist fünfundvierzig.", tr: "Dahili numaram kırk beş.", lemmas: ["mein", "die Durchwahl", "sein", "fünfundvierzig"], alts: ["Meine Durchwahl ist 45."], why: "Durchwahl dişil (die) → meine.", biz: true },
    { de: "Der Lieferant kommt aus Polen.", tr: "Tedarikçi Polonya'dan geliyor.", lemmas: ["der Lieferant", "kommen", "aus", "Polen"], alts: [], why: "er/sie/es → kommt.", biz: true },
    { de: "Wir haben zwei Lieferanten in Italien.", tr: "İtalya'da iki tedarikçimiz var.", lemmas: ["wir", "haben", "zwei", "der Lieferant", "in", "Italien"], alts: ["In Italien haben wir zwei Lieferanten."], why: "wir → haben. Lieferant çoğulu: Lieferanten.", biz: true },
    { de: "Das Angebot ist gut.", tr: "Teklif iyi.", lemmas: ["das Angebot", "sein", "gut"], alts: [], why: "Das (artikel) + Angebot; ist = sein.", biz: true },
    { de: "Der Preis ist fünfzig Euro.", tr: "Fiyat elli euro.", lemmas: ["der Preis", "sein", "fünfzig", "der Euro"], alts: [], why: "Euro sayıdan sonra çoğul eki almaz: fünfzig Euro.", biz: true },
    { de: "Die Rechnung ist achtzig Euro.", tr: "Fatura seksen euro.", lemmas: ["die Rechnung", "sein", "achtzig", "der Euro"], alts: [], why: "Rechnung dişil (die).", biz: true },
    { de: "Frau Krüger ist die Ansprechpartnerin.", tr: "Bayan Krüger irtibat kişisi.", lemmas: ["die Frau", "Krüger", "sein", "die Ansprechpartnerin"], alts: [], why: "Kadın: die Ansprechpartnerin.", biz: true },
    { de: "Erzählen Sie etwas über sich.", tr: "Kendinizden biraz bahsedin.", lemmas: ["erzählen", "Sie", "etwas", "über", "sich"], alts: [], why: "Kalıp: mülakatta kullanılan resmî istek.", biz: true },
    { de: "Ich habe zwei Kollegen im Einkauf.", tr: "Satın almada iki iş arkadaşım var.", lemmas: ["ich", "haben", "zwei", "der Kollege", "in", "der Einkauf"], alts: ["Im Einkauf habe ich zwei Kollegen."], why: "'im Einkauf' kalıp. Kollege çoğulu: Kollegen.", biz: true },
    { de: "Willkommen im Team, Frau Brandt!", tr: "Ekibe hoş geldiniz, Bayan Brandt!", lemmas: ["willkommen", "in", "das Team", "die Frau", "Brandt"], alts: [], why: "'im Team' kalıp.", biz: true }
  ],
  reading: [
    {
      title: "E-Mail: Das Team im Einkauf",
      text: "Hallo Herr Albers,\ndas ist das Team im Einkauf bei der Firma Sommer in Bremen.\nWir sind vier Mitarbeiter. Frau Weiß ist die Chefin.\nHerr Özkan und Frau Lenz sind Kollegen. Ich bin Tim Hahn.\nMein Büro ist Zimmer 5. Herr Özkan hat Zimmer 6.\nWillkommen im Team!\nViele Grüße\nTim Hahn",
      tr: "Merhaba Bay Albers,\nbu, Bremen'deki Sommer firmasının satın alma ekibi.\nDört çalışanız. Bayan Weiß şef.\nBay Özkan ve Bayan Lenz iş arkadaşları. Ben Tim Hahn.\nOfisim 5 numaralı oda. Bay Özkan'ın odası 6 numara.\nEkibe hoş geldiniz!\nSelamlar\nTim Hahn",
      biz: true,
      qs: [
        { t: "rf", q: "Das Team arbeitet in Bremen.", a: "richtig", why: "Metinde: 'das ist das Team im Einkauf bei der Firma Sommer in Bremen.'" },
        { t: "rf", q: "Frau Lenz ist die Chefin.", a: "falsch", why: "Metinde: 'Frau Weiß ist die Chefin.'" },
        { t: "mc", q: "Wie viele Mitarbeiter sind im Team?", o: ["drei", "vier", "fünf"], a: "vier", why: "Metinde: 'Wir sind vier Mitarbeiter.'" },
        { t: "short", q: "Wie heißt die Chefin?", a: ["Frau Weiß", "Weiß"], why: "Metinde: 'Frau Weiß ist die Chefin.'" },
        { t: "short", q: "Welche Zimmernummer hat das Büro von Tim Hahn?", a: ["5", "Zimmer 5"], why: "Metinde: 'Mein Büro ist Zimmer 5.'" }
      ]
    },
    {
      title: "E-Mail: Ihr Ansprechpartner",
      text: "Sehr geehrte Frau Costa,\nHerr Brandt ist Ihr Ansprechpartner bei der Firma Vogel.\nSeine Telefonnummer ist 0221 77 88 0. Seine Durchwahl ist 23.\nSeine E-Mail-Adresse ist h.brandt@vogel-gmbh.de.\nHerr Brandt arbeitet im Einkauf. Er spricht Deutsch und Englisch.\nMit freundlichen Grüßen\nLisa Sander\nFirma Vogel, Abteilung Einkauf",
      tr: "Sayın Bayan Costa,\nBay Brandt, Vogel firmasında sizin irtibat kişinizdir.\nTelefon numarası 0221 77 88 0. Dahili numarası 23.\nE-posta adresi h.brandt@vogel-gmbh.de.\nBay Brandt satın almada çalışıyor. Almanca ve İngilizce konuşuyor.\nSaygılarımla\nLisa Sander\nVogel firması, Satın alma bölümü",
      biz: true,
      qs: [
        { t: "rf", q: "Herr Brandt ist der Ansprechpartner von Frau Costa.", a: "richtig", why: "Metinde: 'Herr Brandt ist Ihr Ansprechpartner bei der Firma Vogel.'" },
        { t: "rf", q: "Herr Brandt spricht Türkisch und Deutsch.", a: "falsch", why: "Metinde: 'Er spricht Deutsch und Englisch.'" },
        { t: "mc", q: "Wie ist die Durchwahl von Herrn Brandt?", o: ["13", "23", "32"], a: "23", why: "Metinde: 'Seine Durchwahl ist 23.'" },
        { t: "short", q: "Wie ist die E-Mail-Adresse von Herrn Brandt?", a: ["h.brandt@vogel-gmbh.de"], why: "Metinde: 'Seine E-Mail-Adresse ist h.brandt@vogel-gmbh.de.'" },
        { t: "short", q: "In welcher Abteilung arbeitet Herr Brandt?", a: ["Einkauf", "im Einkauf"], why: "Metinde: 'Herr Brandt arbeitet im Einkauf.'" }
      ]
    }
  ],
  listening: [
    {
      title: "Neue Kollegin im Büro",
      script: [
        ["A", "Hallo! Sind Sie Frau Seidel?"],
        ["B", "Ja, guten Tag. Ich bin neu im Team."],
        ["A", "Willkommen im Team! Ich bin Jonas Peters. Ich arbeite auch im Einkauf."],
        ["B", "Freut mich, Herr Peters."],
        ["A", "Mein Büro ist Zimmer 8. Meine Durchwahl ist 31."],
        ["B", "Und wer ist die Chefin?"],
        ["A", "Das ist Frau Ott. Ihr Büro ist Zimmer 1."],
        ["B", "Danke, Herr Peters!"]
      ],
      tr: "A: Merhaba! Siz Bayan Seidel misiniz?\nB: Evet, iyi günler. Ekipte yeniyim.\nA: Ekibe hoş geldiniz! Ben Jonas Peters. Ben de satın almada çalışıyorum.\nB: Memnun oldum, Bay Peters.\nA: Ofisim 8 numaralı oda. Dahili numaram 31.\nB: Peki şef kim?\nA: Bayan Ott. Onun ofisi 1 numaralı oda.\nB: Teşekkürler, Bay Peters!",
      biz: true,
      qs: [
        { t: "rf", q: "Frau Seidel ist neu im Team.", a: "richtig", why: "'Ich bin neu im Team.'" },
        { t: "rf", q: "Herr Peters ist der Chef.", a: "falsch", why: "'Ich bin Jonas Peters. Ich arbeite auch im Einkauf.' Die Chefin ist Frau Ott." },
        { t: "mc", q: "Wie ist die Durchwahl von Herrn Peters?", o: ["13", "31", "38"], a: "31", why: "'Meine Durchwahl ist 31.'" },
        { t: "short", q: "Wie heißt die Chefin?", a: ["Frau Ott", "Ott"], why: "'Das ist Frau Ott.'" },
        { t: "short", q: "Welche Zimmernummer hat das Büro von Herrn Peters?", a: ["8", "Zimmer 8", "acht"], why: "'Mein Büro ist Zimmer 8.'" }
      ]
    },
    {
      title: "Vorstellungsgespräch: Erzählen Sie etwas über sich",
      script: [
        ["A", "Guten Tag, Herr Krause. Ich bin Frau Hartmann von der Firma Ruhr."],
        ["B", "Guten Tag, Frau Hartmann."],
        ["A", "Erzählen Sie etwas über sich."],
        ["B", "Ich heiße Andreas Krause. Ich komme aus Istanbul und wohne in Essen."],
        ["A", "Was sind Sie von Beruf?"],
        ["B", "Ich bin Einkäufer. Ich habe zwei Kollegen im Team."],
        ["A", "Wer ist Ihr Ansprechpartner im Team?"],
        ["B", "Herr Voss ist mein Ansprechpartner."],
        ["A", "Sehr gut. Vielen Dank, Herr Krause."],
        ["B", "Auf Wiedersehen, Frau Hartmann."]
      ],
      tr: "A: İyi günler, Bay Krause. Ben Ruhr firmasından Bayan Hartmann.\nB: İyi günler, Bayan Hartmann.\nA: Kendinizden biraz bahsedin.\nB: Adım Andreas Krause. İstanbul'danım ve Essen'de oturuyorum.\nA: Mesleğiniz nedir?\nB: Satın almacıyım. Ekipte iki iş arkadaşım var.\nA: Ekipte irtibat kişiniz kim?\nB: Bay Voss benim irtibat kişim.\nA: Çok iyi. Çok teşekkürler, Bay Krause.\nB: Hoşça kalın, Bayan Hartmann.",
      biz: true,
      qs: [
        { t: "rf", q: "Herr Krause wohnt in Essen.", a: "richtig", why: "'Ich komme aus Istanbul und wohne in Essen.'" },
        { t: "rf", q: "Herr Krause ist Chef.", a: "falsch", why: "'Ich bin Einkäufer.'" },
        { t: "mc", q: "Wie viele Kollegen hat Herr Krause im Team?", o: ["einen", "zwei", "drei"], a: "zwei", why: "'Ich habe zwei Kollegen im Team.'" },
        { t: "short", q: "Woher kommt Herr Krause?", a: ["Istanbul", "İstanbul", "aus Istanbul", "aus İstanbul"], why: "'Ich komme aus Istanbul.'" },
        { t: "short", q: "Wer ist der Ansprechpartner von Herrn Krause?", a: ["Herr Voss", "Voss"], why: "'Herr Voss ist mein Ansprechpartner.'" }
      ]
    }
  ],
  testReading: [
    {
      title: "E-Mail: Angebot von der Firma Berger",
      text: "Sehr geehrte Damen und Herren,\nhier ist das Angebot von der Firma Berger.\nDas Produkt ist Nummer 45. Der Preis ist 20 Euro.\nMein Name ist Ralf Berger. Ich bin Ihr Ansprechpartner.\nMeine Telefonnummer ist 0341 55 22 11. Meine Durchwahl ist 12.\nMit freundlichen Grüßen\nRalf Berger\nFirma Berger, Leipzig",
      tr: "Sayın Bayanlar ve Baylar,\nBerger firmasının teklifi burada.\nÜrün 45 numara. Fiyat 20 euro.\nAdım Ralf Berger. Ben sizin irtibat kişinizim.\nTelefon numaram 0341 55 22 11. Dahili numaram 12.\nSaygılarımla\nRalf Berger\nBerger firması, Leipzig",
      biz: true,
      qs: [
        { t: "rf", q: "Ralf Berger ist der Ansprechpartner.", a: "richtig", why: "Metinde: 'Ich bin Ihr Ansprechpartner.'" },
        { t: "rf", q: "Die Firma Berger ist in Köln.", a: "falsch", why: "Metinde: 'Firma Berger, Leipzig'." },
        { t: "mc", q: "Wie ist der Preis?", o: ["12 Euro", "20 Euro", "45 Euro"], a: "20 Euro", why: "Metinde: 'Der Preis ist 20 Euro.'" },
        { t: "short", q: "Wie ist die Durchwahl von Herrn Berger?", a: ["12"], why: "Metinde: 'Meine Durchwahl ist 12.'" },
        { t: "short", q: "Welche Nummer hat das Produkt?", a: ["45", "Nummer 45"], why: "Metinde: 'Das Produkt ist Nummer 45.'" }
      ]
    }
  ],
  testListening: [
    {
      title: "Erster Tag im Team",
      script: [
        ["A", "Guten Tag, ich bin Eva Fuchs. Ich bin die Chefin im Einkauf."],
        ["B", "Guten Tag, Frau Fuchs. Mein Name ist Klaus Werner. Ich bin neu."],
        ["A", "Willkommen im Team, Herr Werner! Woher kommen Sie?"],
        ["B", "Ich komme aus Ankara."],
        ["A", "Und wie ist Ihre Telefonnummer?"],
        ["B", "Meine Telefonnummer ist 0151 44 55 66."],
        ["A", "Danke. Frau Maier ist Ihre Ansprechpartnerin. Ihre Durchwahl ist 52."],
        ["B", "Vielen Dank, Frau Fuchs!"]
      ],
      tr: "A: İyi günler, ben Eva Fuchs. Satın almanın şefiyim.\nB: İyi günler, Bayan Fuchs. Adım Klaus Werner. Yeniyim.\nA: Ekibe hoş geldiniz, Bay Werner! Nerelisiniz?\nB: Ankara'dan geliyorum.\nA: Telefon numaranız nedir?\nB: Telefon numaram 0151 44 55 66.\nA: Teşekkürler. Bayan Maier sizin irtibat kişiniz. Dahili numarası 52.\nB: Çok teşekkürler, Bayan Fuchs!",
      biz: true,
      qs: [
        { t: "rf", q: "Frau Fuchs ist die Chefin im Einkauf.", a: "richtig", why: "'Ich bin die Chefin im Einkauf.'" },
        { t: "rf", q: "Herr Werner kommt aus Izmir.", a: "falsch", why: "'Ich komme aus Ankara.'" },
        { t: "mc", q: "Wer ist die Ansprechpartnerin von Herrn Werner?", o: ["Frau Fuchs", "Frau Maier", "Frau Werner"], a: "Frau Maier", why: "'Frau Maier ist Ihre Ansprechpartnerin.'" },
        { t: "short", q: "Wie ist die Telefonnummer von Herrn Werner?", a: ["0151 44 55 66", "015144 55 66", "0151445566"], why: "'Meine Telefonnummer ist 0151 44 55 66.'" },
        { t: "short", q: "Wie ist die Durchwahl von Frau Maier?", a: ["52", "zweiundfünfzig"], why: "'Ihre Durchwahl ist 52.'" }
      ]
    }
  ],
  uncertain: [
    "Kunde/Kundin: 'Herr Berg ist Kunde' (artikelsiz meslek/rol) kabul edilebilir; 'Kunde' bir meslek olmadığı için 'ein Kunde' daha doğal olabilir; örnek cümleyi 'Herr Berg ist Kunde bei ...' yerine değiştirmek istersen bildir.",
    "Sentence 'Meine Durchwahl ist fünfundvierzig.' sayı yazıyla; alts'ta '45' rakamla verildi.",
    "'Ihr Ansprechpartner ist ...' words listesinde kalıp (üç nokta); hizalama motoru üç noktayı nasıl işliyor kontrol et.",
    "Euro: 'fünfzig Euro' (çoğul eki yok) doğru; 'der Euro' lemma'sı sözlük hali olarak eklendi.",
    "Sentence 'Das Angebot ist gut.' lemmas'ta 'das' ve 'Angebot' ayrı yazıldı (artikel+isim 'das Angebot' olmadığı için çünkü cümlede artikel 'Das'); 'das Angebot' olarak birleştirmek daha tutarlı olabilir.",
    "Okuma 1 (Ünite 2): 'Herr Özkan hat Zimmer 6.' artikelsiz Zimmer + sayı (oda numarası) doğru, ama A1 için 'haben' ile kullanımı biraz alışılmadık.",
    "Listening 2: 'Wer ist Ihr Ansprechpartner im Team?' mülakatta pek gerçekçi değil; A1 kelimesini pratik etmek için tercih edildi."
  ]
};
