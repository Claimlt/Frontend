export type SignupFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
 };

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  nic: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
};
export type LoginFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
};

export type FormErrors = Partial<Record<keyof FormData, string>> & {
  submit?: string;
};
