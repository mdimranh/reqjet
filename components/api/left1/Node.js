// import { Button } from "@/components/ui/button";
import { getDescendants } from "@minoru/react-dnd-treeview";
// import { HiDotsHorizontal } from "react-icons/hi";
import NodeIcon from "./NodeIcon";
import styles from "./styles.module.css";

const TREE_X_OFFSET = 22;

const Node = ({
  node,
  depth,
  isOpen,
  isDropTarget,
  onClick,
  treeData,
  getPipeHeight,
}) => {
  const indent = depth * TREE_X_OFFSET;

  const handleToggle = (e) => {
    e.stopPropagation();
    onClick(node.id);
  };

  const handleExpand = (e) => {
    console.log(getPipeHeight(node.parent, treeData));
    // e.stopPropagation();
    // if (!isOpen) {
    //   onClick(node.id);
    // }
    // onClick(node.id);
  };

  return (
    <div
      className={`${styles.nodeWrapper} tree-node ${
        node.droppable && isDropTarget ? styles.dropTarget : ""
      }`}
      onClick={handleToggle}
      style={{ marginInlineStart: indent }}
    >
      {/* <div
        onClick={handleToggle}
        className={`${styles.expandIconWrapper} ${isOpen ? styles.isOpen : ""}`}
      >
        {node.droppable && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5866 5.99969L7.99997 8.58632L5.41332 5.99969C5.15332 5.73969 4.73332 5.73969 4.47332 5.99969C4.21332 6.25969 4.21332 6.67965 4.47332 6.93965L7.5333 9.99965C7.59497 10.0615 7.66823 10.1105 7.7489 10.144C7.82957 10.1775 7.91603 10.1947 8.0033 10.1947C8.09063 10.1947 8.1771 10.1775 8.25777 10.144C8.33837 10.1105 8.41163 10.0615 8.4733 9.99965L11.5333 6.93965C11.7933 6.67965 11.7933 6.25969 11.5333 5.99969C11.2733 5.74635 10.8466 5.73969 10.5866 5.99969Z"
              fill="black"
            />
          </svg>
        )}
      </div> */}
      <NodeIcon
        type={node.droppable ? (isOpen ? "folder-open" : "folder") : null}
        method="POST"
      />
      <div
        className={styles.pipeX}
        style={{ width: depth > 0 ? TREE_X_OFFSET - 9 : 0 }}
      />
      {depth > 0 && getDescendants(treeData, node.parent)[0].id === node.id && (
        <div
          className={styles.pipeY}
          style={{
            height: Math.max(0, getPipeHeight(node.parent, treeData)),
          }}
        />
      )}
      <div className={styles.labelGridItem}>{node.text}</div>
      {/* <Button
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
      </Button> */}
    </div>
  );
};

export default Node;
