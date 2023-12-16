import useATMStore from '@/store';
import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Screen from '../../Layout/Screen';

const formatter = new Intl.NumberFormat('en-EU', {
  style: 'currency',
  currency: 'EUR',
});

export default function HomeScreen() {
  const router = useRouter();

  const currentBalance = useATMStore((state) => state.currentBalance);

  const handlePressWithdraw = () => {
    router.push('withdraw');
  };

  return (
    <Screen>
      <Text fontSize='xl'>Dear Customer, Your account balance is</Text>
      <Text fontSize='5xl'>{formatter.format(currentBalance)}</Text>
      <Button
        colorScheme='blackAlpha'
        variant='outline'
        fontSize='4xl'
        p={7}
        onClick={handlePressWithdraw}
      >
        Withdraw
      </Button>
    </Screen>
  );
}
