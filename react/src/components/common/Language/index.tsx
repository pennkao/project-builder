import BaseDropdown from '@/components/common/BaseDropdown';
import { useTranslation } from 'react-i18next';
const Language = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        if (i18n.language === lng) {
            return;
        }
        i18n.changeLanguage(lng);
        localStorage.setItem('google_lang', lng);
    };
    return (
        <BaseDropdown
            options={[
                { label: '中文', value: 'zh' },
                { label: 'English', value: 'en' },
            ]}
            onChange={changeLanguage}
            defaultValue={i18n.language}
        />
    );
};

export default Language;
