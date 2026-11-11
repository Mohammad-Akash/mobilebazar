'use client'

import { Tag } from 'lucide-react'

interface OfferCardProps {
  amount: number
  isMine: boolean
  onQuickResponse?: (reply: string) => void
}

export function OfferCard({ amount, isMine, onQuickResponse }: OfferCardProps) {
  return (
    <div
      className={`p-4 rounded-2xl border space-y-3 max-w-sm ${
        isMine
          ? 'bg-[#7657FF]/10 border-[#7657FF]/30 ml-auto'
          : 'bg-[#FFFFFF] dark:bg-[#17152B] border-[#E9E7EF] dark:border-[#2D2947]'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#7657FF] text-white flex items-center justify-center">
          <Tag className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7657FF] dark:text-[#8A6FFF]">
            {isMine ? 'Aap Ka Offer' : 'Buyer Ka Offer'}
          </span>
          <h4 className="text-lg font-black text-[#17152B] dark:text-[#F7F6F2] tabular-nums">
            Rs {amount.toLocaleString()}
          </h4>
        </div>
      </div>

      <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2]">
        {isMine
          ? 'Seller ko aap ka offer bhej diya gaya hai.'
          : 'Buyer is qeemat par handset khareedne ka khwahish-mand hai.'}
      </p>

      {/* Quick Action Chips for recipient */}
      {!isMine && onQuickResponse && (
        <div className="flex items-center gap-2 pt-1 border-t border-[#E9E7EF] dark:border-[#2D2947]">
          <button
            type="button"
            onClick={() => onQuickResponse(`Haan, main Rs ${amount.toLocaleString()} par deal ke liye tayyar hun. Kab mil sakte hain?`)}
            className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#159B72] hover:bg-[#12825F] text-white text-[11px] font-bold transition-all"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => onQuickResponse('Shukriya, lekin ye qeemat bohot kam hai. Last thora behtar karein.')}
            className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#E9E7EF] dark:hover:bg-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] text-[11px] font-bold transition-all"
          >
            Counter
          </button>
        </div>
      )}
    </div>
  )
}
