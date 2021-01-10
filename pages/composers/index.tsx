import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Card } from '../../components/Card';
import Layout from '../../components/Layout';
import { API_COMPOSERS_POPULAR } from '../../constants/OpenOpus';
import { Composer } from '../../models/OpenOpus';
import NextLink from 'next/link';
import getYearFromDate from '../../util/getYearFromDate';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { getEssentialComposers, getPopularComposers } from '../../util/API';
import useQueryData from '../../hooks/useQueryData';
import Head from 'next/head';

interface Props {}

type ListType = 'Popular' | 'Essential';
type SortingOptions = 'Alphabetical' | 'Chronological';

const ComposersPage = (props: Props) => {
  const [listType, setListType] = useState<ListType>('Popular');
  const [sortBy, setSortBy] = useState<SortingOptions>('Alphabetical');

  let composers;

  const { data: popularData } = useQuery(
    'get-popular-composers',
    getPopularComposers
  );
  const popularComposers = useQueryData<Composer[]>(popularData);

  const { data: essentialData } = useQuery(
    'get-essential-composers',
    getEssentialComposers
  );
  const essentialComposers = useQueryData<Composer[]>(essentialData);

  console.log(essentialComposers);

  if (listType === 'Popular') composers = popularComposers;
  if (listType === 'Essential') composers = essentialComposers;

  return (
    <Layout addPadding>
      <Head>
        <title>Composer List | Score Companion</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Stack>
        <Flex
          align='center'
          justify='space-between'
          mb={2}
          direction={['column', 'column', 'row']}
        >
          <Heading size='lg'>Composers</Heading>
          <Flex mt={[2, 2, 0]}>
            <Menu>
              <MenuButton
                mr={2}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme='purple'
              >
                {listType}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setListType('Popular')}>
                  Popular
                </MenuItem>
                <MenuItem onClick={() => setListType('Essential')}>
                  Essential
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme='orange'
              >
                {sortBy}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setSortBy('Alphabetical')}>
                  Alphabetical
                </MenuItem>
                <MenuItem onClick={() => setSortBy('Chronological')}>
                  Chronological
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {!composers ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          composers
            .sort((a, b) => {
              if (sortBy === 'Alphabetical') {
                if (a.name <= b.name) return -1;
                else return 1;
              } else if (sortBy) {
                if (getYearFromDate(a.birth) <= getYearFromDate(b.birth))
                  return -1;
                else return 1;
              }
              return -1;
            })
            .map((composer) => (
              <Card key={composer.id} clickable>
                <NextLink href={`/composers/${composer.id}`}>
                  <Flex align='center' justify='space-between' width='100%'>
                    <Avatar
                      src={composer.portrait}
                      name={composer.complete_name}
                    />
                    <Stack flex={1} ml={4} spacing={[0, 0, 1]}>
                      <Flex align='center' justify='space-between'>
                        <Heading size='md'>{composer.name}</Heading>
                        <Heading size='sm'>
                          {getYearFromDate(composer.birth)} –{' '}
                          {composer.death
                            ? getYearFromDate(composer.death)
                            : 'Present'}
                        </Heading>
                      </Flex>
                      <Flex
                        align={['flex-start', 'flex-start', 'center']}
                        justify='space-between'
                        direction={['column', 'column', 'row']}
                      >
                        <Text>{composer.complete_name}</Text>
                        <Tag mt={[1, 1, 0]}>{composer.epoch}</Tag>
                      </Flex>
                    </Stack>
                  </Flex>
                </NextLink>
              </Card>
            ))
        )}
      </Stack>
    </Layout>
  );
};

export default ComposersPage;
