import { useSuspenseQuery } from "@tanstack/react-query";
import { trpc } from "../../utils/trpc";
import styles from "./HeaderCompanyName.module.css";

type Props = {
  companyId: string;
};

export function HeaderCompanyName({ companyId }: Props) {
  const query = useSuspenseQuery(
    trpc.getCompany.queryOptions({
      companyId: Number(companyId),
    })
  );
  return <h1 className={styles.root}>{query.data.name}</h1>;
}
