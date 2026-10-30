/** Copies text to the clipboard, falling back to a hidden textarea on older browsers and non-secure pages. */
export async function copyText(value: string): Promise<void> {
    try {
        await navigator.clipboard.writeText(value);
    } catch {
        const box = document.createElement('textarea');
        box.value = value;
        box.setAttribute('readonly', '');
        box.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(box);
        box.select();
        try { document.execCommand('copy'); } catch { /* nothing more to try */ }
        box.remove();
    }
}
