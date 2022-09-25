import { Flex, Box, SlideFade, SimpleGrid, useDisclosure,Text } from "@chakra-ui/react";
import UserSearchContainer from "../UserSearch/UserSearchContainer";
import CreatePost from "../CreatePost/CreatePost";
import ImgPost from "./ImgPost";

const ImgPostContainer = ({site}) =>{
  const { isOpen, onToggle } = useDisclosure();
    const postImg  = [
      {
        user: {
          fullName: 'Carlos Fudi',
          userName: 'CarFudi',
          img: 'https://i.scdn.co/image/ab6761610000e5ebd471aab52533508e4bcf9ba4'
        },
        description: 'Lluvia de hojitas',
        image: 'https://www.escapadah.com/u/fotografias/m/2022/8/1/f720x404-8020_49592_5050.png'
      },
      {
        user: {
          fullName: 'Carlos Fudi',
          userName: 'CarFudi',
          img: 'https://i.scdn.co/image/ab6761610000e5ebd471aab52533508e4bcf9ba4'
        },
        description: 'Lluvia de hojitas',
        image: 'https://www.escapadah.com/u/fotografias/m/2022/8/1/f720x404-8020_49592_5050.png'
      },
      {
        user: {
          fullName: 'Carlos Fudi',
          userName: 'CarFudi',
          img: 'https://i.scdn.co/image/ab6761610000e5ebd471aab52533508e4bcf9ba4'
        },
        description: 'Lluvia de hojitas',
        image: 'https://www.escapadah.com/u/fotografias/m/2022/8/1/f720x404-8020_49592_5050.png'
      },
      {
        user: {
          fullName: 'Carlos Fudi',
          userName: 'CarFudi',
          img: 'https://i.scdn.co/image/ab6761610000e5ebd471aab52533508e4bcf9ba4'
        },
        description: 'Lluvia de hojitas',
        image: 'https://www.escapadah.com/u/fotografias/m/2022/8/1/f720x404-8020_49592_5050.png'
      },
      {
        user: {
          fullName: 'Carlos Fudi',
          userName: 'CarFudi',
          img: 'https://i.scdn.co/image/ab6761610000e5ebd471aab52533508e4bcf9ba4'
        },
        description: 'Lluvia de hojitas',
        image: 'https://www.escapadah.com/u/fotografias/m/2022/8/1/f720x404-8020_49592_5050.png'
      },
      {
        user: {
          fullName: 'Carlos Fudi',
          userName: 'CarFudi',
          img: 'https://i.scdn.co/image/ab6761610000e5ebd471aab52533508e4bcf9ba4'
        },
        description: 'Lluvia de hojitas',
        image: 'https://www.escapadah.com/u/fotografias/m/2022/8/1/f720x404-8020_49592_5050.png'
      }
    ]


    return(
        <>
         <Flex
            pr={'2%'}
            pl={'2%'}
            textAlign={'center'}
            justifyContent={'center'}
            direction={'column'}
            borderRadius={2}
            mt={site === 'feed' ? '0vh' : '4vh'}
            bg={'rgba(229, 191, 124, 0.3)'}
            >
        {
        <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={'10'} mt={2} mr={5}>
          {postImg ? (
            postImg.map((post, index) => {
              return (
                  <SlideFade in={onToggle} offsetY="20px">
                    <Box key={index}>
                      <ImgPost
                        user={post.user}
                        image={post.image}
                        description={post.description}
                        date={post.date}
                      />
                    </Box>
                  </SlideFade>
                );
              }
            
          )) : (
            <Box>
              <Text>no hay posteos</Text>{' '}
            </Box>
          )}
        </SimpleGrid>
        }
        </Flex>
        </>
    )
}

export default ImgPostContainer