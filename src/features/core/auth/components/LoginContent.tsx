import { gapi } from 'gapi-script';
import { FormEvent, useEffect } from 'react';
import {
  //Google,
  IconEye,
  IconEyeClose /*, IconFacebook*/,
} from 'src/assets/icons';
import { Button } from 'src/components/Button';
import { InputText } from 'src/components/InputText';
import { classNames } from 'src/helpers/common';
import { ShouldShowModal, ShouldShowModalProps } from '../types';
import logoFull from './../../../../assets/images/NGOLO_PRETA.png';
import { UseFormReturn } from 'src/hooks';
import { FormInputNameLogin } from 'src/features/login/types';

interface StateProps
  extends Pick<UseFormReturn, 'formData' | 'formErrors' | 'onChangeFormInput'> {
  state: boolean;
  //   enableLoginPassword: boolean;
  shouldShowPasswordToText: boolean;
  shouldShowPasswordToText2: boolean;
}

interface DispathProps {
  onTogglePasswordToText: () => void;
  //   onCheckCPF: () => void;
  onSubmit: (e: FormEvent) => void;
  onShouldShowModal: ({ value, title }: ShouldShowModalProps) => void;
  //   onGoToGoogle: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  //   onSubmitGoogle: (
  //     response: GoogleLoginResponse | GoogleLoginResponseOffline
  //   ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   onGoogleError: (error: any) => void;
  //   onGoToFacebook: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  //   onSubmitFacebook: (
  //     userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  //   ) => void;
  //   onGoToAppleId: () => void;
}

type LoginContentProps = StateProps & DispathProps;

export const LoginContent: React.FC<LoginContentProps> = ({
  state,
  shouldShowPasswordToText,
  formData,
  formErrors,
  //   enableLoginPassword,
  onChangeFormInput,
  //   onCheckCPF,
  onSubmit,
  onTogglePasswordToText,
  onShouldShowModal,
  //onGoToGoogle,
  //onSubmitGoogle,
  //onGoogleError,
  //onGoToFacebook,
  //onSubmitFacebook,
}) => {
  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId:
          '784726485697-uutejg2oolluqsfdm73n1nm6acdr0ntg.apps.googleusercontent.com',
        plugin_name: 'chat',
      });
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-auto h-[100px]"
          src={logoFull}
          alt="Banca do Ingresso"
        />
      </div>

      <div className="mt-8 w-full">
        <form onSubmit={onSubmit}>
          <div className="mb-[20px]">
            <InputText
              name="document"
              label="Email"
              placeholder="Digite seu email"
              className={`appearance-none w-full
                rounded-md text-heading leading-tight focus:outline-none
                focus:shadow-outline text-xs font-dmsans font-normal`}
              value={formData[FormInputNameLogin.email]}
              onChange={(e) =>
                onChangeFormInput(FormInputNameLogin.email)(e.target.value)
              }
              error={formErrors.email && formErrors.email[0]}
            />
          </div>

          <div className="mb-0">
            <InputText
              id="loginPWD"
              name="password"
              label="Senha"
              type={shouldShowPasswordToText ? 'text' : 'password'}
              placeholder="**********"
              value={formData[FormInputNameLogin.password]}
              maxLength={15}
              onChange={(e) =>
                onChangeFormInput(FormInputNameLogin.password)(e.target.value)
              }
              error={formErrors.password && formErrors.password[0]}
              renderForward={
                <button
                  className={classNames(
                    formErrors.password && formErrors.password[0]
                      ? 'right-0 bottom-7'
                      : 'right-0 bottom-3',
                    'absolute cursor-pointer mr-4'
                  )}
                  onClick={onTogglePasswordToText}
                  type="button"
                >
                  <div className="h-8 flex flex-col justify-center items-center">
                    {shouldShowPasswordToText ? (
                      <img src={IconEye} alt="Mostrar senha" />
                    ) : (
                      <img src={IconEyeClose} alt="Ocultar senha" />
                    )}
                  </div>
                </button>
              }
            />
          </div>
          <div className="flex flex-col items-start justify-between pt-3">
            {/* <a
              className="mb-[20px] mt-4 underline underline-offset-2 inline-block
              align-baseline text-label text-base font-normal font-dmsans"
              href="#"
              onClick={() =>
                onShouldShowModal({
                  value: ShouldShowModal.FORGOT_PASSWORD,
                  title: 'Esqueceu a sua senha?',
                })
              }
            >
              Esqueci minha senha?
            </a> */}
            <Button
              type="submit"
              title="Entrar"
              buttonStyle="primary"
              size="xlg"
              className="w-full"
              disabled={
                formData[FormInputNameLogin.email] === '' ||
                formData[FormInputNameLogin.password] === '' ||
                state
              }
            />
          </div>
          {/* <div className="flex items-baseline justify-center">
            <span className=" text-neutro-w-500 text-base font-normal font-dmsans">
              Ainda não tem uma conta?
            </span>
            <a
              className="mx-2 underline underline-offset-2 inline-block
              align-baseline text-neutro-w-600 text-base font-bold font-dmsans"
              href="#"
              onClick={() =>
                onShouldShowModal({
                  value: ShouldShowModal.REGISTER,
                  title: 'Crie a sua conta',
                })
              }
            >
              Criar conta
            </a>
          </div> */}
        </form>
      </div>
    </div>
  );
};
