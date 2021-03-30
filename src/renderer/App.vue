<template>
  <div id="app">
    <el-container>
      <el-aside width="25%">
        <Nav />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Nav from './components/Nav/Nav';
  export default {
    name: 'mainPage',
    components: { Nav },
  }
</script>

<style>
  /* CSS */
  body{
    padding: 0;
    margin: 0;
  }
  .el-container{
    min-height: 100vh;
  }
  #app{
    width: 100%;
  }
  .nav-left{
    width: 20%;

  }
</style>
