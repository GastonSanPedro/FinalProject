export function validateErrors(input, users){
    let errors = {}

    if(!input.firsName){
        errors.firstName = 'First name required'
    }else if ( !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.firstName)) {
    errors.firstName = 'The name can only contain letters and spaces';
    }
    if(!input.lastName){
        errors.lastName = 'Please enter your last name'
    }else if ( !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.lastName)) {
        errors.firstName = 'The last name can only contain letters and spaces';
        }
}