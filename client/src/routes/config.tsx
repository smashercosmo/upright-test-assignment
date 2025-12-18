import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router";
import { paths } from "./paths";
import { companyPageLoader } from "../pages/CompanyPage/CompanyPage.loader";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { companiesPageLoader } from "../pages/CompaniesPage/CompaniesPage.loader";
import { rootLayoutLoader } from "../pages/RootLayout/RootLayout.loader";

const RootLayout = lazy(() =>
  import("../pages/RootLayout/RootLayout").then((mod) => ({
    default: mod.RootLayout,
  }))
);

const CompaniesPage = lazy(() =>
  import("../pages/CompaniesPage/CompaniesPage").then((mod) => ({
    default: mod.CompaniesPage,
  }))
);

const CompanyPage = lazy(() =>
  import("../pages/CompanyPage/CompanyPage").then((mod) => ({
    default: mod.CompanyPage,
  }))
);

export const config = {
  path: paths.index,
  element: <RootLayout />,
  loader: rootLayoutLoader,
  children: [
    {
      index: true,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <CompaniesPage />
        </Suspense>
      ),
      loader: companiesPageLoader,
    },
    {
      path: paths.companies.index,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <CompaniesPage />
        </Suspense>
      ),
      loader: companiesPageLoader,
    },
    {
      path: paths.companies.$companyId,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <CompanyPage />
        </Suspense>
      ),
      loader: companyPageLoader,
    },
  ],
} satisfies RouteObject;
