import { useTranslation } from 'react-i18next';

const Language = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div style={{ padding: 20 }}>
            <button onClick={() => changeLanguage('zh')}>中文</button>
            <button onClick={() => changeLanguage('en')}>English</button>
        </div>
    );
};

export default Language;
