//To add up: user account edit functionality, user account delete

//Create Account
const firstName = document.getElementById('first_name');
const secondName = document.getElementById('second_name');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone_number');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm_password');
const createAccountBtn = document.getElementById('create_account');
const userConfirmationSection = document.getElementById('user_confirmation_section');
const userConfirmationParagraph = document.getElementById('user_confirmation_p');
const userConfirmationBtn = userConfirmationSection.querySelector('button');
const validations = document.querySelectorAll('.validation');
const formSection = document.getElementById('form_section');
const allInputs = formSection.querySelectorAll('input');

//Log In
const toLogInBtn = document.getElementById('to_log_in_btn');
const logInSection = document.getElementById('inputs_check');
const logInContinueBtn = logInSection.querySelector('button');
const phoneNumberCheck = logInSection.querySelector('#phone_number_check');
const passwordCheck = logInSection.querySelector('#password_check');
const checkValidationP = logInSection.querySelector('.validation');
const closeLogInSection = logInSection.querySelector('#close');

//After Log In
const visitPortifolioSection = document.getElementById('visit_portifolio');
const visitPortifolioSectionBack = visitPortifolioSection.querySelector('button');
const welcomingUser = visitPortifolioSection.querySelector('h1');

const someMainParents = [formSection,document.querySelector('header'),document.querySelector('aside')];

let inputError,currentSignedIn;
const users = [];

const makeValidationPNormal = (validateP) => {
    validateP.setAttribute('class','validation hidden');
    validateP.textContent = '';
    inputError = false;
}

const backToTheStartPage = () => {
    for (const elt of someMainParents) {
        elt.removeAttribute('class','none');
    }
    visitPortifolioSection.setAttribute('class','none');
} 

visitPortifolioSectionBack.addEventListener('click',backToTheStartPage);

const closeLogInSectionFunction = () => {
    if (inputError) {
        makeValidationPNormal(checkValidationP);
    }
    for (const elt of someMainParents) {
        elt.removeAttribute('class','blur');
    }
    logInSection.setAttribute('class','hidden');
}

const validateUserLogIn = (e) => {
    let validityBool = false;
    e.preventDefault();
    if (inputError) {
        makeValidationPNormal(checkValidationP);
    }
    if (phoneNumberCheck.value !== '' && passwordCheck.value !== '') {
        for (let i = 0; i < users.length; i++) {
            if (phoneNumberCheck.value === users[i].userPhoneNbr && passwordCheck.value === users[i].userPassword) {
                currentSignedIn = i;
                validityBool = true;
                for (const mains of someMainParents) {
                    mains.setAttribute('class','none');
                }
                visitPortifolioSection.removeAttribute('class','none');
                welcomingUser.textContent = `Welcome ${users[i].userFirstName} ${users[i].userSecondName}`;
                phoneNumberCheck.value = '';
                passwordCheck.value = '';
                logInSection.setAttribute('class','hidden');
                break;
            }
        }
        if (!validityBool) {
            inputError = true;
            checkValidationP.setAttribute('class','validation');
            checkValidationP.textContent = `Double check your inputs`;
        }
    }
    else {
        inputError = true;
        checkValidationP.setAttribute('class','validation');
        checkValidationP.textContent = `Please provide inputs in all blank fields`;
    }
}

closeLogInSection.addEventListener('click',closeLogInSectionFunction);
logInContinueBtn.addEventListener('click',validateUserLogIn);

const userLogIn = () => {
    if (users.length) {
        for (const elt of someMainParents) {
            elt.setAttribute('class','blur');
        }
        logInSection.removeAttribute('class','hidden');
    }
    else {
        alert(`Sorry there's no current user`);
    }
}

toLogInBtn.addEventListener('click',userLogIn);

const hide_confirmation_message = () => {
    for (const elt of someMainParents) {
        elt.removeAttribute('class','blur');
    }
    userConfirmationSection.setAttribute('class','hidden');
}

userConfirmationBtn.addEventListener('click',hide_confirmation_message);

const confirmation_message_function = (new_user_details) => {
    for (const elt of someMainParents) {
        elt.setAttribute('class','blur');
    }
    userConfirmationSection.removeAttribute('class','hidden');
    userConfirmationParagraph.innerText = new_user_details;
} 

const user_registered_in_system = (...userDetails) => {
    userDetails[5].preventDefault();
    allInputs.forEach(input => {
        input.value = '';
    })
    class a_user {
        constructor (userFirstName,userSecondName,userEmail,userPhoneNbr,userPassword) {
            this.userFirstName = userFirstName;
            this.userSecondName = userSecondName;
            this.userEmail = userEmail;
            this.userPhoneNbr = userPhoneNbr;
            this.userPassword = userPassword;
        }
        get new_user_details () {
            return `Name: ${this.userFirstName} ${this.userSecondName}\nEmail: ${this.userEmail}\nPhone Number: ${this.userPhoneNbr}\nPassword: ${this.userPassword}\nWelcome you have successfully signed up.`;
        }
    }
    const new_user = new a_user (userDetails[0],userDetails[1],userDetails[2],userDetails[3],userDetails[4]);
    users.push(new_user);
    confirmation_message_function(new_user.new_user_details);
}

//to validate user data 
const inputs_validation = (e) => {
    e.preventDefault();
    let validation,phone_number_char,validationPass;
    validationPass = true;

    //validating 1st name
    validation = (firstName.value)?.match(/[A-Z]/gi) ?? 'A';
    if (validation.length < 3) {
        firstName.nextElementSibling.setAttribute('class','validation');
        firstName.nextElementSibling.textContent = 'A name must include at least 3 characters!';
        inputError = true;
    }
    else {

        //validating 2nd name
        validation = (secondName.value)?.match(/[A-Z]/gi) ?? 'A';
        if (validation.length < 3) {
            secondName.nextElementSibling.setAttribute('class','validation');
            secondName.nextElementSibling.textContent = 'A name must include at least 3 characters!';
            inputError = true;
        }
        else {

            //validating the email
            validation = /^[0-9]*[a-z|A-Z]+[0-9]*@[a-z]+\.(com|fr)/g.test(email.value);
            if (!validation) {
                email.nextElementSibling.setAttribute('class','validation');
                email.nextElementSibling.textContent = 'Invalid email! Format:example@mail.com';
                inputError = true;
            }
            else {

                //validating the phone number
                phone_number_char = phoneNumber.value[0];
                if (phone_number_char === '+') {
                    validation = /(^\+[0-9]{12}$)/g.test(phoneNumber.value);
                }
                else {
                    validation = /(?=[0-9]{10})/g.test(phoneNumber.value);
                }
                if (!validation) {
                    phoneNumber.nextElementSibling.setAttribute('class','validation');
                    phoneNumber.nextElementSibling.textContent = 'Invalid phone number provided!';
                    inputError = true;
                }
                else {

                    //validating the password
                    validation = /\w{5,}/g.test(password.value);
                    if (!validation) {
                        password.nextElementSibling.setAttribute('class','validation');
                        password.nextElementSibling.textContent = 'Password must include at least 5 characters';
                        inputError = true;
                    }
                    else if (password.value !== confirmPassword.value) {
                        password.nextElementSibling.setAttribute('class','validation');
                        password.nextElementSibling.textContent = 'Password Mismatch!';
                        inputError = true;
                    }

                    else {
                        
                        //checking if any similar inputs is there
                        if (users.length !== 0) {
                            for (const elt of users) {
                                if(elt.userPhoneNbr === phoneNumber.value && elt.userPassword === password.value) {
                                    password.nextElementSibling.setAttribute('class','validation');
                                    password.nextElementSibling.innerText = `Can't set this weak password!\nAdd more numbers or special characters (!,@,#,&,*,$,%...)`;
                                    inputError = true;
                                    validationPass = false;
                                }
                            }
                        }
                        
                        //Passed all validations
                        if (validationPass) 
                        user_registered_in_system(firstName.value,secondName.value,email.value,phoneNumber.value,password.value,e);
                    }
                }
            }
        }
    }
}

//to collect user data
const inputs_collection = (e) => {
    e.preventDefault();
    let input_bool;
    input_bool = true;
    allInputs.forEach(input => {
        if (!input.value) {
            input_bool = false;
            input.nextElementSibling.setAttribute('class','validation');
            input.nextElementSibling.textContent = 'Fill the empty fields please';
            inputError = true;
        }
    })

    if (input_bool) {
        inputs_validation(e);
    }
}

const mouseDownOverFormSection = () => {
    if (inputError) {
        validations.forEach(validation => {
            makeValidationPNormal(validation);
        })
    }
 }

formSection.addEventListener('mousedown',mouseDownOverFormSection);
createAccountBtn.addEventListener('click',inputs_collection);
