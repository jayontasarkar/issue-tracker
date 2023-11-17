import IssueActions from '@/components/shared/issues/IssueActions';
import IssueStatusBadge from '@/components/shared/issues/StatusBadge';
import Link from '@/components/ui/Link';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';

const IssueListPage = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
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
    </div>
  );
};

// Dynamic rendering, force to revalidate on every request
// By default nextjs only uses dynamic rendering for routes that has
// query params
export const dynamic = 'force-dynamic'; // OR
// export const revalidate = 0;

export default IssueListPage;
