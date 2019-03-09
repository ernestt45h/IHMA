
export default storage => (store => {
    store.subscribe((mutation, state)=>{
        if(mutation.type != 'route/ROUTE_CHANGED')
            storage.set(mutation.type, mutation.payload)
    })
})