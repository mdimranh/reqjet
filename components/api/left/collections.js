import {
  DndProvider,
  MultiBackend,
  Tree,
  getBackendOptions,
  getDescendants,
} from "@minoru/react-dnd-treeview";
import React from "react";
import Node from "./Node";
import Placeholder from "./Placeholder";
import sampleData from "./sample-default.json";
import styles from "./styles.module.css";
import useTreeOpenHandler from "./useTreeOpenHandler";

import eventBus from "../store";

const reorderArray = (array, sourceIndex, targetIndex) => {
  const newArray = [...array];
  const element = newArray.splice(sourceIndex, 1)[0];
  newArray.splice(targetIndex, 0, element);
  return newArray;
};

export default function CollectionList() {
  const { ref, getPipeHeight, toggle } = useTreeOpenHandler();
  const [treeData, setTreeData] = React.useState(sampleData);
  const [selectedNodeId, setSelectedNodeId] = React.useState(null);

  const handleDrop = (newTree, e) => {
    const { dragSourceId, dropTargetId, destinationIndex } = e;
    if (
      typeof dragSourceId === "undefined" ||
      typeof dropTargetId === "undefined"
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
          enableAnimateExpand={true}
          onDrop={handleDrop}
          canDrop={() => true}
          dropTargetOffset={5}
          placeholderRender={(node, { depth }) => (
            <Placeholder node={node} depth={depth} />
          )}
          render={(node, { depth, isOpen, isDropTarget }) => (
            <Node
              getPipeHeight={getPipeHeight}
              node={node}
              depth={depth}
              isOpen={isOpen}
              onClick={() => {
                if (node.droppable) {
                  toggle(node?.id);
                }
                eventBus.emit("new_roure", {
                  key: node?.id,
                  label: "From Sidenav",
                  method: "PUT",
                  url: "https://www.google.com/app",
                });
              }}
              isSelect={() => {
                console.log(node?.id);
                setSelectedNodeId(node?.id);
              }}
              selectedNodeId={selectedNodeId}
              isDropTarget={isDropTarget}
              treeData={treeData}
            />
          )}
        />
      </div>
    </DndProvider>
  );
}
