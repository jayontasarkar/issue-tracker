import authOptions from '@/app/auth/authOptions';
import { Button, Flex } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import StatusFilter from './StatusFilter';

const IssueActions = async ({ disabled = false }: { disabled?: boolean }) => {
  const session = await getServerSession(authOptions);

  return (
    <Flex className="mb-5" justify={'between'}>
      <StatusFilter />
      {session && (
        <Button disabled={disabled}>
          <Link href="/issues/new">Create New Issue</Link>
        </Button>
      )}
    </Flex>
  );
};

export default IssueActions;
