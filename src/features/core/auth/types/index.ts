export enum ShouldShowModal {
  LOGIN = 'login',
  REGISTER = 'register',
  TERMS = 'terms',
  FORGOT_PASSWORD = 'forgot_password',
  CHECk_EMAIL = 'check_email',
  CONFIRM_EMAIL_FORGOT_PASSWORD = 'confirm_email_forgot_password',
  CHANGE_CLIENT_DATA = 'change_client_data',
  CALL_CHANGE_PASSWORD = 'call_change_password',
  CHANGE_PASSWORD = 'change_password',
  CONFIRM_REGISTER = 'confirm_register',
  LOGOUT = 'logout',
}

export type ShouldShowModalProps = {
  value: ShouldShowModal;
  title: string | React.ReactNode;
};

export enum FormInputNameChangeClientData {
  document = 'document',
  name = 'name',
  email = 'email',
  phone = 'phone',
  date = 'date',
  motherName = 'motherName',
}

export enum FormInputNameRegister {
  name = 'name',
  document = 'document',
  email = 'email',
  gender = 'gender',
  date = 'date',
  phone = 'phone',
  password = 'password',
  confirmPassword = 'confirmPassword',
  terms = 'terms',
  zipCode = 'zipCode',
  state = 'state',
  city = 'city',
  street = 'street',
  complement = 'complement',
  imageBase64 = 'imageBase64',
  country = 'country',
  number = 'number',
  neighborhood = 'neighborhood',
  role = 'role',
}

export enum FormInputEvent {
  name = 'name',
  description = 'description',
  imageBase64 = 'imageBase64',
  imageDetail = 'imageDetail',
  startDate = 'startDate',
  endDate = 'endDate',
  zipCode = 'zipCode',
  state = 'state',
  city = 'city',
  district = 'district',
  street = 'street',
  complement = 'complement',
  country = 'country',
  payment = 'payment',
}

export enum FormInputNameContacts {
  name = 'name',
  email = 'email',
  message = 'message',
}

export enum FormInputNameRegisterConfirm {
  code = 'code',
}

export interface NavigationMenu {
  name: string;
  href: string;
  current: boolean;
}

export enum FromInputRegisterPix {
  imageBase64 = 'imageBase64',
  numeroPix = 'numeroPix',
}
