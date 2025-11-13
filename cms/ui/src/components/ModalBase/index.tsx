import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal';

const ModalBase = ({
    isOpen,
    title,
    // onChange,
    // openModal,
    closeModal,
    tips,
    // toggleModal,
    doAction,
    children,
}: {
    title: string;
    tips: string;
    isOpen: boolean;
    children: React.ReactNode;
    onChange: (data: any) => void;
    openModal?: () => void;
    doAction?: () => void;
    closeModal: () => void;
    toggleModal?: () => void;
}) => {
    const handleAction = () => {
        doAction?.();
    };
    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{title}</h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">{tips}</p>
                </div>
                <div className="w-full h-[400px]  dark:bg-gray-700">{children}</div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={closeModal}>
                        Close
                    </Button>
                    <Button size="sm" onClick={handleAction}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
export default ModalBase;
