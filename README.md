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

## Yönetim paneli (kizilanka.com/admin)
Sitedeki değişken bilgilerin hepsi panelden düzenlenir; kod bilmeye gerek yoktur. Panel [Decap CMS](https://decapcms.org) ile çalışır,
ayarları `admin/config.yml` içindedir. Panelde **Yayınla**'ya basınca değişiklik GitHub'a commit olarak gider, Netlify siteyi yaklaşık 1 dakikada yeniden yayınlar.

Panelde dört bölüm var; her biri bir veri dosyasıdır:

| Panel bölümü | Dosya | İçerik |
|---|---|---|
| Etkinlikler | `data/etkinlikler.json` | başlık, tarih, saat, yer, açıklama, kapak fotoğrafı, galeri fotoğrafları |
| Projeler | `data/projeler.json` | başlık, açıklama, durum (planlanıyor / devam ediyor / tamamlandı) |
| Sayılar, burs ve iletişim | `data/site.json` | sayılar şeridi, burs (açık/kapalı, dönem, hedef, tutar), katkı payı, duyuru şeridi, iletişim, banka hesapları, kartla bağış linki |
| Şeffaflık | `data/seffaflik.json` | Yönetim Kurulu şeması, belgeler (PDF yükleme), gelir-gider tablosu |

- Tarihi geçen etkinlik kendiliğinden "Geçmiş" bölümüne taşınır; fotoğrafları kartına tıklayınca galeride açılır.
- Yüklenen fotoğraflar `assets/etkinlikler/`, belgeler `assets/belgeler/` klasörüne kaydedilir.
- Burs başvuruları kapatılınca Burs sayfasındaki form gizlenir, "Başvurular şu an kapalı" notu görünür.
- Bağış sayfasındaki yüzde ve "kalan burs" otomatik hesaplanır.

### Bir kerelik kurulum
1. **GitHub OAuth uygulaması:** GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
   - Application name: `Kızılanka Panel`
   - Homepage URL: `https://kizilanka.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Oluşunca **Client ID**'yi kopyalayın, **Generate a new client secret** ile gizli anahtarı alın.
2. **Netlify:** Site → Site configuration → Access & security → **OAuth** → Authentication providers → **Install provider** → GitHub;
   Client ID ve Client secret'ı yapıştırıp kaydedin.
3. **Panel kullanıcıları:** Paneli kullanacak kişinin bir GitHub hesabı olmalı. Depo → Settings → Collaborators → **Add people**
   ile ekleyin (yazma yetkisi gerekir). Kişi daveti kabul ettikten sonra kizilanka.com/admin adresinden **GitHub ile Giriş** yapar.

### Bilgisayarda denemek
`python -m http.server 8000` ile siteyi açın, ayrı bir terminalde `npx decap-server` çalıştırın ve http://localhost:8000/admin adresine gidin.
Bu modda kayıtlar doğrudan bilgisayardaki dosyalara yazılır (GitHub'a gitmez).

## Kodla yapılan değişiklikler
- **Menü / footer:** yalnızca `js/main.js` içindeki `PAGES` listesini ve footer bölümünü düzenleyin, tüm sayfalara yansır.
- **Topluluk logoları:** `assets/partners/`. Logo ekleme kuralları için partner paketindeki `PARTNER-LOGO-SARTLARI.md`.
- **Yeni bir veri alanı:** önce `data/*.json` dosyasına ekleyin, sonra `admin/config.yml`'de aynı adla bir alan tanımlayın; sayfada `data-bind="dosyadaki.yol"` ile gösterin.

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
Fonzip + iyzico. Panelde **Sayılar, burs ve iletişim → Kartla bağış** alanına Fonzip bağış sayfası adresi yazılınca "Kart ile" seçeneği açılır.

## Yayın
GitHub deposu Netlify'a bağlı; `main` dalına gönderilen her değişiklik otomatik yayınlanır. Ayarlar `netlify.toml` içinde.
CSS/JS değiştirdiğinizde HTML'deki `?v=` sürüm numarasını artırın (tarayıcı önbelleği için).

## Görseller
Logo, imza ve paylaşım görseli `assets/` içinde (`mark.png`, `imza.png`, `og.png`).
