"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import CollectionList from "./left/collections";

import RequestRouter from "./request/request";

export function ResizableMainContent() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={15} minSize={10} maxSize={50}>
        <CollectionList />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={85}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50} minSize={20}>
            <RequestRouter />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
