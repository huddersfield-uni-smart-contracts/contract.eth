import Cache from "../services/cache";
import _  from 'lodash';

class API{
    constructor() {        
    }

    /* TYPES OF USERS */

    getAllByType = (type) => {
        let array =  Cache.getFromCache(`${new String(type).toLowerCase()}/all`);
        if(!array){return []};
        return array;
    }

    addToAllByType = (object, type) => {
        var array = this.getAllByType(type);
        if(!_.isArray(array)){array = []}
        array.push(object);
        Cache.setToCache(`${type}/all`, array);
        return array;
    }

    /* CONTRACT */

    getAllContracts = () => {
        let array =  Cache.getFromCache(`all/contracts`);
        if(!array){return []};
        return array;
    }

    getContractsByAddress = (address) => {
        let array =  Cache.getFromCache(`${new String(address).toLowerCase()}/contracts`);
        if(!array){return []};
        return array;
    }

    getContractByContractAddress = (contract_address) => {
        let array = this.getAllContracts();
        for (var i=0; i < array.length; i++) {
            if (array[i].contract_address == contract_address) {
                return array[i];
            }
        }
        return null; 
    }
    
    addContractByAddress = async (contract, address) => {
        // Add to Type Contract
        console.log(address);
        var array = this.getContractsByAddress(address);
        if(!array){array = []}
        console.log(array)
        array.push(contract);
        console.log(array);
        await Cache.setToCache(`${new String(address).toLowerCase()}/contracts`, array);
    }

    addContractoToAll = async (contract) => {
        // Add to All Contracts
        var all_array = this.getAllContracts();
        if(!all_array){all_array = []}
        all_array.push(contract);
        await Cache.setToCache(`all/contracts`, all_array);
    }

    editContractByAddress = async (contract, savableAddress) => {
        // Add to Type Contract
        var array = this.getContractsByAddress(savableAddress);
        if(!array){array = []}
        for (var i=0; i < array.length; i++) {
            if (array[i].contract_address == contract.contract_address) {
                array[i] = contract;
            }
        }
        console.log(array, contract)
        await Cache.setToCache(`${new String(savableAddress).toLowerCase()}/contracts`, array);
    }

    editContractbyAll = async (contract) => {
        // Add to Type Contract
        var array = this.getAllContracts();
        if(!array){array = []}
        for (var i=0; i < array.length; i++) {
            if (array[i].contract_address == contract.contract_address) {
                array[i] = contract;
            }
        }
        await Cache.setToCache(`all/contracts`, array);
    }

    
}

let APISingleton = new API();

export default APISingleton;