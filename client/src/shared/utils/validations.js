export const ValidateEmail = RegExp(/^\S+@\S+\.\S+$/);

//Input validation
export const  ValidateInput = (name, value) => {

        let errors = {
            name: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            password2: ''
        };

        switch(name){
            case 'lastName':
                errors.name = value.length < 3
                    ? 'Last Name must be at least 3 characters!'
                    : '';
                    break; 
            case 'firstName':
                errors.name = value.length < 3
                    ? 'First Name must be at least 3 characters!'
                    : '';
                    break; 
            case 'name':
                errors.name = value.length < 3
                    ? 'Name must be at least 3 characters long!'
                    : '';
                    break; 
            case 'email':
                errors.email = ValidateEmail.test(value)
                    ? ''
                    : 'Email is not valid!';
                    break;   
            case 'password':
                errors.password = value.length < 6
                    ? 'Password must be at least 6 characters long!'
                    : '';   
                    break;    
            case 'password2':
                errors.password2 = value.length < 6
                    ? 'Password must be at least 6 characters long!'
                    : '';   
                    break;      
            default:
                throw new Error('Something went wrong!');
        };
        return errors
    };