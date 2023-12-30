// TitleBar.js
import { CommandBar, Text } from "@fluentui/react";

const TitleBar = ({ title }) => {
  const items = [
    {
      key: title,
      text: title,
      onRender: () => (
        <Text variant="large" nowrap block>
          {title}
        </Text>
      ),
    },
  ];

  return (
    <CommandBar
      className="items-center border-b border-b-slate-200"
      ariaLabel="app title"
      items={items}
    />
  );
};

export default TitleBar;
