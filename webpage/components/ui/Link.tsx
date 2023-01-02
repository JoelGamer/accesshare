import MUILink from '@mui/material/Link';
import NextLink from 'next/link';
import { FC, ReactNode } from 'react';

interface LinkProps {
  href: string;
  children?: ReactNode;
}

const Link: FC<LinkProps> = ({ href, children }) => (
  <MUILink component="button" variant="body2">
    <NextLink href={href}>{children}</NextLink>
  </MUILink>
);

export default Link;
