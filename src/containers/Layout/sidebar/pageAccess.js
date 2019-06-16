const pageAccess = {
    'client' : {
        contracts : true,
        createContract : false,
        editContract : false,
        home : true
    },
    'company' : {
        contracts : true,
        createContract : true,
        editContract : false,
        home : true


    },
    'validator' : {
        contracts : true,
        createContract : false,
        editContract : true,
        home : true

    },
}

export default pageAccess;