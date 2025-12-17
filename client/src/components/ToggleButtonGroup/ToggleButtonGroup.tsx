import {
  ToggleButtonGroup as AriaToggleButtonGroup,
  type ToggleButtonGroupProps,
} from "react-aria-components";

import styles from "./ToggleGroup.module.css";

type Props = Pick<
  ToggleButtonGroupProps,
  | "selectionMode"
  | "selectedKeys"
  | "disallowEmptySelection"
  | "aria-label"
  | "children"
  | "onSelectionChange"
>;

export function ToggleButtonGroup(props: Props) {
  return <AriaToggleButtonGroup {...props} className={styles.group} />;
}
