// useToggle.js
import React from "react";

const useToggle = (initialValue = false) => {
  const [toggled, setToggled] = React.useState(initialValue);

  const toggle = React.useCallback(() => {
    setToggled((v) => !v);
  }, []);

  return [toggled, toggle];
};

export default useToggle;
