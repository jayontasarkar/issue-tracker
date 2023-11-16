import { Text } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;

const ErrorMessage = ({ children }: Props) => {
  if (!children) return null;

  return (
    <Text as="p" color="red">
      {children}
    </Text>
  );
};

export default ErrorMessage;
