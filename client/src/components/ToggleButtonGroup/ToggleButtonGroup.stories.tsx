import { useState } from "react";
import type { Key } from "react-aria-components";

import { ToggleButton } from "./ToggleButton";
import { ToggleButtonGroup } from "./ToggleButtonGroup";

export default {
  title: "Toggles/ToggleButtonGroup",
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  render: () => {
    const [keys, setKeys] = useState(new Set<Key>(["one"]));
    return (
      <div style={{ width: 300 }}>
        <ToggleButtonGroup onSelectionChange={setKeys} selectedKeys={keys}>
          <ToggleButton id="one">One</ToggleButton>
          <ToggleButton id="two">Two</ToggleButton>
          <ToggleButton id="three">Three</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  },
};
