import React from 'react';
import { Button } from 'src/components/Button';

interface StateProps {
  email: string;
}

interface DispatchProps {
  onConfirmEmail: () => void;
  onChangePersonData: () => void;
}

type Props = StateProps & DispatchProps;

export const CheckEmailContent: React.FC<Props> = ({
  email,
  onConfirmEmail,
  onChangePersonData,
}): JSX.Element => {
  return (
    <div className="mt-5 w-full">
      <div>
        <div className="self-start text-heading text-4xl font-dmsans font-bold mb-[15px]">
          Seu e-mail está correto?
        </div>
        <p className="mb-[50px] text-heading text-xl font-dmsans font-normal w-4/5">
          {email}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Button
            title="Sim"
            buttonStyle="primary"
            size="xlg"
            className="auto-cols-auto"
            onClick={onConfirmEmail}
          />
          <Button
            type="button"
            title="Não"
            buttonStyle="outline"
            size="xlg"
            className="auto-cols-auto"
            onClick={onChangePersonData}
          />
        </div>
      </div>
    </div>
  );
};
