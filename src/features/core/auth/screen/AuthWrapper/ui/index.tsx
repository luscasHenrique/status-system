import React, { FormEvent } from 'react';
import { FooterNew } from 'src/components/FooterNew';
// import { HeaderAliEx } from 'src/components/HeaderAliEx';
import { UseFormReturn } from 'src/hooks/useForm';
import { MainStyle } from '../../../components/MainStyle';
import { HeaderMenuShopee } from 'src/components/HeaderMenuShopee';
import { Cart } from 'src/model/Cart';
// import { HeaderNavMenu } from 'src/components/HeaderNavMenu';

interface AuthWrapperUIProps
  extends Pick<UseFormReturn, 'formData' | 'formErrors' | 'onChangeFormInput'> {
  cartCount: number;
  carts: Cart[];
  onSubmitSearch: (e: FormEvent) => void;
  onLinkClick: (href: string) => void;
  children: React.ReactNode;
  onSubmitLogout: () => void;
  signed: boolean;
}

export const AuthWrapperUI = ({
  formData,
  formErrors,
  signed,
  cartCount,
  carts,
  onChangeFormInput,
  onSubmitSearch,
  onLinkClick,
  onSubmitLogout,
  children,
}: AuthWrapperUIProps) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* TODO Criar Header*/}
        {/* 
        <HeaderAliEx
          formData={formData}
          formErrors={formErrors}
          onChangeFormInput={onChangeFormInput}
          onSubmitSearch={onSubmitSearch}
          onLinkClick={onLinkClick}
        /> */}
        {/* <HeaderNavMenu
          formData={formData}
          formErrors={formErrors}
          onChangeFormInput={onChangeFormInput}
          onSubmitSearch={onSubmitSearch}
          onLinkClick={onLinkClick}
        /> */}

        <HeaderMenuShopee
          formData={formData}
          formErrors={formErrors}
          onChangeFormInput={onChangeFormInput}
          onSubmitSearch={onSubmitSearch}
          onLinkClick={onLinkClick}
          onSubmitLogout={onSubmitLogout}
          signed={signed}
          cartCount={cartCount}
          carts={carts}
        />

        {/* TODO conteudo principal */}
        <MainStyle>{children}</MainStyle>

        {/* TODO criar footer*/}
        <FooterNew onLinkClick={onLinkClick} />
      </div>
    </>
  );
};
