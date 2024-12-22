import { useState, useMemo } from "react";
import { InternProfile } from "./InternProfile";
import TalentSearch from "./TalentSearch";
import { interns } from "@/data/interns";
import type { InternProfile as InternProfileType } from "@/types/intern";

const InternGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");

  const filteredAndSortedInterns = useMemo(() => {
    let filtered = interns;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = interns.filter(
        intern =>
          intern.name.toLowerCase().includes(query) ||
          intern.role.toLowerCase().includes(query) ||
          intern.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    return [...filtered].sort((a, b) => {
      switch (sortCriteria) {
        case "name":
          return a.name.localeCompare(b.name);
        case "role":
          return a.role.localeCompare(b.role);
        case "skills":
          return a.skills[0].localeCompare(b.skills[0]);
        default:
          return 0;
      }
    });
  }, [searchQuery, sortCriteria]);

  return (
    <div>
      <TalentSearch
        onSearch={setSearchQuery}
        onSort={setSortCriteria}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedInterns.map((intern, index) => (
          <InternProfile key={index} {...intern} />
        ))}
      </div>
    </div>
  );
};

export default InternGrid;