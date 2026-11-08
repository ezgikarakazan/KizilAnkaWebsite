/* =========================================================
   Netlify Forms → Fonzip
   Netlify her onaylı (spam olmayan) form gönderiminden sonra bu
   fonksiyonu kendiliğinden çalıştırır. Üyelik başvuruları Fonzip'e
   kişi olarak eklenir; diğer formlar yalnızca Netlify'da kalır.

   Netlify ortam değişkenleri (Site configuration → Environment variables):
     FONZIP_CLIENT_ID, FONZIP_CLIENT_SECRET  Fonzip → Ayarlar → Gelişmiş → Fonzip API
     FONZIP_TAG_UYELIK, FONZIP_TAG_OGRENCI   (isteğe bağlı) Fonzip etiket numaraları
   Anahtarlar tanımlı değilse fonksiyon hiçbir şey yapmaz.
   ========================================================= */
import { connectLambda, getStore } from '@netlify/blobs';

const API = 'https://fonzip.com/api/v2';
const UYELIK_FORMLARI = { uyelik: 'FONZIP_TAG_UYELIK', 'ogrenci-uyelik': 'FONZIP_TAG_OGRENCI' };

/* Fonzip geçerli bir token varken yenisini vermiyor (HTTP 409), bu yüzden
   token fonksiyon çağrıları arasında Netlify Blobs'ta saklanır. */
const getToken = async () => {
  const store = getStore('fonzip');
  const cached = await store.get('token', { type: 'json' });
  if (cached && Date.now() < cached.expiresAt - 60_000) return cached.token;

  const r = await fetch(`${API}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.FONZIP_CLIENT_ID,
      client_secret: process.env.FONZIP_CLIENT_SECRET
    })
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok || !body.access_token) throw new Error(`Fonzip token alınamadı (HTTP ${r.status}): ${body.error_description || ''}`);
  await store.setJSON('token', { token: body.access_token, expiresAt: Date.now() + (body.expires_in || 3600) * 1000 });
  return body.access_token;
};

const splitName = full => {
  const parts = String(full || '').trim().split(/\s+/);
  return parts.length > 1 ? { first_name: parts.slice(0, -1).join(' '), last_name: parts.at(-1) } : { first_name: parts[0] || '' };
};

const clean = obj => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ''));

export const handler = async event => {
  const { payload } = JSON.parse(event.body || '{}');
  const form = payload?.form_name;
  if (!(form in UYELIK_FORMLARI)) return { statusCode: 200 };
  if (!process.env.FONZIP_CLIENT_ID || !process.env.FONZIP_CLIENT_SECRET) {
    console.log('Fonzip anahtarları tanımlı değil; başvuru yalnızca Netlify Forms\'ta.');
    return { statusCode: 200 };
  }

  connectLambda(event);
  const d = payload.data || {};
  const tag = Number(process.env[UYELIK_FORMLARI[form]]);
  const user = clean({
    ...splitName(d.ad_soyad),
    tckno: d.tc_kimlik,
    email: d.eposta,
    phone: d.telefon,
    birthday: d.dogum_tarihi,
    address: d.adres,
    country_text: 'Türkiye',
    apply_date: new Date(payload.created_at || Date.now()).toISOString(),
    // Başvuru onaylanana kadar üye numarası verilmez
    membership_no_decision: 'no',
    tags: tag ? [tag] : undefined
  });

  try {
    const token = await getToken();
    const r = await fetch(`${API}/user`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`Fonzip kişi eklenemedi (HTTP ${r.status}): ${JSON.stringify(body)}`);
    console.log(`Fonzip'e eklendi: ${form} → user_id ${body.user_id}`);
  } catch (err) {
    // Başvuru Netlify Forms'ta zaten kayıtlı; burada hata yalnızca loglanır.
    console.error(err.message);
  }
  return { statusCode: 200 };
};
