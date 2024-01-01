"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  downloadJsonFile,
  minifyJsonString,
  parseJsonSchemaString,
  prettifyJsonString,
} from "../utils";
import ToolBar from "./toolbar";
import useToggle from "./useToogle"; // Check if there's a typo in the filename

import dirtyJson from "dirty-json";

const BorderLine = "1px solid rgb(237, 235, 233)";

const stackStyles = {
  root: {
    height: "inherit",
    borderTop: BorderLine,
    borderRight: BorderLine,
    borderBottom: BorderLine,
  },
};

export default function JSONEditor({
  defaultValue,
  schemaValue,
  title,
  path = "",
  isSchemaSampleDataOn,
  onChange,
}) {
  const monaco = useMonaco();
  const [errors, setErrors] = useState([]);
  const [isAutoPrettifyOn, toggleAutoPrettifyOn] = useToggle(false);
  const [isValidJson, setIsValidJson] = useState(false);
  const editorRef = useRef(null);

  const updateEditorLayout = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.layout({
      width: "auto",
      height: "auto",
    });
    const editorEl = editor._domElement;
    if (!editorEl) return;
    const { width, height } = editorEl.getBoundingClientRect();
    editor.layout({
      width,
      height,
    });
  }, []);

  const handleJsonSchemasUpdate = useCallback(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: schemaValue
        ? [
            {
              uri: window.location.href,
              fileMatch: ["*"],
              schema: {
                ...parseJsonSchemaString(schemaValue),
              },
            },
          ]
        : undefined,
    });
  }, [schemaValue, monaco]);

  const handleEditorPrettify = useCallback(() => {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }, []);

  const handleEditorUpdateValue = useCallback((value) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.setValue(value || "");
    value && editor?.getAction("editor.action.formatDocument")?.run();
  }, []);

  const handleClearClick = () => editorRef.current?.setValue("");

  const handleEditorWillMount = () => handleJsonSchemasUpdate();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    editor.getModel()?.updateOptions({ tabSize: 2, insertSpaces: false });
    updateEditorLayout();

    window.addEventListener("resize", () => {
      updateEditorLayout();
    });

    defaultValue && handleEditorUpdateValue(prettifyJsonString(defaultValue));
  };

  useEffect(() => {
    handleEditorUpdateValue(defaultValue);
  }, [defaultValue, handleEditorUpdateValue]);

  useEffect(() => {
    handleJsonSchemasUpdate();
  }, [schemaValue, handleJsonSchemasUpdate]);

  useEffect(() => {
    updateEditorLayout();
  }, [isSchemaSampleDataOn, updateEditorLayout]);

  useEffect(() => {
    isAutoPrettifyOn && handleEditorPrettify();
  }, [isAutoPrettifyOn, handleEditorPrettify]);

  const handleEditorValidation = useCallback((markers) => {
    const errorMessage = markers.map(
      ({ startLineNumber, message }) => `line ${startLineNumber}: ${message}`
    );
    const hasContent = editorRef.current?.getValue();
    const hasError = errorMessage.length > 0;
    setIsValidJson(!!hasContent && !hasError);
    setErrors(errorMessage);
  }, []);

  const handleMinifyClick = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const value = editor.getValue();
    const minifiedValue = minifyJsonString(value);
    editor.setValue(minifiedValue);
  };

  const handleUploadClick = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result;
      handleEditorUpdateValue(result);
    };
    fileReader.readAsText(file);
  };

  const handleDownloadClick = () => {
    const value = editorRef.current?.getValue();
    value && downloadJsonFile(value);
  };

  const handleEditorChange = useCallback(
    (value) => {
      isAutoPrettifyOn && handleEditorPrettify();
      onChange && onChange(value);
    },
    [isAutoPrettifyOn, handleEditorPrettify, onChange]
  );

  const handleFixClick = () => {
    const editor = editorRef.current;
    const value = editor && editor.getValue();
    const fixedValue = value && dirtyJson.parse(value);
    const formattedValue =
      fixedValue && prettifyJsonString(JSON.stringify(fixedValue));
    editor && editor.setValue(formattedValue);
  };

  return (
    <div className="h-full flex flex-col w-full">
      <ToolBar
        className="border-b border-b-slate-200"
        isValidJson={isValidJson}
        isAutoPrettifyOn={isAutoPrettifyOn}
        onAutoPrettifyChange={toggleAutoPrettifyOn}
        onClearClick={handleClearClick}
        onDownloadClick={handleDownloadClick}
        onMinifyClick={handleMinifyClick}
        onPrettifyClick={handleEditorPrettify}
        onUploadClick={handleUploadClick}
        onFixClick={handleFixClick}
      />
      <Editor
        className="pt-2"
        language="json"
        path={path}
        options={{
          automaticLayout: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          formatOnPaste: true,
          formatOnType: true,
          scrollBeyondLastLine: true,
        }}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
      />
      {/* <div className="h-20">
        <ErrorMessageBar errors={errors} />
      </div> */}
    </div>
  );
}
