'use client';

import MachineKey from '@/components/Machine/MachineKey';
import useATMStore from '@/store';
import { InputType } from '@/types';
import { Box, Grid, VStack } from '@chakra-ui/react';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

export type KeyPadProps = {
  inputType?: InputType;
  onPressEnter?: () => void;
  onPressKey?: (key: InputType, digit: string) => void;
  onPressClear?: (key: InputType) => void;
  onPressCancel?: (key: InputType) => void;
};

export default function KeyPad(props: KeyPadProps) {
  const { appendInput, deleteInput, clearInput } = useATMStore((state) => state);

  const {
    inputType,
    onPressEnter,
    onPressKey = appendInput,
    onPressClear = deleteInput,
    onPressCancel = clearInput,
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
    if (inputType) onPressCancel(inputType);
  };

  return (
    <Box>
      <Grid gap={5} templateColumns='repeat(3, 1fr)'>
        {KEYS.map((key) => (
          <MachineKey key={key} label={key} onClick={() => handlePressDigit(key)} />
        ))}
      </Grid>
      <VStack mt={4} gap={4}>
        <MachineKey
          isActionButton
          colorScheme='green'
          label='Enter'
          onClick={handlePressEnter}
        />
        <MachineKey
          isActionButton
          colorScheme='yellow'
          label='Clear'
          onClick={handlePressClear}
        />
        <MachineKey
          isActionButton
          colorScheme='red'
          label='Cancel'
          onClick={handlePressCancel}
        />
      </VStack>
    </Box>
  );
}
