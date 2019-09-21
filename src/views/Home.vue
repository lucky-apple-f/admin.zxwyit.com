<template>
  <!-- default-active="1-4-1" -->
  <div id="home">
    <el-container style="height: 100%;">
      <el-aside width="200" style="background-color: rgb(238, 241, 246);overflow-x: hidden;">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#D1C239"
          style="height:100%;"
          router
        >
          <el-menu-item index="0" id="active" disabled>
            <i>
              <img class="logo" src="../assets/img/favicon.png" />
            </i>
            <span slot="title">
              <h4 slot="title">智学无忧教育</h4>
            </span>
          </el-menu-item>
          <el-submenu :index="index+1+''" v-for="(value, key, index) in tabNavLists" :key="index">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">{{key}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(e, i) in value"
                :key="i"
                :index="e.url"
                @click="addTab(e.name,e.url)"
              >{{e.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="font-size: 12px;display:flex">
          <div class="shrink" @click="shrinkFun">
            <span class="el-icon-caret-left"></span>
          </div>
          <!-- 中间 -->
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-click="pushRoute"
            @tab-remove="removeTab"
            style="margin: 0px 3% 0px 3%;"
          >
            <el-tab-pane
              v-for="(item) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              :url="item.url"
            ></el-tab-pane>
          </el-tabs>
          <!-- 导航栏右边 -->
          <div class="right">
            <el-dropdown>
              <span style="margin-right: 15px;height:100%;line-height:60px">中文</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>中文</el-dropdown-item>
                <el-dropdown-item>English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>退出</span>
            <!-- <div class="block"> -->
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
            <!-- </div> -->
          </div>
        </el-header>
        <el-main>
          <router-view name="right"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an ali
export default {
  name: "home",
  data() {
    const item = {
      // date: "2016-05-02",
      // name: "王小虎",
      // address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", //头像
      tableData: Array(1).fill(item), //表格数据
      isCollapse: false, //是否水平折叠收起菜单
      editableTabsValue: "1", //tab标签选中的值
      editableTabs: [
        //tab标签的值
        {
          title: "首页",
          name: "0",
          url: "/"
        }
      ],
      tabIndex: 0, //tab标签的下标
      tabNavLists: {
        在线测试: [
          { url: "/ViewTestPaper", name: "老师出卷" },
          { url: "/TestSetter", name: "试卷管理" },
          { url: "/MakeTestPaper", name: "安排测试" },
          { url: "/TestPaperManage", name: "批阅试卷" },
          { url: "/TestResult", name: "测试成绩" }
        ],
        基础数据: [
          { url: "/ClassManage", name: "班级管理" },
          { url: "/StudentManage", name: "学生管理" },
          { url: "/TeacherManage", name: "老师管理" },
          { url: "/ModifyPassword", name: "修改密码" }
        ]
      }
    };
  },
  methods: {
    //收缩左边导航栏
    shrinkFun(e) {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        e.toElement.className = "el-icon-caret-right";
      } else {
        e.toElement.className = "el-icon-caret-left";
      }
    },
    /** 
      增加tab标签
    */
    addTab(name, url) {
      for (let i = 0; i < this.editableTabs.length; i++) {
        if (name == this.editableTabs[i].title) {
          this.editableTabsValue = this.editableTabs[i].name + "";
          return;
        }
      }
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: name,
        name: newTabName,
        url: url
      });
      this.editableTabsValue = newTabName;
    },
    /** 
      删除tab标签
    */
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        let nextTab = tabs[targetName + 1] || tabs[targetName - 1];
        this.editableTabsValue = nextTab.name;
      }
      this.editableTabs[targetName] = null;
      this.editableTabs.splice(targetName, 1);
      //跳转路由
      if (this.editableTabs[this.editableTabsValue]) {
        this.$router.push(this.editableTabs[this.editableTabsValue].url);
      }
    },
    // 路由跳转
    pushRoute(e) {
      this.$router.push(e.$attrs.url);
    }
  },
  /**
   * 创建后
   */
  created() {
    console.log(document.cookie);
    // var date=new Date();
    // //将date设置为过去的时间
    // console.log(date.toGMTString())
    // date.setTime(date.getTime()+1000);
    // console.log(date.toGMTString())
    for (let key in this.tabNavLists) {
      for (let j = 0; j < this.tabNavLists[key].length; j++) {
        var obj = this.tabNavLists[key][j];
        if (obj.url == this.$route.path) {
          let newTabName = ++this.tabIndex + "";
          this.editableTabs.push({
            title: obj.name,
            name: newTabName,
            url: obj.url
          });
          this.editableTabsValue = newTabName;
        }
      }
    }
    if (!sessionStorage.getItem("token")) {
      this.$router.replace(
        "/login?returnUrl=" + location.pathname + location.search
      );
    }
  }
};
</script>

<style lang="less" scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
#home {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  padding: 0px;
  width: 100%;
  .el-tabs,
  .el-tabs--card,
  .el-tabs--top {
    width: 100%;
    overflow: hidden;
  }
  .right {
    margin: 0px 20px 0px auto;
    flex: none;
  }
  // 收缩
  .shrink {
    float: left;
    height: 100%;
    line-height: 100%;
    width: 30px;
    background: #008181;
    vertical-align: middle;
  }
}

//logo
.el-menu-item {
  height: 60px;
  line-height: 60px;
  padding-left: 5%;
  h4 {
    display: inline-block;
    color: #079787;
    margin-left: 5%;
  }
  .logo {
    height: 30px;
    width: 30px;
    border: 1px solid #7ab162;
    border-radius: 50%;
    vertical-align: middle;
    box-shadow: 0px 0px 10px 1px #7ab162;
  }
}
.el-icon-caret-left,
.el-icon-caret-right {
  font-size: 30px;
  color: white;
}
[class*=" el-icon-"],
[class^="el-icon-"] {
  line-height: 60px;
}
//tab标签
/deep/ .el-tabs--card > .el-tabs__header {
  border-bottom: 0px;
  margin: 0px 0px 0px;
}
.el-header[data-v-fae5bece] {
  line-height: 0px;
  background-color: white;
  border-bottom: 1px solid #ccc;
  /deep/ .el-tabs__item.is-active {
    border-bottom: 2px solid #7cb9f8;
  }
}
/deep/ .el-tabs__nav-wrap {
  top: 19px;
}

.el-avatar {
  float: right;
  margin-top: 5px;
  margin-left: 10px;
}
// 左边导航栏
.el-aside .el-submenu .el-icon-caret-left {
  position: absolute;
  right: -14px;
  display: inline;
}
.el-submenu .el-menu-item {
  min-width: 0px;
}
#active {
  background-color: #ffeb3a !important;
}
.is-active {
  background-color: #373737 !important;
}
.el-submenu .is-active::before {
  position: absolute;
  right: -10px;
  color: white;
  font-size: 35px;
  content: "◆";
}
.el-menu-item.is-disabled {
  opacity: 1;
  cursor: auto;
}
/deep/
  .el-tabs--card
  > .el-tabs__header
  .el-tabs__item.is-closable:first-of-type
  .el-icon-close {
  display: none;
}
</style>
