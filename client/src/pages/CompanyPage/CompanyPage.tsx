import { CompanyPageSummaryList } from "./CompanyPageSummaryList";
import { Suspense } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export function CompanyPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CompanyPageSummaryList />
    </Suspense>
  );
}
