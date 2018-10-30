<template>
    <div class="page-container" :style="{width: '100%'}">
        
    </div>

</template>

<script>
    import PageComponentOption from '../components/pageComponent/PageComponent.vue';
    import Vue from 'vue';
    import axios from 'axios';

    export default {
        data () {
            return {
                pageId: '',
                pageComponent: null
            };
        },
        methods: {
            renderPage () {
                var current = this;
                axios.get('/pages/' + this.pageId)
                    .then(function(response) {

                        document.title = response.data.data.pageName;
                        
                        //初始化页面
                        current.initPage(response.data.data);

                        //初始化页面组件
                        axios.get('/pages/pagecomponents/' + current.pageId)
                            .then(function(response) {
                                var datas = response.data.data;
                                current.pageComponent.initComponents(datas);
                            }).catch(function(error) {
                                console.log(error);
                            });
                        
                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            /**
            * 初始化页面
            */
            initPage (page) {

                //1、创建页面组件
                this.pageComponent = new Vue(PageComponentOption);
                var id = this.pageComponent.uniqueId();

                //2、装载新的页面组件到页面中
                var tmpDiv = document.createElement("div");
                tmpDiv.setAttribute("id", id);
                document.querySelector(".page-container").appendChild(tmpDiv);
                this.pageComponent.$mount('#' + id);

                //3、设置页面属性
                let componentAttrs = page.componentAttrs;
                for (let i = 0; i < componentAttrs.length; i++) {
                    this.pageComponent.$data[componentAttrs[i].attrName] = this.parseAttr(componentAttrs[i].attrType, componentAttrs[i].attrValue);
                }

                this.pageComponent.$data.margin = '0 auto';
                this.pageComponent.$data.border = "none";
            },

            /**
             * 格式化属性值（转换为字符串）
             * 返回格式{value: 属性对应的字符串值, type: 属性类型,1:字符串,2:数值,3:布尔值,4:数组,5:对象,6:其它}
            */
            formatAttr (attrValue) {
                var getType = Object.prototype.toString;
                if (getType.call(attrValue) === '[object String]') {
                    return {value: attrValue, type: '1'};
                } else if (getType.call(attrValue) === '[object Number]') {
                    return {value: attrValue + '', type: '2'};
                } else if (getType.call(attrValue) === '[object Boolean]') {
                    return {value: attrValue + '', type: '3'};
                } else if (getType.call(attrValue) === '[object Array]') {
                    return {value: JSON.stringify(attrValue), type: '4'};
                } else if (getType.call(attrValue) === '[object Object]') {
                    return {value: JSON.stringify(attrValue), type: '5'};
                } 

                return {value: attrValue, type: '6'};
            },

            /**
             * 根据属性类型和值，解析为正确的格式
            */
            parseAttr (attrType, attrValue) {
                if (attrType === '1') {
                    return attrValue;
                } else if (attrType === '2') {
                    return Number.parseFloat(attrValue);
                } else if (attrType === '3') {
                    return eval(attrValue);
                } else if (attrType === '4' || attrType === '5') {
                    return JSON.parse(attrValue);
                }

                return attrValue;
            }
        },
        mounted() {
            this.pageId = this.$route.params.pageId;

            this.renderPage();
        }
    };
</script>

<style scoped>
    .page-container{
        margin: 0 auto;
    }
</style>