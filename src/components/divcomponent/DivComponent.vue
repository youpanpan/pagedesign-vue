<template>
    <div :id="id"
        :style="{width: width + 'px', height: height + 'px', backgroundColor: backgroundColor, 
            border: border, position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
    >{{ content }}</div>
</template>


<script>
    export default {
        data() {
            return {
                id: new Date().getTime(),
                width: 300,
                height: 300,
                backgroundColor: '#eee',
                border: '',
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
                    name: "矩形块",
                    id: "DivComponent",
                    icon: "el-icon-goods"
                };
            }
        }
    };

</script>