<template>
    <el-button :id="id"
        :type="type" 
        :size="size" 
        :round="round" 
        :circle="circle"
        :style="{position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
    >{{ content }}</el-button>
</template>

<script>
    export default {
        data() {
            return {
                id: new Date().getTime(),
                type: 'primary',
                size: 'small',
                round: false,
                circle: false,
                content: '主要按钮',

                position: 'absolute',
                display: 'block',
                top: -5000,
                left: -5000,
                zIndex: 1
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
                    name: "按钮",
                    id: "ButtonComponent",
                    icon: "el-icon-goods"
                };
            }
        }
    };

</script>