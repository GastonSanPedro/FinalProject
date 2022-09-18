import React, { useState, useEffect } from 'react';
import { Avatar, Box, Textarea, Input, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserPost, getUser } from '../../redux/actions';

const CreatePost = () => {
  const [User, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState({
    description: '',
    pics: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    //isUserValidate();
    dispatch(getUser(User.email));
  }, [dispatch, User.email]);

  const handleInputChange = (event) =>
    setInput({ ...input, [event.target.name]: event.target.value });

  const handleSubmit = () => {
    let post = { posteos: [...user.posteos, input] };
    console.log(post);
    dispatch(createUserPost(user.email, post));
  };
  return (
    <>
      <Box
        ml={10}
        mt={5}
        p={7}
        w="70%"
        display={'flex'}
        backgroundColor={'#ECEAEA'}
      >
        <Avatar
          size="xl"
          name="usuario"
          src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1"
        />
        <Box ml={8} w="90%">
          <Input
            type="text"
            placeholder="Url de la imagen"
            name="pics"
            value={input.pics}
            size={'sm'}
            w={'60%'}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <Textarea
            type="textarea"
            placeholder="En que estas pensando"
            value={input.description}
            name="description"
            size="md"
            mt={2}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <Box textAlign={'right'}>
            <Button
              colorScheme={'green'}
              mt={2}
              onClick={(e) => {
                handleSubmit(input);
              }}
            >
              Publicar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
