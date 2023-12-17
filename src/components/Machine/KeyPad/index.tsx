'use client';

import MachineKey from '@/components/Machine/MachineKey';
import { InputType } from '@/types';
import { Box, Grid, VStack } from '@chakra-ui/react';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

export type KeyPadProps = {
  inputType?: InputType;
  onPressKey: (key: InputType, digit: string) => void;
  onPressEnter: () => void;
  onPressClear: (key: InputType) => void;
  onPressCancel: (key: InputType) => void;
};

export default function KeyPad(props: KeyPadProps) {
  const { inputType, onPressKey, onPressEnter, onPressClear, onPressCancel } = props;

  const handlePressDigit = (key: string) => {
    if (inputType) onPressKey(inputType, key);
  };

  const handlePressEnter = () => {
    onPressEnter();
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
          label='Enter'
          colorScheme='green'
          onClick={handlePressEnter}
        />
        <MachineKey
          isActionButton
          label='Clear'
          colorScheme='yellow'
          onClick={handlePressClear}
        />
        <MachineKey
          isActionButton
          label='Cancel'
          colorScheme='red'
          onClick={handlePressCancel}
        />
      </VStack>
    </Box>
  );
}
