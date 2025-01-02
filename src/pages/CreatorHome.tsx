import { useState } from "react";
import Header from "@/components/Header";
import CreatorHeader from "@/components/creator/CreatorHeader";
import CreatorFilters from "@/components/creator/CreatorFilters";
import CreatorStats from "@/components/creator/CreatorStats";
import ProjectGrid from "@/components/creator/ProjectGrid";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import Footer from "@/components/Footer";

const CreatorHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Nature's Honest - Sustainable Farming Platform",
      description: "Building a mobile application that connects local farmers with consumers, promoting sustainable farming practices. The platform will enable direct farm-to-table purchases, reducing food miles and supporting local agriculture.",
      category: "Sustainability",
      teamSize: 4,
      stage: "MVP Stage",
      type: "Startup",
      creator: "Sarah Green",
      date: "March 2024",
      isHiring: true,
      website_url: "https://natureshonest.com"
    },
    {
      id: 2,
      title: "CleanAirNow - Air Quality Monitoring",
      description: "Developing an IoT-based air quality monitoring system with real-time data analytics. Our platform helps cities and communities track and improve air quality through advanced sensor networks and predictive modeling.",
      category: "Environmental Tech",
      teamSize: 5,
      stage: "Growth Stage",
      type: "Startup",
      creator: "Michael Chen",
      date: "March 2024",
      isHiring: true,
      website_url: "https://cleanairnow.tech"
    },
    {
      id: 3,
      title: "SmartPodUp - Podcast Creation Platform",
      description: "Creating an all-in-one platform for podcast creation, editing, and distribution. Features include AI-powered editing tools, automated transcription, and analytics dashboard for content creators.",
      category: "Media Tech",
      teamSize: 3,
      stage: "MVP Stage",
      type: "Startup",
      creator: "Alex Rivera",
      date: "March 2024",
      isHiring: true,
      website_url: "https://smartpodup.io"
    },
    {
      id: 4,
      title: "Blu Exchange - B2B Food Marketplace",
      description: "Building a wholesale food marketplace connecting suppliers directly with restaurants and retailers. Our platform streamlines ordering, logistics, and inventory management for the food service industry.",
      category: "E-commerce",
      teamSize: 6,
      stage: "Growth Stage",
      type: "Startup",
      creator: "David Kim",
      date: "March 2024",
      isHiring: true,
      website_url: "https://bluexchange.com"
    },
    {
      id: 5,
      title: "Liquidize - Water Management Platform",
      description: "Developing an innovative water purification and management system using AI and IoT. Our solution helps businesses and communities optimize water usage and ensure water quality compliance.",
      category: "CleanTech",
      teamSize: 4,
      stage: "Idea Stage",
      type: "Startup",
      creator: "Emma Watson",
      date: "March 2024",
      isHiring: true,
      website_url: "https://liquidize.tech"
    },
    {
      id: 6,
      title: "Dropshippee - E-commerce Automation",
      description: "Creating an advanced dropshipping platform that automates inventory management, order fulfillment, and supplier relationships. Features include AI-powered product selection and market analysis tools.",
      category: "E-commerce",
      teamSize: 5,
      stage: "MVP Stage",
      type: "Startup",
      creator: "James Wilson",
      date: "March 2024",
      isHiring: true,
      website_url: "https://dropshippee.com"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <CreatorHeader onCreateProject={() => setIsCreateDialogOpen(true)} />
        
        <CreatorFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStage={selectedStage}
          onStageChange={setSelectedStage}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <CreatorStats projectCount={projects.length} />
        <ProjectGrid projects={projects} />
      </main>

      <Footer />

      <CreateProjectDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default CreatorHome;