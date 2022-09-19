
import { Box } from "@chakra-ui/react";
import PostSearch from './PostSearch'
import {  useSelector } from "react-redux";

const PostSearchContainer = () => {
    

    const users = useSelector((state)=> state.users)
    const word = useSelector((state)=> state.searchPost)
    
    const posteosUser = users?.map( user =>{
        return(  
            {
                fullName: user.fullName,
                image: user.image,
                posteos: user.posteos.map(posteo => posteo.description)
            }
        )})
        
        const filtered = posteosUser.map( user => {
            if( user.posteos.some(post => post.includes(word))) return user
                         
        })
        
    return(
        <>
        <Box  w='980px' borderRadius='7px' display='flex' justifyContent='space-between' p={3} m={3} backgroundColor={"gray.300"}>
        {
            users
            ? filtered.map( user => {
                return(
                    <PostSearch
                    fullName={user?.fullName}
                    image={user?.image}
                    posteos={ 
                        user?.posteos.map(posteo => posteo.includes(word))}/>
                )
            })
            : <Box> no hay posteos</Box>
        }            
        </Box>
        </>
    )
}

export default PostSearchContainer