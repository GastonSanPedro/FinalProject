import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Textarea,
  Button,
  Text,
  Stack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { createUserPost } from '../../redux/action';
import { Radio, RadioGroup } from '@chakra-ui/react';

const CreatePost = ({ posteos, email, site }) => {
  const [input, setInput] = useState({
    description: '',
    pics: '',
  });
  const [TypePost, setTypePost] = useState('text');

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

  return (
    <>
      <Box
        p={3}
        m={3}
        mt={'4vh'}
        h={site === 'feed' ? '22vh' : '36vh'}
        w={site === 'feed' ? '100%' : '65%'}
        display={'flex'}
        backgroundColor={'withe'}
        mb={site === 'profile' ? '50px' : null}
      >
        {site === 'feed' ? (
          <Avatar
            ml="3"
            size="xl"
            name="usuario"
            src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
          />
        ) : null}

        <Box
          fontWeight="semibold"
          width={'9%'}
          h={'6vh'}
          position={'absolute'}
          top={site === 'profile' ? '50.5%' : '24.5%'}
          mb={site === 'profile' ? '50px' : null}
          ml={site === 'profile' ? '40px' : '0vw'}
        >
          <RadioGroup onChange={setTypePost} value={TypePost}>
            <Stack direction="row">
              <Radio value="text">Text</Radio>
              <Radio value="pics">Pics</Radio>
            </Stack>
          </RadioGroup>
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
            h={site === 'profile' ? '200px' : null}
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
          <Box
            width={'80%'}
            display={'inline-flex'}
            position={'relative'}
            left={site === 'feed' ? '-10%' : '0%'}
            ml={site === 'feed' ? 0 : '150px'}
            mt={site === 'feed' ? 0 : '10px'}
          >
            <Button
              colorScheme={'gray'}
              mt={2}
              onClick={(e) => {
                handleSubmit(input);
              }}
            >
              Post
            </Button>
            {TypePost === 'pics' ? (
              <>
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
                  ml={site === 'feed' ? '-20' : 2}
                  fontSize={11}
                  alignContent={'center'}
                >
                  Powered by Cloudinary©
                </Text>
              </>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
