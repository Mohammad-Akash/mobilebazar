import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/src/lib/supabase/server'
import { getConversations } from '@/src/lib/data/chat'
import { InboxClient } from './InboxClient'

export const metadata: Metadata = {
  title: 'Inbox — MobileBazar',
  description: 'Manage your direct smartphone buying and selling conversations on MobileBazar.',
}

export const instant = false

export default async function InboxPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/inbox')
  }

  const initialConversations = await getConversations('all')

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <InboxClient initialConversations={initialConversations} />
    </div>
  )
}
