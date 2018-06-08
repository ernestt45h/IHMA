<template>
    <div>
        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-envelope"></i><span class="badge">1</span></a>
        <ul class="dropdown-menu anti-dropdown-menu w3l-msg">
            <li>
                <div class="notification_header">
                    <h3>You have 1 new messages</h3>
                </div>
            </li>
            <note></note>
            <li>
                <div class="notification_bottom">
                    <a href="#">See all messages</a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

const Note = ()=>import('./note')

export default {
    name: 'note-drawer',
    components:{Note}
}
</script>

