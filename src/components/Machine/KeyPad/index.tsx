'use client';

import MachineButton from '@/components/Core/MachineButton';
import { MACHINE_KEYS } from '@/configs';
import useATMStore from '@/store';
import { InputType } from '@/types';
import { Box, Grid, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export type KeyPadProps = {
  inputType?: InputType;
  onPressEnter?: () => void;
  onPressKey?: (key: InputType, digit: string) => void;
  onPressClear?: (key: InputType) => void;
};

export default function KeyPad(props: KeyPadProps) {
  const router = useRouter();
  const { appendInput, deleteInput, clearInput, resetAtm } = useATMStore(
    (state) => state
  );

  const {
    inputType,
    onPressEnter,
    onPressKey = appendInput,
    onPressClear = deleteInput,
  } = props;

  const handlePressDigit = (key: string) => {
    if (inputType) onPressKey(inputType, key);
  };

  const handlePressEnter = () => {
    onPressEnter?.();
  };

  const handlePressClear = () => {
    if (inputType) onPressClear(inputType);
  };

  const handlePressCancel = () => {
    if (inputType === 'pin') {
      clearInput(inputType);
    } else {
      resetAtm();
      router.push('/');
    }
  };

  return (
    <Box>
      <Grid gap={5} templateColumns='repeat(3, 1fr)'>
        {MACHINE_KEYS.map((key) => (
          <MachineButton key={key} label={key} onClick={() => handlePressDigit(key)} />
        ))}
      </Grid>
      <VStack mt={4} gap={4}>
        <MachineButton
          isActionButton
          colorScheme='green'
          label='Enter'
          onClick={handlePressEnter}
        />
        <MachineButton
          isActionButton
          colorScheme='yellow'
          label='Clear'
          onClick={handlePressClear}
        />
        <MachineButton
          isActionButton
          colorScheme='red'
          label='Cancel'
          onClick={handlePressCancel}
        />
        <Text mt={-2} color='CaptionText' fontSize='smaller'>
          press cancel to logout & reset the atm
        </Text>
      </VStack>
    </Box>
  );
}
