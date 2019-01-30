<template>
    <Row id="layout" type="flex" justify="center" align="middle">
        <div>
            <div class="auth-logo-card">
                <img class="auth-logo" src="../../assets/logo.png"/>
            </div>
            <Col :xs="{span: 18, offset: 3}">
                <Row type="flex" justify="center">
                    <slot></slot>                
                </Row>
            </Col>
        </div>
    </Row>
</template>
<script>
export default {
    name: 'layout'
}
</script>

<style scoped>

    .auth-logo-card{
        text-align: center;
        margin-bottom: 10px;
    }

    .auth-logo{
        width: 130px;
        margin-left: 15px;
    }

    #layout{
        height: 100vh;
        background: url('../../assets/svg/bg.svg')
    }
</style>
