// src/utils/confirm.tsx

import ReactDOM from 'react-dom/client';

export default function Confirm(
    title: string,
    description?: string,
    options?: {
        confirmText?: string;
        cancelText?: string;
        danger?: boolean;
    }
): Promise<boolean> {
    const { confirmText = 'Confirm', cancelText = 'Cancel', danger = true } = options || {};

    return new Promise<boolean>((resolve) => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const handleClose = (result: boolean) => {
            resolve(result);
            root.unmount();
            container.remove();
        };

        const Modal = () => (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-1000">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-80">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
                    <div className="flex justify-start items-center">{description && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>}</div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            onClick={() => handleClose(false)}
                        >
                            {cancelText}
                        </button>
                        <button className={`px-4 py-2 rounded-lg text-white transition ${danger ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`} onClick={() => handleClose(true)}>
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        );

        const root = ReactDOM.createRoot(container);
        root.render(<Modal />);
    });
}
