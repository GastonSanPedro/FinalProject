import React from "react";
import { Input, Box, Button } from "@chakra-ui/react";

const Searchbar = () => {
    return(
        <>
        <Box w={270} display='flex' flexDir='row' alignItems='center' justifyContent='space-between'>
        <Input h='80%'  w={180} variant='filled' placeholder='Search' size='md' />
        <Button  w={20} h='80%'>Search</Button>
        </Box>
        </>
    )
}

export default Searchbar