import { FormEvent } from 'react';
import { CheckSuccess } from 'src/assets/icons';
import { Button } from 'src/components/Button';

interface StateProps {
  email: string;
}

interface DispatchProps {
  onToggle(): void;
  onSubmitResendEmail: (e: FormEvent) => void;
}

type Props = StateProps & DispatchProps;

export const ConfirmEmailForgotPasswordContent: React.FC<Props> = ({
  email,
  onToggle,
  onSubmitResendEmail,
}: Props): JSX.Element => (
  <div className="mt-5 w-full">
    <div>
      <img
        src={CheckSuccess}
        alt="Mensagem enviar para o e-mail com sucesso!"
        className="mb-[50px]"
      />
      <div className="self-start text-heading text-4xl font-dmsans font-bold mb-[15px]">
        Mensagem de recuperação de senha enviada
      </div>
      <p className="mb-[50px] text-heading text-xl font-dmsans font-normal w-4/5">
        Uma mensagem de recuperação de senha foi enviada para o e-mail {email}
      </p>
      <Button
        title="Abrir o meu e-mail"
        buttonStyle="primary"
        size="xlg"
        className="w-full mb-[25px]"
        onClick={() => {
          onToggle();
          window.location.href = `mailto:${email}`;
        }}
      />
      <Button
        type="button"
        title="Reenviar mensagem de recuperação de senha "
        buttonStyle="outline"
        size="xlg"
        className="w-full"
        onClick={onSubmitResendEmail}
      />
    </div>
  </div>
);
