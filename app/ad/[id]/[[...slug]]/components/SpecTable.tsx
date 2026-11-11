import { AdDetailWithRelations } from '@/src/lib/data/ads'
import {
  formatCondition,
  formatPtaBadge,
  formatStorage,
  formatWarranty,
} from '@/src/lib/utils/format'
import {
  Smartphone,
  Cpu,
  HardDrive,
  Battery,
  ShieldCheck,
  Package,
  Wrench,
  Palette,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react'

interface SpecTableProps {
  ad: AdDetailWithRelations
}

export function SpecTable({ ad }: SpecTableProps) {
  const pta = formatPtaBadge(ad.pta_status)

  const specs = [
    {
      icon: Smartphone,
      label: 'Brand & Model',
      value: `${ad.brand_name || ''} ${ad.model_name || ''}`.trim() || '—',
      highlight: true,
    },
    {
      icon: ShieldCheck,
      label: 'PTA Status',
      value: pta.label,
      badge: pta.isApproved
        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
    },
    {
      icon: Sparkles,
      label: 'Condition',
      value: formatCondition(ad.condition),
    },
    {
      icon: HardDrive,
      label: 'Storage',
      value: formatStorage(ad.storage_gb),
    },
    {
      icon: Cpu,
      label: 'RAM',
      value: ad.ram_gb ? `${ad.ram_gb} GB` : '—',
    },
    {
      icon: Palette,
      label: 'Color',
      value: ad.color || '—',
    },
    {
      icon: Battery,
      label: 'Battery Health',
      value: ad.battery_health != null ? `${ad.battery_health}% Maximum Capacity` : '—',
      hide: ad.condition === 'new' && ad.battery_health == null,
    },
    {
      icon: Package,
      label: 'Original Box',
      value: ad.has_box ? 'Included' : 'Phone Only',
      accent: ad.has_box,
    },
    {
      icon: Wrench,
      label: 'Accessories & Charger',
      value: ad.has_accessories ? 'Original Included' : 'Not Included',
      accent: ad.has_accessories,
    },
    {
      icon: Clock,
      label: 'Warranty',
      value: formatWarranty(ad.warranty_type, ad.warranty_months_remaining),
    },
  ].filter((s) => !s.hide)

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Verified Phone Specifications</span>
        </h3>
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          Smartphone Standard
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {specs.map((spec) => {
          const Icon = spec.icon
          return (
            <div
              key={spec.label}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 transition-colors hover:border-blue-200 dark:hover:border-blue-900/50"
            >
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shrink-0 shadow-xs text-blue-600 dark:text-blue-400">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
                  {spec.label}
                </span>
                {spec.badge ? (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 mt-1 rounded-full text-xs font-bold ${spec.badge}`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {spec.value}
                  </span>
                ) : (
                  <span className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5 block truncate">
                    {spec.value}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
