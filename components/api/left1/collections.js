// pages/index.tsx

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HiDotsHorizontal } from "react-icons/hi";

import eventBus from "../store";

import {
  DndProvider,
  MultiBackend,
  Tree,
  getBackendOptions,
  getDescendants,
} from "@minoru/react-dnd-treeview";

import { useState } from "react";
import Node from "./Node";
import Placeholder from "./Placeholder";
import sampleData from "./sample-default.json";
import styles from "./styles.module.css";
import useTreeOpenHandler from "./useTreeOpenHandler";

const reorderArray = (array, sourceIndex, targetIndex) => {
  const newArray = [...array];
  const element = newArray.splice(sourceIndex, 1)[0];
  newArray.splice(targetIndex, 0, element);
  return newArray;
};

export default function CollectionList() {
  const { ref, getPipeHeight, toggle } = useTreeOpenHandler();
  const [treeData, setTreeData] = useState(sampleData);

  const handleDrop = (newTree, e) => {
    const { dragSourceId, dropTargetId, destinationIndex } = e;
    if (
      typeof dragSourceId === "undefined" ||
      typeof dropTargetId === "undefined" ||
      (dropTargetId === 0 && typeof e.dragSource.data !== "undefined")
    )
      return;
    const start = treeData.find((v) => v.id === dragSourceId);
    const end = treeData.find((v) => v.id === dropTargetId);

    if (
      start?.parent === dropTargetId &&
      start &&
      typeof destinationIndex === "number"
    ) {
      setTreeData((treeData) => {
        const output = reorderArray(
          treeData,
          treeData.indexOf(start),
          destinationIndex
        );
        return output;
      });
    }

    if (
      start?.parent !== dropTargetId &&
      start &&
      typeof destinationIndex === "number"
    ) {
      if (
        getDescendants(treeData, dragSourceId).find(
          (el) => el.id === dropTargetId
        ) ||
        dropTargetId === dragSourceId ||
        (end && !end?.droppable)
      )
        return;
      setTreeData((treeData) => {
        const output = reorderArray(
          treeData,
          treeData.indexOf(start),
          destinationIndex
        );
        const movedElement = output.find((el) => el.id === dragSourceId);
        if (movedElement) movedElement.parent = dropTargetId;
        return output;
      });
    }
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className={styles.wrapper}>
        <Tree
          ref={ref}
          classes={{
            root: styles.treeRoot,
            placeholder: styles.placeholder,
            dropTarget: styles.dropTarget,
            listItem: styles.listItem,
          }}
          tree={treeData}
          sort={false}
          rootId={0}
          insertDroppableFirst={false}
          enableAnimateExpand={false}
          onDrop={handleDrop}
          canDrop={() => true}
          dropTargetOffset={5}
          placeholderRender={(node, { depth }) => (
            <Placeholder node={node} depth={depth} />
          )}
          render={(node, { depth, isOpen, isDropTarget }) => (
            <ContextMenuDemo _id={node?.id}>
              <div className="flex justify-between items-center hover:bg-slate-100 group rounded-sm cursor-pointer">
                <Node
                  getPipeHeight={getPipeHeight}
                  node={node}
                  depth={depth}
                  isOpen={isOpen}
                  onClick={() => {
                    if (node.droppable) {
                      toggle(node?.id);
                    } else {
                      eventBus.emit("new_roure", {
                        key: "3",
                        label: "From Sidenav",
                        method: "PUT",
                        url: "https://www.google.com/app",
                      });
                    }
                  }}
                  isDropTarget={isDropTarget}
                  treeData={treeData}
                />
                {/* <FaEdit size={15} className="hidden group-hover:block" /> */}
                <DropdownMenuDemo
                  button={
                    <Button
                      variant="ghost"
                      className="focus:outline-none focus:ring-transparent px-2"
                    >
                      <HiDotsHorizontal
                        size={15}
                        className=""
                        onClick={(e) => {
                          alert("Please select");
                        }}
                      />
                    </Button>
                  }
                />
              </div>
            </ContextMenuDemo>
          )}
        />
      </div>
    </DndProvider>
  );
}

export function ContextMenuDemo({ _id, children }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-44">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function DropdownMenuDemo({ button }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
