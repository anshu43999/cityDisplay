<!--  -->
<template>
    <div class='r'>
        <div class="r-t">
            <h3>{{title_h3[0]}}</h3>
            <div class="main_context">
                <div class="main_context_wrap">
                    <div class="sum_type"  v-for="(value,key,index)  in sumData" :key="index">
                        <div class="sum_type1">{{key}}</div>
                        <div :class="index === 0 ? 'sum_type2' : index === 1 ? 'sum_type3' : 'sum_type4'  ">{{value}}</div>
                    </div>
                </div>
            </div>            
        </div>
        <div class="r-b">
            <h3>{{title_h3[1]}}</h3>

            <div class="main_top">
                <div class="main_context">
                    <div class="sum_type" v-for="(value,key,index) in b_sumData" :key="index">
                        <div>
                            <span class="sumTypeTitle">{{key}}</span>
                            
                            <span v-if="index ===0 || index ===3" class="sumType1">{{value}}</span>

                            <span v-else-if="index ===1 || index ===4" class="sumType2">{{value}}</span>

                            <span v-else-if="index ===2 || index ===5" :class="value<0 ? 'sumType3':value>0 ? 'sumType4':'sumType5' ">
                                {{Math.abs(value)}}
                                <i v-if="value<0" class="iconfont iconxiangshang-copy"></i> 
                                <i v-else-if="value>0"   class="iconfont iconxiangshang"></i>
                                <i v-else class="iconfont iconchiping"></i>
                            </span>
                        </div>
                    </div>

                </div>

            </div>


            <div class="main_context">
                <div class="main_context_left">
                    <div id="charts_wrap">
                    </div>
                </div>
                <div class="main_context_right">
                    <ul class="main_context_list">
                        <li   v-for="(item,key,index) in ratio" :key="index">
                            <span>{{key}}</span>
                            <span :class="item<0 ? 'decline':  item>0 ? 'rise'  :'striping' ">{{Math.abs(item)}}%  
                                <i v-if="item<0" class="iconfont iconxiangshang-copy"></i> 
                                <i v-else-if="item>0"   class="iconfont iconxiangshang"></i>
                                <i v-else class="iconfont iconchiping"></i>    
                            </span>
                        </li>
                    </ul>  
                </div>
               
                
            </div>    

        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
//import引入的组件需要注入到对象中才能使用
        props: ['typeAnalyze'],
        components: {},
        data() {
//这里存放数据
            return {
                show: true,
                //图表公用
                refreshCharts: [],
                chartsObj: {},
                axisesColor: '#36b2ae',
                //缩放值
                scale: 1,
                //标题
                chartTitle: [],
                mapData: {name: '报警事件总数', value: 96666},

                title_h3: ['警情统计监测','警情环比分析'],
                

                startDate:'',
                endDate:'',
                myPeriod:{},
                xAxisData :[],    //近七日接警类型数据分析     x 轴
                findUrl : [
                    'recJJLXTJB/findSAlarmData',   //省 近七日接警类型数据分析
                    'recBJFSTJB/findSAlarmMode',   //省 近七日报警类型数据分析
                    'recLHLXTJB/findSIncomingType' //省 近七日来话类型数据分析

                ],
                tableData :[],
                sumData : {
                    "报警总数" : '18234',
                    "有效警情" : '2321',
                    "已处警数" : '1314',
                    "已反馈数" : '1314',
                    "有效警情占比" : '98%',
                    "已处警数占比" : '98%',
                    "已反馈数占比" : '98%'
                },
                b_sumData : {
                    "昨日报警总数" : 18363,
                    "前日报警总数" : 21312,
                    "报警总数环比" : 18363,
                    "昨日有效警情" : 18363,
                    "前日有效警情" : 18363,
                    "有效警情环比" : 18364,
                },
                ratio : {
                    '刑事警情' : -1   ,
                    '行政(治安)警情' : 4, 
                    '交通类警情' : -2, 
                    '消防救援' : 1, 
                    '群众求助' : 4, 
                    '应急联动事件' : 5, 
                    '纠纷' : 0,
                    '灾害事故': -2,
                }

                
             };
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {},
//方法集合
        methods: {
            //获取缩放值
            getScale() {
                this.scale = localStorage.getItem('scale');
            },


            renderChart() {
                let myCharts = document.querySelectorAll('.chart');
                myCharts.forEach(value => {
                    this.refreshCharts.push(value.getAttribute('id'))
                });
                let that = this;
                switch (this.$route.query.title) {
                    case "全省接警类型数据分析":
                        this.show = true;
                        this.chartTitle = [
                            '接警类型数据分析',
                            '接警类型占比分析',
                            '接警类型地市分析'
                          
                        ];

                        this.myPeriod=JSON.parse(sessionStorage.getItem('jjlx'));
                        this.startDate=this.myPeriod.start;
                        this.endDate=this.myPeriod.end;
                        break;
         
                }
                
                let Index = {
                    init() {
                        this.loadData();
                        Public.chartsResize(that.chartsObj);
                        Public.chartsReDraw(that.chartsObj, null, [
                            ''
                        ], that.refreshCharts)
                    },
                    loadData() {
                        
                     
                        
                    },
                };
                Index.init();

            },
            // 省市  时间选择是否存在
            pdFilter_btn() {
                let str = this.$route.query.title;

                str = str.substring(0, 1);
                // console.log(str);

                if (str == '全') {
                    this.$emit('filter_btn', true)
                } else {
                    this.$emit('filter_btn', false)
                }
            },
           
            checkBtn(e){
                if(e.target.nodeName === "LI"){
                    this.leftList.forEach( (item,index)=>{
                        if(item == e.target.innerText){
                            this.activeBtn = index;
                            this.cityTypeNUm = [];
                            this.roseSource = [];   
                            let num ;
                            if(this.tableData){

                                this.citySource.forEach( (val,i)=>{

                                    this.cityTypeNUm.push( {city :this.citySource1[i],value:parseInt(this.tableData[item][val]),type : item });

                                    this.roseSource.push({name : val, value : this.tableData['rose'][item][val]  })
                                } )
                                this.roseSource.sort( function (a,b) {
                                    return b.value - a.value;
                                })

                            }
                        }
                    })
                    this.typeCity();
                    // this.roseMap();

                }
            },
            randerCharts(){
                let that = this;
                let myChart = this.$echarts.init(document.getElementById('charts_wrap'));
                var myData = ['刑事警情', '行政(治安)警情', '交通类警情', '消防救援', '群众求助', '应急联动事件', '纠纷','灾害事故']
                var lineData = [100, 100, 100, 100, 100, 100, 100,100]
                var lastYearData = {
                    1: [3, 20, 62, 34, 55, 65, 33,90]
                }
                var thisYearData = {
                    1: [11, 38, 23, 39, 66, 66, 79,90]
                }
                var timeLineData = [1];
                var option = {
                    baseOption: {
                        // backgroundColor: background,
                        timeline: {
                            show: false,
                            top: 0,
                            data: []
                        },
                        legend : {
                            top : '2%',
                            left : '31%',
                            itemWidth : 22,
                            itemHeight : 22,
                            itemGap: 343,
                            icon : 'horizontal',
                            textStyle : {
                                color : '#ffffff',
                                fontSize : 20,
                            },
                            data: ['昨天', '前天']
                        },
                        grid: [{
                            show: false,
                            left: '5%',
                            top: '10%',
                            bottom: '8%',
                            containLabel: true,
                            width: '37%'
                        }, {
                            show: false,
                            left: '51%',
                            top: '10%',
                            bottom: '8%',
                            width: '0%'
                        }, {
                            show: false,
                            right: '2%',
                            top: '10%',
                            bottom: '8%',
                            containLabel: true,
                            width: '37%'
                        }],
                        xAxis: [{
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            position: 'top',
                            axisLabel: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            }
                        }, {
                            gridIndex: 1,
                            show: false
                        }, {
                            gridIndex: 2,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            position: 'top',
                            axisLabel: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            }
                        }],
                        yAxis: [{
                            type: 'category',
                            inverse: true,
                            position: 'right',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            data: myData
                        }, {
                            gridIndex: 1,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 20 
                                }

                            },
                            data: myData.map(function(value) {
                                return {
                                    value: value,
                                    textStyle: {
                                        align: 'center'
                                    }
                                }
                            })
                        }, {
                            gridIndex: 2,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false

                            },
                            data: myData
                        }],
                        series: []

                    },
                    options: []
                }

                option.baseOption.timeline.data.push(timeLineData[0])
                option.options.push({
                    series: [
                    {
                        type: 'pictorialBar',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        symbol: 'rect',
                        itemStyle: {
                            normal: {
                                color: 'rgba(3,147,114,0.27)'
                            }
                        },
                        barWidth: 10,
                        symbolRepeat: true,
                        symbolSize: 14,
                        data: lineData,
                        barGap: '-100%',
                        barCategoryGap: 0,
                        label: {
                            normal: {
                                show: true,
                                formatter: (series) => {
                                    return lastYearData[timeLineData[0]][series.dataIndex] 
                                },
                                position: 'insideTopLeft',
                                textStyle:{
                                    color: '#ffffff',
                                    fontSize: 20 * that.scale,
                                },
                                offset: [0, -25],
                            }
                        },
                        z: -100,
                            animationEasing: 'elasticOut',
                            animationDelay: function (dataIndex, params) {
                            return params.index * 30;
                        }
                    }, {
                        name: '昨天',
                        type: 'pictorialBar',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        symbol: 'rect',
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: new this.$echarts.graphic.LinearGradient(
                                        //右，下，左，上
                                        0, 0, 1,0, [{
                                            //0%位置的颜色
                                            offset: 0,
                                            color: '#ffba00'
                                        },
                                            {
                                                //100%位置的颜色
                                                offset: 1,
                                                color: '#f3ff6a'
                                            }
                                        ]
                                )
                            }
                        },
                        symbolRepeat: true,
                        symbolSize: 14,
                        data: lastYearData[timeLineData[0]],
                        animationEasing: 'elasticOut',
                        animationDelay: function (dataIndex, params) {
                            return params.index * 30 * 1.1;
                        }
                    },
                    {
                        type: 'pictorialBar',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        symbol: 'rect',
                        itemStyle: {
                            normal: {
                                color: 'rgba(54,215,182,0.27)'
                            }
                        },
                        barWidth: 10,
                        symbolRepeat: true,
                        symbolSize: 14,
                        data: lineData,
                        barGap: '-100%',
                        barCategoryGap: 0,
                        label: {
                            normal: {
                                show: true,
                                formatter: (series) => {
                                    return thisYearData[timeLineData[0]][series.dataIndex]
                                },
                                position: 'insideTopRight',
                                textStyle:{
                                    color: '#ffffff',
                                    fontSize: 20* that.scale,
                                },
                                offset: [0, -25],
                            }
                        },
                        z: -100,
                            animationEasing: 'elasticOut',
                            animationDelay: function (dataIndex, params) {
                            return params.index * 30;
                        }
                    }, {
                        name: '前天',
                        type: 'pictorialBar',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        symbol: 'rect',
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: new this.$echarts.graphic.LinearGradient(
                                        //右，下，左，上
                                        0, 0, 1,0, [{
                                            //0%位置的颜色
                                            offset: 0,
                                            color: '#006cff'
                                        },
                                            {
                                                //100%位置的颜色
                                                offset: 1,
                                                color: '#00fcff'
                                            }
                                        ]
                                )
                            }
                        },
                        symbolRepeat: true,
                        symbolSize: 14,
                        data: thisYearData[timeLineData[0]],
                        animationEasing: 'elasticOut',
                        animationDelay: function (dataIndex, params) {
                            return params.index * 30 * 1.1;
                        }
                    }
                    ]
                });
                myChart.setOption(option);
            }

        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            clearInterval(counter);
            counter = null;
            let sessionStorage = window.sessionStorage;
            sessionStorage.setItem('city','1');
           
            this.pdFilter_btn();   // 判断筛选框是否显示
            this.getScale();    //获取缩放值
            //  this.getShen();
             this.randerCharts();
            


        },
        beforeCreate() {
        }, //生命周期 - 创建之前
        beforeMount() {
        }, //生命周期 - 挂载之前
        beforeUpdate() {
        }, //生命周期 - 更新之前
        updated() {
        }, //生命周期 - 更新之后
        beforeDestroy() {
        }, //生命周期 - 销毁之前
        destroyed() {
        }, //生命周期 - 销毁完成
        activated() {

        }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='scss' scoped>
    //@import url(); 引入公共css类
    h3 {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        letter-spacing: 2px;
    }

    

    .r {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .r-t{
            width: 100%;
            height: 20%;
            background: url('../assets/images/particulars/r-t.png');
            background-repeat: no-repeat;
            background-size:100% 100%; 
            h3{
                height: 21%;
                font-size: 1.5rem;
                font-weight: 550;
            }
            .main_context {
                height: 72%;
                display: flex;
                flex-direction:row; 
                justify-content: center;
                align-items: center;

                .main_context_wrap{
                    width: 100%;
                    height: 60%;
                    display: flex;
                    justify-content: space-around;
                    .sum_type{
                        font-size: 1.3rem;
                        font-weight: 550;
                        >div{
                            height: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            
                        }
                        .sum_type1{
                            
                        }
                        .sum_type2{
                            color: #03ffe0
                        }
                        .sum_type3{
                            color:#03ffa8
                        }
                        .sum_type4{
                            color: #ffe760
                        }
                    }
                }   
            }
        }
        .r-b{
            width: 100%;
            height: 68%;
            background: url('../assets/images/particulars/r-b.png');
            background-repeat: no-repeat;
            background-size:100% 100%; 
            h3{
                height: 6%;
                font-size: 1.5rem;
                font-weight: 550;
            }
            .main_top{
                width: 99.5%;
                margin-left:.5%; 
                height: 24%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 2px solid #01e9dc;
                .main_context {
                    height: 72%;
                    display: flex;
                    flex-direction:row; 
                    justify-content: space-around;
                    font-size: 1.3rem;
                    font-weight: 550;
                    flex-wrap: wrap;
                    .sum_type{
                        width: 33%;
                        height: 50%;
                        >div{
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .sumTypeTitle{
                                margin-right: 1rem; 
                            }
                            .sumType1{
                                -webkit-line-clamp: 2;
                                background-image: -webkit-linear-gradient(right, rgba(243,255,106,1),rgba(255,186,0,1));
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                            }
                            .sumType2{
                                -webkit-line-clamp: 2;
                                background-image: -webkit-linear-gradient(right, rgba(0,252,255,1),rgba(0,108,255,1));
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                            }
                            .sumType3{
                                color: #01e9dc;
                            }
                            .sumType4{
                                color: #ff581e;
                            }
                            .sumType5{
                                color: #fff900;
                            }



                        }
                    }
                }    
            }
            .main_context{
                width: 99.5%;
                margin-left:.5%; 
                height: 67%;
                display: flex;
                justify-content: space-between;
                .main_context_left{
                    width: 70%;
                    #charts_wrap{
                        width: 100%;
                        height: 100%;
                    }

                }
                .main_context_right{
                    width: 30%;
                    .main_context_list{
                        height: 84%;
                        margin: 8%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        li{
                            span{
                                width: 50%;
                                display: inline-block;
                                text-align: center;
                                font-size: 1.3rem;
                                font-weight:550;
                            }
                            .decline{
                                color: #00ffa2;
                            }
                            .rise{
                                color: #ff581e;
                            }
                            .striping{
                                color: #fff900;
                            }
                            
                        }
                    }
                }
            }

        }
    }
</style>
