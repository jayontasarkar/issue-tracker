import IssueChart from '@/components/shared/issues/IssueChart';
import IssueSummary from '@/components/shared/issues/IssueSummary';
import LatestIssues from '@/components/shared/issues/LatestIssues';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex, Grid } from '@radix-ui/themes';

export default async function Home() {
  const statusCounts = await prisma.issue.groupBy({
    by: ['status'],
    _count: {
      status: true,
    },
  });

  const openIssues =
    statusCounts.find((s) => s.status === Status.OPEN)?._count.status || 0;
  const closedIssues =
    statusCounts.find((s) => s.status === Status.CLOSED)?._count.status || 0;
  const inProgressIssues =
    statusCounts.find((s) => s.status === Status.IN_PROGRESS)?._count.status ||
    0;

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />
        <IssueChart
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
