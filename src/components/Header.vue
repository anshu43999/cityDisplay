<!--  -->
<template>
<div id='header_wrap'>
     <!--<div class="jkBtn">
        全流程执法办案
    </div> -->
    <div id="header_main">
        <div class="main_center" style="">
            <div id="header_title">{{topTitle}}公安局情报指挥中心警情分析统计系统</div>
        </div>
        <time id="headerTime"></time>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
// props : ['topTitle'],
components: {},
data() {
//这里存放数据
return {
    topTitle:'太原市',
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
/*    handleClick(e){
        this.$parent.filter(e);
    }*/
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

#header_wrap{
    // background-color: #011426;
    height:8rem;
    position: relative;
    overflow: hidden;
    z-index: 9;

    .jkBtn{
        width: 3rem;
        height: 1rem;
        // background: url()
        // background: url('../assets/images/index/jkbtn.png');
        background-repeat:no-repeat;
    }
    #header_main{
        background-image: url('../assets/images/index/top2.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 99% 90%;
        width: 70%;
        height: 5rem;
        margin:0 auto;
        .main_center{

            margin: 0 auto;
            width:40%;
            display : flex;
            justify-content: center


        }
    }
    #header_title{
        height: 7rem;
        overflow: hidden;
        line-height: 7rem;
        text-align: center;
        font-size:2rem;

        font-weight: 600;
        // background: linear-gradient(-180deg, #ffffff 50%, #0731FF 70%);
        // -webkit-background-clip: text;
        // color: transparent;
        // -webkit-text-fill-color: transparent;
        // text-fill-color: transparent;
    }
    #headerTime{
        overflow: hidden;
        font-size: 2rem;
        display: block;
        margin: -1.2rem auto 0;
        text-align: center;
        font-weight: bold;
        color: #05ede0;
    }
}
</style>
