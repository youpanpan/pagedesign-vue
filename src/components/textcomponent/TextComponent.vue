<template>
    <span
        :id="id" 
        :title="title" 
        :style="{fontSize: fontSize + 'px', lineHeight: lineHeight + 'px', color: color, width: width + 'px', height: height + 'px', 
                position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
    >{{ content }}</span>
</template>

<script>
    export default {
        data() {
            return {
                id: new Date().getTime(),
                title: '文本',
                content: '文本',
                fontSize: 14,
                lineHeight: 14,
                color: '#000',
                width: '',
                height: '',
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
                    name: "文本",
                    id: "TextComponent",
                    icon: "el-icon-edit-outline"
                };
            }
        }
    };
</script>