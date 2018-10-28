<template>
    <a :id="id"
        :href="href" 
        :target="target"
        :title="title" 
        :style="{fontSize: fontSize + 'px', color: color, textDecoration: textDecoration, 
            position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
    >{{ content }}</a>
</template>

<script>
    export default {
        data() {
            return {
                id: new Date().getTime(),
                href: 'http://www.chengxuunion.com',
                target: '_blank',
                title: '编程之道',
                content: '编程之道',
                
                fontSize: 12,
                color: '#000',
                textDecoration: 'underline',
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
                    name: "链接",
                    id: "LinkComponent",
                    icon: "el-icon-goods"
                };
            }
        }
    };
</script>