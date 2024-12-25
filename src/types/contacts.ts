export interface Contact {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
}

export interface ContactsListProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  onGroupSelect?: (group: any) => void;
  defaultContacts?: Contact[];
}