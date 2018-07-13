const user = require('../database/User')
const userDetails = require('../config/db').user_info
const jwt = require('jsonwebtoken')
const secret = require('../config/secrets')

const Permission = require('./Permission.model')


class User {
    /**
     * 
     * @param id {'User_ID'}
     */
    async get_by_id(id){
        return user.findById(id, userDetails).then(doc=>{
            if(doc){
                return doc
            }else return {error: 'invalid token recived'}
        }).catch(error=>{
            return {error: 'error getting user'}
        })
    }

    /**
     * Checks the validity of a user
     * @param  type {type: 'username' | 'email' }
     * @param value
     */
    async is_user(type  = 'username', value){
        switch(type){
            case 'username': 
                return user.findOne({username: value}).then( doc=>{
                        
                        if(doc) return {isUser: true}
                        else return {isUser: false}
                }).catch(error => { error: 'error checking for user'})
                break
            case 'email':
                return user.findOne({email: value}).then( doc=>{
                    if(doc) return {isUser: true}
                    else return {isUser: false}
                    i 
                }).catch(error => { error: 'error checking for user'})

        }
    }

    /**
     * 
     * @param {{username: string, email: string, password: string}} body 
     */
    async create_user(body){
        var new_user = user(body)
        return new_user.save().then(doc=>{
            return {msg:'User signed up successfullly'}      
        }).catch(error=>{
            console.log(error)
            if(!(body.username && body.email && body.password)) return {error: 'Please provide the username, email and password field'}
            else return this.is_user('username', body.username)
            .then(doc=>{
                if(doc.isUser == true) return {error: 'username already exsists'}
                else return this.is_user('email', body.email)
                    .then(doc=>{
                        if(doc.isUser == true) return {error: 'email already exsists'}
                        else return {error: 'Error signing you up, please try again'}
                })
            })
        })
    
    }
    

    /**
     * 
     * @param {string} username 
     * @param {string} password
     * @param {CLIENT_REQUST} request
     */
    async login_user(username, password, ip){
        return user.findOne({username: username})

            //doc is the fetched user document
            .then(doc=>{
                if(doc){
                    if(doc.status === "inactive")
                    return {error: 'Please verify account through email'}
                    else{
                        if(doc.password === password){

                            //Note: there will be a check on user's ip when making a request
                            let perm = new Permission()
                            return perm.get_default_perms(doc.role).then((perms)=>{
                                let jwt = this.generate_token(doc, ip)
                                return jwt.then(token=>{
                                    doc.permissions = perm.concat_perms(doc.permissions, perms)
                                    return {
                                    username: doc.username,
                                    email: doc.email,
                                    name: doc.name,
                                    bio: doc.bio,
                                    image: doc.image,
                                    permissions: doc.permissions,
                                    token: token
                                    }
                                }).catch(err=>{
                                    return {
                                        error: 'failed in generating token @ user.model:login()->generate_token',
                                        code: err
                                        }
                                        console.log(err)
                                })
                            }).catch((err)=>{
                                return {
                                    error: 'failed in fetching permissions',
                                    code: err
                                }
                            })


                            
                        }else{
                            return {error: 'wrong password'}
                        }
                    }
                }else{
                    return {error: 'wrong username or password'}
                }
            })
            .catch(err=>console.log(err))
    }

    async update_user(id, body){
        return user.updateOne(body).then(doc=>{
            return {message: 'User successfully updated'}
        })
    }

    async generate_token(user_info, user_ip){
        const jwt = require('jsonwebtoken')
        const secret = require('../config/secrets')
        return jwt.sign({
            _id: user_info._id,
            role: user_info.role,
            client: user_ip,
            permissions: user_info.permissions
        },secret.jwt)
    }
}

module.exports = User