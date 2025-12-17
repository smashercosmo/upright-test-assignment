import type { Meta, StoryObj } from "@storybook/react-vite";

import { useDataSort } from "../../hooks/useDataSort";
import { Table, TBody, Td, Th, THead, Tr } from "./Table";

const meta = {
  title: "Table",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  {
    column1: "Column 1",
    column2: "Column 2",
    column3: "Column 3",
    column4: "Column 4",
    column5: "Column 5",
  },
  {
    column1: "Column 1",
    column2: "Column 2",
    column3: "Column 3",
    column4: "Column 4",
    column5: "Column 5",
  },
  {
    column1: "Column 1",
    column2: "Column 2",
    column3: "Column 3",
    column4: "Column 4",
    column5: "Column 5",
  },
  {
    column1: "Column 1",
    column2: "Column 2",
    column3: "Column 3",
    column4: "Column 4",
    column5: "Column 5",
  },
  {
    column1: "Column 1",
    column2: "Column 2",
    column3: "Column 3",
    column4: "Column 4",
    column5: "Column 5",
  },
];

const sortableData = [
  {
    name: "Alice",
    email: "alice@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Bob",
    email: "bob@gmail.com",
    role: "Developer",
    status: "Inactive",
  },
  {
    name: "Charlie",
    email: "charlie@gmail.com",
    role: "Admin",
    status: "Active",
  },
];

export const Default: Story = {
  render: () => {
    return (
      <Table aria-label="test table">
        <THead>
          <Tr>
            <Th isRowHeader>column 1</Th>
            <Th>column 2</Th>
            <Th>column 3</Th>
            <Th>column 4</Th>
            <Th>column 5</Th>
          </Tr>
        </THead>
        <TBody>
          {data.map((item, index) => {
            const { column1, column2, column3, column4, column5 } = item;
            return (
              <Tr key={index}>
                <Td>{column1}</Td>
                <Td>{column2}</Td>
                <Td>{column3}</Td>
                <Td>{column4}</Td>
                <Td>{column5}</Td>
              </Tr>
            );
          })}
        </TBody>
      </Table>
    );
  },
};

export const WithSorting: Story = {
  render: () => {
    const { rows, sortDescriptor, setSortDescriptor } = useDataSort({
      data: sortableData,
      defaultOrder: "ascending",
      defaultOrderBy: "name",
    });

    return (
      <Table
        aria-label="Sortable table"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <THead>
          <Tr>
            <Th id="name" isRowHeader allowsSorting>
              Name
            </Th>
            <Th id="email" allowsSorting>
              Email
            </Th>
            <Th id="role" allowsSorting>
              Role
            </Th>
            <Th id="status" allowsSorting>
              Status
            </Th>
          </Tr>
        </THead>
        <TBody>
          {rows.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td>{item.role}</Td>
              <Td>{item.status}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    );
  },
};
