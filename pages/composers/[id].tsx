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
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Card p={[4, 4, 8, 8]}>
          <Stack spacing={8}>
            <Flex align='center' justify='space-between'>
              <Head>
                <title>
                  {data.openopus.composer.complete_name} | Score Companion
                </title>
              </Head>
              <Flex>
                <Avatar
                  src={data.openopus.composer.portrait}
                  name={data.openopus.composer.complete_name}
                />
                <Box ml={4}>
                  <Heading size='md'>{data.openopus.composer.name}</Heading>
                  <Text>{data.openopus.composer.complete_name}</Text>
                </Box>
              </Flex>
              <Stack align='flex-end'>
                <Heading size='sm'>
                  {getYearFromDate(data.openopus.composer.birth)} –{' '}
                  {data.openopus.composer.death
                    ? getYearFromDate(data.openopus.composer.death)
                    : 'Present'}
                </Heading>
                <Tag>{data.openopus.composer.epoch}</Tag>
              </Stack>
            </Flex>
            <Grid
              gridTemplateColumns={['1fr', '1fr', '3fr 1fr', '3fr 2fr']}
              gap={8}
            >
              <Stack spacing={3}>
                <Heading size='md'>About</Heading>
                {data.wikipedia.extract.map((paragraph) => (
                  <Text fontSize='md'>{paragraph}</Text>
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
