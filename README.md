# Kızılanka — yeni tasarım

Saf HTML + CSS + JavaScript. Kurulum gerekmez; klasörü olduğu gibi sunucuya yükleyin.

## Dosyalar
- `*.html` — 9 sayfa (index, hakkimizda, faaliyetler, etkinlikler, burs, seffaflik, bagis, iletisim, uye-ol)
- `css/style.css` — tüm sayfaların ortak stili (renkler en üstte `:root` içinde)
- `js/main.js` — üst menü, mobil alt menü, footer, animasyonlar, form davranışları
- `manifest.webmanifest` — telefonda "Ana ekrana ekle" ile uygulama gibi açılması için

## Sayfa yapısı (tek sayfa)
`index.html` tüm bölümleri alt alta gösterir (`#anasayfa`, `#hakkimizda`, `#faaliyetler`, `#etkinlikler`, `#burs`, `#seffaflik`, `#bagis`, `#iletisim`).
Masaüstünde solda sabit bir yan menü vardır (mobilde ☰ ile açılan çekmece). Menü bu bölümlere kaydırır; aşağı indikçe aktif bölüm yan menüde ve üst bardaki sayfa yolunda (`Ana Sayfa / Etkinlikler`) güncellenir.
Açık ve koyu tema vardır: site cihazın tercihini izler, üst bardaki ☀/☾ düğmesiyle değiştirilebilir (seçim tarayıcıda hatırlanır). Renkler `css/style.css` başındadır: koyu değerler `:root` bloğunda, açık değerler `:root[data-theme="light"]` ve `prefers-color-scheme: light` bloklarında (ikisi aynı tutulmalı). Vurgu kutuları, amblem kutusu ve partner şeridi iki temada da koyudur.
Her bölümün altındaki **Daha fazla göster** butonu o bölümün detay sayfasına gider (ör. `etkinlikler.html`); detay sayfalarında sayfa yolu sabit görünür.
Bölüm sırası `js/main.js` içindeki `PAGES` listesiyle aynı olmalı. Ana sayfada en yakın 2 etkinlik gösterilir (`data-limit="2"`).

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

## Fonzip'e otomatik aktarım
Üyelik başvuruları (`uyelik`, `ogrenci-uyelik`) Netlify'a düştükten sonra `netlify/functions/submission-created.mjs`
tarafından Fonzip'e kişi olarak eklenir (ad, soyad, TC, e-posta, telefon, doğum tarihi, adres, başvuru tarihi).
Üye numarası verilmez; onay Fonzip'te yapılır. Diğer alanlar (anne/baba adı, okul, meslek, sosyal medya) Netlify Forms'ta kalır.
Gerekli Netlify ortam değişkenleri: `FONZIP_CLIENT_ID`, `FONZIP_CLIENT_SECRET`; isteğe bağlı `FONZIP_TAG_UYELIK`, `FONZIP_TAG_OGRENCI`.
Hatalar Netlify → Logs → Functions → `submission-created` altında görünür.

## Kartla bağış
Fonzip + iyzico. `data/site.json` → `bagis.kartLinki` alanına Fonzip bağış sayfası adresi yazılınca "Kart ile" seçeneği açılır.

## Yayın
GitHub deposu Netlify'a bağlı; `main` dalına gönderilen her değişiklik otomatik yayınlanır. Ayarlar `netlify.toml` içinde.
CSS/JS değiştirdiğinizde HTML'deki `?v=` sürüm numarasını artırın (tarayıcı önbelleği için).

## Görseller
Logo, imza ve paylaşım görseli `assets/` içinde (`mark.png`, `imza.png`, `og.png`).
