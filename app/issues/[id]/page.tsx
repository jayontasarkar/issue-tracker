import EditIssueBtn from '@/components/shared/issues/EditIssueBtn';
import IssueDetails from '@/components/shared/issues/IssueDetails';
import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueBtn issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
