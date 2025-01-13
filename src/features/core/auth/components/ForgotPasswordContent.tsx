import { FormEvent } from 'react';
import { InputText } from 'src/components/InputText';
import { Button } from 'src/components/Button';
import { FormInputNameRegister } from '../types';
import { UseFormReturn } from 'src/hooks';

interface ForgotPasswordContentProps
  extends Pick<UseFormReturn, 'formData' | 'formErrors' | 'onChangeFormInput'> {
  state: boolean;
  onSubmit: (e: FormEvent) => void;
}

export const ForgotPasswordContent = ({
  state,
  formData,
  formErrors,
  onChangeFormInput,
  onSubmit,
}: ForgotPasswordContentProps) => {
  return (
    <div className="mt-5 w-full">
      <form onSubmit={onSubmit}>
        <p className="mb-10 text-neutro-b-400 text-[21px] font-dmsans font-normal w-4/5">
          Uma mensagem de recuperação de senha será enviada para o e-mail
          cadastrado
        </p>
        <div className="mb-[50px]">
          <InputText
            name="document"
            label="CPF"
            placeholder="123.456.789-00"
            className={`appearance-none w-full
                rounded-md text-neutro-b-400 leading-tight focus:outline-none
                focus:shadow-outline text-xs font-dmsans font-normal`}
            maxLength={14}
            value={formData[FormInputNameRegister.document]}
            onChange={(e) =>
              onChangeFormInput(FormInputNameRegister.document)(e.target.value)
            }
            error={formErrors.document && formErrors.document[0]}
          />
        </div>
        <Button
          type="submit"
          title="Enviar mensagem de recuperação de senha"
          buttonStyle="primary"
          size="xlg"
          className="w-full"
          disabled={formData[FormInputNameRegister.document] === '' || state}
        />
      </form>
    </div>
  );
};
