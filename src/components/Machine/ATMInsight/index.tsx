import CurrencyStack from '@/components/Core/CurrencyStack';
import useATMStore from '@/store';
import { Box, HStack } from '@chakra-ui/react';

export default function ATMInsight() {
  const { atmVault } = useATMStore((state) => state);

  return (
    <HStack
      justify='space-between'
      w='760px'
      borderRadius='lg'
      p={8}
      pt={0}
      className=' bg-slate-300 p-8 font-machine'
    >
      <Box mt={-6}>
        {atmVault.map((cash) => (
          <CurrencyStack key={cash.value} {...cash} />
        ))}
      </Box>
    </HStack>
  );
}
