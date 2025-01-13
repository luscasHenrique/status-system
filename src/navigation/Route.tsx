import React from 'react';
import { Redirect, RouteProps, Route as RouteWrapper } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBoolean } from 'src/helpers/common/localStorage';
import { REACT_APP_AUTH } from 'src/utils/config';

interface RouteWrapperProps extends RouteProps {
  // eslint-disable-next-line
  component: any;
  isPrivateRoute?: boolean;
}

export const Route: React.FC<RouteWrapperProps> = ({
  component: Component,
  isPrivateRoute,

  ...rest
}: RouteWrapperProps): JSX.Element => {
  const signed = getBoolean(String(REACT_APP_AUTH));

  console.log(signed);
  console.log('entrou');
  if (isPrivateRoute && !signed) {
    toast.warn('Faça Login novamente.');
    return <Redirect to="/login" />;
  }

  return (
    <RouteWrapper {...rest} render={(props) => <Component {...props} />} />
  );
};
