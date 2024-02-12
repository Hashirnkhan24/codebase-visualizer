import { FaFileCode, FaFolder } from 'react-icons/fa';

const TreeNode = ({ node }) => {
    const renderChildNodes = (childNodes) => {
        return childNodes.map((childNode, index) => (
            <TreeNode key={index} node={childNode} />
        ));
    };


  return (
    <div className="ml-4 mb-2">
      {node.type === 'dir' ? (
        <details>
          <summary className="cursor-pointer text-gray-800 font-medium flex items-center justify-left gap-2">
            <FaFolder className="h-6 w-6 mr-1 text-blue-400"/>
            {node.name}</summary>
          <div className="ml-2">
            {renderChildNodes(node.structure)}
          </div>
        </details>
      ) : (
        <div className="flex items-center">
            <FaFileCode className="h-4 w-4 mr-1 text-gray-500" />
          <a href={node.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">{node.name}</a>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
