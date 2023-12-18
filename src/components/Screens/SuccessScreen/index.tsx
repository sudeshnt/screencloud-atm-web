import NoteIcon from '@/components/Core/NoteIcon';
import { HStack, Text, VStack } from '@chakra-ui/react';
import Screen from '../../Layout/Screen';

type SuccessScreenProps = {
  withdrawAmount: string | null;
  notes: Record<string, string> | null;
};

export default function SuccessScreen(props: SuccessScreenProps) {
  const { withdrawAmount, notes = {} } = props;

  return (
    <Screen>
      <Text fontSize='3xl'>Withdraw Successful!</Text>
      <Text fontSize='2xl'>Please take your cash.</Text>
      {notes && (
        <VStack alignItems='flex-start'>
          {Object.keys(notes)
            .reverse()
            .map((key) => {
              return (
                <HStack key={key} alignItems='center'>
                  <NoteIcon value={key} />
                  <HStack mt={8} fontSize='3xl'>
                    <Text textAlign='start' w='70px'>
                      x {notes[key]}
                    </Text>
                    <HStack justify='space-between' w='80px'>
                      <Text>=</Text>
                      <Text>{parseInt(key) * parseInt(notes[key])}</Text>
                    </HStack>
                  </HStack>
                </HStack>
              );
            })}
        </VStack>
      )}
      <Text borderTopWidth={1} borderColor='black' w='full' fontSize='6xl' mt={8} pt={4}>
        {withdrawAmount}
      </Text>
    </Screen>
  );
}
