import Pagination from '@/components/shared/Pagination';
import IssueActions from '@/components/shared/issues/IssueActions';
import IssueTable, { columnNames } from '@/components/shared/issues/IssueTable';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};

export type TIssueSearchQuery = {
  status: Status;
  orderBy?: string;
  page?: string;
};

type TProps = {
  searchParams: TIssueSearchQuery;
};

const IssueListPage = async ({ searchParams }: TProps) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy: { [key: string]: string } = {};
  if (
    searchParams?.orderBy &&
    columnNames.includes(searchParams.orderBy as any)
  ) {
    orderBy[searchParams.orderBy as string] = 'asc';
  }

  const page = parseInt(searchParams?.page as string) || 1;
  const pageSize = 10;

  const where = {
    status,
  };

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalIssues = await prisma.issue.count({ where });

  return (
    <div>
      <IssueActions />

      <IssueTable searchParams={searchParams} issues={issues} />

      <div className="my-5 flex justify-center">
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={totalIssues}
        />
      </div>
    </div>
  );
};

// Dynamic rendering, force to revalidate on every request
// By default nextjs only uses dynamic rendering for routes that has
// query params
export const dynamic = 'force-dynamic'; // OR
// export const revalidate = 0;

export default IssueListPage;
