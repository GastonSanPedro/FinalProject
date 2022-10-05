import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  IconButton,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  useToast,
} from '@chakra-ui/react';
import { BiMessage, BiHappyAlt, BiHeart, BiShocked } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { BsSun } from 'react-icons/bs';
import {
  getSinglePosts,
  cleanSinglePost,
  postComment,
} from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

export const CommentBox = ({ comment, formatedDate, loggedUser, postId }) => {
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(false);
  const [Reaction, setReaction] = useState({
    suns: comment.likes?.length === 0 ? 0 : comment.likes[0]?.suns,
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
    //setReaction({ ...Reaction, [e.target.name]: e.target.value + 1 });
  };
  return (
    <div>
      <Flex
        bg={'gray.200'}
        p={'1vh'}
        display={'block'}
        dir={'column'}
        key={comment._id}
      >
        <Box width={'100%'} height={'2.75vh'} display={'flex'} mb={'1vh'}>
          <Box width={'50%'} textAlign={'left'}>
            {/* <Link to={`/user/${loggedEmail}`}> */}
            <Text color={'orange.300'}>{comment.idUser.fullName}</Text>
            {/* </Link> */}
          </Box>
          <Box width={'50%'} textAlign={'right'}>
            <Text fontSize={'1.4vh'} pt={'0.7vh'}>
              {formatedDate}
            </Text>
          </Box>
        </Box>
        <Flex width={'100%'} maxH={'auto'} minH={'4.75vh'}>
          <Text pl={'1vw'}>{comment.description}</Text>
        </Flex>
        <Flex align={'flex-end'} justify={'start'} mt={'2vh'}>
          <IconButton
            size={'lg'}
            bg={'none'}
            ml={'1vh'}
            h={30}
            icon={<BiMessage />}
            onClick={(e) => {
              setShow(!show);
            }}
            _hover={{
              bg: 'white',
            }}
            _active={{
              bg: 'white',
              color: 'logo.3',
            }}
          />
          <Box
            onMouseLeave={() => {
              setHide(false);
            }}
          >
            <IconButton
              size={'lg'}
              h={30}
              bg={'none'}
              icon={<BsSun />}
              //   name="suns"
              value={
                comment.likes?.length === 0 ? 0 : Number(comment.likes[0]?.suns)
              }
              onClick={(e) => {
                setReaction({ ...Reaction, suns: Number(e.target.value) + 1 });
              }}
              onMouseEnter={() => {
                setHide(true);
              }}
              _hover={{
                bg: 'white',
              }}
              _active={{
                bg: 'white',
                color: 'logo.3',
              }}
            />
            <Box
              transition={' display 8s'}
              display={!hide ? 'none' : 'inline'}
              width={!hide ? '4vw' : '12vw'}
            >
              <IconButton
                size={'lg'}
                h={30}
                bg={'none'}
                name="happyLeaf"
                value={comment.likes?.happyLeaf}
                icon={<BiHappyAlt />}
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
                name="heart"
                value={comment?.likes?.heart}
                icon={<BiHeart />}
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
                name="confusedLeaf"
                value={comment?.likes?.confusedLeaf}
                icon={<BiShocked />}
                _hover={{
                  bg: 'white',
                }}
                _active={{
                  bg: 'white',
                  color: 'logo.3',
                }}
              />
            </Box>
          </Box>
        </Flex>
        <InputGroup display={show ? 'block' : 'none'}>
          <Input
            placeholder="Comment here"
            type="text"
            name="description"
            width={'80%'}
            value={input.description}
            mt={'2vh'}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Button
            bg={'orange.200'}
            mt={'-1vh'}
            w={'20%'}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Send
          </Button>
        </InputGroup>
      </Flex>{' '}
    </div>
  );
};
