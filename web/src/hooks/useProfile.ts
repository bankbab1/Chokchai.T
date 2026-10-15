import { useEffect } from 'react';
import { initializeTheme, toggleTheme, track, listeners } from './shared';
export function useProfile() {
    useEffect(() => {
        initializeTheme();
        const events = listeners();
        const byId = (id: string) => document.getElementById(id)!;
        events.on(byId('themeToggle'), 'click', toggleTheme);
        events.on(byId('themeToggleMobile'), 'click', toggleTheme);
        const sidebar = byId('sidebar'), backdrop = byId('sidebarBackdrop'), menu = byId('menuBtn');
        const closeSidebar = () => { sidebar.classList.remove('open'); backdrop.classList.remove('show'); menu.classList.remove('open'); document.body.classList.remove('no-scroll'); menu.setAttribute('aria-expanded', 'false'); };
        events.on(menu, 'click', () => { if (sidebar.classList.contains('open'))
            closeSidebar();
        else {
            sidebar.classList.add('open');
            backdrop.classList.add('show');
            menu.classList.add('open');
            document.body.classList.add('no-scroll');
            menu.setAttribute('aria-expanded', 'true');
        } });
        events.on(backdrop, 'click', closeSidebar);
        const timeouts: number[] = [];
        document.querySelectorAll<HTMLAnchorElement>('.nav-link[href^="#"]').forEach(link => events.on(link, 'click', e => { const id = link.hash.slice(1), target = byId(id); if (!target)
            return; e.preventDefault(); closeSidebar(); timeouts.push(window.setTimeout(() => { const offset = window.innerWidth <= 960 ? (document.querySelector('.mobile-bar')?.getBoundingClientRect().height ?? 60) + 16 : 24; window.scrollTo({ top: id === 'home' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }, 60)); }));
        const sections = document.querySelectorAll<HTMLElement>('section[id],header[id]');
        const nav = document.querySelectorAll<HTMLAnchorElement>('.sidebar .nav-link[href^="#"]');
        const active = () => { let cur = ''; sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200)
            cur = s.id; }); nav.forEach(l => l.classList.toggle('active', l.hash === '#' + cur)); };
        events.on(window, 'scroll', active);
        active();
        const reveals = document.querySelectorAll<HTMLElement>('.reveal');
        let observer: IntersectionObserver | undefined;
        const reveal = () => reveals.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight + 160 && r.bottom > -120)
            el.classList.add('show'); });
        if (matchMedia('(max-width:960px),(hover:none)').matches || !('IntersectionObserver' in window))
            reveals.forEach(el => el.classList.add('show'));
        else {
            document.documentElement.classList.add('js');
            observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting)
                e.target.classList.add('show'); }), { threshold: .01, rootMargin: '160px 0px 160px 0px' });
            reveals.forEach(el => observer!.observe(el));
            reveal();
            events.on(window, 'scroll', reveal);
            events.on(window, 'resize', reveal);
            events.on(window, 'orientationchange', reveal);
        }
        const now = new Date();
        let age = now.getFullYear() - 1994;
        if (now.getMonth() < 3 || (now.getMonth() === 3 && now.getDate() < 17))
            age--;
        byId('ageVal').textContent = age + ' yrs';
        const lb = byId('lightbox'), lbImg = byId('lbImg') as HTMLImageElement;
        let group: HTMLImageElement[] = [], idx = 0;
        const show = (i: number) => { if (!group.length)
            return; idx = (i + group.length) % group.length; lbImg.src = group[idx].src; lbImg.alt = group[idx].alt; byId('lbCounter').textContent = `${idx + 1} / ${group.length}`; };
        const close = () => { lb.classList.remove('open'); document.body.classList.remove('no-scroll'); };
        document.querySelectorAll<HTMLElement>('.gallery').forEach(g => events.on(g, 'click', e => { const img = (e.target as HTMLElement).closest('img'); if (!img)
            return; group = Array.from(g.querySelectorAll('img')); show(group.indexOf(img)); lb.classList.add('open'); document.body.classList.add('no-scroll'); }));
        events.on(byId('lbClose'), 'click', close);
        events.on(byId('lbPrev'), 'click', e => { e.stopPropagation(); show(idx - 1); });
        events.on(byId('lbNext'), 'click', e => { e.stopPropagation(); show(idx + 1); });
        events.on(lb, 'click', e => { if (e.target === lb)
            close(); });
        events.on(document, 'keydown', e => { const key = (e as KeyboardEvent).key; if (key === 'Escape') {
            closeSidebar();
            close();
        } if (!lb.classList.contains('open'))
            return; if (key === 'ArrowLeft')
            show(idx - 1);
        else if (key === 'ArrowRight')
            show(idx + 1); });
        // Preserve the historical Google Sheets page label and exact event names.
        track('Profile Page Viewed', 'profile_v2.html');
        let scrolled = false, bottom = false;
        events.on(window, 'scroll', () => { if (!scrolled) {
            scrolled = true;
            track('Profile Page Scrolled', 'profile_v2.html');
        } if (!bottom && window.scrollY + window.innerHeight >= document.body.offsetHeight - 50) {
            bottom = true;
            track('Profile Page Bottom Reached', 'profile_v2.html');
        } });
        const abort = new AbortController();
        let lastPrice: number | null = null;
        const btc = async () => { try {
            const [p, s] = await Promise.all([fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', { signal: abort.signal }).then(r => r.json()), fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT', { signal: abort.signal }).then(r => r.json())]);
            if (abort.signal.aborted)
                return;
            const cur = Number(p.price), chp = Number(s.priceChangePercent), ch = Number(s.priceChange);
            if (!Number.isFinite(cur) || !Number.isFinite(chp) || !Number.isFinite(ch))
                return;
            const trend = lastPrice === null ? 'var(--text)' : cur > lastPrice ? '#2ebd85' : cur < lastPrice ? '#f6465d' : 'var(--text)';
            lastPrice = cur;
            byId('crypto-prices').innerHTML = `<h5><i class="fa-brands fa-bitcoin" style="color:#f7931a;margin-right:6px"></i>BTCUSDT</h5><div style="font-size:1.35rem;font-weight:600;font-family:var(--font-display);color:${trend}">$${cur.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div><div style="font-size:.78rem;color:var(--text3);margin-top:6px">24h Change</div><div style="font-size:.85rem;color:${chp >= 0 ? '#2ebd85' : '#f6465d'};font-weight:500">${ch.toFixed(2)} (${chp.toFixed(2)}%)</div>`;
        }
        catch { } };
        void btc();
        const timer = window.setInterval(() => void btc(), 5000);
        // Hash navigation happens after React has mounted the target section.
        if (location.hash) {
            const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
            if (target) {
                if (target.id === 'home') window.scrollTo({ top: 0, behavior: 'instant' });
                else target.scrollIntoView();
                reveal();
            }
        }
        return () => { events.cleanup(); observer?.disconnect(); clearInterval(timer); abort.abort(); timeouts.forEach(clearTimeout); document.body.classList.remove('no-scroll'); document.documentElement.classList.remove('js'); };
    }, []);
}
