<template>
    <div>
        <Alert type="info" show-icon>
            Terms & Condition
            <template slot="desc">
                Please note, contents provided is solely for educational 
                purposes and is not a qualiﬁed medical opinion. This information should not be considered 
                advice or an opinion of a doctor or other health professional about your actual medical state, 
                and you should see a doctor for any symptoms you may have. If you are experiencing a health 
                emergency, you should call your local emergency number immediately to request emergency medical assistance.
            </template>
        </Alert>
        <navs/>
    </div>
</template>
<script>
import Navs from '../../../components/navigations/diagnosis'
export default {
    name: 'T&C',
    components:{Navs}
}
</script>
<style scoped>

    p{
        font-size: 1.3em;
    }

</style>