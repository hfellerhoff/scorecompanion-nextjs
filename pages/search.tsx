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
import { FaSearch } from 'react-icons/fa';
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
  const getWorks = () =>
    fetch(
      API_WORKS_SEARCH +
        '?' +
        Object.keys(values)
          .map((key) => `${key}=${values[key]}`)
          .join('&')
    );
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
        py={8}
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
        boxShadow='0px 3px 6px 0px rgba(0, 0, 0, 0.18)'
        zIndex='docked'
      >
        <Stack w='100%'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid gap={2} gridTemplateColumns='3fr 2fr 1fr 1fr 1fr'>
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
                    <option
                      key={epoch}
                      selected={
                        router.query.epoch === epoch || composerData
                          ? composerData.openopus.composer.epoch
                          : false
                      }
                    >
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
          </form>
        </Stack>
      </Center>
      <Flex
        mt={28}
        mb={4}
        direction={[
          'column-reverse',
          'column-reverse',
          'column-reverse',
          'row',
        ]}
      >
        <Center flexDirection='column' flex={1} pl={4} pr={2}>
          {!worksData ? (
            isLoading ? (
              <Spinner />
            ) : (
              <Text fontSize='lg'>No piece selected.</Text>
            )
          ) : (
            <WorkList
              works={worksData.works.slice(0, 50)}
              composer={worksData.composer}
              onWorkClick={(work) => setSelectedWork(work)}
            />
          )}
        </Center>
        <Box flex={1} pr={4} pl={2}>
          {selectedWork ? (
            <SearchSelectedWork
              work={selectedWork}
              composer={composerData.openopus.composer}
            />
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </Layout>
  );
}
