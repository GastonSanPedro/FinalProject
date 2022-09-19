
import { Box, Wrap, Text, WrapItem } from "@chakra-ui/react";
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
            if( user.posteos.some(post => post.includes(word))) {
                return ({
                    fullName: user.fullName,
                    image: user.image,
                    post: user.posteos.find(post => post.includes(word))
                
            })}
        })
    return(
        <>
        <Wrap justify={'center'} spacing={30} w='980px' borderRadius='7px'p={8} m={3} backgroundColor={"gray.300"}>
        {
            word.length
            ? filtered.map( user => {
               if(user?.fullName && user?.post){
                   return(
                    
                       <PostSearch
                       fullName={user?.fullName}
                       image={user?.image}
                       posteos={user?.post}/>
                    
                   )
               }
            })
            : <Box><Text>no hay posteos</Text> </Box>
        }            
        </Wrap>
        </>
    )
}

export default PostSearchContainer