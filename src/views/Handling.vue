<!--  -->
<template>
<div class='handling_wrap'>
    <my-header :topTitle='topTitle'></my-header>

    <div class="main">
        <div class="goLawCase" @click="skiping">
            <div class="box">
                <p>警情分析</p>
            </div>
            <i class="iconfont iconxiangyou1"></i>
        </div>
        <div class="main_l main_box">
            <div class="title_wrap">今日各市立案数</div>
            <div class="main_centent">
                <div class="centent_top">
                    <table class="table_wrap">
                        <tr>
                            <td>序号</td>
                            <td>地市</td>
                            <td>立案数</td>
                        </tr>
                        <tr v-for="(item,index) in rankLeft" :key="index">
                            <td class="noNum">{{index +1}}</td>
                            <td class="cityName">{{item['city']}}</td>
                            <td class="cityNum">{{item['value']}}</td>
                        </tr>
                    </table>

                    <table class="table_wrap">
                        <tr>
                            <td>序号</td>
                            <td>地市</td>
                            <td>立案数</td>
                        </tr>
                        <tr v-for="(item,index) in rankRight" :key="index">
                            <td class="noNum">{{index +7}}</td>
                            <td class="cityName">{{item['city']}}</td>
                            <td class="cityNum">{{item['value']}}</td>
                        </tr>
                    </table>

                </div>

                <div class="centent_bottom" >
                    <div id="chartsOne">

                    </div>

                </div>

            </div>


        </div>

        <div class="main_c main_box">
            <span>{{total}}</span>

        </div>

        <div class="main_r main_box">
            <div class="title_wrap">今日各类别案件数</div>
            <div class="main_centent">
                <table>
                    <tr>
                        <td class="td_left">案件类</td>
                        <td class="td_right">数量</td>
                    </tr>
                    <tr v-for="(value,key,index) in typeNum"   :key="index">
                        <td class="td_left" v-if="key === 'null'"></td>

                        <td class="td_left" v-else>{{key}}</td>


                        <td class="td_right"> {{value}}  </td>
                    </tr>
                </table>
                
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

components: {
    MyHeader
},
data() {
//这里存放数据
return {
    // topTitle :'山西省公安厅情报指挥中心全流程执法办案平台',
    topTitle : '全省公安机关受立案情况统计',
    typeNum : {
        "失火案" : 0,
        "容留他人吸毒案" : 0,
        "敲诈勒索案" : 0,
        "危险驾驶案" : 0,
        "故意伤害案" : 0,
        "妨碍公务案" : 0,
        "诈骗案" : 0,
        "盗窃案" : 0,
        "故意毁坏财物案" : 0,
        "拒不执行判决案" : 0,
        "贷款诈骗案" : 0,
        "交通肇事案" : 0,
        "虚开增值税专用发票、  用于骗取出口退税、抵扣税款发票案" : 0,
        "其他" : 0,
    },
    citySource: ['太原市', '大同市', '朔州市', '忻州市', '吕梁市', '晋中市', '阳泉市', '长治市', '晋城市', '临汾市', '运城市'],
    citySource1: ['太原', '大同', '朔州', '忻州', '吕梁', '晋中', '阳泉', '长治', '晋城', '临汾', '运城'],
    // caseNum : [23223,42321,53132,336,4336,733,4337,5337,8334,5338,5338],
    rankLeft : [],
    rankRight : [],
    rankSum : [
        {city : '太原市',value :0},
        {city : '大同市',value :0},
        {city : '朔州市',value :0},
        {city : '忻州市',value :0},
        {city : '吕梁市',value :0},
        {city : '晋中市',value :0},
        {city : '阳泉市',value :0},
        {city : '长治市',value :0},
        {city : '晋城市',value :0},
        {city : '临汾市',value :0},
        {city : '运城市',value :0},
    ],
    roseSum : [
       { city : '太原市',value:0},
       { city : '大同市',value:0},
       { city : '朔州市',value:0},
       { city : '忻州市',value:0},
       { city : '吕梁市',value:0},
       { city : '晋中市',value:0},
       { city : '阳泉市',value:0},
       { city : '长治市',value:0},
       { city : '晋城市',value:0},
       { city : '临汾市',value:0},
       { city : '运城市',value:0},

    ],
    total :0,



};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getRoseData(){
        this.$http.get(this.apiRoot+'processHandling/findProcessCase',{
            // params : {}
        })
        .then(function(res){
            // console.log(res);
            let listData = res.data;
            this.total = listData['total'];
            this.typeNum = listData['caseCategory'] ;
            // Object.keys(listData['caseCategory']).forEach((item,index)=>{
            //     if(item === 'null'){


            //     }
            // })


            this.rankSum = listData['cityNum']                
            this.roseSum = listData['cityPercentage'];
            
            
            
            this.dispose();
            this.randerCharts();

            
        }.bind(this))

    },
    randerCharts(){

        let myChart = this.$echarts.init(document.getElementById('chartsOne'));
        //影响组织TOP柱状图
        let xArr = [];
        let yArr = [];
        this.roseSum.forEach( (item,index)=>{
            xArr.push( item['city'])
            yArr.push(
                { 
                    value : item['value'],
                    itemStyle: {
                        normal: {
                            barBorderRadius: [0, 10, 10, 0],
                            color: {
                                type: 'bar',
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(11,42,84,.3)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#4f9aff' // 100% 处的颜色
                                }],
                                globalCoord: false, // 缺省为 false
                            }
                        }
                    }
                }
            )
        } )


        let option = {
            grid: {
                top: '10%',
                left: '15%',
                right: '4.75%',
                bottom: '0',
                containLabel: true
            },
            yAxis: [{
                type: 'category',
                data: xArr,
                inverse: true,
                axisTick: {
                show: false
                },
                axisLabel: {
                        color: '#fff',
                        fontSize: '16',
                        inside: true,
                        padding: [0, 0, 0, -80]
                    },
                axisLine: {
                show: false
                }
            }],
            xAxis: [{
                type: 'value',
                axisLabel: {
                show: false
                },
                axisLine: {
                show: false
                },
                splitLine: {
                show: false
                }
            }],
            series: [{
                type: 'bar',
                barWidth: 14,
            
                data: yArr,
                label: {
                normal: {
                    show: true,
                    position: 'insideBottomRight',
                    formatter: '{c}%',
                    distance: 0,
                    offset: [30, -20],
                    color: '#fff',
                    fontSize: 20 * this.scale,
                    padding: [3, 3, 3, 3],
                    backgroundColor: {
                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAA+CAYAAAD5wvNAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjQ3NTQ1RkVGOUM1MTFFOEJCQTdENzhFNjM5MzM3NkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjQ3NTQ1RkRGOUM1MTFFOEJCQTdENzhFNjM5MzM3NkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmE5M2UxZjIxLTQyMmYtMTE3Yy05MTVlLWVhNzA0NDUwYzIzOSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmE5M2UxZjIxLTQyMmYtMTE3Yy05MTVlLWVhNzA0NDUwYzIzOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvulhDwAAAQ3SURBVHja7J1JaBRBGIX/iZEQN1CjwVxUcL+4hUnUU8SDHjQiiqJR0EOCYMAtIG4HRQXBBUQkXgQxxoOieJZ4UzO4oAe3CKJoQI2IGhUTZHz/dI12mul090xcJvU+ePSkpqsTXr1Ud81Ud8UW1SZFYuJgtsn0z+Iqd+2TFPHWGY1tFVSJ96ZgOx5lo7AdDBX9OmbMczx3mas8076BZQUhfoe3ns+xve/7/X6JcpyIZRK17u+2+I7tF5S/w+vneP0YuoXX16G33mMk5kkkCiV7RkLroNXQbE/Tk39HkdEIaDK00JTr//kd6Dx0FnqfzcELsqgzBjoCvYCOQuUMS14QM22lbfYSOgGV/cnAaG/UAD2FtkKD2QZ5yyBoE/QkfkMaoIF9HZiJerqDDkND6He/YYhp0wRCM62vAlMN3YZm0t9+ywyoNX5TluYamFroEjSMnlrR21xEaGqzDcxGqBEaQC+tQdu6MX4r1faRArPEXEUTOzkRb01lIFRgpkJN7Fms72maEJqpQYHR4VUzR0LEZKA5nug55PYGZjM0nV4Rg2Zhi19g9FO/vfSIeNiDXqYsU2B28lREfE5Nu7yBKYE20Bviw3r0MiXuwNRAxfSF+FBsMtIjMIT0xpp0YEZDs+gHCWC2XvxqYOYL57OQYDQjVRqYCnpBQlKugZlCH0hIJmtgJtAHEpKJGphS+kBCUqqBGUofSEiGFtADEgUGhjAwhIEhDAzJQ7o0MJ/pAwnJZw3MG/pAQvJBA/OMPpCQtGlgHtMHEpInGphW+kBCckcDo08mStILEoBmpCV90XuXfpAA7ibi0p7+HOYc/SAB6KPOxB2Yb/SE+KDZOOsOTAd0hr4QH87gdNThDoxyAOqkN8RDp8mGeAPTDu2jP8TDfr3YzRQY5Th0jx4Rg2bhmLvAG5huaCX0iV5Zj34pvQq9S3dvgVHaoLXQD3pmLdr2NYmK1DOZJSgwylWonr5ZSz3CcjXTG71NoDoF1bGnsa5nqUtUptpeogZGOQ0t5zWNNcPnFYk5qTaXbAOjXBFnUQOOnvov96EKhOVy0I5h5/TqhXClOI+u4lcI/Qdty91QPDFXHoapEGUSeBd0UJyFKnRs/oV+5y1foZPQJATlANQVtmI2dw28Fmf5m3Fmq4s2cT7N/096gS1ts7HiLH/zKupBclmRrcP0NCq9ob9KnGfN6NOjnSX8nCcwDmRb/VW6zQWss4SfyCNxZlXqRLmcJ/wX9tEfqX/IBaN84RC0I8dj6Opm22xKo803sulziZtyqK91t9tmms2B0XO6Ppv4WhZ1W0zdJANjFzo6qJZod07o/Odlpq4wMHYOMRdLuBv6dB9d1vejrWYxMA46olhktrnsw8BYhPYeC3x6j84IvRADYxEPMlyfZHOdw8BYhHsElB5JtdAWh0JakBH9jGW4OJ9UN9GO3/wUYAAaXtVsjsG1HQAAAABJRU5ErkJggg=='
                    }
                }
                },
                itemStyle: {
                normal: {
                    barBorderRadius:4
                }
                }
                
            }, 
            {
                type: "bar",
                barWidth: 14,
                xAxisIndex: 0,
                barGap: "-100%",
                data: [100, 100,100, 100,100, 100,100, 100,100, 100,100],
                itemStyle: {
                normal: {
                    color: "#444a58",
                    barBorderRadius: 4
                }
                },
                zlevel: -1
            }
            ]
        };
        myChart.setOption(option);

    },

    dispose(){
        this.rankLeft = [];
        this.rankRight = [];
        this.rankSum.sort( function(a,b){
            return b.value - a.value
        })
        // console.log(this.rankSum);
        this.rankSum.forEach( (item,index)=>{
            if(index <6){
                this.rankLeft.push(item);
            }else{
                this.rankRight.push(item);
            }
        })
        // console.log(this.rankLeft)
        // console.log(this.rankRight);

    },
    skiping(){
        this.$router.push({ path : '/index/home'})
    }
    





},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    clearInterval(counter);
    counter = null;

    // console.log(counter);
    this.getRoseData();
    // this.randerCharts();
    // this.dispose();
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
.handling_wrap{
    display: flex;
    flex-direction: column;
    height: 100%;

    font-size: 1.2rem;
    font-weight: 550;

    .main{
        flex: 1;
        display: flex;
        justify-content: space-around;
        margin-top: 1rem;
        margin-bottom: .6rem;
        height: 100%;
        position: relative;
        .goLawCase{
			position: fixed;
			top: 7%;
			right: 1.5%;
			width: 12%;
			height: 4.6%;
			.box {
				background: url("../assets/images/index/box.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-position: center;
				cursor: pointer;
				height: 100%;
				width: 76%;
				float: right;

				p {
					width: 100%;
					height: 100%;
					color: #5ae6ff;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.iconfont{
				font-size: 1rem;
				position: absolute;
				left: 0;
				top:0;
				color:#5ae6ff;
				width: 17%;
				height: 100%;
    			animation: myLeft 2s;
				animation-iteration-count: infinite;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			@keyframes myLeft {
				0%{
					left: 0rem;
				}
				50%{
					left: 1.2rem;
				}
				 100%{
					left: 0rem;
				}
			}

		}
        .main_box{
            width: 32%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .title_wrap{
                height: 6%;
                width: 98%;
                margin-right: 2%;
                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 1.3rem;
                font-weight: 600;
                background: linear-gradient(-180deg, #ffffff 50%, #0731FF 70%);
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
            }
            .main_centent{
                height: 94%;
                padding: 0 6% 6%;
               
            }
        
        }
        .main_l{
            background-image: url('../assets/images/index/m1.png');
            background-size: 100% 100%;
            .main_centent{
                .centent_top{
                    height: 40%;
                    display: flex;
                    justify-content: space-between;

                    table{
                        width: 45%;
                        height: 100%;
                        tr{
                            td{
                                text-align: center;
                                font-size: 1.2rem;
                                font-weight: 550;
                            }
                            .noNum{
                                color: #3effeb;
                            }
                            .cityName{
                                color: #5abcff
                            }
                            .cityNum{
                                color: #ffe754;
                            }
                        }
                    }

                }
                .centent_bottom{
                    height: 60%;
                    #chartsOne{
                        width: 100%;
                        height: 100%;
                    }

                }
            }

        }
        .main_c{
            background: url('../assets/images/handling/circle.png');
            background-repeat: no-repeat;
            // background-size: center; 
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                font-size: 5rem;
                color: #ffe754;
                // box-shadow:-60px 10px 60px rgba(0, 204, 204, 0.5) inset;
                // background: -webkit-linear-gradient(45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
            }

        }
        .main_r{
            background-image: url('../assets/images/index/m1.png');
            background-size: 100% 100%;
            .main_centent{
                table{
                    width: 90%;
                    height: 100%;
                    margin-left:10%; 
                    tr{
                        td{
                            // text-align: center;
                        }
                        .td_left{
                            width: 70%;
                            color: #58bdff;
                            text-align: left;
                        }   
                        .td_right{
                            width : 20%;
                            color: #fee752;
                            text-align: center;

                        }
                    }
                }
            }

        }
    }

}
</style>