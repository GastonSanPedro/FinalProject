import React from 'react';
import { Flex, Button } from "@chakra-ui/react";
import UserSearchContainer from "../UserSearch/UserSearchContainer";
import CreatePost from "../CreatePost/CreatePost";
import ImgPostContainer from "../ImgPost/ImgPostContainer";
import TextPostContainer from '../TextPost/TextPostContainer';
import { useState } from 'react';


const ContainerPost = ({site, word, email}) => {
 
  const [typePost, setTypePost] = useState('img')

  const handleClickImg = () => {
    setTypePost('img')
  }
  const handleClickText = () => {
    setTypePost('text')
  }
    return(
        <>
          <Flex
            ml={'2%'}
            pr={'2%'}
            pl={'2%'}
            textAlign={'center'}
            justifyContent={'center'}
            direction={'column'}
            bg={'rgba(229, 191, 124, 0.3)'}
            borderRadius={2}
            mt={site === 'feed' ? '0vh' : '4vh'}
            >
            {   
              site === 'search' ? (
              <UserSearchContainer word={word} />
              ) : (<CreatePost site={site} email={email} />
            )}
            <Flex
            dir='row'
            align={'center'}
            justify={'center'}
            mb={'2%'}
            >
            <Button
              onClick={()=>{handleClickImg()}}
              size={'lg'}
              bg={'none'}
              borderRadius='none'
              _hover={{
                bg: 'none',
                borderBottom: '3px solid black'
                }}
              _focus={{
                bg: 'none',
                borderBottom: '3px solid black'
                }}>
              Images
            </Button>
            <Button
              onClick={()=>{handleClickText()}}
              name={'text'}
              size={'lg'}
              bg={'none'}
              borderRadius='none'
              _hover={{
                bg: 'none',
                borderBottom: '3px solid black'
                }}
              _focus={{
                bg: 'none',
                borderBottom: '3px solid black'
                }}>
              Text
            </Button>
            </Flex>
          {
            typePost === 'text' ?
                (<TextPostContainer
                    site={site}
                  />
                ):(
                 <ImgPostContainer
                    site={site}/> 
                )
              
          }
          </Flex>
        </>
    )
}

export default ContainerPost