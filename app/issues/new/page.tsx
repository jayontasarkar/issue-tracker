import IssueFormSkeleton from '@/components/shared/issues/IssueFormSkeleton';
import dynamic from 'next/dynamic';

const IssueForm = dynamic(
  () => import('@/components/shared/issues/IssueForm'),
  { ssr: false, loading: () => <IssueFormSkeleton /> }
);

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
