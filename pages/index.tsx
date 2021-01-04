import { Button, Center } from '@chakra-ui/react';
import Head from 'next/head';
import ColorModeToggle from '../components/ColorModeToggle';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Score Companion – Find your next piece.</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Center minH='100vh'>
          <ColorModeToggle />
        </Center>
      </main>

      <footer></footer>
    </div>
  );
}
