import { queryClient, trpc } from "../../utils/trpc";

export function companiesPageLoader() {
  void queryClient.prefetchQuery(trpc.getSDGConfidence.queryOptions());
}
