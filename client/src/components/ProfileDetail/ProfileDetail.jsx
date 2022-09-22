import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Button,
  Input,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDataProfile, getMyUser } from '../../redux/action';

const ProfileDetail = ({
  userEmail,
  firstname,
  lastname,
  bioUser,
  changeHandler,
}) => {
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  //const user = useSelector((state) => state.myUser);
  const [canEdit, setCanEdit] = React.useState(false);
  const [firstName, setFirstName] = React.useState(firstname);
  const [lastName, setLastName] = React.useState(lastname);
  const [email, setEmail] = React.useState(userEmail);
  const [bio, setBio] = React.useState(bioUser); //aca deberia inicializarlo con User.bio para que traiga si es que tiene algo
  const [input, setInput] = React.useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    bio: bio,
  });

  const dispatch = useDispatch();

  const editDataProfile = () => {
    setCanEdit(true);
    //prueba
  };

  const handleInputFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleInputLastNameChange = (e) => {
    setLastName(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleInputEmailChange = (e) => {
    setEmail(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleInputBioChange = (e) => {
    setBio(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeData = (input) => {
    dispatch(changeDataProfile(input, userEmail));
    setCanEdit(false);
    changeHandler(input.email);
    setInput('');
  };
  return (
    <>
      <Box
        ml={3}
        p={8}
        mt={2}
        mb={4}
        w="100%"
        h="34vh"
        display={'flex'}
        borderRadius={7}
        backgroundColor={'gray.300'}
      >
        <Avatar
          size="xl"
          name="usuario"
          src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1"
        />
        <Box ml={8} w="90%" display={'flex'} flexDirection={'column'}>
          <Box
            width={'90%'}
            display={'flex'}
            flexDirection={'row'}
            height={'10vh'}
          >
            <Box width={'30%'} height={'10vh'}>
              <span>First name:</span>
              <section
                style={{
                  display: 'flex',
                  width: '100%',
                }}
              >
                {canEdit ? (
                  <Input
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      handleInputFirstNameChange(e);
                    }}
                  />
                ) : (
                  // <Editable defaultValue={firstName}>
                  //   <EditablePreview />
                  //   <EditableInput
                  //     name="firstName"
                  //     value={firstName}
                  //     onChange={(e) => {
                  //       handleInputFirstNameChange(e);
                  //     }}
                  //   />
                  // </Editable>
                  <Text fontSize="md">{firstname}</Text>
                )}
              </section>
            </Box>
            <Box width={'30%'} height={'10vh'} ml={10}>
              <span>LastName:</span>
              <section style={{ display: 'flex', position: 'absolute' }}>
                {canEdit ? (
                  <Input
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      handleInputLastNameChange(e);
                    }}
                  />
                ) : (
                  <Text>{lastname}</Text>
                )}
              </section>
            </Box>
            <Box width={'30%'} height={'10vh'} ml={10}>
              <span>Email:</span>
              <section style={{ display: 'flex' }}>
                {canEdit ? (
                  <Input
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      handleInputEmailChange(e);
                    }}
                  />
                ) : (
                  <Text>{userEmail}</Text>
                )}
              </section>
            </Box>
          </Box>
          <span>Bio:</span>
          {(canEdit || bio?.length > 0) && (
            <section style={{ display: 'flex' }}>
              {canEdit ? (
                <Input
                  w={'90%'}
                  mb={'3'}
                  name="bio"
                  type="text"
                  value={bio}
                  onChange={(e) => {
                    handleInputBioChange(e);
                  }}
                />
              ) : (
                <p>{bioUser}</p>
              )}
            </section>
          )}
          <section>
            <Button
              colorScheme={'green'}
              mt={2}
              w="20%"
              onClick={editDataProfile}
            >
              Editar
            </Button>
            {canEdit && (
              <Button
                colorScheme={'green'}
                mt={2}
                ml={3}
                w="20%"
                onClick={(e) => {
                  changeData(input);
                }}
              >
                Guardar
              </Button>
            )}
          </section>
        </Box>
      </Box>
    </>
  );
};
//prueba2

export default ProfileDetail;
