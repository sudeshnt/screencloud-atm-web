import { CurrencyStack as CurrencyStackProps } from '@/types';
import { formatPound } from '@/utils';
import { HStack, Text } from '@chakra-ui/react';
import NoteIcon from '../NoteIcon';

export default function CurrencyStack(props: CurrencyStackProps) {
  const { value, notes } = props;

  return (
    <HStack alignItems='center' className='text-black'>
      <NoteIcon value={value} />
      <HStack mt={8} fontSize='xl'>
        <Text textAlign='start' w='70px'>
          x {notes}
        </Text>
        <HStack justify='space-between' w='120px'>
          <Text>=</Text>
          <Text>{formatPound(value * notes)}</Text>
        </HStack>
      </HStack>
    </HStack>
  );
}
