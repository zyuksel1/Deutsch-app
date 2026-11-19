window.CONTENT_PART = {
  unit: "a1-u2",
  words: [
    { de: "Großmutter", art: "die", pl: "Großmütter", tr: "büyükanne (resmî)", t: "p", ex: ["Meine Großmutter ist 75 Jahre alt.", "Büyükannem 75 yaşında."], tip: "Günlük dilde Oma." },
    { de: "Großvater", art: "der", pl: "Großväter", tr: "büyükbaba (resmî)", t: "p", ex: ["Mein Großvater wohnt in Bonn.", "Büyükbabam Bonn'da oturuyor."], tip: "Günlük dilde Opa." },
    { de: "Großeltern", art: "die", pl: null, tr: "büyükanne ve büyükbaba", ex: ["Meine Großeltern wohnen in Kiel.", "Büyükannem ve büyükbabam Kiel'de oturuyor."], tip: "Yalnız çoğul kullanılır." },
    { de: "Ehemann", art: "der", pl: "Ehemänner", tr: "koca, eş (erkek)", t: "p", ex: ["Ihr Ehemann heißt Jan.", "Kocasının adı Jan."], tip: "Resmî dilde Ehemann; günlük dilde Mann." },
    { de: "Ehefrau", art: "die", pl: "Ehefrauen", tr: "karı, eş (kadın)", t: "p", ex: ["Seine Ehefrau heißt Sofia.", "Karısının adı Sofia."], tip: "Günlük dilde Frau." },
    { de: "Baby", art: "das", pl: "Babys", tr: "bebek", t: "p", ex: ["Das Baby ist sehr klein.", "Bebek çok küçük."] },
    { de: "Partner", art: "der", pl: "Partner", tr: "partner, eş/sevgili (erkek)", t: "p", ex: ["Mein Partner heißt Daniel.", "Partnerimin adı Daniel."], tip: "Evli olmasa da birlikte yaşadığın kişi için de kullanılır." },
    { de: "Partnerin", art: "die", pl: "Partnerinnen", tr: "partner, eş/sevgili (kadın)", t: "p", ex: ["Seine Partnerin ist 30 Jahre alt.", "Partneri 30 yaşında."] },
    { de: "Cousin", art: "der", pl: "Cousins", tr: "kuzen (erkek)", t: "p", ex: ["Mein Cousin ist 16 Jahre alt.", "Kuzenim 16 yaşında."], tip: "Okunuşu: kuzen. Kız kuzen: Cousine." },
    { de: "Cousine", art: "die", pl: "Cousinen", tr: "kuzen (kız)", t: "p", ex: ["Meine Cousine hat ein Baby.", "Kuzenimin bir bebeği var."] },
    { de: "geschieden", tr: "boşanmış", ex: ["Meine Tante ist geschieden.", "Teyzem boşanmış."], tip: "Familienstand: ledig, verheiratet, geschieden." },
    { de: "Geburtstag", art: "der", pl: "Geburtstage", tr: "doğum günü", ex: ["Heute ist mein Geburtstag.", "Bugün benim doğum günüm."], tip: "Wann hast du Geburtstag? = Doğum günün ne zaman?" },
    { de: "jung", tr: "genç", ex: ["Meine Tante ist jung.", "Teyzem genç."] },
    { de: "klein", tr: "küçük", ex: ["Die Katze ist klein.", "Kedi küçük."] },
    { de: "groß", tr: "büyük, iri, uzun boylu", ex: ["Meine Familie ist groß.", "Ailem büyük."] },
    { de: "zusammen", tr: "birlikte", ex: ["Wir sind zusammen in Köln.", "Birlikte Köln'deyiz."], tip: "Çift için: 'Sie sind zusammen' = birlikteler, sevgililer." },
    { de: "Hund", art: "der", pl: "Hunde", tr: "köpek", t: "p", ex: ["Mein Hund heißt Bruno.", "Köpeğimin adı Bruno."] },
    { de: "Katze", art: "die", pl: "Katzen", tr: "kedi", t: "p", ex: ["Wir haben eine Katze.", "Bir kedimiz var."] }
  ],
  grammarItems: {
    "artikel": [
      { q: "___ Großmutter wohnt in Bonn.", a: ["Die", "die"], o: ["Der", "Die", "Das"], tr: "Büyükanne Bonn'da oturuyor.", why: "Großmutter → die Großmutter (-mutter, Mutter gibi die)." },
      { q: "___ Baby heißt Noah.", a: ["Das", "das"], o: ["Der", "Die", "Das"], tr: "Bebeğin adı Noah.", why: "Baby → das Baby." },
      { q: "___ Hund heißt Bruno.", a: ["Der", "der"], o: ["Der", "Die", "Das"], tr: "Köpeğin adı Bruno.", why: "Hund → der Hund." },
      { q: "___ Großeltern wohnen in Kiel.", a: ["Die", "die"], tr: "Büyükanne ve büyükbaba Kiel'de oturuyor.", why: "Großeltern çoğul → die Großeltern." },
      { q: "der Hund → die ___", a: ["Hunde"], tr: "köpek → köpekler", why: "Hund → Hunde (+e)." },
      { q: "die Katze → die ___", a: ["Katzen"], tr: "kedi → kediler", why: "Katze → Katzen (+n)." },
      { q: "die Großmutter → die ___", a: ["Großmütter"], tr: "büyükanne → büyükanneler", why: "Großmutter → Großmütter (u → ü)." },
      { q: "der Cousin → die ___", a: ["Cousins"], tr: "kuzen → kuzenler", why: "Cousin → Cousins (+s)." }
    ],
    "haben": [
      { q: "Ich ___ eine Cousine in Essen.", a: ["habe"], tr: "Essen'de bir kuzenim var.", why: "ich → habe." },
      { q: "Lena ___ ein Baby.", a: ["hat"], o: ["hat", "hast", "haben"], tr: "Lena'nın bir bebeği var.", why: "er/sie/es → hat." },
      { q: "Meine Großeltern ___ eine Katze.", a: ["haben"], tr: "Büyükannemle büyükbabamın bir kedisi var.", why: "Çoğul özne (sie) → haben." },
      { q: "___ ihr eine Katze?", a: ["Habt", "habt"], tr: "Sizin bir kediniz var mı?", why: "Evet/hayır sorusu: fiil başta, ihr → habt." },
      { q: "Du ___ eine Partnerin.", a: ["hast"], o: ["habe", "hast", "hat"], tr: "Bir partnerin var.", why: "du → hast (b düşer)." },
      { q: "Frau Berg, ___ Sie ein Baby?", a: ["haben"], tr: "Bayan Berg, bebeğiniz var mı?", why: "Resmî Sie → haben." }
    ],
    "possessiv": [
      { q: "Das ist ___ Großmutter. (ich)", a: ["meine"], o: ["mein", "meine"], tr: "Bu benim büyükannem.", why: "ich → mein-; die Großmutter → meine." },
      { q: "___ Großvater ist 80 Jahre alt. (er)", a: ["Sein", "sein"], o: ["Sein", "Seine", "Ihr"], tr: "Onun büyükbabası 80 yaşında.", why: "Sahibi er → sein-; der Großvater → sein (ek yok)." },
      { q: "Das ist Lena. ___ Hund heißt Rex. (sie)", a: ["Ihr", "ihr"], o: ["Sein", "Ihr", "Mein"], tr: "Bu Lena. Onun köpeğinin adı Rex.", why: "Sahibi sie (Lena) → ihr-; der Hund → ihr." },
      { q: "Wie heißt ___ Katze? (du)", a: ["deine"], o: ["dein", "deine"], tr: "Kedinin adı ne?", why: "du → dein-; die Katze → deine." },
      { q: "Wie alt ist ___ Cousin? (du)", a: ["dein"], o: ["dein", "deine"], tr: "Kuzenin kaç yaşında?", why: "du → dein-; der Cousin → dein." },
      { q: "Das ist Tim. ___ Eltern wohnen in Mainz. (er)", a: ["Seine", "seine"], tr: "Bu Tim. Onun anne babası Mainz'da oturuyor.", why: "Sahibi er (Tim) → sein-; çoğul → seine." },
      { q: "Wie heißt ___ Ehemann, Frau Berg? (Sie)", a: ["Ihr", "ihr"], tr: "Kocanızın adı ne, Bayan Berg?", why: "Resmî Sie → Ihr (büyük I); der Ehemann → Ihr." },
      { q: "Meine Cousine hat ein Baby. ___ Baby ist klein. (sie)", a: ["Ihr", "ihr"], o: ["Sein", "Ihr", "Mein"], tr: "Kuzenimin bir bebeği var. Onun bebeği küçük.", why: "Sahibi sie (Cousine) → ihr-; das Baby → ihr (ek yok)." }
    ],
    "nominativ": [
      { q: "Das ist ___ Hund.", a: ["ein"], o: ["ein", "eine"], tr: "Bu bir köpek.", why: "der Hund → ein Hund." },
      { q: "Das ist ___ Katze.", a: ["eine"], o: ["ein", "eine"], tr: "Bu bir kedi.", why: "die Katze → eine Katze." },
      { q: "Das ist ___ Baby.", a: ["ein"], tr: "Bu bir bebek.", why: "das Baby → ein Baby." },
      { q: "___ ist das? – Das ist ein Hund.", a: ["Was", "was"], o: ["Wer", "Was"], tr: "Bu ne? – Bu bir köpek.", why: "Hayvan/nesne için 'ne' = Was." },
      { q: "___ ist das? – Das ist mein Partner.", a: ["Wer", "wer"], o: ["Wer", "Was"], tr: "Bu kim? – Bu benim partnerim.", why: "Kişi için 'kim' = Wer." },
      { q: "Das sind ___ Katzen.", a: ["die"], o: ["die", "der", "das"], tr: "Bunlar kediler.", why: "Çoğulda Nominativ artikel: die." }
    ]
  },
  sentences: [
    { de: "Meine Großeltern wohnen in Bonn.", tr: "Büyükannem ve büyükbabam Bonn'da oturuyor.", lemmas: ["mein", "die Großeltern", "wohnen", "in", "Bonn"], alts: ["In Bonn wohnen meine Großeltern."], why: "in Bonn: şehir adı, edat + yer." },
    { de: "Mein Großvater ist 80 Jahre alt.", tr: "Büyükbabam 80 yaşında.", lemmas: ["mein", "der Großvater", "sein", "80", "das Jahr", "alt"], alts: [] },
    { de: "Meine Cousine hat ein Baby.", tr: "Kuzenimin bir bebeği var.", lemmas: ["mein", "die Cousine", "haben", "ein", "das Baby"], alts: [] },
    { de: "Meine Tante ist geschieden.", tr: "Teyzem boşanmış.", lemmas: ["mein", "die Tante", "sein", "geschieden"], alts: [] },
    { de: "Wir haben eine Katze.", tr: "Bir kedimiz var.", lemmas: ["wir", "haben", "ein", "die Katze"], alts: [] },
    { de: "Meine Katze ist klein.", tr: "Kedim küçük.", lemmas: ["mein", "die Katze", "sein", "klein"], alts: [] },
    { de: "Mein Hund heißt Bruno.", tr: "Köpeğimin adı Bruno.", lemmas: ["mein", "der Hund", "heißen", "Bruno"], alts: [] },
    { de: "Wann hast du Geburtstag?", tr: "Doğum günün ne zaman?", lemmas: ["wann", "haben", "du", "der Geburtstag"], alts: [], why: "'Geburtstag haben' = doğum günü olmak." },
    { de: "Heute ist mein Geburtstag.", tr: "Bugün benim doğum günüm.", lemmas: ["heute", "sein", "mein", "der Geburtstag"], alts: ["Mein Geburtstag ist heute."] },
    { de: "Mein Partner heißt Daniel und ist 30 Jahre alt.", tr: "Partnerimin adı Daniel ve 30 yaşında.", lemmas: ["mein", "der Partner", "heißen", "Daniel", "und", "sein", "30", "das Jahr", "alt"], alts: [], why: "'und' ile iki fiil: özne tekrarlanmaz." },
    { de: "Anna und Tom sind zusammen.", tr: "Anna ve Tom birlikte (sevgili).", lemmas: ["Anna", "und", "Tom", "sein", "zusammen"], alts: [], why: "İki kişi → sind." },
    { de: "Mein Cousin Jonas ist 16 Jahre alt.", tr: "Kuzenim Jonas 16 yaşında.", lemmas: ["mein", "der Cousin", "Jonas", "sein", "16", "das Jahr", "alt"], alts: [] },
    { de: "Seine Ehefrau heißt Sofia.", tr: "Karısının adı Sofia.", lemmas: ["sein", "die Ehefrau", "heißen", "Sofia"], alts: [], why: "Sahibi erkek (er) → sein-; die Ehefrau → seine." },
    { de: "Ihr Ehemann arbeitet in München.", tr: "Kocası Münih'te çalışıyor.", lemmas: ["ihr", "der Ehemann", "arbeiten", "in", "München"], alts: ["In München arbeitet ihr Ehemann."], why: "Sahibi kadın (sie) → ihr-; der Ehemann → ihr." },
    { de: "Habt ihr eine Katze?", tr: "Sizin bir kediniz var mı?", lemmas: ["ihr", "haben", "ein", "die Katze"], alts: [] },
    { de: "Meine Großmutter ist 75 Jahre alt.", tr: "Büyükannem 75 yaşında.", lemmas: ["mein", "die Großmutter", "sein", "75", "das Jahr", "alt"], alts: [] }
  ],
  reading: [
    {
      title: "Post von Lena",
      text: "Hallo Freunde,\nheute ist mein Geburtstag! Ich bin 28 Jahre alt. Das ist meine Familie: meine Großeltern, mein Partner Daniel und meine Cousine Mia. Mia hat ein Baby. Das Baby heißt Noah und ist sehr klein. Mein Hund Bruno ist auch hier. Er ist groß und nett.\nViele Grüße\nLena",
      tr: "Merhaba arkadaşlar,\nbugün benim doğum günüm! 28 yaşındayım. Bu benim ailem: büyükannem ve büyükbabam, partnerim Daniel ve kuzenim Mia. Mia'nın bir bebeği var. Bebeğin adı Noah ve çok küçük. Köpeğim Bruno da burada. O büyük ve sevimli.\nSevgiler\nLena",
      qs: [
        { t: "rf", q: "Lena hat heute Geburtstag.", a: "richtig", why: "Metinde: 'heute ist mein Geburtstag!'" },
        { t: "mc", q: "Wie alt ist Lena?", o: ["18", "28", "30"], a: "28", why: "Metinde: 'Ich bin 28 Jahre alt.'" },
        { t: "short", q: "Wie heißt Lenas Partner?", a: ["Daniel"], why: "Metinde: 'mein Partner Daniel'." },
        { t: "rf", q: "Mia ist Lenas Schwester.", a: "falsch", why: "Metinde: 'meine Cousine Mia'." },
        { t: "mc", q: "Wie ist Bruno?", o: ["klein", "groß und nett", "alt"], a: "groß und nett", why: "Metinde: 'Er ist groß und nett.'" }
      ]
    },
    {
      title: "Einladung: Geburtstagsfest",
      text: "Liebe Familie, liebe Freunde,\nmein Großvater Karl hat Geburtstag. Er ist 75 Jahre alt. Wir feiern zusammen!\nWann? Samstag, 15 Uhr\nWo? Bonn, Café Sonne\nMeine Großmutter Helga, meine Eltern und mein Bruder Felix sind auch da.\nMeine Telefonnummer: 0228 33 44 55.\nBis bald!\nJana",
      tr: "Sevgili aile, sevgili arkadaşlar,\nbüyükbabam Karl'ın doğum günü. 75 yaşında. Birlikte kutluyoruz!\nNe zaman? Cumartesi, saat 15\nNerede? Bonn, Café Sonne\nBüyükannem Helga, annem babam ve erkek kardeşim Felix de orada.\nTelefon numaram: 0228 33 44 55.\nGörüşmek üzere!\nJana",
      qs: [
        { t: "rf", q: "Karl ist 75 Jahre alt.", a: "richtig", why: "Metinde: 'Er ist 75 Jahre alt.'" },
        { t: "mc", q: "Wann ist das Fest?", o: ["Freitag, 15 Uhr", "Samstag, 15 Uhr", "Sonntag, 5 Uhr"], a: "Samstag, 15 Uhr", why: "Metinde: 'Wann? Samstag, 15 Uhr'." },
        { t: "short", q: "Wo ist das Fest?", a: ["Bonn", "Café Sonne", "in Bonn", "Bonn, Café Sonne"], why: "Metinde: 'Wo? Bonn, Café Sonne'." },
        { t: "short", q: "Wie heißt die Großmutter?", a: ["Helga"], why: "Metinde: 'Meine Großmutter Helga'." },
        { t: "rf", q: "Felix ist Janas Cousin.", a: "falsch", why: "Metinde: 'mein Bruder Felix'." }
      ]
    }
  ],
  listening: [
    {
      title: "Meine Cousine Nora",
      script: [
        ["A", "Hallo Ben, wer ist das auf dem Foto?"],
        ["B", "Das ist meine Cousine Nora."],
        ["A", "Ist sie verheiratet?"],
        ["B", "Nein, sie ist geschieden. Sie hat ein Baby."],
        ["A", "Wie heißt das Baby?"],
        ["B", "Es heißt Leo und ist ein Jahr alt."],
        ["A", "Hat Nora auch eine Katze?"],
        ["B", "Ja, sie hat zwei Katzen."],
        ["A", "Wohnt Nora in Essen?"],
        ["B", "Ja, in Essen."]
      ],
      tr: "A: Merhaba Ben, fotoğraftaki kim?\nB: Bu kuzenim Nora.\nA: Evli mi?\nB: Hayır, boşanmış. Bir bebeği var.\nA: Bebeğin adı ne?\nB: Adı Leo ve bir yaşında.\nA: Nora'nın kedisi de var mı?\nB: Evet, iki kedisi var.\nA: Nora Essen'de mi oturuyor?\nB: Evet, Essen'de.",
      qs: [
        { t: "mc", q: "Wer ist Nora?", o: ["Bens Cousine", "Bens Schwester", "Bens Tante"], a: "Bens Cousine", why: "'Das ist meine Cousine Nora.'" },
        { t: "rf", q: "Nora ist verheiratet.", a: "falsch", why: "'Nein, sie ist geschieden.'" },
        { t: "short", q: "Wie heißt das Baby?", a: ["Leo"], why: "'Es heißt Leo und ist ein Jahr alt.'" },
        { t: "mc", q: "Wie viele Katzen hat Nora?", o: ["eine", "zwei", "drei"], a: "zwei", why: "'Ja, sie hat zwei Katzen.'" },
        { t: "rf", q: "Nora wohnt in Essen.", a: "richtig", why: "'Ja, in Essen.'" }
      ]
    },
    {
      title: "Nachricht von Opa",
      script: [
        ["A", "Hallo Sara, hier ist dein Opa."],
        ["A", "Heute hat Oma Geburtstag. Sie ist 72 Jahre alt."],
        ["A", "Wir sind zusammen in Dresden."],
        ["A", "Deine Tante Ines und dein Onkel Paul sind auch hier."],
        ["A", "Hast du Zeit? Wir sind im Hotel Elbe."],
        ["A", "Meine Telefonnummer ist null drei fünf eins, sechs sieben, acht neun, null eins."],
        ["A", "Bis bald, Sara!"]
      ],
      tr: "Merhaba Sara, ben dedenim. Bugün Oma'nın doğum günü. 72 yaşında. Dresden'de birlikteyiz. Teyzen Ines ve amcan Paul da burada. Vaktin var mı? Hotel Elbe'deyiz. Telefon numaram sıfır üç beş bir, altı yedi, sekiz dokuz, sıfır bir. Görüşürüz, Sara!",
      qs: [
        { t: "mc", q: "Wer spricht?", o: ["Saras Opa", "Saras Vater", "Saras Onkel"], a: "Saras Opa", why: "'Hallo Sara, hier ist dein Opa.'" },
        { t: "short", q: "Wie alt ist Oma?", a: ["72", "zweiundsiebzig", "72 Jahre"], why: "'Sie ist 72 Jahre alt.'" },
        { t: "mc", q: "Wo sind sie?", o: ["in Dresden", "in Bonn", "in Essen"], a: "in Dresden", why: "'Wir sind zusammen in Dresden.'" },
        { t: "rf", q: "Saras Onkel Paul ist auch da.", a: "richtig", why: "'Deine Tante Ines und dein Onkel Paul sind auch hier.'" },
        { t: "mc", q: "Wie ist die Telefonnummer?", o: ["0351 67 89 01", "0351 76 89 01", "0315 67 89 01"], a: "0351 67 89 01", why: "'Null drei fünf eins, sechs sieben, acht neun, null eins.'" }
      ]
    }
  ],
  testReading: [
    {
      title: "Nachricht aus Leipzig",
      text: "Hallo Selma,\nich bin jetzt in Leipzig. Hier wohnen mein Cousin Jan und seine Frau Petra. Jan ist 29 Jahre alt, Petra ist 27. Sie sind verheiratet und haben ein Baby. Das Baby heißt Emma und ist ein Jahr alt. Ihre Katze heißt Mimi.\nBis bald\nJonas",
      tr: "Merhaba Selma,\nşu an Leipzig'deyim. Burada kuzenim Jan ve karısı Petra oturuyor. Jan 29, Petra 27 yaşında. Evliler ve bir bebekleri var. Bebeğin adı Emma ve bir yaşında. Kedilerinin adı Mimi.\nGörüşürüz\nJonas",
      qs: [
        { t: "mc", q: "Wo ist Jonas jetzt?", o: ["in Leipzig", "in Köln", "in Wien"], a: "in Leipzig", why: "Metinde: 'ich bin jetzt in Leipzig.'" },
        { t: "rf", q: "Jan ist 27 Jahre alt.", a: "falsch", why: "Metinde: 'Jan ist 29 Jahre alt, Petra ist 27.'" },
        { t: "short", q: "Wie heißt das Baby?", a: ["Emma"], why: "Metinde: 'Das Baby heißt Emma'." },
        { t: "rf", q: "Jan und Petra sind verheiratet.", a: "richtig", why: "Metinde: 'Sie sind verheiratet und haben ein Baby.'" },
        { t: "mc", q: "Was ist Mimi?", o: ["ein Baby", "ein Hund", "eine Katze"], a: "eine Katze", why: "Metinde: 'Ihre Katze heißt Mimi.'" }
      ]
    },
    {
      title: "Profil: Familie Wagner",
      text: "Das ist Familie Wagner. Michael Wagner ist 41 Jahre alt und kommt aus der Türkei. Seine Ehefrau heißt Monika. Sie kommt aus Deutschland und ist 38. Michael und Monika haben drei Kinder: zwei Söhne und eine Tochter. Die Söhne heißen Moritz und Niklas, die Tochter heißt Leonie. Murats Eltern wohnen in Ankara. Die Familie wohnt in Hannover und hat eine Katze.",
      tr: "Bu Wagner ailesi. Michael Wagner 41 yaşında ve Türkiye'den geliyor. Karısının adı Monika. O Almanya'dan geliyor ve 38 yaşında. Michael ve Monika'nın üç çocuğu var: iki oğul ve bir kız. Oğulların adı Moritz ve Niklas, kızın adı Leonie. Michael'ın anne babası Ankara'da oturuyor. Aile Hannover'de oturuyor ve bir kedisi var.",
      qs: [
        { t: "mc", q: "Wie alt ist Michael?", o: ["38", "41", "14"], a: "41", why: "Metinde: 'Michael Wagner ist 41 Jahre alt'." },
        { t: "rf", q: "Monika kommt aus der Türkei.", a: "falsch", why: "Metinde: 'Sie kommt aus Deutschland'." },
        { t: "mc", q: "Wie viele Söhne haben Michael und Monika?", o: ["einen", "zwei", "drei"], a: "zwei", why: "Metinde: 'zwei Söhne und eine Tochter'." },
        { t: "short", q: "Wie heißt die Tochter?", a: ["Leonie"], why: "Metinde: 'die Tochter heißt Leonie'." },
        { t: "rf", q: "Murats Eltern wohnen in Ankara.", a: "richtig", why: "Metinde: 'Murats Eltern wohnen in Ankara.'" }
      ]
    }
  ],
  testListening: [
    {
      title: "Lara und ihre Familie",
      script: [
        ["A", "Hast du Geschwister, Lara?"],
        ["B", "Ja, ich habe zwei Brüder und eine Schwester."],
        ["A", "Wie heißen sie?"],
        ["B", "Mein Bruder Finn ist 25 und ledig. Meine Schwester Nele ist verheiratet."],
        ["A", "Hat Nele Kinder?"],
        ["B", "Ja, sie hat ein Baby. Es ist sehr klein."],
        ["A", "Hast du auch Großeltern?"],
        ["B", "Ja, meine Großmutter wohnt in Kiel. Mein Großvater ist 85 Jahre alt."]
      ],
      tr: "A: Kardeşin var mı, Lara?\nB: Evet, iki erkek kardeşim ve bir kız kardeşim var.\nA: Adları ne?\nB: Erkek kardeşim Finn 25 yaşında ve bekâr. Kız kardeşim Nele evli.\nA: Nele'nin çocuğu var mı?\nB: Evet, bir bebeği var. Çok küçük.\nA: Büyükanne ve büyükbaban da var mı?\nB: Evet, büyükannem Kiel'de oturuyor. Büyükbabam 85 yaşında.",
      qs: [
        { t: "mc", q: "Wie viele Geschwister hat Lara?", o: ["2", "3", "4"], a: "3", why: "'zwei Brüder und eine Schwester' = 3." },
        { t: "rf", q: "Finn ist verheiratet.", a: "falsch", why: "'Mein Bruder Finn ist 25 und ledig.'" },
        { t: "short", q: "Wie alt ist Finn?", a: ["25", "fünfundzwanzig", "25 Jahre"], why: "'Mein Bruder Finn ist 25'." },
        { t: "rf", q: "Nele hat ein Baby.", a: "richtig", why: "'Ja, sie hat ein Baby.'" },
        { t: "mc", q: "Wo wohnt Laras Großmutter?", o: ["in Kiel", "in Köln", "in Hamburg"], a: "in Kiel", why: "'Meine Großmutter wohnt in Kiel.'" }
      ]
    },
    {
      title: "Nachricht von Nina",
      script: [
        ["A", "Hallo Papa, hier ist Nina."],
        ["A", "Ich bin jetzt in München. Meine Freundin Clara ist auch hier."],
        ["A", "Clara ist 24 Jahre alt. Ihr Partner heißt Marco."],
        ["A", "Wir sind zusammen in München."],
        ["A", "Meine Nummer ist null eins sieben eins, zwei zwei, drei drei, vier vier."],
        ["A", "Tschüs, Papa!"]
      ],
      tr: "Merhaba baba, ben Nina. Şu an Münih'teyim. Arkadaşım Clara da burada. Clara 24 yaşında. Partnerinin adı Marco. Münih'te birlikteyiz. Numaram sıfır bir yedi bir, iki iki, üç üç, dört dört. Hoşça kal baba!",
      qs: [
        { t: "mc", q: "Wer spricht?", o: ["Nina", "Clara", "Marco"], a: "Nina", why: "'Hallo Papa, hier ist Nina.'" },
        { t: "short", q: "Wo ist Nina jetzt?", a: ["München", "in München"], why: "'Ich bin jetzt in München.'" },
        { t: "short", q: "Wie alt ist Clara?", a: ["24", "vierundzwanzig", "24 Jahre"], why: "'Clara ist 24 Jahre alt.'" },
        { t: "rf", q: "Claras Partner heißt Marco.", a: "richtig", why: "'Ihr Partner heißt Marco.'" },
        { t: "mc", q: "Wie ist Ninas Nummer?", o: ["0171 22 33 44", "0171 22 33 55", "0117 22 33 44"], a: "0171 22 33 44", why: "'Null eins sieben eins, zwei zwei, drei drei, vier vier.'" }
      ]
    }
  ],
  uncertain: [
    "Großeltern: yalnız çoğul, pl: null; t verilmedi.",
    "Partner/Cousin: çoğullar Partner (değişmez) ve Cousins (Duden: Cousins); Cousine/Cousinen. Cousin okunuşu 'kuzen' tip'te belirtildi.",
    "Geburtstag ve Ehemann/Ehefrau için t verilmedi (Geburtstag soyut/olay); Ehemann/Ehefrau kişi olduğu için t: 'p' verildi.",
    "Sentences: 'Heute ist mein Geburtstag' ve 'Wann hast du Geburtstag?' gibi kalıplarda wann/heute kelimeleri Ünite 1'de öğrenilmiş sayıldı; sehr, nett gibi temel sözcükler kelime listesi dışı.",
    "'Anna und Tom sind zusammen' = hem 'birlikte' hem 'sevgili'; tr'de parantezle verildi.",
    "Metinlerde 'Wann? Samstag, 15 Uhr', 'wir feiern' (feiern = kutlamak, düzenli fiil, Akkusativ nesnesiz), 'Bis bald!' kalıp olarak kullanıldı; 'Murats Eltern' ve 'Jans Frau' gibi isim-genitifi ('Murats Eltern', 'Lenas Partner' sorularda) A1'de kalıp kabul edildi, ders dışı olabilir.",
    "Sorularda 'Bens Cousine', 'Saras Opa' isim-s genitif biçimi geçiyor; istenmezse sorular 'Wer ist Nora? – Cousine von Ben' yerine seçeneklerle yeniden yazılabilir (von + Dativ de olduğundan tercih edilmedi).",
    "'im Hotel Elbe' (dinleme 2) ve 'auf dem Foto' (dinleme 1) Dativ kalıp olarak geçiyor; gramer dersi dışı, istenirse sadeleştirilebilir.",
    "Possessiv maddeleri yalnız mein/dein/sein/ihr/Ihr; unser/euer eklenmedi."
  ]
};
