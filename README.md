# Kızılanka — yeni tasarım

Saf HTML + CSS + JavaScript. Kurulum gerekmez; klasörü olduğu gibi sunucuya yükleyin.

## Dosyalar
- `*.html` — 9 sayfa (index, hakkimizda, faaliyetler, etkinlikler, burs, seffaflik, bagis, iletisim, uye-ol)
- `css/style.css` — tüm sayfaların ortak stili (renkler en üstte `:root` içinde)
- `js/main.js` — üst menü, mobil alt menü, footer, animasyonlar, form davranışları
- `manifest.webmanifest` — telefonda "Ana ekrana ekle" ile uygulama gibi açılması için

## Sık yapılacak değişiklikler
- **Menü / footer:** yalnızca `js/main.js` içindeki `PAGES` listesini ve footer bölümünü düzenleyin, tüm sayfalara yansır.
- **Rakamlar, burs hedefi, burs tutarı:** `data/site.json` → `istatistik` ve `burs`. Bağış sayfasındaki yüzde ve "kalan burs" otomatik hesaplanır.
- **Etkinlik eklemek:** `data/site.json` → `etkinlikler` listesine bir blok ekleyin (`tarih` YYYY-AA-GG). Tarihi geçenler kendiliğinden "Geçmiş" sekmesine geçer.
- **Burs başvurularını kapatmak:** `burs.html` içindeki açıklamayı izleyin (`.notice` görünür, form gizli).
- **Tüzük dosyası:** `seffaflik.html` içindeki "İndir" bağlantısının `href`'ine dosya yolunu yazın.
- **Topluluk logoları:** `assets/partners/`. Logo ekleme kuralları için partner paketindeki `PARTNER-LOGO-SARTLARI.md`.

## Formlar
Formlar Netlify Forms'a gönderilir (Netlify paneli → Forms). Netlify'da **Form detection** açık olmalı.
Form adları: `uyelik`, `ogrenci-uyelik`, `burs-basvurusu`, `bagis-bildirimi`, `iletisim`.
Yerel sunucuda (localhost) gönderim çalışmaz; yalnızca Netlify'daki sitede çalışır.

## Kartla bağış
Henüz yok; `bagis.html` içinde "Yakında" olarak kapalı. iyzico entegrasyonu Netlify Functions ile yapılacak.

## Yayın
GitHub deposu Netlify'a bağlı; `main` dalına gönderilen her değişiklik otomatik yayınlanır. Ayarlar `netlify.toml` içinde.
CSS/JS değiştirdiğinizde HTML'deki `?v=` sürüm numarasını artırın (tarayıcı önbelleği için).

## Görseller
Logo, imza ve paylaşım görseli `assets/` içinde (`mark.png`, `imza.png`, `og.png`).
