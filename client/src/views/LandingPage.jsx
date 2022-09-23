import React, { useState } from 'react';
import LogInForm from '../components/LogInForm/LogInForm';
import { Center, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import CreateUser from '../components/CreateUserForm/CreateUSerForm';
import logo from '../assets/logo.jpg';

const Landing = () => {
  const logoLeafme = logo;
  const [logOrSign, setlogOrSign] = useState('log');

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
