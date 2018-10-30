<!-- 在线设计页面头部组件 -->
<template>
        <el-menu :default-active="$route.path" 
            class="el-menu-demo" 
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="5" @click="$emit('save')"><i class="el-icon-document"></i>保存</el-menu-item>  
            <el-menu-item index="4" @click="$emit('pre-view')"><i class="el-icon-view"></i>预览</el-menu-item>
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