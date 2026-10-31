/**
 * Opens the browser's print dialog so the profile can be saved as a PDF ("Save as PDF" / "Save to Files").
 * The print rules in profile.css drop the chrome and the photo galleries; here we force the light palette for paper
 * and name the file, then put the visitor's theme and the tab title back afterwards.
 */
export function exportPdf() {
    const root = document.documentElement;
    const theme = root.dataset.theme;
    const title = document.title;
    root.dataset.theme = 'light';
    document.title = 'Chokchai_T_Profile'; // browsers use the page title as the default PDF file name
    const restore = () => {
        window.removeEventListener('afterprint', restore);
        if (theme) root.dataset.theme = theme; else delete root.dataset.theme;
        document.title = title;
    };
    window.addEventListener('afterprint', restore);
    window.print();
}
