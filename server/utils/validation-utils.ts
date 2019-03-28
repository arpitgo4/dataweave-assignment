import { CustomError } from "Interfaces";


export const validateMobileNumber = (contact_number: string): Promise<any | CustomError> => {
    return new Promise((resolve, reject) => {
        const regex = /^[1-9]{1}[0-9]{9}$/;

        return regex.test(contact_number) ? 
                resolve() : reject({
                    message: `invalid mobile number!`
                });
    });
};