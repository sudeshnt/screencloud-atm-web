import { Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import Screen from '../../Layout/Screen';

export default function WithdrawScreen() {
  return (
    <Screen>
      <Text fontSize='2xl'>Enter Amount to Withdraw</Text>
      <InputGroup pointerEvents='none'>
        <InputLeftElement
          pointerEvents='none'
          mt={4}
          left={2}
          fontSize='5xl'
          // eslint-disable-next-line react/no-children-prop
          children='€'
        />
        <Input
          h={16}
          pl={14}
          placeholder='Enter amount'
          fontSize='3xl'
          type='number'
          className='border-black placeholder:text-black'
        />
      </InputGroup>
    </Screen>
  );
}
