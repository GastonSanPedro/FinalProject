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
import Quotes from '../../assets/comillas.svg';

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
  payment,
  Bill,
}) => {
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [hide, setHide] = useState(false);
  const [Selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const handleSelected = (id, description, pics) => {
    if (Selected.findIndex((p) => p.title === id) === -1) {
      let updatePosts = [
        ...Selected,
        {
          title: id,
          quantity: 1,
          unit_price: 0,
          description: description,
          picture_url: pics,
        },
      ];
      setSelected(updatePosts);
    }
  };
  const handleRemove = (postId) => {
    const removePost = Selected?.filter((e) => e.title !== postId);
    // let updatePosts = Selected.slice(removePost, 0);

    setSelected(removePost);
  };
  const handleChange = (id, event) => {
    const postSelected = Selected?.filter((e) => e.title === id);
    const postPosition = Selected?.findIndex((e) => e.title === id);
    let toUpdatePrice = Selected;
    toUpdatePrice[postPosition].unit_price = event.target.value;

    setSelected(toUpdatePrice);
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
        localStorage.setItem('bill', JSON.stringify(payment));
        if (payment.init_point) {
          window.location.href = payment?.init_point;
        }
      }
    }
    //alert('Select one price for the post with the ID: ' + post.title);
  };
  const normalPosts = myPosts?.filter((post) => post.premium !== true);
  const ImagePost = normalPosts?.filter((post) => post.pics?.length >= 1);
  const TextPost = normalPosts?.filter((post) => post.pics?.length === 0);

  return (
    <div>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={'full'}
        scrollBehavior={'inside'}
      >
        {overlay}
        <ModalContent ml={'18vw'} mt={'10.6vh'} maxh={'80vh'} h={'60vh'}>
          <ModalHeader>Select your Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction={'row'}
              width={'72vw'}
              ml={'3vw'}
              pt={'2vh'}
              pl={'2vw'}
              bg={'gray.100'}
            >
              <Box w={'47%'}>
                <Text fontSize={'1.5vw'} color={'gray.400'} mb={'2vh'}>
                  Images
                </Text>
                {ImagePost?.map((e) => {
                  const id = e._id;
                  const description = e.description;
                  const pics = e.pics;
                  return (
                    <Box
                      width={'100%'}
                      h={'10vh'}
                      display={'inline-flex'}
                      alignItems={'center'}
                      mb={'2%'}
                      bg={'gray.200'}
                      p={2}
                    >
                      <Box h={'100%'} w={'15vw'}>
                        <Image
                          src={e.pics}
                          h={'100%'}
                          w={'100%'}
                          objectFit={'cover'}
                        />
                      </Box>

                      <Text width={'60vw'} alignSelf={'left'} ml={'1vw'}>
                        {'Desc. : ' + e.description.slice(0, 18)} <br />
                        {' Id: ' + id}
                      </Text>

                      <Button
                        position={'relative'}
                        size={'lg'}
                        alignSelf={'center'}
                        bg={'logo.3'}
                        color={'black'}
                        onClick={(e) => {
                          handleSelected(id, description, pics);
                        }}
                        _hover={{
                          bg: 'logo.1',
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  );
                })}
              </Box>
              <Box w={'47%'} ml={'3%'}>
                <Text fontSize={'1.5vw'} color={'gray.400'} mb={'2vh'}>
                  Text
                </Text>
                {TextPost?.map((e) => {
                  const id = e._id;
                  const description = e.description;
                  const pics =
                    'https://res.cloudinary.com/duilsmrmx/image/upload/v1664933936/leafme/tbjmhzzcfuejoonaofb9.png';
                  return (
                    <Box
                      width={'100%'}
                      h={'10vh'}
                      display={'inline-flex'}
                      alignItems={'center'}
                      mb={'2%'}
                      bg={'gray.200'}
                      p={2}
                    >
                      <Box h={'100%'} w={'6vw'}>
                        <Image
                          src={pics}
                          h={'60%'}
                          w={'60%'}
                          objectFit={'contain'}
                          ml={'1vh'}
                        />
                      </Box>
                      <Text width={'60vw'} alignSelf={'left'} ml={'1vw'}>
                        {'Desc. : ' + e.description.slice(0, 30) + '...'} <br />
                        {' Id: ' + id}
                      </Text>

                      <Button
                        position={'relative'}
                        size={'lg'}
                        alignSelf={'center'}
                        bg={'logo.3'}
                        color={'black'}
                        onClick={(e) => {
                          handleSelected(id, description, pics);
                        }}
                        _hover={{
                          bg: 'logo.1',
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            </Flex>
            <Box width={'66vw'} ml={'6vw'} pt={'2vh'} pl={'2vw'} mt={'2vh'}>
              {Selected?.map((e) => {
                const postId = e.title;
                if (e) {
                  return (
                    <Box
                      width={'90%'}
                      h={'12vh'}
                      display={'inline-flex'}
                      alignItems={'center'}
                      mb={'2%'}
                      bg={'gray.200'}
                      p={2}
                    >
                      <Box h={'100%'} w={'15vw'}>
                        <Image
                          src={e.picture_url}
                          h={'100%'}
                          w={'90%'}
                          objectFit={'contain'}
                        />
                      </Box>
                      <Box>
                        <Text mt={'1vh'} width={'40vw'} alignSelf={'center'}>
                          {'Id: ' + e.title}
                        </Text>
                        <Text mt={'1vh'} width={'40vw'} alignSelf={'center'}>
                          {'Id: ' + e.description}
                        </Text>
                      </Box>

                      <Button
                        right={'5%'}
                        mt={' 0vh'}
                        size={'md'}
                        bg={'logo.3'}
                        color={'black'}
                        w={'14vw'}
                        onClick={(e) => {
                          handleRemove(postId);
                        }}
                        _hover={{
                          bg: 'logo.1',
                        }}
                      >
                        Remove
                      </Button>
                      <SelectField
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
                }
              })}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              width={'12vw'}
              size={'lg'}
              mb={'2vw'}
              mr={'4vw'}
              bg={'logo.2'}
              color={'white'}
              onClick={(e) => {
                handleSubmit(Selected);
              }}
              _hover={{
                bg: '#ffae34',
                color: 'white',
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
