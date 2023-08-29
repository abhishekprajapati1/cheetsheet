import { FieldValues, WatchInternal } from 'react-hook-form';

export const getNameRules = (isRequired: boolean) => {
    return {
        ...(isRequired && {
            required: {
                value: true,
                message: "Please enter your name."
            }
        }),
        minLength: {
            value: 3,
            message: "Name must be at least 3 characters long"
        },
        pattern: {
            value: /^(?!.*\s{2,})[a-zA-Z]+(?:\s[a-zA-Z]+){0,2}\s*$/,
            message: "Name should not contain more than 3 words and cannot contain special characters or digits.",
        }

    }
}

export const getPasswordRules = (isRequired: boolean) => {

    return {
        ...(isRequired && {
            required: {
                value: true,
                message: "Please enter a password."
            }
        }),
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters long"
        },
        maxLength: {
            value: 20,
            message: "Password cannot be more than 20 characters long"
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            message: "Please enter a strong password containing a mixture of letters, symbols and numbers",
        }
    }
}

export const getConfirmPasswordRules = (isRequired: boolean, watch: WatchInternal<FieldValues>) => {

    return {
        ...(isRequired && {
            required: {
                value: true,
                message: "Please enter the password to confirm."
            }
        }),
        validate: (value: string) => value === watch('password') || "Confirm password and password didn't match."
    }
}

export const getEmailOrMobileRules = (isRequired: boolean) => {
    return {
        ...(isRequired && {
            required: {
                value: true,
                message: "Please enter your email address or mobile number to proceed."
            }
        }),
        pattern: {
            value: /^(?:\d{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            message: "Invalid email or mobile number."
        }
    }
}

export const getOTPNumberRules = (isRequired: boolean) => {
    return {
        ...(isRequired && {
            required: {
                value: true,
                message: "Please enter your verification code"
            }
        }),
        pattern: {
            value: /^\d{6}$/,
            message: "Please enter the 6 digit verification code.",
        }
    }
}
