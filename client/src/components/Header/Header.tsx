import { ThemeSwitcher } from "../ThemeSwitcher";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.container}>
      <ThemeSwitcher />
    </header>
  );
}
