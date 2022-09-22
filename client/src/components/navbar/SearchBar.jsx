import React, { useState } from 'react';
import { Input, Box, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { searchUser, searchPost, getUsers } from '../../redux/action';
import { useDispatch } from 'react-redux';

const Searchbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searcher, setSearcher] = useState('');

  function handleInputChange(e) {
    e.preventDefault();
    setSearcher(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchUser(searcher));
    dispatch(searchPost(searcher));
    dispatch(getUsers());
    navigate('/search-page');
    setSearcher('');
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
