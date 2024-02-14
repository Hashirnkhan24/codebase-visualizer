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
      js: <BsFiletypeJs className="h-6 w-6 mr-1 text-green-700" />,
      html: <BsFiletypeHtml className="h-6 w-6 mr-1 text-red-700" />,
      css: <BsFiletypeCss className="h-6 w-6 mr-1 text-blue-700" />,
      jsx: <BsFiletypeJsx className="h-6 w-6 mr-1 text-teal-700" />,
      md: <BsFiletypeMd className="h-6 w-6 mr-1 text-slate-700" />,
      json: <BsFiletypeJson className="h-6 w-6 mr-1 text-yellow-700" />,
      tsx: <BsFiletypeTsx className="h-6 w-6 mr-1 text-indigo-700" />,
      // Add more mappings as needed
    };

    return iconMapping[extension.toLowerCase()] || <BsFileCodeFill className="h-6 w-6 mr-1 text-gray-500" />;
  };

  return (
    <div className="mb-2 border-b w-full">
      {node.type === 'dir' ? (
        <details className=''>
          <summary className="cursor-pointer text-black font-medium flex items-center justify-left gap-2 p-3">
            <AiFillFolder className="h-6 w-6 mr-1 text-blue-700"/>
            {node.name}</summary>
          <div className="ml-2">
            {renderChildNodes(node.structure)}
          </div>
        </details>
      ) : (
        <div className="flex items-center p-3">
            {/* <FaFileCode className="h-4 w-4 mr-1 text-gray-500" /> */}
            {getFileIcon(node.name)}
          <a href={node.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-balck hover:text-blue-600">{node.name}</a>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
