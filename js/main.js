/* =========================================================
   Kızılanka — ortak script
   Menü, mobil alt sekme çubuğu ve footer her sayfaya buradan
   eklenir; menüde değişiklik yapmak için yalnızca bu dosyayı
   düzenlemeniz yeterli.
   ========================================================= */
(() => {
  const page = document.body.dataset.page || 'index';
  const root = document.documentElement;
  root.classList.add('preload');
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('preload')));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LOGO = 'assets/mark.png';

  /* [kimlik, sayfa, sayfa adı (sayfa yolu, alt bilgi), üst menü adı (yoksa üst menüde yer almaz)]
     Üst menü sade tutulur; Ana Sayfa'ya logo, Bağış'a sağdaki düğme götürür. */
  const PAGES = [
    ['index', 'index.html', 'Ana Sayfa'],
    ['hakkimizda', 'hakkimizda.html', 'Hakkımızda', 'Biz Kimiz?'],
    ['etkinlikler', 'etkinlikler.html', 'Etkinlikler', 'Etkinlikler'],
    ['faaliyetler', 'faaliyetler.html', 'Faaliyetler', 'Faaliyetler'],
    ['burs', 'burs.html', 'Burs', 'Burs'],
    ['seffaflik', 'seffaflik.html', 'Şeffaflık', 'Şeffaflık'],
    ['bagis', 'bagis.html', 'Bağış'],
    ['iletisim', 'iletisim.html', 'İletişim', 'İletişim']
  ];
  const cur = id => (id === page ? ' aria-current="page"' : '');

  /* Tek sayfa yapısı: ana sayfada menü bölümlere kaydırır,
     alt sayfalarda ana sayfanın ilgili bölümüne götürür. */
  const isHome = page === 'index';
  const SEC = id => (id === 'index' ? 'anasayfa' : id);
  const navHref = id => (isHome ? `#${SEC(id)}` : id === 'index' ? 'index.html' : `index.html#${id}`);
  const navLink = (id, extra = '') => `href="${navHref(id)}" data-nav="${id}"${cur(id)}${extra}`;
  const subTitle = isHome ? null : (PAGES.find(([id]) => id === page)?.[2] || { 'uye-ol': 'Üye Ol' }[page] || document.title.split('·')[0].trim());

  /* ---------- Sayfa yolu (Ana Sayfa / …) ---------- */
  const crumbHTML = `
    <div class="crumbbar">
      <nav class="crumbs" aria-label="Sayfa yolu">
        <ol>
          <li class="home"><a href="${isHome ? '#anasayfa' : 'index.html'}">Ana Sayfa</a></li>
          ${isHome ? '<li id="crumbCur" hidden></li>' : `<li><span aria-current="page">${subTitle}</span></li>`}
        </ol>
      </nav>
      ${isHome ? '' : `<a class="crumb-back" href="index.html${PAGES.some(([id]) => id === page) ? "#" + page : ""}">← Ana sayfaya dön</a>`}
    </div>`;

  /* ---------- Duyuru şeridi ---------- */
  let annClosed = false;
  try { annClosed = sessionStorage.getItem('ann') === '0'; } catch (e) {}
  const annHTML = annClosed ? '' : `
    <div class="announce" id="announce" role="region" aria-label="Duyuru">
      <div class="wrap"><strong>Burs başvurularımız açık.</strong><a href="burs.html">Bursa başvur →</a></div>
      <button type="button" aria-label="Duyuruyu kapat" id="closeAnnounce">×</button>
    </div>`;

  /* ---------- Üst menü (masaüstü) + çekmece menü (mobil) ---------- */
  const ARROW = '<span class="arrow" aria-hidden="true">→</span>';
  const headerHTML = `
    <a class="skip" href="#main">İçeriğe geç</a>
    <div class="progress" id="progress"></div>
    <aside class="sidebar" id="drawer" aria-label="Mobil menü">
      <a class="brand" href="${navHref('index')}"><img src="${LOGO}" alt="" width="40" height="40"><span class="wm" role="img" aria-label="Kızılanka"></span></a>
      <nav class="side-nav">
        <ul class="menu">${PAGES.map(([id, , t]) => `<li><a ${navLink(id)}>${t}</a></li>`).join('')}</ul>
      </nav>
      <div class="side-bottom">
        <a class="side-card" href="burs.html"><span><strong>Burs başvurularımız açık.</strong>Bursa başvur →</span></a>
        <a class="btn btn-red btn-block" href="uye-ol.html"${cur('uye-ol')}>Aramıza katıl</a>
        <div class="side-social">
          <a href="https://www.instagram.com/kizilankader" target="_blank" rel="noopener">Instagram</a>
          <a href="https://x.com/kizilankader" target="_blank" rel="noopener">X</a>
          <a href="mailto:info@kizilanka.com">info@kizilanka.com</a>
        </div>
      </div>
    </aside>
    <div class="scrim" id="scrim"></div>
    ${annHTML}
    <header class="topbar" id="header">
      <div class="wrap topbar-in">
        <a class="brand" href="${navHref('index')}"><img src="${LOGO}" alt="" width="38" height="38"><span class="wm" role="img" aria-label="Kızılanka"></span></a>
        <nav class="topnav" aria-label="Ana menü">
          <ul class="menu">${PAGES.filter(p => p[3]).map(([id, , , n]) => `<li><a ${navLink(id)}>${n}</a></li>`).join('')}</ul>
          <span class="menu-ind" aria-hidden="true"></span>
        </nav>
        <button class="burger" id="burger" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="drawer"><svg class="i-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <button class="theme-toggle" id="themeToggle" type="button">
          <svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>
        </button>
        <a class="btn btn-red top-cta" href="${navHref('bagis')}">Bağış yap ${ARROW}</a>
      </div>
      ${isHome ? '' : `<div class="subbar"><div class="wrap">${crumbHTML}</div></div>`}
    </header>`;
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  /* ---------- Mobil alt sekme çubuğu ---------- */
  const ic = {
    home: '<path class="f" d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    grid: '<rect class="f" x="3" y="3" width="7" height="7" rx="1.5"/><rect class="f" x="14" y="3" width="7" height="7" rx="1.5"/><rect class="f" x="3" y="14" width="7" height="7" rx="1.5"/><rect class="f" x="14" y="14" width="7" height="7" rx="1.5"/>',
    heart: '<path d="M12 20.5s-7.6-4.5-9.4-9.4C1.4 7.7 3.6 4.5 7 4.5c2.2 0 3.7 1.3 5 3 1.3-1.7 2.8-3 5-3 3.4 0 5.6 3.2 4.4 6.6-1.8 4.9-9.4 9.4-9.4 9.4z"/>',
    cap: '<path class="f" d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>'
  };
  const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  document.body.insertAdjacentHTML('beforeend', `
    <nav class="tabbar" aria-label="Hızlı menü">
      <a ${navLink('index')}>${svg(ic.home)}Ana Sayfa</a>
      <a ${navLink('faaliyetler')}>${svg(ic.grid)}Faaliyetler</a>
      <a class="main-btn" ${navLink('bagis')}><span class="c">${svg(ic.heart)}</span>Bağış</a>
      <a ${navLink('burs')}>${svg(ic.cap)}Burs</a>
      <button type="button" id="tabMenu">${svg(ic.menu)}Menü</button>
    </nav>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`);

  /* ---------- Footer ---------- */
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="wrap">
      <div class="foot">
        <div>
          <a class="brand" href="index.html"><img src="${LOGO}" alt="" width="34" height="34"><span class="wm" role="img" aria-label="Kızılanka"></span></a>
          <p class="motto">Bütün Ümidim Gençliktedir</p>
        </div>
        <div>
          <h4>Sayfalar</h4>
          <ul>${PAGES.map(([, h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}<li><a href="uye-ol.html">Aramıza Katıl</a></li></ul>
        </div>
        <div>
          <h4>İletişim</h4>
          <ul>
            <li><a href="mailto:info@kizilanka.com">info@kizilanka.com</a></li>
            <li><a href="tel:+905062550002">+90 506 255 00 02</a></li>
            <li><a href="https://www.instagram.com/kizilankader" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://x.com/kizilankader" target="_blank" rel="noopener">X</a></li>
          </ul>
        </div>
        <div>
          <h4>Bülten</h4>
          <p>Etkinlik ve burs duyurularını e-postayla gönderelim. Yalnızca önemli duyurular gelir; istediğin an ayrılabilirsin.</p>
          <form class="js-form" data-ok="Bültene kaydın alındı.">
            <div class="news">
              <input type="email" name="eposta" placeholder="E-posta adresin" aria-label="E-posta adresin" required>
              <button class="btn btn-red" type="submit">Duyuruları al</button>
            </div>
            <label class="check"><input type="checkbox" name="bulten_onayi" required><span>Duyuru e-postaları almayı kabul ediyorum. <a href="kvkk.html">KVKK Aydınlatma Metni</a></span></label>
          </form>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© <span id="yr"></span> Kızılanka Eğitim Derneği</span>
        <span><a href="kvkk.html">KVKK Aydınlatma Metni</a> · <a href="gizlilik.html">Gizlilik ve Çerezler</a></span>
      </div>
    </div>`;
  document.body.appendChild(footer);
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* ---------- Açık / koyu tema ----------
     Seçim yapılmadıysa cihazın tercihi izlenir. Düğmeyle yapılan seçim
     bu tarayıcıda hatırlanır (HTML <head> içindeki küçük betik, sayfa
     açılırken yanıp sönmemesi için seçimi ilk karede uygular). */
  const sysLight = matchMedia('(prefers-color-scheme: light)');
  const themeBtn = document.getElementById('themeToggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const themeNow = () => root.dataset.theme || (sysLight.matches ? 'light' : 'dark');
  const syncTheme = () => {
    const t = themeNow();
    root.dataset.themeNow = t;
    const next = t === 'light' ? 'koyu' : 'açık';
    themeBtn.setAttribute('aria-label', `${next[0].toUpperCase() + next.slice(1)} temaya geç`);
    themeBtn.title = themeBtn.getAttribute('aria-label');
    if (metaTheme) metaTheme.content = t === 'light' ? '#f5f3ef' : '#0a0a0b';
  };
  // Tema değişirken tüm geçişleri bir kareliğine kapat: renkler akmasın, tek seferde değişsin
  const withoutTransitions = (fn, after) => {
    const st = document.createElement('style');
    st.textContent = '*,*::before,*::after{transition:none !important}';
    document.head.append(st);
    fn();
    void document.body.offsetHeight;
    requestAnimationFrame(() => requestAnimationFrame(() => { st.remove(); if (after) requestAnimationFrame(after); }));
  };
  themeBtn.addEventListener('click', () => {
    const t = themeNow() === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('kz-theme', t); } catch (e) {}
    // Sayfa renkleri tek seferde değişir; düğmedeki ikon ise bastırma kalkınca animasyonla döner
    withoutTransitions(() => { root.dataset.theme = t; }, syncTheme);
  });
  sysLight.addEventListener('change', () => { if (!root.dataset.theme) withoutTransitions(() => {}, syncTheme); });
  syncTheme();

  /* ---------- Duyuru kapat ---------- */
  const close = document.getElementById('closeAnnounce');
  if (close) close.onclick = () => {
    document.getElementById('announce').classList.add('hide');
    try { sessionStorage.setItem('ann', '0'); } catch (e) {}
  };

  /* ---------- Mobil menü ---------- */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const tabMenu = document.getElementById('tabMenu');
  const setMenu = open => {
    drawer.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    tabMenu.classList.toggle('on', open);
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.onclick = () => setMenu(!drawer.classList.contains('open'));
  tabMenu.onclick = () => setMenu(!drawer.classList.contains('open'));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  document.getElementById('scrim').onclick = () => setMenu(false);
  addEventListener('resize', () => { if (innerWidth >= 1100 && drawer.classList.contains('open')) setMenu(false); });

  /* ---------- Scroll: header + ilerleme ---------- */
  const header = document.getElementById('header');
  const prog = document.getElementById('progress');
  const onScroll = () => {
    header.classList.toggle('scrolled', scrollY > 30);
    const h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menü göstergesi + bölüm takibi (scroll-spy) ---------- */
  const ind = document.querySelector('.menu-ind');
  const placeInd = a => {
    if (!a || !a.offsetWidth) { ind.classList.remove('on'); return; }
    ind.style.width = a.offsetWidth + 'px';
    ind.style.transform = `translateX(${a.getBoundingClientRect().left - ind.parentElement.getBoundingClientRect().left - ind.parentElement.clientLeft}px)`;
    ind.classList.add('on');
  };
  const moveInd = () => { if (ind) placeInd(ind.parentElement.querySelector('a[aria-current]')); };
  // Sayfa kaydırılınca üst çubuk hafif gölge alır
  const hdr = document.getElementById('header');
  const onScrollHdr = () => hdr && hdr.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScrollHdr, { passive: true });
  onScrollHdr();
  addEventListener('resize', moveInd);
  if (document.fonts) document.fonts.ready.then(moveInd);
  requestAnimationFrame(moveInd);

  if (isHome) {
    const secs = PAGES.map(([id, , t]) => ({ id, t, el: document.getElementById(SEC(id)) })).filter(s => s.el)
      .sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    const crumbCur = document.getElementById('crumbCur');
    let active = null;
    const setActive = s => {
      if (active === s) return;
      const first = active === null;
      active = s;
      document.querySelectorAll('[data-nav]').forEach(a => {
        if (a.dataset.nav === s.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
      moveInd();
      if (crumbCur) {
        crumbCur.hidden = s.id === 'index';
        crumbCur.innerHTML = `<span aria-current="location">${s.t}</span>`;
      }
      // Adres çubuğu bölümle birlikte güncellenir; bağlantı paylaşılınca aynı bölüm açılır
      if (!first) try { history.replaceState(null, '', s.id === 'index' ? location.pathname + location.search : '#' + SEC(s.id)); } catch (e) {}
    };
    let ticking = false;
    const spy = () => {
      ticking = false;
      const line = header.getBoundingClientRect().bottom + innerHeight * 0.2;
      let now = secs[0];
      secs.forEach(s => { if (s.el.getBoundingClientRect().top <= line) now = s; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) now = secs[secs.length - 1];
      setActive(now);
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
    addEventListener('resize', spy);
    spy();
  }

  /* ---------- Toast ---------- */
  const toastEl = document.getElementById('toast');
  let tt;
  const toast = msg => {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(tt);
    tt = setTimeout(() => toastEl.classList.remove('show'), 3200);
  };
  window.kzToast = toast;

  /* ---------- Belirme + sayaç + hedef çubuğu ---------- */
  const countUp = el => {
    const end = +el.dataset.count;
    el.textContent = end.toLocaleString('tr-TR');
    return;
    const t0 = performance.now(), dur = 1600;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('tr-TR');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const show = el => {
    el.classList.add('in');
    el.querySelectorAll('[data-count]').forEach(countUp);
    el.querySelectorAll('[data-fill]').forEach(b => (b.style.width = b.dataset.fill + '%'));
  };
  const startReveal = () => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(en => {
        if (!en.isIntersecting) return;
        show(en.target);
        io.unobserve(en.target);
      }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach(show);
    }
  };

  /* ---------- Site verisi (data/site.json) ----------
     Sayılar, burs hedefi ve etkinlikler bu dosyadan gelir.
     Dosya okunamazsa HTML'deki değerler olduğu gibi kalır. */
  const AYLAR = ['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA'];
  const pick = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };

  const daysLeft = (y, m, d) => {
    const n = new Date(), k = Math.round((new Date(y, m - 1, d) - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / 864e5);
    return k <= 0 ? 'Bugün' : k === 1 ? 'Yarın' : `${k} gün kaldı`;
  };

  const eventCard = (ev, past, i) => {
    const [y, m, d] = ev.tarih.split('-').map(Number);
    const card = el('article', 'event reveal');
    if (i % 2) card.dataset.d = '1';
    const date = el('div', 'date');
    date.append(el('b', null, d), el('small', null, `${AYLAR[m - 1]} ${y}`));
    const body = el('div');
    // Yaklaşan etkinlikte kaç gün kaldığı yazılır (Bugün / Yarın / 12 gün kaldı)
    const label = past ? 'Geçmiş' : daysLeft(y, m, d);
    body.append(el('span', past ? 'tag' : 'tag live', label), el('h3', null, ev.baslik));
    if (ev.aciklama) body.append(el('p', null, ev.aciklama));
    const meta = el('div', 'meta');
    if (ev.saat) meta.append(el('span', null, 'Saat ' + ev.saat));
    if (ev.yer) meta.append(el('span', null, ev.yer));
    body.append(meta);
    card.append(date, body);
    return card;
  };

  /* ---------- Etkinlik biletleri: yan yana iki bilet, canlı geri sayım + takvime ekle ----------
     İlk bilet şablon olarak kullanılır; data/site.json'daki en yakın etkinliklerle çoğaltılır. */
  const AY_UZUN = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const GUNLER = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const ticketsBox = document.querySelector('[data-ev-tickets]');
  const evTime = c => {
    const d = c.dataset, [y, m, dd] = d.tarih.split('-').map(Number), [hh, mi] = (d.saat || '00:00').split(':').map(Number);
    return new Date(y, m - 1, dd, hh || 0, mi || 0);
  };
  const fillTicket = c => {
    const d = c.dataset, [y, m, dd] = d.tarih.split('-').map(Number);
    const f = k => c.querySelector(`[data-f="${k}"]`);
    f('day').textContent = dd;
    f('mon').textContent = AY_UZUN[m - 1];
    f('wd').textContent = GUNLER[new Date(y, m - 1, dd).getDay()];
    f('tag').textContent = daysLeft(y, m, dd);
    f('title').textContent = d.baslik;
    f('desc').textContent = d.aciklama || '';
    f('desc').hidden = !d.aciklama;
    f('saat').textContent = d.saat ? 'Saat ' + d.saat : 'Saati duyurulacak';
    f('yer').textContent = d.yer || 'Yer duyurulacak';
  };
  const tickTicket = c => {
    const ms = Math.max(evTime(c) - Date.now(), 0);
    const v = { d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 };
    for (const k in v) {
      const b = c.querySelector(`[data-cd="${k}"]`), t = String(v[k]).padStart(2, '0');
      if (!b || b.textContent === t) continue;
      b.textContent = t;
      if (!reduce) { b.classList.remove('tick'); void b.offsetWidth; b.classList.add('tick'); }
    }
  };
  const tickAll = () => ticketsBox.querySelectorAll('.evn').forEach(tickTicket);
  const setTickets = list => {
    if (!ticketsBox) return;
    const proto = ticketsBox.querySelector('.evn')?.cloneNode(true);
    if (!proto) return;
    const items = list.slice(0, +(ticketsBox.dataset.limit || 2));
    const empty = document.querySelector('[data-ev-empty]');
    if (empty) empty.hidden = items.length > 0;
    ticketsBox.hidden = !items.length;
    ticketsBox.replaceChildren(...items.map((ev, i) => {
      const c = proto.cloneNode(true);
      Object.assign(c.dataset, { tarih: ev.tarih, saat: ev.saat || '', baslik: ev.baslik, yer: ev.yer || '', aciklama: ev.aciklama || '' });
      if (i) c.dataset.d = String(i); else delete c.dataset.d;
      c.querySelectorAll('[data-cd]').forEach(b => (b.textContent = ''));
      fillTicket(c);
      return c;
    }));
    tickAll();
  };
  if (ticketsBox) {
    ticketsBox.querySelectorAll('.evn').forEach(fillTicket);
    tickAll();
    setInterval(tickAll, 1000);
    // .ics dosyası: telefonun ya da bilgisayarın takvimine eklenir
    ticketsBox.addEventListener('click', e => {
      const btn = e.target.closest('[data-ics]');
      if (!btn) return;
      const c = btn.closest('.evn'), d = c.dataset, p = n => String(n).padStart(2, '0');
      const fmt = t => `${t.getFullYear()}${p(t.getMonth() + 1)}${p(t.getDate())}T${p(t.getHours())}${p(t.getMinutes())}00`;
      const st = evTime(c), en = new Date(st.getTime() + 2 * 36e5);
      const esc = t => (t || '').replace(/[\\,;]/g, ch => '\\' + ch).replace(/\n/g, '\\n');
      const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Kizilanka//Etkinlik//TR', 'BEGIN:VEVENT',
        `UID:${fmt(st)}-${d.tarih}@kizilanka.com`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
        `DTSTART:${fmt(st)}`, `DTEND:${fmt(en)}`, `SUMMARY:${esc(d.baslik)}`, `LOCATION:${esc(d.yer || 'Yer duyurulacak')}`,
        `DESCRIPTION:${esc(d.aciklama)}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
      a.download = 'kizilanka-etkinlik.ics';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
  }

  /* ---------- Biten etkinlikler: galeri kartları + fotoğraf penceresi ----------
     data/site.json'da her etkinlik için:
       "gorsel":   kapak fotoğrafı (isteğe bağlı; yoksa ilk fotoğraf kullanılır)
       "gorseller": ["assets/etkinlikler/piknik-1.jpg", ...]  karta tıklayınca açılan galeri
     Fotoğraf yoksa amblemli kapak ve "yakında eklenecek" notu gösterilir. */
  const ICON_PHOTO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/></svg>';
  const photosOf = ev => (Array.isArray(ev.gorseller) ? ev.gorseller.filter(Boolean) : []);
  const coverOf = ev => ev.gorsel || photosOf(ev)[0] || '';
  const dateText = ev => { const [y, m, d] = ev.tarih.split('-').map(Number); return `${d} ${AY_UZUN[m - 1]} ${y}`; };

  const pastCard = ev => {
    const card = el('button', 'evp-card');
    card.type = 'button';
    card.setAttribute('aria-label', `${ev.baslik}, ${dateText(ev)}: fotoğrafları aç`);
    const ph = el('span', 'evp-ph');
    const mark = el('img', 'evp-mark');
    mark.src = 'assets/anka-bird.svg';
    mark.alt = '';
    ph.append(mark);
    const cover = coverOf(ev);
    if (cover) {
      const img = el('img', 'evp-img');
      img.src = cover;
      img.alt = '';
      img.loading = 'lazy';
      img.onerror = () => img.remove();
      ph.append(img);
    }
    const n = photosOf(ev).length;
    if (n) {
      const badge = el('span', 'evp-count');
      badge.innerHTML = ICON_PHOTO;
      badge.append(String(n));
      ph.append(badge);
    }
    const cap = el('span', 'evp-cap');
    cap.append(el('span', 'evp-date', dateText(ev)), el('b', 'evp-title', ev.baslik));
    if (ev.yer) cap.append(el('small', null, ev.yer));
    card.append(ph, cap);
    card.addEventListener('click', () => openGallery(ev, card));
    return card;
  };

  const galleries = document.querySelectorAll('[data-ev-gallery]');
  const fillGallery = list => galleries.forEach(g => {
    const col = g.closest('[data-ev-past]');
    if (col) col.hidden = !list.length;
    if (list.length) g.replaceChildren(...list.map(pastCard));
  });
  document.querySelectorAll('[data-evp]').forEach(b => b.addEventListener('click', () => {
    const g = b.closest('[data-ev-past]')?.querySelector('[data-ev-gallery]'), card = g?.querySelector('.evp-card');
    if (card) g.scrollBy({ left: +b.dataset.evp * (card.offsetWidth + 14) * 2, behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* Fotoğraf penceresi: ilk açılışta oluşturulur. Oklar, küçük resimler, klavye (← → Esc) ve kaydırma ile gezilir. */
  let lb = null;
  const lbState = { photos: [], i: 0, from: null };
  const buildLightbox = () => {
    const d = document.createElement('dialog');
    d.className = 'lb';
    d.setAttribute('aria-labelledby', 'lbTitle');
    d.innerHTML = `
      <div class="lb-in">
        <div class="lb-head">
          <div><span class="lb-date"></span><h3 class="lb-title" id="lbTitle"></h3><p class="lb-meta"></p></div>
          <button type="button" class="lb-x" aria-label="Kapat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        </div>
        <div class="lb-stage">
          <button type="button" class="lb-nav" data-go="-1" aria-label="Önceki fotoğraf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>
          <figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-count" aria-live="polite"></figcaption></figure>
          <div class="lb-empty"><img src="assets/anka-bird.svg" alt=""><p>Bu etkinliğin fotoğrafları yakında eklenecek.</p></div>
          <button type="button" class="lb-nav" data-go="1" aria-label="Sonraki fotoğraf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
        </div>
        <p class="lb-desc"></p>
        <div class="lb-thumbs" role="group" aria-label="Fotoğraflar"></div>
      </div>`;
    const close = () => d.close();
    d.querySelector('.lb-x').addEventListener('click', close);
    d.addEventListener('click', e => { if (e.target === d) close(); });
    d.addEventListener('close', () => { document.documentElement.classList.remove('lb-open'); lbState.from?.focus(); });
    d.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => showPhoto(lbState.i + +b.dataset.go)));
    d.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); showPhoto(lbState.i + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); showPhoto(lbState.i - 1); }
    });
    // Dokunmatik ekranda sağa/sola kaydırma
    let x0 = null;
    const fig = d.querySelector('.lb-fig');
    fig.addEventListener('pointerdown', e => (x0 = e.clientX));
    fig.addEventListener('pointerup', e => {
      if (x0 == null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) showPhoto(lbState.i + (dx < 0 ? 1 : -1));
    });
    document.body.append(d);
    return d;
  };
  const showPhoto = i => {
    const n = lbState.photos.length;
    if (!n) return;
    lbState.i = (i + n) % n;
    const img = lb.querySelector('.lb-img');
    img.classList.remove('on');
    img.onload = () => img.classList.add('on');
    img.onerror = () => img.classList.add('on');
    img.src = lbState.photos[lbState.i];
    img.alt = `${lb.querySelector('.lb-title').textContent}, fotoğraf ${lbState.i + 1}`;
    if (img.complete && img.naturalWidth) img.classList.add('on');
    lb.querySelector('.lb-count').textContent = `${lbState.i + 1} / ${n}`;
    lb.querySelectorAll('.lb-thumbs button').forEach((t, k) => t.setAttribute('aria-current', k === lbState.i ? 'true' : 'false'));
    lb.querySelector('.lb-thumbs [aria-current="true"]')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
  };
  const openGallery = (ev, from) => {
    if (!lb) lb = buildLightbox();
    const photos = photosOf(ev);
    if (!photos.length && ev.gorsel) photos.push(ev.gorsel);
    Object.assign(lbState, { photos, i: 0, from });
    lb.querySelector('.lb-date').textContent = dateText(ev);
    lb.querySelector('.lb-title').textContent = ev.baslik;
    lb.querySelector('.lb-meta').textContent = [ev.saat && 'Saat ' + ev.saat, ev.yer].filter(Boolean).join(' · ');
    lb.querySelector('.lb-desc').textContent = ev.aciklama || '';
    lb.classList.toggle('none', !photos.length);
    lb.classList.toggle('single', photos.length === 1);
    const thumbs = lb.querySelector('.lb-thumbs');
    thumbs.replaceChildren(...photos.map((src, k) => {
      const t = el('button');
      t.type = 'button';
      t.setAttribute('aria-label', `Fotoğraf ${k + 1}`);
      const im = el('img');
      im.src = src;
      im.alt = '';
      im.loading = 'lazy';
      t.append(im);
      t.addEventListener('click', () => showPhoto(k));
      return t;
    }));
    document.documentElement.classList.add('lb-open');
    lb.showModal();
    if (photos.length) showPhoto(0);
    lb.querySelector('.lb-x').focus();
  };

  const fillEvents = (panel, list, past, emptyText) => {
    if (!panel) return;
    // data-offset="1": ilk etkinlik büyük bilette gösterildiği için listeden düşülür; kalan yoksa liste gizlenir
    const off = +(panel.dataset.offset || 0);
    if (off) {
      list = list.slice(off);
      const wrap = panel.closest('[data-ev-more]');
      if (wrap) wrap.hidden = !list.length;
      if (!list.length) return;
    }
    panel.replaceChildren();
    panel.classList.toggle('grid-2', list.length > 0);
    if (!list.length) { panel.append(el('div', 'empty', emptyText)); return; }
    // data-limit="2": ana sayfada yalnızca en yakın etkinlikler; tamamı Etkinlikler sayfasında
    if (panel.dataset.limit) list = list.slice(0, +panel.dataset.limit);
    list.forEach((ev, i) => panel.append(eventCard(ev, past, i)));
  };

  const applyData = data => {
    const st = data.istatistik || {}, burs = data.burs || {};
    if (burs.hedef && st.bursiyer != null) {
      burs.kalan = Math.max(burs.hedef - st.bursiyer, 0);
      burs.yuzde = Math.min(Math.round((st.bursiyer / burs.hedef) * 100), 100);
    }
    document.querySelectorAll('[data-bind]').forEach(n => {
      let v = pick(data, n.dataset.bind);
      if (v == null) return;
      if (n.dataset.times) v *= +n.dataset.times;
      if ('count' in n.dataset) n.dataset.count = v;
      n.textContent = typeof v === 'number' ? v.toLocaleString('tr-TR') : v;
    });
    // Dairesel hedef halkası: --p yüzdesi (ör. burs.yuzde)
    document.querySelectorAll('[data-bind-ring]').forEach(n => {
      const v = pick(data, n.dataset.bindRing);
      if (v != null) n.style.setProperty('--p', v);
    });
    document.querySelectorAll('[data-bind-fill]').forEach(n => {
      const v = pick(data, n.dataset.bindFill);
      if (v != null) n.dataset.fill = v;
    });
    // Kart ile bağış: Fonzip bağış sayfası linki girilince seçenek açılır
    const kart = pick(data, 'bagis.kartLinki');
    if (typeof kart === 'string' && /^https:\/\//.test(kart)) {
      document.querySelectorAll('[data-card-link]').forEach(a => (a.href = kart));
      document.querySelectorAll('[data-card-option]').forEach(l => {
        l.classList.remove('soon');
        l.querySelector('input').disabled = false;
        l.querySelector('small')?.remove();
      });
      document.querySelectorAll('[data-card-hint]').forEach(h => (h.textContent = 'Kartla bağış, Fonzip üzerinden açılan güvenli ödeme sayfasında alınır. Kart bilgilerin bu siteye girilmez.'));
    }
    if (Array.isArray(data.etkinlikler)) {
      const n = new Date(), today = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
      const evs = data.etkinlikler.filter(e => e && e.baslik && /^\d{4}-\d{2}-\d{2}$/.test(e.tarih));
      const up = evs.filter(e => e.tarih >= today).sort((a, b) => a.tarih.localeCompare(b.tarih));
      const past = evs.filter(e => e.tarih < today).sort((a, b) => b.tarih.localeCompare(a.tarih));
      setTickets(up);
      fillEvents(document.querySelector('[data-events="up"]'), up, false, 'Şu an planlanmış yeni etkinlik yok. Yenilerini ilk burada duyuracağız.');
      fillGallery(past);
      fillEvents(document.querySelector('[data-events="past"]'), past, true, 'Tamamlanan etkinlikler burada listelenecek.');
    }
  };

  fetch('data/site.json', { cache: 'no-cache' })
    .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(applyData)
    .catch(() => {})
    .finally(() => requestAnimationFrame(() => requestAnimationFrame(startReveal)));

  /* ---------- Ana sayfa: kaç bursa ortak olacağını seç, etkisini gör ----------
     Değerler data/site.json'dan doldurulan alanlardan okunur. */
  document.querySelectorAll('[data-impact]').forEach(box => {
    const num = sel => +((box.querySelector(sel)?.textContent || '0').replace(/\D/g, ''));
    const fly = box.querySelector('.fly'), out = box.querySelector('.gf-out'), go = box.querySelector('.gf-go');
    const base = out.innerHTML;
    box.querySelectorAll('[data-adet]').forEach(b => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      box.querySelectorAll('[data-adet]').forEach(x => { x.classList.toggle('on', on && x === b); x.setAttribute('aria-pressed', on && x === b); });
      const hedef = num('[data-bind="burs.hedef"]'), mevcut = num('.gf-count [data-bind="istatistik.bursiyer"]'), tutar = num('[data-bind="burs.tutar"]');
      const kalan = Math.max(hedef - mevcut, 0), n = on ? Math.min(+b.dataset.adet, kalan || +b.dataset.adet) : 0;
      fly.style.setProperty('--a', hedef ? (n / hedef) * 100 : 0);
      if (!on) { out.innerHTML = base; go.href = 'bagis.html?tur=burs'; return; }
      const n2 = +b.dataset.adet;
      out.textContent = `${n2} öğrencinin bursu: ${(n2 * tutar).toLocaleString('tr-TR')} TL. ` + (kalan - n2 > 0 ? `Hedefe ${kalan - n2} burs kalır.` : 'Bu dönemin hedefi tamamlanır.');
      go.href = `bagis.html?tur=burs&adet=${n2}`;
    }));
  });

  /* ---------- Sekmeler ---------- */
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const btns = [...group.querySelectorAll('[role="tab"]')];
    const pill = group.querySelector('.pill');
    const move = b => { if (pill) { pill.style.width = b.offsetWidth + 'px'; pill.style.transform = `translateX(${b.offsetLeft - 5}px)`; } };
    const select = b => {
      btns.forEach(x => {
        const on = x === b;
        x.setAttribute('aria-selected', on);
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      move(b);
    };
    btns.forEach((b, i) => {
      b.onclick = () => select(b);
      b.onkeydown = e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          const n = btns[(i + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length];
          n.focus(); select(n);
        }
      };
    });
    const first = btns.find(b => b.getAttribute('aria-selected') === 'true') || btns[0];
    requestAnimationFrame(() => select(first));
    addEventListener('resize', () => move(btns.find(b => b.getAttribute('aria-selected') === 'true')));
  });

  /* ---------- SSS: aynı anda bir soru açık ---------- */
  document.querySelectorAll('.faq').forEach(f => {
    const ds = f.querySelectorAll('details');
    ds.forEach(d => d.addEventListener('toggle', () => { if (d.open) ds.forEach(o => o !== d && (o.open = false)); }));
  });

  /* ---------- Kopyala ---------- */
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const txt = b.dataset.copy;
    try { await navigator.clipboard.writeText(txt); }
    catch (e) {
      const t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); } catch (_) {}
      t.remove();
    }
    const old = b.textContent;
    b.textContent = 'Kopyalandı'; b.classList.add('ok');
    setTimeout(() => { b.textContent = old; b.classList.remove('ok'); }, 1800);
  }));

  /* ---------- Seçim çipleri (ana sayfa) ---------- */
  document.querySelectorAll('[data-chips]').forEach(g => g.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
    g.querySelectorAll('.chip').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
    c.classList.add('on'); c.setAttribute('aria-pressed', 'true');
    const link = document.querySelector(g.dataset.chips);
    if (link) link.href = 'bagis.html?tur=' + encodeURIComponent(c.dataset.val);
  })));

  /* ---------- Formlar ----------
     Gönderimler Netlify Forms'a gider (Netlify paneli → Forms).
     Her formun name="..." değeri panelde ayrı bir liste olarak görünür.
     Yerel sunucuda (localhost) gönderim çalışmaz; yalnızca yayındaki sitede çalışır. */
  document.querySelectorAll('form.js-form').forEach(f => f.addEventListener('submit', async e => {
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const btn = f.querySelector('[type="submit"]');
    if (btn) btn.disabled = true;
    try {
      const r = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(f)).toString()
      });
      if (!r.ok) throw new Error(r.status);
      toast(f.dataset.ok || 'Gönderildi, teşekkürler.');
      f.reset();
      f.dispatchEvent(new Event('change', { bubbles: true }));
    } catch (_) {
      toast('Gönderilemedi. Bağlantını kontrol edip tekrar dener misin?');
    } finally {
      if (btn) btn.disabled = false;
    }
  }));

  /* ---------- Yol haritası (Faaliyetler) ----------
     Ağaç: her düğüm data-parent ile bağlı olduğu düğümü gösterir; dallar bu
     bağlantılardan SVG eğri olarak çizilir. Bir adıma dokununca ondan köke
     uzanan yol vurgulanır ve ayrıntısı adımın yanında açılan baloncukta görünür. */
  document.querySelectorAll('[data-road]').forEach(road => {
    const NS = 'http://www.w3.org/2000/svg';
    const tree = road.querySelector('.tree');
    const lines = road.querySelector('.tree-lines');
    const pop = road.querySelector('#treePop');
    const body = road.querySelector('#roadBody');
    const nodes = [...road.querySelectorAll('.tn')];
    const byId = Object.fromEntries(nodes.map(n => [n.dataset.id, n]));
    const parents = n => (n.dataset.parent || '').split(' ').filter(id => byId[id]);
    const pos = n => ['--x', '--y'].map(k => parseFloat(n.style.getPropertyValue(k)) / 100);
    // Derinlik: kökten kaç adım uzakta (animasyon sırası bu değere göre)
    const depth = n => (parents(n).length ? Math.max(...parents(n).map(p => depth(byId[p]))) + 1 : 0);
    nodes.forEach(n => n.style.setProperty('--d', depth(n)));

    // Her dal için üç çizgi: taban, seçimle dolan kırmızı vurgu, üzerinde akan ışık noktaları
    const edges = [];
    nodes.forEach(n => parents(n).forEach(pid => {
      const kind = n.dataset.kind;
      const mk = cls => {
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('class', cls);
        p.style.setProperty('--d', depth(n));
        lines.append(p);
        return p;
      };
      const dashed = kind === 'tbd' || kind === 'goal';
      const base = mk('base e-' + kind + (dashed ? ' dashed' : ''));
      const hl = mk('hl');
      // Tamamlanan ve sıradaki dallar "canlı": üzerlerinde sürekli akış var
      const flow = mk('flow' + (kind === 'done' ? ' over-red' : '') + (kind === 'done' || kind === 'next' ? ' live' : ''));
      if (!dashed) base.setAttribute('pathLength', '1');
      hl.setAttribute('pathLength', '1');
      edges.push({ from: pid, to: n.dataset.id, base, hl, flow, a: byId[pid], b: n });
    }));

    const chainOf = (n, set = new Set()) => {
      set.add(n.dataset.id);
      parents(n).forEach(pid => { if (!set.has(pid)) chainOf(byId[pid], set); });
      return set;
    };

    // ---- Baloncuk ----
    let current = null;
    const place = n => {
      const w = tree.clientWidth, h = tree.clientHeight;
      const [x, y] = pos(n);
      const cx = x * w, cy = y * h;
      const pw = Math.min(300, w - 16);
      const left = Math.max(8, Math.min(cx - pw / 2, w - pw - 8));
      const below = y < 0.42;
      const r = n.querySelector('i').offsetHeight / 2;
      pop.classList.toggle('below', below);
      pop.classList.toggle('above', !below);
      pop.style.width = pw + 'px';
      pop.style.left = left + 'px';
      pop.style.setProperty('--ax', (cx - left) + 'px');
      if (below) { pop.style.top = (cy + r + n.querySelector('span').offsetHeight + 16) + 'px'; pop.style.bottom = 'auto'; }
      else { pop.style.bottom = (h - cy + r + 12) + 'px'; pop.style.top = 'auto'; }
    };
    const highlight = n => {
      const chain = n ? chainOf(n) : new Set();
      nodes.forEach(x => { x.setAttribute('aria-pressed', x === n); x.classList.toggle('on', chain.has(x.dataset.id)); });
      edges.forEach(e => {
        const on = chain.has(e.from) && chain.has(e.to);
        e.hl.classList.toggle('on', on);
        e.flow.classList.toggle('on', on);
      });
    };
    const open = n => {
      current = n;
      highlight(n);
      body.replaceChildren(el('span', 'tag ' + n.dataset.cls, n.dataset.status), el('h3', null, n.querySelector('span').textContent), el('p', null, n.dataset.text));
      place(n);
      pop.classList.add('open');
      pop.setAttribute('aria-hidden', 'false');
    };
    const close = refocus => {
      if (!current) return;
      const n = current;
      current = null;
      highlight(null);
      pop.classList.remove('open');
      pop.setAttribute('aria-hidden', 'true');
      if (refocus) n.focus();
    };
    nodes.forEach(n => n.addEventListener('click', e => {
      e.stopPropagation();
      if (current === n) close(false); else open(n);
    }));
    pop.addEventListener('click', e => e.stopPropagation());
    pop.querySelector('.tree-pop-x').addEventListener('click', () => close(true));
    document.addEventListener('click', () => close(false));
    addEventListener('keydown', e => { if (e.key === 'Escape') close(true); });

    // Çizgiler kutunun gerçek piksel boyutuyla çizilir
    const draw = () => {
      const w = tree.clientWidth, h = tree.clientHeight;
      if (!w || !h) return;
      lines.setAttribute('viewBox', `0 0 ${w} ${h}`);
      edges.forEach(({ a, b, base, hl, flow }) => {
        const [x1, y1] = pos(a), [x2, y2] = pos(b);
        const X1 = x1 * w, Y1 = y1 * h, X2 = x2 * w, Y2 = y2 * h, MY = (Y1 + Y2) / 2;
        const d = `M${X1} ${Y1}C${X1} ${MY} ${X2} ${MY} ${X2} ${Y2}`;
        [base, hl, flow].forEach(p => p.setAttribute('d', d));
      });
      if (current) place(current);
    };
    draw();
    if ('ResizeObserver' in window) new ResizeObserver(draw).observe(tree);
    else addEventListener('resize', draw);

    // Giriş: ağaç ekrana ilk girdiğinde dallar kökten tepeye büyür, adımlar sırayla belirir
    if (reduce || !('IntersectionObserver' in window)) { tree.classList.add('grown'); return; }
    tree.classList.add('anim');
    const io = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      io.disconnect();
      requestAnimationFrame(() => tree.classList.add('grown'));
    }, { threshold: 0.25 });
    io.observe(tree);
  });

  /* ---------- Anka: dokununca halkadan çıkar, bandda bir ∞ çizer, yerine konar ----------
     Logo katmanlıdır: halka (yerinde kalır) + sol kanat + gövde + sağ kanat.
     Uçuş kare kare ilerler: kuş sağ uçtan sonsuz işareti (Gerono lemniskatı) boyunca
     tam bir tur atar, sonra yerine süzülür ve bol kırmızı parıltıyla konar.
     Uçarken kuşa (ya da halkaya) dokunmak onu hemen yerine indirir. */
  const anka = document.getElementById('anka');
  const sky = anka && anka.closest('.hv');
  if (anka && sky) {
    const rnd = (a, b) => a + Math.random() * (b - a);
    const cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const local = el => { const a = el.getBoundingClientRect(), s = sky.getBoundingClientRect(); return { x: a.left - s.left, y: a.top - s.top, w: a.width, h: a.height }; };
    const fx = (cls, x, y, keyframes, opts) => {
      const e = document.createElement('span');
      e.className = cls;
      e.style.left = x + 'px';
      e.style.top = y + 'px';
      sky.appendChild(e);
      e.animate(keyframes, opts).onfinish = () => e.remove();
      return e;
    };
    const COLORS = ['#ff2d3a', '#e3141f', '#ff5a5f', '#b30d16', '#ff8a8a', '#ffd0d0'];   // kırmızı parıltı tonları
    const pick = a => a[Math.floor(Math.random() * a.length)];

    // Sim: yıldız biçimli, parlayıp sönen küçük ışıklar
    const glitter = (x, y, { spread = 10, fall = 40, size = [5, 13], life = [700, 1300] } = {}) => {
      const s = fx('spark', x + rnd(-spread, spread), y + rnd(-spread, spread), [
        { opacity: 0, transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)' },
        { opacity: 1, transform: 'translate(-50%,-50%) scale(1.15) rotate(45deg)', offset: 0.25 },
        { opacity: 0.85, transform: `translate(calc(-50% + ${rnd(-8, 8)}px), calc(-50% + ${fall * 0.5}px)) scale(.7) rotate(90deg)`, offset: 0.6 },
        { opacity: 0, transform: `translate(calc(-50% + ${rnd(-14, 14)}px), calc(-50% + ${fall}px)) scale(.2) rotate(140deg)` }
      ], { duration: rnd(...life), easing: 'ease-out' });
      const z = rnd(...size);
      s.style.width = s.style.height = z + 'px';
      s.style.color = pick(COLORS);
    };
    const ember = (x, y) => fx('ember', x + rnd(-6, 6), y, [
      { opacity: 0.9, transform: 'translate(-50%,-50%) scale(1)' },
      { opacity: 0, transform: `translate(calc(-50% + ${rnd(-16, 16)}px), calc(-50% + ${rnd(20, 48)}px)) scale(.2)` }
    ], { duration: rnd(700, 1100), easing: 'ease-out' });

    // Bant ekranda değilken sim üretme (gereksiz iş yapma)
    let inView = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(es => { inView = es[0].isIntersecting; }).observe(sky);

    // Sihir: konuşta halka parlar, ışık dalgaları yayılır, bol sim saçılır
    const magic = () => {
      const R = local(anka.querySelector('.anka-ring'));
      const cx = R.x + R.w / 2, cy = R.y + R.h * 0.56;
      for (let i = 0; i < 90; i++) {
        const ang = rnd(0, Math.PI * 2), dist = rnd(R.w * 0.3, R.w * 0.95), size = rnd(8, 20);
        const s = fx('spark', cx, cy, [
          { opacity: 0, transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)' },
          { opacity: 1, offset: 0.2 },
          { opacity: 0, transform: `translate(calc(-50% + ${Math.cos(ang) * dist}px), calc(-50% + ${Math.sin(ang) * dist}px)) scale(1) rotate(${rnd(-200, 200)}deg)` }
        ], { duration: rnd(900, 1600), delay: rnd(0, 260), easing: 'cubic-bezier(.2,0,0,1)', fill: 'backwards' });
        s.style.width = s.style.height = size + 'px';
        s.style.color = COLORS[i % COLORS.length];
      }
      [0, 150, 300].map(d => fx('wave', cx, cy, [
        { opacity: 0.75, transform: 'translate(-50%,-50%) scale(.3)' },
        { opacity: 0, transform: 'translate(-50%,-50%) scale(1.6)' }
      ], { duration: 1000, delay: d, easing: 'ease-out', fill: 'backwards' })).forEach(w => { w.style.width = w.style.height = R.w + 'px'; });
      // Konuştan sonra bir süre halkanın çevresinde simler parıldamaya devam eder
      for (let i = 0; i < 40; i++) {
        setTimeout(() => {
          const a = rnd(0, Math.PI * 2), rr = R.w * rnd(0.36, 0.5);
          glitter(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, { spread: 4, fall: 16, size: [6, 14], life: [600, 1000] });
        }, 250 + i * 60);
      }
      anka.classList.remove('magic'); void anka.offsetWidth; anka.classList.add('magic');
    };

    // Dururken: halkanın çevresinde ara ara küçük simler
    if (!reduce) setInterval(() => {
      if (!inView || document.hidden || state !== 'home') return;
      const R = local(anka.querySelector('.anka-ring'));
      const a = rnd(0, Math.PI * 2), rr = R.w * rnd(0.4, 0.52);
      glitter(R.x + R.w / 2 + Math.cos(a) * rr, R.y + R.h * 0.56 + Math.sin(a) * rr, { spread: 2, fall: 12, size: [5, 10], life: [800, 1200] });
    }, 420);

    // ---- "Ankaya dokun" etiketi: fare ankanın üstündeyken imleci izler ----
    const tip = document.createElement('span');
    tip.className = 'anka-tip';
    tip.textContent = 'Ankaya dokun';
    tip.setAttribute('aria-hidden', 'true');
    sky.appendChild(tip);
    const tipOn = el => {
      el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') tip.classList.add('on'); });
      el.addEventListener('pointerleave', () => tip.classList.remove('on'));
      el.addEventListener('pointermove', e => {
        const s = sky.getBoundingClientRect();
        tip.style.left = (e.clientX - s.left) + 'px';
        tip.style.top = (e.clientY - s.top) + 'px';
      });
    };
    tipOn(anka);

    // ---- Uçuş kontrolcüsü ----
    let state = 'home';                          // home | flying | landing
    let bird = null, raf = 0, last = 0, sparkClock = 0;
    let tilt = 0, scale = 1, px = 0, py = 0, home = null;
    const FLY = 0.45, SPEED = 330;               // uçarken boyut oranı, hız (px/sn)
    // ∞ eğrisi: x = cx + A·sin θ, y = cy + B·sin 2θ  (θ: π/2 → π/2 + 2π, sağ uçtan başlayıp tam tur)
    let theta = 0, blend = 0;
    const loopAt = th => {
      const { W, H, padX, padY } = bounds();
      // ∞ bandın üst kısmında: tepesi üst kenara yakın, merkez ortanın üstünde
      const A = W / 2 - padX, B = Math.min(H / 2 - padY, A * 0.42) * 0.8;
      return [W / 2 + A * Math.sin(th), padY + B + B * Math.sin(2 * th)];
    };
    const bounds = () => {
      const W = sky.clientWidth, H = sky.clientHeight;
      const T = 28 * Math.PI / 180, fw = home.w * FLY, fh = home.h * FLY;
      return { W, H, padX: (fw * Math.cos(T) + fh * Math.sin(T)) / 2 + 8, padY: (fh * Math.cos(T) + fw * Math.sin(T)) / 2 + 8 };
    };
    const place = () => {
      bird.style.transform = `translate(${px - home.cx}px, ${py - home.cy}px) rotate(${tilt}deg) scale(${scale})`;
    };
    const trail = dt => {
      if (!inView) return;
      sparkClock += dt;
      while (sparkClock > 0.028) {
        sparkClock -= 0.028;
        const b = local(bird), cx = b.x + b.w / 2, cy = b.y + b.h * 0.6;
        glitter(cx, cy, { spread: 24, fall: 55, size: [8, 18], life: [900, 1500] });
        if (Math.random() < 0.5) ember(cx, cy);
      }
    };
    const step = now => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      if (state === 'flying') {
        // ∞ boyunca sabit hızla ilerle (eğri uzunluğuna göre θ adımı)
        const a = loopAt(theta), b = loopAt(theta + 0.01);
        const d = Math.max(0.5, Math.hypot(b[0] - a[0], b[1] - a[1]) / 0.01);
        theta += (SPEED * dt) / d;
        blend = Math.min(1, blend + dt / 0.9);          // yuvadan ∞'a yumuşak geçiş
        const [lx, ly] = loopAt(theta);
        const k = blend * blend * (3 - 2 * blend);
        const nx = home.cx + (lx - home.cx) * k, ny = home.cy + (ly - home.cy) * k;
        const vx = (nx - px) / dt;
        px = nx; py = ny;
        if (theta >= Math.PI / 2 + Math.PI * 2) bringHome();   // tam tur bitti: yerine dön
        scale += (FLY - scale) * Math.min(1, dt * 4);   // havalanırken yumuşakça küçül
        tilt += (cl(vx * 0.06, -28, 28) - tilt) * Math.min(1, dt * 6);
        place();
        trail(dt);
      } else if (state === 'landing') {
        land.t = Math.min(1, land.t + dt / land.dur);
        const e = 1 - Math.pow(1 - land.t, 3);
        const q = 1 - e;                       // ikinci dereceden Bezier: başlangıç → üstten kontrol noktası → yuva
        px = q * q * land.x0 + 2 * q * e * land.cx + e * e * home.cx;
        py = q * q * land.y0 + 2 * q * e * land.cy + e * e * home.cy;
        scale = land.s0 + (1 - land.s0) * e;
        tilt = land.r0 * (1 - e);
        place();
        trail(dt);
        if (land.t >= 1) {
          bird.remove(); bird = null;
          state = 'home';
          anka.classList.remove('away');
          anka.classList.remove('landed'); void anka.offsetWidth; anka.classList.add('landed');
          magic();
          return;
        }
      }
      raf = requestAnimationFrame(step);
    };
    const land = { t: 0, dur: 1.4 };
    const takeOff = () => {
      const body = anka.querySelector('.anka-bird');
      const r = local(body);
      home = { x: r.x, y: r.y, w: r.w, h: r.h, cx: r.x + r.w / 2, cy: r.y + r.h / 2 };
      bird = document.createElement('button');
      bird.type = 'button';
      bird.className = 'anka-fly';
      bird.setAttribute('aria-label', 'Ankayı yerine indir');
      bird.style.cssText = `left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px`;
      bird.innerHTML = `<span class="anka-bird">${body.innerHTML}</span>`;
      bird.addEventListener('click', e => { e.stopPropagation(); bringHome(); });
      tipOn(bird);
      sky.appendChild(bird);
      anka.classList.add('away');
      px = home.cx; py = home.cy; scale = 1; tilt = 0;
      theta = Math.PI / 2; blend = 0;
      state = 'flying';
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const bringHome = () => {
      if (state !== 'flying') return;
      tip.classList.remove('on');
      Object.assign(land, { t: 0, x0: px, y0: py, s0: scale, r0: tilt, cx: (px + home.cx) / 2, cy: (py + home.cy) / 2 - sky.clientHeight * 0.02 });
      state = 'landing';
    };
    anka.addEventListener('click', () => {
      if (reduce) { magic(); return; }
      if (state === 'home') takeOff();
      else if (state === 'flying') bringHome();
    });
    addEventListener('keydown', e => { if (e.key === 'Escape') bringHome(); });
  }

  /* ---------- Dahil olduğumuz topluluklar: kayan logo bandı ----------
     Kartlar .pt-src listesinden kopyalanır ve kutuyu dolduracak kadar çoğaltılır;
     şerit tam bir kopya genişliği kadar kayıp başa döner (boşluksuz). Üzerine
     gelince ya da klavyeyle bir karta odaklanınca durur. Hareketi azalt
     ayarında şerit kaymaz, kartlar ızgara olarak görünür. */
  document.querySelectorAll('[data-pt]').forEach(pt => {
    const src = [...pt.querySelectorAll('.pt-src > li')];
    const stage = pt.querySelector('.pt-stage');
    const track = pt.querySelector('.pt-track');
    const PX_PER_SEC = 55;
    let anim = null;
    pt.classList.add('js');
    stage.hidden = false;
    const copy = (li, hidden) => {
      const c = li.cloneNode(true);
      if (hidden) { c.setAttribute('aria-hidden', 'true'); c.querySelector('a').tabIndex = -1; }
      return c;
    };
    const render = () => {
      if (anim) { anim.cancel(); anim = null; }
      stage.classList.toggle('grid', reduce);
      track.replaceChildren(...src.map(li => copy(li, false)));
      if (reduce) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const one = track.scrollWidth + gap;
      const copies = Math.max(2, Math.ceil(stage.clientWidth / one) + 1);
      for (let k = 1; k < copies; k++) src.forEach(li => track.appendChild(copy(li, true)));
      anim = track.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${-one}px)` }],
        { duration: (one / PX_PER_SEC) * 1000, iterations: Infinity, easing: 'linear' });
      if (stage.matches(':hover')) anim.pause();
    };
    const hold = on => { if (anim) on ? anim.pause() : anim.play(); };
    stage.addEventListener('pointerenter', () => hold(true));
    stage.addEventListener('pointerleave', () => hold(false));
    stage.addEventListener('focusin', () => hold(true));
    stage.addEventListener('focusout', () => hold(false));
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(render, 200); });
    render();
    addEventListener('load', render);   // logolar yüklenince genişlikler değişebilir
  });

  /* ---------- Koşullu alanlar (data-show="ad=değer1,değer2") ---------- */
  const conds = [...document.querySelectorAll('[data-show]')];
  const applyConds = () => conds.forEach(el => {
    const [name, vals] = el.dataset.show.split('=');
    const form = el.closest('form') || document;
    const checked = form.querySelector(`[name="${name}"]:checked`);
    const on = !!checked && vals.split(',').includes(checked.value);
    el.classList.toggle('hidden', !on);
    el.querySelectorAll('input,select,textarea').forEach(i => (i.disabled = !on));
  });
  if (conds.length) {
    // Ana sayfadan gelen ?tur=… seçimini uygula
    const tur = new URLSearchParams(location.search).get('tur');
    if (tur) { const r = document.querySelector(`input[name="bagis_turu"][value="${CSS.escape(tur)}"]`); if (r) r.checked = true; }
    const adet = new URLSearchParams(location.search).get('adet');
    if (adet) { const r = document.querySelector(`input[name="burs_adet"][value="${CSS.escape(adet)}"]`); if (r) r.checked = true; }
    document.addEventListener('change', applyConds);
    applyConds();
  }

  /* ---------- Üyelik tipi seçimi ---------- */
  document.querySelectorAll('[data-choose]').forEach(g => {
    const btns = g.querySelectorAll('button');
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => {
        const on = x === b;
        x.setAttribute('aria-pressed', on);
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
    }));
    if (location.hash === '#ogrenci') btns[1] && btns[1].click();
  });

  /* ---------- Öğrenim durumuna göre sınıf seçenekleri ---------- */
  const GRADES = {
    'Lise': ['9. sınıf', '10. sınıf', '11. sınıf', '12. sınıf'],
    'Ön lisans': ['Hazırlık', '1. sınıf', '2. sınıf'],
    'Lisans': ['Hazırlık', '1. sınıf', '2. sınıf', '3. sınıf', '4. sınıf', '5. sınıf', '6. sınıf'],
    'Yüksek lisans': ['Ders dönemi', 'Tez dönemi'],
    'Doktora': ['Ders dönemi', 'Yeterlik', 'Tez dönemi']
  };
  document.querySelectorAll('select[data-grade]').forEach(s => s.addEventListener('change', () => {
    const t = document.getElementById(s.dataset.grade);
    const list = GRADES[s.value];
    t.innerHTML = list ? '<option value="">Seçiniz</option>' + list.map(g => `<option>${g}</option>`).join('')
                       : `<option value="">${s.value ? 'Bu öğrenim durumu için gerekmez' : 'Önce öğrenim durumunu seç'}</option>`;
    t.disabled = !list;
  }));

  /* ---------- Yaş kontrolü (15–90) ---------- */
  document.querySelectorAll('input[data-age]').forEach(i => {
    const now = new Date();
    const d = (y) => new Date(now.getFullYear() - y, now.getMonth(), now.getDate()).toISOString().slice(0, 10);
    i.max = d(15); i.min = d(90);
    i.addEventListener('input', () => i.setCustomValidity(
      i.validity.rangeUnderflow || i.validity.rangeOverflow
        ? 'Bu yaş aralığındaki başvurular formdan alınamıyor. 15 yaşından küçük ya da 90 yaşından büyük başvurular için İletişim sayfasından özel istek ilet.' : ''));
  });

})();
