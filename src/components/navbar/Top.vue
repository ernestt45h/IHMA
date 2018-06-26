<template>
    <div id="topnav" v-if="isVissible">
        <section class="title-bar">
            <div class="logo">
                <router-link to="/"><img id="logo" src="../../assets/img/logo.png" alt="" /></router-link>
            </div>
            
            <search-bar></search-bar>
           
            <div class="header-right">
                <div class="profile_details_left">
                    <div class="header-right-left">
                        <!--notifications of menu start -->
                        <ul class="nofitications-dropdown">
                            <li class="dropdown head-dpdn">
                                <mails></mails>
                            </li>
                            <li class="dropdown head-dpdn">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-bell"></i><span class="badge blue">3</span></a>
                                <ul class="dropdown-menu anti-dropdown-menu agile-notification">
                                    <li>
                                        <div class="notification_header">
                                            <h3>You have 3 new notifications</h3>
                                        </div>
                                    </li>
                                    <li><a href="#">
                                        <div class="user_img"><img src="images/2.png" alt=""></div>
                                        <div class="notification_desc">
                                            <p>Lorem ipsum dolor amet</p>
                                            <p><span>1 hour ago</span></p>
                                        </div>
                                        <div class="clearfix"></div>
                                    </a></li>
                                    <li class="odd"><a href="#">
                                        <div class="user_img"><img src="images/1.png" alt=""></div>
                                        <div class="notification_desc">
                                            <p>Lorem ipsum dolor amet </p>
                                            <p><span>1 hour ago</span></p>
                                        </div>
                                        <div class="clearfix"></div>
                                    </a></li>
                                    <li><a href="#">
                                        <div class="user_img"><img src="images/3.png" alt=""></div>
                                        <div class="notification_desc">
                                            <p>Lorem ipsum dolor amet </p>
                                            <p><span>1 hour ago</span></p>
                                        </div>
                                        <div class="clearfix"></div>
                                    </a></li>
                                    <li>
                                        <div class="notification_bottom">
                                            <a href="#">See all notifications</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown head-dpdn">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-tasks"></i><span class="badge blue1">15</span></a>
                                <ul class="dropdown-menu anti-dropdown-menu agile-task">
                                    <li>
                                        <div class="notification_header">
                                            <h3>You have 8 pending tasks</h3>
                                        </div>
                                    </li>
                                    <li><a href="#">
                                        <div class="task-info">
                                            <span class="task-desc">Database update</span><span class="percentage">40%</span>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="progress progress-striped active">
                                            <div class="bar yellow" style="width:40%;"></div>
                                        </div>
                                    </a></li>
                                    <li><a href="#">
                                        <div class="task-info">
                                            <span class="task-desc">Dashboard done</span><span class="percentage">90%</span>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="progress progress-striped active">
                                            <div class="bar green" style="width:90%;"></div>
                                        </div>
                                    </a></li>
                                    <li><a href="#">
                                        <div class="task-info">
                                            <span class="task-desc">Mobile App</span><span class="percentage">33%</span>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="progress progress-striped active">
                                            <div class="bar red" style="width: 33%;"></div>
                                        </div>
                                    </a></li>
                                    <li><a href="#">
                                        <div class="task-info">
                                            <span class="task-desc">Issues fixed</span><span class="percentage">80%</span>
                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="progress progress-striped active">
                                            <div class="bar  blue" style="width: 80%;"></div>
                                        </div>
                                    </a></li>
                                    <li>
                                        <div class="notification_bottom">
                                            <a href="#">See all pending tasks</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <div class="clearfix"> </div>
                        </ul>
                    </div>
                    <div class="profile_details">
                        <ul>
                            <li class="dropdown profile_details_drop">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <div class="profile_img">
                                        <span class="prfil-img"><i class="fa fa-user" aria-hidden="true"></i></span>
                                        <div class="clearfix"></div>
                                    </div>
                                </a>
                                <ul class="dropdown-menu text-center">
                                    <li> <a href="#"><i class="fa fa-cog"></i> Settings</a> </li>
                                    <li> <a href="#"><i class="fa fa-user"></i> Profile</a> </li>
                                    <li> <a href="#"><i class="fa fa-sign-out"></i> Logout</a> </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="clearfix"> </div>
                </div>
            </div>
            <div class="clearfix"> </div>
        </section>


        <!-- footer -->

    </div>
</template>
<script>
import {bus} from '../../main'
const SearchBar = ()=>import('./Search')
const Mails = ()=>import('./notification/drawer')

export default{
    name: 'topnav',
    components:{SearchBar, Mails},
    data(){
    return{
        search: '',
        isVissible: true,

    }
    },
    created(){
       bus.$on('hide_navs', (e)=>{
            if(e) this.isVissible = false
            else this.isVissible = true
        })
    }
}
</script>
<style scoped>
    #logo{
        padding-top: 10px; 
        width: 150px;
    }
     @media(max-width:480px){
        #logo{
            display: none
        }
    }
    .dropdown-menu{
        padding: 1em;
    }
    .dropdown-menu li a{
        font-size: 18px;
    }

    #topnav{
        background: #fff;
        padding-bottom: 10px; 
    }

    .hidden{
        display: none;
    }
</style>