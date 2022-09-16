import React from 'react'
import CreatePost from '../components/CreatePost/CreatePost';
import Navbar from '../components/navbar/Navbar';
import ProfileDetail from '../components/ProfileDetail/ProfileDetail';
import UserPost from '../components/UserPosts/UserPost';
import "../index.css";

const Profile = () => {
  return (
    <>
        <Navbar></Navbar>
        <ProfileDetail/>
        <CreatePost/>
        <UserPost/>

    </>
  )
}

export default Profile;