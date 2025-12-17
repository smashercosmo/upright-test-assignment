import { useSuspenseQuery } from "@tanstack/react-query";
import { trpc } from "../../utils/trpc";
import { Table, Tr, Td, THead, Th, TBody } from "../../components/Table";
import { generatePath } from "react-router";
import { paths } from "../../routes/paths";
import { useDataSort } from "../../hooks/useDataSort";

export function CompaniesPageList() {
  const query = useSuspenseQuery(trpc.getSDGConfidence.queryOptions());

  const { rows, sortDescriptor, setSortDescriptor } = useDataSort({
    data: query.data,
    defaultOrder: "ascending",
    defaultOrderBy: "company_name",
  });

  return (
    <Table
      aria-label="Companies list"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <THead>
        <Tr>
          <Th isRowHeader allowsSorting id="company_name" align="left">
            Company name
          </Th>
          <Th allowsSorting id="sdg_name" align="left">
            SDG
          </Th>
          <Th allowsSorting id="normalized_score" align="left">
            Score
          </Th>
          <Th allowsSorting id="confidence_band" align="left">
            Confidence band
          </Th>
        </Tr>
      </THead>
      <TBody>
        {rows.map((row) => (
          <Tr
            href={generatePath(paths.companies.$companyId, {
              companyId: String(row.company_id),
            })}
            key={`${row.company_id}_${row.sdg_code}`}
          >
            <Td>{row.company_name}</Td>
            <Td>{row.sdg_name}</Td>
            <Td>{row.normalized_score}</Td>
            <Td>{row.confidence_band}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
}
