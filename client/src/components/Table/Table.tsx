import { type ReactNode } from "react";
import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  type CellProps as AriaCellProps,
  type ColumnProps as AriaColumnProps,
  type RowProps as AriaRowProps,
  type TableProps as AriaTableProps,
} from "react-aria-components";

import ArrowDownIcon from "../../assets/icons/arrow-down.svg?react";
import ArrowUpIcon from "../../assets/icons/arrow-up.svg?react";
import SortIcon from "../../assets/icons/sort.svg?react";
import styles from "./Table.module.css";

type TableProps = Pick<AriaTableProps, "onSortChange" | "sortDescriptor"> & {
  children: ReactNode;
  "aria-label": NonNullable<AriaTableProps["aria-label"]>;
};

export function Table({ children, ...tableProps }: TableProps) {
  return (
    <div className={styles.root}>
      <div className={styles.scroller}>
        <AriaTable className={styles.table} {...tableProps}>
          {children}
        </AriaTable>
      </div>
    </div>
  );
}

type TBodyProps = {
  children: ReactNode;
};

export function TBody({ children }: TBodyProps) {
  return <AriaTableBody>{children}</AriaTableBody>;
}

type AlignProps = {
  align?: "left" | "center" | "right";
};

type TableCellProps = AlignProps & Pick<AriaCellProps, "children" | "colSpan">;

export function Td({ children, ...restProps }: TableCellProps) {
  return (
    <AriaCell className={styles.td} {...restProps}>
      {children}
    </AriaCell>
  );
}

type TableColumnProps = AlignProps & { children?: ReactNode } & Pick<
    AriaColumnProps,
    "isRowHeader" | "allowsSorting" | "id"
  >;

export function Th({ children, ...columnProps }: TableColumnProps) {
  return (
    <AriaColumn className={styles.th} {...columnProps}>
      {({ allowsSorting, sortDirection, isHovered }) => (
        <div>
          {children}
          {allowsSorting && (
            <span aria-hidden="true" className={styles["sort-indicator"]}>
              {sortDirection === "ascending" ? (
                <ArrowUpIcon />
              ) : sortDirection === "descending" ? (
                <ArrowDownIcon />
              ) : (
                <SortIcon
                  fill={
                    isHovered
                      ? "var(--colors-grey-600)"
                      : "var(--colors-grey-500)"
                  }
                />
              )}
            </span>
          )}
        </div>
      )}
    </AriaColumn>
  );
}

type THeadProps = {
  children: ReactNode;
};

export function THead({ children }: THeadProps) {
  return <AriaTableHeader className={styles.thead}>{children}</AriaTableHeader>;
}

type TrProps<T> = Pick<AriaRowProps<T>, "id" | "href"> & {
  children: ReactNode;
};

export function Tr<T extends object>({ children, ...rowProps }: TrProps<T>) {
  return (
    <AriaRow<T> className={styles.tr} {...rowProps}>
      {children}
    </AriaRow>
  );
}
