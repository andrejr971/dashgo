import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { RiMenu2Line } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SiderbarDrawerContext';
import { Logo } from './Logo';
import { NotificationNav } from './NotificationsNav';
import { Profile } from './Profile'
import { SearchBox } from './SearchBox';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { onOpen } = useSidebarDrawer();

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenu2Line} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}
      <Logo />
      
      {isWideVersion && (
        <SearchBox />
      )}
    
      <Flex
        alignItems="center"
        ml="auto"
      >
        <NotificationNav />
      
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}