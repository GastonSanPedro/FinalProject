import React from 'react'
import UserSinglePost from '../components/UserSinglePost/UserSinglePost'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from '../redux/actions';
import { State } from "../redux/reducers"
import { useAppDispatch } from '../redux/hooks';


const Feed = () => {

    const dispatch = useAppDispatch()
    // dispatch(getUsers())

    const users = useSelector((state: State) => state.users);


    


    // useEffect(() => {
    //     dispatch(getUsers())
    // }, [dispatch])

    return (
        <>
            {users.map}

            <UserSinglePost />
            <UserSinglePost />
        </>
    )
}

export default Feed