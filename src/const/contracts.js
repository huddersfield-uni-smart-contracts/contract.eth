const contracts = {
    '1' : {
        id : 1,
        name : 'Energy SLA',
        validator  : 'EDP',
        client : 'ERd LDA',
        amount : 3452.50,
        paid   : 420,
        state : 'Finalized'
    },
    '2' : {
        id : 2,
        name : 'James Transfer',
        validator  : 'Football Club ',
        client : 'Benfica',
        amount : 120,
        paid   : 40,
        state : 'Waiting Validation'
    }
}


function getContracts(){
    return contracts
}


export {
    getContracts
}