import MachineKey from '@/components/Core/MachineKey';
import { Box, Button, Grid, VStack } from '@chakra-ui/react';

export default function KeyPad() {
  return (
    <Box>
      <Grid gap={5} templateColumns='repeat(3, 1fr)'>
        <MachineKey value='1' />
        <MachineKey value='2' />
        <MachineKey value='3' />
        <MachineKey value='4' />
        <MachineKey value='5' />
        <MachineKey value='6' />
        <MachineKey value='7' />
        <MachineKey value='8' />
        <MachineKey value='9' />
        <MachineKey value='*' />
        <MachineKey value='0' />
        <MachineKey value='#' />
      </Grid>
      <VStack mt={4} gap={4}>
        <Button w='full' h={14} colorScheme='green'>
          Enter
        </Button>
        <Button w='full' h={14} colorScheme='yellow'>
          Clear
        </Button>
        <Button w='full' h={14} colorScheme='red'>
          Cancel
        </Button>
      </VStack>
    </Box>
  );
}
