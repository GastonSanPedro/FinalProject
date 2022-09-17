import UserSinglePost from '../components/UserSinglePost/UserSinglePost'
import Navbar from '../components/navbar/Navbar';
import CreatePost from '../components/CreatePost/CreatePost';
import { Stack } from '@chakra-ui/react'
// // import React from 'react'
// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../redux/actions';
// import { State } from "../redux/reducers"
// import { useAppDispatch } from '../redux/hooks';


const Feed = () => {

    const dispatch = useDispatch()



    // useEffect(() =>{
    //     dispatch(getPosts())
    // },[dispatch])

    return (
        <>

            <Navbar />
            <CreatePost />
            <Stack >
                <UserSinglePost />
                <UserSinglePost />
            </Stack>
        </>
    )
}

export default Feed