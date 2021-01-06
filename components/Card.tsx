import {
  Avatar,
  Flex,
  Heading,
  Stack,
  Tag,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
  clickable?: boolean;
  onClick?: () => void;
  p?: number | number[];
}

export const Card = ({ children, clickable, p, onClick }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Stack
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      p={p || 4}
      boxShadow='0px 3px 6px 0px rgba(0, 0, 0, 0.18)'
      cursor={clickable ? 'pointer' : ''}
      w='100%'
      onClick={onClick}
    >
      {children}
    </Stack>
  );
};
