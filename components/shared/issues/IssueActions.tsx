import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const IssueActions = ({ disabled = false }: { disabled?: boolean }) => {
  return (
    <div className="mb-5">
      <Button disabled={disabled}>
        <Link href="/issues/new">Create New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
