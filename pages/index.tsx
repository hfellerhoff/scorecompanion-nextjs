import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Button, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';

interface Props {}

const HomePage = (props: Props) => {
  return (
    <Layout>
      <Head>
        <title>Score Companion – Find your next piece.</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Stack spacing={4} align='center' justify='center' minH='80vh'>
        <Heading>Score Companion</Heading>
        <Text mt={2}>Made for Don't Panic! CS Hackathon, January 2020</Text>
        <Flex>
          <Link href='/composers'>
            <Button colorScheme='orange'>Composers</Button>
          </Link>
          <Link href='/search'>
            <Button colorScheme='blue' ml={2}>
              Search
            </Button>
          </Link>
        </Flex>
      </Stack>
    </Layout>
  );
};

export default HomePage;
