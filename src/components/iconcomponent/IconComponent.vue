<template>
    <i :id="id" :class="iconClass" :style="{position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}">{{content}}</i>
</template>

<script>
    export default {
        data() {
            return {
                id: new Date().getTime(),
                iconClass: 'el-icon-success',
                content: '',
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
                    name: "图标",
                    id: "IconComponent",
                    icon: "el-icon-success"
                };
            }
        }
    };
</script>