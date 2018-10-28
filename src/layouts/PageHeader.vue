<!-- 网站头部组件 -->
<template>
    <el-menu router :default-active="$route.path" 
        class="el-menu-demo" 
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="5">登录</el-menu-item>  
        <el-menu-item index="4">注册</el-menu-item>  
        <el-menu-item index="/design">在线设计</el-menu-item>
        <el-menu-item index="2">插件</el-menu-item>
        <el-menu-item index="/">首页</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>
<style scoped>
    .el-menu--horizontal>.el-menu-item{
        float: right;
    }
    .el-menu a{
        text-decoration: none;
    }
    

    .el-menu{
        padding-right: 20px;
    }
</style>