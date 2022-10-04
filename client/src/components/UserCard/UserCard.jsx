import {
  Box,
  Avatar,
  Stack,
  Text,
  HStack,
  Button,
  IconButton,
  Flex
} from '@chakra-ui/react';
import { IoExitOutline } from 'react-icons/io5';
import { RiUserFollowLine, RiUserUnfollowLine, RiUserSettingsLine } from 'react-icons/ri';
import { useDispatch , useSelector} from 'react-redux';
import { logOut, addFriend, deleteFriend } from '../../redux/action';
import {  useNavigate } from 'react-router-dom';


const UserCard = ({ site, myUser, user, friends, handleClickFollow, handleClickUnfollow }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    localStorage.removeItem('user');
    dispatch(logOut());
    navigate('/landing-page');
  };


  const following = () =>{
  if(friends.length){
    return friends?.filter(friend => friend?.idFriend._id === user._id)}
  }
  
  const setUserToSite = (site) => {
    if (site === 'profile') {
      return myUser;
    }
    if (site === 'anyProfile') {
      return user;
    }
  };
  const followValidator = JSON.parse(localStorage.getItem('email'));



  return (
    <Box
      zIndex={2}
      display={'flex'}
      flexDir={'column'}
      ml="77%"
      mt="19%"
      h="50vh"
      w="19vw"
      p="1% 3% 1% 1%"
      position={'absolute'}
      bg={'white'}
      justifyContent={'center'}
    >
      <Box 
      position={'absolute'}
      ml={'80%'}
      bg={`logo.2`} 
      w={7} 
      h={'50vh'}></Box>
        <Stack >
          <Avatar
            size="2xl"
            showBorder="true"
            mt="-40%"
            right={'-17%'}
            objectFit={'contain'}
            src={setUserToSite(site)?.image}
            name={setUserToSite(site)?.fullName}
          />
          <Stack
            display={'flex'}
            alignContent={'center'}
            p={'2vh'}
          >
            <Stack spacing={'0vh'}>
            <Flex flexDir={'row'} align={'center'}>
            <Text
              fontSize="xl"
              fontWeight={'semibold'}
              textAlign={'left'}
            >
              {setUserToSite(site)?.firstName}{' '}{setUserToSite(site)?.lastName}
            </Text>
            { site === 'profile' ?(
            <IconButton
            onClick={()=>{navigate('/settings')}}
            p={0}
            icon={<RiUserSettingsLine/>}
            size={'md'}
            textColor={'gray.700'}
            bg={'none'}
            borderRadius={2}
            _hover={{
              textColor: 'white',
              bg: 'logo.2',
              }}/>
            ):(null)}
            </Flex>
            <Text
              fontSize="sm"
              color={'gray.500'}
              fontStyle={'italic'}
              textAlign={'left'}
            >
              {setUserToSite(site)?.userName}
            </Text>
            </Stack>
            <Text
              fontSize="xs"
              color={'gray.500'}
              textAlign={'left'}
              >
              {setUserToSite(site)?.bio}
            </Text>
            <HStack  justify={'left'} spacing={'3.5vh'}>
              <Box align={'center'}>
                <Text fontSize="xs" >
                  Following
                </Text>
                <Text fontSize="md" color={'gray.500'}>
                  {setUserToSite(site)?.friends?.length}
                </Text>
              </Box>
              <Box align={'center'}>
                <Text fontSize="xs" >
                  Followers
                </Text>
                <Text fontSize="md" color={'gray.500'}>
                  {setUserToSite(site)?.followers?.length}
                </Text>
              </Box>
              <Box align={'center'}>
                <Text fontSize="xs" >
                  Posts
                </Text>
                <Text fontSize="md" color={'gray.500'}>{setUserToSite(site)?.posts?.length}</Text>
              </Box>
            </HStack>
          </Stack>

          
        </Stack>
      

      {site === 'profile' ? (
        <Button
          p={'2%'}
          zIndex={20}
          rightIcon={<IoExitOutline />}
          w={'30vh'}
          textColor={'gray.700'}
          mt={'2%'}
          bg={'none'}
          borderRadius={2}
          _hover={{
            textColor: 'white',
            bg: 'logo.2',
          }}
          onClick={() => {
            handleClickLogout();
          }}
        >
          Log Out
        </Button>
      ) : (
        !following()?.length ? (
        <Button
          p={'2%'}
          zIndex={20}
          rightIcon={<RiUserFollowLine />}
          w={'30vh'}
          textColor={'gray.700'}
          mt={'2%'}
          bg={'none'}
          borderRadius={2}
          _hover={{
            textColor: 'white',
            bg: 'logo.2',
          }}
          onClick={() => handleClickFollow()}
        >
          FOLLOW
        </Button>
      ) : (
        <Button
          p={'2%'}
          zIndex={20}
          rightIcon={<RiUserUnfollowLine />}
          w={'30vh'}
          textColor={'gray.700'}
          mt={'2%'}
          bg={'none'}
          borderRadius={2}
          _hover={{
            textColor: 'white',
            bg: 'logo.2',
          }}
            onClick={(e) => handleClickUnfollow(e)}
          >
            UNFOLLOW
          </Button>
        )
      )}
    </Box>
  );
};

export default UserCard;
