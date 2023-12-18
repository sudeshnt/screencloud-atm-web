import CurrencyStack from '@/components/Core/CurrencyStack';
import ScreenButton from '@/components/Core/ScreenButton';
import { MAX_OVERDRAW } from '@/configs';
import useATMStore from '@/store';
import { formatPound } from '@/utils';
import { Alert, AlertIcon, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Screen from '../../Layout/Screen';

type SuccessScreenProps = {
  withdrawAmount: string | null;
  notes: Record<string, string> | null;
};

export default function SuccessScreen(props: SuccessScreenProps) {
  const router = useRouter();
  const { withdrawAmount, notes = {} } = props;

  const { user } = useATMStore((state) => state);
  const { currentBalance, overdrawnAmount } = user;

  const handlePressWithdrawAgain = () => {
    router.replace('home');
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
      <Text fontSize='xl'>Your current balance: {formatPound(currentBalance)}</Text>
      {overdrawnAmount ? (
        <Alert status='warning' mb={3}>
          <AlertIcon />
          You have overdrawn an amount of {formatPound(overdrawnAmount)} from your account
        </Alert>
      ) : null}
      {overdrawnAmount < MAX_OVERDRAW ? (
        <ScreenButton
          variant='ghost'
          fontSize='lg'
          mt={2}
          onClick={handlePressWithdrawAgain}
        >
          Make another withdrawal
        </ScreenButton>
      ) : null}
    </Screen>
  );
}
