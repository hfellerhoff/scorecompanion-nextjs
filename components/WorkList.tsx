import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Spinner,
  Stack,
  Tag,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { Composer, ShortWork, Work } from '../models/OpenOpus';
import { Card } from './Card';

interface Props {
  works: (ShortWork | Work)[];
  composer?: Composer;
  onWorkClick: (work: Work) => void;
}

const WorkList = ({ works, composer, onWorkClick }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Stack w='100%'>
      {works.map((work) => (
        <Card
          clickable
          onClick={() => {
            onWorkClick(work as Work);
            window.scrollTo(0, 0);
          }}
        >
          <Flex align='center' justify='space-between'>
            <Flex align='center'>
              <Avatar
                size='xs'
                name={
                  composer
                    ? composer.complete_name
                    : (work as ShortWork).composer.complete_name
                }
                src={composer ? composer.portrait : ''}
              />
              <Text ml={2}>
                {composer
                  ? composer.complete_name
                  : (work as ShortWork).composer.complete_name}
              </Text>
            </Flex>
            <Flex>
              <Tag>{work.genre}</Tag>
              <Tag ml={2}>
                {composer ? composer.epoch : (work as ShortWork).composer.epoch}
              </Tag>
            </Flex>
          </Flex>
          <Heading size='md'>{work.title}</Heading>
        </Card>
      ))}
    </Stack>
  );
};

export default WorkList;
