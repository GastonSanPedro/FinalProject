import { useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getFriends, getFollowers } from '../redux/action';
import ContainerPost from '../components/ContainerPost/ContainerPost';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';

const Explore = () => {
  const myUser = useSelector((state) => state.myUser);
  const allPosts = useSelector((state) => state.posts);
  const singlePost = useSelector((state) => state.singlePost);
  const friends = useSelector((state) => state.friends);
  const myFollowers = useSelector((state) => state.followers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [singlePost]);

  return (
    <>
      <SidebarWithHeader
        myUser={myUser}
        friends={friends}
        myFollowers={myFollowers}
      />
      <Heading
        pos={'absolute'}
        top={'20%'}
        left={'0%'}
        textAlign={'center'}
        justifyContent={'center'}
        direction={'column'}
        width={'81vw'}
        height={'80vh'}
        mt={'10%'}
        ml={'18%'}
      >
        Explore the lastests posts
      </Heading>
      <Box
        pos={'absolute'}
        top={'20%'}
        left={'0%'}
        textAlign={'center'}
        justifyContent={'center'}
        direction={'column'}
        width={'81vw'}
        height={'80vh'}
        mt={'13%'}
        ml={'18%'}
      >
        <ContainerPost
          myUser={myUser}
          posts={allPosts}
          singlePost={singlePost}
          site={'explore'}
          word
        />
      </Box>
    </>
  );
};

export default Explore;
