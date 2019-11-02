import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import styles from '../SignupModal/AuthModal.css';
import formStyles from '../SignupModal/Auth.css';


class LoginModal extends Component {
    state = {
        email: null,
        password: null,
        isVerified: true,
        isPasswordInCorrect: false,
        isEmailExits: false
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(res => {
            if (res.status === 422) {
                throw new Error('Validation failed');
            }

            if (res.status === 401) {
                this.setState({ isPasswordInCorrect: true});
            } else {
                this.setState({ isPasswordInCorrect: false });
            }

            if (res.status === 402) {
                this.setState({ isEmailExits: true });
            } else {
                this.setState({ isEmailExits: false });
            }
            return res.json();
            })
            .then(resData => {
                if(resData.message === 'User is not verified' ) {
                    return this.setState({ isVerified: false });
                }

                localStorage.setItem('token', resData.token);
                localStorage.setItem('RDACTD', resData.userId);
                localStorage.setItem('RDACTP', resData.accountType);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString());

                if(resData.accountType === "2485693124578965412478933254895464123648") {
                    this.props.history.push("/admin");
                } else if (resData.accountType === "284695743215") {
                    this.props.history.push("/dashboard");
                } else {
                    this.props.history.push("/");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let renderedComponent = null;
        if(this.state.isVerified) {
            renderedComponent = (
                <div className={styles.modal}>
                    <div className={styles.modal_container}>
                        <form className={formStyles.form_container} onSubmit={this.handleSubmit}>
                            <h3>Login</h3>

                                {this.state.isEmailExits && <span className={formStyles.form_errors}>A user with this email could not be found.</span>}

                                <input
                                    className={formStyles.form_input}
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    required={true}
                                    onChange={this.handleOnChange}
                                />

                                {this.state.isPasswordInCorrect && <span className={formStyles.form_errors}>Password is incorrect</span>}

                                <input
                                    className={formStyles.form_input}
                                    type="password"
                                    name="password"
                                    placeholder="Your password"
                                    required={true}
                                    onChange={this.handleOnChange}
                                />

                                <button 
                                    className={formStyles.form_button}
                                >
                                Login
                                </button>
                                <br/><br/>

                                <div className={formStyles.reset_password_link}>
                                    <a href="/">Don't remember password</a>
                                </div>
                            
                        </form>
                    <button 
                        className={styles.modal_closeButton}
                        onClick={this.props.closeModal}
                    >
                    <IoIosCloseCircleOutline size="2em" color="black"/>
                    </button>
                    </div>
                </div>
            );
        } else {
            renderedComponent = (
                <div className={styles.modal}>
                    <div className={styles.modal_container}>
                        <h2>Please verify your account</h2>
                    <button 
                        className={styles.modal_closeButton}
                        onClick={this.props.closeModal}
                    >
                    <IoIosCloseCircleOutline size="2em" color="black"/>
                    </button>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {renderedComponent}
            </div>
        );
    }
}

export default LoginModal;