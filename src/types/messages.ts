export type MessageStatus = "sent" | "delivered" | "read";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status?: MessageStatus;
  encrypted_content?: string;
}