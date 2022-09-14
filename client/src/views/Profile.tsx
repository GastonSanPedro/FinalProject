import React from 'react'
import CreatePost from '../components/CreatePost/CreatePost';
import ProfileDetail from '../components/ProfileDetail/ProfileDetail';
import UserPost from '../components/UserPosts/UserPost';
import "../index.css";

const Profile = () => {
  return (
    <>
        <nav style={{ backgroundColor:'green'}} >soy la nav, pa!</nav>
        <ProfileDetail/>
        <CreatePost/>
        <UserPost/>

    </>
  )
}

export default Profile;