# Kızılanka — yeni tasarım

Saf HTML + CSS + JavaScript. Kurulum gerekmez; klasörü olduğu gibi sunucuya yükleyin.

## Dosyalar
- `*.html` — 9 sayfa (index, hakkimizda, faaliyetler, etkinlikler, burs, seffaflik, bagis, iletisim, uye-ol)
- `css/style.css` — tüm sayfaların ortak stili (renkler en üstte `:root` içinde)
- `js/main.js` — üst menü, mobil alt menü, footer, animasyonlar, form davranışları
- `manifest.webmanifest` — telefonda "Ana ekrana ekle" ile uygulama gibi açılması için

## Sık yapılacak değişiklikler
- **Menü / footer:** yalnızca `js/main.js` içindeki `PAGES` listesini ve footer bölümünü düzenleyin, tüm sayfalara yansır.
- **Rakamlar (ana sayfa):** `index.html` içindeki `data-count` değerleri.
- **Bağış hedefi:** `bagis.html` içinde `data-count` (verilen burs) ve `data-fill` (yüzde).
- **Burs başvurularını kapatmak:** `burs.html` içindeki açıklamayı izleyin (`.notice` görünür, form gizli).
- **Etkinlik eklemek:** `etkinlikler.html` içinde bir `<article class="event">` bloğunu kopyalayın.
- **Tüzük dosyası:** `seffaflik.html` içindeki "İndir" bağlantısının `href`'ine dosya yolunu yazın.

## Formlar
Formlar şu an doğrulama yapıp onay mesajı gösteriyor, veri göndermiyor.
Mevcut sitenizin form gönderim adresini `js/main.js` içindeki "Formlar" bölümüne bağlayın.

## Görseller
Logo ve imza `https://kizilanka.com/assets/...` adresinden yükleniyor. Bilgisayarda internetsiz açarsanız görünmez; sitede sorunsuz çalışır.
