import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Button,
    ButtonGroup
  } from '@chakra-ui/react';
  import { useDisclosure } from '@chakra-ui/react';
  import { FaExchangeAlt } from 'react-icons/fa';
  import Carousel from './Carousel';
  import { useDispatch } from 'react-redux';
  import { changeDataProfile } from '../../redux/action';




const CovermModal= ({myUser}) => {

    const cards = [
        {
          title: 'Welcome to the jungle',
          text:
            "Some examples of tropical trees include plumeria, ylang-ylang, ebony, teak, and palms. Hibiscus, orchids, gardenia, bird-of-paradise, and fire brush are some commonly-grown tropical shrubs and plants, while bougainvillea, morning glory, passion vines, and rubber vines are some well-known tropical vines",
          image:
            'https://images.unsplash.com/photo-1602298674761-700e96568f5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbmZvcmVzdHxlbnwwfHwwfHw%3D&w=1000&q=80',
        },
        {
          title: 'The lungs of the world',
          text:
            "If a piece of land is free from human intervention, a forest will naturally self-seed and take over within a period of around 600 to 1,000 years.",
          image:
            'https://api.time.com/wp-content/uploads/2018/05/forest-bathing.jpg?quality=85&w=2400',
        },
        {
          title: 'Tulip Season',
          text:
            "The Netherlands accounts for nearly 90 percent of the world's total area of tulip farms planted annually, about 11,000 hectares.",
          image:
            'https://cdn11.bigcommerce.com/s-1b9100svju/product_images/uploaded_images/allabouttulips1.jpg',
        },
        {
            title: 'Indoor flower plants',
            text:
              "The golden trumpet is a flower that can bloom all year round. Apart from its beautiful appearance, this all-year flowering plant is used to kill bacterias and reduce swellings.",
            image:
              'https://img.freepik.com/premium-photo/beautiful-blooming-yellow-golden-trumpet-tree-tabebuia-are-blooming-with-park-spring-day-garden-sunset-blue-sky-background-thailand_29332-5246.jpg?w=2000',
          },
      ];
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const handleClick = (e) => {
        if(e.target.name === 'jungle'){
            let body = { cover: cards[0].image }    
            dispatch(changeDataProfile(body, myUser.email))
            onClose()}
        if(e.target.name === 'forest'){
            let body = { cover: cards[1].image }    
            dispatch(changeDataProfile(body, myUser.email))
            onClose()}
        if(e.target.name === 'tulips'){
            let body = { cover: cards[2].image }    
            dispatch(changeDataProfile(body, myUser.email))
            onClose()}
        if(e.target.name === 'golden'){
            let body = { cover: cards[3].image }    
            dispatch(changeDataProfile(body, myUser.email))
            onClose()}    
      } 
    return (
      <>
        <IconButton
        icon={<FaExchangeAlt/>}
        size={'xs'}
        top={'22.5vh'}
        left={'1vh'}
        textDecor={'none'}
        fontWeight={'light'}
        borderRadius={2}
        _hover={{
          bg: 'logo.3',
          color: 'white'
        }}
        _active={{
          bg: 'logo.3',
          color: 'white'
        }}
        onClick={onOpen}
          />
  
        <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
          
            <ModalHeader fontWeight={'light'}>Choose a cover picture</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Carousel cards={cards}/>
            </ModalBody>
  
            <ModalFooter>
                <ButtonGroup>
                <Button
                name='jungle'
                onClick={(e) => handleClick(e)}
                fontWeight={'light'}
                 _hover={{
                    bg: 'logo.3',
                    color: 'white'
                }} 
                borderRadius={1} 
                variant='ghost'>Jungle</Button>
                <Button
                name='forest'
                onClick={(e) => handleClick(e)}
                fontWeight={'light'}
                 _hover={{
                    bg: 'logo.3',
                    color: 'white'
                }} 
                borderRadius={1} 
                variant='ghost'>Forest</Button>
                <Button
                name='tulips'
                onClick={(e) => handleClick(e)}
                fontWeight={'light'}
                 _hover={{
                    bg: 'logo.3',
                    color: 'white'
                }} 
                borderRadius={1} 
                variant='ghost'>Tulips</Button>
                <Button
                name='golden'
                onClick={(e) => handleClick(e)}
                fontWeight={'light'}
                 _hover={{
                    bg: 'logo.3',
                    color: 'white'
                }} 
                borderRadius={1} 
                variant='ghost'>Golden</Button>
                </ButtonGroup>

              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default CovermModal

  