import { notFound, redirect } from 'next/navigation'
import { connection } from 'next/server'
import type { Metadata } from 'next'
import { createClient } from '@/src/lib/supabase/server'
import { getConversationDetails, getMessages } from '@/src/lib/data/chat'
import { ThreadClient } from './ThreadClient'

interface ConversationPageProps {
  params: Promise<{
    conversationId: string
  }>
}

export async function generateMetadata({
  params,
}: ConversationPageProps): Promise<Metadata> {
  await connection()
  const { conversationId } = await params
  const details = await getConversationDetails(conversationId)

  if (!details) {
    return { title: 'Conversation Not Found' }
  }

  const title = `Chat: ${details.ad?.title || 'Handset'} — MobileBazar`
  return {
    title,
    robots: { index: false, follow: false },
  }
}

export const instant = false

export default async function ConversationPage({ params }: ConversationPageProps) {
  await connection()
  const { conversationId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/inbox/${conversationId}`)
  }

  const details = await getConversationDetails(conversationId)

  if (!details) {
    notFound()
  }

  // Ensure current user is participant
  if (details.buyer_id !== user.id && details.seller_id !== user.id) {
    notFound()
  }

  const initialMessages = await getMessages(conversationId, undefined, undefined, 40)

  return (
    <div className="p-0 sm:py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ThreadClient
        conversationId={conversationId}
        currentUserId={user.id}
        isBuyer={details.isBuyer}
        ad={details.ad}
        otherUser={details.otherUser}
        initialMessages={initialMessages}
        initialOtherLastReadAt={details.other_last_read_at || null}
      />
    </div>
  )
}
