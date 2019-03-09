import App from '../../main'


export default storage => ({
    namespaced: true,
    state:{
        credentials: storage.get('user/setCredentials') || {},
        details: storage.get('user/setDetails') || {}
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
        },
        getAgeTimestamp(state){
            return state.details.age ? state.details.age.seconds : ''
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
                App.$router.push({name: 'Dashboard'})
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
                console.log(_);
                App.$Message.error({
                    content: 'Failed to sign out user',
                    duration: 0,
                    closable: true,
                })
            })
        },

        async fetchDetails({commit, getters}){
            let token = getters.getUID
            console.log(token);
            
            return App.$db.collection('user').doc(token)
            .get().then((snapshot)=>{
                let details = snapshot.data()
                console.log('fetched user details', details)
                if(!details) return
                else {
                    commit('setDetails', details)
                    return details
                } 
            })
        },

        async updateDetails({commit, getters}, payload){
            await App.$db.collection('user').doc(getters.getUID)
            .set(payload).then(_=>{
                commit('setDetails', payload)
            }).catch(err=>{throw err})
        }
    }
})