"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import LeftBar from "./left/leftbar";

import RequestRouter from "./request/request";

export function ResizableMainContent() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        collapsedSize={0}
        collapsible={true}
        defaultSize={30}
        minSize={15}
        maxSize={40}
      >
        <LeftBar />
      </ResizablePanel>
      <ResizableHandle className="active:border active:border-slate-300 hover:border hover:border-slate-300" />
      <ResizablePanel defaultSize={85}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50} minSize={20}>
            <RequestRouter />
          </ResizablePanel>
          <ResizableHandle className="active:border active:border-slate-300 hover:border hover:border-slate-300" />
          <ResizablePanel
            defaultSize={50}
            collapsedSize={5}
            collapsible={true}
            minSize={25}
            maxSize={50}
          >
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
