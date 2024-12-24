import { Search } from "lucide-react";

const SearchHeader = () => {
  return (
    <div className="pt-24 pb-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <Search className="w-12 h-12 text-primary mb-2" />
        <h1 className="text-4xl font-bold">Discover Projects</h1>
        <p className="text-muted-foreground max-w-2xl">
          Find innovative projects and connect with talented creators. Use the filters below to narrow down your search.
        </p>
      </div>
    </div>
  );
};

export default SearchHeader;