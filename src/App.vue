<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/Login">登录</router-link>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<style lang="less">
*{
  margin: 0px;
  padding: 0px;
  list-style: none;
}
body,html{
  height: 100%;
}
#app {
  height: 100%;
}
</style>
