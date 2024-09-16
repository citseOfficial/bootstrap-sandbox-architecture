import TreeNode from "./TreeNode";

type FileSystemNode = {
  id: number;
  name: string;
  type: string;
  parent: number | null;
  children?: FileSystemNode[];
  content: string | null;
};

interface FileTreeProps {
  tree: FileSystemNode[];
  onFileClick: (node: FileSystemNode) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ tree, onFileClick }) => {
  return (
    <ul className="pl-4 list-none">
      {tree.map((node) => (
        <div key={node.id}>
          <TreeNode key={node.id} node={node} onFileClick={onFileClick} />
        </div>
      ))}
    </ul>
  );
};

export default FileTree;
