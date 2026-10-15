import { useEffect, useState, type ReactNode } from 'react';
import './loading.css';
import { initializeTheme } from '../hooks/shared';

export function LoadingGate({ children, page }: { children: ReactNode; page: 'landing' | 'profile' }) {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        initializeTheme(page === 'landing');
        const timer = window.setTimeout(() => setReady(true), 500);
        return () => clearTimeout(timer);
    }, [page]);
    if (ready) return children;
    return <div className={`page-skeleton ${page}`} role="status" aria-label="Loading page" aria-busy="true">
        <div className="skeleton-content" aria-hidden="true">
            <div className="skeleton-avatar skeleton-block" />
            <div className="skeleton-line skeleton-block title" />
            <div className="skeleton-line skeleton-block subtitle" />
            <div className="skeleton-line skeleton-block" />
            <div className="skeleton-line skeleton-block short" />
            <div className="skeleton-cards"><div className="skeleton-block" /><div className="skeleton-block" /><div className="skeleton-block" /></div>
        </div>
    </div>;
}
