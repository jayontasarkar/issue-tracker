import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from '@/components/shared/issues/AssigneeSelect';
import DeleteIssueBtn from '@/components/shared/issues/DeleteIssueBtn';
import EditIssueBtn from '@/components/shared/issues/EditIssueBtn';
import IssueDetails from '@/components/shared/issues/IssueDetails';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssues(+params.id);

  return {
    title: issue?.title || 'Issue Tracker',
    description: 'Details of issue ' + issue?.id,
  };
}

const fetchIssues = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssues(+params.id);

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: '1', md: '5' }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueBtn issueId={issue.id} />
            <DeleteIssueBtn issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailsPage;
