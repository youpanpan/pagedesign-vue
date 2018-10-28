<!-- 网站尾部组件 -->
<template>
    <div class="footer-container">
        <ul class="footer-list">
            <li>
                <span>@2018 粤ICP备18120804号</span>
            </li>    
            <li>
                <a href="#">关于我们</a>
            </li>
            <li>
                <a href="#">帮助文档</a>
            </li>
        </ul>

        <ul class="footer-list">
            <li>
                <a href="#">编程之道</a>
            </li>
            <li>
                <a href="#">CSDN</a>
            </li>
            <li>
                <a href="#">开源中国</a>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        }
    };
</script>

<style scoped>
    .footer-container{
        width: 1200px;
        margin: 0 auto;
        display: flex!important;
        justify-content: space-between!important;
    }
    .footer-list{
        list-style: none;
        display: flex !important;
        flex-wrap: wrap!important;
        font-size: 12px;
    }

    .footer-list li{
        margin-right: 16px !important;
    }

    .footer-list a{
        text-decoration: none;
        color: #0366d6;
    }

    .footer-list a:hover{
        text-decoration: underline;
    }
</style>