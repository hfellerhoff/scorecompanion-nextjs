import { Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  href: string;
  label: string;
}

const NavbarLink = ({ href, label }: Props) => {
  const router = useRouter();

  return (
    <NextLink href={href}>
      <Link
        variant='navigation'
        mr={8}
        borderBottom={
          router.pathname.includes(href)
            ? `4px solid #FFB790`
            : `4px solid transparent`
        }
      >
        {label}
      </Link>
    </NextLink>
  );
};

export default NavbarLink;
