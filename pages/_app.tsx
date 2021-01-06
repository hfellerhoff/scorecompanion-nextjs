import {
  ChakraProvider,
  extendTheme,
  theme as chakraTheme,
} from '@chakra-ui/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const fonts = {
  body: `\"Poppins\", ${chakraTheme.fonts.body}`,
  heading: `\"Poppins\", ${chakraTheme.fonts.heading}`,
};

const theme = extendTheme({
  fonts,
  components: {
    Link: {
      baseStyle: {},
      variants: {
        navigation: {
          fontWeight: 'semibold',
          marginTop: 1,
          borderBottom: '4px solid transparent',
          _hover: {
            textDecoration: 'none',
            borderBottom: '4px solid #FFB790',
          },
          transition: '0.1s',
        },
      },
    },
  },
});

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
