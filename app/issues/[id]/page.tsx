import StatusBadge from '@/components/shared/issues/StatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';

type Props = {
  params: {
    id: string;
  };
};

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <StatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-5">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
