import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import _ from 'lodash';
import { faFileContract, faFileInvoice, faFileExport, faHome } from '@fortawesome/free-solid-svg-icons'
import pageAccess from './pageAccess';


class SidebarContent extends Component {
    static propTypes = {
        changeToDark: PropTypes.func.isRequired,
        changeToLight: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props)
        this.state = {
            contracts : true,
            createContract : true,
            editContract : true,
            home : true
        }
    }

    hideSidebar = () => {
        this.props.onClick();
    };

    componentWillReceiveProps(props){
        this.getData(props)
    }

    getData = (props) => {
        let type = props.profile.getType();
        let newState = { ...pageAccess[type] };
        this.setState({...this.state, ...newState})
    }

    render() {
        let type = new String(this.props.profile.getType()).toLowerCase();

        return (
            <div className="sidebar__content">
                <ul className="sidebar__block">
                    <SidebarLink disabled={!this.state.home} title="Home Page" icon={faHome} route={`/${type}`} onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.createContract} title="Create Contract" icon={faFileInvoice} route={`/${type}/createContract`} onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.editContract} title="Contracts" icon={faFileExport} route={`/${type}/editContract`} onClick={this.hideSidebar} />
                    <SidebarLink disabled={!this.state.contracts} title="Contracts" icon={faFileContract} route={`/${type}/contracts`} onClick={this.hideSidebar} />
                </ul>        
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default compose(
    connect(mapStateToProps)
)(SidebarContent);