import React, { Component } from 'react';
import HomePageNavBar from '../../components/HomePageNavBar/HomePageNavBar';
import SignupModal from '../../components/SignupModal/SignupModal';
import LoginModal from '../../components/LoginModal/LoginModal';


class HomePage extends Component {
    state = {
        isOpenSignup: false,
        isOpenLogin: false
    }

    handleOpenSignupModal = () => {
        this.setState({ isOpenSignup: true });
    }

    handleOpenLoginModal = () => {
        this.setState({ isOpenLogin: true });
    }

    handleCloseSignupModal = () => {
        this.setState({ isOpenSignup: false });
    }

    handleCloseLoginModal = () => {
        this.setState({ isOpenLogin: false });
    }

    

    
    render() {
        return (
                <div>
                    <HomePageNavBar 
                        openSignup={this.handleOpenSignupModal}
                        openLogin={this.handleOpenLoginModal}
                    />
                    {this.state.isOpenLogin && <LoginModal history={this.props.history} closeModal={this.handleCloseLoginModal}/>}
                    {this.state.isOpenSignup && <SignupModal history={this.props.history} closeModal={this.handleCloseSignupModal}/>}

                </div>
        )
    }
}

export default HomePage;