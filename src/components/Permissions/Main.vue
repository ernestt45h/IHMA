<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'Permissions',
    created(){
        let user = this.$store.getters.user
        console.log(user)

        if(user.role != 'developer'){
            this.$router.push('/')
        }
    }

}
</script>
