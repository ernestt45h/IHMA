const perms = require('../database/Permission')

class Permission{
    /**
     * Gets user permissions and default features
     * @param {string} role:
     */
    async get_default_perms(role){
        return perms.where({role: role})
                    .where({is_default: true})
                    .exec()
                    .then((doc)=>{
                        if(doc)
                            return this.filter_multi(doc)
                        else return
                    }).catch(err=>{
                        return {
                            error: 'failed to fetch default permissions',
                            code: err
                        }
                    })
    }

    /**
     * Takes an array of permissions and uses filter_single to filter 
     * through the array
     * @param {[Object]} perms 
     */
    filter_multi(perms){
        if(perms){
            let newPerms = []
            for(let perm of perms){
                newPerms.push(this.filter_single(perm))
            }
            return newPerms
        }else return
    }

    /**
     * Used to filter the single objects permission
     * @param {Object} perm 
     */
    filter_single(perm){
        return {
            actions: perm.actions,
            name: perm.name,
            fa_icon: perm.fa_icon,
            sub_name: perm.sub_name,
            access_point: perm.access_point,
            target: perm.target
        }
    }

    /**
     * used to combine two permission arrays together
     * 
     * @param {[Permission]} user_perms 
     * @param {[Permission]} perms 
     */
    concat_perms(user_perms, perms){
        if(!user_perms) user_perms = []
        if(perms){
            for(let perm of perms){
                user_perms.push(perm)        
            }
        }
        return user_perms
    }
}

module.exports = Permission