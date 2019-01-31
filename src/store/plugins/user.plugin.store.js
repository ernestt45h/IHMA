function Storage(key, value){
    localStorage.setItem('ocp/'+key, JSON.stringify(value))
}

export default store => {
    store.subscribe((mutation, state)=>{
        switch (mutation.type){
            // ? Set User credentials
            case 'user/setCredentials': 
                Storage('user/credentials', mutation.payload || {})
                break
            

            // ? Set User Details
            case 'user/setDetails': 
                Storage('user/details', mutation.payload || {})
                break
        
        }
    })
}