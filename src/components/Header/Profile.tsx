import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex
      align="center"
    >
      <Box mr="4" textAlign="right">
        <Text>André Junior</Text>
        <Text color="gray.300" fontSize="small">andre.souza64@fatec.sp.gov.br</Text>
      </Box>

      <Avatar size="md" name="André Junior" src="https://github.com/andrejr971.png" />
    </Flex>
  );
}