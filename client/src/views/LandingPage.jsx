import React, { useEffect, useState } from 'react';
import LogInForm from '../components/LogInForm/LogInForm';
import { Center, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import CreateUser from '../components/CreateUserForm/CreateUSerForm';
import logo from '../assets/logo.jpg';
import { connectToServer } from '../socket-client';
import { useSelector } from 'react-redux';

const Landing = () => {
  const logoLeafme = logo;
  const [logOrSign, setlogOrSign] = useState('log');
  const myUser = useSelector(state => state.myUser)

  const connectWs = (email)=>{
    connectToServer(email)
  }

  useEffect(()=>{
    connectWs(myUser.email)
    console.log(myUser.email)
  },[myUser])



  return (
    <>
      <Image
        alignSelf={'center'}
        boxSize={300}
        objectFit={'contain'}
        position={'absolute'}
        right={'7%'}
        top={'-5%'}
        src={logoLeafme}
        alt="logo"
      />
      {logOrSign === 'log' ? (
        <LogInForm logOrSign={logOrSign} setlogOrSign={setlogOrSign} />
      ) : (
        <CreateUser logOrSign={logOrSign} setlogOrSign={setlogOrSign} />
      )}
    </>
  );
};

export default Landing;

