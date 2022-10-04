import { useState } from 'react';
import { Input, Box, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser, searchPost } from '../../redux/action';

const Searchbar = () => {

  const myUser = useSelector((state) => state.myUser);
  const friends = useSelector((state) => state.friends);
  const myFollowers = useSelector((state) => state.followers);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searcher, setSearcher] = useState('');

  function handleInputChange(e) {
    e.preventDefault();
    setSearcher(e.target.value);
  }

  // useEffect(() => {
  //   dispatch(getPosts())
  //   dispatch(getFriends(myUser?._id))
  //   dispatch(getFollowers(myUser?._id))
  //   dispatch(getFriendsPosts(myUser?._id));
  //   dispatch(getMyUser())
    
  // }, [dispatch]);
  

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchUser(myUser._id, searcher));
    dispatch(searchPost(searcher));
    navigate('/search-page');
  }

  return (
    <>
      <Box
        position={'fixed'}
        w={270}
        height={10}
        display="flex"
        flexDir="row"
        alignItems="center"
        right={'40%'}
      >
        <Input
          h="80%"
          w={190}
          variant="unstyled"
          placeholder={`Search`}
          size="lg"
          borderRadius={'none'}
          borderBottomWidth="2px"
          value={searcher}
          onChange={(e) => handleInputChange(e)}
        />
        <IconButton
          borderRadius={2}
          onClick={(e) => handleSubmit(e)}
          aria-label="Search database"
          bgColor={'white'}
          ml={1}
          w={10}
          h="80%"
          icon={<SearchIcon />}
          _hover={{
            bg: 'logo.3',
            color: 'white',
          }}
          _active={{ bg: 'rgba(140, 161, 116, 0.5)' }}
        />
      </Box>
    </>
  );
};

export default Searchbar;
