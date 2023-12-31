// ToolBar.js

import { initializeIcons } from "@fluentui/react/lib/Icons";
initializeIcons(undefined, { disableWarnings: true });

import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiLineHeight } from "react-icons/ci";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiPrettier } from "react-icons/si";

import { useRef } from "react";

export default function ToolBar({
  onMinifyClick,
  onPrettifyClick,
  isAutoPrettifyOn,
  onAutoPrettifyChange,
  onClearClick,
  onDownloadClick,
  onUploadClick,
  onFixClick,
  isValidJson,
}) {
  const handleFileChange = (e) => {
    if (!e.target.files) return;
    const fileUploaded = e.target.files[0];
    onUploadClick(fileUploaded);
  };

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const leftItems = [
    {
      key: "upload",
      iconProps: { iconName: "Upload" },
      // text: "Upload",
      onClick: () => document.getElementById("fileInput").click(),
    },
    {
      key: "download",
      // text: "Download",
      ariaLabel: "Grid view",
      iconProps: { iconName: "Download" },
      onClick: onDownloadClick,
      disabled: !isValidJson,
    },
    {
      key: "clear",
      // text: "Clear",
      iconProps: { iconName: "Delete" },
      onClick: onClearClick,
    },
    {
      key: "fix",
      // text: "Fix",
      iconProps: { iconName: "DeveloperTools" },
      onClick: onFixClick,
      disabled: isValidJson,
    },
    {
      key: "minify",
      // text: "Minify",
      iconProps: { iconName: "MinimumValue" },
      onClick: onMinifyClick,
      disabled: !isValidJson || isAutoPrettifyOn,
    },
    {
      key: "prettify",
      // text: "Prettify",
      iconProps: { iconName: "Code" },
      onClick: onPrettifyClick,
      disabled: !isValidJson || isAutoPrettifyOn,
    },
    // {
    //   key: "auto-prettify",
    //   onRender: () => (
    //     <CommandButton>
    //       <Checkbox
    //         label="Auto Prettify"
    //         onChange={onAutoPrettifyChange}
    //         checked={isAutoPrettifyOn}
    //       />
    //     </CommandButton>
    //   ),
    // },
  ];

  return (
    // <>
    //   <CommandBar
    //     className="items-center border-b border-b-slate-200 bg-slate-100"
    //     items={leftItems}
    //     ariaLabel="json content commands"
    //   />
    //   <input
    //     id="fileInput"
    //     style={{ display: "none" }}
    //     onChange={handleFileChange}
    //     type="file"
    //     accept="application/json"
    //   />
    // </>
    <div className="flex w-full justify-between px-8 border-b border-b-slate-200 items-center">
      <h1 className="text-sm text-slate-500">Json Request Body</h1>
      <div className="flex justify-end gap-4 me-8 py-2 items-center">
        <AiOutlineCloudUpload
          size={20}
          className="cursor-pointer text-slate-500 hover:text-slate-950"
          onClick={handleUploadClick}
        />
        <IoCloudDownloadOutline
          size={18}
          className="cursor-pointer text-slate-500 hover:text-slate-950"
          onClick={onDownloadClick}
        />
        <RiDeleteBin6Line
          size={17}
          className="cursor-pointer text-slate-500 hover:text-slate-950"
          onClick={onClearClick}
        />
        <MdOutlineAutoFixHigh
          size={17}
          className="cursor-pointer text-slate-500 hover:text-slate-950"
          onClick={onFixClick}
        />
        <SiPrettier
          size={15}
          className="cursor-pointer text-slate-500 hover:text-slate-950"
          onClick={onPrettifyClick}
        />
        <CiLineHeight
          size={16}
          className="cursor-pointer text-slate-500 hover:text-slate-950"
          onClick={onMinifyClick}
        />
        <input
          id="fileInput"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          type="file"
          accept="application/json"
        />
      </div>
    </div>
  );
}
