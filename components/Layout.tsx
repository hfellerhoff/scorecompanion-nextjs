import { Box, useColorMode } from '@chakra-ui/react';
import React from 'react';
import Navbar from './Navbar';

interface Props {
  children: JSX.Element | JSX.Element[];
  addPadding?: boolean;
}

const Layout = ({ children, addPadding }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Box minH='100vh' bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}>
      <Navbar />
      <Box as='main' p={addPadding ? [2, 4, 8, 16] : 0} position='relative'>
        {children}
      </Box>
      <footer></footer>
    </Box>
  );
};

export default Layout;
