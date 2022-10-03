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
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
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
  const toast = useToast();
  const payment = useSelector((state) => state.payment);

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
    if (Selected.length === 0) {
      toast({
        title: 'Error',
        description: 'Add at least one post',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      let error = [];
      Selected.map((post) => {
        if (post.unit_price === 0) {
          toast({
            title: 'Error',
            description:
              'Select one price for the post with the ID: ' + post.title,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
          error.push('Missing  post' + post.title + 'price');
        }
      });
      if (error.length > 0) {
        return (error = []);
      } else {
        const properObject = { products: Selected };
        dispatch(createPayment(loggedId, properObject));
        console.log(payment.init_point);
        if (payment.init_point) {
          window.location.href = payment?.init_point;
        }
      }
    }
    //alert('Select one price for the post with the ID: ' + post.title);
  };
  //console.log(myPosts);
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
                      {'Id: ' + e.title}
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
