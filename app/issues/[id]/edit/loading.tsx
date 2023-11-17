import Skeleton from '@/components/ui/Skeleton';
import { Box } from '@radix-ui/themes';

const EditIssueLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default EditIssueLoadingPage;
