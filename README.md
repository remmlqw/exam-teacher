# 教务管理+在线考试系统

**项目采用 React + React Router 4.0 + Redux + Ant Design**

**开发环境使用Webpack搭建**

***

**项目演示地址**

```js
http://liqianwen.remmli.com:8080/#/login
```

**注意：演示地址并不是项目真实线上地址，只是演示而已~ 服务器带宽太低，所以打开较慢...请谅解**

***

前言
> 这个是本系统的教师端 学生端请点击：[在线考试系统（学生端）](https://github.com/remmlqw/exam-student)

### 功能模块

- 登录

- 主页面
    - 左边菜单
    - 顶部导航
    - 快速进入版块

- 试题录入（根据后台数据自动生成选项）
    - java
      - 初级
        - 单选题、多选题、填空题、判断题、简答题、程序题
      - 中级
      - 高级
    - 前端
      - 初级
      - 中级
      - 高级

- 出卷 （教师出卷）

- 成绩查询（查询学生成绩）

- 学生信息管理
    - 添加学生
    - 删除学生
    - 修改学生
    - 查询学生

- 教师信息管理（超级管理员权限）
    - 添加教师
    - 删除教师
    - 修改教师
    - 查询教师

- 班级信息管理
    - 添加班级
    - 删除班级
    - 修改班级
    - 查询班级

- 考试管理
    - 创建考试
    - 在线阅卷（选择、判断机器阅卷，填空、简答、程序人工阅卷，教师需要管理员授予权限才能阅卷）
      - 所有班级的试卷
        - 某班级所有学生的试卷
          - 某个学生的试卷（开始评分）

- 个人中心
    - 修改密码

### 角色管理
- 教学老师（试题录入、出卷、成绩查询、学生管理、班级管理、考试）
- 教务老师（试题录入、出卷、成绩查询、学生管理、班级管理、考试）
- 超级管理员（教师一般权限，教师管理权限，授予教师阅卷权限）

### 代码目录
```js
+-- data/                                   ---假数据模拟
+-- dist/                                   ---打包的文件目录
+-- node_modules/                           ---npm下载文件目录
+-- src/                                    ---核心代码目录
|   +-- assets                              ---静态资源目录，包括css、images等
|   +-- actions                             ---Redux actions
|   |    --- ...
|   +-- reducers                            ---Redux reducers
|   |    --- ...
|   +-- store                               ---Redux store
|   |    --- ...
|   +-- constants                           ---Redux 的 actions 和 reducers 都会用到的常量，统一放在这里
|   |    --- ...
|   +-- components                          ---组件（木偶组件）目录 放置公用组件
|   |    --- BreadcrumbCustom.js            ---面包屑组件  
|   |    --- httpServer.js                  ---http请求封装组件
|   +-- containers                          ---页面（智能组件）目录
|   |    +-- login                          ---登陆界面        
|   |    |    --- index.js
|   |    +-- main                           ---主界面
|   |    |    +-- q_checkin                 ---试题录入
|   |    |    |    +-- subpage              ---子模块
|   |    |    |    |    --- q_single.js     ---选择题录入子模块
|   |    |    |    |    --- q_fill_in.js    ---填空题录入子模块
|   |    |    |    |    --- ...             ---其他题型录入子模块
|   |    |    |    --- index.js
|   |    |    +-- choose_questions          ---出卷
|   |    |    |    +-- subpage              ---子模块
|   |    |    |    |    --- choose_card.js
|   |    |    |    --- index.js
|   |    |    +-- score_search              ---成绩查询
|   |    |    |    --- index.js
|   |    |    +-- student_manage            ---学生管理
|   |    |    |    --- add_student.js       ---添加学生
|   |    |    |    --- query_student.js     ---查询、修改、删除学生
|   |    |    +-- teacher_manage            ---教师管理
|   |    |    |    --- add_student.js       ---添加教师
|   |    |    |    --- query_student.js     ---查询、修改、删除教师
|   |    |    +-- class_manage              ---班级管理
|   |    |    |    --- add_student.js       ---添加班级
|   |    |    |    --- query_student.js     ---查询、修改、删除班级
|   |    |    +-- paper_manage              ---考试管理
|   |    |    |    --- create_exam.js       ---创建考试
|   |    |    |    +-- subpage              ---子模块
|   |    |    |    |    --- reading_card.js ---阅卷试题卡片子模块
|   |    |    |    --- scoring_paper.js     ---在线阅卷，所有班级的试卷，查询试卷
|   |    |    |    --- all_papers.js        ---某个班级的所有试卷
|   |    |    |    --- reading.js           ---某个学生的试卷答案
|   |    |    +-- personal_center           ---个人中心
|   |    |    |    --- change_manage.js     ---修改密码
|   |    |    +-- header_bar                ---顶部菜单
|   |    |    |    --- index.js     
|   |    |    +-- homepage                      ---主页
|   |    |    |    +-- subpage                  ---子模块
|   |    |    |    |    --- fast_enter_card.js  ---快速进入卡片子模块
|   |    |    |    --- index.js     
|   |    |    --- index.js
|   --- index.js                            ---项目的整体js入口文件
--- postcss.config.js                       ---postcss插件配置文件，用于css代码压缩
--- webpack.config.js                       ---webpack开发环境配置
--- webpack.production.config.js            ---webpack生产环境配置
--- index.html                              ---首页入口html文件
--- package.json
--- package-lock.json                               
```

### 主要功能截图
**登录**

![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/login.png)

**主界面**

![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/main.png)

**试题录入**

![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/luru.png)

**出卷**

![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/chujuan.png)

**成绩查询**

![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/score_search.png)

**班级管理**
学生管理、教师管理、班级管理 界面雷同 所以只放了班级管理的截图

添加班级
![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/add_class.png)

查询、删除
![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/query_class.png)

修改班级
![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/xiugai.png)

**考试管理**

创建考试
![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/create_exam.png)

所有班级的试卷
![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/scoring.png)

某个班级所有的试卷
![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/all_papers.png)

教师在线阅卷
![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/reding.png)

**个人中心**

![Image text](https://raw.githubusercontent.com/remmlqw/img-folder/master/person.png)

### 安装运行
##### 1.下载或克隆项目源码
##### 2.npm安装相关包文件
```js
npm i
```
##### 3.启动项目
```js
npm start
```
##### 4.打包项目
```js
npm run build
```
