export const exampleMessages = [
  {
    id: "d7bed21c-5a38-4c44-87f5-7b8f3f3c2421",
    senderId: "current-user",
    text: "Hi Sarah, I saw your startup focusing on sustainable agriculture tech. Very impressed with your approach to vertical farming.",
    timestamp: "9:30 AM",
    status: "read" as const,
  },
  {
    id: "e9be0901-6a77-4b55-9644-3a25b56a90c9",
    senderId: "other-user",
    text: "Thank you! Yes, we've developed a proprietary system that reduces water usage by 70% while increasing yield by 40% compared to traditional methods.",
    timestamp: "9:31 AM",
  },
  {
    id: "f1c3a45b-2d89-4e67-8a31-9c45b7c8d3ef",
    senderId: "current-user",
    text: "Those are impressive metrics. What kind of funding round are you currently looking for?",
    timestamp: "9:32 AM",
    status: "delivered" as const,
  },
  {
    id: "a2b4c6d8-e0f2-4a6c-8b0d-9e1f3a5c7b9d",
    senderId: "other-user",
    text: "We're raising a Series A round of $5M to scale our operations. Current revenue is $1.2M ARR with 150% YoY growth.",
    timestamp: "9:33 AM",
  },
  {
    id: "b3d5f7h9-i1k2-4m6n-8p0q-r2t4v6x8z0",
    senderId: "current-user",
    text: "Great traction. Could you share your pitch deck? I'd like to learn more about your expansion plans and unit economics.",
    timestamp: "9:34 AM",
    status: "sent" as const,
  },
];

export const exampleContacts = [
  {
    id: "d7bed21c-5a38-4c44-87f5-7b8f3f3c2421",
    name: "Sarah Chen",
    role: "Founder, AgriTech Solutions",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    lastMessage: "Thank you! Yes, we've developed a proprietary system...",
    timestamp: "9:31 AM",
    unread: 0,
  },
  {
    id: "e9be0901-6a77-4b55-9644-3a25b56a90c9",
    name: "Alex Kumar",
    role: "Founder, HealthTech AI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    lastMessage: "Our AI diagnostic tool has shown 95% accuracy...",
    timestamp: "Yesterday",
    unread: 2,
  },
  {
    id: "f1c3a45b-2d89-4e67-8a31-9c45b7c8d3ef",
    name: "Maria Garcia",
    role: "Founder, EduTech Platform",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    lastMessage: "We're currently serving 50,000 students...",
    timestamp: "2 days ago",
    unread: 0,
  },
];