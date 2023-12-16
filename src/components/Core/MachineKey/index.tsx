import { Button, Text } from '@chakra-ui/react';

type MachineKeyProps = {
  value: string;
};

export default function MachineKey(props: MachineKeyProps) {
  const { value } = props;

  return (
    <Button
      size='4xl'
      colorScheme='grey'
      className='rounded bg-gray-700 px-6 py-4 font-semibold text-white shadow-md hover:shadow-lg focus:outline-none active:shadow-none'
    >
      <Text fontSize='4xl' className='font-key'>
        {value}
      </Text>
    </Button>
  );
}
