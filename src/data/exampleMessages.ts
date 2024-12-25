import { Message } from "@/types/messages";

export const exampleContacts = [
  {
    id: "1",
    name: "Sarah Miller",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Miller&background=random",
    lastMessage: "Let's discuss the startup proposal",
    timestamp: "18:19",
    unreadCount: 2,
    online: true,
  },
  {
    id: "2",
    name: "Tech Innovators Group",
    avatar: "https://ui-avatars.com/api/?name=Tech+Innovators&background=random",
    lastMessage: "New poll: Meeting time for tomorrow",
    timestamp: "17:42",
    unreadCount: 0,
    online: false,
  },
  {
    id: "3",
    name: "Alex Chen",
    avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=random",
    lastMessage: "Shared project files",
    timestamp: "Yesterday",
    unreadCount: 1,
    online: true,
  },
  {
    id: "4",
    name: "Startup Mentors",
    avatar: "https://ui-avatars.com/api/?name=Startup+Mentors&background=random",
    lastMessage: "Check out the latest resources",
    timestamp: "Yesterday",
    unreadCount: 5,
    online: false,
  },
  {
    id: "5",
    name: "Jessica Wong",
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
    timestamp: "10:00 AM"
  },
  {
    id: "2",
    senderId: "current-user",
    text: "Going great! Just finished the main features.",
    timestamp: "10:05 AM"
  }
];