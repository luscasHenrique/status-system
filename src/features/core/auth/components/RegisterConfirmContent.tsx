import { FormEvent } from 'react';
import { InputText } from 'src/components/InputText';
import { Button } from 'src/components/Button';
import { FormInputNameRegisterConfirm } from '../types';
import { UseFormReturn } from 'src/hooks';

interface RegisterConfirmContentProps
  extends Pick<UseFormReturn, 'formData' | 'formErrors' | 'onChangeFormInput'> {
  state: boolean;
  onSubmit: (e: FormEvent) => void;
  emailConfirmation: string;
  onSubmitResendCode: (e: FormEvent) => void;
}

export const RegisterConfirmContent = ({
  state,
  formData,
  formErrors,
  onChangeFormInput,
  onSubmit,
  emailConfirmation,
  onSubmitResendCode,
}: RegisterConfirmContentProps) => (
  <div className="mt-5 w-full">
    <form onSubmit={onSubmit}>
      <p className="mb-10 text-heading text-xl font-dmsans font-normal w-4/5">
        Digite abaixo o código de confirmação que enviamos no seu email{' '}
        {emailConfirmation}
      </p>
      <div className="mb-[50px]">
        <InputText
          name="code"
          label="Código de confirmação"
          placeholder="123567"
          className={`appearance-none w-full
                rounded-md text-heading leading-tight focus:outline-none
                focus:shadow-outline text-xs font-dmsans font-normal`}
          value={formData[FormInputNameRegisterConfirm.code]}
          onChange={(e) =>
            onChangeFormInput(FormInputNameRegisterConfirm.code)(e.target.value)
          }
          error={formErrors.code && formErrors.code[0]}
        />
      </div>
      <Button
        type="submit"
        title="Confirmar e acessar a minha conta"
        buttonStyle="primary"
        size="xlg"
        className="w-full mb-[25px]"
        disabled={formData[FormInputNameRegisterConfirm.code] === '' || state}
      />
      <Button
        type="button"
        title="Reenviar código de confirmação"
        buttonStyle="outline"
        size="xlg"
        className="w-full"
        onClick={onSubmitResendCode}
        disabled={state}
      />
    </form>
  </div>
);
