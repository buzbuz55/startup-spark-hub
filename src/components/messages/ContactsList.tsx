import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { Contact, ContactsListProps } from "@/types/contacts";
import SearchBar from "./SearchBar";
import ContactCard from "./ContactCard";

const ContactsList = ({
  selectedChat,
  onSelectChat,
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
          const formattedContacts: Contact[] = contactsData.map((contact) => ({
            id: contact.contact_id,
            name: contact.contact_profile?.full_name || "Unknown User",
            avatar: contact.contact_profile?.avatar_url,
            role: contact.contact_profile?.email,
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
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                isSelected={selectedChat === contact.id}
                onClick={() => onSelectChat(contact.id)}
              />
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