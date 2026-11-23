'use client'

interface QuickRepliesProps {
  onSelect: (reply: string) => void
  isBuyer: boolean
}

export function QuickReplies({ onSelect, isBuyer }: QuickRepliesProps) {
  const buyerChips = [
    'Is this phone still available?',
    'What is your final price?',
    'Where can we meet to inspect it?',
    'What is the battery health?',
  ]

  const sellerChips = [
    'Yes, it is available.',
    'Price is firm and final.',
    'We can meet during the day to inspect it.',
  ]

  const chips = isBuyer ? buyerChips : sellerChips

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-0.5 scrollbar-none">
      <span className="text-[10px] font-bold text-[#77758A] dark:text-[#9B98B2] shrink-0 uppercase tracking-wider">
        Quick:
      </span>
      {chips.map((chip, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelect(chip)}
          className="py-1 px-2.5 sm:px-3 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#7657FF] text-[#17152B] dark:text-[#F7F6F2] hover:text-[#7657FF] transition-colors shrink-0 shadow-xs active:scale-95 cursor-pointer"
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
