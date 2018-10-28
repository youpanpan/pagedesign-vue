<template>
    <div :id="id" :style="{ position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}">
        <el-tag
            v-for="tag in tags"
            :key="tag.name"
            :type="tag.type">
        {{tag.name}}
        </el-tag>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        id: new Date().getTime(),
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ],
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
                name: "标签",
                id: "TagComponent",
                icon: "el-icon-tickets"
            };
        }
    }
  };
</script>