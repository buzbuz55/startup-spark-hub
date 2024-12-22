import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface ContactsListProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  onGroupSelect?: (group: any) => void;
}

const ContactsList = ({ selectedChat, onSelectChat, onGroupSelect }: ContactsListProps) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch contacts from the API or database
    const fetchContacts = async () => {
      // Simulated fetch
      const fetchedContacts = [
        { id: "1", name: "John Doe", avatar: "https://example.com/john.jpg" },
        { id: "2", name: "Jane Smith", avatar: "https://example.com/jane.jpg" },
      ];
      setContacts(fetchedContacts);
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <Input
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2"
      />
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {filteredContacts.map(contact => (
            <div
              key={contact.id}
              className={`flex items-center p-2 rounded-lg cursor-pointer ${
                selectedChat === contact.id ? "bg-muted" : ""
              }`}
              onClick={() => onSelectChat(contact.id)}
            >
              <img src={contact.avatar} alt={contact.name} className="h-8 w-8 rounded-full mr-2" />
              <span>{contact.name}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactsList;
