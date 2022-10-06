import { Input, Box, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { searchFriends, cleanSearchFriend } from '../../redux/action';



const SearchFriends = ({setInput, input, myUser}) => {
    const dispatch = useDispatch()
    const handleChange= (e) => {
        setInput((e.target.value))
    }
    const handleSubmit= (e) => {
      if(input !== null && input !== '' && input !== ' ' && input && input !== '  ' && input !== '   ' && input !== '    '){
        dispatch(searchFriends(myUser?._id, input))
      } else{
        dispatch(cleanSearchFriend())
      }        
    }
    return (
        <>
          <Box
            w={250}
            height={10}
            display="flex"
            flexDir="row"
            alignItems="center"
            justifyContent={'center'}
          >
            <Input
              h="80%"
              w={100}
              variant="unstyled"
              placeholder={`Search`}
              size="md"
              borderRadius={'none'}
              onChange={(e) => handleChange(e)}
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
export default SearchFriends