import { CompaniesPageList } from "./CompaniesPageList";
import { Suspense } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export function CompaniesPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CompaniesPageList />
    </Suspense>
  );
}
