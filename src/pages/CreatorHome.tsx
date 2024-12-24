import { useState } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search, Plus, Users, MapPin, Filter, SlidersHorizontal, Bookmark, Share2 } from "lucide-react";

const CreatorHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStage, setSelectedStage] = useState("");

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
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Creator Hub
          </h1>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for a specific project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700/50 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="text-gray-300 border-gray-600">
              MY PROJECTS
            </Button>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-gray-700/50 border-gray-600 text-gray-300">
                <SelectValue placeholder="CATEGORY" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="ai">AI & ML</SelectItem>
                <SelectItem value="ecommerce">E-Commerce</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px] bg-gray-700/50 border-gray-600 text-gray-300">
                <SelectValue placeholder="LOCATION" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px] bg-gray-700/50 border-gray-600 text-gray-300">
                <SelectValue placeholder="TEAM SIZE" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 person</SelectItem>
                <SelectItem value="2-5">2-5 people</SelectItem>
                <SelectItem value="5+">5+ people</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-[180px] bg-gray-700/50 border-gray-600 text-gray-300">
                <SelectValue placeholder="STAGE" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idea">Idea Phase</SelectItem>
                <SelectItem value="mvp">MVP</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="text-gray-300 border-gray-600">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Sort by
            </Button>
          </div>
        </div>

        {/* Project Count */}
        <div className="text-gray-400 mb-6">
          Projects matching filters: {projects.length}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-800/50 border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <Badge className="bg-green-600 text-white">
                    {project.type}
                  </Badge>
                  <Badge variant="outline" className="border-orange-500 text-orange-500">
                    {project.stage}
                  </Badge>
                  {project.isHiring && (
                    <Badge className="bg-blue-600 text-white">
                      Hiring
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Team Size: {project.teamSize}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{project.category}</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4 flex justify-between items-center text-sm text-gray-400">
                  <div>
                    <p>Created by {project.creator}</p>
                    <p>Date Posted: {project.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CreatorHome;