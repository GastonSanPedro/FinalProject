import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button
  } from '@chakra-ui/react';
  import { useDisclosure } from '@chakra-ui/react';
  import ProfileFeedComent from './ProfileFeedComent'


function ModalFeed({user}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button
        fontWeight={'normal'}
        variant={'unstyled'}
        borderRadius={2}
        w={'20%'} 
        onClick={onOpen}
        _hover={{
            bg: 'logo.2',
            color:'white'
        }}>See all posts</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            {
           user?.wall?.map((post, i) =>{
              return(
                <Box ml={i === 0? '1.3%' : null} w={'100%'} key={i}>
                <ProfileFeedComent
                     description={post.description}
                     firstName={post.author.firstName}
                     lastName={post.author.lastName}
                     avatar={post.author.image}
                   />
                </Box>
              )
            })
          }
            </ModalBody>
  
            <ModalFooter>
              <Button  
                fontWeight={'normal'}
                variant={'unstyled'}
                w={'95%'} 
                h={'10vh'} 
                mb={2} 
                mr={3}
                onClick={onClose}
                _hover={{
                    bg: 'logo.3',
                    color:'white'
                    }}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default ModalFeed