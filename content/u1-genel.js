window.CONTENT_PART = {
  unit: "a1-u1",
  words: [
    { de: "Postleitzahl", art: "die", pl: "Postleitzahlen", tr: "posta kodu", t: "t", ex: ["Die Postleitzahl ist 50667.", "Posta kodu 50667."], tip: "Kısaltması PLZ. Almanya'da 5 haneli." },
    { de: "Hausnummer", art: "die", pl: "Hausnummern", tr: "bina numarası, kapı numarası", t: "t", ex: ["Die Hausnummer ist 15.", "Bina numarası 15."], tip: "Almancada numara sokak adından sonra gelir: Lindenstraße 12." },
    { de: "E-Mail-Adresse", art: "die", pl: "E-Mail-Adressen", tr: "e-posta adresi", t: "t", ex: ["Die E-Mail-Adresse ist hier.", "E-posta adresi burada."], tip: "Okunuşu: @ = 'ät', . = 'Punkt'." },
    { de: "Land", art: "das", pl: "Länder", tr: "ülke", ex: ["Italien ist ein Land.", "İtalya bir ülkedir."], tip: "Çoğulda a → ä olur: die Länder." },
    { de: "Italien", tr: "İtalya", ex: ["Marco kommt aus Italien.", "Marco İtalya'dan geliyor."], tip: "Artikelsiz ülke: in Italien, aus Italien." },
    { de: "Spanien", tr: "İspanya", ex: ["Sara kommt aus Spanien.", "Sara İspanya'dan geliyor."], tip: "Artikelsiz ülke: in Spanien, aus Spanien." },
    { de: "Englisch", tr: "İngilizce", ex: ["Ich spreche Englisch.", "İngilizce konuşuyorum."], tip: "Dil adları büyük yazılır ve artikelsiz kullanılır: Englisch, Deutsch." },
    { de: "Türkisch", tr: "Türkçe", ex: ["Wir sprechen Türkisch.", "Türkçe konuşuyoruz."], tip: "Dil adları büyük yazılır ve artikelsiz kullanılır." },
    { de: "Entschuldigung!", tr: "Pardon! Affedersiniz!", alts: ["Entschuldigung"], ex: ["Entschuldigung, sind Sie Frau Berg?", "Affedersiniz, Bayan Berg siz misiniz?"], tip: "Dikkat çekmek ve özür dilemek için kullanılır." },
    { de: "Danke!", tr: "Teşekkürler!", alts: ["Danke"], ex: ["Danke, gut. Und du?", "Teşekkürler, iyiyim. Ya sen?"], tip: "Daha nazik: Vielen Dank!" },
    { de: "Bitte!", tr: "Lütfen! / Rica ederim!", alts: ["Bitte"], ex: ["Telefonnummer, bitte?", "Telefon numarası, lütfen?"], tip: "Hem 'lütfen' hem 'rica ederim' anlamına gelir." },
    { de: "Tschüs!", tr: "Hoşça kal! (samimi)", alts: ["Tschüs"], ex: ["Tschüs, Tom!", "Hoşça kal, Tom!"], tip: "Samimi veda. Resmî: Auf Wiedersehen!" },
    { de: "ja", tr: "evet", ex: ["Ja, ich wohne hier.", "Evet, burada oturuyorum."] },
    { de: "nein", tr: "hayır", ex: ["Nein, ich komme aus Spanien.", "Hayır, İspanya'dan geliyorum."] },
    { de: "gut", tr: "iyi", ex: ["Danke, gut.", "Teşekkürler, iyiyim."] },
    { de: "auch", tr: "de, da; ayrıca", ex: ["Ich lerne auch Englisch.", "Ben de İngilizce öğreniyorum."], tip: "Cümlede genelde fiilden sonra gelir." },
    { de: "jetzt", tr: "şimdi", ex: ["Sara wohnt jetzt in Madrid.", "Sara şimdi Madrid'de oturuyor."] },
    { de: "hier", tr: "burada", ex: ["Ich wohne hier.", "Burada oturuyorum."] }
  ],
  grammarItems: {
    "sein-pronomen": [
      { q: "Mein Name ___ Eva.", a: ["ist"], o: ["bin", "bist", "ist"], tr: "Benim adım Eva.", why: "Der Name = er/sie/es gibi tek kişi/nesne → ist." },
      { q: "___ du Tom?", a: ["Bist", "bist"], o: ["Bin", "Bist", "Ist"], tr: "Sen Tom musun?", why: "Evet/hayır sorusunda fiil başta: du → bist." },
      { q: "Wir ___ aus Spanien.", a: ["sind"], o: ["sind", "seid", "bin"], tr: "Biz İspanya'dan.", why: "wir → sind." },
      { q: "Ihr ___ jetzt in Wien.", a: ["seid"], o: ["sind", "seid", "ist"], tr: "Siz şimdi Viyana'dasınız.", why: "ihr → seid." },
      { q: "___ er 30 Jahre alt?", a: ["Ist", "ist"], tr: "O 30 yaşında mı?", why: "Evet/hayır sorusu: fiil başta, er → ist." },
      { q: "Entschuldigung, ___ Sie Frau Berg?", a: ["sind"], o: ["bist", "ist", "sind"], tr: "Affedersiniz, Bayan Berg siz misiniz?", why: "Resmî Sie (siz) → sind." }
    ],
    "praesens-verben": [
      { q: "Ich ___ Englisch. (sprechen)", a: ["spreche"], tr: "İngilizce konuşuyorum.", why: "ich → kök + -e: spreche (e → i değişimi yok, yalnız du/er'de olur)." },
      { q: "Lena ___ in Madrid. (wohnen)", a: ["wohnt"], o: ["wohne", "wohnst", "wohnt"], tr: "Lena Madrid'de oturuyor.", why: "Lena = sie (o) → kök + -t: wohnt." },
      { q: "Du ___ Italienisch. (sprechen)", a: ["sprichst"], tr: "İtalyanca konuşuyorsun.", why: "sprechen düzensiz: du sprichst (e → i)." },
      { q: "Wir ___ aus Polen. (kommen)", a: ["kommen"], tr: "Biz Polonya'dan geliyoruz.", why: "wir → mastar ile aynı: kommen." },
      { q: "Ihr ___ Deutsch. (lernen)", a: ["lernt"], o: ["lernen", "lernt", "lernst"], tr: "Siz Almanca öğreniyorsunuz.", why: "ihr → kök + -t: lernt." },
      { q: "Herr Braun ___ in München. (arbeiten)", a: ["arbeitet"], tr: "Bay Braun Münih'te çalışıyor.", why: "er → -t; kök -t ile bittiği için araya -e- girer: arbeitet." },
      { q: "Ich ___: M-A-X. (buchstabieren)", a: ["buchstabiere"], tr: "Harf harf söylüyorum: M-A-X.", why: "ich → kök + -e: buchstabiere." },
      { q: "Du ___ Sara. (heißen)", a: ["heißt"], tr: "Adın Sara.", why: "du + heißen → heißt (kök ß ile bittiği için -st değil, yalnız -t)." }
    ],
    "w-fragen": [
      { q: "___ wohnt Lena? – In Bonn.", a: ["Wo", "wo"], o: ["Wo", "Woher", "Wer"], tr: "Lena nerede oturuyor? – Bonn'da.", why: "Wo = nerede (yer)." },
      { q: "___ kommt Marco? – Aus Italien.", a: ["Woher", "woher"], o: ["Wo", "Woher", "Was"], tr: "Marco nereli? – İtalya'dan.", why: "Woher = nereden (köken)." },
      { q: "___ spricht Eva? – Spanisch.", a: ["Was", "was"], o: ["Wer", "Was", "Wo"], tr: "Eva ne konuşuyor? – İspanyolca.", why: "Was = ne." },
      { q: "___ ist das? – Das ist Frau Braun.", a: ["Wer", "wer"], o: ["Wer", "Wie", "Wo"], tr: "Bu kim? – Bu Bayan Braun.", why: "Wer = kim (kişi)." },
      { q: "Wie ___ ist Lena? – 19 Jahre alt.", a: ["alt"], tr: "Lena kaç yaşında? – 19 yaşında.", why: "Yaş sorusu: Wie alt ist ...?" },
      { q: "Woher ___ Sie, Herr Silva?", a: ["kommen"], o: ["kommen", "kommt", "kommst"], tr: "Nerelisiniz, Bay Silva?", why: "Resmî Sie → kommen; fiil soru kelimesinden sonra, 2. sırada." },
      { q: "Wo ___ du? – In Rom.", a: ["wohnst"], o: ["wohne", "wohnst", "wohnt"], tr: "Nerede oturuyorsun? – Roma'da.", why: "du → wohnst; fiil 2. sırada." },
      { q: "Wo ___ ihr jetzt? – In Hamburg.", a: ["arbeitet"], o: ["arbeiten", "arbeitet", "arbeitest"], tr: "Siz şimdi nerede çalışıyorsunuz? – Hamburg'da.", why: "ihr → -t; kök -t ile bittiği için araya -e- girer: arbeitet." }
    ],
    "zahlen-alphabet": [
      { q: "12 = ___", a: ["zwölf", "zwoelf"], tr: "12 = on iki", why: "12 özel bir sayıdır: zwölf." },
      { q: "16 = ___", a: ["sechzehn"], tr: "16 = on altı", why: "sechs'in -s'si düşer: sechzehn." },
      { q: "60 = ___", a: ["sechzig"], tr: "60 = altmış", why: "sechs'in -s'si düşer: sechzig." },
      { q: "70 = ___", a: ["siebzig"], tr: "70 = yetmiş", why: "sieben'in -en'i düşer: siebzig." },
      { q: "34 = ___", a: ["vierunddreißig", "vierunddreissig"], tr: "34 = otuz dört", why: "Önce birler: vier + und + dreißig." },
      { q: "78 = ___", a: ["achtundsiebzig"], tr: "78 = yetmiş sekiz", why: "acht + und + siebzig." }
    ]
  },
  sentences: [
    { de: "Ich spreche Englisch und Türkisch.", tr: "İngilizce ve Türkçe konuşuyorum.", lemmas: ["ich", "sprechen", "Englisch", "und", "Türkisch"], alts: ["Englisch und Türkisch spreche ich."] },
    { de: "Marco kommt aus Italien.", tr: "Marco İtalya'dan geliyor.", lemmas: ["Marco", "kommen", "aus", "Italien"], alts: ["Aus Italien kommt Marco."] },
    { de: "Sara wohnt jetzt in Madrid.", tr: "Sara şimdi Madrid'de oturuyor.", lemmas: ["Sara", "wohnen", "jetzt", "in", "Madrid"], alts: ["Jetzt wohnt Sara in Madrid."] },
    { de: "Wie ist die Telefonnummer, bitte?", tr: "Telefon numarası nedir, lütfen?", lemmas: ["wie", "sein", "die Telefonnummer", "bitte"], alts: ["Bitte, wie ist die Telefonnummer?"] },
    { de: "Die Hausnummer ist fünfzehn.", tr: "Bina numarası on beş.", lemmas: ["die Hausnummer", "sein", "fünfzehn"], alts: [] },
    { de: "Entschuldigung, sind Sie Frau Berg?", tr: "Affedersiniz, Bayan Berg siz misiniz?", lemmas: ["Entschuldigung", "sein", "Sie", "Frau", "Berg"], alts: [] },
    { de: "Lena ist neunzehn Jahre alt.", tr: "Lena on dokuz yaşında.", lemmas: ["Lena", "sein", "neunzehn", "das Jahr", "alt"], alts: [] },
    { de: "Ja, ich wohne hier.", tr: "Evet, burada oturuyorum.", lemmas: ["ja", "ich", "wohnen", "hier"], alts: ["Ja, hier wohne ich."] },
    { de: "Nein, ich komme aus Spanien.", tr: "Hayır, İspanya'dan geliyorum.", lemmas: ["nein", "ich", "kommen", "aus", "Spanien"], alts: ["Nein, aus Spanien komme ich."] },
    { de: "Ich lerne auch Englisch.", tr: "Ben de İngilizce öğreniyorum.", lemmas: ["ich", "lernen", "auch", "Englisch"], alts: ["Englisch lerne ich auch."] },
    { de: "Wohnt ihr jetzt in Bonn?", tr: "Siz şimdi Bonn'da mı oturuyorsunuz?", lemmas: ["wohnen", "ihr", "jetzt", "in", "Bonn"], alts: [], why: "Evet/hayır sorusunda fiil başa gelir." },
    { de: "Danke, gut. Und du?", tr: "Teşekkürler, iyiyim. Ya sen?", lemmas: ["danke", "gut", "und", "du"], alts: [] },
    { de: "Marco und Sara sprechen Spanisch.", tr: "Marco ve Sara İspanyolca konuşuyor.", lemmas: ["Marco", "und", "Sara", "sprechen", "Spanisch"], alts: ["Spanisch sprechen Marco und Sara."], why: "İki kişi = onlar (sie) → sprechen." },
    { de: "Ich bin Marco und ich komme aus Italien.", tr: "Ben Marco'yum ve İtalya'dan geliyorum.", lemmas: ["ich", "sein", "Marco", "und", "ich", "kommen", "aus", "Italien"], alts: [] },
    { de: "Sprichst du Englisch oder Spanisch?", tr: "İngilizce mi yoksa İspanyolca mı konuşuyorsun?", lemmas: ["sprechen", "du", "Englisch", "oder", "Spanisch"], alts: [], why: "Evet/hayır sorusunda fiil başa gelir; du sprichst (e → i)." },
    { de: "Frau Berg wohnt hier in Bonn.", tr: "Bayan Berg burada, Bonn'da oturuyor.", lemmas: ["Frau", "Berg", "wohnen", "hier", "in", "Bonn"], alts: ["Hier in Bonn wohnt Frau Berg."] }
  ],
  reading: [
    {
      title: "Anmeldeformular: Deutschkurs",
      text: "Vorname: Carlos\nNachname: Mendes\nAlter: 29 Jahre\nIch komme aus: Spanien\nIch wohne in: Leipzig\nStraße: Rosenweg\nHausnummer: 8\nPostleitzahl: 04109\nTelefon: 0341 88 99 70\nE-Mail-Adresse: carlos.mendes@mail.de\nSprachen: Spanisch, Englisch",
      tr: "Kayıt formu: Almanca kursu\nAd: Carlos\nSoyad: Mendes\nYaş: 29\nGeldiğim ülke: İspanya\nOturduğum yer: Leipzig\nSokak: Rosenweg\nBina numarası: 8\nPosta kodu: 04109\nTelefon: 0341 88 99 70\nE-posta adresi: carlos.mendes@mail.de\nDiller: İspanyolca, İngilizce",
      qs: [
        { t: "mc", q: "Wie ist die Postleitzahl?", o: ["04109", "04190", "40109"], a: "04109", why: "Metinde: 'Postleitzahl: 04109'." },
        { t: "rf", q: "Carlos wohnt in Madrid.", a: "falsch", why: "Metinde: 'Ich wohne in: Leipzig' (Spanien = köken)." },
        { t: "short", q: "Wie alt ist Carlos?", a: ["29", "neunundzwanzig", "29 Jahre"], why: "Metinde: 'Alter: 29 Jahre'." },
        { t: "short", q: "Wie ist die Hausnummer?", a: ["8", "acht"], why: "Metinde: 'Hausnummer: 8'." },
        { t: "rf", q: "Carlos spricht Spanisch und Englisch.", a: "richtig", why: "Metinde: 'Sprachen: Spanisch, Englisch'." }
      ]
    },
    {
      title: "Nachricht von Jonas",
      text: "Hallo Lena,\nich bin jetzt in Dresden. Das ist eine schöne Stadt. Die Adresse ist Gartenstraße 21, Postleitzahl 01069. Die Telefonnummer ist 0351 44 55 66. Ich lerne hier Englisch und ein bisschen Türkisch.\nUnd du? Wo bist du jetzt?\nBis bald!\nJonas",
      tr: "Merhaba Lena,\nŞimdi Dresden'deyim. Güzel bir şehir. Adres Gartenstraße 21, posta kodu 01069. Telefon numarası 0351 44 55 66. Burada İngilizce ve biraz Türkçe öğreniyorum.\nPeki ya sen? Şimdi neredesin?\nGörüşürüz!\nJonas",
      qs: [
        { t: "mc", q: "Wo ist Jonas jetzt?", o: ["in Dresden", "in Leipzig", "in Bonn"], a: "in Dresden", why: "Metinde: 'ich bin jetzt in Dresden'." },
        { t: "short", q: "Wie ist die Postleitzahl?", a: ["01069"], why: "Metinde: 'Postleitzahl 01069'." },
        { t: "rf", q: "Jonas lernt Englisch und ein bisschen Türkisch.", a: "richtig", why: "Metinde: 'Ich lerne hier Englisch und ein bisschen Türkisch.'" },
        { t: "mc", q: "Wie ist die Telefonnummer?", o: ["0351 44 55 66", "0351 44 66 55", "0315 44 55 66"], a: "0351 44 55 66", why: "Metinde: 'Die Telefonnummer ist 0351 44 55 66.'" },
        { t: "short", q: "Wie heißt die Straße?", a: ["Gartenstraße", "Gartenstrasse", "Gartenstraße 21", "Gartenstrasse 21"], why: "Metinde: 'Gartenstraße 21'." }
      ]
    }
  ],
  listening: [
    {
      title: "Anrufbeantworter: Sprachschule",
      script: [
        ["A", "Guten Tag, hier ist die Sprachschule Lingua in Dortmund."],
        ["A", "Wir sind jetzt nicht hier."],
        ["A", "Die Adresse ist Bahnhofstraße vierzig, Postleitzahl vier, vier, eins, drei, sieben."],
        ["A", "Die Telefonnummer ist null zwei drei eins, sechs sieben, acht neun, zwei eins."],
        ["A", "Danke und auf Wiedersehen!"]
      ],
      tr: "Merhaba/İyi günler, burası Dortmund'daki Lingua dil okulu. Şu anda burada değiliz. Adres Bahnhofstraße kırk, posta kodu dört, dört, bir, üç, yedi. Telefon numarası sıfır iki üç bir, altı yedi, sekiz dokuz, iki bir. Teşekkürler ve hoşça kalın!",
      qs: [
        { t: "short", q: "Wie heißt die Sprachschule?", a: ["Lingua"], why: "'Hier ist die Sprachschule Lingua in Dortmund.'" },
        { t: "mc", q: "Wo ist die Sprachschule?", o: ["in Dortmund", "in Dresden", "in Düsseldorf"], a: "in Dortmund", why: "'Sprachschule Lingua in Dortmund.'" },
        { t: "short", q: "Wie ist die Hausnummer?", a: ["40", "vierzig"], why: "'Bahnhofstraße vierzig'." },
        { t: "mc", q: "Wie ist die Telefonnummer?", o: ["0231 67 89 21", "0231 76 89 21", "0213 67 89 21"], a: "0231 67 89 21", why: "'Null zwei drei eins, sechs sieben, acht neun, zwei eins.'" },
        { t: "rf", q: "Die Sprachschule ist jetzt da.", a: "falsch", why: "'Wir sind jetzt nicht hier.'" }
      ]
    },
    {
      title: "Neu in Mainz",
      script: [
        ["A", "Hallo, ich bin Maria. Wie heißt du?"],
        ["B", "Ich heiße Nikos. Ich bin neu hier."],
        ["A", "Woher kommst du, Nikos?"],
        ["B", "Ich komme aus Griechenland, aus Athen. Und du?"],
        ["A", "Ich komme aus Spanien, aus Sevilla."],
        ["B", "Sprichst du Englisch?"],
        ["A", "Ja, ich spreche Spanisch, Englisch und ein bisschen Deutsch."],
        ["B", "Ich spreche auch Englisch. Wie alt bist du, Maria?"],
        ["A", "Ich bin dreißig. Und du?"],
        ["B", "Ich bin fünfunddreißig."],
        ["A", "Und wo wohnst du?"],
        ["B", "Ich wohne in Mainz."]
      ],
      tr: "A: Merhaba, ben Maria. Adın ne?\nB: Adım Nikos. Burada yeniyim.\nA: Nerelisin, Nikos?\nB: Yunanistan'dan, Atina'dan geliyorum. Ya sen?\nA: İspanya'dan, Sevilla'dan geliyorum.\nB: İngilizce konuşuyor musun?\nA: Evet, İspanyolca, İngilizce ve biraz Almanca konuşuyorum.\nB: Ben de İngilizce konuşuyorum. Kaç yaşındasın, Maria?\nA: Otuzdayım. Ya sen?\nB: Otuz beş yaşındayım.\nA: Peki nerede oturuyorsun?\nB: Mainz'da oturuyorum.",
      qs: [
        { t: "mc", q: "Woher kommt Nikos?", o: ["aus Spanien", "aus Griechenland", "aus Mainz"], a: "aus Griechenland", why: "Nikos: 'Ich komme aus Griechenland, aus Athen.'" },
        { t: "rf", q: "Maria spricht Spanisch, Englisch und ein bisschen Deutsch.", a: "richtig", why: "Maria: 'Ich spreche Spanisch, Englisch und ein bisschen Deutsch.'" },
        { t: "short", q: "Wie alt ist Maria?", a: ["30", "dreißig", "dreissig", "30 Jahre"], why: "Maria: 'Ich bin dreißig.'" },
        { t: "mc", q: "Wie alt ist Nikos?", o: ["33", "35", "53"], a: "35", why: "Nikos: 'Ich bin fünfunddreißig.'" },
        { t: "short", q: "Wo wohnt Nikos?", a: ["in Mainz", "Mainz"], why: "Nikos: 'Ich wohne in Mainz.'" }
      ]
    }
  ],
  testReading: [
    {
      title: "Bibliothek: Anmeldung",
      text: "Name: Sophie Laurent\nAlter: 41 Jahre\nIch komme aus: Frankreich\nIch wohne in: Freiburg\nStraße: Ahornweg, Hausnummer: 5\nPostleitzahl: 79098\nTelefon: 0761 20 30 40\nSprachen: Französisch, Deutsch, Englisch",
      tr: "Kütüphane: Kayıt\nAd: Sophie Laurent\nYaş: 41\nGeldiğim ülke: Fransa\nOturduğum yer: Freiburg\nSokak: Ahornweg, Bina numarası: 5\nPosta kodu: 79098\nTelefon: 0761 20 30 40\nDiller: Fransızca, Almanca, İngilizce",
      qs: [
        { t: "mc", q: "Woher kommt Sophie?", o: ["aus Frankreich", "aus Freiburg", "aus Spanien"], a: "aus Frankreich", why: "Metinde: 'Ich komme aus: Frankreich'." },
        { t: "short", q: "Wie ist die Postleitzahl?", a: ["79098"], why: "Metinde: 'Postleitzahl: 79098'." },
        { t: "rf", q: "Sophie ist 14 Jahre alt.", a: "falsch", why: "Metinde: 'Alter: 41 Jahre'." },
        { t: "mc", q: "Wie ist die Telefonnummer?", o: ["0761 20 30 40", "0761 20 40 30", "0716 20 30 40"], a: "0761 20 30 40", why: "Metinde: 'Telefon: 0761 20 30 40'." },
        { t: "rf", q: "Sophie spricht Französisch, Deutsch und Englisch.", a: "richtig", why: "Metinde: 'Sprachen: Französisch, Deutsch, Englisch'." }
      ]
    },
    {
      title: "Kurznotiz von Ivana",
      text: "Hallo! Ich bin Ivana. Ich komme aus Kroatien, aus Zagreb. Jetzt wohne ich in Stuttgart. Ich bin 26 Jahre alt. Ich spreche Kroatisch, Englisch und ein bisschen Deutsch. Ich lerne auch Deutsch hier.\nTelefon: 0711 33 44 55\nUnd du? Wie heißt du? Woher kommst du?\nTschüs!\nIvana",
      tr: "Merhaba! Ben Ivana. Hırvatistan'dan, Zagreb'den geliyorum. Şimdi Stuttgart'ta oturuyorum. 26 yaşındayım. Hırvatça, İngilizce ve biraz Almanca konuşuyorum. Burada ayrıca Almanca öğreniyorum.\nTelefon: 0711 33 44 55\nPeki ya sen? Adın ne? Nerelisin?\nHoşça kal!\nIvana",
      qs: [
        { t: "short", q: "Woher kommt Ivana? (ülke)", a: ["aus Kroatien", "Kroatien"], why: "Metinde: 'Ich komme aus Kroatien, aus Zagreb.'" },
        { t: "mc", q: "Wo wohnt Ivana jetzt?", o: ["in Zagreb", "in Stuttgart", "in Wien"], a: "in Stuttgart", why: "Metinde: 'Jetzt wohne ich in Stuttgart.'" },
        { t: "rf", q: "Ivana ist 26 Jahre alt.", a: "richtig", why: "Metinde: 'Ich bin 26 Jahre alt.'" },
        { t: "mc", q: "Wie ist die Telefonnummer?", o: ["0711 33 44 55", "0711 33 55 44", "0117 33 44 55"], a: "0711 33 44 55", why: "Metinde: 'Telefon: 0711 33 44 55'." },
        { t: "rf", q: "Ivana spricht Italienisch.", a: "falsch", why: "Metinde: 'Ich spreche Kroatisch, Englisch und ein bisschen Deutsch.'" }
      ]
    }
  ],
  testListening: [
    {
      title: "Nachricht auf dem Anrufbeantworter",
      script: [
        ["A", "Hallo Sara, hier ist Paul."],
        ["A", "Ich bin jetzt in Augsburg."],
        ["A", "Die Adresse ist Hauptstraße fünfzehn."],
        ["A", "Die Postleitzahl ist acht, sechs, eins, fünf, zwei."],
        ["A", "Die Telefonnummer ist null acht zwei eins, vier vier, drei drei, zwei zwei."],
        ["A", "Tschüs, bis bald!"]
      ],
      tr: "Merhaba Sara, ben Paul. Şimdi Augsburg'dayım. Adres Hauptstraße on beş. Posta kodu sekiz, altı, bir, beş, iki. Telefon numarası sıfır sekiz iki bir, dört dört, üç üç, iki iki. Hoşça kal, görüşürüz!",
      qs: [
        { t: "short", q: "Wo ist Paul jetzt?", a: ["in Augsburg", "Augsburg"], why: "'Ich bin jetzt in Augsburg.'" },
        { t: "mc", q: "Wie ist die Hausnummer?", o: ["15", "50", "51"], a: "15", why: "'Hauptstraße fünfzehn.'" },
        { t: "mc", q: "Wie ist die Postleitzahl?", o: ["86152", "86125", "68152"], a: "86152", why: "'Acht, sechs, eins, fünf, zwei.'" },
        { t: "mc", q: "Wie ist die Telefonnummer?", o: ["0821 44 33 22", "0821 44 22 33", "0812 44 33 22"], a: "0821 44 33 22", why: "'Null acht zwei eins, vier vier, drei drei, zwei zwei.'" },
        { t: "rf", q: "Die Straße heißt Hauptstraße.", a: "richtig", why: "'Die Adresse ist Hauptstraße fünfzehn.'" }
      ]
    },
    {
      title: "Am Empfang",
      script: [
        ["A", "Guten Tag. Wie heißen Sie, bitte?"],
        ["B", "Ich heiße Petra Novak."],
        ["A", "Woher kommen Sie, Frau Novak?"],
        ["B", "Ich komme aus Tschechien, aus Prag."],
        ["A", "Und wo wohnen Sie?"],
        ["B", "Ich wohne in Nürnberg."],
        ["A", "Wie schreibt man Novak?"],
        ["B", "N, O, V, A, K."],
        ["A", "Danke. Telefonnummer, bitte?"],
        ["B", "Null neun eins eins, acht sieben, sechs fünf, vier drei."],
        ["A", "Vielen Dank, Frau Novak."]
      ],
      tr: "A: İyi günler. Adınız nedir, lütfen?\nB: Adım Petra Novak.\nA: Nerelisiniz, Bayan Novak?\nB: Çekya'dan, Prag'dan geliyorum.\nA: Peki nerede oturuyorsunuz?\nB: Nürnberg'de oturuyorum.\nA: Novak nasıl yazılıyor?\nB: N, O, V, A, K.\nA: Teşekkürler. Telefon numarası, lütfen?\nB: Sıfır dokuz bir bir, sekiz yedi, altı beş, dört üç.\nA: Çok teşekkürler, Bayan Novak.",
      qs: [
        { t: "mc", q: "Woher kommt Frau Novak?", o: ["aus Tschechien", "aus Polen", "aus Nürnberg"], a: "aus Tschechien", why: "Frau Novak: 'Ich komme aus Tschechien, aus Prag.'" },
        { t: "rf", q: "Frau Novak wohnt in Nürnberg.", a: "richtig", why: "Frau Novak: 'Ich wohne in Nürnberg.'" },
        { t: "mc", q: "Wie buchstabiert man 'Novak'?", o: ["N-O-V-A-K", "M-O-V-A-K", "N-O-W-A-K"], a: "N-O-V-A-K", why: "Frau Novak: 'N, O, V, A, K.'" },
        { t: "mc", q: "Wie ist die Telefonnummer?", o: ["0911 87 65 43", "0911 78 65 43", "0919 87 65 43"], a: "0911 87 65 43", why: "'Null neun eins eins, acht sieben, sechs fünf, vier drei.'" },
        { t: "short", q: "Wie heißt Frau Novak mit Vornamen?", a: ["Petra"], why: "Frau Novak: 'Ich heiße Petra Novak.'" }
      ]
    }
  ],
  lemmasFor: {
    "Ich heiße Hannah.": ["ich", "heißen", "Hannah"],
    "Ich komme aus der Türkei.": ["ich", "kommen", "aus", "die Türkei"],
    "Ich wohne in Köln.": ["ich", "wohnen", "in", "Köln"],
    "Woher kommst du?": ["woher", "kommen", "du"],
    "Wie alt bist du?": ["wie", "alt", "sein", "du"],
    "Ich bin 25 Jahre alt.": ["ich", "sein", "fünfundzwanzig", "das Jahr", "alt"],
    "Er spricht Deutsch und Türkisch.": ["er", "sprechen", "Deutsch", "und", "Türkisch"],
    "Wo wohnst du?": ["wo", "wohnen", "du"],
    "Wie heißen Sie?": ["wie", "heißen", "Sie"],
    "Wir lernen Deutsch.": ["wir", "lernen", "Deutsch"],
    "Anna arbeitet in Berlin.": ["Anna", "arbeiten", "in", "Berlin"],
    "Das ist Herr Müller.": ["das", "sein", "Herr", "Müller"],
    "Wohnst du in Hamburg?": ["wohnen", "du", "in", "Hamburg"],
    "Sie kommen aus Deutschland.": ["sie", "kommen", "aus", "Deutschland"],
    "Das ist meine Familie.": ["das", "sein", "mein", "die Familie"],
    "Ich habe eine Schwester.": ["ich", "haben", "ein", "die Schwester"],
    "Meine Mutter heißt Sabine.": ["mein", "die Mutter", "heißen", "Sabine"],
    "Mein Vater arbeitet in Köln.": ["mein", "der Vater", "arbeiten", "in", "Köln"],
    "Hast du Geschwister?": ["haben", "du", "die Geschwister"],
    "Wie heißt dein Bruder?": ["wie", "heißen", "dein", "der Bruder"],
    "Er hat zwei Kinder.": ["er", "haben", "zwei", "das Kind"],
    "Das ist mein Freund Tom.": ["das", "sein", "mein", "der Freund", "Tom"],
    "Meine Eltern kommen aus der Türkei.": ["mein", "die Eltern", "kommen", "aus", "die Türkei"],
    "Ihre Tochter ist drei Jahre alt.": ["ihr", "die Tochter", "sein", "drei", "das Jahr", "alt"],
    "Seine Schwester lernt Deutsch.": ["sein", "die Schwester", "lernen", "Deutsch"],
    "Ist das dein Bruder?": ["sein", "das", "dein", "der Bruder"],
    "Mein Onkel wohnt in Hamburg.": ["mein", "der Onkel", "wohnen", "in", "Hamburg"],
    "Mein Onkel und meine Tante sind verheiratet.": ["mein", "der Onkel", "und", "mein", "die Tante", "sein", "verheiratet"]
  },
  uncertain: [
    "Land (das, Länder): t verilmedi (soyut/ülke). Italien/Spanien: art ve pl yok, artikelsiz ülke olarak girildi; Deutschland'daki art: 'das' ile tutarsız olabilir.",
    "Englisch/Türkisch dil adı olarak artikelsiz kelime kaydı (isim ama art/pl yok); motor bunu fiil/ifade gibi işlemeli.",
    "Entschuldigung!, Danke!, Bitte!, Tschüs! için alts noktalama olmadan yazıldı; 'Wie geht's?' kaydındaki gibi.",
    "Hausnummer, Postleitzahl, E-Mail-Adresse için t:'t' verildi (Telefonnummer ile tutarlı); istenmezse kaldırılabilir.",
    "Formda 'Ich komme aus: Spanien / Ich wohne in: Leipzig' biçimi gerçek formlarda 'Herkunftsland / Wohnort' olurdu; A1 için bilinçli sadeleştirildi.",
    "Sentences'ta 'Marco und Sara sprechen Spanisch' ve 'Ich spreche ... Spanisch/Englisch' Akkusativ nesne gibi görünür, ancak dil adları artikelsiz kalıp (mevcut 'Er spricht Deutsch' gibi).",
    "lemmasFor: 'Herr' ve 'Frau' unvan olarak artikelsiz lemma; 'eine' → 'ein', 'meine/ihre' → 'mein/ihr', sayı rakamla yazılmışsa (25) sözcük hâli 'fünfundzwanzig' olarak verildi.",
    "Listening 'Wie schreibt man Novak?' (man) kalıbı Ünite 1'de açıklanmadı; mevcut listening 2'de de var.",
    "Telefon numaralarında alan kodları gerçek şehirlerle uyumlu seçildi (Leipzig 0341, Dresden 0351, Dortmund 0231, Augsburg 0821, Freiburg 0761, Stuttgart 0711, Nürnberg 0911); posta kodları (04109, 01069, 79098, 86152, 44137) şehirlerle uyumlu ama tek tek doğrulanmadı."
  ]
};
