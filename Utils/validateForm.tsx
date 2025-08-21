import type { FormData, FormErrors } from "./Registration";

export function validateForm(formData: FormData): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    else if (formData.firstName.length < 2) newErrors.firstName = "First name must be at least 2 characters";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (formData.lastName.length < 2) newErrors.lastName = "Last name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    if (!formData.nic.trim()) newErrors.nic = "NIC is required";
    else if (!/^([0-9]{9}[xXvV]|[0-9]{12})$/.test(formData.nic)) newErrors.nic = "Enter a valid NIC number";

    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.contactNumber)) newErrors.contactNumber = "Enter a valid contact number";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) newErrors.password = "Password must contain uppercase, lowercase and number";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
}