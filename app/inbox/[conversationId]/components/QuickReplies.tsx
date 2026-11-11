'use client'

interface QuickRepliesProps {
  onSelect: (reply: string) => void
  isBuyer: boolean
}

export function QuickReplies({ onSelect, isBuyer }: QuickRepliesProps) {
  const buyerChips = [
    'Kya ye handset abhi available hai?',
    'Last final qeemat kitni hogi?',
    'Kahan mil kar check kar sakte hain?',
    'Battery health kitni hai?',
  ]

  const sellerChips = [
    'Ji bilkul, handset available hai.',
    'Price final hai bhai, mazeed gunjaish nahi.',
    'Aap kal din ke waqt mil kar check kar lein.',
  ]

  const chips = isBuyer ? buyerChips : sellerChips

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
      <span className="text-[10px] font-bold text-[#77758A] dark:text-[#9B98B2] shrink-0 uppercase tracking-wider">
        Quick:
      </span>
      {chips.map((chip, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelect(chip)}
          className="py-1 px-3 rounded-full text-xs font-medium whitespace-nowrap bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#7657FF] text-[#17152B] dark:text-[#F7F6F2] hover:text-[#7657FF] transition-colors shrink-0 shadow-xs"
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
