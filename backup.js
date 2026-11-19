"use strict";
// v0.8 💾 İlerleme yedeği: bir cihazdan dosya olarak indir, diğer cihazda yükle (telefon ↔ bilgisayar).
(function () {
  function backupScreen(msg) {
    stopAudio(); run = null;
    $app.innerHTML = `${msg || ""}<div class="card"><h2>💾 İlerleme yedeği</h2>
      <p>Her cihaz ilerlemeyi kendi içinde tutar; telefon ve bilgisayar birbirini otomatik görmez. İlerlemeni taşımak için:</p>
      <ol><li>Eski cihazda <b>Yedeği indir</b>'e bas; bir dosya iner.</li>
      <li>Dosyayı yeni cihaza gönder (kendine e-posta, WhatsApp, Drive…).</li>
      <li>Yeni cihazda <b>Yedekten yükle</b> ile o dosyayı seç.</li></ol>
      <div class="row"><button class="primary" data-a="bkdown">⬇ Yedeği indir</button></div>
      <div class="typebox"><label>Yedekten yükle (bu cihazdaki ilerlemenin yerine geçer)<input type="file" id="bkfile" accept=".json,application/json"></label></div>
      <p class="muted">Yedekte puan, seri, kelimeler, ünite ilerlemesi, tekrar listesi, okunan dersler ve kendi şarkılarının sözleri var. Kendi şarkılarının <b>ses dosyaları</b> yedeğe girmez; yeni cihazda şarkıyı açıp ses dosyasını yeniden seçmen yeterli.</p></div>
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
  actions.bkdown = download;
})();
