import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCaretDown, FaCaretUp, FaSearch } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { Card } from '../components/Card';
import ColorModeToggle from '../components/ColorModeToggle';
import Layout from '../components/Layout';
import SearchSelectedWork from '../components/SearchSelectedWork';
import WorkList from '../components/WorkList';
import RandomWork from '../components/WorkList';
import { API_COMPOSERS_BY_ID, API_WORKS_SEARCH } from '../constants/OpenOpus';
import useQueryData from '../hooks/useQueryData';
import { Composer, Epoch, Genre, Work } from '../models/OpenOpus';

export default function SearchPage() {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { handleSubmit, errors, register, formState, getValues } = useForm();
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work>();
  const [extendSearch, setExtendSearch] = useState(true);

  const getComposer = () => fetch(API_COMPOSERS_BY_ID + router.query.composer);
  const { data: composerResult } = useQuery(
    `get-composer-${router.query.composer}`,
    getComposer,
    {
      enabled: !!router.query.composer,
    }
  );
  const composerData: {
    openopus: {
      composer: Composer;
      genres: Genre[];
    };
  } = useQueryData(composerResult);

  let values = getValues();
  const getWorks = () => {
    return fetch(
      API_WORKS_SEARCH +
        '?' +
        Object.keys(values)
          .map((key) => `${key}=${values[key]}`)
          .join('&')
    );
  };
  const { data: worksResult, isLoading } = useQuery(
    `get-works-${values.title}-${values.composer}-${values.epoch}-${values.genre}`,
    getWorks,
    {
      enabled: !!values.composer,
    }
  );
  const worksData: {
    composer: Composer;
    works: Work[];
  } = useQueryData(worksResult);
  console.log(worksData);

  useEffect(() => {
    if (!!getValues().composer && router.query.composer) {
      if (!fetchEnabled) setFetchEnabled(true);
    } else {
      if (fetchEnabled) setFetchEnabled(false);
    }
  }, [formState]);

  useEffect(() => {
    if (worksData) setExtendSearch(false);
  }, [worksData]);

  function onSubmit(values) {
    if (values.composer) {
      setFetchEnabled(false);
      setTimeout(() => setFetchEnabled(true), 0);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Search | Score Companion</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Center
        position='fixed'
        top={12}
        w='100vw'
        px={4}
        py={[4, 4, 4, 8]}
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
        boxShadow='0px 3px 6px 0px rgba(0, 0, 0, 0.18)'
        zIndex='docked'
      >
        <Stack w='100%'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Center
              onClick={() => setExtendSearch(true)}
              display={[
                extendSearch ? 'none' : 'flex',
                extendSearch ? 'none' : 'flex',
                extendSearch ? 'none' : 'flex',
                'none',
              ]}
            >
              <Text mr={1}>Expand Search</Text>
              <FaCaretDown />
            </Center>
            <Grid
              gap={2}
              gridTemplateColumns={['1fr', '1fr', '1fr', '3fr 2fr 1fr 1fr 1fr']}
              display={[
                extendSearch ? 'grid' : 'none',
                extendSearch ? 'grid' : 'none',
                extendSearch ? 'grid' : 'none',
                'grid',
              ]}
            >
              <FormControl isInvalid={errors.title} htmlFor='title'>
                <Input
                  name='title'
                  placeholder='Title'
                  defaultValue={decodeURIComponent(
                    (router.query.title as string) || ''
                  )}
                  ref={register()}
                ></Input>
              </FormControl>
              <FormControl isInvalid={errors.composer} htmlFor='composer'>
                <Input
                  name='composer'
                  placeholder='Composer'
                  defaultValue={
                    composerData
                      ? composerData.openopus.composer.complete_name
                      : ''
                  }
                  ref={register()}
                ></Input>
              </FormControl>
              <FormControl isInvalid={errors.epoch}>
                <Select name='epoch' ref={register()} isDisabled>
                  <option value='all'>All Periods</option>
                  {Object.values(Epoch).map((epoch) => (
                    <option key={epoch} selected={router.query.epoch === epoch}>
                      {epoch}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isInvalid={errors.genre}>
                <Select name='genre' ref={register()}>
                  <option value='all'>All Genres</option>
                  {Object.values(Genre).map((genre) => (
                    <option key={genre} selected={router.query.genre === genre}>
                      {genre}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Button
                colorScheme='blue'
                leftIcon={<FaSearch />}
                type='submit'
                isLoading={isLoading}
              >
                Search
              </Button>
            </Grid>
            <Center
              mt={4}
              onClick={() => setExtendSearch(false)}
              display={[
                extendSearch ? 'flex' : 'none',
                extendSearch ? 'flex' : 'none',
                extendSearch ? 'flex' : 'none',
                'none',
              ]}
            >
              <Text mr={1}>Hide</Text>
              <FaCaretUp />
            </Center>
          </form>
        </Stack>
      </Center>
      <Flex
        mt={[16, 16, 16, 28]}
        mb={4}
        direction={[
          'column-reverse',
          'column-reverse',
          'column-reverse',
          'row',
        ]}
      >
        <Center
          flexDirection='column'
          flex={1}
          pl={[4, 4, 4, 4]}
          pr={[4, 4, 4, 2]}
          mr={[0, 0, 0, '50vw']}
        >
          {!worksData ? (
            isLoading ? (
              <Spinner />
            ) : (
              <Stack mt={[16, 16, 32]} textAlign='center'>
                <Heading size='md'>
                  Enter some search parameters to get started!
                </Heading>
                <Text>
                  Note: In this iteration of Score Companion, specifying a
                  composer is required.
                </Text>
              </Stack>
            )
          ) : (
            <WorkList
              works={worksData.works.slice(0, 50)}
              composer={worksData.composer}
              onWorkClick={(work) => setSelectedWork(work)}
            />
          )}
        </Center>
        <Box
          flex={1}
          pr={4}
          pl={[4, 4, 4, 2]}
          mb={[4, 4, 4, 0]}
          position={['static', 'static', 'static', 'fixed']}
          right='0'
          width={['100%', '100%', '100%', '50vw']}
        >
          {selectedWork ? (
            <SearchSelectedWork
              work={selectedWork}
              composer={
                composerData ? composerData.openopus.composer : undefined
              }
            />
          ) : (
            <Card>
              <Text>No work selected.</Text>
            </Card>
          )}
        </Box>
      </Flex>
    </Layout>
  );
}
