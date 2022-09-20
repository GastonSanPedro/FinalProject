import React, { useState, useEffect } from 'react';
import { Avatar, Box, Textarea, Input, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserPost, getUser } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ posteos, email }) => {
  const [input, setInput] = useState({
    description: '',
    pics: '',
  });
  const dispatch = useDispatch();

  const handleInputChange = (event) =>
    setInput({ ...input, [event.target.name]: event.target.value });

  const handleSubmit = () => {
    let post = { posteos: [...posteos, input] };
    dispatch(createUserPost(email, post));
    setInput({
      description: '',
      pics: '',
    });
  };
  return (
    <>
      <Box
        p={8}
        m={3}
        w="90%"
        display={'flex'}
        borderRadius={7}
        backgroundColor={'gray.300'}
      >
        <Avatar
          size="xl"
          name="usuario"
          src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1"
        />
        <Box ml={8} w="90%">
          {/* <Input
            type="text"
            placeholder="Url de la imagen"
            name="pics"
            value={input.pics}
            size={'sm'}
            w={'60%'}
            onChange={(e) => {
              handleInputChange(e);
              />
            }} */}

          <Textarea
            w={'100%'}
            type="textarea"
            backgroundColor={'white'}
            placeholder="Write something..."
            value={input.description}
            name="description"
            size="md"
            mt={2}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <Box>
            <Button
              colorScheme={'gray'}
              mt={2}
              onClick={(e) => {
                handleSubmit(input);
              }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
