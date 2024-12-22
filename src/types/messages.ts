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
  receiver_id?: string;
  group_id?: string;
  status?: string;
  message_type?: string;
  metadata?: any;
}