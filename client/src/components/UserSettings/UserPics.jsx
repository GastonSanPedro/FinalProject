import { Avatar, Box, IconButton, Flex, Text as Text } from "@chakra-ui/react";
import { RiUpload2Line, RiCheckboxLine } from 'react-icons/ri';
import {MdOutlineCancelPresentation} from 'react-icons/md'
import { changeDataProfile } from "../../redux/action";
import { useDispatch } from 'react-redux';
import {useState} from 'react';




const UserPics = ({myUser}) => {
    const [input, setInput] = useState({
        image: ''
    })
    const dispatch = useDispatch()
    const {image, fullName, email} = myUser
    const handleCheckButton = () => {
        dispatch(changeDataProfile(input, email))
        setInput({image: ''})
    }
    const handleCancelButton = () => {
        setInput({image: ''})
    }
    const handleInputImage = () => {
        var myWidget = window.cloudinary.createUploadWidget(
          {
            cloudName: 'duilsmrmx',
            uploadPreset: 'leafme',
          },
          (error, result) => {
            if (!error && result && result.event === 'success') {
              console.log('Done! Here is the image info: ', result.info.path);
              setInput({
                image : `https://res.cloudinary.com/duilsmrmx/image/upload/` +
                  result.info.path,
              });console.log(input)
             }})
             myWidget.open();
            };

    
    return (
        <>
        <Box 
        display={'flex'}
        flexDir={'column'}
        ml={'10%'}
        mt={'2%'}
        w={'50vh'}
        h={'auto'}
        alignItems={'center'}
        justifyContent={'center'}
        pl={'8vh'}
        pr={'8vh'}
        pt={'4vh'}
        pb={'4vh'}
       >
        <Box w={'30vh'} h={'30vh'}>
        <Avatar
            bg={'logo.3'}
            fontSize={'10rem'}
            size={'full'}
            src={input.image !== '' ? input.image : image}
            name={fullName}/>   
        </Box>

        <Flex p={'2%'} justifyItems={'flex-end'} >
        
        {
            input.image !== '' ?(
                <Flex align={'center'}>
                <Text w={'20vh'} mr={'1%'} fontSize={'xs'}>Confirm new photo?</Text>
                <IconButton
                size={'sm'}
                icon={<RiCheckboxLine/>}
                aria-label={'upload-image'}
                onClick={() => handleCheckButton()}
                bg={'none'}
                fontStyle={'none'}
                fontWeight={'normal'}
                borderRadius={2}
                _hover={{
                  color: 'white',
                  bg: 'logo.3' 
              }}/>
              <IconButton
                size={'sm'}
                icon={<MdOutlineCancelPresentation/>}
                aria-label={'upload-image'}
                onClick={() => handleCancelButton()}
                bg={'none'}
                fontStyle={'none'}
                fontWeight={'normal'}
                borderRadius={2}
                _hover={{
                  color: 'white',
                  bg: 'logo.3' 
              }}/>
                </Flex>
            ):(
                <IconButton
                icon={<RiUpload2Line/>}
                size={'sm'}
                aria-label={'preload-image'}
                onClick={()=>{handleInputImage()}}
                bg={'none'}
                fontStyle={'none'}
                fontWeight={'normal'}
                borderRadius={2}
                _hover={{
                    color: 'white',
                    bg: 'logo.3' 
                }}/>
            )

        }
        </Flex>    
        </Box>
        </>
    )
}

export default UserPics