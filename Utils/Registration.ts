export type SignupFormProps = {
    isOpen: boolean;
    onClose: () => void;
};

export type FormData = {
    name: string;
    email: string;
    nic: string;
    contactNumber: string;
    password: string;
    confirmPassword: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;