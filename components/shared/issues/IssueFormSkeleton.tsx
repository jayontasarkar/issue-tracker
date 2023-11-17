import Skeleton from '@/components/ui/Skeleton';
import { Box } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="25rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
