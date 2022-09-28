import { Flex, Button, Divider, Box } from '@chakra-ui/react';
import UserSearchContainer from '../UserSearch/UserSearchContainer';
import CreatePost from '../CreatePost/CreatePost';
import ImgPostContainer from '../ImgPost/ImgPostContainer';
import TextPostContainer from '../TextPost/TextPostContainer';
import { useState } from 'react';

export default function ContainerPost({
  site,
  word,
  email,
  myUser,
  user,
  posts,
  singlePost,
}) {
  const [typePost, setTypePost] = useState('img');

  const handleClickImg = () => {
    setTypePost('img');
  };
  const handleClickText = () => {
    setTypePost('text');
  };

  //--------- funcion filtro posteos amigos --------

  const friendsPosts = (myUser, posts) => {
    let friends = myUser?.friends?.map((friend) => friend.friend[0]._id);
    let friendsPost = posts?.filter((post) => {
      if (friends?.includes(post.author._id)) {
        return post;
      }
    });

    return friendsPost;
  };

  let filterFriendPost = friendsPosts(myUser, posts);

  return (
    <>
      <Flex
        ml={'2%'}
        pr={'2%'}
        pl={'2%'}
        textAlign={'center'}
        justifyContent={'center'}
        direction={'column'}
        borderRadius={2}
        mt={site === 'feed' ? '0vh' : '4vh'}
      >
        {site === 'search' ? (
          <UserSearchContainer word={word} />
        ) : site === 'feed' || site === 'profile' ? (
          <CreatePost site={site} email={email} myUser={myUser} />
        ) : (
          <Box
            p={3}
            m={3}
            mt={'4vh'}
            h={site === 'feed' ? '22vh' : '36vh'}
            w={site === 'feed' ? '100%' : '65%'}
            display={'flex'}
            backgroundColor={'withe'}
            mb={site === 'profile' ? '50px' : null}
          ></Box>
        )}
        <Divider />

        <Flex dir="row" align={'center'} justify={'center'} mb={'2%'} mt={'2%'}>
          <Button
            onClick={() => {
              handleClickImg();
            }}
            size={'md'}
            bg={'none'}
            borderRadius="none"
            _hover={{
              bg: 'none',
              borderBottom: '2px solid black',
            }}
            _focus={{
              bg: 'none',
              borderBottom: '2px solid black',
            }}
          >
            Images
          </Button>
          <Button
            onClick={() => {
              handleClickText();
            }}
            name={'text'}
            size={'md'}
            bg={'none'}
            borderRadius="none"
            _hover={{
              bg: 'none',
              borderBottom: '2px solid black',
            }}
            _focus={{
              bg: 'none',
              borderBottom: '2px solid black',
            }}
          >
            Text
          </Button>
        </Flex>
        {typePost === 'text' ? (
          <TextPostContainer
            posts={posts}
            friendsPost={filterFriendPost}
            site={site}
            myUser={myUser}
            user={user}
            email={email}
            singlePost={singlePost}
          />
        ) : (
          <ImgPostContainer
            posts={posts}
            friendsPost={filterFriendPost}
            site={site}
            myUser={myUser}
            user={user}
            email={email}
            singlePost={singlePost}
          />
        )}
      </Flex>
    </>
  );
}
