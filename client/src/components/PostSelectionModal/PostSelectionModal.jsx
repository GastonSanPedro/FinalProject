import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Text,
  Box,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
    w={'83.5vw'}
    h={'90vh'}
    position={'fixed'}
    mt={'10.5vh'}
    left={'18%'}
  />
);

export const PostSelectionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  return (
    <div>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={'inside'}
      >
        {overlay}
        <ModalContent ml={'15vw'} mt={'20vh'} maxh={'84vh'}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign={'center'}></Text>
            <Box bg={'gray.200'} mt={'2vh'}>
              <Text textAlign={'center'}>Comentarios</Text>
              <Box></Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
