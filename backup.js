"use strict";
// v0.8 💾 İlerleme yedeği: bir cihazdan dosya olarak indir, diğer cihazda yükle (telefon ↔ bilgisayar).
(function () {
  function backupScreen(msg) {
    stopAudio(); run = null;
    const store = PERSIST === true ? "✓ <b>Kalıcı depolama açık:</b> tarayıcı yer açmak için ilerlemeni silmez."
      : PERSIST === false ? "⚠ <b>Tarayıcı kalıcı depolamaya izin vermedi.</b> Yer azalırsa ilerleme silinebilir; düzenli yedek al."
      : "Bu tarayıcı kalıcı depolama durumunu bildirmiyor; düzenli yedek al.";
    const ios = IOS && !STANDALONE ? `<p class="muted">📱 iPhone'da uygulamayı Safari'den <b>Paylaş ⬆ → Ana Ekrana Ekle</b> ile ekleyip oradan aç: Safari'de 7 gün açılmayan sitelerin verisi silinebilir, ana ekrandaki uygulamanınki silinmez.</p>` : "";
    $app.innerHTML = `${msg || ""}<div class="card"><h2>💾 İlerleme yedeği</h2>
      <p class="muted">${store}<br>Son yedek: ${S.lastBackup ? `${S.lastBackup.slice(0, 10)} (${daysAgo(S.lastBackup)} gün önce)` : "henüz yok"}.</p>${ios}
      <p>Her cihaz ilerlemeyi kendi içinde tutar; telefon ve bilgisayar birbirini otomatik görmez. İlerlemeni taşımak için:</p>
      <ol><li>Eski cihazda <b>Yedeği indir</b>'e bas; bir dosya iner.</li>
      <li>Dosyayı yeni cihaza gönder (kendine e-posta, WhatsApp, Drive…).</li>
      <li>Yeni cihazda <b>Yedekten yükle</b> ile o dosyayı seç.</li></ol>
      <div class="row"><button class="primary" data-a="bkdown">⬇ Yedeği indir</button></div>
      <div class="typebox"><label>Yedekten yükle (bu cihazdaki ilerlemenin yerine geçer)<input type="file" id="bkfile" accept=".json,application/json"></label></div>
      <p class="muted">Yedekte puan, seri, kelimeler, ünite ilerlemesi, tekrar listesi, okunan dersler ve kendi şarkılarının sözleri var. Kendi şarkılarının <b>ses dosyaları</b> yedeğe girmez; yeni cihazda şarkıyı açıp ses dosyasını yeniden seçmen yeterli.</p></div>
      <div class="card"><h2>🗑 İlerlemeyi sıfırla</h2>
      <p>Bu cihazdaki puan, seri, kelimeler, ünite ilerlemesi ve tekrar listesi silinir; uygulama baştan başlar. Adın, ses ayarın ve kendi şarkıların kalır. Başka cihazlar ve başka kullanıcılar etkilenmez.</p>
      <p class="muted">Emin değilsen önce yukarıdan yedek indir; istersen sonra geri yüklersin.</p>
      <button class="ghost" data-a="bkreset">Bu cihazda sıfırla</button></div>
      <button class="ghost" data-a="home">← Geri</button>`;
    document.getElementById("bkfile").addEventListener("change", e => { const f = e.target.files[0]; if (f) load(f); });
  }
  function download() {
    const blob = new Blob([JSON.stringify({ app: "deutschapp", saved: new Date().toISOString(), data: S })], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `deutschapp-yedek-${dayStr()}.json`;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function load(f) {
    const r = new FileReader();
    r.onload = () => {
      let o; try { o = JSON.parse(r.result); } catch (e) { o = null; }
      const d = o && o.app === "deutschapp" && o.data;
      if (!d || typeof d !== "object" || !d.prog || !d.words) return backupScreen(`<div class="bubble">Bu dosya Deutsch-App yedeği değil ya da bozuk. Hiçbir şey değişmedi.</div>`);
      if (!confirm(`${(o.saved || "").slice(0, 10)} tarihli yedek yüklensin mi? Bu cihazdaki ilerlemenin yerine geçer.`)) return;
      try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { return backupScreen(`<div class="bubble">Kaydedilemedi: ${h(String(e))}</div>`); }
      location.reload();
    };
    r.readAsText(f);
  }
  actions.backup = () => backupScreen();
  actions.bkdown = () => {
    S.lastBackup = new Date().toISOString(); S.backupSnooze = null; // hatırlatma 7 gün susar
    download(); save();
    if ($app.querySelector('[data-screen="home"]')) home("Yedek indirildi. Dosyayı güvenli bir yere gönder (e-posta, Drive…).");
    else backupScreen(`<div class="good">Yedek indirildi. Dosyayı güvenli bir yere gönder (e-posta, Drive…).</div>`);
  };
  actions.bksnooze = () => { S.backupSnooze = new Date(Date.now() + 7 * 86400000).toISOString(); save(); home(); };
  actions.iostip = () => { S.iosTipOff = true; save(); home(); };
  actions.bkreset = () => {
    if (!confirm("Bu cihazdaki tüm ilerleme silinsin mi?")) return;
    if (!confirm("Son onay: geri alınamaz (yedeğin yoksa). Sıfırlansın mı?")) return;
    const keep = { name: S.name, voiceName: S.voiceName, mySongs: S.mySongs };
    try { localStorage.setItem(KEY, JSON.stringify(Object.assign({ ver: S.ver }, keep))); } catch (e) {}
    location.reload();
  };
})();
