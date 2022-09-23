import { Avatar, chakra, Flex, useColorModeValue, Box, IconButton } from '@chakra-ui/react';
import { BiMessage } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs'
import Quotes from '../../assets/comillas.svg';

function randomNumber(min, max) {
  let a = Math.random() * (max - min) + min;
  return Math.floor(a);
}

//--------- Lógica socket.io --------
//const [liked, setLiked] = useState(false)
// const handleNotification = () =>{
//   setLiked(true)
//   socket.emit("sendNotification",{
//       senderId:user,
//       reciverId:"tomar el id"
//   })
//}
// En el comienzo dela funcion TextPost(props ,{socket, user})
//Logica del me gusta, o sea le da color al corazon/estrella y despacha el handle
//{liked ? (<StarIcon color="yellow" />
//) : (<StarIcon color="black" onClick={handleNotification}/>)}
//----------------------------------
export default function TextPost(props) {
  const { fullName, description, avatar, index } = props;
  return (
    <>
      <Flex
        maxW={'640px'}
        direction={{ base: 'column-reverse', md: 'row' }}
        width={'full'}
        p={8}
        justifyContent={'space-between'}
        position={'relative'}
        ml={'1vw'}
        bg={useColorModeValue('white', 'gray.800')}
        _after={{
          content: '""',
          position: 'absolute',
          height: '21px',
          width: '29px',
          left: '35px',
          top: '10px',
          backgroundSize: 'cover',
          backgroundImage: `${Quotes}`,
        }}
        _hover={{
          bg: `logo.${randomNumber(1, 4)}`,
        }}
      >
        <Flex
          direction={'column'}
          textAlign={'left'}
          justifyContent={'space-between'}
        >
          <chakra.p
            fontFamily={'Roboto'}
            fontWeight={'medium'}
            textAlign={'right'}
            fontSize={'15px'}
            pb={4}
          >
            {description}
          </chakra.p>
          <chakra.p
            fontFamily={'Roboto'}
            fontWeight={'bold'}
            fontSize={14}
            textAlign={'right'}
          >
            {fullName}
          </chakra.p>
        </Flex>
        <Flex
          flexDir={'column'}
          alignContent={'center'}
          justifyContent={'center'}
          minW={'35%'}>
        <Avatar
          size={'xl'}
          src={avatar}
          height={'100px'}
          width={'100px'}
          justifySelf={'center'}
          alignSelf={'center'}
          mt={'10%'}
          mb={'18%'}
          ml={'3%'}
        />
        <Flex
        align={'flex-end'}
        justify={'center'}
          >
        <IconButton
          size={'lg'}
          bg={'none'}
          h={30}
          icon={<BiMessage/>}
          _hover={{
            bg: 'white'
          }}
          _active={{
            bg: 'white',
            color: 'logo.3'
          }}/>
        <IconButton
          size={'lg'}
          h={30}
          bg={'none'}
          icon={<BsSun/>}
          _hover={{
            bg: 'white'
          }}
          _active={{
            bg: 'white',
            color: 'logo.3'
          }}/>
        </Flex>
        </Flex>
      </Flex>
    </>
  );
}
