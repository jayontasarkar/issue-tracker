import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    {
      label: 'In-progress Issues',
      value: inProgress,
      status: 'IN_PROGRESS',
    },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <div className="flex md:flex-column justify-between gap-6 mb-10">
      {containers.map((container) => (
        <Card key={container.label} style={{ width: '350px' }}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default IssueSummary;
