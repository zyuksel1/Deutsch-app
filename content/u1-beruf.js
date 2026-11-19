window.CONTENT_PART = {
  unit: "a1-u1",
  words: [
    { de: "Firma", art: "die", pl: "Firmen", tr: "firma, şirket", t: "t", ex: ["Die Firma heißt Keller.", "Firmanın adı Keller."], biz: true },
    { de: "Abteilung", art: "die", pl: "Abteilungen", tr: "bölüm, departman", ex: ["Die Abteilung heißt Einkauf.", "Bölümün adı Satın alma."], biz: true },
    { de: "Einkauf", art: "der", pl: null, tr: "satın alma (bölümü)", ex: ["Ich arbeite im Einkauf.", "Satın almada çalışıyorum."], tip: "Bölüm adı olarak çoğulu yok. 'im Einkauf' = satın alma bölümünde (kalıp).", biz: true },
    { de: "Einkäuferin", art: "die", pl: "Einkäuferinnen", tr: "satın almacı (kadın)", t: "p", ex: ["Ich bin Einkäuferin.", "Ben satın almacıyım."], tip: "Erkek: der Einkäufer. Meslek söylerken artikel kullanılmaz: Ich bin Einkäuferin.", biz: true },
    { de: "Kollegin", art: "die", pl: "Kolleginnen", tr: "iş arkadaşı (kadın)", t: "p", ex: ["Das ist meine Kollegin.", "Bu benim iş arkadaşım."], biz: true },
    { de: "Kollege", art: "der", pl: "Kollegen", tr: "iş arkadaşı (erkek)", ex: ["Das ist mein Kollege Herr Lange.", "Bu iş arkadaşım Bay Lange."], tip: "Kollege n-çekimli bir isimdir: der Kollege, çoğul die Kollegen.", biz: true },
    { de: "Chef", art: "der", pl: "Chefs", tr: "şef, patron, yönetici (erkek)", t: "p", ex: ["Mein Chef heißt Herr Lange.", "Şefimin adı Bay Lange."], tip: "Kadın: die Chefin (Chefinnen).", biz: true },
    { de: "Büro", art: "das", pl: "Büros", tr: "ofis, büro", t: "t", ex: ["Das Büro ist in Hamburg.", "Ofis Hamburg'da."], biz: true },
    { de: "E-Mail", art: "die", pl: "E-Mails", tr: "e-posta", t: "t", ex: ["Die E-Mail ist von Frau Brandt.", "E-posta Bayan Brandt'tan."], biz: true },
    { de: "Vorstellungsgespräch", art: "das", pl: "Vorstellungsgespräche", tr: "iş görüşmesi, mülakat", ex: ["Das Vorstellungsgespräch ist in Köln.", "Mülakat Köln'de."], tip: "Vorstellung (tanıtma) + Gespräch (görüşme).", biz: true },
    { de: "Sehr geehrte Damen und Herren,", tr: "Sayın Bayanlar ve Baylar, (resmî e-posta açılışı)", alts: ["Sehr geehrte Damen und Herren"], ex: ["Sehr geehrte Damen und Herren, ich bin Einkäuferin.", "Sayın Bayanlar ve Baylar, ben satın almacıyım."], tip: "Alıcı kişi bilinmiyorsa kullanılır. Sonda virgül, sonraki satır küçük harfle başlar.", biz: true },
    { de: "Mit freundlichen Grüßen", tr: "Saygılarımla (resmî e-posta kapanışı)", ex: ["Mit freundlichen Grüßen, Hannah Schmidt", "Saygılarımla, Hannah Schmidt"], tip: "Kapanıştan sonra virgül yok; isim bir alt satıra yazılır.", biz: true },
    { de: "Viele Grüße", tr: "Sevgiler, selamlar (yarı resmî kapanış)", ex: ["Viele Grüße, Sophie Richter", "Selamlar, Sophie Richter"], tip: "Tanıdığın iş arkadaşlarına kullanılır; Mit freundlichen Grüßen'den daha rahat.", biz: true },
    { de: "Freut mich!", tr: "Memnun oldum!", alts: ["Freut mich"], ex: ["Guten Tag, Herr Lange. Freut mich!", "İyi günler, Bay Lange. Memnun oldum!"], tip: "Tanışırken söylenen kalıp.", biz: true },
    { de: "Vielen Dank!", tr: "Çok teşekkürler!", alts: ["Vielen Dank"], ex: ["Vielen Dank, Frau Brandt!", "Çok teşekkürler, Bayan Brandt!"], biz: true },
    { de: "Ich bin ... von der Firma ...", tr: "Ben ... firmasındanım (kendini tanıtma kalıbı)", alts: ["Ich bin von der Firma"], ex: ["Ich bin Frau Schmidt von der Firma Becker.", "Ben Becker firmasından Bayan Schmidt'im."], tip: "'von der Firma' kalıp olarak ezberlenir.", biz: true }
  ],
  sentences: [
    { de: "Ich arbeite im Einkauf.", tr: "Satın almada çalışıyorum.", lemmas: ["ich", "arbeiten", "in", "der Einkauf"], alts: ["Im Einkauf arbeite ich."], why: "'im Einkauf' kalıp: bölüm adıyla birlikte kullanılır.", biz: true },
    { de: "Ich bin Einkäuferin bei der Firma Keller.", tr: "Keller firmasında satın almacıyım.", lemmas: ["ich", "sein", "die Einkäuferin", "bei", "die Firma", "Keller"], alts: ["Bei der Firma Keller bin ich Einkäuferin."], why: "'bei der Firma ...' kalıp: çalıştığın firmayı söyler.", biz: true },
    { de: "Mein Name ist Hannah Schmidt.", tr: "Adım Hannah Schmidt.", lemmas: ["mein", "der Name", "sein", "Hannah", "Schmidt"], alts: [], why: "Resmî tanışmada ad ve soyad birlikte söylenir.", biz: true },
    { de: "Ich bin Frau Schmidt von der Firma Becker.", tr: "Ben Becker firmasından Bayan Schmidt'im.", lemmas: ["ich", "sein", "die Frau", "Schmidt", "von", "die Firma", "Becker"], alts: [], why: "'von der Firma ...' kalıp.", biz: true },
    { de: "Das ist meine Kollegin Frau Weber.", tr: "Bu iş arkadaşım Bayan Weber.", lemmas: ["das", "sein", "mein", "die Kollegin", "die Frau", "Weber"], alts: [], why: "Kollegin dişil (die) olduğu için meine.", biz: true },
    { de: "Sehr geehrte Damen und Herren,", tr: "Sayın Bayanlar ve Baylar,", lemmas: ["sehr", "geehrt", "die Dame", "und", "der Herr"], alts: [], why: "Resmî e-posta selamı, kalıp. Sonunda virgül vardır.", biz: true },
    { de: "Mit freundlichen Grüßen, Hannah Schmidt", tr: "Saygılarımla, Hannah Schmidt", lemmas: ["mit", "freundlich", "der Gruß", "Hannah", "Schmidt"], alts: [], why: "Resmî e-posta kapanışı, kalıp.", biz: true },
    { de: "Mein Chef heißt Herr Lange.", tr: "Şefimin adı Bay Lange.", lemmas: ["mein", "der Chef", "heißen", "der Herr", "Lange"], alts: [], why: "Chef maskülen (der) olduğu için mein.", biz: true },
    { de: "Was sind Sie von Beruf?", tr: "Mesleğiniz nedir?", lemmas: ["was", "sein", "Sie", "von", "der Beruf"], alts: [], why: "'von Beruf' kalıp. Resmî 'Sie' ile sein: sind.", biz: true },
    { de: "Ich spreche Deutsch und Türkisch.", tr: "Almanca ve Türkçe konuşuyorum.", lemmas: ["ich", "sprechen", "Deutsch", "und", "Türkisch"], alts: ["Deutsch und Türkisch spreche ich."], why: "ich → spreche.", biz: true },
    { de: "Meine Kollegin arbeitet im Büro.", tr: "İş arkadaşım ofiste çalışıyor.", lemmas: ["mein", "die Kollegin", "arbeiten", "in", "das Büro"], alts: ["Im Büro arbeitet meine Kollegin."], why: "'im Büro' kalıp. er/sie/es → arbeitet (araya -e- girer).", biz: true },
    { de: "Viele Grüße, Sophie Richter", tr: "Selamlar, Sophie Richter", lemmas: ["viel", "der Gruß", "Sophie", "Richter"], alts: [], why: "Yarı resmî e-posta kapanışı, kalıp.", biz: true }
  ],
  reading: [
    {
      title: "E-Mail: Neu im Einkauf",
      text: "Sehr geehrte Frau Brandt,\nich bin Laura Fischer und arbeite im Einkauf bei der Firma Kraft.\nIch komme aus Izmir. Ich wohne in Hamburg.\nIch spreche Türkisch und Deutsch.\nMein Chef ist Herr Lange.\nMeine Telefonnummer ist 040 55 66 77.\nViele Grüße\nElif Fischer",
      tr: "Sayın Bayan Brandt,\nben Laura Fischer ve Kraft firmasında satın almada çalışıyorum.\nİzmir'denim. Hamburg'da oturuyorum.\nTürkçe ve Almanca konuşuyorum.\nŞefim Bay Lange.\nTelefon numaram 040 55 66 77.\nSelamlar\nElif Fischer",
      biz: true,
      qs: [
        { t: "rf", q: "Laura Fischer arbeitet im Einkauf.", a: "richtig", why: "Metinde: 'ich bin Laura Fischer und arbeite im Einkauf bei der Firma Kraft.'" },
        { t: "rf", q: "Laura Fischer wohnt in Izmir.", a: "falsch", why: "Metinde: 'Ich komme aus Izmir. Ich wohne in Hamburg.'" },
        { t: "mc", q: "Wie heißt der Chef?", o: ["Herr Lange", "Herr Kraft", "Herr Brandt"], a: "Herr Lange", why: "Metinde: 'Mein Chef ist Herr Lange.'" },
        { t: "short", q: "Woher kommt Laura Fischer?", a: ["Izmir", "İzmir", "aus Izmir", "aus İzmir"], why: "Metinde: 'Ich komme aus Izmir.'" },
        { t: "short", q: "Wie ist die Telefonnummer von Laura Fischer?", a: ["040 55 66 77", "0405566 77", "04055 66 77", "040556677"], why: "Metinde: 'Meine Telefonnummer ist 040 55 66 77.'" }
      ]
    },
    {
      title: "E-Mail: Herr Nowak ist neu",
      text: "Hallo Kolleginnen und Kollegen,\nHerr Marek Nowak ist neu im Einkauf. Ich bin seine Chefin.\nHerr Nowak kommt aus Polen. Er wohnt in Düsseldorf.\nEr spricht Polnisch, Deutsch und Englisch.\nSein Büro ist Zimmer 12.\nWillkommen im Team, Herr Nowak!\nViele Grüße\nPetra Vogel",
      tr: "Merhaba iş arkadaşlarım,\nBay Marek Nowak satın almada yeni. Ben onun şefiyim.\nBay Nowak Polonya'dan geliyor. Düsseldorf'ta oturuyor.\nLehçe, Almanca ve İngilizce konuşuyor.\nOfisi 12 numaralı oda.\nEkibe hoş geldiniz, Bay Nowak!\nSelamlar\nPetra Vogel",
      biz: true,
      qs: [
        { t: "rf", q: "Herr Nowak kommt aus Polen.", a: "richtig", why: "Metinde: 'Herr Nowak kommt aus Polen.'" },
        { t: "rf", q: "Herr Nowak wohnt in Warschau.", a: "falsch", why: "Metinde: 'Er wohnt in Düsseldorf.'" },
        { t: "mc", q: "Welche Sprachen spricht Herr Nowak?", o: ["Polnisch, Deutsch und Englisch", "Polnisch und Türkisch", "Deutsch und Spanisch"], a: "Polnisch, Deutsch und Englisch", why: "Metinde: 'Er spricht Polnisch, Deutsch und Englisch.'" },
        { t: "short", q: "Welche Zimmernummer hat sein Büro?", a: ["12", "Zimmer 12"], why: "Metinde: 'Sein Büro ist Zimmer 12.'" },
        { t: "short", q: "Wie heißt die Chefin?", a: ["Petra Vogel", "Frau Vogel", "Vogel"], why: "Metinde: 'Ich bin seine Chefin.' und unten: 'Petra Vogel'." }
      ]
    }
  ],
  listening: [
    {
      title: "Vorstellungsgespräch: Der Anfang",
      script: [
        ["A", "Guten Tag. Mein Name ist Neumann. Ich bin von der Firma Stein."],
        ["B", "Guten Tag, Herr Neumann. Freut mich!"],
        ["A", "Wie heißen Sie?"],
        ["B", "Ich heiße Katrin Schneider."],
        ["A", "Woher kommen Sie, Frau Schneider?"],
        ["B", "Ich komme aus der Türkei, aus Ankara."],
        ["A", "Welche Sprachen sprechen Sie?"],
        ["B", "Ich spreche Türkisch, Deutsch und Englisch."],
        ["A", "Was sind Sie von Beruf?"],
        ["B", "Ich bin Einkäuferin."]
      ],
      tr: "A: İyi günler. Adım Neumann. Stein firmasındanım.\nB: İyi günler, Bay Neumann. Memnun oldum!\nA: Adınız nedir?\nB: Adım Katrin Schneider.\nA: Nerelisiniz, Bayan Schneider?\nB: Türkiye'denim, Ankara'dan.\nA: Hangi dilleri konuşuyorsunuz?\nB: Türkçe, Almanca ve İngilizce konuşuyorum.\nA: Mesleğiniz nedir?\nB: Satın almacıyım.",
      biz: true,
      qs: [
        { t: "rf", q: "Herr Neumann ist von der Firma Stein.", a: "richtig", why: "'Ich bin von der Firma Stein.'" },
        { t: "rf", q: "Frau Schneider kommt aus Istanbul.", a: "falsch", why: "'Ich komme aus der Türkei, aus Ankara.'" },
        { t: "mc", q: "Welche Sprachen spricht Frau Schneider?", o: ["Türkisch, Deutsch und Englisch", "Türkisch und Französisch", "Deutsch und Spanisch"], a: "Türkisch, Deutsch und Englisch", why: "'Ich spreche Türkisch, Deutsch und Englisch.'" },
        { t: "short", q: "Was ist Frau Schneider von Beruf?", a: ["Einkäuferin", "Sie ist Einkäuferin", "Ich bin Einkäuferin"], why: "'Ich bin Einkäuferin.'" },
        { t: "short", q: "Wie heißt Frau Schneider mit Vornamen?", a: ["Katrin"], why: "'Ich heiße Katrin Schneider.'" }
      ]
    },
    {
      title: "Am Telefon: Einkauf",
      script: [
        ["A", "Firma Rieger, Einkauf, guten Tag. Hier ist Anja Berg."],
        ["B", "Guten Tag, Frau Berg. Mein Name ist Daniel Roth. Ich bin von der Firma Hansen."],
        ["A", "Guten Tag, Herr Roth. Wie buchstabiert man Roth?"],
        ["B", "R-O-T-H."],
        ["A", "Danke. Und Ihre Telefonnummer?"],
        ["B", "Meine Telefonnummer ist 0711 33 44 55."],
        ["A", "Vielen Dank, Herr Roth. Auf Wiedersehen!"],
        ["B", "Auf Wiedersehen, Frau Berg."]
      ],
      tr: "A: Rieger firması, satın alma, iyi günler. Ben Anja Berg.\nB: İyi günler, Bayan Berg. Adım Daniel Roth. Hansen firmasındanım.\nA: İyi günler, Bay Roth. Roth nasıl yazılır?\nB: R-O-T-H.\nA: Teşekkürler. Telefon numaranız?\nB: Telefon numaram 0711 33 44 55.\nA: Çok teşekkürler, Bay Roth. Hoşça kalın!\nB: Hoşça kalın, Bayan Berg.",
      biz: true,
      qs: [
        { t: "rf", q: "Frau Berg arbeitet im Einkauf.", a: "richtig", why: "'Firma Rieger, Einkauf, guten Tag. Hier ist Anja Berg.'" },
        { t: "rf", q: "Herr Roth ist von der Firma Rieger.", a: "falsch", why: "'Ich bin von der Firma Hansen.'" },
        { t: "mc", q: "Von welcher Firma ist Herr Roth?", o: ["Hansen", "Rieger", "Berg"], a: "Hansen", why: "'Ich bin von der Firma Hansen.'" },
        { t: "short", q: "Wie buchstabiert Herr Roth seinen Namen?", a: ["R-O-T-H", "ROTH", "R O T H"], why: "'R-O-T-H.'" },
        { t: "short", q: "Wie ist die Telefonnummer von Herrn Roth?", a: ["0711 33 44 55", "071133 44 55", "0711334455"], why: "'Meine Telefonnummer ist 0711 33 44 55.'" }
      ]
    }
  ],
  testReading: [
    {
      title: "E-Mail: Marco Rossi",
      text: "Sehr geehrter Herr Winter,\nich bin Marco Rossi. Ich bin Einkäufer bei der Firma Bauer in München.\nIch komme aus Italien, aus Mailand. Ich bin 29 Jahre alt.\nIch spreche Italienisch, Deutsch und Englisch.\nMeine Kollegin heißt Frau Fink. Sie arbeitet auch im Einkauf.\nMeine Telefonnummer ist 089 12 34 56.\nMit freundlichen Grüßen\nMarco Rossi",
      tr: "Sayın Bay Winter,\nben Marco Rossi. Münih'te Bauer firmasında satın almacıyım.\nİtalya'dan, Milano'dan geliyorum. 29 yaşındayım.\nİtalyanca, Almanca ve İngilizce konuşuyorum.\nİş arkadaşımın adı Bayan Fink. O da satın almada çalışıyor.\nTelefon numaram 089 12 34 56.\nSaygılarımla\nMarco Rossi",
      biz: true,
      qs: [
        { t: "rf", q: "Marco Rossi kommt aus Mailand.", a: "richtig", why: "'Ich komme aus Italien, aus Mailand.'" },
        { t: "rf", q: "Marco Rossi ist 32 Jahre alt.", a: "falsch", why: "'Ich bin 29 Jahre alt.'" },
        { t: "mc", q: "Wo arbeitet Marco Rossi?", o: ["Bei der Firma Bauer", "Bei der Firma Fink", "Bei der Firma Winter"], a: "Bei der Firma Bauer", why: "'Ich bin Einkäufer bei der Firma Bauer in München.'" },
        { t: "short", q: "Wie heißt die Kollegin?", a: ["Frau Fink", "Fink"], why: "'Meine Kollegin heißt Frau Fink.'" },
        { t: "short", q: "Wie ist die Telefonnummer von Marco Rossi?", a: ["089 12 34 56", "0891234 56", "08912 34 56", "08912 3456", "08912 3456"], why: "'Meine Telefonnummer ist 089 12 34 56.'" }
      ]
    }
  ],
  testListening: [
    {
      title: "Vorstellungsgespräch: Herr Lehmann",
      script: [
        ["A", "Guten Tag, Herr Lehmann. Ich bin Frau Kern von der Firma Lang."],
        ["B", "Guten Tag, Frau Kern. Freut mich!"],
        ["A", "Freut mich auch. Woher kommen Sie, Herr Lehmann?"],
        ["B", "Ich komme aus Bursa, aus der Türkei. Ich wohne in Stuttgart."],
        ["A", "Was sind Sie von Beruf?"],
        ["B", "Ich bin Einkäufer."],
        ["A", "Sprechen Sie Englisch?"],
        ["B", "Ja, ich spreche Englisch und Deutsch."],
        ["A", "Sehr gut. Wo arbeiten Sie?"],
        ["B", "Ich arbeite bei der Firma Maier in Stuttgart."]
      ],
      tr: "A: İyi günler, Bay Lehmann. Ben Lang firmasından Bayan Kern.\nB: İyi günler, Bayan Kern. Memnun oldum!\nA: Ben de memnun oldum. Nerelisiniz, Bay Lehmann?\nB: Türkiye'de Bursa'danım. Stuttgart'ta oturuyorum.\nA: Mesleğiniz nedir?\nB: Satın almacıyım.\nA: İngilizce konuşuyor musunuz?\nB: Evet, İngilizce ve Almanca konuşuyorum.\nA: Çok iyi. Nerede çalışıyorsunuz?\nB: Stuttgart'ta Maier firmasında çalışıyorum.",
      biz: true,
      qs: [
        { t: "rf", q: "Frau Kern ist von der Firma Lang.", a: "richtig", why: "'Ich bin Frau Kern von der Firma Lang.'" },
        { t: "rf", q: "Herr Lehmann wohnt in Bursa.", a: "falsch", why: "'Ich komme aus Bursa ... Ich wohne in Stuttgart.'" },
        { t: "mc", q: "Was ist Herr Lehmann von Beruf?", o: ["Einkäufer", "Chef", "Kollege"], a: "Einkäufer", why: "'Ich bin Einkäufer.'" },
        { t: "short", q: "Wo wohnt Herr Lehmann?", a: ["Stuttgart", "in Stuttgart"], why: "'Ich wohne in Stuttgart.'" },
        { t: "short", q: "Herr Lehmann arbeitet bei der Firma ...", a: ["Maier"], why: "'Ich arbeite bei der Firma Maier in Stuttgart.'" }
      ]
    }
  ],
  uncertain: [
    "Einkäuferin/Einkäufer: 'Ich bin Einkäuferin' (artikelsiz meslek) A1 için doğru; 'Einkäufer' yerine bazı firmalar 'Mitarbeiter im Einkauf' der, sorun yok.",
    "Sentence 'Mit freundlichen Grüßen, Hannah Schmidt' ve 'Viele Grüße, Sophie Richter' tek satırda, virgülle yazıldı (gerçek e-postada ad alt satırda, kapanıştan sonra virgül yok). Uygulamada tek satır kelime sıralama alıştırması için virgül bırakıldı; istersen virgülü kaldır.",
    "'Sehr geehrte Damen und Herren,' cümle olarak 5 kelime ve sonda virgül içeriyor; kıyaslama motoru noktalamayı yok sayıyorsa sorun yok.",
    "Test okuma short cevabında telefon numarası boşluk varyasyonları alts olarak verildi; uygulama boşlukları normalize ediyorsa sadeleştirilebilir.",
    "'Einkauf' kelimesinde pl: null; 'Alter' örneği gibi mevcut içerikteki gösterim ile tutarlı varsayıldı.",
    "Listening 1: mülakatta 'Wie heißen Sie?' kişi tanıtıldıktan sonra soruluyor; doğal kısmı kısmen yapay, A1 sorularını göstermek için tercih edildi.",
    "'Zimmer', 'Beruf', 'Euro' vb. bazı kelimeler words listesinde yok, ünitedeki yeni kelime olarak okuma metinlerinde geçiyor (Zimmer 12)."
  ]
};
