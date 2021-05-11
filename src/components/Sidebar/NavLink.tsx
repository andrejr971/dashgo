import { Link as ChakraLink, Icon, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from 'react';
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  title: string;
  icon: ElementType;
  href: string;
}

export function NavLink({ title, icon: Icons, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={Icons} fontSize="20" />
        <Text ml="4" fontWeight="medium">{title}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}