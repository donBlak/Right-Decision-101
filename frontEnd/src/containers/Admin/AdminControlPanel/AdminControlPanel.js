import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ControlPanelSideNav from '../ControlPanelSideNav/ControlPanelSideNav';
import ShareControlCardContainer from '../AdminStocks/ShareControlCardContainer/ShareControlCardContainer';
import AdvertiserDetailsContainer from '../AdminRealEstate/AdvertiserDetailsContainer/AdvertiserDetailsContainer';


class AdminControlPanel extends Component {
    render() {
        
        return (
            <div>
                <Route path={`${this.props.match.path}`} component={ControlPanelSideNav}/>
                <Route path={`${this.props.match.path}/stock-control`} component={ShareControlCardContainer}/>
                <Route path={`${this.props.match.path}/realEsate-control`} component={AdvertiserDetailsContainer}/>
                
            </div>
        );
    }
}

export default AdminControlPanel;