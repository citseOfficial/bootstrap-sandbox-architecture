import React, { useState } from "react";
import { BiFolder, BiFolderOpen, BiFileBlank } from "react-icons/bi";

type FileSystemNode = {
  id: number;
  name: string;
  type: string;
  parent: number | null;
  children?: FileSystemNode[];
  content: string | null;
};

interface TreeNodeProps {
  node: FileSystemNode;
  onFileClick: (node: FileSystemNode) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onFileClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    if (node.type === "file") {
      onFileClick(node);
    }
  };

  return (
    <li className="cursor-pointer py-1">
      <div
        onClick={node.type === "folder" ? toggleOpen : handleClick}
        className="flex items-center"
      >
        {node.type === "folder" ? (
          <>
            <span className="mr-2">
              {isOpen ? <BiFolderOpen /> : <BiFolder />}
            </span>
            <span className="text-sm font-medium">{node.name}</span>
          </>
        ) : (
          <>
            <span className="mr-2">
              <BiFileBlank />
            </span>
            <span className="text-sm">{node.name}</span>
          </>
        )}
      </div>
      {isOpen && node.children && node.children.length > 0 && (
        <ul className="pl-4">
          {node.children.map((childNode) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              onFileClick={onFileClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
