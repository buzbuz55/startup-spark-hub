import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import ProjectFilters from "@/components/projects/ProjectFilters";
import SearchHeader from "@/components/search/SearchHeader";
import SearchResults from "@/components/search/SearchResults";
import type { Project } from "@/components/projects/ProjectCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('status', 'active');

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Project[];
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4">
        <SearchHeader />
        
        <div className="space-y-8">
          <ProjectFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <SearchResults 
            projects={projects} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
};

export default Search;