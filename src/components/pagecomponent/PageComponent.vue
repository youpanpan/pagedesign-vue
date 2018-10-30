<template>
    <div style="position: relative;">

        <!-- 设计界面 -->
        <div class="pagedesign-container" 
            :style="{width: width + 'px', height: height + 'px', backgroundColor: backgroundColor,  margin: margin, border: border, zIndex: zIndex}" 
            :id="id" 
            @drop="drop" 
            @dragover="allowDrop" 
            @dblclick="pageClick"
        >
        </div>

         <!-- 组件属性设置 -->
         <el-dialog title="属性设置" class="attr-dialog" :width="dialogWidth +'px'" :visible.sync="attrDialogVisible" @close="closeAttrDialog" :modal="false">
            <!-- 元素属性 -->
            <el-form>
                <div v-for="(value, attr) in elAttrs">
                <el-form-item :label="attr" :label-width="formLabelWidth" v-if="attr != 'id'">
                <el-input v-model="elAttrs[attr]" autocomplete="off"></el-input>
                </el-form-item>
                </div>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeAttrDialog">确 定</el-button>
            </div>
        </el-dialog>
    
        <!-- 鼠标右键菜单 -->
        <el-menu 
            v-show="rightMenu"
            default-active="rightMenuActive"
            background-color="#545c64"
            text-color="#fff"
            class="el-menu-vertical-demo right-menu"
            :style="{zIndex:9999}"
            @select="rightMenuSelect" 
        >
            <el-menu-item index="1">
                <i class="el-icon-setting"></i>
                <span slot="title">设置属性</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-delete"></i>
                <span slot="title">删除组件</span>
            </el-menu-item>
        </el-menu>
    </div>

</template>

<script>
    import componentManagement from '../componentManagement.js';
    import PageComponentJson from '../pagecomponent/component.json';
    import Vue from 'vue';

    //屏蔽鼠标右键事件
    document.oncontextmenu = function(){return false;}; 

    export default {
        data() {
            return {
                //设计界面属性设置
                id: "pagedesign",
                width: 1366,
                height: 768,
                backgroundColor: '#fff',
                zIndex: 1,

                //margin
                margin: '78px 0 0 78px',
                //border
                border: '2px dashed #ccc',


                //窗口滚动距离
                scrollTop: 0,
                scrollLeft: 0,

                //属性弹框属性
                attrDialogVisible: false,
                dialogWidth: 400,
                formLabelWidth: '120px',
                //属性对象集合
                elAttrs: {},

                //鼠标点击的位置
                clientX: 0,
                clientY: 0,

                //右键菜单属性设置
                rightMenu: false, //右键菜单
                rightMenuActive: '', //右键菜单选中的菜单项

                //是否设计界面点击，true: 设计界面点击，false：组件点击
                isPage: false,

                //页面中组件集合对象，key: 组件ID， value: Vue组件对象
                vueComponents: {},
                //当前点击的组件（被激活的组件）
                activeComponent: null,
            };
        },
        methods: {
            
            /**
            *  生成唯一性ID
            */
            uniqueId() {
                return this.id;
            },

            /**
            * 组件基础定义 
            */
            define() {
                return {
                    name: "页面",
                    id: "PageComponent",
                    icon: "el-icon-goods"
                };
            },
            
            //-------------------------事件响应 BEGIN-------------------------
            /**
             * 拖动到指定target时触发：当组件拖动到页面组件时触发
            */
            drop (event) {
                event.preventDefault();

                //1、获取组件配置
                var componentName = event.dataTransfer.getData("Text");
                if (componentName === undefined || componentManagement.registComponents[componentName] === undefined) {
                    return;
                }
                var componentOption = componentManagement.registComponents[componentName];
                
                //2、动态NEW组件
                var vueComponent = this.newComponent(componentOption, event);

                //3、组件位置设置
                vueComponent.$data.position = 'absolute';
                vueComponent.$data.display = 'block';
                vueComponent.$data.top = event.offsetY;
                vueComponent.$data.left = event.offsetX;
            },

            
            /**
             * 组件移动到设计界面时触发
             * 
            */
            allowDrop (event) {
                //防止元素默认行为
                event.preventDefault();
            },

            /**
             * 组件双击事件（弹出组件属性设置框）
            */
            componentClick (event) {
                //非设计界面
                this.isPage = false;

                //获取点击的组件
                var el = event.currentTarget;
                var componentId = el.getAttribute("id");
                var vueComponent = this.vueComponents[componentId];
                this.activeComponent = vueComponent;

                //设置属性显示到界面中
                let tempAttrs = {};
                for (var key in this.activeComponent.$data) {
                    tempAttrs[key] = this.formatAttr(this.activeComponent.$data[key]).value;
                }
                this.elAttrs = tempAttrs;

                //显示属性设置框
                this.showAttrDialog(event);

                //停止传播
                event.stopPropagation();
            },

            /**
             * 页面双击事件
            */
            pageClick (event) {
                this.isPage = true;

                //设置页面属性
                let tempAttrs = {};
                for (var key in PageComponentJson.styles) {
                    tempAttrs[key] = this.$data[key];
                }
                this.elAttrs = tempAttrs;

                //显示属性设置框
                this.showAttrDialog(event);

                //停止传播
                event.stopPropagation();
            },
            
            /**
             * 显示属性对话框
            */
            showAttrDialog (event) {
                console.log(event);
                if (!(event === undefined)) {
                    this.clientX = event.clientX;
                    this.clientY = event.clientY;
                }

                //显示属性对话框
                this.attrDialogVisible = true;

                //设置属性对话框位置
                var dialog = document.querySelector(".attr-dialog .el-dialog");
                dialog.style.position = 'absolute';
                var posJson = this.getTopAndLeft();
                console.log(posJson);
                dialog.style.left = posJson.left + 'px';
                dialog.style.top = posJson.top + 'px';
                dialog.style.marginTop = '0px';
            },

            /**
             * 获取属性对话框的top和left值
            */
            getTopAndLeft () {
                var left = (this.clientX);
                var top = (this.clientY);
                if ((this.clientX + this.dialogWidth) > document.body.clientWidth) {
                    left = this.clientX - this.dialogWidth;
                }
                if (this.clientY > document.body.clientHeight / 2) {
                    top = this.clientY - this.dialogWidth;
                }

                return {left: left, top: top};
            },

            /**
             * 关闭属性对话框（重新赋值组件数据）
             * 
            */
            closeAttrDialog() {
                //隐藏属性对话框
                this.attrDialogVisible = false;

                //如果是组件，则设置组件的data中的属性值
                if (!this.isPage) {
                    for (var key in this.elAttrs) {
                        var attrType = this.formatAttr(this.activeComponent.$data[key]).type;
                        this.activeComponent.$data[key] = this.parseAttr(attrType, this.elAttrs[key]);
                    }
                } else {
                    //如果是页面，则设置页面style样式
                    for (var key in this.elAttrs) {
                        this.$data[key] = this.typeConvert(this.elAttrs[key]);
                    } 
                }
            },

            /**
             * 类型转换，对于boolean类型的值进行转换，否则vue组件设置boolean类型的值会发生异常
            */
            typeConvert(value) {
                if (value === undefined) {
                  return value;
                }
                
                var str = value + "";
                if (str.toLowerCase() === 'false' || str.toLowerCase() === 'true') {
                    return eval(str.toLowerCase());
                }
                
                return value;
            },

            /**
             * 右键菜单选择事件
            */
            rightMenuSelect (key, keyPath) {
                //1：设置属性
                if (key === '1') {
                    //设置属性显示到界面中
                    let tempAttrs = {};
                    for (var attrName in this.activeComponent.$data) {
                        tempAttrs[attrName] = this.formatAttr(this.activeComponent.$data[attrName]).value;
                    }
                    this.elAttrs = tempAttrs;

                    this.showAttrDialog();
                } else {
                    //2：删除组件
                    this.$confirm('此操作将删除该组件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var id = this.activeComponent.$data.id;

                        //移除页面元素
                        this.activeComponent.$el.parentNode.removeChild(this.activeComponent.$el);

                        //移除组件对象
                        delete this.vueComponents[id];
                    }).catch(() => {
                        console.error("删除组件异常");
                    });
                    
                }
            },

            //-------------------------事件响应 END---------------------------
            /**
             * 初始化组件
            */
            initComponents(components) {
                for (let i = 0; i < components.length; i++) {
                    var componentCode = components[i].componentCode;
                    var vueComponent = this.newComponent(componentManagement.registComponents[componentCode]);

                    //组件属性设置
                    var componentAttrs = components[i].componentAttrs;
                    for (let j = 0; j < componentAttrs.length; j++) {
                        let attrName = componentAttrs[j].attrName;
                        if (attrName === 'id') {
                            continue;
                        }
                        if (vueComponent.$data[attrName] != undefined) {
                            let attrValue = componentAttrs[j].attrValue;
                            let attrType = componentAttrs[j].attrType;
                            vueComponent.$data[attrName] = this.parseAttr(attrType, attrValue);
                        }
                    }
                }
            },

            /**
            * 根据组件配置项新建组件
            */
            newComponent(componentOption, event) {
                //2、动态NEW组件
                var vueComponent = new Vue(componentOption);
                //新增组件长度作为id的一部分，这样就能保证ID的唯一性
                var id = vueComponent.uniqueId(Object.keys(this.vueComponents).length);

                //3、将组件渲染到指定的页面元素中,该元素临时创建
                var tmpDiv = document.createElement("div");
                tmpDiv.setAttribute("id", id);
                document.querySelector(".pagedesign-container").appendChild(tmpDiv);
                vueComponent.$mount('#' + id);
                
                //4、注册到页面组件集合中
                this.vueComponents[id] = vueComponent;

                //5、组件交互及位置设置
                var el = vueComponent.$el;
                el.ondblclick = this.componentClick;

                var current = this;
                
                //鼠标按下
                el.onmousedown = function(ev) {
                    var oevent = ev || event;
                    var distanceX = oevent.clientX - el.offsetLeft;
                    var distanceY = oevent.clientY - el.offsetTop;
                    
                    //组件移动
                    document.onmousemove = function(mouseev){
                        var mouseevent = mouseev || event;
                        vueComponent.$data.left = mouseevent.clientX - distanceX;
                        vueComponent.$data.top = mouseevent.clientY - distanceY;
                        
                    };
                    document.onmouseup = function(e){
                        document.onmousemove = null;
                        document.onmouseup = null;
                        e.stopPropagation();
                    };
                };

                //鼠标松开
                el.onmouseup = function(e) {
                    //鼠标右键事件（显示右键菜单）
                    if (e.button === 2) {
                        //设置当前激活的组件
                        current.activeComponent = current.vueComponents[el.getAttribute("id")];
                        current.clientY = (e.clientY);
                        current.clientX = (e.clientX);  

                        //显示右键菜单
                        current.rightMenuActive = '';
                        current.rightMenu = true;

                        //设置右键菜单位置
                        var rightMenuEl = document.querySelector(".right-menu");
                        rightMenuEl.style.position = 'absolute';
                        rightMenuEl.style.width = 150 + 'px';
                        rightMenuEl.style.top = (e.clientY - 60 + current.scrollTop) + 'px';
                        rightMenuEl.style.left = (e.clientX - 260 + current.scrollLeft) + 'px';
                    }
                };

                return vueComponent;
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
            },

            /**
             * 判断parentObj是否为obj的父对象
            */
            isParent (obj, parentObj) {
                if (obj == document) {
                    return false;
                }
                while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){
                    if (obj == parentObj){
                    return true;
                    }
                    obj = obj.parentNode;
                }
                return false;
            },
        },

        /**
         * 组件生命周期：mouted
        */
        mounted () {
            var current = this;

            //如果点击的区域不在右键菜单的范围内，则隐藏右键菜单
            document.onclick = function(e) {
                var el = e.currentTarget;
                var menuEl = document.querySelector(".right-menu");
                if (!current.isParent(el, menuEl)) {
                    current.rightMenu = false;
                }
            };
        }
    };
</script>

<style scoped>
    .pagedesign-container{
        position: relative;
    }
</style>