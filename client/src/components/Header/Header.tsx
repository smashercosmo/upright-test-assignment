import { ThemeSwitcher } from "../ThemeSwitcher";
import styles from "./Header.module.css";
import { HeaderCompanyName } from "./HeaderCompanyName";
import { useParams } from "react-router";

export function Header() {
  const { companyId = "" } = useParams<{ companyId: string }>();
  return (
    <header className={styles.container}>
      <div>
        {companyId ? <HeaderCompanyName companyId={companyId} /> : null}
      </div>
      <ThemeSwitcher />
    </header>
  );
}
