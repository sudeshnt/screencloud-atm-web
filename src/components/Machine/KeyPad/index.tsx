'use client';

import MachineKey from '@/components/Machine/MachineKey';
import { Box, Button, Grid, VStack } from '@chakra-ui/react';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

export type KeyPadProps = {
  onPressKey: (key: string) => void;
  onPressEnter: () => void;
  onPressClear: () => void;
  onPressCancel: () => void;
};

export default function KeyPad(props: KeyPadProps) {
  const { onPressKey, onPressEnter, onPressClear, onPressCancel } = props;

  return (
    <Box>
      <Grid gap={5} templateColumns='repeat(3, 1fr)'>
        {KEYS.map((key) => (
          <MachineKey key={key} label={key} onClick={() => onPressKey(key)} />
        ))}
      </Grid>
      <VStack mt={4} gap={4}>
        <Button w='full' h={14} colorScheme='green' onClick={onPressEnter}>
          Enter
        </Button>
        <Button w='full' h={14} colorScheme='yellow' onClick={onPressClear}>
          Clear
        </Button>
        <Button w='full' h={14} colorScheme='red' onClick={onPressCancel}>
          Cancel
        </Button>
      </VStack>
    </Box>
  );
}
