import type { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const MyTextarea = ({ ...res }: IProps) => {
  return (
    <div>
      <label className="text-sm/6 font-medium">Description</label>
      <textarea
        {...res}
        className="mt-1 border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
        rows={3}
      />
    </div>
  );
};

export default MyTextarea;
