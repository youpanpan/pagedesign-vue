<template>
    <el-container>
      <el-header>
        <page-header></page-header>
      </el-header>
  
      <el-main>
        <div>首页内容</div>
      </el-main>
  
      <el-footer height="auto">
        <page-footer></page-footer>
      </el-footer>
    </el-container>
</template>

<script>
  import PageHeader from '../layouts/PageHeader.vue';
  import PageFooter from '../layouts/PageFooter.vue';

  export default {
      components: {
          'page-header': PageHeader,
          'page-footer': PageFooter
      }
  };
</script>
