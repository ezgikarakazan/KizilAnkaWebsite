# Fonzip entegrasyonu

Kızılanka sitesi Netlify'da yayınlanıyor. Fonzip ise bağışçı ve üye takibi (CRM) için kullanılıyor.
Bu belge iki sistemin nasıl bağlandığını ve kurulumu anlatır.

## Ne nereye gidiyor?

| Sitedeki işlem | Kaydedildiği yer | Fonzip'te görünür mü? |
|---|---|---|
| Kartla bağış | Fonzip bağış sayfası (ödeme iyzico ile) | Evet, otomatik |
| Üyelik başvurusu (genel / öğrenci) | Netlify Forms | Evet, otomatik eklenir |
| Havale bildirimi | Netlify Forms | Hayır (Fonzip'e elle girilir) |
| Burs başvurusu, iletişim | Netlify Forms | Hayır |

```
Üye ol formu → Netlify Forms → submission-created fonksiyonu → Fonzip (kişi olarak)
Kartla bağış → Fonzip bağış sayfası → iyzico → Fonzip CRM
```

## Üyelik başvurularının aktarımı

Netlify, spam filtresinden geçen her form gönderiminden sonra `netlify/functions/submission-created.mjs`
fonksiyonunu kendiliğinden çalıştırır. Fonksiyon yalnızca `uyelik` ve `ogrenci-uyelik` formlarını işler.

**Fonzip'e aktarılan alanlar:** ad, soyad, TC kimlik no, e-posta, telefon, doğum tarihi, adres, başvuru tarihi.

**Aktarılmayan alanlar:** anne/baba adı, doğum yeri, okul, bölüm, meslek, sosyal medya.
Bunlar Netlify → Forms'ta kalır.

**Üye numarası verilmez.** Başvuru Fonzip'te incelenip onaylandığında numara verilir.

## Kurulum

1. **Fonzip Pro paket.** API yalnızca Pro pakette var.
2. **API anahtarı oluştur.** Fonzip → Ayarlar → Gelişmiş → Fonzip API. Bir `client_id` ve bir `client_secret` verilir.
3. **(İsteğe bağlı) Etiket oluştur.** Fonzip'te iki etiket aç:
   "Site – Üyelik başvurusu" ve "Site – Öğrenci başvurusu". Etiket numaralarını not al.
4. **Netlify'a gir.** Site configuration → Environment variables:

   | Değişken | Değer | Zorunlu |
   |---|---|---|
   | `FONZIP_CLIENT_ID` | Fonzip client_id | Evet |
   | `FONZIP_CLIENT_SECRET` | Fonzip client_secret | Evet |
   | `FONZIP_TAG_UYELIK` | Genel üyelik etiket numarası | Hayır |
   | `FONZIP_TAG_OGRENCI` | Öğrenci üyeliği etiket numarası | Hayır |

5. **Yeniden yayınla.** Netlify → Deploys → Trigger deploy.
6. **Test et.** Sitede üyelik formunu bir kez doldur. Kişinin Fonzip'te göründüğünü kontrol et.

> Anahtarları yalnızca Netlify'a gir. Koda, e-postaya ya da mesajlaşma uygulamalarına yazma.

## Kartla bağış

Fonzip'te bağış sayfası oluşturulup iyzico hesabı bağlandıktan sonra sayfanın adresini
`data/site.json` dosyasına yaz:

```json
"bagis": { "kartLinki": "https://..." }
```

Adres `https://` ile başlamalıdır. Link boşken sitede "Kart ile" seçeneği "Yakında" olarak kapalı durur;
link girilince kendiliğinden açılır ve bağışçıyı Fonzip sayfasına yönlendirir.

## Sorun giderme

| Belirti | Ne yapmalı |
|---|---|
| Başvuru Fonzip'te yok | Netlify → Logs → Functions → `submission-created` kayıtlarına bak. Başvuru Netlify → Forms'ta her durumda durur. |
| "Fonzip anahtarları tanımlı değil" logu | 4. adımdaki değişkenler eksik. Ekledikten sonra yeniden yayınla. |
| "Fonzip token alınamadı (HTTP 401)" | client_id / client_secret yanlış. Fonzip'ten yeniden kopyala. |
| "HTTP 402" | Fonzip paketi API'yi içermiyor (Pro gerekli). |
| "Kart ile" seçeneği açılmıyor | `kartLinki` boş ya da `https://` ile başlamıyor. |

Gönderim sırasında hata olursa başvuru kaybolmaz, Netlify Forms'ta durur; gerekirse Fonzip'e elle eklenir.

## KVKK

Üyelik başvurularındaki kişisel veriler (TC kimlik no dahil) hem Netlify'da hem Fonzip'te tutulur.
Kartla bağışta kart bilgileri bu siteye ve Netlify'a hiç uğramaz; Fonzip / iyzico tarafında alınır.
Aydınlatma metninde bu iki hizmet sağlayıcısının yer alması gerekir.
