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
                    //console.log(comment.likes);
                    const date = new Date(comment.createdAt);
                    const formatedDate =
                      date.toLocaleTimeString('es-ES').slice(0, -3) +
                      ' ' +
                      date.toLocaleDateString('es-ES');
                    return (
                      <CommentBox
                        comment={comment}
                        formatedDate={formatedDate}
                        loggedUser={loggedUser}
                        postId={postId}
                      />
                      //   <Flex
                      //     bg={'gray.200'}
                      //     p={'1vh'}
                      //     display={'block'}
                      //     dir={'column'}
                      //     key={singlePost?._id}
                      //   >
                      //     <Box
                      //       width={'100%'}
                      //       height={'2.75vh'}
                      //       display={'flex'}
                      //       mb={'1vh'}
                      //     >
                      //       <Box width={'50%'} textAlign={'left'}>
                      //         <Link to={`/user/${loggedEmail}`}>
                      //           <Text color={'orange.300'}>
                      //             {comment.idUser.fullName}
                      //           </Text>
                      //         </Link>
                      //       </Box>
                      //       <Box width={'50%'} textAlign={'right'}>
                      //         <Text fontSize={'1.4vh'} pt={'0.7vh'}>
                      //           {formatedDate}
                      //         </Text>
                      //       </Box>
                      //     </Box>
                      //     <Flex width={'100%'} maxH={'auto'} minH={'4.75vh'}>
                      //       <Text pl={'1vw'}>{comment.description}</Text>
                      //     </Flex>
                      //     <Flex align={'flex-end'} justify={'start'} mt={'2vh'}>
                      //       <IconButton
                      //         size={'lg'}
                      //         bg={'none'}
                      //         ml={'1vh'}
                      //         h={30}
                      //         icon={<BiMessage />}
                      //         _hover={{
                      //           bg: 'white',
                      //         }}
                      //         _active={{
                      //           bg: 'white',
                      //           color: 'logo.3',
                      //         }}
                      //       />
                      //       <Box
                      //         onMouseLeave={() => {
                      //           setHide(false);
                      //         }}
                      //       >
                      //         <IconButton
                      //           size={'lg'}
                      //           h={30}
                      //           bg={'none'}
                      //           icon={<BsSun />}
                      //           name="suns"
                      //           value={
                      //             comment.likes.length > 0
                      //               ? 0
                      //               : Number(comment.likes[0]?.suns)
                      //           }
                      //           onClick={(e) => {
                      //             handleReaction(e);
                      //           }}
                      //           onMouseEnter={() => {
                      //             setHide(true);
                      //           }}
                      //           _hover={{
                      //             bg: 'white',
                      //           }}
                      //           _active={{
                      //             bg: 'white',
                      //             color: 'logo.3',
                      //           }}
                      //         />
                      //         <Box
                      //           transition={' display 8s'}
                      //           display={!hide ? 'none' : 'inline'}
                      //           width={!hide ? '4vw' : '12vw'}
                      //         >
                      //           <IconButton
                      //             size={'lg'}
                      //             h={30}
                      //             bg={'none'}
                      //             name="happyLeaf"
                      //             value={singlePost?.likes?.happyLeaf}
                      //             icon={<BiHappyAlt />}
                      //             _hover={{
                      //               bg: 'white',
                      //             }}
                      //             _active={{
                      //               bg: 'white',
                      //               color: 'logo.3',
                      //             }}
                      //           />
                      //           <IconButton
                      //             size={'lg'}
                      //             h={30}
                      //             bg={'none'}
                      //             name="heart"
                      //             value={singlePost?.likes?.heart}
                      //             icon={<BiHeart />}
                      //             onHover={() => {}}
                      //             _hover={{
                      //               bg: 'white',
                      //             }}
                      //             _active={{
                      //               bg: 'white',
                      //               color: 'logo.3',
                      //             }}
                      //           />
                      //           <IconButton
                      //             size={'lg'}
                      //             h={30}
                      //             bg={'none'}
                      //             name="confusedLeaf"
                      //             value={singlePost?.likes?.confusedLeaf}
                      //             icon={<BiShocked />}
                      //             onHover={() => {}}
                      //             _hover={{
                      //               bg: 'white',
                      //             }}
                      //             _active={{
                      //               bg: 'white',
                      //               color: 'logo.3',
                      //             }}
                      //           />
                      //         </Box>
                      //       </Box>
                      //     </Flex>
                      //     <InputGroup display={'none'}>
                      //       <Input
                      //         placeholder="Comment here"
                      //         type="text"
                      //         name="description"
                      //         value={input.description}
                      //         mt={'2vh'}
                      //         onChange={(e) => {
                      //           handleChange(e);
                      //         }}
                      //       />
                      //       <InputRightElement
                      //         w={'6vw'}
                      //         pointerEvents="painted"
                      //         children={
                      //           <Button
                      //             bg={'orange.200'}
                      //             mt={'4vh'}
                      //             w={'100%'}
                      //             onClick={(e) => {
                      //               handleSubmit(e);
                      //             }}
                      //           >
                      //             Send
                      //           </Button>
                      //         }
                      //       />
                      //     </InputGroup>
                      //   </Flex>
                    );
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
              <InputRightElement
                w={'6vw'}
                pointerEvents="painted"
                children={
                  <Button
                    bg={'orange.200'}
                    mt={'4vh'}
                    w={'100%'}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Send
                  </Button>
                }
              />
            </InputGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
