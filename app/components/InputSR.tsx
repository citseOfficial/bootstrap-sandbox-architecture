import { ChangeEvent } from "react";

type InputSRProps = {
  index: number;
  title: string;
  placeHolder: string;
  value: string | null;
  onChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  onDelete: (index: number) => void;
};

export function InputSR({
  title,
  placeHolder,
  value,
  onChange,
  onDelete,
  index,
}: InputSRProps) {
  return (
    <>
      <div className="flex justify-center items-center w-full" key={title}>
        <p className="mr-3 ml-1 my-8 text-gray-400 text-sm font-bold w-16">
          SR #{title}
        </p>
        <input
          id="group-proyect"
          type="text"
          placeholder={placeHolder}
          onChange={(event) => onChange(index, event)}
          autoComplete="off"
          className="appearance-none bg-bg-primary text-sm border-b-2 border-gray-500 py-2 w-full max-w-full text-text-color leading-tight focus:outline-none focus:border-text-color"
        />
        <p
          onClick={() => onDelete(index)}
          className="px-5 text-2xl cursor-pointer text-gray-500 hover:text-black"
        >
          ␥
        </p>
      </div>
    </>
  );
}
