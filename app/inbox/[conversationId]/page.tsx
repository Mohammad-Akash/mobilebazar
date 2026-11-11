import { notFound, redirect } from 'next/navigation'
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
  const { conversationId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/inbox/${conversationId}`)
  }

  const details = await getConversationDetails(conversationId)

  if (!details || !details.ad) {
    notFound()
  }

  // Ensure current user is participant
  if (details.buyer_id !== user.id && details.seller_id !== user.id) {
    notFound()
  }

  const initialMessages = await getMessages(conversationId, undefined, undefined, 40)

  return (
    <div className="py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ThreadClient
        conversationId={conversationId}
        currentUserId={user.id}
        isBuyer={details.isBuyer}
        ad={details.ad}
        otherUser={details.otherUser}
        initialMessages={initialMessages}
      />
    </div>
  )
}
