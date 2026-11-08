/* =========================================================
   Kızılanka — ortak script
   Menü, mobil alt sekme çubuğu ve footer her sayfaya buradan
   eklenir; menüde değişiklik yapmak için yalnızca bu dosyayı
   düzenlemeniz yeterli.
   ========================================================= */
(() => {
  const page = document.body.dataset.page || 'index';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const LOGO = 'assets/mark.png';

  const PAGES = [
    ['index', 'index.html', 'Ana Sayfa'],
    ['hakkimizda', 'hakkimizda.html', 'Hakkımızda'],
    ['faaliyetler', 'faaliyetler.html', 'Faaliyetler'],
    ['etkinlikler', 'etkinlikler.html', 'Etkinlikler'],
    ['burs', 'burs.html', 'Burs'],
    ['seffaflik', 'seffaflik.html', 'Şeffaflık'],
    ['bagis', 'bagis.html', 'Bağış'],
    ['iletisim', 'iletisim.html', 'İletişim']
  ];
  const cur = id => (id === page ? ' aria-current="page"' : '');

  /* ---------- Duyuru şeridi ---------- */
  let annClosed = false;
  try { annClosed = sessionStorage.getItem('ann') === '0'; } catch (e) {}
  const annHTML = annClosed ? '' : `
    <div class="announce" id="announce" role="region" aria-label="Duyuru">
      <div class="wrap"><strong>Burs başvurularımız açık.</strong><a href="burs.html">Hemen başvur →</a></div>
      <button type="button" aria-label="Duyuruyu kapat" id="closeAnnounce">×</button>
    </div>`;

  /* ---------- Üst menü ---------- */
  const headerHTML = `
    <a class="skip" href="#main">İçeriğe geç</a>
    <div class="progress" id="progress"></div>
    ${annHTML}
    <header class="site-header" id="header">
      <div class="wrap">
        <nav class="nav" aria-label="Ana menü">
          <a class="brand" href="index.html"><img src="${LOGO}" alt="" width="34" height="34">kızılanka</a>
          <ul class="menu">${PAGES.map(([id, href, t]) => `<li><a href="${href}"${cur(id)}>${t}</a></li>`).join('')}</ul>
          <a class="btn btn-red magnetic" href="uye-ol.html"${cur('uye-ol')}>Aramıza katıl <span class="arrow">↗</span></a>
          <button class="burger" id="burger" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
        </nav>
      </div>
    </header>
    <div class="drawer" id="drawer" aria-hidden="true">
      <ul>${PAGES.map(([id, href, t], i) => `<li><a href="${href}"${cur(id)} style="transition-delay:${0.05 * i + 0.15}s">${t}<small>0${i + 1}</small></a></li>`).join('')}</ul>
      <a class="btn btn-red" href="uye-ol.html">Aramıza katıl <span class="arrow">↗</span></a>
    </div>`;
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  /* ---------- Mobil alt sekme çubuğu ---------- */
  const ic = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    heart: '<path d="M12 20.5s-7.6-4.5-9.4-9.4C1.4 7.7 3.6 4.5 7 4.5c2.2 0 3.7 1.3 5 3 1.3-1.7 2.8-3 5-3 3.4 0 5.6 3.2 4.4 6.6-1.8 4.9-9.4 9.4-9.4 9.4z"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>'
  };
  const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  document.body.insertAdjacentHTML('beforeend', `
    <nav class="tabbar" aria-label="Hızlı menü">
      <a href="index.html"${cur('index')}>${svg(ic.home)}Ana Sayfa</a>
      <a href="faaliyetler.html"${cur('faaliyetler')}>${svg(ic.grid)}Faaliyetler</a>
      <a class="main-btn" href="bagis.html"${cur('bagis')}><span class="c">${svg(ic.heart)}</span>Bağış</a>
      <a href="burs.html"${cur('burs')}>${svg(ic.cap)}Burs</a>
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
          <a class="brand" href="index.html"><img src="${LOGO}" alt="" width="34" height="34">kızılanka</a>
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
              <button class="btn btn-red" type="submit">Abone ol</button>
            </div>
            <label class="check"><input type="checkbox" name="bulten_onayi" required><span>Duyuru e-postaları almayı kabul ediyorum. <a href="kvkk.html">KVKK Aydınlatma Metni</a></span></label>
          </form>
        </div>
      </div>
      <div class="big-word" aria-hidden="true">kızılanka</div>
      <div class="foot-bottom">
        <span>© <span id="yr"></span> Kızılanka Eğitim Derneği</span>
        <span><a href="kvkk.html">KVKK Aydınlatma Metni</a> · <a href="gizlilik.html">Gizlilik ve Çerezler</a></span>
      </div>
    </div>`;
  document.body.appendChild(footer);
  document.getElementById('yr').textContent = new Date().getFullYear();

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
    drawer.setAttribute('aria-hidden', !open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    tabMenu.classList.toggle('on', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.onclick = () => setMenu(!drawer.classList.contains('open'));
  tabMenu.onclick = () => setMenu(!drawer.classList.contains('open'));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 1180) setMenu(false); });

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
    if (reduce) { el.textContent = end.toLocaleString('tr-TR'); return; }
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

  const eventCard = (ev, past, i) => {
    const [y, m, d] = ev.tarih.split('-').map(Number);
    const card = el('article', 'event reveal');
    if (i % 2) card.dataset.d = '1';
    const date = el('div', 'date');
    date.append(el('b', null, d), el('small', null, `${AYLAR[m - 1]} ${y}`));
    const body = el('div');
    body.append(el('span', past ? 'tag' : 'tag live', past ? 'Geçmiş' : 'Yaklaşan'), el('h3', null, ev.baslik));
    if (ev.aciklama) body.append(el('p', null, ev.aciklama));
    const meta = el('div', 'meta');
    if (ev.saat) meta.append(el('span', null, 'Saat ' + ev.saat));
    if (ev.yer) meta.append(el('span', null, ev.yer));
    body.append(meta);
    card.append(date, body);
    return card;
  };

  const fillEvents = (panel, list, past, emptyText) => {
    if (!panel) return;
    panel.replaceChildren();
    panel.classList.toggle('grid-2', list.length > 0);
    if (!list.length) { panel.append(el('div', 'empty', emptyText)); return; }
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
      fillEvents(document.querySelector('[data-events="up"]'), up, false, 'Yeni etkinlikler yakında burada duyurulacak.');
      fillEvents(document.querySelector('[data-events="past"]'), past, true, 'Geçmiş etkinlikler burada listelenecek.');
    }
  };

  fetch('data/site.json', { cache: 'no-cache' })
    .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(applyData)
    .catch(() => {})
    .finally(startReveal);

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
      toast(f.dataset.ok || 'Gönderildi, teşekkürler!');
      f.reset();
      f.dispatchEvent(new Event('change', { bubbles: true }));
    } catch (_) {
      toast('Gönderilemedi. Bağlantını kontrol edip tekrar dener misin?');
    } finally {
      if (btn) btn.disabled = false;
    }
  }));

  /* ---------- Yol haritası (Faaliyetler) ---------- */
  document.querySelectorAll('[data-road]').forEach(road => {
    const body = road.querySelector('#roadBody');
    const nodes = road.querySelectorAll('.node');
    nodes.forEach(n => n.addEventListener('click', () => {
      nodes.forEach(x => x.classList.remove('active'));
      n.classList.add('active');
      const title = n.textContent.trim() === '?' ? 'Henüz belirlenmedi' : n.textContent.trim();
      body.innerHTML = `<span class="tag ${n.dataset.cls}">${n.dataset.status}</span><h3>${title}</h3><p>${n.dataset.text}</p>`;
      body.style.animation = 'none'; body.offsetHeight; body.style.animation = '';
      if (innerWidth <= 900) body.closest('.road-detail').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }));
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

  /* ---------- Masaüstü mikro etkileşimler ---------- */
  if (reduce || !fine) return;

  const emblem = document.getElementById('emblem');
  const tilt = document.getElementById('tilt');
  if (emblem && tilt) {
    emblem.addEventListener('mousemove', e => {
      const r = emblem.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
    });
    emblem.addEventListener('mouseleave', () => (tilt.style.transform = ''));
  }

  document.querySelectorAll('.magnetic').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    b.addEventListener('mouseleave', () => (b.style.transform = ''));
  });
})();
