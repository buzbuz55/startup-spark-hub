const CreatorStats = ({ projectCount }: { projectCount: number }) => {
  return (
    <div className="text-gray-600 mb-6">
      Projects matching filters: {projectCount}
    </div>
  );
};

export default CreatorStats;