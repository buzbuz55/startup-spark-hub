import { InternProfile } from "./InternProfile";

const interns = [
  {
    name: "Sarah Chen",
    role: "Software Engineering Intern",
    about: "Passionate about creating innovative solutions and learning new technologies! Currently exploring web development and AI. 🚀",
    skills: ["React.js", "TypeScript", "Node.js", "Python", "UI/UX Design"],
    hobbies: ["Fitness", "Reading", "Photography", "Gaming", "Music", "Art"],
    funFacts: [
      "Can solve a Rubik's cube in under 2 minutes! 🎲",
      "Amateur coffee connoisseur ☕",
      "Speaks three languages 🗣️"
    ]
  },
  {
    name: "Alex Rivera",
    role: "Data Science Intern",
    about: "Data enthusiast with a passion for machine learning and statistical analysis. Love turning data into actionable insights! 📊",
    skills: ["Python", "R", "TensorFlow", "SQL", "Data Visualization"],
    hobbies: ["Chess", "Hiking", "Photography", "Cooking", "Piano", "Robotics"],
    funFacts: [
      "Won a national chess tournament 🏆",
      "Makes amazing homemade pasta 🍝",
      "Has visited 20 countries 🌎"
    ]
  },
  {
    name: "Emily Zhang",
    role: "UX Design Intern",
    about: "Creative designer focused on making beautiful, intuitive interfaces. Passionate about accessible design! 🎨",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    hobbies: ["Painting", "Yoga", "Photography", "Pottery", "Gardening", "Dance"],
    funFacts: [
      "Published a children's book 📚",
      "Certified yoga instructor 🧘‍♀️",
      "Can juggle while riding a unicycle 🎪"
    ]
  },
  {
    name: "Jordan Taylor",
    role: "Product Management Intern",
    about: "Strategic thinker with a knack for problem-solving. Love bringing people together to create amazing products! 💡",
    skills: ["Agile", "JIRA", "Product Strategy", "Market Research", "Analytics"],
    hobbies: ["Basketball", "Blogging", "Public Speaking", "Travel", "Chess"],
    funFacts: [
      "Started a successful podcast 🎙️",
      "Former basketball captain 🏀",
      "Makes viral TikTok videos 📱"
    ]
  },
  {
    name: "Aisha Patel",
    role: "Blockchain Developer Intern",
    about: "Crypto enthusiast exploring the future of decentralized technology. Building the web3 revolution! ⛓️",
    skills: ["Solidity", "Web3.js", "Smart Contracts", "DeFi", "Ethereum"],
    hobbies: ["Cryptocurrency Trading", "Rock Climbing", "DJing", "Meditation"],
    funFacts: [
      "Minted an NFT collection 🎨",
      "Meditation retreat leader 🧘",
      "Amateur DJ at local clubs 🎵"
    ]
  },
  {
    name: "Marcus Johnson",
    role: "Cloud Engineering Intern",
    about: "Cloud computing enthusiast with a focus on scalable architecture. Always learning new technologies! ☁️",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Python"],
    hobbies: ["Surfing", "Drone Racing", "3D Printing", "Gaming", "Robotics"],
    funFacts: [
      "Built a smart home system 🏠",
      "Licensed drone pilot 🚁",
      "Competitive gamer 🎮"
    ]
  },
  {
    name: "Sofia Rodriguez",
    role: "Marketing Analytics Intern",
    about: "Data-driven marketer passionate about growth strategies and consumer behavior. Love A/B testing! 📈",
    skills: ["Google Analytics", "SQL", "Python", "Digital Marketing", "SEO"],
    hobbies: ["Salsa Dancing", "Food Blogging", "Photography", "Travel"],
    funFacts: [
      "Viral food blog creator 🍳",
      "Speaks 4 languages 🌍",
      "Professional salsa dancer 💃"
    ]
  },
  {
    name: "Liam O'Connor",
    role: "Mobile Dev Intern",
    about: "Mobile app developer creating seamless experiences for iOS and Android. Love building useful apps! 📱",
    skills: ["Swift", "Kotlin", "React Native", "Firebase", "UI Design"],
    hobbies: ["Mountain Biking", "App Development", "Guitar", "Skiing"],
    funFacts: [
      "Published 5 apps on App Store 📱",
      "Won hackathon gold 🏆",
      "Plays in a band 🎸"
    ]
  },
  {
    name: "Nina Patel",
    role: "AI Research Intern",
    about: "AI researcher exploring the frontiers of machine learning and neural networks. Fascinated by AGI! 🤖",
    skills: ["PyTorch", "TensorFlow", "NLP", "Computer Vision", "Research"],
    hobbies: ["Chess", "Science Fiction Writing", "Quantum Computing", "Art"],
    funFacts: [
      "Published ML research paper 📑",
      "Sci-fi novelist 📚",
      "Quantum computing researcher 🔬"
    ]
  },
  {
    name: "Kai Wong",
    role: "Cybersecurity Intern",
    about: "Security enthusiast protecting digital assets and hunting vulnerabilities. Ethical hacking is my passion! 🔒",
    skills: ["Penetration Testing", "Network Security", "Python", "Linux", "CTF"],
    hobbies: ["CTF Competitions", "Lock Picking", "Martial Arts", "Gaming"],
    funFacts: [
      "Bug bounty hunter 🐛",
      "Black belt in karate 🥋",
      "Built a security lab at home 💻"
    ]
  }
];

const InternGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {interns.map((intern, index) => (
        <InternProfile key={index} {...intern} />
      ))}
    </div>
  );
};

export default InternGrid;