import React, { Component } from 'react';
import {IoIosGrid, IoMdPin} from 'react-icons/io';
import styles from '../../../../../assets/css/RealEstate/Sale/Land/LandDetails/LandDetails.css';

class LandDetails extends Component {
    state = {
        landAdsDetails: this.props.landDetails
    }


    render(){
        return(
            <div className={styles.landDetails_container}>
                <div className={styles.card_details_container}>
                    <div className={styles.main_header}>
                        <span>Real Estate</span>
                    </div>
                    <div className={styles.loc_and_perch_container}>
                        <div className={styles.perch_container}>
                            <IoIosGrid size="1.5em" color="green"/>
                            <span className={styles.perch_no}>{`${this.state.landAdsDetails.areaOfLand} perches available`}</span>
                        </div>
                        <div className={styles.location_container}>
                            <IoMdPin size="1.5em" color="red"/>
                            <span className={styles.location}>{`${this.state.landAdsDetails.location}`}</span>
                        </div>
                    </div>
                    <div className={styles.perch_price_container}>
                        <span className={styles.price}>{`Rs.${this.state.landAdsDetails.price}`}</span>
                        <span className={styles.perch_annotaion}>per perch</span>
                    </div>
                    <div className={styles.button_container}>
                        <button className={styles.contact_advertiser_button}>Contact Advertiser</button>
                    </div>
                </div>

                <div className={styles.more_details_container}>
                    <div className={styles.fact_and_features_container}>
                        <span>Facts and features</span>
                    </div>
                    <div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Property type</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>{this.state.landAdsDetails.landType}</span>
                        </div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Area of land (perch)</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>{this.state.landAdsDetails.areaOfLand}</span>
                        </div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Availability</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>Available</span>
                        </div>
            
                    </div>
                    <div className={styles.fact_and_features_container}>
                        <span>Property details</span>
                    </div>
                    <div>
                        <p className={styles.property_details}>
                            {this.state.landAdsDetails.propertyDetails}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandDetails;