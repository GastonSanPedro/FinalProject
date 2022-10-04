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
  InputRightElement,
  InputGroup,
  useToast,
  ModalFooter,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiMessage, BiHappyAlt, BiHeart, BiShocked } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import {
  getSinglePosts,
  cleanSinglePost,
  postComment,
} from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { CommentBox } from './CommentBox';

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

export const PostModal = ({
  singlePost,
  fullName,
  image,
  description,
  loggedEmail,
  loggedUser,
  postId,
  isOpen,
  onOpen,
  onClose,
}) => {
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [hide, setHide] = useState(false);
  const [Reaction, setReaction] = useState({
    suns: 0,
    happyLeaf: 0,
    heart: 0,
    confusedLeaf: 0,
  });
  const [input, setInput] = useState({
    idUser: loggedUser,
    idPost: postId,
    description: '',
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    dispatch(postComment(input, postId));
    setInput({ idUser: loggedUser, idPost: postId, description: '' });
    toast({
      title: 'Sucess',
      description: 'Comment added successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };
  const handleReaction = (e) => {
    setReaction({ ...Reaction, [e.target.name]: e.target.value + 1 });
  };
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
          <ModalHeader>{fullName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={image} width={'100%'} />
            <Text textAlign={'center'}>{description}</Text>
            <Box bg={'gray.200'} mt={'2vh'}>
              <Text textAlign={'center'}>Comentarios</Text>
              <Box>
                {singlePost?.comments?.length > 0 ? (
                  singlePost?.comments?.map((comment) => {
                    const date = new Date(comment.createdAt);
                    const formatedDate =
                      date.toLocaleTimeString('es-ES').slice(0, -3) +
                      ' ' +
                      date.toLocaleDateString('es-ES');
                    //console.log(comment.likes);
                    if(comment?.idUser !== null){
                      
                    return (
                      <CommentBox
                        comment={comment}
                        formatedDate={formatedDate}
                        loggedUser={loggedUser}
                        postId={postId}
                      />
                    );
                    
                    }
                   
                  })
                ) : (
                  <Text>Aun no hay comentarios</Text>
                )}
              </Box>
            </Box>
            <InputGroup>
              <Input
                placeholder="Comment here"
                type="text"
                name="description"
                value={input.description}
                mt={'2vh'}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter textAlign={'left'}>
            <Button
              bg={'orange.200'}
              mt={'0vh'}
              w={'100%'}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
