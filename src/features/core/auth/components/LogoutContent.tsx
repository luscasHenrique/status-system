import { Button } from 'src/components/Button';

interface Props {
  onCancelConfirm: () => void;
  onOkConfirm: () => void;
}

export const LogoutContent = ({ onCancelConfirm, onOkConfirm }: Props) => {
  return (
    <div className="w-full mx-auto font-dmsans ">
      <div className="flex flex-col justify-center">
        <h4 className="font-bold text-center text-neutro-b-400 text-[21px] mb-10">
          Você tem certeza que quer sair da sua conta?
        </h4>
        <div className="grid grid-cols-2 gap-5">
          <Button
            type="button"
            title="Não, quero continuar"
            buttonStyle="text"
            size="xlg"
            className="w-full mb-[20px]"
            onClick={onCancelConfirm}
          />
          <Button
            type="button"
            title="Sim, quero sair"
            buttonStyle="primary"
            size="xlg"
            className="w-full mb-[20px]"
            onClick={onOkConfirm}
          />
        </div>
      </div>
    </div>
  );
};
