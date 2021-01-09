import {
  Box,
  Flex,
  useColorMode,
  Image,
  Heading,
  Link,
  Grid,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import ColorModeToggle from './ColorModeToggle';
import NextLink from 'next/link';
import NavbarLink from './NavbarLink';
import { useRouter } from 'next/router';

interface Props {}

const Navbar = (props: Props) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <>
      <Box h={16}></Box>
      <Flex
        as='header'
        align='center'
        justify='space-between'
        px={[2, 2, 4, 8]}
        h={16}
        boxShadow={
          router.pathname.includes('search')
            ? ''
            : '0px 3px 6px 0px rgba(0, 0, 0, 0.18)'
        }
        zIndex='dropdown'
        position='fixed'
        top={0}
        width='100vw'
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
      >
        <Flex align='center'>
          <Box cursor='pointer'>
            <NextLink href='/'>
              <Image src='/images/logo.png' w={7} mr={8}></Image>
            </NextLink>
          </Box>
          <NavbarLink label='Composers' href='/composers' />
          {/* <NavbarLink label='Works' href='/works' /> */}
          <NavbarLink label='Search' href='/search' />
        </Flex>
        <Flex align='center' justify='flex-end'>
          <ColorModeToggle />
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
