interface AddressProps {
    defaultCountry?: string;
    defaultState?: string;
    defaultCity?: string;
    className?: string;
    onChange?: (country: string, state: string, city: string) => void;
}

interface UserInfoProps extends AddressProps {
    // price: number;
    position?: string;
    buttonText?: string;
    action: (str: string) => void;
    defaultCountry?: CountryType;
}
interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
interface ComboBoxProps {
    name: string;
    options: AddressOptionType[];
    code?: string;
    addrName?: string;
    option: AddressOptionType;
    onUnlock?: () => void;
    isLock?: boolean;
    onChange?: (addr: AddressOptionType) => void;
    onInputChange?: (val: string) => void;
    placeholder?: string;
    className?: string;
}
interface ProductSelectorProps {
    options: ProductOptionType[];
    skus: SKUType[];
    action: (str: string) => void;
    product: ProductType;
}

interface StickyBarProps {
    ref: React.RefObject<HTMLElement>;
    isVisible?: boolean;
    children: React.ReactNode;
    className?: string;
}

interface RichTextViewerProps {
    htmlContent: string;
    className?: string;
}

interface ExchangeItemProps {
    name: string;
    phone: string;
    timeAgo: string;
}

interface SwiperImageProps {
    images: string[];
    // selectIndex?: number;
    autoPlayInterval?: number;
    className?: string;
    onIndexChange?: (index: number) => void;
}

interface MessageBoxProps {
    message: string;
    type?: MessageBoxType;
    visible: boolean;
    onClose: () => void;
    autoCloseMs?: number;
    exitAnimationMs?: number;
}
