import { ThemeSwitcher } from "./ThemeSwitcher";

export default {
  title: "ToggleButtonGroup/ThemeSwitcher",
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  render: () => {
    return (
      <div style={{ width: 300 }}>
        <ThemeSwitcher />
      </div>
    );
  },
};
