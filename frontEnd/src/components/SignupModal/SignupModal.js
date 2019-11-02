import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import styles from './AuthModal.css';
import formStyles from './Auth.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class SignupModal extends Component {
    state = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmedPassword: null,
        formErrors: {
            firstName:"",
            lastName:"",
            email:"",
            password:""
        },
        isFormErrors: false,
        isPasswordsMacthed: true,
        isEmailExits: false,
        isVerified: true
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

        const { name, value } = event.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                if (value.length < 3 ) {
                    formErrors.firstName = "minimum 3 characaters required";
                } else {
                    formErrors.firstName = "";
                    this.setState({ isFormErrors: false });
                }
                break;
            case "lastName":
                if (value.length < 3 ) {
                    formErrors.lastName = "minimum 3 characaters required";
                } else {
                    formErrors.lastName = "";
                    this.setState({ isFormErrors: false });
                }
                break;
            case "email":
                if (!emailRegex.test(value)) {
                    formErrors.email = "Invalid email";
                } else {
                    formErrors.email = "";
                    this.setState({ isFormErrors: false });
                }
                break;
            case "password":
                if (value.length < 6) {
                    formErrors.password = "minimum 6 characaters required";
                } else {
                    formErrors.password = "";
                    this.setState({ isFormErrors: false });
                }
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let {password, confirmedPassword, firstName, lastName, email} = this.state;
        let formErrors = { ...this.state.formErrors };
        
        if((formErrors.firstName !== "") || (formErrors.lastName !== "") || (formErrors.email !== "") || (formErrors.password !== "")) {
            this.setState({ isFormErrors: true });
        } else {
            this.setState({ isFormErrors: false });

            if(password !== confirmedPassword) {
                return this.setState({ isPasswordsMacthed: false });
            } else {
                this.setState({ isPasswordsMacthed: true });
            }

            fetch('http://localhost:5000/sign-up', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
                })
            })
                .then(res => {
                if (res.status === 422) {
                    this.setState({ isEmailExits: true });
                    throw new Error(
                    "Validation failed. Make sure the email address isn't used yet!"
                    );
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                    throw new Error('Creating a user failed!');
                }
                return res.json();
                })
                .then(resData => {
                console.log(resData);
                this.setState({ isVerified: false });
                this.props.history.push('/');
                })
                .catch(err => {
                console.log(err);
                });
        }

    }

    render() {
        let formErrors = { ...this.state.formErrors };
        let { isFormErrors, isPasswordsMacthed, isEmailExits } = this.state;
        return (
            <div>
                <div className={styles.modal}>
                    <div className={styles.modal_container}>
                        <form className={formStyles.form_container} onSubmit={this.handleSubmit}>
                            <h3>Signup</h3>

                            {isFormErrors && formErrors.firstName.length > 0 ? (
                                <span className={formStyles.form_errors}>{formErrors.firstName}</span>)
                                : ""
                            }
                            {isFormErrors && formErrors.lastName.length > 0 ? (
                                <span className={formStyles.form_errors}>{formErrors.lastName}</span>)
                                : ""
                            }
                            <div className={formStyles.input_name_container}>
        
                                <input
                                    className={isFormErrors && formErrors.firstName.length > 0 ? formStyles.form_input_name_error : formStyles.form_input_name }
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    required={true}
                                    onChange={this.handleOnChange}
                                />
                               
                                <input
                                    className={isFormErrors && formErrors.lastName.length > 0 ? formStyles.form_input_name_error : formStyles.form_input_name }
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    required={true}
                                    onChange={this.handleOnChange}
                                />
                                

                            </div>
                            
                                {isFormErrors && formErrors.email.length > 0 ? (
                                    <span className={formStyles.form_errors}>{formErrors.email}</span>)
                                    : ""
                                }

                                { isEmailExits && <span className={formStyles.form_errors}>Email is already used!.</span>}

                                <input
                                className={isFormErrors && formErrors.email.length > 0 ? formStyles.form_input_error :formStyles.form_input}
                                    type="text"
                                    name="email"
                                    placeholder="Your email"
                                    required={true}
                                    onChange={this.handleOnChange}
                                />
                                
                                {isFormErrors && formErrors.password.length > 0 ? (
                                    <span className={formStyles.form_errors}>{formErrors.password}</span>)
                                    : ""
                                }

                                

                                <input
                                    className={isFormErrors && formErrors.password.length > 0 ? formStyles.form_input_error :formStyles.form_input}
                                    type="password"
                                    name="password"
                                    placeholder="Your password"
                                    required={true}
                                    onChange={this.handleOnChange}
                                />
                                
                                { !isPasswordsMacthed ? (
                                    <span className={formStyles.form_errors}>Passwords are not matched</span>)
                                    : ""
                                }

                                <input
                                    className={formStyles.form_input}
                                    type="password"
                                    name="confirmedPassword"
                                    placeholder="confirm password"
                                    required={true}
                                    onChange={this.handleOnChange}
                                />

                                <div className={formStyles.form_checkBox}>
                                    <input 
                                        type="checkbox" 
                                        name="checkbox" 
                                        required={true}
                                    />
                                    <label htmlFor="agree terms">Agree to 
                                        <a href="/">  terms & conditions</a>
                                    </label>
                                </div>

                                <button 
                                    className={formStyles.form_button}
                                    type="submit"
                                >
                                Submit
                                </button>
                            
                        </form>
                    <button 
                        className={styles.modal_closeButton}
                        onClick={this.props.closeModal}
                    >
                    <IoIosCloseCircleOutline size="2em" color="black"/>
                    </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupModal;