// ErrorMessageBar.js
import {
  DetailsList,
  ScrollablePane,
  ScrollbarVisibility,
  Sticky,
  StickyPositionType,
  mergeStyleSets,
} from "@fluentui/react";
import { v4 as uuid } from "uuid";

const BorderLine = "1px solid rgb(237, 235, 233)";

const classNames = mergeStyleSets({
  wrapper: {
    height: "inherit",
    position: "relative",
  },
});

const headerStyle = {
  root: {
    padding: 0,
    borderTop: BorderLine,
  },
};

const onRenderDetailsHeader = (props, defaultRender) => {
  if (!props) return null;
  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
      {defaultRender({
        ...props,
        styles: headerStyle,
      })}
    </Sticky>
  );
};

export default function ErrorMessageBar({ errors }) {
  const items = errors.map((error) => ({
    key: `error-${uuid()}`,
    problems: error,
  }));

  const columns = [
    {
      key: "problems",
      name: `Problems (${errors.length})`,
      fieldName: "problems",
      minWidth: 300,
      maxWidth: 300,
      isResizable: true,
    },
  ];

  return (
    <ScrollablePane
      scrollbarVisibility={ScrollbarVisibility.auto}
      className={classNames.wrapper}
    >
      <DetailsList
        compact
        items={items}
        columns={columns}
        checkboxVisibility={2}
        onRenderDetailsHeader={onRenderDetailsHeader}
      />
    </ScrollablePane>
  );
}
