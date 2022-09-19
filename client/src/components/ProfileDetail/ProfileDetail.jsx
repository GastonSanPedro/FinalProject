import React, { useEffect, useState } from 'react';
import { Box, Avatar, Button, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDataProfile, getMyUser } from '../../redux/actions';

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
        p={8}
        m={3}
        w="980px"
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
          <section style={{ display: 'flex' }}>
            <h4>First name:</h4>
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
              <p>{firstname}</p>
            )}
          </section>
          <section style={{ display: 'flex' }}>
            <h4>LastName:</h4>
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
              <p>{lastname}</p>
            )}
          </section>
          <section style={{ display: 'flex' }}>
            <h4>Email:</h4>
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
              <p>{userEmail}</p>
            )}
          </section>
          {(canEdit || bio?.length > 0) && (
            <section style={{ display: 'flex' }}>
              <h4>Bio:</h4>
              {canEdit ? (
                <Input
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
