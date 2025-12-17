import { RouterProvider } from "react-aria-components";
import { Header } from "../../components/Header";
import { Outlet, useNavigate } from "react-router";

import styles from "./RootLayout.module.css";

export function RootLayout() {
  const navigate = useNavigate();
  return (
    <RouterProvider navigate={navigate}>
      <div className={styles.root}>
        <div className={styles.header}>
          <Header />
        </div>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </RouterProvider>
  );
}
