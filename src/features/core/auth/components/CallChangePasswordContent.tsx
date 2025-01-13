import { Button } from 'src/components/Button';
import { ShouldShowModal, ShouldShowModalProps } from '../types';

interface StateProps {
  name: string;
}

interface DispatchProps {
  onShouldShowModal(props: ShouldShowModalProps): void;
}

type Props = StateProps & DispatchProps;

export const CallChangePasswordContent: React.FC<Props> = (
  props: Props
): JSX.Element => (
  <div className="mt-5 w-full">
    <div>
      <p className="mb-10 text-heading text-xl font-dmsans font-normal w-4/5">
        {`Olá ${props.name}, clique no botão abaixo para alterar a sua senha da sua conta da Banca do Ingresso:`}
      </p>
      <Button
        title="Alterar minha senha"
        buttonStyle="primary"
        size="xlg"
        className="w-full"
        onClick={() =>
          props.onShouldShowModal({
            value: ShouldShowModal.CHANGE_PASSWORD,
            title: 'Altere a sua senha',
          })
        }
      />
    </div>
  </div>
);
