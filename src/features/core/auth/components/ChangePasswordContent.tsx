import { FormEvent } from 'react';
import { IconEye, IconEyeClose } from 'src/assets/icons';
import { InputText } from 'src/components/InputText';
import { Button } from 'src/components/Button';
import { classNames } from 'src/helpers/common';
import { FormInputNameRegister } from '../types';
import { UseFormReturn } from 'src/hooks';

interface ForgotPasswordContentProps
  extends Pick<UseFormReturn, 'formData' | 'formErrors' | 'onChangeFormInput'> {
  state: boolean;
  shouldShowPasswordToText: boolean;
  onSubmit: (e: FormEvent) => void;
  onTogglePasswordToText: () => void;
}

export const ChangePasswordContent = ({
  state,
  shouldShowPasswordToText,
  formData,
  formErrors,
  onChangeFormInput,
  onSubmit,
  onTogglePasswordToText,
}: ForgotPasswordContentProps) => (
  <div className="w-full">
    <form onSubmit={onSubmit}>
      <div className="mt-[50px] mb-[30px]">
        <InputText
          name="password"
          label="Senha"
          type={shouldShowPasswordToText ? 'text' : 'password'}
          placeholder="*****"
          value={formData[FormInputNameRegister.password]}
          maxLength={15}
          onChange={(e) =>
            onChangeFormInput(FormInputNameRegister.password)(e.target.value)
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
                  <img src={IconEyeClose} alt="Ocultar senha" />
                ) : (
                  <img src={IconEye} alt="Mostrar senha" />
                )}
              </div>
            </button>
          }
        />
      </div>
      <div className="mb-[50px] text-neutro-w-600 text-base font-dmsans font-normal">
        <p className="mb-5">Sua senha deve conter:</p>
        <ul className="text-neutro-w-500 list-disc list-item ml-6">
          <li>No mínimo 8 caracteres;</li>
          <li>Pelo menos um número;</li>
          <li>Pelo menos um caractere maiúsculo.</li>
        </ul>
      </div>
      <div className="mb-[50px]">
        <InputText
          name="password"
          label="Confirme a sua senha"
          type={shouldShowPasswordToText ? 'text' : 'password'}
          placeholder="*****"
          value={formData[FormInputNameRegister.confirmPassword]}
          maxLength={15}
          onChange={(e) =>
            onChangeFormInput(FormInputNameRegister.confirmPassword)(
              e.target.value
            )
          }
          error={formErrors.confirmPassword && formErrors.confirmPassword[0]}
          renderForward={
            <button
              className={classNames(
                formErrors.confirmPassword && formErrors.confirmPassword[0]
                  ? 'right-0 bottom-7'
                  : 'right-0 bottom-3',
                'absolute cursor-pointer mr-4'
              )}
              onClick={onTogglePasswordToText}
              type="button"
            >
              <div className="h-8 flex flex-col justify-center items-center">
                {shouldShowPasswordToText ? (
                  <img src={IconEyeClose} alt="Ocultar senha" />
                ) : (
                  <img src={IconEye} alt="Mostrar senha" />
                )}
              </div>
            </button>
          }
        />
      </div>
      <Button
        type="submit"
        title="Alterar a minha senha"
        buttonStyle="primary"
        size="xlg"
        className="w-full"
        disabled={
          formData[FormInputNameRegister.password] === '' ||
          formData[FormInputNameRegister.confirmPassword] === '' ||
          state
        }
      />
    </form>
  </div>
);
