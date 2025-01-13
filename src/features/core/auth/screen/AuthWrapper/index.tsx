import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormInputSearch } from 'src/components/Search/type';
import { getBoolean, removeItem } from 'src/helpers/common/localStorage';
import validators from 'src/helpers/validators';
import useForm from 'src/hooks/useForm';
import Client from 'src/model/User';
import { api } from 'src/services/api';
import { REACT_APP_AUTH, REACT_APP_USER } from 'src/utils/config';
import { AuthWrapperUI } from './ui';
import { Cart } from 'src/model/Cart';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const signed = getBoolean(String(REACT_APP_AUTH));
  const [cartCount, setCartCount] = useState<number>(0);
  const [carts, setCarts] = useState<Cart[]>([]);

  //   const user: AuthUser = getItem(String(REACT_APP_USER));
  //   const role = user.type;

  const getUser = async (): Promise<void> => {
    if (signed) {
      try {
        const response = await api.get<Client>(`/user/findeone`);
        console.log('data', response);
        if (response.status === 200) {
          if (response.data.cart && response.data.cart.length > 0) {
            console.log('cart: ', response.data.cart);
            console.log('valor: ', response.data.cart.length);
            setCartCount(response.data.cart.length);
          }
          if (response.data.cart && response.data.cart.length > 0) {
            setCarts(response.data.cart);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar o usuario:', error);
      }
    }
  };

  const {
    formData: formData,
    formErrors: formErrors,
    setErrors: setError,
    onChangeFormInput: onChangeFormInput,
    isFormValid: isFormValid,
    resetForm: resetForm,
  } = useForm({
    initialData: {
      search: '',
    },
    validators: {
      search: [validators.required],
    },
  });

  //   const handleOnSubmitSearch = async (e: FormEvent): Promise<void> => {
  //     e.preventDefault();
  //     if (isFormValid()) {
  //       console.log(formData[FormInputSearch.search]);
  //     } else {
  //       setError({ [FormInputSearch.search]: ['Deu ruim...'] });
  //       resetForm();
  //     }
  //   };
  const handleOnSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      const keyword = formData[FormInputSearch.search];
      history.push(`/products-find/${keyword}`);
    } else {
      setError({ [FormInputSearch.search]: ['Algo deu errado...'] });
      resetForm();
    }
  };

  const history = useHistory();
  const handleLinkClick = (href: string): void => {
    history.push(href);
  };

  const handleOnSubmitLogout = () => {
    removeItem(String(REACT_APP_AUTH));
    removeItem(String(REACT_APP_USER));
    history.replace('/');
    // onSetVisible(false);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [signed]);

  return (
    <AuthWrapperUI
      signed={signed}
      formData={formData}
      formErrors={formErrors}
      onChangeFormInput={onChangeFormInput}
      onSubmitSearch={handleOnSubmitSearch}
      onLinkClick={handleLinkClick}
      onSubmitLogout={handleOnSubmitLogout}
      cartCount={cartCount}
      carts={carts}
    >
      {children}
    </AuthWrapperUI>
  );
};
