import { Box } from '@chakra-ui/react';
import Screen from '../Screen';
import KeyPad from './KeyPad';

export default function Machine() {
  return (
    <Box className='flex flex-row gap-5 rounded-lg bg-slate-300 p-8'>
      <Box>
        <Screen />
      </Box>
      <Box>
        <KeyPad />
      </Box>
    </Box>
  );
}
