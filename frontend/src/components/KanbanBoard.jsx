import React, { useState } from 'react';
import IssueCard from './IssueCard';

const KanbanBoard = ({ issues }) => {
  const [backlog, setBacklog] = useState([]);
  const [render20, setRender20] = useState(true)

  // Function to sort issues and set them to the backlog
  const sortIssues = (issues) => {
    const sortedBacklog = issues.filter(issue => {
      const hasPriority = issue.labels.includes('priority');
      const hasBug = issue.labels.includes('bug');
      const isMilestone = issue.milestone !== 'No milestone';
      return !(hasPriority || hasBug || isMilestone);
    });
    setBacklog(sortedBacklog);
  };

  React.useEffect(() => {
    sortIssues(issues);
  }, [issues]);

  const handleClick = () => {
    setRender20(!render20)
}

  return (
    <div className="kanban-board">
      <div className="kanban-column">
        {render20 ? (backlog.slice(0, 20).map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))) 
        : (backlog.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          )))}
          <button onClick={handleClick} className="w-full self-center p-3 bg-green-500 hover:bg-green-600 rounded-md font-medium text-white">{render20? "Show all" : "Hide"}</button>
      </div>
    </div>
  );
};

export default KanbanBoard;
