import React from "react";
import { Stack } from "@chakra-ui/react";
import Friend from "./Friend";
import { useRoutes } from "react-router-dom";


const FriendsContainer = ({ allUsers }) => {

    allUsers = allUsers.slice(0, 15)

    return (
        <>
            <Stack w='200px' minH='200px' backgroundColor='gray.300' borderRadius='7px' alignItems='center' pt={2} pb={2}>
                {allUsers && allUsers.map((e) => {
                    return (
                        <Friend
                            id= {e._id}
                            firstName={e.firstName}
                            lastName={e.lastName}
                        />
                    )
                })}
            </Stack>
        </>
    )
}

export default FriendsContainer