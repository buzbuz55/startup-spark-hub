export interface Contact {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount: number;
  online: boolean;
}

export interface ContactsListProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  defaultContacts?: Contact[];
}