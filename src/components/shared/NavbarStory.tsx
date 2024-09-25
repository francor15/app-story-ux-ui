
import SecondaryButton from '../ui/SecondaryButton'
import PrimaryButton from '../ui/PrimaryButton'
import { IconDownload, IconPlus, IconExternal, IconSave } from '../../../public/Icons'

export default function NavbarStory() {
    return (
        <nav className="h-14 border-b rounded-t-xl border-gray-800 bg-gray-950">
            <div className="flex items-center justify-between h-full px-2.5 md:px-4">
                <div className="inline-flex items-center gap-2">
                    <PrimaryButton icon={<IconSave className="text-base" />} title="Save Story" />
                    <SecondaryButton icon={<IconDownload className="text-lg" />} title="Download" />
                </div>
                <div className='inline-flex items-center gap-3'>
                    <SecondaryButton icon={<IconPlus className="text-xl" />} title="New Story" />
                    <PrimaryButton icon={<IconExternal className="text-base order-2" />} title="Go Take a Quiz" />
                </div>
            </div>
        </nav >
    )
}
