import React from "react";
import { Button, Stack } from "@chakra-ui/react";

const HashtagContainer = () =>{
    return(
        <>
        <Stack direction='row' w='65%' borderRadius='7px' p={3} m={3} backgroundColor={"gray.300"}>
        <Button h={9}>#BUSQUEDA</Button>
        <Button h={9}>#BUSQUEDA</Button>
        <Button h={9}>#BUSQUEDA</Button>
        <Button h={9}>#BUSQUEDA</Button>
        <Button h={9}>#BUSQUEDA</Button>
        <Button h={9}>#BUSQUEDA</Button>
        <Button h={9} w={0} fontSize='sm'>⪢</Button>   
        </Stack>
        </>
    )
}

export default HashtagContainer