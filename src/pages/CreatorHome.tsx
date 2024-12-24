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
      title: "AI automation",
      description: "Hey guys we have 3 top best services for companies to sell everything is set up we only need people's good in getting leads and sales call with return of percentage of sales",
      category: "Artificial Intelligence",
      teamSize: 1,
      stage: "Idea Phase",
      type: "Internship",
      creator: "Harsh Heritash",
      date: "December 23rd",
      isHiring: true
    },
    {
      id: 2,
      title: "Metav Agency",
      description: "A social media marketing agency, we create websites and do facebook ads, i need 4 people, i will send you courses that costs more than 1000 dollars for free to learn, i want to scale our agency to 30m",
      category: "Marketing",
      teamSize: 1,
      stage: "Idea Phase",
      type: "Cofounding",
      creator: "Said Dlili",
      date: "December 23rd",
      isHiring: true
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
