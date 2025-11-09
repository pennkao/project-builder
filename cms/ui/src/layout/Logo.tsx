import { YyyIcon } from '@/icons';
export default function Logo({ big = true }: { big?: boolean }) {
    if (big) {
        return (
            <>
                <div className="dark:hidden w-40 h-15 flex flex-row items-center justify-start gap-2">
                    <YyyIcon className="w-8 h-8 " />
                    <div className="text-xl font-bold text-gray-800 dark:text-white">Full CMS</div>
                </div>
                <div className="hidden dark:flex w-40 h10  flex-row items-center justify-start gap-2">
                    <YyyIcon className="w-8 h-8" />
                    <div className="text-xl font-bold text-gray-800 dark:text-white">Full CMS</div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <YyyIcon className="w-8 h-8" />
            </>
        );
    }
}
