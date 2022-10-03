import React, { useState } from 'react';
import {
  Box,
  Text,
  Image,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
  Input,
  ModalCloseButton,
  SelectField,
  ModalFooter,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { createPayment } from '../../redux/action';
import { useNavigate } from 'react-router-dom';

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

export const PaymentModal = ({
  postId,
  isOpen,
  onOpen,
  onClose,
  myPosts,
  loggedId,
}) => {
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [hide, setHide] = useState(false);
  const [Selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelected = (id) => {
    let updatePosts = [
      ...Selected,
      {
        title: id,
        quantity: 1,
        unit_price: 0,
      },
    ];
    //console.log(updatePosts);
    setSelected(updatePosts);
  };
  const handleRemove = (postId) => {
    console.log(postId);
    const removePost = Selected?.filter((e) => e.title !== postId);
    console.log(removePost);
    // let updatePosts = Selected.slice(removePost, 0);

    //console.log(updatePosts);
    setSelected(removePost);
  };
  const handleChange = (id, event) => {
    //console.log(id);
    const postSelected = Selected?.filter((e) => e.title === id);
    const postPosition = Selected?.findIndex((e) => e.title === id);
    //console.log(postPosition);
    let toUpdatePrice = Selected;
    toUpdatePrice[postPosition].unit_price = event.target.value;

    setSelected(toUpdatePrice);
    console.log(Selected);
  };
  const handleSubmit = (Selected) => {
    const properObject = { products: Selected };
    dispatch(createPayment(loggedId, properObject));
    window.location.href =
      'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=339112230-2ec49d3d-82f3-4e40-875c-18336276701d';
  };
  return (
    <div>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
        scrollBehavior={'inside'}
      >
        {overlay}
        <ModalContent ml={'15vw'} mt={'20vh'} maxh={'84vh'} h={'84vh'}>
          <ModalHeader>Select your Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'}>
              {myPosts?.map((e) => {
                const id = e._id;
                const description = e.description;
                return (
                  <Box
                    width={'36vw'}
                    h={'6vh'}
                    mb={'1vh'}
                    display={'inline-flex'}
                  >
                    <Text mt={'1vh'} width={'40vw'} alignSelf={'center'}>
                      {e.description + ' Id: ' + id}
                    </Text>

                    <Button
                      position={'relative'}
                      mt={' 1vh'}
                      size={'sm'}
                      alignSelf={'center'}
                      onClick={(e) => {
                        handleSelected(id);
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                );
              })}
            </Flex>
            <Box border={'1px solid black'}>
              {Selected?.map((e) => {
                const postId = e.title;
                //console.log(postId);
                return (
                  <Box
                    mt={'1vh'}
                    width={'36vw'}
                    h={'6vh'}
                    mb={'1vw'}
                    display={'flex'}
                  >
                    <Text mt={'1vh'} width={'40vw'} alignSelf={'center'}>
                      {e.id}
                    </Text>

                    <Button
                      right={'5%'}
                      mt={' 0vh'}
                      size={'sm'}
                      onClick={(e) => {
                        handleRemove(postId);
                      }}
                    >
                      Remove
                    </Button>
                    <SelectField
                      size={'sm'}
                      right={'15%'}
                      mt={' 0.5vh'}
                      placeholder="Select category"
                      onChange={(e) => {
                        handleChange(postId, e);
                      }}
                    >
                      <option value={'3'}>3$</option>
                      <option value={'6'}>6$</option>
                      <option value={'8'}>8$</option>
                    </SelectField>
                  </Box>
                );
              })}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={(e) => {
                handleSubmit(Selected);
              }}
            >
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
