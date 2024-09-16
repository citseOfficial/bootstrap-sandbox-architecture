type InputMetadataProps = {
  title: string;
  placeHolder: string;
  value: string | null;
  onChange: (value: string) => void;
};

export function InputMetadato({
  title,
  placeHolder,
  value,
  onChange,
}: InputMetadataProps) {
  return (
    <>
      <div className="flex justify-center items-center w-full" key={title}>
        <p className="mr-5 text-[text-color] text-sm font-light w-15">{title}</p>
        <input
          id="group-proyect"
          type="text"
          placeholder={placeHolder}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          className="appearance-none bg-bg-primary text-sm border-b-2 border-gray-500 py-2 w-full max-w-full text-text-color leading-tight focus:outline-none focus:border-text-color"
        />
      </div>
    </>
  );
}
