import { Box, Flex, Text } from '@chakra-ui/react';
import { PiMoney } from 'react-icons/pi';

type NoteIconProps = {
  value: number | string;
};

export default function NoteIcon(props: NoteIconProps) {
  const { value } = props;

  return (
    <Box my={-8}>
      <Flex
        position='relative'
        top='63px'
        width='56px'
        height='30px'
        left='20px'
        borderRadius='10px'
        justify='center'
        alignItems='center'
        className='bg-digitalScreen'
      >
        {/* <RiMoneyPoundCircleLine position='absolute' size='2em' /> */}
        <Text className='font-machine' fontWeight='600' fontSize='lg' mt='2px' ml='2px'>
          £ {value}
        </Text>
      </Flex>
      <PiMoney size='6em' />
    </Box>
  );
}
