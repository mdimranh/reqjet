"use client";

import { Tabs } from "antd";
import { useRef, useState } from "react";
import "./style.css";

import { useCallback } from "react";

import { useEffect } from "react";

import ApiRoute from "../route/route";

import eventBus from "../../store";

import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
const DraggableTabNode = ({ className, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props["data-node-key"],
    });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleX: 1,
      }
    ),
    transition,
  };
  return React.cloneElement(props.children, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

export default function Dragable() {
  const [items, setItems] = useState([
    {
      key: "1",
      label: "Tab 1",
      method: "POST",
      url: "http://localhost:5000",
    },
    {
      key: "2",
      label: "Tab 2",
      method: "PUT",
      url: "https://www.google.com/app",
    },
    {
      key: "3",
      label: "Tab 3",
      method: "GET",
      url: "https://api.codebyamirus.link/data/student/1/details",
    },
  ]);
  const [activeRoute, setActiveRoute] = useState(items[0]);
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const onDragStart = ({ active, over }) => {
    console.log(active, over);
  };
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  const [activeKey, setActiveKey] = useState(items[0]?.key);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    const activeTab = items.find((item) => item.key === newActiveKey);
    setActiveRoute(activeTab);
    setActiveKey(newActiveKey);
  };

  let getRoute = useCallback(
    (newActiveKey) => {
      let activeTab = items.find((item) => item.key === newActiveKey);
      return activeTab;
    },
    [items]
  );

  const add = useCallback(
    (data = null) => {
      let newRoute = {};
      const newActiveKey = `newTab${newTabIndex.current++}`;
      const newPanes = [...items];
      if (data) {
        newRoute = { ...data };
        newPanes.push(newRoute);
        setItems(newPanes);
        setActiveKey(data.key);
      } else {
        newRoute = { ...activeRoute };
        newRoute.key = newActiveKey;
        newPanes.push(newRoute);
        setItems(newPanes);
        setActiveKey(newActiveKey);
      }
    },
    [items, newTabIndex, activeRoute, setItems, setActiveKey]
  );

  useEffect(() => {
    const subscription = eventBus.subscribe("new_roure", (data) => {
      let newRoute = getRoute(data.key);
      if (newRoute) {
        setActiveKey(newRoute.key);
        setActiveRoute(newRoute);
      } else {
        add(data);
      }
    });
  }, [add, getRoute]);

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
    let newRoute = getRoute(newActiveKey);
    if (newRoute) {
      setActiveRoute(newRoute);
    }
    if (items.length == 2) {
    }
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <div>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        animated={true}
        destroyInactiveTabPane={true}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <DndContext
            sensors={[sensor]}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
          >
            <SortableContext
              items={items.map((i) => i.key)}
              strategy={horizontalListSortingStrategy}
            >
              <DefaultTabBar {...tabBarProps}>
                {(node) => (
                  <DraggableTabNode {...node.props} key={node.key}>
                    {node}
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        )}
      />
      <ApiRoute data={activeRoute} />
    </div>
  );
}
