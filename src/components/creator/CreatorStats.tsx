const CreatorStats = ({ projectCount }: { projectCount: number }) => {
  return (
    <div className="text-gray-600 mb-6 font-medium">
      {projectCount} {projectCount === 1 ? 'Project' : 'Projects'} matching filters
    </div>
  );
};

export default CreatorStats;