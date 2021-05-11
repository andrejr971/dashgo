import { Link, Icon, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from 'react';

interface NavLinkProps extends ChakraLinkProps {
  title: string;
  icon: ElementType
}

export function NavLink({ title, icon: Icons, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={Icons} fontSize="20" />
      <Text ml="4" fontWeight="medium">{title}</Text>
    </Link>
  )
}