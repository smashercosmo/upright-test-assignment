import { type LoaderFunctionArgs } from "react-router";
import { queryClient, trpc } from "../../utils/trpc";

export function rootLayoutLoader({ params }: LoaderFunctionArgs) {
  if (params.companyId) {
    void queryClient.prefetchQuery(
      trpc.getCompany.queryOptions({
        companyId: Number(params.companyId),
      })
    );
  }
}
