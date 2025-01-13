import React, { FormEvent } from 'react';
import { CalendarGrey } from 'src/assets/icons';
import { classNames } from 'src/helpers/common';

import { FormInputNameChangeClientData } from '../types';
import { InputText } from 'src/components/InputText';
import { Button } from 'src/components/Button';
import { FormErrors, OnChangeFormInput, UseFormReturn } from 'src/hooks';

export interface NameFiles {
  [key: string]: string;
}

export interface ChangeClientDataContentProps
  extends Pick<UseFormReturn, 'formData' | 'formErrors' | 'onChangeFormInput'> {
  state: boolean;
  shouldShowPasswordToText: boolean;
  shouldShowPasswordToText2: boolean;
  formNameFiles?: NameFiles;
  onChangeCEP: (value: string) => void;
  onTogglePasswordToText: () => void;
  onTogglePasswordToText2: () => void;
  //   onShouldShowModal: ({ value, title }: ShouldShowModalProps) => void;
  onSubmit: (e: FormEvent) => void;
  onChangeFormFileInput: (
    inputName: string
  ) => (file: File | undefined) => void;
}

export const ChangeClientDataContent: React.FC<
  ChangeClientDataContentProps
> = ({
  onSubmit,
  formData,
  onChangeFormInput,
  formErrors,
  state,
}): JSX.Element => {
  return (
    <div>
      <div className="mt-8 w-full">
        <form onSubmit={onSubmit}>
          <div className="mb-[20px]">
            <InputText
              name="document"
              label="CPF"
              placeholder="123.456.789-00"
              className={`appearance-none w-full
                rounded-md text-heading leading-tight focus:outline-none
                focus:shadow-outline text-xs font-dmsans font-normal`}
              maxLength={14}
              value={formData[FormInputNameChangeClientData.document]}
              onChange={(e) =>
                onChangeFormInput(FormInputNameChangeClientData.document)(
                  e.target.value
                )
              }
              error={formErrors.document && formErrors.document[0]}
              disabled
            />
          </div>
          <div className="mb-[20px]">
            <InputText
              name="name"
              label="Nome completo"
              placeholder="Maria da Silva"
              className={`appearance-none w-full
                rounded-md text-heading leading-tight focus:outline-none
                focus:shadow-outline text-xs font-dmsans font-normal`}
              value={formData[FormInputNameChangeClientData.name]}
              onChange={(e) =>
                onChangeFormInput(FormInputNameChangeClientData.name)(
                  e.target.value
                )
              }
              error={formErrors.name && formErrors.name[0]}
            />
          </div>

          <div className="mb-[20px]">
            <InputText
              name="email"
              label="E-mail"
              placeholder="meuemail@email.com"
              className={`appearance-none w-full
                rounded-md text-heading leading-tight focus:outline-none
                focus:shadow-outline text-xs font-dmsans font-normal`}
              value={formData[FormInputNameChangeClientData.email]}
              onChange={(e) =>
                onChangeFormInput(FormInputNameChangeClientData.email)(
                  e.target.value
                )
              }
              error={formErrors.email && formErrors.email[0]}
            />
          </div>

          <div className="mb-[20px]">
            <InputText
              name="phone"
              label="Telefone"
              placeholder="(00) 0 0000-0000"
              className={`appearance-none w-full
                rounded-md text-heading leading-tight focus:outline-none
                focus:shadow-outline text-xs font-dmsans font-normal`}
              value={formData[FormInputNameChangeClientData.phone]}
              onChange={(e) =>
                onChangeFormInput(FormInputNameChangeClientData.phone)(
                  e.target.value
                )
              }
              error={formErrors.phone && formErrors.phone[0]}
            />
          </div>

          <div className="mb-[20px]">
            <InputText
              name="date"
              label="Data de nascimento"
              placeholder="DD/MM/AAAA"
              className={`appearance-none w-full
                rounded-md text-heading leading-tight focus:outline-none
                focus:shadow-outline text-xs font-dmsans font-normal`}
              value={formData[FormInputNameChangeClientData.date]}
              onChange={(e) =>
                onChangeFormInput(FormInputNameChangeClientData.date)(
                  e.target.value
                )
              }
              error={formErrors.date && formErrors.date[0]}
              renderForward={
                <button
                  className={classNames(
                    formErrors.date && formErrors.date[0]
                      ? 'right-0 bottom-7'
                      : 'right-0 bottom-3',
                    'absolute cursor-pointer mr-4'
                  )}
                  type="button"
                >
                  <div className="h-8 flex flex-col justify-center items-center">
                    <img src={CalendarGrey} style={{ cursor: 'none' }} />
                  </div>
                </button>
              }
            />
          </div>

          <div className="mb-[20px]">
            <InputText
              name="motherName"
              label="Nome da mãe"
              placeholder="Ex: Maria da Silva"
              className={`appearance-none w-full
                rounded-md text-heading leading-tight focus:outline-none
                focus:shadow-outline text-xs font-dmsans font-normal`}
              value={formData[FormInputNameChangeClientData.motherName]}
              onChange={(e) =>
                onChangeFormInput(FormInputNameChangeClientData.motherName)(
                  e.target.value
                )
              }
              error={formErrors.motherName && formErrors.motherName[0]}
            />
          </div>

          <div
            className="mb-[20px] flex flex-col items-start justify-between"
            id="termsAndConditions"
          >
            <Button
              type="submit"
              title="Alterar meus dados"
              buttonStyle="primary"
              size="xlg"
              className="w-full"
              disabled={
                formData[FormInputNameChangeClientData.name] === '' ||
                formData[FormInputNameChangeClientData.email] === '' ||
                formData[FormInputNameChangeClientData.phone] === '' ||
                formData[FormInputNameChangeClientData.date] === '' ||
                state
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};
