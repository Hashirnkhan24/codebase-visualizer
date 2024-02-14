import React from 'react';

const IssueCard = ({ issue }) => {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="grid grid-cols-3 md:flex md:items-center md:justify-center gap-2 mb-2">
        <h3 className="text-lg font-semibold col-span-2"><span>{issue.title}</span></h3>
        <span className="text-gray-600"><span>ID: {issue.id}</span></span>
      </div>
      <div className="flex items-center">
        {issue.labels.length > 0 && (
          <div className="flex space-x-2">
            {issue.labels.map((label, index) => (
              <span key={index} className={`p-2 text-center bg-green-200 text-gray-700 text-sm rounded-full`}>
                {label}
              </span>
            ))}
          </div>
          
        )}
        {issue.milestone !== 'No milestone' && (
          <div className="ml-auto text-sm text-gray-500">
            Milestone: {issue.milestone}
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
