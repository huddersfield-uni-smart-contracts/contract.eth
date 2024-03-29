import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';
import { config as i18nextConfig } from '../../translations';
import Web3 from 'web3';
import { ModalLogin, ModalMessage } from '../Modal';

i18next.init(i18nextConfig);

class App extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			loaded: false,
		};
    }

	asyncCalls = async () => {
		this.enterWebsite();

	}

	enterWebsite = () => {
		 window.addEventListener('load', () => {
			this.setState({ loading: false });
			setTimeout(() => this.setState({ loaded: true }), 500);
		}); 
	}

	componentDidMount() {
        this.asyncCalls();
        this.startWallet();
    }
    
    startWallet = async () => {
        // Modern dapp browsers...
        if (window.ethereum) {

            global.web3 = new Web3(window.ethereum);
            
            try {
                //await ethereum.enable();

                //var myContract = new web3.eth.Contract(abi,contractAddress);
                /* myContract.methods.RegisterInstructor('11','Ali')
                .send(option,function(error,result){
                    if (! error)
                        console.log(result);
                    else
                        console.log(error);
                }); */
            } catch (error) {
                global.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            global.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
             // Acccounts always exposed
        }
        // Non-dapp browsers...
        else {
            global.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }        

    }
    

	render() {
		return (
			<Provider store={store}>
                <BrowserRouter basename="/">
                    <I18nextProvider i18n={i18next}>
                    <ScrollToTop>
                    <div>
                        <Router />
                        <ModalMessage/>
                        <ModalLogin/>
                    </div>
                    </ScrollToTop>
                    </I18nextProvider>
                </BrowserRouter>
			</Provider>
		);
		}
}

export default hot(module)(App);
