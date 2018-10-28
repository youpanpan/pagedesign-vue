<template>
    <div :id="id" :style="{position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}">
        <el-input 
            :type="type"
            v-model="input" 
            :size="size"
            :placeholder="placeholder"
            :clearable="clearable"
            :disabled="disabled"
            :style="{width: width + 'px', height: height + 'px'}"
        ></el-input>

    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                id: new Date().getTime(),
                type: 'text',
                input: '',
                size: 'small',
                placeholder: '请输入',
                clearable: false,
                disabled: false,
                width: 200,
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
                    name: "输入框",
                    id: "InputComponent",
                    icon: "el-icon-picture"
                };
            }
        }
    };
</script>