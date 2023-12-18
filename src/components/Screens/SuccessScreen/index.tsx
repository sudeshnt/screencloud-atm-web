import CurrencyStack from '@/components/Core/CurrencyStack';
import ScreenButton from '@/components/Core/ScreenButton';
import { MAX_OVERDRAW } from '@/configs';
import { formatPound } from '@/utils';
import { Alert, AlertIcon, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Screen from '../../Layout/Screen';

type SuccessScreenProps = {
  withdrawAmount: string | null;
  overdrawnAmount: number;
  notes: Record<string, string> | null;
};

export default function SuccessScreen(props: SuccessScreenProps) {
  const router = useRouter();
  const { withdrawAmount, overdrawnAmount, notes = {} } = props;

  const handlePressWithdrawAgain = () => {
    router.replace('withdraw');
  };

  return (
    <Screen>
      <Text fontSize='2xl'>Withdraw Successful!</Text>
      <Text fontSize='xl'>Please take your cash.</Text>
      {notes && (
        <VStack alignItems='flex-start'>
          {Object.keys(notes)
            .reverse()
            .map((key) => {
              return (
                <CurrencyStack
                  key={key}
                  value={parseInt(key)}
                  notes={parseInt(notes[key])}
                />
              );
            })}
        </VStack>
      )}
      <Text borderTopWidth={1} borderColor='black' w='full' fontSize='4xl' mt={8} pt={4}>
        {withdrawAmount}
      </Text>
      {overdrawnAmount ? (
        <Alert status='warning' mb={3}>
          <AlertIcon />
          You have overdrawn an amount of {formatPound(overdrawnAmount)} from your account
        </Alert>
      ) : null}
      {overdrawnAmount < MAX_OVERDRAW ? (
        <ScreenButton variant='ghost' fontSize='lg' onClick={handlePressWithdrawAgain}>
          Make another withdrawal
        </ScreenButton>
      ) : null}
    </Screen>
  );
}
