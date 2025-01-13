import { FormEvent } from 'react';
import {
  FormErrors,
  IsFormValid,
  OnChangeFormInput,
  RunAllValidators,
  SetErrors,
  SetFormData,
  SetFormErrors,
} from 'src/hooks';

export interface NavigationMenu {
  name: string;
  href: string;
  current: boolean;
  submenu?: SubMenu[];
}

interface SubMenu {
  name: string;
  href: string;
  current: boolean;
}

export interface UseFormControl {
  onChangeFormInput: OnChangeFormInput;
  formData: FormData;
  formErrors: FormErrors;
  setFormErrors?: SetFormErrors;
  setFormData?: SetFormData;
  isFormValid?: IsFormValid;
  runAllValidators?: RunAllValidators;
  setErrors?: SetErrors;
  resetForm?: () => void;
  onSubmit?: (e: FormEvent) => void;
}
