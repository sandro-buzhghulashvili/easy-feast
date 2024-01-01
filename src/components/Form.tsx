import React from 'react';

import { useSearchParams } from 'react-router-dom';
import SignUp from './form-components/SignUp';
import Login from './form-components/Login';

const FormComponent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isLoggingIn = searchParams.get('mode') === 'login';

  if (!isLoggingIn) {
    return <SignUp />;
  } else {
    return <Login />;
  }
};

export default FormComponent;
