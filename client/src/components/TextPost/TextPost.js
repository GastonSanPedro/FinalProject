import { Avatar, chakra, Flex, useColorModeValue, Box } from '@chakra-ui/react';
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
  const { fullName, description, avatar, index, role, background } = props;
  return (
    <>
      <Flex
        maxW={'640px'}
        direction={{ base: 'column-reverse', md: 'row' }}
        width={'full'}
        p={10}
        justifyContent={'space-between'}
        position={'relative'}
        ml={'1vw'}
        boxShadow={'1px 0px 10px 1px rgba(0,0,0,0.47)'}
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
        <Avatar
          src={avatar}
          height={'80px'}
          width={'80px'}
          alignSelf={'center'}
          m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
        />
      </Flex>
    </>
  );
}
