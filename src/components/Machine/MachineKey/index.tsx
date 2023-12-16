import { Button, ButtonProps, Text } from '@chakra-ui/react';

type MachineKeyProps = ButtonProps & {
  label: string;
};

export default function MachineKey(props: MachineKeyProps) {
  const { label, ...buttonProps } = props;

  return (
    <Button
      size='4xl'
      colorScheme='grey'
      className='rounded bg-gray-700 px-6 py-4 font-semibold text-white shadow-md hover:shadow-lg focus:outline-none active:shadow-none'
      {...buttonProps}
    >
      <Text fontSize='4xl' className='font-key'>
        {label}
      </Text>
    </Button>
  );
}
