import { connection } from 'next/server'
import { requireAdmin } from '@/src/lib/admin/guard'
import { createClient } from '@/src/lib/supabase/server'
import { SettingsClient } from './SettingsClient'

export default async function AdminSettingsPage() {
  await connection()
  await requireAdmin()
  const supabase = await createClient()

  // Fetch current app settings
  const { data: settingsData } = await (supabase as any)
    .from('app_settings')
    .select('key, value')

  const settingsMap: Record<string, any> = {}
  settingsData?.forEach((s: any) => {
    settingsMap[s.key] = s.value
  })

  // Fetch recent settings changes from audit log
  const { data: auditData } = await (supabase as any)
    .from('admin_actions')
    .select('id, actor_id, action, target_id, reason, metadata, created_at, profiles(full_name)')
    .eq('target_type', 'setting')
    .order('created_at', { ascending: false })
    .limit(10)

  const recentChanges = (auditData || []).map((a: any) => ({
    id: a.id,
    key: a.target_id,
    actorName: a.profiles?.full_name || 'Staff',
    reason: a.reason,
    oldValue: a.metadata?.old_value,
    newValue: a.metadata?.new_value,
    createdAt: a.created_at,
  }))

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Application & Abuse Settings
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Tunable limits for report auto-hide thresholds, user limits, and automated spam enforcement.
        </p>
      </div>

      <SettingsClient
        initialSettings={{
          auto_hide_report_threshold: settingsMap['auto_hide_report_threshold'] ?? 3,
          max_active_ads: settingsMap['max_active_ads'] ?? 10,
          spam_enforcement: settingsMap['spam_enforcement'] === true || settingsMap['spam_enforcement'] === 'true',
          spam_flag_score_threshold: settingsMap['spam_flag_score_threshold'] ?? 10,
        }}
        recentChanges={recentChanges}
      />
    </div>
  )
}
