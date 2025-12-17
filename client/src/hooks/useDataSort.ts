import { useMemo, useState } from "react";
import { type SortDescriptor, type SortDirection } from "react-aria-components";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const isFieldAString = Number.isNaN(Number(a[orderBy]));
  const isFieldBString = Number.isNaN(Number(b[orderBy]));

  if (isFieldAString && isFieldBString) {
    return String(a[orderBy]).localeCompare(String(b[orderBy]));
  }

  return Number(a[orderBy]) - Number(b[orderBy]);
}

function getComparator<T>(
  order: SortDirection,
  orderBy: keyof T
): (a: T, b: T) => number {
  return order === "descending"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function createRows<T>(data: T[], descriptor: SortDescriptor) {
  const comparator = getComparator(
    descriptor.direction,
    descriptor.column as keyof T
  );
  return data.toSorted(comparator);
}

export function useDataSort<T>(params: {
  data: T[];
  defaultOrder: SortDirection;
  defaultOrderBy: Exclude<keyof T, symbol>;
}) {
  const { data, defaultOrder, defaultOrderBy } = params;

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: defaultOrderBy,
    direction: defaultOrder,
  });

  const rows = useMemo(
    () => createRows(data, sortDescriptor),
    [data, sortDescriptor]
  );

  return { rows, setSortDescriptor, sortDescriptor };
}
