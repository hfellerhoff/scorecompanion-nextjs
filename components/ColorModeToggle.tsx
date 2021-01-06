import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

interface Props {}

const ColorModeToggle = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      aria-label='Toggle color theme'
      onClick={toggleColorMode}
      variant='ghost'
    />
  );
};

export default ColorModeToggle;
