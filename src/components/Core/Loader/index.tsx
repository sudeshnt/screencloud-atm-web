import { Text, VStack } from '@chakra-ui/react';
import HashLoader from 'react-spinners/HashLoader';

export default function Loader() {
  return (
    <VStack h='full' justify='center' fontSize='lg'>
      <Text>Loading</Text>
      <HashLoader color='#236b4b' />
      <Text mt={2.5}>Please Wait</Text>
    </VStack>
  );
}
