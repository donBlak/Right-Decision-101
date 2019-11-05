import React, { Component } from 'react';
import { IoMdArrowDropright, IoMdArrowDropleft} from 'react-icons/io';
import styles from '../../../../assets/css/Admin/ControlPanelSideNav/ControlPanelSideNav.css';

class AdsSideNav extends Component {
    state = {
        isOpenMyAds: false,
        isOpenPublish: false,
        isOpenNotification: false,
        isOpenProfile: false,
        isOpenMessages: false
    }


    handleOpenMyAds = () => {
        this.setState({ 
            isOpenMyAds: !this.state.isOpenMyAds,
            isOpenNotification: false,
            isOpenProfile: false,
            isOpenMessages: false,
            isOpenPublish: false
        });
    }

    handleOpenPublish = () => {
        this.setState({ 
            isOpenPublish: !this.state.isOpenPublish,
            isOpenMyAds: false,
            isOpenNotification: false,
            isOpenProfile: false,
            isOpenMessages: false
            
        });
    }

    handleOpenNotification = () => {
        this.setState({ 
            isOpenNotification: !this.state.isOpenNotification,
            isOpenMyAds: false,
            isOpenPublish: false,
            isOpenProfile: false,
            isOpenMessages: false
        });
    }

    handleOpenProfile = () => {
        this.setState({ 
            isOpenProfile: !this.state.isOpenProfile,
            isOpenMyAds: false,
            isOpenPublish: false,
            isOpenNotification: false,
            isOpenMessages: false
        });
    }

    handleOpenMessages = () => {
        this.setState({ 
            isOpenMessages: !this.state.isOpenMessages,
            isOpenMyAds: false,
            isOpenPublish: false,
            isOpenNotification: false,
            isOpenProfile: false
        });
    }

    handleOpenAddNewShareModal = () =>{
        this.setState({
            isOpenAddNewShareModal: true,
            isOpenMyAds: false,
        });
    }

    handleCloseAddNewShareModal = () => {
        this.setState({isOpenAddNewShareModal: false});
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleCloseAllDropUp = (e) => {
      
            this.setState({
                isOpenMyAds: false,
                isOpenPublish: false,
                isOpenNotification: false,
                isOpenProfile: false,
                isOpenMessages: false,
            });
            this.props.handleNav(e);
        
    }

    handleCloseAll = () => {
      
        this.setState({
            isOpenMyAds: false,
            isOpenPublish: false,
            isOpenNotification: false,
            isOpenProfile: false,
            isOpenMessages: false,
        });
    
}

    handleClick = (e) => {  
        if(this.node.contains(e.target)) {
            return;
        }
        this.handleCloseAll();
    }

     render() {
        return (
            <div className={styles.sideNav_container} ref={node => this.node = node}>
                <div className={styles.button_container}>
                    <button 
                        className={styles.sideNav_button}
                        onClick={this.handleOpenMyAds}
                    >
                    <span>My Ads</span>
                    <div>{this.state.isOpenMyAds ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenMyAds ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button 
                            className={styles.dropSide_button}
                            id= ""
                            onClick={e => this.handleCloseAllDropUp(e)}
                        >
                        All Ads
                        </button>
                        <button 
                            className={styles.dropSide_button}
                            id="/home-ads"
                            onClick={e => this.handleCloseAllDropUp(e)}
                        >
                        Home Ads
                        </button>
                        <button 
                            className={styles.dropSide_button}
                            id="/land-ads"
                            onClick={e => this.handleCloseAllDropUp(e)}
                        >
                        Land Ads
                        </button>
                    </div>
                </div>


                <div className={styles.button_container}>
                    <button 
                        className={styles.sideNav_button}
                        onClick={this.handleOpenPublish}
                    >
                    <span>Publish</span>
                    <div>{this.state.isOpenPublish ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenPublish ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button 
                            className={styles.dropSide_button}
                            id="/publish"
                            onClick={e => this.handleCloseAllDropUp(e)}
                        >
                        Home Ads
                        </button>
                        <button 
                            className={styles.dropSide_button}
                            id="/publish"
                            onClick={e => this.handleCloseAllDropUp(e)}
                        >
                        Land Ads
                        </button>
                    </div>
                </div>

                <div className={styles.button_container}>
                    <button 
                        className={styles.sideNav_button}
                        onClick={this.handleOpenNotification}
                    >
                    <span>Notification </span>
                    <div>{this.state.isOpenNotification ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenNotification ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button className={styles.dropSide_button}>New</button>
                        <button className={styles.dropSide_button}>Old</button>
                    </div>
                </div>

                <div className={styles.button_container}>
                    <button 
                        className={styles.sideNav_button}
                        onClick={this.handleOpenProfile}
                    >
                    <span>Profile</span>
                    <div>{this.state.isOpenProfile ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenProfile ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button className={styles.dropSide_button}>Users</button>
                        <button className={styles.dropSide_button}>Block Users</button>
                        <button className={styles.dropSide_button}>Remover Users</button>
                    </div>
                </div>

                <div className={styles.button_container}>
                    <button 
                        className={styles.sideNav_button}
                        onClick={this.handleOpenMessages}
                    >
                    <span>Messages</span>
                    <div>{this.state.isOpenMessages ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenMessages ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button className={styles.dropSide_button}>New Messages</button>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default AdsSideNav;