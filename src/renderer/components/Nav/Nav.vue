<template>
    <div class='nav-box'>
        <img src='../../assets/t_logo.jpeg' class='logo'/>
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            router>
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">新建费用报销单</span>
            </el-menu-item>
            <el-menu-item index="/review">
                <i class="el-icon-document"></i>
                <span slot="title">等待审核</span>
            </el-menu-item>
            <el-menu-item index="/pay">
                <i class="el-icon-setting"></i>
                <span slot="title">等待支付</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name : 'nav_side',
}
</script>

<style scoped>
    .nav-box{
        width: 100%;
        height: 100%;
        padding-top: 20px;
    }
    .logo{
        width: 80%;
        display: block;
        margin: 0 auto 20px;
    }
    .el-menu{
        height: 100%;
        border-right: none!important;
    }
</style>
