import { AdDetailWithRelations } from '@/src/lib/data/ads'
import {
  formatCondition,
  formatPtaBadge,
  formatStorage,
  formatWarranty,
} from '@/src/lib/utils/format'

interface SpecTableProps {
  ad: AdDetailWithRelations
}

export function SpecTable({ ad }: SpecTableProps) {
  const pta = formatPtaBadge(ad.pta_status)

  const specs = [
    { label: 'Brand', value: ad.brand_name || '—' },
    { label: 'Model', value: ad.model_name || '—' },
    { label: 'Condition', value: formatCondition(ad.condition) },
    { label: 'PTA Status', value: pta.label },
    { label: 'Storage', value: formatStorage(ad.storage_gb) },
    { label: 'RAM', value: ad.ram_gb ? `${ad.ram_gb}GB` : '—' },
    { label: 'Color', value: ad.color || '—' },
    {
      label: 'Battery Health',
      value: ad.battery_health != null ? `${ad.battery_health}%` : '—',
      hide: ad.condition === 'new' && ad.battery_health == null,
    },
    { label: 'Original Box', value: ad.has_box ? 'Yes ✓' : 'No' },
    {
      label: 'Accessories',
      value: ad.has_accessories ? 'Yes ✓' : 'No',
    },
    {
      label: 'Warranty',
      value: formatWarranty(ad.warranty_type, ad.warranty_months_remaining),
    },
  ].filter((s) => !s.hide)

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
        <span>⚙️</span>
        <span>Phone Specifications</span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
        {specs.map((spec) => (
          <div key={spec.label} className="border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
            <span className="text-xs text-zinc-400 block font-medium">{spec.label}</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

