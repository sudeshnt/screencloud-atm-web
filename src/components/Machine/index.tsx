import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import KeyPad, { KeyPadProps } from './KeyPad';

type MachineProps = KeyPadProps & {
  screen: ReactNode;
};

export default function Machine(props: MachineProps) {
  const { screen, ...keypadProps } = props;

  return (
    <Box className='flex flex-row gap-5 rounded-lg bg-slate-300 p-8'>
      <Box>{screen}</Box>
      <Box>
        <KeyPad {...keypadProps} />
      </Box>
    </Box>
  );
}
