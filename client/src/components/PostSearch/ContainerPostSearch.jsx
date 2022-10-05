import { Wrap} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import TextPostContainer from "../TextPost/TextPostContainer";
import ImgPostContainer from "../ImgPost/ImgPostContainer";

const PostSearchContainer = ({state}) => {

    const allPosts = useSelector((state) => state.posts )
    const word = useSelector((state) => state.searchPost)

    const filterPost = allPosts?.filter(post => {
        return post.description.includes(word)})
 
    const changeState = () => {
        if(state === 'images'){
          let  filterPostImg = filterPost?.filter(post => post.pics.length > 0)
            return filterPostImg
        } 
        if(state === 'text') return filterPost
    }
    
    return (
        <>
            <Wrap justify={'center'} spacing={30} w='100%'p={8} backgroundColor={'whitesmoke'} minH={'77vh'}>
                {
                    state === 'text' ? (
                                <TextPostContainer
                                    posts={changeState()}
                                    site={'search'}
                                />      
                    ):(
                                <ImgPostContainer
                                    posts={changeState()}
                                    site={'search'}
                                />
                    )
                }
  
            </Wrap>
        </>
    )
}

export default PostSearchContainer