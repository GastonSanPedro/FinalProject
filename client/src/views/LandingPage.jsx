import React from "react";
import LogInForm from '../components/LogInForm/LogInForm'
import { Center, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Landing = () => {
    return(
        <>
        <LogInForm></LogInForm>
        <Center>

        <p>Don't have an account?</p>
        <Link to ='/sign-in'><Button mt='10px' >Sign In</Button></Link>
        </Center>
        </>
    )
}

export default Landing