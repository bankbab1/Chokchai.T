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
        let lockedScrollY: number | null = null;
        const closeSidebar = () => {
            sidebar.classList.remove('open');
            backdrop.classList.remove('show');
            menu.classList.remove('open');
            menu.setAttribute('aria-expanded', 'false');
            if (lockedScrollY !== null) {
                const y = lockedScrollY;
                lockedScrollY = null;
                document.body.classList.remove('no-scroll');
                document.body.style.removeProperty('position');
                document.body.style.removeProperty('top');
                document.body.style.removeProperty('width');
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        };
        events.on(menu, 'click', () => {
            if (sidebar.classList.contains('open')) { closeSidebar(); return; }
            lockedScrollY = window.scrollY;
            window.scrollTo({ top: lockedScrollY, behavior: 'instant' });
            document.body.style.position = 'fixed';
            document.body.style.top = `-${lockedScrollY}px`;
            document.body.style.width = '100%';
            document.body.classList.add('no-scroll');
            sidebar.classList.add('open');
            backdrop.classList.add('show');
            menu.classList.add('open');
            menu.setAttribute('aria-expanded', 'true');
        });
        events.on(backdrop, 'click', closeSidebar);
        let navigationFrame = 0, navLock = '', scrollFrame = 0;
        const animateScroll = (top: number, done: () => void) => {
            cancelAnimationFrame(scrollFrame);
            let from = window.scrollY, dist = top - from;
            // A long jump would scroll past dozens of screenshots and make the browser load and paint all of them.
            // Hop to just short of the target and glide the last stretch instead.
            const reach = window.innerHeight * 1.1;
            if (Math.abs(dist) > reach * 1.5) {
                from = top - Math.sign(dist) * reach;
                window.scrollTo({ top: from, behavior: 'instant' });
                dist = top - from;
            }
            if (matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(dist) < 2) { window.scrollTo({ top, behavior: 'instant' }); done(); return; }
            // One eased glide whatever the distance: longer jumps take a little longer, capped so it never drags.
            const duration = Math.min(700, 300 + Math.abs(dist) * 0.2), start = performance.now();
            const step = (now: number) => {
                const t = Math.min(1, (now - start) / duration), eased = 1 - Math.pow(1 - t, 3);
                window.scrollTo({ top: from + dist * eased, behavior: 'instant' });
                if (t < 1) scrollFrame = requestAnimationFrame(step); else done();
            };
            scrollFrame = requestAnimationFrame(step);
        };
        // A wheel or touch gesture takes over from the glide.
        ['wheel', 'touchstart'].forEach(ev => events.on(window, ev, () => { cancelAnimationFrame(scrollFrame); navLock = ''; }));
        document.querySelectorAll<HTMLAnchorElement>('.nav-link[href^="#"], .brand-home[href="#home"]').forEach(link => events.on(link, 'click', e => {
            const id = link.hash.slice(1), target = byId(id);
            if (!target) return;
            e.preventDefault();
            closeSidebar();
            // Reveal before moving and let Safari restore body layout before measuring.
            target.closest('.reveal')?.classList.add('show');
            cancelAnimationFrame(navigationFrame);
            navigationFrame = requestAnimationFrame(() => {
                navigationFrame = requestAnimationFrame(() => {
                    const mobile = window.innerWidth <= 960;
                    const offset = mobile ? (document.querySelector('.mobile-bar')?.getBoundingClientRect().height ?? 60) + 16 : (document.querySelector('.sidebar')?.getBoundingClientRect().height ?? 64) + 16;
                    const top = id === 'home' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset;
                    // The menu highlights the clicked item at once instead of stepping through every section on the way.
                    navLock = id;
                    nav.forEach(l => l.classList.toggle('active', l.hash === '#' + id));
                    animateScroll(top, () => { navLock = ''; history.replaceState(null, '', '#' + id); });
                });
            });
        }));
        const sections = document.querySelectorAll<HTMLElement>('section[id],header[id]');
        const nav = document.querySelectorAll<HTMLAnchorElement>('.sidebar .nav-link[href^="#"]');
        const active = () => { if (navLock) return; let cur = ''; sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200)
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
        // Hash navigation happens after React has mounted the target section.
        if (location.hash) {
            const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
            if (target) {
                if (target.id === 'home') window.scrollTo({ top: 0, behavior: 'instant' });
                else target.scrollIntoView();
                reveal();
            }
        }
        return () => { events.cleanup(); observer?.disconnect(); cancelAnimationFrame(navigationFrame); closeSidebar(); document.body.classList.remove('no-scroll'); document.documentElement.classList.remove('js'); };
    }, []);
}
