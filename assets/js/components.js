/* Bloomora — shared UI components (masthead header, mega menu, mobile menu, footer, CTA, breadcrumb)
   Injected client-side so markup lives in ONE place across every page (no build tools needed). */
(function(){
  "use strict";

  const NAV = [
    { label:'Home', page:'home', mega:'home', href:'index.html' },
    { label:'About', page:'about', href:'about.html' },
    { label:'Services', page:'services', mega:'services', href:'services.html' },
    { label:'Journal', page:'blog', dropdown:[
        {label:'Journal Index', href:'blog.html'}, {label:'Article', href:'blog-details.html'}
      ]},
    { label:'Pages', page:'pages', dropdown:[
        {label:'Pricing', href:'pricing.html'},
        {label:'Login', href:'login.html'}, {label:'Register', href:'register.html'},
        {label:'Dashboard', href:'dashboard.html'}, {label:'404 Error', href:'404.html'},
        {label:'Coming Soon', href:'coming-soon.html'}
      ]},
    { label:'Contact', page:'contact', href:'contact.html' }
  ];

  function icon(name, cls){ return `<i class="ri-${name} ${cls||''}"></i>`; }
  function num(n){ return `<span class="font-display text-xs text-ink-soft/50">0${n}</span>`; }

  function megaHome(){
    return `<div class="mega-panel absolute left-1/2 top-full z-40 mt-0 w-[440px] -translate-x-1/2 border border-subtle surface shadow-soft dark:shadow-soft-dark">
      <a href="index.html" class="group/item flex items-center justify-between border-b border-subtle px-6 py-4 hover:bg-primary-50/60 dark:hover:bg-white/5 transition">
        <span>${num(1)} <span class="ml-2 font-display text-base">Home — Bouquet Edition</span><span class="block pl-7 text-xs text-ink-soft">Classic petal storefront</span></span>
        <i class="ri-arrow-right-up-line text-ink-soft transition group-hover/item:text-primary-600"></i>
      </a>
      <a href="home-2.html" class="group/item flex items-center justify-between px-6 py-4 hover:bg-primary-50/60 dark:hover:bg-white/5 transition">
        <span>${num(2)} <span class="ml-2 font-display text-base">Home — Gift Edition</span><span class="block pl-7 text-xs text-ink-soft">Bold gifting showcase</span></span>
        <i class="ri-arrow-right-up-line text-ink-soft transition group-hover/item:text-primary-600"></i>
      </a>
    </div>`;
  }

  function megaServices(){
    const items = [
      ['Flower Bouquets','Fresh cut daily','service-details.html'],
      ['Curated Gift Boxes','Themed hampers','premium-hampers.html'],
      ['Plants & Succulents','Low-maintenance green','plants-succulents.html'],
      ['Celebration Cakes','Same-day bakes','celebration-cakes.html'],
      ['Soft Toys & Add-ons','Perfect combo gifts','plushie-combos.html'],
      ['Corporate Gifting','Bulk & branded orders','corporate-gifting.html']
    ];
    const rows = items.map(([t,d,href],i)=>`
      <a href="${href}" class="group/s flex items-center justify-between border-b border-subtle px-6 py-3.5 last:border-b-0 hover:bg-primary-50/60 dark:hover:bg-white/5 transition">
        <span class="flex items-baseline gap-3">${num(i+1)}<span><span class="block font-display text-[15px]">${t}</span><span class="block text-xs text-ink-soft">${d}</span></span></span>
        <i class="ri-arrow-right-up-line text-ink-soft transition group-hover/s:text-primary-600 group-hover/s:translate-x-0.5"></i>
      </a>`).join('');
    return `<div class="mega-panel absolute left-1/2 top-full z-40 mt-0 grid w-[720px] -translate-x-1/2 grid-cols-5 border border-subtle surface shadow-soft dark:shadow-soft-dark">
      <div class="col-span-3">${rows}</div>
      <div class="col-span-2 flex flex-col justify-between border-l border-subtle bg-primary-700 p-6 text-white">
        <div>
          <p class="eyebrow text-accent-300">Right now</p>
          <p class="font-display mt-3 text-xl leading-snug">Order before 4&nbsp;PM for today's delivery slot.</p>
        </div>
        <a href="services.html" class="underline-draw mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold">View all services <i class="ri-arrow-right-line"></i></a>
      </div>
    </div>`;
  }

  function dropdown(items){
    return `<div class="mega-panel absolute left-0 top-full z-40 mt-0 w-56 border border-subtle surface shadow-soft dark:shadow-soft-dark">
      ${items.map(i=>`<a href="${i.href}" class="block border-b border-subtle px-5 py-3 text-sm font-medium last:border-b-0 text-ink hover:bg-primary-50/60 hover:text-primary-700 dark:hover:bg-white/5 transition">${i.label}</a>`).join('')}
    </div>`;
  }

  function navLinkHTML(item, currentPage){
    const active = item.page === currentPage;
    const hasPanel = item.mega || item.dropdown;
    const chevron = hasPanel ? '<i class="ri-arrow-down-s-line text-xs transition group-hover:rotate-180"></i>' : '';
    const base = `underline-draw flex items-center gap-1 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] transition ${active ? 'text-primary-700 dark:text-primary-300' : 'text-ink hover:text-primary-700 dark:hover:text-primary-300'}`;
    let panel = '';
    if(item.mega === 'home') panel = megaHome();
    else if(item.mega === 'services') panel = megaServices();
    else if(item.dropdown) panel = dropdown(item.dropdown);
    return `<li class="relative group">
      <a href="${item.href||'#'}" class="${base}">${item.label}${chevron}</a>
      ${panel}
    </li>`;
  }

  function headerHTML(currentPage){
    const links = NAV.map(i=>navLinkHTML(i,currentPage)).join('');
    return `
    <a href="#main-content" class="skip-link rounded bg-primary-700 px-4 py-2 text-white">Skip to content</a>
    <header class="masthead-header fixed inset-x-0 top-0 z-50">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5 lg:px-8">
        <a href="index.html" class="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <img src="assets/images/logo-icon.svg" alt="Bloomora logo" width="34" height="34" class="h-7 w-7 sm:h-8 sm:w-8" />
          <span class="font-display-italic text-lg sm:text-xl lg:text-2xl">Bloomora</span>
        </a>

        <nav class="hidden lg:block">
          <ul class="flex items-center gap-6 xl:gap-7">${links}</ul>
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          <button id="rtl-toggle" aria-label="Toggle RTL layout" class="magnetic hidden h-9 w-9 shrink-0 place-items-center border border-subtle hover:border-primary-600 hover:text-primary-700 transition lg:grid">
            <i class="ri-text-direction-r text-base"></i>
          </button>
          <a href="login.html" aria-label="Login" class="magnetic hidden h-9 w-9 shrink-0 place-items-center border border-subtle hover:border-primary-600 hover:text-primary-700 transition lg:grid">
            <i class="ri-user-3-line text-base"></i>
          </a>
          <button id="theme-toggle" aria-label="Toggle dark mode" class="magnetic grid h-9 w-9 shrink-0 place-items-center border border-subtle hover:border-primary-600 hover:text-primary-700 transition">
            <i class="ri-sun-line text-base dark:hidden"></i><i class="ri-moon-line text-base hidden dark:inline"></i>
          </button>
          <a href="services.html" class="magnetic hidden shrink-0 items-center gap-1.5 border border-primary-700 bg-primary-700 px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-white transition hover:border-primary-800 hover:bg-primary-800 sm:inline-flex sm:px-5">
            Order now <i class="ri-arrow-right-line"></i>
          </a>
          <button id="mobile-menu-btn" aria-label="Open menu" class="magnetic grid h-9 w-9 shrink-0 place-items-center border border-subtle lg:hidden">
            <i class="ri-menu-3-line text-lg"></i>
          </button>
        </div>
      </div>
    </header>`;
  }

  function mobileMenuHTML(currentPage){
    function acc(item){
      const kids = item.mega === 'home' ? [{label:'Home — Bouquet Edition',href:'index.html'},{label:'Home — Gift Edition',href:'home-2.html'}]
        : item.mega === 'services' ? [
            {label:'All Services',href:'services.html'},
            {label:'Flower Bouquets',href:'service-details.html'},
            {label:'Curated Gift Boxes',href:'premium-hampers.html'},
            {label:'Plants & Succulents',href:'plants-succulents.html'},
            {label:'Celebration Cakes',href:'celebration-cakes.html'},
            {label:'Soft Toys & Add-ons',href:'plushie-combos.html'},
            {label:'Corporate Gifting',href:'corporate-gifting.html'}
          ]
        : item.dropdown;
      if(!kids) return `<li><a href="${item.href}" class="block py-3.5 font-display text-lg ${item.page===currentPage?'text-primary-700':'text-ink'}">${item.label}</a></li>`;
      return `<li class="acc-item border-b border-subtle">
        <button class="acc-trigger flex w-full items-center justify-between py-3.5 font-display text-lg text-ink">${item.label}<i class="ri-add-line acc-chevron text-sm"></i></button>
        <div class="acc-panel"><ul class="pb-2 pl-3">${kids.map(k=>`<li><a href="${k.href}" class="block py-2 text-sm text-ink-soft hover:text-primary-700">${k.label}</a></li>`).join('')}</ul></div>
      </li>`;
    }
    return `
    <div id="mobile-menu-overlay" class="fixed inset-0 z-50 hidden bg-ink-950/40 lg:hidden"></div>
    <aside id="mobile-menu" class="fixed inset-y-0 right-0 z-50 w-full translate-x-full surface shadow-soft-dark transition-transform duration-300 sm:w-[86%] sm:max-w-sm lg:hidden overflow-y-auto" dir-ignore>
      <div class="flex items-center justify-between border-b border-subtle p-5">
        <span class="font-display-italic text-xl">Menu</span>
        <button id="mobile-menu-close" aria-label="Close menu" class="grid h-9 w-9 place-items-center border border-subtle"><i class="ri-close-line text-lg"></i></button>
      </div>
      <ul class="px-5">${NAV.map(acc).join('')}</ul>
      <div class="flex items-center gap-3 px-5 py-4">
        <button id="theme-toggle-mobile" class="flex flex-1 items-center justify-center gap-2 border border-subtle py-2.5 text-sm font-medium"><i class="ri-sun-line dark:hidden"></i><i class="ri-moon-line hidden dark:inline"></i> Theme</button>
        <button id="rtl-toggle-mobile" class="flex flex-1 items-center justify-center gap-2 border border-subtle py-2.5 text-sm font-medium"><i class="ri-text-direction-r"></i> RTL</button>
      </div>
      <div class="px-5 pb-8">
        <a href="services.html" class="flex items-center justify-center gap-2 border border-ink-900 bg-ink-900 py-3 text-sm font-semibold uppercase tracking-wide text-cream-100">Order now</a>
      </div>
    </aside>`;
  }

  function footerHTML(){
    return `
    <footer class="relative border-t border-subtle bg-ink-950 text-white/70">
      <div class="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <p class="font-display-italic text-5xl text-white sm:text-7xl">Bloomora</p>
        <p class="mt-3 max-w-md text-sm text-white/50">Fresh flowers and curated gifts, hand-delivered same day — with live rider tracking so you always know when love arrives.</p>
      </div>
      <div class="mx-auto mt-10 grid max-w-7xl gap-10 border-t border-white/10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <p class="eyebrow text-accent-400">Explore</p>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li><a href="about.html" class="underline-draw">About Us</a></li>
            <li><a href="services.html" class="underline-draw">Our Services</a></li>
            <li><a href="pricing.html" class="underline-draw">Pricing Plans</a></li>
            <li><a href="blog.html" class="underline-draw">Journal</a></li>
            <li><a href="contact.html" class="underline-draw">Contact</a></li>
          </ul>
        </div>
        <div>
          <p class="eyebrow text-accent-400">Services</p>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li><a href="service-details.html" class="underline-draw">Flower Bouquets</a></li>
            <li><a href="premium-hampers.html" class="underline-draw">Gift Hampers</a></li>
            <li><a href="plants-succulents.html" class="underline-draw">Plants &amp; Succulents</a></li>
            <li><a href="celebration-cakes.html" class="underline-draw">Celebration Cakes</a></li>
            <li><a href="dashboard.html" class="underline-draw">Track My Order</a></li>
          </ul>
        </div>
        <div>
          <p class="eyebrow text-accent-400">Studio</p>
          <p class="mt-4 flex items-start gap-2 text-sm text-white/60">${icon('map-pin-2-line', 'mt-0.5')} 21 Rosewood Lane, Bengaluru, IN</p>
          <p class="mt-2 flex items-center gap-2 text-sm text-white/60">${icon('phone-line')} +91 98450 12345</p>
          <div class="mt-5 flex gap-4 text-lg">
            ${['facebook-fill','instagram-line','twitter-x-fill','pinterest-fill'].map(s=>`<a href="#" aria-label="${s}" class="hover:text-primary-300 transition"><i class="ri-${s}"></i></a>`).join('')}
          </div>
        </div>
        <div>
          <p class="eyebrow text-accent-400">Stay in bloom</p>
          <p class="mt-4 text-sm text-white/60">Seasonal offers &amp; gifting ideas, twice a month.</p>
          <form class="mt-4 flex items-center border-b border-white/25 pb-2" onsubmit="return false">
            <input type="email" required placeholder="Your email" class="w-full min-w-0 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none" />
            <button class="magnetic shrink-0 text-white/80 hover:text-white"><i class="ri-arrow-right-line text-lg"></i></button>
          </form>
        </div>
      </div>
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 px-4 py-6 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-8">
        <p>&copy; <span id="footer-year"></span> Bloomora. All rights reserved.</p>
        <div class="flex gap-5"><a href="#" class="hover:text-white/70">Privacy Policy</a><a href="#" class="hover:text-white/70">Terms of Service</a></div>
      </div>
    </footer>`;
  }

  function ctaHTML(el){
    const title = el.dataset.title || 'Send flowers that feel unforgettable';
    const sub = el.dataset.sub || 'Order in under 60 seconds and track your bouquet live, door to door.';
    const btn = el.dataset.btn || 'Start your order';
    const href = el.dataset.href || 'services.html';
    el.innerHTML = `
    <section class="noise-overlay relative overflow-hidden border-y border-subtle bg-primary-700 text-white">
      <div class="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 text-white sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20" data-reveal-group>
        <h2 data-reveal-item class="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">${title}</h2>
        <div data-reveal-item class="lg:pl-8">
          <p class="max-w-md text-white/80">${sub}</p>
          <a href="${href}" class="underline-draw mt-6 inline-flex items-center gap-2 text-lg font-semibold text-white">${btn} <i class="ri-arrow-right-line"></i></a>
          <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-xs font-medium text-white/70">
            <span class="flex items-center gap-1.5"><i class="ri-shield-check-line"></i> Freshness guaranteed</span>
            <span class="flex items-center gap-1.5"><i class="ri-map-pin-time-line"></i> 90+ cities</span>
            <span class="flex items-center gap-1.5"><i class="ri-star-smile-line"></i> 4.9/5 rated</span>
          </div>
        </div>
      </div>
    </section>`;
  }

  function breadcrumbHTML(el){
    const title = el.dataset.title || 'Page Title';
    const parent = el.dataset.parent || 'Home';
    const parentHref = el.dataset.parentHref || 'index.html';
    el.innerHTML = `
    <section class="relative overflow-hidden border-b border-subtle pt-32 pb-12 sm:pt-36 sm:pb-16">
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal-group>
        <div data-reveal-item class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
          <a href="${parentHref}" class="underline-draw hover:text-primary-700">${parent}</a>
          <i class="ri-arrow-right-s-line rtl-flip"></i>
          <span class="text-primary-700 dark:text-primary-300">${title}</span>
        </div>
        <h1 data-reveal-item class="font-display mt-4 text-5xl leading-none sm:text-6xl lg:text-7xl">${title}</h1>
      </div>
    </section>`;
  }

  function initHeaderInteractions(){
    const themeBtns = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')].filter(Boolean);
    themeBtns.forEach(b=>b.addEventListener('click', ()=>window.Bloomora.toggleTheme()));
    const rtlBtns = [document.getElementById('rtl-toggle'), document.getElementById('rtl-toggle-mobile')].filter(Boolean);
    rtlBtns.forEach(b=>b.addEventListener('click', ()=>window.Bloomora.toggleDir()));

    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.getElementById('mobile-menu-close');
    function open(){ menu.classList.remove('translate-x-full'); overlay.classList.remove('hidden'); document.body.style.overflow='hidden'; }
    function close(){ menu.classList.add('translate-x-full'); overlay.classList.add('hidden'); document.body.style.overflow=''; }
    menuBtn && menuBtn.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    overlay && overlay.addEventListener('click', close);

    document.querySelectorAll('.acc-trigger').forEach(t=>{
      t.addEventListener('click', ()=>{
        const item = t.closest('.acc-item');
        const isOpen = item.classList.contains('is-open');
        item.parentElement.querySelectorAll(':scope > .acc-item').forEach(i=>i.classList.remove('is-open'));
        if(!isOpen) item.classList.add('is-open');
      });
    });

    // Generic content tabs (used on service detail pages: Description / What's Included / Care / Reviews)
    document.querySelectorAll('[data-tabs]').forEach(wrap=>{
      const btns = wrap.querySelectorAll('[data-tab-btn]');
      const panels = wrap.querySelectorAll('[data-tab-content]');
      btns.forEach(btn=>{
        btn.addEventListener('click', ()=>{
          const name = btn.dataset.tabBtn;
          btns.forEach(b=>{
            const active = b === btn;
            b.classList.toggle('bg-primary-700', active);
            b.classList.toggle('text-white', active);
            b.classList.toggle('text-ink-soft', !active);
          });
          panels.forEach(p=> p.classList.toggle('hidden', p.dataset.tabContent !== name));
        });
      });
    });

    const yearEl = document.getElementById('footer-year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Magnetic buttons
    document.querySelectorAll('.magnetic').forEach(m=>{
      m.addEventListener('mousemove', (e)=>{
        const r = m.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2, y = e.clientY - r.top - r.height/2;
        m.style.transform = `translate(${x*0.25}px, ${y*0.3}px)`;
      });
      m.addEventListener('mouseleave', ()=>{ m.style.transform=''; });
    });
  }

  function mount(){
    const headerRoot = document.getElementById('site-header');
    if(headerRoot){
      const page = document.body.dataset.page || '';
      headerRoot.innerHTML = headerHTML(page) + mobileMenuHTML(page);
    }
    const footerRoot = document.getElementById('site-footer');
    if(footerRoot) footerRoot.innerHTML = footerHTML();

    document.querySelectorAll('[data-cta]').forEach(ctaHTML);
    document.querySelectorAll('[data-breadcrumb]').forEach(breadcrumbHTML);

    initHeaderInteractions();
    document.dispatchEvent(new CustomEvent('bloomora:mounted'));
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
