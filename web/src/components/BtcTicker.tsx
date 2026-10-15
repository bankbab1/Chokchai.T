import { useEffect, useState } from 'react';

type Quote = { price: number; change: number | null; percent: number | null; updated: Date; source: string; currency: string };
const endpoints = ['https://data-api.binance.vision', 'https://api.binance.com'];
export function BtcTicker() {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [busy, setBusy] = useState(true);
    const [failed, setFailed] = useState(false);
    const [retry, setRetry] = useState(0);
    useEffect(() => {
        let stopped = false;
        let timer: number;
        let active: AbortController | undefined;
        async function refresh() {
            setBusy(true);
            let next: Quote | undefined;
            for (const endpoint of endpoints) {
                if (stopped) return;
                const controller = new AbortController();
                active = controller;
                const timeout = window.setTimeout(() => controller.abort(), 4000);
                try {
                    const response = await fetch(`${endpoint}/api/v3/ticker/24hr?symbol=BTCUSDT`, { signal: controller.signal });
                    if (!response.ok) throw new Error('Price service unavailable');
                    const data = await response.json();
                    const price = Number(data.lastPrice), change = Number(data.priceChange), percent = Number(data.priceChangePercent);
                    if (data.lastPrice == null || data.priceChange == null || data.priceChangePercent == null || !Number.isFinite(price) || price <= 0 || !Number.isFinite(change) || !Number.isFinite(percent)) throw new Error('Invalid price response');
                    next = { price, change, percent, updated: new Date(), source: 'Binance', currency: 'USDT' };
                    break;
                } catch { /* Try the other official public endpoint. */ }
                finally { clearTimeout(timeout); }
            }
            if (!next && !stopped) {
                const controller = new AbortController();
                active = controller;
                const timeout = window.setTimeout(() => controller.abort(), 4000);
                try {
                    const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot', { signal: controller.signal });
                    if (!response.ok) throw new Error('Unavailable');
                    const data = await response.json();
                    const price = Number(data.data?.amount);
                    if (!Number.isFinite(price) || price <= 0 || data.data?.currency !== 'USD') throw new Error('Invalid quote');
                    next = { price, change: null, percent: null, updated: new Date(), source: 'Coinbase', currency: 'USD' };
                } catch { /* Show an explicit unavailable state if every source fails. */ }
                finally { clearTimeout(timeout); }
            }
            if (stopped) return;
            if (next) setQuote(next);
            setFailed(!next);
            setBusy(false);
            timer = window.setTimeout(() => void refresh(), 15000);
        }
        const online = () => setRetry(value => value + 1);
        window.addEventListener('online', online);
        void refresh();
        return () => { stopped = true; window.removeEventListener('online', online); active?.abort(); clearTimeout(timer); };
    }, [retry]);
    const number = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return <div id="crypto-prices" className="btc-card" aria-label="Bitcoin market price">
        <h5><i className="fa-brands fa-bitcoin" style={{ color: '#f7931a', marginRight: 6 }} aria-hidden="true" />BTC / {quote?.currency ?? 'USDT'}</h5>
        <div className="btc-price">{quote ? `$${number(quote.price)}` : '—'}</div>
        {quote && quote.percent !== null && quote.change !== null && <><div className="btc-label">24h Change</div><div className="btc-change" style={{ color: quote.percent >= 0 ? '#16835e' : '#d93248' }}>{quote.change >= 0 ? '+' : ''}{number(quote.change)} ({quote.percent >= 0 ? '+' : ''}{quote.percent.toFixed(2)}%)</div></>}
        {quote && quote.percent === null && <div className="btc-label">Spot price · 24h change unavailable</div>}
        <p className="btc-status" role="status">{busy && !quote ? 'Loading Bitcoin price…' : failed ? quote ? 'Update unavailable · showing last received price' : 'Live price unavailable. Please try again.' : quote ? `${quote.source} · updated ${quote.updated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}</p>
        {failed && <button type="button" className="btc-retry" disabled={busy} onClick={() => setRetry(value => value + 1)}>{busy ? 'Retrying…' : 'Retry'}</button>}
    </div>;
}
