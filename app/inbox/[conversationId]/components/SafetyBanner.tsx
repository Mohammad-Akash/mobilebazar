import { ShieldAlert } from 'lucide-react'

export function SafetyBanner() {
  return (
    <div className="p-3 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl flex items-start gap-2.5 text-xs text-[#77758A] dark:text-[#9B98B2]">
      <ShieldAlert className="w-4 h-4 text-[#7657FF] dark:text-[#8A6FFF] shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <strong className="text-[#17152B] dark:text-[#F7F6F2]">MobileBazar Safety:</strong>{' '}
        Kabhi kisi ko courier ya token ke naam par advance paise na bhejein. Hamesha din ke waqt kisi mehfooz public jagah mil kar phone ki screen, battery aur IMEI check karein.
      </div>
    </div>
  )
}
