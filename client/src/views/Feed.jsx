import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerPost from '../components/ContainerPost/ContainerPost';
import NavbarSerch from '../components/NavbarSearch/NavbarSearch';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import { RiImage2Line } from 'react-icons/ri';



const Feed = () => {
  const myUser = useSelector((state) => state.myUser);
  const allPosts = useSelector((state) => state.posts);
  const singlePost = useSelector((state) => state.singlePost);
  const friends = useSelector((state)=>state.friends)
  const myFollowers = useSelector((state)=> state.followers)
  const friendsPosts = useSelector((state) => state.friendsPosts)


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
          //friendsPosts={friendsPosts}
          posts={allPosts}
          singlePost={singlePost}
          site={'feed'}
          word
        />
      </Box>
    </>
  );
};

export default Feed;
