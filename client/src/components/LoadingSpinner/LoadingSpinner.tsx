import { ProgressBar } from "react-aria-components";

import styles from "./LoadingSpinner.module.css";

export type Props = {
  "aria-label"?: string;
};

export function LoadingSpinner({
  "aria-label": ariaLabel = "Loading...",
}: Props) {
  return (
    <div className={styles.container}>
      <ProgressBar isIndeterminate aria-label={ariaLabel}>
        <span className={styles.root} />
      </ProgressBar>
    </div>
  );
}
