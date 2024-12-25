import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Search, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Contact {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
}

interface ContactsListProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  onGroupSelect?: (group: any) => void;
  defaultContacts?: Contact[];
}

const ContactsList = ({
  selectedChat,
  onSelectChat,
  onGroupSelect,
  defaultContacts = [],
}: ContactsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;

        // Fetch contacts with their profile information
        const { data: contactsData, error } = await supabase
          .from("contacts")
          .select(`
            *,
            contact_profile:profiles!contacts_contact_id_fkey (
              full_name,
              avatar_url,
              email
            )
          `)
          .eq("user_id", user.id);

        if (error) throw error;

        if (contactsData && contactsData.length > 0) {
          // Map the Supabase data to our Contact interface
          const formattedContacts: Contact[] = contactsData.map((contact) => ({
            id: contact.contact_id,
            name: contact.contact_profile?.full_name || "Unknown User",
            avatar: contact.contact_profile?.avatar_url,
            role: contact.contact_profile?.email,
            // You can add these fields later when implementing real-time messaging
            lastMessage: undefined,
            timestamp: undefined,
            unread: 0
          }));
          setContacts(formattedContacts);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (defaultContacts.length === 0) {
      fetchContacts();
    }
  }, [defaultContacts]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg flex flex-col">
      <div className="p-4 border-b">
        <div className="flex gap-2">
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" size="icon">
            <Users className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat === contact.id
                    ? "bg-primary/10"
                    : "hover:bg-muted"
                }`}
                onClick={() => onSelectChat(contact.id)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contact.avatar} />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.role}
                      </p>
                    </div>
                    {contact.timestamp && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {contact.timestamp}
                      </span>
                    )}
                  </div>
                  {contact.lastMessage && (
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {contact.lastMessage}
                    </p>
                  )}
                </div>
                {contact.unread && contact.unread > 0 && (
                  <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              No contacts found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactsList;