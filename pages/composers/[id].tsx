import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Link,
  Spinner,
  Stack,
  Tag,
  Text,
  useColorMode,
  Wrap,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Card } from '../../components/Card';
import Layout from '../../components/Layout';
import { API_COMPOSERS_BY_ID } from '../../constants/OpenOpus';
import useQueryData from '../../hooks/useQueryData';
import { Composer, Epoch, Genre } from '../../models/OpenOpus';
import getYearFromDate from '../../util/getYearFromDate';
import { FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';

interface Props {}

const ComposerPage = (props: Props) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const getComposer = () =>
    fetch(API_COMPOSERS_BY_ID + router.query.id + `?complete=true`);
  const { data: queryData, isLoading, isError, error } = useQuery(
    `get-composer-${router.query.id}-complete`,
    getComposer,
    {
      enabled: !!router.query.id,
    }
  );

  const data: {
    openopus: {
      composer: Composer;
      genres: Genre[];
    };
    wikipedia: {
      title: string;
      extract: string[];
    };
  } = useQueryData(queryData);

  return (
    <Layout addPadding>
      <Head>
        <title>View Composer | Score Companion</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {!data ? (
        <Center minH='50vh'>
          <Spinner />
        </Center>
      ) : (
        <Card p={[4, 4, 8, 8]}>
          <Stack spacing={[8, 8, 16]}>
            <Flex align='center' justify='space-between'>
              <Head>
                <title>
                  {data.openopus.composer.complete_name} | Score Companion
                </title>
              </Head>
              <Stack
                align='center'
                justify='space-between'
                width='100%'
                mt={[4, 4, 2]}
                spacing={4}
              >
                <Avatar
                  src={data.openopus.composer.portrait}
                  name={data.openopus.composer.complete_name}
                  display={['flex', 'flex', 'none']}
                  size='lg'
                />
                <Avatar
                  src={data.openopus.composer.portrait}
                  name={data.openopus.composer.complete_name}
                  display={['none', 'none', 'flex']}
                  size='xl'
                />
                <Stack flex={1} ml={4} spacing={1}>
                  <Flex align='center' justify='space-between'>
                    <Heading size='lg'>
                      {data.openopus.composer.complete_name}
                    </Heading>
                  </Flex>
                  <Flex
                    // align={['flex-start', 'flex-start', 'center']}
                    align='center'
                    justify='center'
                    // direction={['column', 'column', 'row']}
                  >
                    <Heading size='sm'>
                      {getYearFromDate(data.openopus.composer.birth)} –{' '}
                      {data.openopus.composer.death
                        ? getYearFromDate(data.openopus.composer.death)
                        : 'Present'}
                    </Heading>
                    <Tag ml={4}>{data.openopus.composer.epoch}</Tag>
                  </Flex>
                </Stack>
              </Stack>
            </Flex>
            <Grid
              gridTemplateColumns={['1fr', '1fr', '1fr 14rem']}
              gap={[8, 8, 16]}
            >
              <Stack spacing={3} maxW={700}>
                <Heading size='md'>About</Heading>
                {data.wikipedia.extract.map((paragraph) => (
                  <Text fontSize='md' lineHeight={1.6}>
                    {paragraph}
                  </Text>
                ))}
                <Link
                  isExternal
                  color={colorMode === 'light' ? 'purple.600' : 'purple.200'}
                  href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                    data.wikipedia.title
                  )}`}
                >
                  <Flex align='center'>
                    <Text mr={1}>Read more on Wikipedia</Text>
                    <FaArrowRight />
                  </Flex>
                </Link>
              </Stack>
              <Stack spacing={3}>
                <Heading size='md'>Genres</Heading>
                <Wrap>
                  {data.openopus.genres.map((genre) => (
                    <NextLink
                      href={`/search?composer=${encodeURIComponent(
                        data.openopus.composer.id
                      )}&genre=${encodeURIComponent(genre)}`}
                    >
                      <Tag as={Button} colorScheme='green' mr={1} mt={1} h={8}>
                        {genre}
                      </Tag>
                    </NextLink>
                  ))}
                </Wrap>
              </Stack>
            </Grid>
          </Stack>
        </Card>
      )}
    </Layout>
  );
};

export default ComposerPage;
