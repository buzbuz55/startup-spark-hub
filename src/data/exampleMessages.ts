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
    text: "Hi! I reviewed the startup proposal you sent. The market analysis looks solid, but I have a few suggestions about the revenue model.",
    timestamp: "10:00 AM",
    status: "read"
  },
  {
    id: "2",
    senderId: "current-user",
    text: "Thanks for looking it over! What aspects of the revenue model need work?",
    timestamp: "10:02 AM",
    status: "delivered"
  },
  {
    id: "3",
    senderId: "other-user",
    text: "I think we should consider a freemium approach instead of pure subscription. Most successful SaaS startups in our space start with a free tier to build user base.",
    timestamp: "10:05 AM",
    status: "read"
  },
  {
    id: "4",
    senderId: "current-user",
    text: "That's a great point! We could offer basic features for free and premium features like advanced analytics and team collaboration in paid tiers.",
    timestamp: "10:07 AM",
    status: "sent"
  },
  {
    id: "5",
    senderId: "other-user",
    text: "Exactly! And we should highlight these premium features in the pitch deck. I've seen similar models work well for early-stage startups.",
    timestamp: "10:10 AM",
    status: "delivered"
  },
  {
    id: "6",
    senderId: "current-user",
    text: "Could you share some examples of successful freemium models in our industry? It would help with the competitive analysis section.",
    timestamp: "10:12 AM",
    status: "sent"
  },
  {
    id: "7",
    senderId: "other-user",
    text: "Sure! I'll put together a quick analysis of 3-4 competitors and their pricing tiers. Should have it ready by tomorrow morning. Would you be free for a call at 11 AM to discuss?",
    timestamp: "10:15 AM",
    status: "read"
  },
  {
    id: "8",
    senderId: "current-user",
    text: "Perfect timing! 11 AM works great. I'll also invite our technical lead to get their input on implementation feasibility.",
    timestamp: "10:17 AM",
    status: "sent"
  }
];