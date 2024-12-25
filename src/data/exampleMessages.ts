import { Message } from "@/types/messages";

export const exampleContacts = [
  {
    id: "1",
    name: "Sarah Miller",
    role: "Product Designer",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Miller&background=random",
    lastMessage: "Let's discuss the startup proposal",
    timestamp: "18:19",
    unreadCount: 2,
    online: true,
  },
  {
    id: "2",
    name: "Tech Innovators Group",
    role: "Project Team",
    avatar: "https://ui-avatars.com/api/?name=Tech+Innovators&background=random",
    lastMessage: "New poll: Meeting time for tomorrow",
    timestamp: "17:42",
    unreadCount: 0,
    online: false,
  },
  {
    id: "3",
    name: "Alex Chen",
    role: "Developer",
    avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=random",
    lastMessage: "Shared project files",
    timestamp: "Yesterday",
    unreadCount: 1,
    online: true,
  },
  {
    id: "4",
    name: "Startup Mentors",
    role: "Advisory Group",
    avatar: "https://ui-avatars.com/api/?name=Startup+Mentors&background=random",
    lastMessage: "Check out the latest resources",
    timestamp: "Yesterday",
    unreadCount: 5,
    online: false,
  },
  {
    id: "5",
    name: "Jessica Wong",
    role: "UX Researcher",
    avatar: "https://ui-avatars.com/api/?name=Jessica+Wong&background=random",
    lastMessage: "Thanks for the feedback!",
    timestamp: "19/8/2024",
    unreadCount: 0,
    online: true,
  }
];

export const exampleMessages: Message[] = [
  {
    id: "1",
    senderId: "other-user",
    text: "Hey! How's the project coming along?",
    timestamp: "10:00 AM",
    status: "read"
  },
  {
    id: "2",
    senderId: "current-user",
    text: "Going great! Just finished the main features.",
    timestamp: "10:05 AM",
    status: "delivered"
  },
  {
    id: "3",
    senderId: "other-user",
    text: "That's awesome! Can you share some screenshots?",
    timestamp: "10:07 AM",
    status: "read"
  },
  {
    id: "4",
    senderId: "current-user",
    text: "Sure! I'll prepare them and send them over shortly.",
    timestamp: "10:10 AM",
    status: "sent"
  },
  {
    id: "5",
    senderId: "other-user",
    text: "Perfect! Also, when are you free for a quick call to discuss the next sprint?",
    timestamp: "10:12 AM",
    status: "delivered"
  },
  {
    id: "6",
    senderId: "current-user",
    text: "I'm available tomorrow between 2-5 PM. Would that work for you?",
    timestamp: "10:15 AM",
    status: "sent"
  },
  {
    id: "7",
    senderId: "other-user",
    text: "Yes, let's do 3 PM tomorrow! I'll send a calendar invite.",
    timestamp: "10:17 AM",
    status: "delivered"
  }
];