import { TIssueSearchQuery } from '@/app/issues/list/page';
import IssueStatusBadge from '@/components/shared/issues/StatusBadge';
import { Issue } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Link, Table } from '@radix-ui/themes';
import NextLink from 'next/link';

type TProps = {
  searchParams: TIssueSearchQuery;
  issues: Issue[];
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue Title', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  {
    label: 'Created',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

export const columnNames = columns.map((column) => column.value);

const IssueTable = ({ searchParams, issues }: TProps) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className || ''}
            >
              <NextLink
                href={{ query: { ...searchParams, orderBy: column.value } }}
              >
                {column.label}
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.RowHeaderCell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
