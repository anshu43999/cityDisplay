<!--  -->
<template>
<div class='details_wrap'>
    <!-- details -->
    <my-header></my-header>
    <div class="back" @click="back">
        <i class="iconfont iconfanhui"></i>
        <span>返回</span>
    </div>

    <div class="details_main">
        <div class="details_tab">
            <ul @click="check_options">
                <li :class=" activated === 1? 'btn_acive':'btn_opstions'">接警单</li>
                <li :class=" activated === 2? 'btn_acive':'btn_opstions'">处警单</li>
                <li :class=" activated === 3? 'btn_acive':'btn_opstions'">反馈单</li>
            </ul>
        </div>

        <div class="centext_main">
            <div class="centext_main_title">
                <div class="title_bg">
                    接警单详情
                </div>
            </div>
            <div class="centext_main_details">
                <div class="main_details_l">
                    <div v-for="(value,key,index) in detailData"  :key="index" :class="index === 0 ?  'spans_wrap':'span_wrap'">
                        <span class="span_title">{{key}}</span>
                        <span class="span_main">{{value}}</span>
                    </div>
                </div>
                <div class="main_details_r">
                    <div v-for="(value,key,index) in detailData2" :key="index" class="span_wrap">
                        <span class="span_title">{{key}}</span>
                        <span class="span_main">{{value}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
    import MyHeader from "../components/Header";
export default {
//import引入的组件需要注入到对象中才能使用
components: {MyHeader},
data() {
//这里存放数据
return {
    getDataUrl : this.apiRoot + 'JJDB/findALbyId',
    activated : 1 , // active
    detailData : {
        '报警内容'  :"",
        "警情地址" : '',
        "报警时间" : "",
        "报警人姓名" :'',
        "报警电话" : '',
        "报警方式" : '',
        "来话类型代码" : '',
        "被困人员情况说明" : '',
        "受伤人员情况说明" : '',
    },
    detailData2 : {
        "接警单编号" :'',
        "接警类型" :'',
        "接警单位代码" :'',
        "接警时间" :'',
        "接警完成时间" :'',
        "警情分类代码" :'',
        "警情类型代码" :'',

        "警情细类代码" :'',
        "更新时间" :'',
        "死亡人员情况说明" :'',
    }

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    //    返回
    back(){
        this.$router.go(-1);
    },
    check_options(e){
        console.log(e.target.innerText);
        // console.log(e.target.);
        function alertBox() {
            $("#msg").remove();
            let pWidth=200;
            let content='此功能正在建设中...';
            var html ='<div id="msg" style="position:fixed;top:50%;width:100%;height:30px;line-height:30px;margin-top:-15px;"><p style="background:#000;opacity:0.8;width:'+ pWidth +'px;color:#fff;text-align:center;padding:10px 10px;margin:0 auto;font-size:12px;border-radius:4px;">'+ content +'</p></div>'
            $("body").append(html);
            var t=setTimeout(next,2000);
            function next()
            {
                $("#msg").remove();

            }
        }
        switch (e.target.innerText) {
            // case '接警单':
            //     $("#msg").remove();
			// 		let pWidth=200;
			// 		let content='正在开发，尚未开发';
            //         var html ='<div id="msg" style="position:fixed;top:50%;width:100%;height:30px;line-height:30px;margin-top:-15px;"><p style="background:#000;opacity:0.8;width:'+ pWidth +'px;color:#fff;text-align:center;padding:10px 10px;margin:0 auto;font-size:12px;border-radius:4px;">'+ content +'</p></div>'
            //         $("body").append(html);
            //         var t=setTimeout(next,2000);
            //         function next()
            //         {
            //             $("#msg").remove();

            //         }
                
            //     break;

            case '处警单':
                alertBox();
                break;
            case '反馈单':
                alertBox();
                break;
            default:
                break;
        }

    },
    getData(){
        this.$http.get(this.getDataUrl,{
            params : {
                jjdbh : this.$route.query.dm
            }
        })
        .then(function(res){
            console.log(res);
            this.detailData = {
                '报警内容'  :res['data'][0]['bjnr'],
                "警情地址" : res['data'][0]['jqdz'],
                "报警时间" : res['data'][0]['bjsj'],
                "报警人姓名" :res['data'][0]['bjrxm'],
                "报警电话" : res['data'][0]['bjdh'],
                "报警方式" : res['data'][0]['bjfsdm'],
                "来话类型代码" : res['data'][0]['lhlx'],
                "被困人员情况说明" : res['data'][0]['bkryqksm'],
                "受伤人员情况说明" : res['data'][0]['ssryqksm'],
            };
            this.detailData2 = {
                "接警单编号" :res['data'][0]['jjdbh'],
                "接警类型" :res['data'][0]['jjlx'],
                "接警单位代码" :res['data'][0]['jjdwdm'],
                "接警时间" :res['data'][0]['jjsj'],
                "接警完成时间" :res['data'][0]['wcsj'],
                "警情分类代码" :res['data'][0]['jqlbdm'],
                "警情类型代码" :res['data'][0]['jqlxdm'],

                "警情细类代码" :res['data'][0]['jqxldm'],
                "更新时间" :res['data'][0]['gxsj'],
                "死亡人员情况说明" :res['data'][0]['swryqksm'],
            }
            console.log(this.detailData)


        }.bind(this))

    }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.getData();

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
.back{
    cursor: pointer;
    position: fixed;
    left: 2%;
    top: 8%;
    z-index: 10;
}

.details_wrap{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;

    .details_main{
        width: 100%;
        flex: 1;
        padding: 0 1.43rem 1.43rem;
        display: flex;
        flex-direction: column;
        .details_tab{
            width: 100%;
            height: 8%;
            ul{
                display: flex;
                height: 100%;
                li{
                    cursor: pointer;
                    width: 8%;
                    height: 3rem;
                    line-height: 3rem;
                    font-size: 1.22rem;
                    margin: 0 1.22rem;
                    text-align: center;
                    // padding: 0 1.22rem;
                }
                .btn_opstions{
                    background: url("../assets/images/index/normal.png");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
                .btn_acive{
                    background: url("../assets/images/index/active.png");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }


            }

        }
        .centext_main{
            flex: 1;
            width: 100%;
            height: 92%;
            background: url("../assets/images/index/proportionBg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            .centext_main_title{
                height: 16%;
                display: flex;
                justify-content: center;
                align-items: center;
                .title_bg{
                    width: 15%;
                    height: 50%;
                    background : url('../assets/images/index/title_bg.png');
                    background-size:100% 100%;
                    background-repeat: no-repeat;
                    font-size: 2.0rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #00f1e3;
                }
            }
            .centext_main_details{
                width: 100%;
                height: 80%;
                display: flex;
                padding: 0 3%;
                flex-direction: row;
                .main_details_l{
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    .span_wrap{
                        height: 10%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .span_title{
                            height: 70%;
                            color: #ffe754;
                            display: inline-block;
                            width: 20%;
                            background :url('../assets/images/index/span_title.png');
                            background-size: 100% 100%;
                            text-align: center;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 1.2rem;
                        }
                        .span_main{
                            height: 70%;
                            width: 80%;
                            display: inline-block;
                            display: flex;
                            // justify-content: center;
                            align-items: center;
                            font-size: 1.2rem;
                            // text-align: left;
                            padding: 0 4%;
                            white-space:nowrap;
                            overflow: hidden;
                        }
                    }
                    .spans_wrap{
                        height: 20%;
                        display: flex;
                        .span_title{
                            height: 35%;
                            color: #ffe754;
                            display: inline-block;
                            width: 20%;
                            background :url('../assets/images/index/span_title.png');
                            background-size: 100% 100%;
                            text-align: center;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 1.2rem;
                        }
                        .span_main{
                            width: 80%;
                            display: inline-block;
                            padding: 2%;
                            // display: flex;
                            // justify-content: center;
                            // align-items: center;
                            font-size: 1.2rem;
                            // text-indent: 30px;
                            padding: 0 4%;
                            overflow: hidden;
                        }
                    }

                }
                .main_details_r{
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    .span_wrap{
                        height: 10%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .span_title{
                            height: 70%;
                            color: #ffe754;
                            display: inline-block;
                            width: 20%;
                            background :url('../assets/images/index/span_title.png');
                            background-size: 100% 100%;
                            text-align: center;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 1.2rem;
                        }
                        .span_main{
                            height: 70%;
                            width: 80%;
                            display: inline-block;
                            display: flex;
                            // justify-content: center;
                            align-items: center;
                            font-size: 1.2rem;
                            padding: 0 4%;
                            white-space:nowrap;
                            overflow: hidden;
                        }
                    }
                }
            }

        }
    }
}
</style>