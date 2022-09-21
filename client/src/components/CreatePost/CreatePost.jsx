import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Textarea,
  Input,
  Button,
  Text,
  Select,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserPost, getUser, UploadPic } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ posteos, email }) => {
  const [input, setInput] = useState({
    description: '',
    pics: '',
  });
  const [TypePost, setTypePost] = useState('pics');
  const dispatch = useDispatch();

  const handleInputImage = (event) => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'duilsmrmx',
        uploadPreset: 'leafme',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info.path);
          setInput({
            ...input,
            pics:
              `https://res.cloudinary.com/duilsmrmx/image/upload/` +
              result.info.path,
          });
        }
      }
    );
    myWidget.open();
    // dispatch(UploadPic(event.target.files));
    // setInput({ ...input, [event.target.name]: event.target.files });
  };

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

  const selectChange = (event) => {
    setTypePost(event.target.value);
  };
  if (TypePost === 'pics') {
    return (
      <>
        <Box
          p={3}
          m={3}
          w="100%"
          display={'flex'}
          borderRadius={7}
          backgroundColor={'gray.300'}
        >
          <Avatar
            size="xl"
            name="usuario"
            src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1"
          />
          <Box width={'9%'} h={'6vh'} position={'absolute'} top={'22%'}>
            <Select
              style={{ width: '100%' }}
              value={TypePost}
              size={'sm'}
              onChange={(e) => {
                selectChange(e);
              }}
            >
              <option value="text">Text</option>
              <option value="pics">Pics</option>
            </Select>
          </Box>
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
            <Box width={'80%'} display={'inline-flex'}>
              <Button
                colorScheme={'gray'}
                mt={2}
                onClick={(e) => {
                  handleSubmit(input);
                }}
              >
                Post
              </Button>
              <Button
                color={'black'}
                background={'orange.200'}
                mt={'2'}
                ml={'2'}
                id="upload-widget"
                className="cloudinary-button"
                onClick={(e) => {
                  handleInputImage();
                }}
              >
                Upload
              </Button>
              <Text
                w={'80'}
                mt={5}
                ml={2}
                fontSize={11}
                alignContent={'center'}
              >
                Powered by Cloudinary©
              </Text>
            </Box>
          </Box>
        </Box>
      </>
    );
  } else if (TypePost === 'text') {
    return (
      <>
        <Box
          p={3}
          m={3}
          w="100%"
          display={'flex'}
          borderRadius={7}
          backgroundColor={'gray.300'}
        >
          <Avatar
            size="xl"
            name="usuario"
            src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1"
          />
          <Box width={'9%'} h={'6vh'} position={'absolute'} top={'88%'}>
            <Select
              style={{ width: '120%' }}
              value={TypePost}
              size={'sm'}
              onChange={(e) => {
                selectChange(e);
              }}
            >
              <option value="text">Text</option>
              <option value="pics">Pics</option>
            </Select>
          </Box>
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
            <Box width={'80%'} display={'inline-flex'}>
              <Button
                colorScheme={'gray'}
                mt={2}
                onClick={(e) => {
                  handleSubmit(input);
                }}
              >
                Post
              </Button>
              {/* <Button
                color={'black'}
                background={'orange.200'}
                mt={'2'}
                ml={'2'}
                id="upload-widget"
                className="cloudinary-button"
                onClick={(e) => {
                  handleInputImage();
                }}
              >
                Upload
              </Button>
              <Text w={'80'} mt={5} ml={2} fontSize={11} alignContent={'center'}>
                Powered by Cloudinary©
              </Text> */}
            </Box>
          </Box>
        </Box>
      </>
    );
  }
};

export default CreatePost;
