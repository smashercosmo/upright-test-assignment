import { type LoaderFunctionArgs } from "react-router";
import { queryClient, trpc } from "../../utils/trpc";

export function companyPageLoader({ params }: LoaderFunctionArgs) {
  if (params.companyId) {
    void queryClient.prefetchQuery(
      trpc.getSDGSummary.queryOptions({
        companyId: Number(params.companyId),
      })
    );
  }
}
