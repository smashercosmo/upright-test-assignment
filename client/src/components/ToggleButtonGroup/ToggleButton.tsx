import { type ReactNode } from "react";
import {
  ToggleButton as AriaToggleButton,
  type ToggleButtonProps,
} from "react-aria-components";

import styles from "./ToggleGroup.module.css";

type Props = Pick<ToggleButtonProps, "id" | "isDisabled"> & {
  children: ReactNode;
};

export function ToggleButton({ children, id, isDisabled }: Props) {
  return (
    <AriaToggleButton id={id} isDisabled={isDisabled} className={styles.item}>
      {children}
    </AriaToggleButton>
  );
}
