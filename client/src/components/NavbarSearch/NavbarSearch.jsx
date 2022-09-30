import react, { useState } from 'react';
import { Box, Flex, Button, Stack } from '@chakra-ui/react';

export default function NavbarSerch({ NAV_ITEMS }) {
  return (
    <Box>
      <Flex
        bg={'white'}
        color={'gray.600'}
        minH={'50px'}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction={'row'} spacing={4} alignContent={'center'}>
              {NAV_ITEMS.map((navItem) => {
                return (
                  <Box key={navItem.label}>
                    <Button
                      onClick={() => navItem.onClick()}
                      leftIcon={navItem.icon}
                      p={3}
                      fontSize={'md'}
                      fontWeight={'normal'}
                      color={'gray.400'}
                      bg={'none'}
                      _hover={{
                        textDecoration: 'none',
                        color: 'gray.800',
                      }}
                      _active={{
                        bg: 'none',
                        textDecoration: 'none',
                        color: 'gray.800',
                      }}
                      _focus={{
                        bg: 'none',
                        textDecoration: 'none',
                        color: 'gray.800',
                      }}
                    >
                      {navItem.label}
                    </Button>
                  </Box>
                );
              })}
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
