import { Box, Flex, Avatar, Stack, Button, Text, Heading, HStack, Center } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export default function UserCardAdmin({ fullName, image, firstName, lastName, email, userName, userId, HandleBlock }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function randomNumber(min, max) {
        let a = Math.random() * (max - min) + min;
        return Math.floor(a);
    }


    return (
        <>

            <Stack
                border={"1px"}
                borderColor={"gray.200"}
                bg={'white'}
                display={'flex'}
                flexDir={'row'}
                align={'center'}
                minW={700}
                h={100}
                borderRadius={2}>

                <Box
                    bg={`logo.${randomNumber(1, 4)}`}
                    h={100}
                    w={10}
                    mr={'2%'} />
                <Avatar
                    size={'lg'}
                    src={image}
                    name={fullName}
                    alt={'Author'}
                    css={{
                        border: '4px solid white',
                    }} />
                <Box
                    w={'20%'}
                    p={2}
                    mr={'2%'}>
                    <Heading
                        fontSize={'md'}
                        textAlign={'left'}
                    >
                        {firstName}
                        <br />{lastName}
                    </Heading>
                    <Text fontSize={'xs'} color={'gray.700'}>{userName}</Text>
                </Box>
                {/* <Box
          w={'25%'}>
          </Box> */}
                <Stack display={'flex'} flexDir={'row'} left={"20%"} w={'15%'}>
                    <Flex flexDir={'column'}>
                        <Center>
                            <Text fontSize={'sm'} color={'gray.500'}>Reported posts</Text>
                            {/**va la propiedad neuva que me están haciendo en el back */}
                            <Text fontSize={'sm'} fontWeight={600} mr={2}>5</Text>
                        </Center>
                    </Flex>
                </Stack>

                <HStack
                    position={"relative"}
                    left={"10%"}
                    // left={'1%'}
                    w={'35%'}
                >
                    <Button

                        onClick={() => HandleBlock(userId)}
                        size={'sm'}
                        w={'80%'}
                        // mt={2}

                        colorScheme='green'
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}

                    >
                        Restore
                    </Button>

                    <Button
                        onClick={() => HandleBlock(userId)}
                        size={'sm'}
                        w={'80%'}
                        colorScheme='red'
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}
                    >
                        Block
                    </Button>

                </HStack>
            </Stack>


        </>
    )
}