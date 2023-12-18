import { Button, ButtonProps } from '@chakra-ui/react';

export default function ScreenButton(props: ButtonProps) {
  return (
    <Button
      w='full'
      className='hover:bg-gray-400 hover:shadow-xl'
      colorScheme='black'
      variant='outline'
      fontSize='4xl'
      p={7}
      {...props}
    >
      {props.children}
    </Button>
  );
}
