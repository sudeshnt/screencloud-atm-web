import CurrencyStack from '@/components/Core/CurrencyStack';
import useATMStore from '@/store';
import { calculateATMVaultBalance, formatPound } from '@/utils';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';

export default function ATMInsight() {
  const { atmVault } = useATMStore((state) => state);

  const atmVaultBalance = useMemo(() => calculateATMVaultBalance(atmVault), [atmVault]);

  return (
    <Accordion w='full' allowToggle>
      <AccordionItem border='none'>
        <AccordionButton>
          <Text fontSize='lg' flex='1' textAlign='right'>
            Atm Insights
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <HStack
            justify='space-between'
            w='full'
            borderRadius='lg'
            p={8}
            pt={0}
            className=' bg-slate-300 p-8 font-machine'
            textColor='black'
          >
            <Box mt={-6}>
              {atmVault
                .sort((a, b) => b.value - a.value)
                .map((cash) => (
                  <CurrencyStack key={cash.value} {...cash} />
                ))}
            </Box>
            <VStack alignItems='flex-end' justify='flex-end' textAlign='right'>
              <Text>ATM balance</Text>
              <Text fontSize='4xl'>{formatPound(atmVaultBalance)}</Text>
            </VStack>
          </HStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
