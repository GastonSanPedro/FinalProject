import React, { useState } from 'react';
import {
  Avatar,
  chakra,
  Flex,
  useColorModeValue,
  Box,
  IconButton,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { BiMessage } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import Quotes from '../../assets/comillas.svg';
import { Link } from 'react-router-dom';

function randomNumber(min, max) {
  let a = Math.random() * (max - min) + min;
  return Math.floor(a);
}

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
    w={'83.5vw'}
    h={'90vh'}
    position={'fixed'}
    mt={'10.5vh'}
    left={'17%'}
  />
);
//--------- Lógica socket.io --------
//const [liked, setLiked] = useState(false)
// const handleNotification = () =>{
//   setLiked(true)
//   socket.emit("sendNotification",{
//       senderId:user,
//       reciverId:"tomar el id"
//   })
//}
// En el comienzo dela funcion TextPost(props ,{socket, user})
//Logica del me gusta, o sea le da color al corazon/estrella y despacha el handle
//{liked ? (<StarIcon color="yellow" />
//) : (<StarIcon color="black" onClick={handleNotification}/>)}
//----------------------------------
export default function TextPost(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const { fullName, description, avatar, index, email } = props;
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent ml={'15vw'}>
          <ModalHeader>{fullName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{description}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        maxW={'640px'}
        direction={{ base: 'column-reverse', md: 'row' }}
        width={'full'}
        p={8}
        justifyContent={'space-between'}
        position={'relative'}
        ml={'1vw'}
        bg={useColorModeValue('white', 'gray.800')}
        _after={{
          content: '""',
          position: 'absolute',
          height: '21px',
          width: '29px',
          left: '35px',
          top: '10px',
          backgroundSize: 'cover',
          backgroundImage: `${Quotes}`,
        }}
        _hover={{
          bg: `logo.${randomNumber(1, 4)}`,
        }}
      >
        <Flex
          direction={'column'}
          textAlign={'left'}
          justifyContent={'space-between'}
        >
          <chakra.p
            fontFamily={'Roboto'}
            fontWeight={'medium'}
            textAlign={'right'}
            fontSize={'15px'}
            pb={4}
          >
            {description}
          </chakra.p>
          <chakra.p
            fontFamily={'Roboto'}
            fontWeight={'bold'}
            fontSize={14}
            textAlign={'right'}
          >
            {fullName}
          </chakra.p>
        </Flex>
        <Flex
          flexDir={'column'}
          alignContent={'center'}
          justifyContent={'center'}
          minW={'35%'}
        >
          <Link to={`/user/${email}`}>
          <Avatar
            size={'xl'}
            src={avatar}
            height={'100px'}
            width={'100px'}
            justifySelf={'center'}
            alignSelf={'center'}
            mt={'10%'}
            mb={'18%'}
            ml={'3%'}
          />
          </Link>
          <Flex align={'flex-end'} justify={'center'}>
            <IconButton
              size={'lg'}
              bg={'none'}
              h={30}
              icon={<BiMessage />}
              onClick={() => {
                setOverlay(<OverlayOne />);
                onOpen();
              }}
              _hover={{
                bg: 'white',
              }}
              _active={{
                bg: 'white',
                color: 'logo.3',
              }}
            />
            <IconButton
              size={'lg'}
              h={30}
              bg={'none'}
              icon={<BsSun />}
              _hover={{
                bg: 'white',
              }}
              _active={{
                bg: 'white',
                color: 'logo.3',
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
