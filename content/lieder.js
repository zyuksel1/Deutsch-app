// Deutsch-App şarkıları (v0.5). Sözler: geleneksel / telifsiz Almanca çocuk ve halk şarkıları + Claude'un yazdığı
// gramer şarkısı. Melodi dosya değil: notalar tarayıcıda sentezlenir (enstrüman, şarkı söyleyen ses yok).
// Satır biçimi: de = hecelere ayrılmış söz ("|" hece sınırı), n = her heceye bir nota ("C4:2" = 2 vuruş; süre yoksa 1).
// Melodiler Claude'un hafızasından yazıldı; en az emin olunan: Kuckuck. Artikeller: uncertain listesi boş (hepsi temel kelime).
window.LIEDER = [
  {
    id: "akk-lied", title: "Akkusativ-Lied", icon: "💡", tag: "Gramer şarkısı · Claude yazdı", bpm: 108,
    about: "Akkusativ kuralını ezberletmek için yazılmış kısa bir şarkı. Kural: nesne (kimi/neyi?) olunca yalnız maskulin değişir.",
    lines: [
      { de: "Der wird den, der wird den,", n: "C4 E4 G4:2 C4 E4 G4:2", tr: "der, den olur; der, den olur," },
      { de: "die bleibt die, das bleibt das.", n: "A4 A4 G4:2 F4 F4 E4:2", tr: "die, die kalır; das, das kalır." },
      { de: "Ich se|he den Hund,", n: "D4:.5 D4:.5 D4:.5 E4:.5 F4:2", tr: "Köpeği görüyorum," },
      { de: "ich se|he die Kat|ze,", n: "E4:.5 E4:.5 E4:.5 F4:.5 G4 G4", tr: "kediyi görüyorum," },
      { de: "ich se|he das Haus:", n: "F4:.5 F4:.5 F4:.5 E4:.5 D4:2", tr: "evi görüyorum:" },
      { de: "Ak|ku|sa|tiv!", n: "G4 G4 D4 C4:2", tr: "Akkusativ!", noEx: true },
      { de: "Ein wird ei|nen, ein wird ei|nen,", n: "C4 E4 G4 G4 C4 E4 G4 G4", tr: "ein, einen olur; ein, einen olur," },
      { de: "ei|ne bleibt ei|ne, ein bleibt ein.", n: "A4:.5 A4:.5 G4 F4:.5 F4:.5 E4 D4 C4:2", tr: "eine, eine kalır; (nötr) ein, ein kalır." }
    ],
    words: [
      { de: "werden", tr: "olmak, dönüşmek", ex: ["Der wird den.", "der, den olur."], tip: "Düzensiz: ich werde, du wirst, er/sie/es wird." },
      { de: "bleiben", tr: "kalmak", ex: ["Die bleibt die.", "die, die kalır."] },
      { de: "sehen", tr: "görmek", ex: ["Ich sehe den Hund.", "Köpeği görüyorum."], tip: "Düzensiz: du siehst, er/sie/es sieht (e → ie)." }
    ],
    notes: [
      "<b>Akkusativ</b> = cümlenin nesnesi. Fiile <i>wen/was?</i> (kimi/neyi?) diye sor: <i>Ich sehe <b>den Hund</b>.</i> Kimi görüyorum? Köpeği → nesne.",
      "Yalnız <b>maskulin</b> değişir: der → den, ein → einen. Feminin (die/eine) ve nötr (das/ein) aynı kalır.",
      "<i>der Hund</i> maskulin olduğu için <i>den Hund</i>; <i>die Katze</i> ve <i>das Haus</i> değişmez."
    ]
  },
  {
    id: "bruder-jakob", title: "Bruder Jakob", icon: "🔔", tag: "Geleneksel", bpm: 112,
    about: "Dünyaca bilinen kanon (Fransızcası: Frère Jacques). Kısa, tekrarlı; soru cümlesi ve düzensiz fiil için iyi.",
    lines: [
      { de: "Bru|der Ja|kob, Bru|der Ja|kob,", n: "C4 D4 E4 C4 C4 D4 E4 C4", tr: "Jakob kardeş, Jakob kardeş," },
      { de: "schläfst du noch? Schläfst du noch?", n: "E4 F4 G4:2 E4 F4 G4:2", tr: "hâlâ uyuyor musun? Hâlâ uyuyor musun?" },
      { de: "Hörst du nicht die Glo|cken?", n: "G4:.5 A4:.5 G4:.5 F4:.5 E4 C4", tr: "Çanları duymuyor musun?" },
      { de: "Hörst du nicht die Glo|cken?", n: "G4:.5 A4:.5 G4:.5 F4:.5 E4 C4", tr: "Çanları duymuyor musun?", rep: true },
      { de: "Ding, dang, dong. Ding, dang, dong.", n: "C4 G3 C4:2 C4 G3 C4:2", tr: "Ding, dang, dong.", noEx: true }
    ],
    words: [
      { de: "Glocke", art: "die", pl: "Glocken", tr: "çan, zil", tip: "-e ile biten isimlerin çoğu die'dir.", ex: ["Die Glocke ist laut.", "Çan gürültülü."] },
      { de: "schlafen", tr: "uyumak", ex: ["Schläfst du noch?", "Hâlâ uyuyor musun?"], tip: "Düzensiz: du schläfst, er/sie/es schläft (a → ä)." },
      { de: "hören", tr: "duymak, dinlemek", ex: ["Ich höre Musik.", "Müzik dinliyorum."] },
      { de: "noch", tr: "hâlâ, daha", ex: ["Ich bin noch müde.", "Hâlâ yorgunum."] }
    ],
    notes: [
      "<b>Evet/hayır sorusunda fiil başta:</b> <i>Schläfst du noch?</i> (düz cümle: <i>Du schläfst noch.</i>)",
      "<b>schlafen</b> düzensiz: du ve er/sie/es ile a → ä olur: ich schlafe, du <b>schläfst</b>, er <b>schläft</b>. Aynı kalıp: fahren → du fährst.",
      "<b>nicht</b> cümleyi olumsuz yapar: <i>Hörst du <b>nicht</b>?</i> = duymuyor musun?",
      "<i>die Glocken</i> çoğul. Çoğulda artikel her zaman <b>die</b>."
    ]
  },
  {
    id: "alle-meine-entchen", title: "Alle meine Entchen", icon: "🦆", tag: "Geleneksel", bpm: 100,
    about: "Almanya'da her çocuğun bildiği ilk şarkı. -chen küçültme eki ve yer bildiren ifadeler için iyi.",
    lines: [
      { de: "Al|le mei|ne Ent|chen", n: "C4:.5 D4:.5 E4:.5 F4:.5 G4 G4", tr: "Bütün ördekçiklerim" },
      { de: "schwim|men auf dem See,", n: "A4:.5 A4:.5 A4:.5 A4:.5 G4:2", tr: "gölde yüzüyor," },
      { de: "schwim|men auf dem See,", n: "A4:.5 A4:.5 A4:.5 A4:.5 G4:2", tr: "gölde yüzüyor,", rep: true },
      { de: "Köpf|chen in das Was|ser,", n: "F4:.5 F4:.5 F4:.5 F4:.5 E4 E4", tr: "başçıkları suyun içinde," },
      { de: "Schwänz|chen in die Höh'.", n: "D4:.5 D4:.5 D4:.5 D4:.5 C4:2", tr: "kuyrukçukları havada." }
    ],
    words: [
      { de: "Ente", art: "die", pl: "Enten", tr: "ördek", tip: "Küçültme: das Entchen (ördekçik). -chen alınca her isim das olur.", ex: ["Die Ente schwimmt.", "Ördek yüzüyor."] },
      { de: "See", art: "der", pl: "Seen", tr: "göl", tip: "Dikkat: der See = göl, die See = deniz.", ex: ["Der See ist groß.", "Göl büyük."] },
      { de: "Wasser", art: "das", pl: "", tr: "su", ex: ["Das Wasser ist kalt.", "Su soğuk."] },
      { de: "Kopf", art: "der", pl: "Köpfe", tr: "baş, kafa", tip: "Küçültme: das Köpfchen.", ex: ["Mein Kopf tut weh.", "Başım ağrıyor."] },
      { de: "schwimmen", tr: "yüzmek", ex: ["Ich schwimme gern.", "Yüzmeyi severim."] },
      { de: "alle", tr: "bütün, hepsi", ex: ["Alle Kinder spielen.", "Bütün çocuklar oynuyor."] }
    ],
    notes: [
      "<b>-chen</b> küçültme ekidir ve kelimeyi her zaman <b>das</b> yapar: die Ente → <b>das</b> Entchen, der Kopf → <b>das</b> Köpfchen. Çoğu zaman sesli harf de umlaut alır (o → ö, a → ä).",
      "<b>meine</b>: çoğul isimle iyelik -e alır (meine Entchen = benim ördekçiklerim).",
      "<i>auf dem See</i> = gölün üstünde (nerede?). <i>dem</i> biçimi Dativ'tir; onu A1'in ilerisinde öğreneceksin, şimdilik kalıp olarak al.",
      "<i>Höh'</i> = Höhe (yükseklik); şarkıda hece uysun diye kısaltılmış."
    ]
  },
  {
    id: "haenschen-klein", title: "Hänschen klein", icon: "🎒", tag: "Geleneksel · söz: F. Wiedemann (19. yy)", bpm: 116,
    about: "Küçük Hans dünyayı gezmeye çıkar, annesi ağlar, o da eve döner. Hikâyesi olan, günlük kelimelerle dolu bir şarkı.",
    lines: [
      { de: "Häns|chen klein ging al|lein", n: "G4 E4 E4:2 F4 D4 D4:2", tr: "Küçük Hans tek başına" },
      { de: "in die wei|te Welt hi|nein.", n: "C4 D4 E4 F4 G4 G4 G4:2", tr: "geniş dünyaya çıktı." },
      { de: "Stock und Hut steht ihm gut,", n: "G4 E4 E4:2 F4 D4 D4:2", tr: "Baston ve şapka ona yakışıyor," },
      { de: "ist gar wohl|ge|mut.", n: "C4 E4 G4 G4 C4:4", tr: "keyfi çok yerinde." },
      { de: "A|ber Mut|ter wei|net sehr,", n: "D4 D4 D4 D4 D4 E4 F4:2", tr: "Ama annesi çok ağlıyor," },
      { de: "hat ja nun kein Häns|chen mehr.", n: "E4 E4 E4 E4 E4 F4 G4:2", tr: "artık Hans'ı yok." },
      { de: "Da be|sinnt sich das Kind,", n: "G4 E4 E4:2 F4 D4 D4:2", tr: "O zaman çocuk fikrini değiştiriyor," },
      { de: "läuft nach Haus ge|schwind.", n: "C4 E4 G4 G4 C4:4", tr: "hızla eve koşuyor." }
    ],
    words: [
      { de: "Welt", art: "die", pl: "Welten", tr: "dünya", ex: ["Die Welt ist groß.", "Dünya büyük."] },
      { de: "Hut", art: "der", pl: "Hüte", tr: "şapka", t: "t", ex: ["Der Hut ist neu.", "Şapka yeni."] },
      { de: "Stock", art: "der", pl: "Stöcke", tr: "baston, sopa", ex: ["Der Stock ist lang.", "Sopa uzun."] },
      { de: "klein", tr: "küçük", ex: ["Das Kind ist klein.", "Çocuk küçük."] },
      { de: "allein", tr: "yalnız, tek başına", ex: ["Ich wohne allein.", "Yalnız yaşıyorum."] },
      { de: "weinen", tr: "ağlamak", ex: ["Das Kind weint.", "Çocuk ağlıyor."] },
      { de: "laufen", tr: "koşmak, yürümek", ex: ["Er läuft nach Hause.", "Eve koşuyor."], tip: "Düzensiz: du läufst, er/sie/es läuft (au → äu)." },
      { de: "nach Hause", tr: "eve (doğru)", ex: ["Ich gehe nach Hause.", "Eve gidiyorum."], tip: "nach Hause = eve (yön); zu Hause = evde (yer)." }
    ],
    notes: [
      "<b>ging</b> = gitti: <i>gehen</i> fiilinin geçmiş zamanı. A1'de kullanman beklenmez, yalnız tanı.",
      "<b>kein</b> ismi olumsuz yapar: <i>kein Hänschen</i> = Hans yok. (ein → kein)",
      "<b>läuft</b>: laufen düzensiz, au → äu (er läuft). Aynı kalıp: schlafen → er schläft, fahren → er fährt.",
      "Şarkı dili eski: <i>weinet</i> bugün <i>weint</i>, <i>nach Haus</i> bugün <i>nach Hause</i>, <i>geschwind</i> bugün <i>schnell</i> denir.",
      "<i>Hänschen</i> = küçük Hans (-chen küçültme eki, das)."
    ]
  },
  {
    id: "kuckuck", title: "Kuckuck, Kuckuck", icon: "🌳", tag: "Geleneksel · söz: Hoffmann von Fallersleben (19. yy)", bpm: 126,
    about: "Bahar şarkısı. Guguk kuşu ormandan seslenir. 'Haydi ...-elim' kalıbı ve mevsim kelimesi için iyi.",
    lines: [
      { de: "Ku|ckuck, Ku|ckuck,", n: "G4 E4:2 G4 E4:2", tr: "Guguk, guguk," },
      { de: "ruft's aus dem Wald.", n: "D4 C4 D4 C4:3", tr: "diye sesleniyor ormandan." },
      { de: "Las|set uns sin|gen,", n: "D4 D4 E4 F4:2 D4", tr: "Haydi şarkı söyleyelim," },
      { de: "tan|zen und sprin|gen!", n: "E4 E4 F4 G4:2 E4", tr: "dans edelim ve zıplayalım!" },
      { de: "Früh|ling, Früh|ling", n: "G4 E4:2 G4 E4:2", tr: "Bahar, bahar" },
      { de: "wird es nun bald.", n: "F4 E4 D4 C4:3", tr: "yakında geliyor." }
    ],
    words: [
      { de: "Kuckuck", art: "der", pl: "Kuckucke", tr: "guguk kuşu", ex: ["Der Kuckuck ruft.", "Guguk kuşu ötüyor."] },
      { de: "Wald", art: "der", pl: "Wälder", tr: "orman", ex: ["Der Wald ist grün.", "Orman yeşil."] },
      { de: "Frühling", art: "der", pl: "Frühlinge", tr: "ilkbahar", tip: "Mevsimler, aylar ve günler der'dir: der Frühling, der Sommer, der Montag.", ex: ["Der Frühling ist schön.", "İlkbahar güzel."] },
      { de: "singen", tr: "şarkı söylemek", ex: ["Wir singen ein Lied.", "Bir şarkı söylüyoruz."] },
      { de: "tanzen", tr: "dans etmek", ex: ["Ich tanze gern.", "Dans etmeyi severim."] },
      { de: "rufen", tr: "seslenmek, çağırmak", ex: ["Die Mutter ruft das Kind.", "Anne çocuğu çağırıyor."] },
      { de: "bald", tr: "yakında", ex: ["Bis bald!", "Yakında görüşürüz!"] }
    ],
    notes: [
      "<b>Lasset uns singen</b> = haydi şarkı söyleyelim. Bugünkü dilde: <i>Lass uns singen!</i> (iki kişi) / <i>Lasst uns singen!</i> (grup).",
      "<b>ruft's</b> = ruft es (sesleniyor); kesme işareti düşen <i>e</i> harfini gösterir.",
      "<i>aus dem Wald</i> = ormandan. <b>aus</b> = -den, içinden: <i>Ich komme aus der Türkei.</i>",
      "Mevsimler her zaman <b>der</b>: der Frühling, der Sommer, der Herbst, der Winter."
    ]
  }
];
// Eksik kelime sorusunda satır başına sorulacak kelime (null = o satırdan eksik kelime sorusu yok).
(function () {
  const GAPS = {
    "akk-lied": ["den", "bleibt", "den", "die", "das", null, "einen", "eine"],
    "bruder-jakob": ["Bruder", "schläfst", "Glocken", null, null],
    "alle-meine-entchen": ["meine", "schwimmen", null, "Wasser", null],
    "haenschen-klein": ["klein", "Welt", "Hut", null, "Mutter", "kein", "Kind", "Haus"],
    "kuckuck": [null, "Wald", "singen", "tanzen", "Frühling", "bald"]
  };
  window.LIEDER.forEach(s => (GAPS[s.id] || []).forEach((g, i) => { if (g) s.lines[i].gap = g; }));
})();
