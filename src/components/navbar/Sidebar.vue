<template>
<div v-if="isVissible" id="sidebar">
    <nav class="user-menu">
        <div class="pull-left" style="margin-top: 5px">
            <img src="../../assets/logo.png" height="45px"/>
            <span class="title">OneCare Plus</span>
        </div>
        <div class="pull-right">
            <a @click="show" :class="{active: isShowMenu}" class="main-menu-access btn">
                <Icon type="ios-more"/>
            </a>
        </div>
    </nav>
    <nav class="main-menu" :class="{expanded: showMenu}">
        <ul @click="showMenu = false; isShowMenu = false">
            <li>
                <router-link to="/">
                    <Icon type="md-house"></Icon>
                    <i class="fa fa-home nav_icon"></i>
                    <span class="nav-text text-capitalize">
					Home
					</span>
                </router-link>
            </li>
            <li v-for="link in navs" :key="link.id">
                <router-link :to="'/'+link.sub_name">
                    <i :class="link.fa_icon" class="nav_icon"></i>
                    <span class="nav-text text-capitalize">
					{{ link.sub_name || capitalize }}
					</span>
                </router-link>
            </li>
            <!--li class="has-subnav">
                <a href="javascript:;">
                    <i class="fa fa-cogs" aria-hidden="true"></i>
                    <span class="nav-text">
					UI Components
				</span>
                    <i class="icon-angle-right"></i><i class="icon-angle-down"></i>
                </a>
                <ul>
                    <li>
                        <a class="subnav-text" href="buttons.html">
                            Buttons
                        </a>
                    </li>
                    <li>
                        <a class="subnav-text" href="grids.html">
                            Grids
                        </a>
                    </li>
                </ul>
            </li-->
        </ul>
        <ul class="logout" @click="showMenu = false; isShowMenu = false">
            <li>
            <li>
                <router-link :to="{name: 'UserProfile'}">
                    <i class="fa fa-user nav-icon"></i>
                    <span class="nav-text">
			Profile
			</span>
                </router-link>
            </li>
            <li>
                <a href="/settings">
                    <i class="fa fa-cog nav-icon"></i>
                    <span class="nav-text">
			Settings
			</span>
                </a>
            </li>
            <li>
                <a href="/login" @click.prevent="logout">
                    <i class="fa fa-power-off nav-icon"></i>
                    <span class="nav-text">
			Logout
			</span>
                </a>
            </li>
        </ul>
    </nav>
</div>
</template>
<script>


    export default{
        name: 'main-menu',
        props:[ 'urls' ],
        data(){
            return{
                showMenu: false,
                isShowMenu: false,
                navs: '',
                isVissible: true
            }
        },
        methods:{
            show(){
                this.isShowMenu = !this.isShowMenu
                this.showMenu = !this.showMenu                
            },
            logout(){
                this.$store.dispatch('user/logout')
            }
        },
        created(){
            this.navs = this.$store.getters.permissions
        }
      
    }
</script>
<style scoped>

    .main-menu, .main-menu *{
        transition: all .3s;
    }

    .user-menu{
        box-shadow: 0 5px 25px rgba(0, 0, 0, .25);
    }

    #logo{
        width: 100px;
        padding: 10px;
        margin-top: -5px
    }

    @media(min-width:480px){
        #logo{
            display: none
        }
    }
    
    i.nav_icon.fa {
        position:relative;
        display:table-cell;
        width:60px;
        text-align:center;
        vertical-align:middle;
        font-size:18px;
        padding:.7em 0;   
    }

    .title{
        font-size: 20px;
        font-weight:bold;
        margin-top: 20px;
        color: #555;
    }
    
    .pull-left{
        margin-left: 10px;
    }
</style>