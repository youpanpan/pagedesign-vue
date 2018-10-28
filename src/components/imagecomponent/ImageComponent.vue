<template>
    <img
        :id="id" 
        :src="src" 
        :title="title" 
        :alt="alt" 
        :style="{width: width + 'px', height: height + 'px', 
            position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
    ></img>
</template>

<script>

    export default {
        data() {
            return {
                id: new Date().getTime(),
                src: 'http://www.chengxuunion.com/resources/images/common/logo.png',
                title: '',
                alt: '图片',
                width: 266,
                height: 50,

                position: 'absolute',
                display: 'block',
                top: -5000,
                left: -5000,
                zIndex: '1'
            };
        },
        methods: {
            /**
            *  生成唯一性ID
            */
            uniqueId(index) {
                this.id = this.define().id + new Date().getTime() + index;
                return this.id;
            },

            /**
            * 组件基础定义 
            */
            define() {
                return {
                    name: "图片",
                    id: "ImageComponent",
                    icon: "el-icon-picture"
                };
            }
        }
    };
</script>