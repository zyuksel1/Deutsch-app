// Deutsch-App icerik (iskelet, A1 ornek seti). Artikeller Claude tarafindan yazildi;
// supheli olanlar Duden'den dogrulanmali (Kural: Deutsch-App/Kurallar.md).
// t: "p" = kisi/hayvan, "t" = nesne. tip: artikel icin hafiza ipucu (varsa).
window.NOUNS = [
  { de: "Bruder",  art: "der", pl: "Brüder",   tr: "erkek kardeş", t: "p", ex: ["Mein Bruder wohnt in Berlin.", "Erkek kardeşim Berlin'de oturuyor."] },
  { de: "Schwester", art: "die", pl: "Schwestern", tr: "kız kardeş", t: "p", tip: "Kişi adlarında artikel çoğunlukla cinsiyete uyar: kadın = die (die Mutter, die Schwester).", ex: ["Meine Schwester arbeitet hier.", "Kız kardeşim burada çalışıyor."] },
  { de: "Mutter",  art: "die", pl: "Mütter",   tr: "anne", t: "p", ex: ["Die Mutter kocht Suppe.", "Anne çorba pişiriyor."] },
  { de: "Vater",   art: "der", pl: "Väter",    tr: "baba", t: "p", ex: ["Der Vater liest die Zeitung.", "Baba gazeteyi okuyor."] },
  { de: "Kind",    art: "das", pl: "Kinder",   tr: "çocuk", t: "p", ex: ["Das Kind spielt im Garten.", "Çocuk bahçede oynuyor."] },
  { de: "Mädchen", art: "das", pl: "Mädchen",  tr: "kız çocuğu", t: "p", tip: "-chen ile biten her isim das'tır (küçültme eki).", ex: ["Das Mädchen ist sehr nett.", "Kız çocuğu çok sevimli."] },
  { de: "Freund",  art: "der", pl: "Freunde",  tr: "arkadaş (erkek)", t: "p", ex: ["Mein Freund kommt morgen.", "Arkadaşım yarın geliyor."] },
  { de: "Buch",    art: "das", pl: "Bücher",   tr: "kitap", t: "t", ex: ["Das Buch ist neu.", "Kitap yeni."] },
  { de: "Stuhl",   art: "der", pl: "Stühle",   tr: "sandalye", t: "t", ex: ["Der Stuhl steht am Tisch.", "Sandalye masanın yanında duruyor."] },
  { de: "Tisch",   art: "der", pl: "Tische",   tr: "masa", t: "t", ex: ["Der Tisch ist groß.", "Masa büyük."] },
  { de: "Lampe",   art: "die", pl: "Lampen",   tr: "lamba", t: "t", tip: "-e ile biten isimlerin çoğu die'dir.", ex: ["Die Lampe ist hell.", "Lamba aydınlık."] },
  { de: "Tasche",  art: "die", pl: "Taschen",  tr: "çanta", t: "t", tip: "-e ile biten isimlerin çoğu die'dir.", ex: ["Die Tasche ist schwer.", "Çanta ağır."] },
  { de: "Katze",   art: "die", pl: "Katzen",   tr: "kedi", t: "p", tip: "-e ile biten isimlerin çoğu die'dir.", ex: ["Die Katze schläft auf dem Sofa.", "Kedi kanepede uyuyor."] },
  { de: "Hund",    art: "der", pl: "Hunde",    tr: "köpek", t: "p", ex: ["Der Hund ist klein.", "Köpek küçük."] },
  { de: "Auto",    art: "das", pl: "Autos",    tr: "araba", t: "t", ex: ["Das Auto ist rot.", "Araba kırmızı."] },
  { de: "Bus",     art: "der", pl: "Busse",    tr: "otobüs", t: "t", ex: ["Der Bus kommt gleich.", "Otobüs birazdan geliyor."] },
  { de: "Zug",     art: "der", pl: "Züge",     tr: "tren", t: "t", ex: ["Der Zug hat Verspätung.", "Tren rötar yapıyor."] },
  { de: "Haus",    art: "das", pl: "Häuser",   tr: "ev (bina)", t: "t", ex: ["Das Haus ist alt.", "Ev eski."] },
  { de: "Zimmer",  art: "das", pl: "Zimmer",   tr: "oda", t: "t", ex: ["Das Zimmer ist klein.", "Oda küçük."] },
  { de: "Wohnung", art: "die", pl: "Wohnungen", tr: "daire", t: "t", tip: "-ung ile biten her isim die'dir.", ex: ["Die Wohnung ist teuer.", "Daire pahalı."] },
  { de: "Stadt",   art: "die", pl: "Städte",   tr: "şehir", t: "t", ex: ["Die Stadt ist schön.", "Şehir güzel."] },
  { de: "Apfel",   art: "der", pl: "Äpfel",    tr: "elma", t: "t", ex: ["Der Apfel ist rot.", "Elma kırmızı."] },
  { de: "Brot",    art: "das", pl: "Brote",    tr: "ekmek", t: "t", ex: ["Das Brot ist frisch.", "Ekmek taze."] },
  { de: "Kaffee",  art: "der", pl: "Kaffees",  tr: "kahve", t: "t", ex: ["Der Kaffee ist heiß.", "Kahve sıcak."] }
];

// Tablolar (kisa tutulur: yanlis cevapta ilgili satir baloncukta gosterilir)
window.FORMS = {
  // [nominativ, akkusativ]
  def:  { m: ["der", "den"],      f: ["die", "die"],     n: ["das", "das"] },
  ein:  { m: ["ein", "einen"],    f: ["eine", "eine"],   n: ["ein", "ein"] },
  mein: { m: ["mein", "meinen"],  f: ["meine", "meine"], n: ["mein", "mein"] },
  kein: { m: ["kein", "keinen"],  f: ["keine", "keine"], n: ["kein", "kein"] }
};
window.GENDER_NAME = { m: "maskulin (der)", f: "feminin (die)", n: "nötr (das)" };
window.ART_GENDER = { der: "m", die: "f", das: "n" };

// Mini dersler (Turkce). Alistirma, ilgili ders okunmadan acilmaz.
window.LESSONS = [
  { id: "artikel", title: "Artikel: der, die, das", needs: [], summary: "Her ismin cinsiyeti var: der (eril), die (dişil), das (nötr). Çoğulda hep die. Kelimeyi artikeliyle öğren.",
    html: `<p>Almancada her ismin bir cinsiyeti (Genus) vardır ve bunu artikel gösterir:</p>
<table><tr><th>Artikel</th><th>Cinsiyet</th><th>Örnek</th></tr>
<tr><td class="art-der"><b>der</b></td><td>eril (maskulin)</td><td>der Hund, der Tisch</td></tr>
<tr><td class="art-die"><b>die</b></td><td>dişil (feminin)</td><td>die Lampe, die Mutter</td></tr>
<tr><td class="art-das"><b>das</b></td><td>nötr (neutral)</td><td>das Buch, das Kind</td></tr></table>
<p>Cinsiyet çoğu zaman mantıkla bulunmaz (das Mädchen = kız çocuğu, ama nötr!). Bu yüzden <b>kelimeyi her zaman artikeliyle öğren</b>: "Buch" değil, "das Buch".</p>
<p><b>Yardımcı ipuçları</b> (her zaman değil, çoğu zaman):</p>
<ul><li>-ung, -heit, -keit, -ion ile bitenler → <span class="art-die">die</span> (die Wohnung)</li>
<li>-chen, -lein ile bitenler → <span class="art-das">das</span> (das Mädchen)</li>
<li>-e ile bitenlerin çoğu → <span class="art-die">die</span> (die Lampe, die Tasche)</li>
<li>Erkek kişiler → der (der Vater), kadın kişiler → die (die Mutter)</li>
<li>Çoğulda artikel her zaman <span class="art-die">die</span>: die Bücher, die Hunde</li></ul>` },
  { id: "nominativ", title: "Nominativ: kim? ne? (özne)", needs: ["artikel"], summary: "Özne = işi yapan; sorusu wer? (kim?) / was? (ne?). Nominativde artikel sözlükteki hâlidir: der/die/das, ein/eine.",
    html: `<p>Almancada isim, cümledeki <b>görevine</b> göre artikelini değiştirebilir. Bu görevlere <b>hâl</b> (Kasus) denir. İlk hâl: <b>Nominativ</b>.</p>
<p><b>Nominativ = cümlede işi yapan, yani özne.</b><br>Sorusu: <b>Wer?</b> (kim?) / <b>Was?</b> (ne?)</p>
<p class="ex"><b>Der Hund</b> schläft. → <i>Wer schläft?</i> Der Hund.<br><span class="muted">Kim uyuyor? Köpek.</span></p>
<p>Nominativ'de artikel sözlükteki hâlidir; <b>hiç değişmez</b>:</p>
<table><tr><th></th><th>belirli</th><th>belirsiz</th></tr>
<tr><td class="art-der">maskulin</td><td>der</td><td>ein</td></tr>
<tr><td class="art-die">feminin</td><td>die</td><td>eine</td></tr>
<tr><td class="art-das">nötr</td><td>das</td><td>ein</td></tr></table>
<p><b>sein</b> (olmak) fiilinde iki taraf da Nominativ'dir: <i>Das ist <b>ein</b> Hund.</i></p>
<p>Alıştırmada önce ismin cümlede <b>özne</b> mi <b>nesne</b> mi olduğunu seçeceksin, sonra artikeli yazacaksın.</p>` },
  { id: "akkusativ", title: "Akkusativ: kimi? neyi? (nesne)", needs: ["nominativ"], summary: "Nesne = fiilin etkilediği; sorusu wen? (kimi?) / was? (neyi?). Yalnız maskulin değişir: der→den, ein→einen.",
    html: `<p><b>Akkusativ = fiilin etkilediği nesne.</b><br>Sorusu: <b>Wen?</b> (kimi?) / <b>Was?</b> (neyi?)</p>
<p class="ex">Ich sehe <b>den Hund</b>. → <i>Wen sehe ich?</i> Den Hund.<br><span class="muted">Kimi görüyorum? Köpeğ<b>i</b>.</span></p>
<p>Türkçedeki <b>-i hâline</b> benzer: köpeğ-<b>i</b> görüyorum, kitab-<b>ı</b> okuyorum.</p>
<p><b>Sadece maskulin (der) değişir!</b> die, das ve çoğul aynı kalır:</p>
<table><tr><th></th><th>Nominativ</th><th>Akkusativ</th></tr>
<tr><td class="art-der">maskulin</td><td>der / ein / mein / kein</td><td><b>den / einen / meinen / keinen</b></td></tr>
<tr><td class="art-die">feminin</td><td>die / eine / meine / keine</td><td>die / eine / meine / keine</td></tr>
<tr><td class="art-das">nötr</td><td>das / ein / mein / kein</td><td>das / ein / mein / kein</td></tr></table>
<p>Akkusativ isteyen sık fiiller: <b>haben</b> (sahip olmak), <b>sehen</b> (görmek), <b>suchen</b> (aramak), <b>kennen</b> (tanımak), <b>brauchen</b> (ihtiyacı olmak), <b>kaufen</b> (satın almak).</p>
<p><b>Püf noktası:</b> Fiile "kimi / neyi?" diye sor. Cevap olan isim Akkusativ'dir. "Kim / ne?" sorusunun cevabı ise öznedir (Nominativ).<br><span class="muted">Dikkat: "Was?" iki hâlde de sorulur; özne mi nesne mi olduğuna fiilden bak.</span></p>` }
];

// Fiiller: Akkusativ ister (wen/was?). for: p = kisi/hayvan, t = nesne
window.VERBS = [
  { s: "Ich habe",   for: "pt", tr: "sahip olmak" },
  { s: "Ich sehe",   for: "pt", tr: "görmek" },
  { s: "Ich suche",  for: "pt", tr: "aramak" },
  { s: "Ich kenne",  for: "p",  tr: "tanımak" },
  { s: "Ich brauche", for: "t", tr: "ihtiyacı olmak" },
  { s: "Ich kaufe",  for: "t",  tr: "satın almak" },
  { s: "Wir sehen",  for: "pt", tr: "görmek" },
  { s: "Sie hat",    for: "pt", tr: "sahip olmak" }
];
