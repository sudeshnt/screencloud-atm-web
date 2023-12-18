import ScreenButton from '@/components/Core/ScreenButton';
import useATMStore from '@/store';
import { formatPound } from '@/utils';
import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Screen from '../../Layout/Screen';

export default function HomeScreen() {
  const router = useRouter();

  const currentBalance = useATMStore((state) => state.currentBalance);

  const handlePressWithdraw = () => {
    router.push('withdraw');
  };

  return (
    <Screen>
      <Text fontSize='3xl'>Hi Michael</Text>
      <Text fontSize='xl'>Your account balance is</Text>
      <Text fontSize='5xl'>{formatPound(currentBalance)}</Text>
      <ScreenButton onClick={handlePressWithdraw}>Withdraw</ScreenButton>
    </Screen>
  );
}
