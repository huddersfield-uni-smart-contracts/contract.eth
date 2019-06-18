import store from "../containers/App/store";
import { setProfileInfo } from "../redux/actions/profile";
import Cache from "../services/cache";
import ErrorManagerSingleton from "./Error/ErrorManager";
import APISingleton from "./API";

const defaultState = {
    address : '0x',
    name : 'none'
}

class Account{    
    constructor(params){
        this.params = {...defaultState, ...params}
        this.logged = false;
        this.editing = false;
    }

    getAccount = () => {
        if(!this.getType()){return false;}
        let params = Cache.getFromCache(this.getType());
        if(params){ this.params = params; this.logged = true; }
        return true;
    } 

    startAccount = async () => {
        try{
            this.checkErrors('Login', this.params);
            Cache.setToCache(this.getType() ,this.params);
            return await this.update();
        }catch(err){
            console.log(err);
            // TODO : Message Notification
        }    
    }

    getMe = () => {
        return this.params;
    }

    login = async ({name, address}) => {
        try{
            this.params = { ...this.params, name, address };
            this.logged = true;
            // Add to API
            APISingleton.addToAllByType(this.params, this.getType());
            await this.startAccount();
        }catch(err){
            console.log(err);
            // TODO : Message Notification
        }    
    }

    getAddress = () => this.params.address;
    
    getName = () => this.params.name;
    
    isLogged = () => this.logged;

    update = async () => {
        /* if(this.logged){
            this.contracts = await this.getContracts();
        } */
        /* Add Everything to the Redux State */  
        return await store.dispatch(setProfileInfo(this));
    }

    isSet = () => {
        return (Object.keys(this.params).length > 0) ? true : false;
    }

    setProfileData = (data) => {
        this.User = data;
    }

    getUsername = () => {
        return this.params.name;
    }

    getImage = () => {
        return this.params.image;
    }

    getType = () => {
        if(this.params)
            return new String(this.params.type).toLowerCase();
        else
            return null;
    }

    setTimer = () => {
        clearTimeout(this.timer);
        this.timer = setInterval(
            () => {
            this.getData();
        }, 2000);
    }

    checkErrors = (type, object) => {
        ErrorManagerSingleton.checkErrors(type, object)
    }

    getContracts = () => {
        return APISingleton.getContractsByAddress(this.params.address);
    }

    getTotalAmountFromContracts = () => {
        let contracts = APISingleton.getContractsByAddress(this.params.address);
        return contracts.reduce( (acc, item) => {
            return parseInt(acc)+parseInt(item.payment_amount);
        }, 0)
    }

    getEditableContract = () => {
        return this.editableContract;
    }

    setEditingContract = (contract) => {
        this.editableContract = contract;
        this.editing = true;
    }

    isEditing = () => {
        return this.editing;
    }

    editContract = async (contract) => {
        await APISingleton.editContractByAddress(contract, contract['company'].address);
        await APISingleton.editContractByAddress(contract, contract['client'].address);
        await APISingleton.editContractByAddress(contract, contract['validator'].address);
        await APISingleton.editContractbyAll(contract);
        await this.update();
        this.editing = false;
    }

    saveContract = async (contract) => {
        await APISingleton.addContractByAddress(contract, contract['company'].address);
        await APISingleton.addContractByAddress(contract, contract['client'].address);
        await APISingleton.addContractByAddress(contract, contract['validator'].address);
        await APISingleton.addContractoToAll(contract);
        await this.update();
        return true;
    }

    logout = async () => {
        Cache.setToCache(this.getType(), null);
        this.logged = false;
        return await this.update();
    }

}

export default Account;