import React, { useEffect, useState } from 'react';
import { Box, Avatar,Button } from '@chakra-ui/react';

const ProfileDetail = () => {
  const [User, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  console.log({User})
  const [canEdit, setCanEdit] = React.useState(false)
  const [firstName, setFirstName] = React.useState(User.firstName)

  const editDataProfile = () =>{
    setCanEdit(true)
  }

  useEffect(()=>{
    if(canEdit){

    }
  },[canEdit])

  return (
    <>
      <Box
        ml={10}
        mt={5}
        p={7}
        w="70%"
        display={'flex'}
        backgroundColor={'#ECEAEA'}
      >
        <Avatar
          size="xl"
          name="usuario"
          src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1"
        />
        <Box ml={8} w="90%" display={"flex"} flexDirection={"column"}>
          <section style={{display:"flex"}}>
          <h4>First name:</h4>
          <p>{firstName}</p>
          </section>
          <section style={{display:"flex"}}>
          <h4>LastName:</h4> 
          <p>{User.lastName}</p>
          </section>
          <section style={{display:"flex"}}>
          <h4>Email:</h4>
          <p>{User.email}</p>
          </section>
          
          <Button colorScheme={'green'} mt={2} w="20%" onClick={editDataProfile}>Editar</Button>
        </Box>
        
      </Box>
    </>
  );
};

export default ProfileDetail;
