import React, { useState } from "react";
import { Input, Box, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { searchUser } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Searchbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searcher, setSearcher] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setSearcher(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        navigate('/search-page')
        dispatch(searchUser(searcher))
        setSearcher('')
    }

    return(
        <>
        <Box w={270} display='flex' flexDir='row' alignItems='center' >
        <Input h='80%' w={180} variant='filled' placeholder='Search' size='md' value={searcher} onChange={(e)=> handleInputChange(e)} />
        <IconButton onClick={(e)=> handleSubmit(e)} aria-label="Search database" ml={1} w={10} h='80%' icon={<SearchIcon/>}/>
        </Box>
        </>
    )
}

export default Searchbar