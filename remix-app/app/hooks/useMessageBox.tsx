import MessageBox from '@/components/MessageBox';
import { useCallback, useState } from 'react';

export default function useMessageBox() {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<MessageBoxType>('info');
    const [autoCloseMs, setAutoCloseMs] = useState<number>(3000);

    const showMessageBox = useCallback((msg: string, t: MessageBoxType = 'info', autoMs = 50000) => {
        setMessage(msg);
        setType(t);
        setAutoCloseMs(autoMs);
        setVisible(true);
    }, []);

    const hideMessageBox = useCallback(() => {
        setVisible(false);
    }, []);

    const MessageBoxComponent = <MessageBox visible={visible} message={message} type={type} autoCloseMs={autoCloseMs} onClose={hideMessageBox} />;

    return { showMessageBox, hideMessageBox, MessageBoxComponent } as const;
}
