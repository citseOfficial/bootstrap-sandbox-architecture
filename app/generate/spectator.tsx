type FileSystemNode = {
  id: number;
  name: string;
  type: string;
  parent: number | null;
  children?: FileSystemNode[];
  content: string | null;
};

interface FileProps {
  file: FileSystemNode | null;
}

const Spectator = (file: FileProps) => {
  let content = file.file?.content ?? "";

  return (
    <div className="col-start-5 col-end-12 my-5 flex flex-col">
      <div className="border border-line bg-[#fff] rounded-md w-full max-h-96 overflow-y-auto overflow-x-auto max-w-[100%]">
        <pre id="file-content" className="h-fit language-java p-5">
          <code className="language-java">{content}</code>
        </pre>
      </div>
    </div>
  );
};

export default Spectator;
