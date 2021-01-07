import {
  Flex,
  Avatar,
  Tag,
  Heading,
  Text,
  Button,
  Link,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { FaMusic, FaSpotify, FaYoutube } from 'react-icons/fa';
import { Composer, ShortWork, Work } from '../models/OpenOpus';
import { Card } from './Card';

interface Props {
  work: Work;
  composer: Composer;
}

const SearchSelectedWork = ({ work, composer }: Props) => {
  return (
    <Card>
      <Stack spacing={8}>
        <Stack>
          <Flex align='center' justify='space-between'>
            <Flex align='center'>
              <Avatar
                size='xs'
                name={composer.complete_name}
                src={composer ? composer.portrait : ''}
              />
              <Text ml={2}>{composer.complete_name}</Text>
            </Flex>
            <Flex>
              <Tag>{work.genre}</Tag>
              <Tag ml={2}>{composer.epoch}</Tag>
            </Flex>
          </Flex>
          <Heading size='md'>{work.title}</Heading>
        </Stack>

        <Stack>
          <Heading size='sm'>Listen</Heading>
          <Flex>
            <Link
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                composer.complete_name
              )} ${encodeURIComponent(work.title)}`}
              isExternal
            >
              <Button colorScheme='red' leftIcon={<FaYoutube />} size='sm'>
                YouTube
              </Button>
            </Link>
            <Link
              href={`https://open.spotify.com/search/${encodeURIComponent(
                composer.complete_name
              )} ${encodeURIComponent(work.title)}`}
              isExternal
              ml={2}
            >
              <Button colorScheme='green' leftIcon={<FaSpotify />} size='sm'>
                Spotify
              </Button>
            </Link>
          </Flex>
        </Stack>
        <Stack>
          <Heading size='sm'>Score</Heading>
          <Flex>
            <Link
              href={`https://www.google.com/search?q=site:imslp.org+${encodeURIComponent(
                composer.name
              )} ${encodeURIComponent(work.title)}`}
              isExternal
            >
              <Button colorScheme='blue' leftIcon={<FaMusic />} size='sm'>
                IMSLP
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SearchSelectedWork;
