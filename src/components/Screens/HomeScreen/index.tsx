import useATMStore from '@/store';
import { formatPound } from '@/utils';
import { Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import Screen from '../../Layout/Screen';

export default function HomeScreen() {
  const { withdrawAmount, user } = useATMStore((state) => state);

  return (
    <Screen>
      <Text fontSize='3xl'>Hi {user.name}</Text>
      <Text fontSize='xl'>Your current balance is</Text>
      <Text fontSize='5xl'>{formatPound(user.currentBalance)}</Text>
      <Text fontSize='2xl' mt={10}>
        Enter Amount to Withdraw
      </Text>
      <InputGroup pointerEvents='none' w='325px'>
        <InputLeftElement
          pointerEvents='none'
          mt={4}
          left={2}
          fontSize='5xl'
          // eslint-disable-next-line react/no-children-prop
          children='£'
        />
        <Input
          h={16}
          pl={14}
          placeholder='Enter amount'
          fontSize='3xl'
          type='number'
          className='border-black placeholder:text-black'
          value={withdrawAmount ?? ''}
          readOnly
        />
      </InputGroup>
    </Screen>
  );
}
