declare module 'react-qr-code' {
    import * as React from 'react';

    export interface QRCodeProps extends React.SVGProps<SVGSVGElement> {
        value: string;
        size?: number;
        bgColor?: React.CSSProperties['backgroundColor'];
        fgColor?: React.CSSProperties['color'];
        level?: 'L' | 'M' | 'H' | 'Q';
        title?: string;
    }

    const QRCode: React.FC<QRCodeProps>;
    export default QRCode;
}
