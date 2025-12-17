import { Link } from "react-aria-components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { trpc } from "../../utils/trpc";
import { Table, Tr, Td, THead, Th, TBody } from "../../components/Table";
import { useParams, useSearchParams } from "react-router";
import { useDataSort } from "../../hooks/useDataSort";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./CompanyPage.module.css";

export function CompanyPageSummaryList() {
  const [searchParams] = useSearchParams();
  const { companyId = "" } = useParams<{ companyId: string }>();
  const query = useSuspenseQuery(
    trpc.getSDGSummary.queryOptions({
      companyId: Number(companyId),
    })
  );
  const view = searchParams.get("view") ?? "table";

  const { rows, sortDescriptor, setSortDescriptor } = useDataSort({
    data: query.data,
    defaultOrder: "ascending",
    defaultOrderBy: "product_name",
  });

  return (
    <div>
      <div className={styles.links}>
        <Link
          href="?view=table"
          className={view === "table" ? styles.active : undefined}
        >
          Table view
        </Link>{" "}
        |{" "}
        <Link
          href="?view=graph"
          className={view === "graph" ? styles.active : undefined}
        >
          Graph view
        </Link>
      </div>
      {view === "table" ? (
        <Table
          aria-label="Companies list"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <THead>
            <Tr>
              <Th isRowHeader allowsSorting id="product_name" align="left">
                Product name
              </Th>
              <Th allowsSorting id="sdg_name" align="left">
                SDG
              </Th>
              <Th allowsSorting id="revenue_share" align="left">
                Revenue share
              </Th>
              <Th allowsSorting id="alignment" align="left">
                Alignment
              </Th>
              <Th allowsSorting id="score" align="left">
                Score
              </Th>
              <Th allowsSorting id="weighted_contribution" align="left">
                Weighted contribution
              </Th>
            </Tr>
          </THead>
          <TBody>
            {rows.map((row) => (
              <Tr key={`${row.product_name}_${row.sdg_name}`}>
                <Td>{row.product_name}</Td>
                <Td>{row.sdg_name}</Td>
                <Td>{row.revenue_share}</Td>
                <Td>{row.alignment}</Td>
                <Td>{row.score}</Td>
                <Td>{row.weighted_contribution}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      ) : null}
      {view === "graph" ? (
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={query.data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="sdg_name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: "Weighted contribution",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={(value) => [value, "Weighted contribution"]}
                labelStyle={{ color: "black", fontWeight: "bold" }}
              />
              <ReferenceLine y={0} stroke="var(--colors-text-primary)" />
              <Bar dataKey="weighted_contribution">
                {query.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      Number(entry.weighted_contribution) > 0
                        ? "#4caf50"
                        : "#f44336"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </div>
  );
}
