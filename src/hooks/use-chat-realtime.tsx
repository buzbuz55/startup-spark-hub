import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useChatRealtime = (chatId: string | null, isGroup: boolean = false) => {
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!chatId) return;

    const channel = supabase.channel(`room:${chatId}`)
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const online = Object.values(newState).map((presence: any) => presence.user_id);
        setOnlineUsers(online);
      })
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await channel.track({ user_id: user.id, online_at: new Date().toISOString() });
          }
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  const sendTypingIndicator = async () => {
    if (!chatId) return;

    await supabase.channel(`room:${chatId}`).send({
      type: 'broadcast',
      event: 'typing',
      payload: { typing: true },
    });
  };

  return {
    isTyping,
    onlineUsers,
    sendTypingIndicator,
  };
};