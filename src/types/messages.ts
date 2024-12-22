export type MessageStatus = "sent" | "delivered" | "read";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status?: MessageStatus;
  encrypted_content?: string;
  receiverId?: string;
  groupId?: string;
}

export interface MessageData {
  content: string;
  sender_id: string;
  receiver_id: string; // Changed from optional to required
  group_id?: string;
  status?: string;
  message_type?: string;
  metadata?: any;
}

// Helper function to create message data
export const createMessageData = (
  content: string,
  senderId: string,
  receiverId: string,
  groupId?: string
): MessageData => {
  const baseData = {
    content,
    sender_id: senderId,
    receiver_id: receiverId,
    status: 'sent',
  };

  return groupId ? { ...baseData, group_id: groupId } : baseData;
};