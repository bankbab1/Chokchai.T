export type Theme = 'dark' | 'light';
export function initializeTheme(landing = false) {
    const saved = localStorage.getItem('theme');
    document.documentElement.dataset.theme = saved || (landing ? 'dark' : matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}
export function toggleTheme() { const root = document.documentElement; const next: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; root.dataset.theme = next; localStorage.setItem('theme', next); }
export function track(event: string, page: 'index.html' | 'profile_v2.html') {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbxHYbCJNaLoVR3Q5mOruOA5lt15xoNwGWknsWbSlKzcwL_T-wtOJv6wnWzxWVCKAzxqEg/exec';
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
        visitorId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('visitor_id', visitorId);
    }
    const ua = navigator.userAgent;
    let browser = 'Unknown', os = 'Unknown';
    if (/edg/i.test(ua))
        browser = 'Edge';
    else if (/chrome|crios|crmo/i.test(ua))
        browser = 'Chrome';
    else if (/firefox|fxios/i.test(ua))
        browser = 'Firefox';
    else if (/safari/i.test(ua) && !/chrome/i.test(ua))
        browser = 'Safari';
    if (/windows/i.test(ua))
        os = 'Windows';
    else if (/android/i.test(ua))
        os = 'Android';
    else if (/iphone|ipad|ipod/i.test(ua))
        os = 'iOS';
    else if (/mac os/i.test(ua))
        os = 'MacOS';
    else if (page === 'profile_v2.html' && /linux/i.test(ua))
        os = 'Linux';
    void fetch(apiUrl, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ event, visitorId, page, browser, os }), headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => { });
}
export function listeners() { const controller = new AbortController(); return { on: (target: EventTarget, type: string, handler: EventListener) => target.addEventListener(type, handler, { signal: controller.signal }), cleanup: () => controller.abort() }; }
