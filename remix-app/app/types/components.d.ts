interface AddressProps {
    defaultCountry?: string;
    defaultState?: string;
    defaultCity?: string;
    className?: string;
    onChange?: (country: string, state: string, city: string) => void;
}

interface UserInfoProps extends AddressProps {
    // price: number;
    action: (str: string) => void;
    // attributesSort: string[];
}
interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
interface ComboBoxProps {
    options: OptionType[];
    value?: string;
    mustSelect?: boolean;
    onChange?: (val: string) => void;
    placeholder?: string;
    className?: string;
}
