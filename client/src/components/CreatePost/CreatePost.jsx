import {
  Avatar,
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useToast,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserPost, getPosts } from '../../redux/action';

const CreatePost = ({ site, myUser, createdRef }) => {
  const [input, setInput] = useState({
    description: '',
    pics: '',
  });
  const [TypePost, setTypePost] = useState('text');
  const dispatch = useDispatch();
  const toast = useToast();
  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    if (TypePost === 'text') {
      if (input.description === '') {
        toast({
          title: 'Error',
          description: 'Add some description to the post',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        const inputPost = { author: myUser._id, ...input };
        dispatch(createUserPost(inputPost));
        setInput({
          description: '',
          pics: '',
        });
        toast({
          title: 'Sucess',
          description: 'Post created successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        dispatch(getPosts())
      }
    } else {
      if (input.description === '' || input.pics === '') {
        toast({
          title: 'Error',
          description: 'Add some description to the post',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        const inputPost = { author: myUser._id, ...input };
        dispatch(createUserPost(inputPost));
        setInput({
          description: '',
          pics: '',
        });
        toast({
          title: 'Sucess',
          description: 'Post created successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        dispatch(getPosts())
      }
    }
  };
  const handleInputImage = (event) => {
    const closeWidget = () => {
      myWidget.close();
    };
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'duilsmrmx',
        uploadPreset: 'leafme',
        multiple: true,
        destroy: true,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
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
            name={myUser?.fullName}
            src={myUser?.image}
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
          <Textarea
            w={TypePost === 'text' ? '60%' : '45%'}
            h={site === 'profile' ? '200px' : null}
            ref={createdRef}
            type="textarea"
            position={'absolute'}
            left={site === 'profile' ? 'none' : '16%'}
            backgroundColor={'white'}
            placeholder="Write something..."
            value={input.description}
            name="description"
            size="md"
            mt={2}
            ml={'0'}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <Image
            display={input.pics ? 'inline' : 'none'}
            src={input.pics}
            h={site === 'profile' ? '25vh' : '20vh'}
            w={'18vw'}
            mt={site === 'profile' ? '1vh' : '0vh'}
            objectFit={'contain'}
            position={'absolute'}
            right={site === 'profile' ? '27%' : '15%'}
          ></Image>
          <Box
            width={'80%'}
            display={'inline-flex'}
            position={'relative'}
            top={site === 'profile' ? '56%' : '60%'}
            left={site === 'feed' ? '-10%' : '0%'}
            ml={site === 'feed' ? 0 : '150px'}
            mt={site === 'feed' ? 0 : '10px'}
          >
            <Button
              colorScheme={'gray'}
              mt={site === 'profile' ? '10vh' : 2}
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
                  top={site === 'profile' ? '56%' : '60%'}
                  mt={site === 'profile' ? '10vh' : '2'}
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
                  mt={site === 'profile' ? '11vh' : 5}
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

{
  /* <Input
                    type="text"
                    placeholder="Url de la imagen"
                    name="pics"
                    value={input.pics}
                    size={'sm'}
                    w={'60%'}
                    onChange={(e) => {
                      handleInputChange(e);
                      />
                    }} */
}
