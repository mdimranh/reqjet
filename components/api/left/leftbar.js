import { RiAddLine } from "react-icons/ri";
import CollectionList from "./collections";

export default function LeftBar() {
  return (
    <div>
      <div className="flex w-full justify-between items-center p-2 border-b border-b-slate-200 cursor-pointer">
        <span className="flex gap-1 items-center text-sm">
          <RiAddLine size={16} /> New
        </span>
      </div>
      <CollectionList />
    </div>
  );
}
