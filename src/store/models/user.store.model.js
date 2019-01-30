import App from '../../main'

function Storage(key){
    return JSON.parse(localStorage.getItem('ocp/'+key))
}

export default {
    namespaced: true,
    state:{
        credentials: Storage('user/credentials') || {},
        details: Storage('user/details') || {}
    },

    getters:{
        getName(state){
            return state.name
        },

        isAuth(state){
            return state.credentials.uid ? true : false
        },

        getUID(state){
            return state.credentials.uid
        },

        getDetails(state){
            return state.details
        }
    },

    mutations:{
        setCredentials(state, payload){
            state.credentials = payload
        },
        setDetails(state, payload){
            state.details = payload
        }
    },

    actions:{
        async login({commit}, user){
            await App.$auth.signInWithEmailAndPassword(user.email, user.password)
            .then(cred=>{
                commit('setCredentials', cred.user)
                App.$router.push({name: 'App'})
            })
            .catch(error=>{
                App.$Message.warning({
                    closable: true,
                    content: error.message,
                    duration: 5
                })
            })
        },

        async logout({commit}){
            await App.$auth.signOut()
            .then(_=>{
                commit('setCredentials', {})
                commit('setDetails', {})
                App.$router.push({name: 'Login'})
            })
            .catch(_=>{
                App.$Message.error({
                    content: 'Failed to sign out user',
                    duration: 0,
                    closable: true,
                })
            })
        },

        async fetchDetails({commit, getters}){
            await App.$db.collection('user').doc(getters.getUID)
            .onSnapshot((snapshot)=>{
                let details = snapshot.data()
                console.log('fetched user details', details)
                if(!details) return
                else {
                    commit('user/setDetails', )
                    return details
                } 
            })
        }
    }
}