import { Box } from "@chakra-ui/react";
import React from 'react';
import CreatePost from '../components/CreatePost/CreatePost';
import FriendsContainer from "../components/Friends/FriendsContainer";
import Navbar from '../components/navbar/Navbar';
import ProfileDetail from '../components/ProfileDetail/ProfileDetail';
import UserCard from '../components/UserCard/UserCard';
import UserPost from '../components/UserPosts/UserPost';
import "../index.css";

const Profile = () => {
  return (
    <>
        <Navbar></Navbar>
        <Box display='flex' dir='column' pt={10} pr={10} pl={10} >
        
        <Box>
        <ProfileDetail/>
        <CreatePost/>
        <UserPost/>
        </Box>
        
        <Box display='-ms-flexbox' position={"absolute"} right={"0%"} dir='row' width={"20%"}  pt={0} pr={0} pl={0}  >
        <UserCard/>
        <FriendsContainer />
        </Box>
        </Box>


    </>
  )
}

export default Profile;