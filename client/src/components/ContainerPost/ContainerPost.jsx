import { Flex, Button, Divider, Box } from '@chakra-ui/react';
import CreatePost from '../CreatePost/CreatePost';
import ImgPostContainer from '../ImgPost/ImgPostContainer';
import TextPostContainer from '../TextPost/TextPostContainer';
import { useState, useRef } from 'react';
import NavbarSerch from '../NavbarSearch/NavbarSearch';
import { BsChatLeftText } from 'react-icons/bs';
import { RiImage2Line } from 'react-icons/ri'
import ProfileFeed from '../ProfileFeed/ProfileFeed';

export default function ContainerPost({
  site,
  email,
  myUser,
  user,
  posts,
  singlePost,
  handleDelete,
}) {
  const [typePost, setTypePost] = useState('img');
  const ref = useRef();
  const handleClickRef = () => {
    ref.current.focus();
  };
  const arrayUserPosts = (site) => {
    if (site === 'profile') {
      return posts?.filter((post) => post.author?._id === myUser?._id);
    }
    if (site === 'anyProfile') {
      return user?.posts;
    }
    if (site === 'search' || site === 'explore') {
      return posts;
    }
    if (site === 'feed') {
      return posts;
    }
    if (site === 'admin') {
      let reportedPosts = posts?.filter((post) => post.reported === true);
      return reportedPosts;
    }
  };
  const typePosts = (typePost) => {
    if (typePost === 'text') {
      let textPosts = arrayUserPosts(site)?.filter((p) => p?.pics?.length === 0 );
      return textPosts;
    }
    if (typePost === 'img') {
      let imagePosts = arrayUserPosts(site)?.filter((p) => p?.pics?.length >= 1 );
      return imagePosts;
    }
  };

  const NAV_ITEMS = [
    {
      label: 'Images',
      icon: <RiImage2Line />,
      onClick: () => {
        setTypePost('image');
      },
    },
    {
      label: 'Text',
      icon: <BsChatLeftText />,
      onClick: () => {
        setTypePost('text');
      },
    },
  ];
  return (
    <>
      <Flex
        textAlign={'center'}
        justifyContent={'center'}
        direction={'column'}
        borderRadius={2}
        mt={site === 'feed' ? '0vh' : '4.1vh'}
      >
        {site === 'search' ||
          site === 'admin' ||
          site === 'explore' ? null : site === 'feed' ? (
            <CreatePost
              site={site}
              email={email}
              myUser={myUser}
              createdRef={ref}
            />
          ) : (
            <ProfileFeed site={site} user={site === 'profile' ? myUser : user} myUser={myUser}/>
        )}
        {site === 'explore' ? null : <Divider />}

        <NavbarSerch NAV_ITEMS={NAV_ITEMS} />

        {typePost === 'text' ? (
          <TextPostContainer
            posts={typePosts('text')}
            site={site}
            myUser={myUser}
            user={user}
            email={email}
            singlePost={singlePost}
            handleClickRef={handleClickRef}
          />
        ) : (
          <ImgPostContainer
            posts={typePosts('img')}
            site={site}
            myUser={myUser}
            user={user}
            email={email}
            singlePost={singlePost}
            handleDelete={handleDelete}
            handleClickRef={handleClickRef}
          />
        )}
      </Flex>
    </>
  );
}
