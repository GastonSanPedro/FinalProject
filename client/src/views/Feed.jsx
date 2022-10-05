import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerPost from '../components/ContainerPost/ContainerPost';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import { getFriendsPosts } from '../redux/action';
import { useEffect } from 'react';


const Feed = () => {
  const myUser = useSelector((state) => state.myUser);
  const singlePost = useSelector((state) => state.singlePost);
  const friends = useSelector((state) => state.friends)
  const myFollowers = useSelector((state) => state.followers)
  const posts = useSelector((state) => state.friendsPosts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFriendsPosts(myUser?._id));
  }, [dispatch]);


  return (
    <>
      <SidebarWithHeader
        myUser={myUser}
        friends={friends}
        myFollowers={myFollowers}
      />
      <Box
        pos={'absolute'}
        top={'20%'}
        left={'0%'}
        textAlign={'center'}
        justifyContent={'center'}
        direction={'column'}
        width={'81vw'}
        height={'80vh'}
        mt={'5.5%'}
        ml={'18%'}
      >
        <ContainerPost
          myUser={myUser}
          posts={posts}
          singlePost={singlePost}
          site={'feed'}
          word
        />
      </Box>
    </>
  );
};

export default Feed;
