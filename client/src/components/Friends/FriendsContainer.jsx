import React from "react";
import { Text, Stack } from "@chakra-ui/react";
import Friend from "./Friend";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getUsers} from '../../redux/actions'


let allUsers = []

const FriendsContainer = () => {

    const dispatch = useDispatch()

    const users = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    allUsers = users.slice(0, 15)

    return (
        <>
        {allUsers.length >1 ?
            <Stack justifyItems={'center'} w='230px' minH='200px' backgroundColor='gray.300' borderRadius='7px' alignItems='center' pt={2} pb={2}>
                <Text as="h3" size='sm' mb="5" mt="5">Friends</Text>
                {allUsers && allUsers.map((e) => {
                    return (
                        <Friend
                            id= {e._id}
                            firstName={e.firstName}
                            lastName={e.lastName}
                            email = {e.email}
                        />
                    )
                })}
            </Stack>
            : null}
        </>
    )
}

export default FriendsContainer