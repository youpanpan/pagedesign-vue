<template>
    <el-container class="page-design">
        <el-header>
            <design-header @pre-view="preView" @save="save"></design-header>
        </el-header>
        <el-container>
            <el-aside v-bind:style="{width: width + 'px'}" class="component-aside">
                <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" ref="box">
                    <el-tab-pane name="uicomponent">
                      <span slot="label"><i class="el-icon-date"></i> 组件</span>
                      <div class="component-list">
                          <el-col :span="8" v-bind:style="{height: colHeight + 'px'}" v-for="component in components">
                            <div draggable="true" @dragstart="drag($event)" :id="component.id">
                                <i class="component-icon" v-bind:class="component.icon"></i><span class="component-title">{{ component.name }}</span>
                            </div>
                            
                          </el-col>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane name="plugin">
                      <span slot="label"><i class="el-icon-date"></i> 页面</span>
                      <el-row>
                        <el-button type="primary" style="width: 100%;" @click="newPage" icon="el-icon-circle-plus-outline">新建页面</el-button>
                      </el-row>
                      <div class="page-list">
                        <ul>
                          <li v-for="page in pages" :class="{active: page.active}">
                            <span class="page-name" :title="page.pageName" @click="selectPage(page)">{{ page.pageName }}</span>
                            <div class="page-oper">
                                <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="editPage(page)"></el-button>
                                <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deletePage(page)"></el-button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
            <el-container class="scroll-container">
              <el-main>
                  <div class="main-container">
                      <!--标尺-->
                      <page-ruler :width="pageWidth" :height="pageHeight" :page-width="pageWidth" :page-height="pageHeight" :scroll-left="scrollLeftNum" :scroll-top="scrollTopNum"></page-ruler>

                      <!-- 页面设计主界面 -->
                  </div>
                
              </el-main>
            </el-container>
          </el-container>
      </el-container>
</template>

<script>
  import PageHeader from '../layouts/PageHeader.vue';
  import DesignHeader from '../layouts/DesignHeader.vue';
  import PageFooter from '../layouts/PageFooter.vue';
  import PageRuler from '../components/PageRuler.vue';
  import componentManagement from '../components/componentManagement.js';
  import PageComponentOption from '../components/pageComponent/PageComponent.vue';
  import PageComponentJson from '../components/pagecomponent/component.json';
  import Vue from 'vue';
  import axios from 'axios';

  export default {
      components: {
        'page-header': PageHeader,
        'page-footer': PageFooter,
        'design-header': DesignHeader,
        'page-ruler': PageRuler
      },
      data: function() {
        return {
          //组件属性
          components: [],
          activeName: 'uicomponent',
          width: 260,
          colHeight: 260 / 3,
          
          //标尺属性
          pageWidth: 1366,
          pageHeight: 768,
          scrollLeftNum: 0,
          scrollTopNum: 0,

          //页面列表属性
          pages: [],
          defaultProps: {
            children: 'children',
            label: 'pageName'
          },

          //页面组件
          pageComponent: null,
          pageId: '',

          //定时器
          timeIndex: 0,
        };
      },
      
      computed: {
        
      },
      methods: {

        /**
         * TAB点击事件
        */
        handleClick (tab, event) {
          console.log(tab, event);
        },

        /**
        * 选择指定页面
        */
        selectPage (page) {
          //选中当前页面
          for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].active = false;
          }
          page.active = true;

          this.newPage();
          this.pageId = page.id;

          //设置页面属性
          let componentAttrs = page.componentAttrs;
          for (let i = 0; i < componentAttrs.length; i++) {
            this.pageComponent.$data[componentAttrs[i].attrName] = this.parseAttr(componentAttrs[i].attrType, componentAttrs[i].attrValue);
          }

          var current = this;
          axios.get('/pages/pagecomponents/' + this.pageId)
            .then(function(response) {
              var datas = response.data.data;
              current.pageComponent.initComponents(datas);
            })
            .catch(function(error) {
              console.log(error);
            });

            //强制更新
            this.$forceUpdate();
        },

        /**
        * 编辑页面
        */
        editPage (page) {
          let oldValue = page['pageName'];
          let current = this;
          this.$prompt('页面名称', '修改页面名称', {
                confirmButtonText: '确定',
                inputPattern: /.+/,
                inputErrorMessage: '页面名称不能为空',
                inputValue: oldValue
              }).then(({ value }) => {
                page['pageName'] = value;
                
                //更新页面
                axios.put('/pages', JSON.stringify(page)
                  ).then(function(response) {
                    if (response.data.status === '200') {
                      current.$message({
                        message: '更新页面成功！',
                        type: 'success'
                      });
                    } else {
                      page['pageName'] = oldValue;
                    }
                  }).catch(function(error) {
                    page['pageName'] = oldValue;
                    current.$message.error('更新页面发生异常，请联系系统管理员！');
                  });

              }).catch(() => {
                
              });
        },

        /**
        * 删除页面
        */
        deletePage (page) {
           let current = this;
           this.$confirm('此操作将删除该页面, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              axios.delete('/pages/' + page.id)
                .then(function(response) {
                  if (response.data.status === '200') {
                    current.$message({
                      message: '删除页面成功！',
                      type: 'success'
                    });
                    current.newPage();
                    current.queryPages();
                  }
                })
                .catch(function(error) {
                  current.$message.error('删除页面发生异常，请联系系统管理员！');
                });
            }).catch(() => {
                
            });
          
          
        },
        
        /**
        * 组件开始移动触发
        */
        drag (event) {

          //往Text设置组件的标识，用于获取组件配置项
          event.dataTransfer.setData("Text", event.target.id);
        },

        /**
        * 新建页面
        */
        newPage () {
          this.pageId = '';

          //1、动态加载页面组件
          this.pageComponent = null;
          this.pageComponent = new Vue(PageComponentOption);

          //2、移除已有的页面组件
          var pageDesignContainer = document.querySelector(".pagedesign-container");
          console.log("newPage:" + pageDesignContainer);
          if (!(pageDesignContainer === null)) {
            //.pagedesign-container之上还有一个div，所以这里需要这样删除，否则会出现右键菜单显示不出来的问题
            pageDesignContainer.parentNode.parentNode.removeChild(pageDesignContainer.parentNode);
          }
          var id = this.pageComponent.uniqueId();

          //3、装载新的页面组件到页面中
          var tmpDiv = document.createElement("div");
          tmpDiv.setAttribute("id", id);
          document.querySelector(".main-container").appendChild(tmpDiv);
          this.pageComponent.$mount('#' + id);
        },

        /**
        * 页面预览
        */
        preView () {
          //clearInterval(this.timeIndex);

          var current = this;
          this.save(function(pageId) {

            //打开新的窗口
            let routeData = current.$router.resolve({
              name: "view",
              params: {pageId: pageId}
            });
            window.open(routeData.href, '_blank');
          });
        },

        /**
         * 页面保存
        */
        save(callback) {
          if (this.pageComponent === null) {
            return false;
          }

          var page = {};
          page['id'] = this.pageId;

          let current = this;
          if (this.pageId === '') {
              this.$prompt('请输入页面名称', '保存页面', {
                confirmButtonText: '确定',
                inputPattern: /.+/,
                inputErrorMessage: '页面名称不能为空'
              }).then(({ value }) => {
                page['pageName'] = value;
                current.savePage(page, callback);
              }).catch(() => {
                return false;
              });
          } else {
            current.savePage(page, callback);
          }
        },

        /**
        * 保存页面
        */
        savePage (page, callback) {
          //页面属性
          page['componentAttrs'] = [];
          let index = 0;
          for (var key in PageComponentJson.styles) {
            var attrFormat = this.formatAttr(this.pageComponent.$data[key]);
            page['componentAttrs'][index] = {
              componentId: 'pagedesign',
              attrName: key,
              attrValue: attrFormat.value,
              attrType: attrFormat.type
            };
            index++;
          }

          //页面组件
          page['pageComponents'] = [];
          index = 0;
          let vueComponents = this.pageComponent.$data.vueComponents;
          for (key in vueComponents) {

            //页面组件属性
            var componentAttrs = [];
            var attrIndex = 0;
            for (var attrName in vueComponents[key].$data) {
              if (attrName === 'id') {
                continue;
              }
              attrFormat = this.formatAttr(vueComponents[key].$data[attrName]);
              componentAttrs[attrIndex] = {
                attrName: attrName,
                attrValue: attrFormat.value,
                attrType: attrFormat.type
              };
              attrIndex++;
            }
            page['pageComponents'][index] = {
              componentName: vueComponents[key].$data.id,
              componentCode: vueComponents[key].define().id,
              componentAttrs: componentAttrs
            };
            index++;
          }

          page['pageHtml'] = {};

          var current = this;
          axios.post('/pages', JSON.stringify(page))
              .then(function(response) {
                if (!(page['pageName'] == undefined)) {
                  current.queryPages();
                }
                current.$message({
                  showClose: true,
                  message: '页面保存成功',
                  type: 'success'
                });

                if (callback != undefined && callback instanceof Function) {
                  callback(response.data.data);
                }
              })
              .catch(function(error) {
                current.$message({
                  showClose: true,
                  message: '页面保存失败',
                  type: 'error'
                });
            });
        },
        
        /**
         * 查询用户页面列表
        */
        queryPages() {
          var current = this;

          axios.get('/pages/user/1')
            .then(function(response) {
              current.pages = response.data.data;
            })
            .catch(function(error) {
              console.log(error);
            });
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

      /**
       * 组件生命周期：mounted
       * 
      */
      mounted () {

        //滚动到居中位置
        var scroll = document.querySelector(".el-main");
        scroll.scrollTop = 0;
        scroll.scrollLeft = 0;

        //主界面滚动事件（设置标尺的top、left，保证标尺固定）
        let thisComponent = this;
        scroll.addEventListener('scroll', () => {
          thisComponent.scrollTopNum = scroll.scrollTop;
          thisComponent.scrollLeftNum = scroll.scrollLeft;
          if (!(thisComponent.pageComponent === null)) {
            thisComponent.pageComponent.$data.scrollTop = thisComponent.scrollTopNum;
            thisComponent.pageComponent.$data.scrollLeft = thisComponent.scrollLeftNum;
          }
        }, false);

        //初始化组件
        var index = 0;
        for (var componentName in componentManagement.registComponents) {
          var componentOption = componentManagement.registComponents[componentName];

          var defineJson = componentOption.methods.define();
          this.components[index] = {name: defineJson.name, icon: defineJson.icon, id: defineJson.id};
          index++;
        }

        //查询页面列表
        this.queryPages();

        //强制更新
        this.$forceUpdate();

        //定时保存页面
        this.timeIndex = setInterval(() => { 
            if (this.pageId != '') {
              this.$message({
                showClose: true,
                message: '正在保存页面...'
              });
              this.save();
            }
        }, 60000);

      }
  };
</script>

<style>
html,body,#app{
  height: 100%;
}
.el-tabs--border-card>.el-tabs__content{
  padding: 0;
}
</style>
<style scoped>
  .el-container{
    height: 100%;
  }
  .tool-item-title{
    display: block;
    padding: 8px;
    background-color: #eee;
  }
  .component-aside{
    height: calc(100% - 12px);
    border-bottom: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  
  .component-list .el-col{
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-width: 0 1px 1px 0;
    border-style: solid;
    border-color:  #eee;
    cursor: pointer;
    background-color: #fefefe;
    font-size: 14px;
  }

  .component-list .el-col:hover{
    background-color: #dedede;
  }

  .component-list .component-icon{
    display: block;
    margin-bottom: 12px;
  }

  .el-main{
    background-color: #ddd;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    padding: 0;
  }

  .main-container{
    width: 3000px;
    height: 3000px;
    display: flex;
  }

  .attr-list{
    margin-top: 20px;
    margin-right: 4px;
  }
  
  .line-separator{
    width: 100%;
    height: 0px;
    border: 1px dashed #999;
    margin-bottom: 8px;
  }

  /*-----------页面列表样式 BEGIN-----------*/
  .page-list{
    margin-top: 12px;
    border-top: 1px solid #eee;
  }
  .page-list ul li{
    padding: 8px 2px 8px 12px;
    cursor: pointer;
  }
  .page-list ul li:hover{
    background-color: #dcdfe6;
  }
  .page-list ul .active{
    background-color: #b6b9bd;
  }
  .page-list .page-name{
    display: inline-block;
    width: 150px;
    line-height: 28px;
    overflow: hidden; 
    text-overflow: ellipsis; 
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    vertical-align: middle;
  }
  .page-list .page-oper{
    display: inline-block;
  }
  /*-----------页面列表样式 END-------------*/

</style>

