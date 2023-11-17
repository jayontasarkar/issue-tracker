import { Box, Card, Flex, Heading } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingIssuePage = () => {
  return (
    <Box>
      <Heading className="max-w-xl">
        <Skeleton />
      </Heading>
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" />
        <Skeleton />
      </Flex>
      <Card className="prose mt-5">
        <Skeleton count={6} />
      </Card>
    </Box>
  );
};

export default LoadingIssuePage;
