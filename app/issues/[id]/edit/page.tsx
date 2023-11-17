import IssueFormSkeleton from '@/components/shared/issues/IssueFormSkeleton';
import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const IssueForm = dynamic(
  () => import('@/components/shared/issues/IssueForm'),
  { ssr: false, loading: () => <IssueFormSkeleton /> }
);

type Props = {
  params: {
    id: string;
  };
};

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
