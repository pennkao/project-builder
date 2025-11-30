import { Activity } from 'react';
export default function LoadingOverlay({ show }: { show: boolean }) {
    if (!show) return null;
    return (
        <Activity mode={show ? 'visible' : 'hidden'}>
            <div className="fixed inset-0  items-center justify-center bg-black/40 z-999 w-full h-full flex">
                <div className="w-12 h-12 border-4 border-white/90 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </Activity>
    );
}
