/* eslint-disable react/prop-types */
import { AiFillFolder,  } from 'react-icons/ai';
import { BsFiletypeHtml, BsFiletypeCss, BsFiletypeJs, BsFiletypeJsx, BsFiletypeJson, BsFiletypeMd, BsFiletypeTsx, BsFileCodeFill } from 'react-icons/bs'

const TreeNode = ({ node }) => {
    const renderChildNodes = (childNodes) => {
        return childNodes.map((childNode, index) => (
            <TreeNode key={index} node={childNode} />
        ));
    };

    const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop();
    // Define your file type to icon mapping here
    const iconMapping = {
      js: <BsFiletypeJs className="h-6 w-6 mr-1 text-green-500" />,
      html: <BsFiletypeHtml className="h-6 w-6 mr-1 text-red-500" />,
      css: <BsFiletypeCss className="h-6 w-6 mr-1 text-blue-500" />,
      jsx: <BsFiletypeJsx className="h-6 w-6 mr-1 text-blue-500" />,
      md: <BsFiletypeMd className="h-6 w-6 mr-1 text-blue-500" />,
      json: <BsFiletypeJson className="h-6 w-6 mr-1 text-blue-500" />,
      tsx: <BsFiletypeTsx className="h-6 w-6 mr-1 text-blue-500" />,
      // Add more mappings as needed
    };

    return iconMapping[extension.toLowerCase()] || <BsFileCodeFill className="h-6 w-6 mr-1 text-gray-500" />;
  };

  return (
    <div className="ml-4 mb-2">
      {node.type === 'dir' ? (
        <details>
          <summary className="cursor-pointer text-white font-medium flex items-center justify-left gap-2">
            <AiFillFolder className="h-6 w-6 mr-1 text-blue-400"/>
            {node.name}</summary>
          <div className="ml-2">
            {renderChildNodes(node.structure)}
          </div>
        </details>
      ) : (
        <div className="flex items-center">
            {/* <FaFileCode className="h-4 w-4 mr-1 text-gray-500" /> */}
            {getFileIcon(node.name)}
          <a href={node.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">{node.name}</a>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
