import { Button, ButtonProps, Text } from '@chakra-ui/react';

const ACTION_BUTTON_PROPS = {
  w: 'full',
  h: 14,
  fontSize: '2xl',
};

type MachineKeyProps = ButtonProps & {
  label: string;
  isActionButton?: boolean;
};

export default function MachineButton(props: MachineKeyProps) {
  const { label, isActionButton, colorScheme = 'grey', ...buttonProps } = props;
  const backgroundColor = colorScheme === 'grey' ? 'bg-gray-700' : '';

  return (
    <Button
      size='4xl'
      colorScheme={colorScheme}
      className={`rounded-lg ${backgroundColor} px-6 py-4 font-semibold drop-shadow-lg hover:drop-shadow-xl active:shadow-none`}
      {...buttonProps}
      {...(isActionButton ? ACTION_BUTTON_PROPS : { fontSize: '4xl' })}
    >
      <Text className='font-machine'>{label}</Text>
    </Button>
  );
}
