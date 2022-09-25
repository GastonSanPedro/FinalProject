import React from 'react';
import { Flex, Button, Divider } from "@chakra-ui/react";
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
            
            borderRadius={2}
            mt={site === 'feed' ? '0vh' : '4vh'}
            >
            {   
              site === 'search' ? (
              <UserSearchContainer word={word} />
              ) : (
              site === 'feed'|| site === 'profile' ?
               (<CreatePost site={site} email={email} /> ) : null
                )}
            <Divider/>

            <Flex
            dir='row'
            align={'center'}
            justify={'center'}
            mb={'2%'}
            mt={'2%'}
            >
            <Button
              onClick={()=>{handleClickImg()}}
              size={'md'}
              bg={'none'}
              borderRadius='none'
              _hover={{
                bg: 'none',
                borderBottom: '2px solid black'
                }}
              _focus={{
                bg: 'none',
                borderBottom: '2px solid black'
                }}>
              Images
            </Button>
            <Button
              onClick={()=>{handleClickText()}}
              name={'text'}
              size={'md'}
              bg={'none'}
              borderRadius='none'
              _hover={{
                bg: 'none',
                borderBottom: '2px solid black'
                }}
              _focus={{
                bg: 'none',
                borderBottom: '2px solid black'
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