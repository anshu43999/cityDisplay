<!--  -->
<template>
    <div class='r'>
        <div class="r-t">
            <div class="r-t-l">
                <div class="chart-wrap">
                    <h3>{{this.chartTitle[0]}}</h3>
                    <div class="chartBox">
                        <div class="chart" id="trendChart"></div>
                    </div>
                </div>
            </div>
            <div class="r-t-r">
                <div class="chart-wrap">
                    <h3>{{this.chartTitle[1]}}</h3>
                    <div class="chartBox">
                        <div class="chart" id="proportionChart"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="r-b">
            <h3>{{this.chartTitle[2]}}</h3>
            <div class="r-b-main">
                <div class="r-b-l">
                    <ul @click="checkBtn">
                        <li v-for="(item,index) in leftList" :key="index" :class="activeBtn === index ? 'active' : ''" >{{item}}</li>
                    </ul>



                </div>
                <div class="r-b-m">
                    <div class="chartBox">
                        <div class="chart" id="subClassChart11"></div>
                    </div>

                </div>
                <div class="r-b-r">
                    <div class="chartBox">
                        <!-- <div class="chart"  id="subClassChart12"> </div> -->
                        <table>
                            <tr v-for="(item,index) in roseSource" :key="index">
                                <td>{{item['name']}}</td>
                                <td>{{item['value']}}%</td>
                            </tr>
                        </table>

                    </div>

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
                //近七日接警类型数据分析
                trendChartSource: [],
                trendChartColor: [],
                //    警情数据占比分析
                proportionSource: [],
                //市
                citySource: ['太原市', '大同市', '朔州市', '忻州市', '吕梁市', '晋中市', '阳泉市', '长治市', '晋城市', '临汾市', '运城市'],
                citySource1: ['太原', '大同', '朔州', '忻州', '吕梁', '晋中', '阳泉', '长治', '晋城', '临汾', '运城'],

                //细类1
                subClassSource1: [],
                subClassColorList1: [],
                //细类2
                subClassSource2: [],
                subClassColorList2: [],
                //细类3
                subClassSource3: [],
                subClassColorList3: [],
                //细类4
                subClassSource4: [],
                subClassColorList4: [],
                //细类5
                subClassSource5: [],
                subClassColorList5: [],
                //    //细类6
                subClassSource6: [],
                subClassColorList6: [],

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
                leftList : [],   // 下 左 tab 
                activeBtn :0,   // tab  栏 active 样式
                cityTypeNUm :[],
                roseSource :[], // 南丁格尔玫瑰图 data
                cityAnalyze:[9,18,27,36,45,54,63,72,81,90,99]  // 数组  用来处理 ui搞的漏斗图  ！！！


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
            //趋势图
            sevensjfx(xAxisData,chartContainer, sourceArr, colorList) {
                let seriesArr = [];
                let dateArr = xAxisData;
                let myChart = this.$echarts.init(document.getElementById(chartContainer));
                this.chartsObj[chartContainer] = myChart;

                for (let i = 0; i < sourceArr.length; i++) {
                    seriesArr.push({
                        name: sourceArr[i].name,
                        type: "line",
                        showSymbol: false,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: colorList[i]
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: 'transparent'
                                },
                                    {
                                        offset: 0.3,
                                        color: 'transparent'
                                    },
                                    {
                                        offset: 1,
                                        color: colorList[i]
                                    }
                                ], false),
                            }
                        },
                        lineStyle: {
                            width: 2
                        },
                        data: sourceArr[i].value
                    });

                }
                let option = {
                   
                    legend: {
                        textStyle: {
                            fontSize: 16 * this.scale,
                            color: '#fff',
                            width: 40,
                        },
                        icon: 'rect',
                        itemWidth: 14 * this.scale,
                        itemHeight: 12 * this.scale,
                        width: '85%',
                        itemGap: 15 * this.scale,
                        top : '5%',
                    },




                    xAxis: {
                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: 16 * this.scale,
                        },
                        data: dateArr
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false,
                            lineStyle: {
                                type: 'dashed',
                                color: '#03eeff'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: 16 * this.scale,
                        },
                    },
                    series: seriesArr,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                    },
                    grid: {
                        top: 90 * this.scale,
                        bottom: 70 * this.scale,
                        left: 120 * this.scale
                    }
                };
                myChart.setOption(option);
            },
            //占比
            percent() {
                let myChart = this.$echarts.init(document.getElementById('proportionChart'));
                this.chartsObj['proportionChart'] = myChart;
                let colorList = this.trendChartColor;
                let xData = [];
                let sourceArr = this.proportionSource;
                sourceArr.forEach(value => {
                    xData.push(value.name);
                });
                let option = {
                    xAxis: {
                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisTick: {
                            show: false
                        },
                         axisLabel: {
                            showL: true,
                            textStyle: {
                                color: function(value, index) {
                                    return colorList[index];
                                },
                            },
                            interval: 0,
                            formatter: function(value, index) {
                                let type = index % 2 === 0 ? 'up' : 'down';
                                return '{' + type + '|' + value + '}'
                            },
                            rich: {
                                up: {
                                    height: 20 * this.scale,
                                    fontSize: 14 * this.scale
                                },
                                down: {
                                    height: 60 * this.scale,
                                    fontSize: 14 * this.scale
                                }
                            }
                        },

                        data: xData,
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisLabel: {
                            show: true,
                            formatter: '{value} %',
                            fontSize: 20 * this.scale
                        }
                    },
                    series: {
                        type: 'pictorialBar',
                        barCategoryGap: '-16%',
                        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return colorList[params.dataIndex]
                                },
                                opacity: 0.8
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: function (params) {
                                    return params.value + '%'
                                },
                                fontSize: 20 * this.scale
                            }
                        },
                        data: sourceArr,
                        z: 10
                    },
                    tooltip: {
                        formatter:function (params) {
                            return params.marker+params.data.name+'：'+params.data.value+'%';
                        }
                    },
                    grid: {
                        left: '14%',
                        right: '7%',
                        bottom: '28%',
                        top: '10%',
                    }
                };
                myChart.setOption(option);
            },
            // 类型地市分析
            typeCity(){
                let myChart = this.$echarts.init(document.getElementById('subClassChart11'));
                var xData = [],
                    yData = [];
                var min = 0; 
                this.cityTypeNUm.map(function(a, b) {
                    xData.push(a.city);
                    if (a.value === 0) {
                        yData.push(a.value + min);
                    } else {
                        yData.push(a.value);
                    }
                });
                let option = {
                    // backgroundColor:"#111c4e",
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            lineStyle: {
                                opacity: 0
                            }
                        },
                        formatter: function(prams) {
                            if (prams[0].data === min) {
                                return  prams[1].name+"：0%"
                            } else {
                                return prams[1].name +"：" + prams[0].data 
                            }
                        }
                    },
                    legend: {
                        data: ['直接访问', '背景'],
                        show: false
                    },
                    grid: {
                        left: '5%',
                        right: '0%',
                        bottom: '5%',
                        top: '7%',
                        height: '85%',
                        containLabel: true,
                        z: 22
                    },
                    xAxis: [{
                        type: 'category',
                        gridIndex: 0,
                        data: xData,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#0c3b71'
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: 'rgb(170,170,170)',
                            fontSize:16 *this.scale
                        }
                    }],
                    yAxis: [{
                            type: 'value',
                            name:"",
                            nameTextStyle:{
                            //   color:"rgb(170,170,170)"  
                            },
                            gridIndex: 0,
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            // min: min,
                            // max: 100,
                            axisLine: {
                                lineStyle: {
                                    // color: '#0c3b71'
                                }
                            },
                            axisLabel: {
                                color: 'rgb(170,170,170)',
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            gridIndex: 0,
                            min: min,
                            max: 100,
                            splitNumber: 12,
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            splitArea: {
                                show: false,
                                areaStyle: {
                                    color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                                }
                            }
                        }
                    ],
                    series: [{
                            name: '合格率',
                            type: 'bar',
                            barWidth: '30%',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 30,
                                }
                            },
                            data: yData,
                            zlevel: 11,
                            
                            label :{
                                show :true,
                                position:'top'
                            }
                        },
                        
                        {
                            name: '背景',
                            type: 'bar',
                            barWidth: '50%',
                            xAxisIndex: 0,
                            yAxisIndex: 1,
                            barGap: '-135%',
                            data: [100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100,100],
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,130,255,0.1)'
                                }
                            },
                            zlevel: 9
                        },
                        
                    
                    ]
                };
                myChart.setOption(option);

            },


            // 南丁格尔玫瑰图
            roseMap(){
                let myChart = this.$echarts.init(document.getElementById('subClassChart12'));
                this.chartsObj.roseMap = myChart; //放入charts对象方便后面的刷新缩放以及其他操作
                let sourceArr = this.roseSource.reverse();
                let dataArr=[];
                let half=[];
                let colorList=['#45dbf7','#4777f5','#5045f6','#1e12ca','#1264ca','#00fcff','#1dc3c5','#3f0de1','#149be1','#2d30bf','#66c0ff'];
                sourceArr.forEach((value,index) => {
                    dataArr.push({
                        "value": value.value,
                        "name": value.name,
                        "itemStyle": {
                            "normal": {
                                "color": colorList[index],
                            }
                        }
                    });
                    half.push(
                        {
                        "value": 0,
                        "name": "",
                        "label": {
                            show: false
                        },
                        "labelLine": {
                            show: false,
                            color:'transparent'
                        }
                    })
                });
                let data=[...dataArr,...half];
                let option={
                    'calculable': true,
                    "tooltip": {},
                    "series": [{
                        "type": "pie",
                        "radius": [
                           0,
                            150
                        ],
                        "avoidLabelOverlap": false,
                        "startAngle": -90,
                        "center": [
                            "100%",
                            "55%"
                        ],
                        "label":{
                            show:true,
                            formatter:function (params) {
                                if (params.data.value){
                                    return params.data.name+params.data.value+'%'
                                }
                                else {
                                    return ''
                                }
                            }
                        },
                        "labelLine": {
                            "normal": {
                                "show": true,
                                "smooth": false,
                                "length": 10*this.scale,
                                "length2": 10
                            },
                            "emphasis": {
                                "show": true
                            }
                        },
                        "roseType": "area",
                        "selectedMode": "single",
                        "data": data
                    }]
                };
                myChart.setOption(option);
            },





            //    细类柱状图
            subclassBar(chartContainer, sourceArr, colorList) {
                let myChart = this.$echarts.init(document.getElementById(chartContainer));

                this.chartsObj[chartContainer] = myChart;
                let option = {
                    xAxis: {

                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            rotate: 30,
                            fontSize: 18 * this.scale
                        },
                        data: this.citySource
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: 18 * this.scale
                        },
                    },
                    series: {
                        type: 'bar',
                        stack: 'chart',
                        data: sourceArr,
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
                                //右，下，左，上
                                0, 0, 0, 1, [{
                                    //0%位置的颜色
                                    offset: 0,
                                    color: colorList[0]
                                },
                                    {
                                        //100%位置的颜色
                                        offset: 1,
                                        color: colorList[1]
                                    }
                                ]
                            )
                        },
                        barWidth: 17 * this.scale
                    },
                    tooltip: {},
                    grid: {
                        top: 90 * this.scale,
                        bottom: 80 * this.scale,
                        left: 100 * this.scale,
                        right: 80 * this.scale
                    }
                };
                myChart.setOption(option);
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
                            '接警类型占比分析', //接警类型地市分析
                            '接警类型地市分析'
                          
                        ];
                       
                        this.trendChartColor = ['#05dbb0', '#00a3c0', '#4160fd', '#bd0fdc', '#803ff7'];
                       
                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];    //110报警
                        this.subClassColorList1 = ['#6ffeff', '#00a0a6'];

                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //122报警
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba'];

                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //119报警
                        this.subClassColorList3 = ['#6f87ff', '#0024dd'];

                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //综合报警
                        this.subClassColorList4 = ['#ff6cfa', '#a0009b'];


                        this.myPeriod=JSON.parse(sessionStorage.getItem('jjlx'));
                        this.startDate=this.myPeriod.start;
                        this.endDate=this.myPeriod.end;
                        break;
                    case '全省报警方式数据分析':
                        this.show = true;
                        this.chartTitle = [
                            '报警方式数据分析',
                            '报警方式占比分析',
                            '报警方式地市分析',
                          
                        ];
                        // this.trendChartSource = [
                        //     {name: '电话报警', value: [436, 413, 439, 506, 431, 426, 434]},
                        //     {name: '来人来电报警', value: [320, 370, 350, 412, 346, 348, 427]},
                        //     {name: '技防报警', value: [240, 274, 245, 260, 248, 278, 272]},
                        //     {name: '短信报警', value: [142, 152, 107, 168, 146, 164, 151]},
                        //     {name: '其他报警方式', value: [14, 15, 14, 10, 12, 15, 17]}
                        // ];
                        this.trendChartColor = ['#ffd75d', '#00a3c0', '#0d28a6', '#e344ff', '#6400cb'];
                        // this.proportionSource = [
                        //     {name: '电话报警', value: 12},
                        //     {name: '来人来电报警', value: 5},
                        //     {name: '技防报警', value: 21},
                        //     {name: '短信报警', value: 22},
                        //     {name: '其他报警方式', value: 10},
                        // ];
                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //电话报警
                        this.subClassColorList1 = ['#ffebaf', '#ffd75e'];

                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700]; //来人（来电）报警
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba'];

                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //技防报警
                        this.subClassColorList3 = ['#6f87ff', '#0024dd'];

                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#a650ff', '#5200a7'];

                        this.myPeriod=JSON.parse(sessionStorage.getItem('bjfs'));
                        this.startDate=this.myPeriod.start;
                        this.endDate=this.myPeriod.end;
                        break;
                    case '全省来话类型数据分析':
                        this.show = false;

                        this.chartTitle = [
                            '来话类型数据分析',
                            '来话类型占比分析',
                            '来话类型地市分析',
                           
                        ];
                        // this.trendChartSource = [
                        //     {name: '报警求助、举报投诉', value: [560, 525, 494, 568, 516, 554, 523]},
                        //     {name: '处警反馈', value: [451, 450, 438, 443, 468, 461, 431]},
                        //     {name: '信息咨询', value: [382, 380, 351, 384, 345, 387, 364]},
                        //     {name: '重复报警', value: [301, 298, 310, 320, 316, 302, 286]},
                        //     {name: '骚扰电话', value: [230, 231, 204, 215, 228, 209, 232]},
                        //     {name: '系统测试', value: [123, 130, 128, 110, 125, 135, 120]},
                        //     {name: '其他来话类型', value: [15, 13, 20, 18, 16, 17, 18]}
                        // ];
                        this.trendChartColor = ['#6c96ff', '#4160fb', '#2626e7', '#e344ff', '#00b3e9', '#803ff7', '#6905c6', '#17fff3'];
                        // this.proportionSource = [
                        //     {name: '报警求助、举报投诉', value: 12},
                        //     {name: '处警反馈', value: 5},
                        //     {name: '信息咨询', value: 21},
                        //     {name: '重复报警', value: 22},
                        //     {name: '骚扰电话', value: 10},
                        //     {name: '系统测试', value: 19},
                        //     {name: '其他来话类型', value: 6},
                        // ];
                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //报警求助、举报投诉
                        this.subClassColorList1 = ['#ff6cfa', '#a0009b'];

                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //处警反馈
                        this.subClassColorList2 = ['#8298ff', '#324fcc'];

                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //信息查询
                        this.subClassColorList3 = ['#6163ff', '#3032d7'];

                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //重复报警
                        this.subClassColorList4 = ['#ad81ff', '#733be3'];

                        // this.subClassSource5 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //骚扰电话
                        this.subClassColorList5 = ['#8919ee', '#620ab4'];

                        // this.subClassSource6 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];   //系统测试
                        this.subClassColorList6 = ['#b0fffb', '#119b9d'];

                        this.myPeriod=JSON.parse(sessionStorage.getItem('lhlx'));
                        this.startDate=this.myPeriod.start;
                        this.endDate=this.myPeriod.end;
                        break;
                    default:
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
                        that.sevensjfx(that.xAxisData,'trendChart', that.trendChartSource, that.trendChartColor);  //近七日接警类型数据分析  
                        that.percent();  // 警情数据占比分析
                        that.typeCity();    //城市 类型分布
                        // that.roseMap();   // 玫瑰图
                        // 这里  数据冲突  待调试
                     
                        
                    },
                };
                Index.init();
                // Index.loadData()
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
            getShen(){
                let str = JSON.parse(sessionStorage.getItem('jjlx'));
                let str1 = JSON.parse(sessionStorage.getItem('bjfs'));
                let str2 = JSON.parse(sessionStorage.getItem('lhlx'));
                switch (this.$route.query.title) {
                    case '全省接警类型数据分析'  :
                        this.$http.get( this.apiRoot+this.findUrl[0],{
                            params : {
                                startTime : str['start'],
                                endTime : str['end'],
                            }
                        })
                        .then(function (res) { 
                            this.tableData =   res['data'];
                            if(this.tableData){
                                //接警类型数据分析
                                this.leftList = this.tableData['type'];
                                let firstChild = this.leftList[0];   //找到初始
                                // this.tableData[firstChild];
                                this.cityTypeNUm = [];  // y  数据清空\
                                this.roseSource = [];   

                                this.citySource.forEach((item,index)=>{
                                    this.cityTypeNUm.push( {city :this.citySource1[index],value:parseInt(this.tableData[firstChild][item]),type : item });
                                    this.roseSource.push({name : item, value : this.tableData['rose'][firstChild][item]  })
                                })
                                this.roseSource.sort( function (a,b) {
                                    return b.value - a.value;
                                })
                               
                                // 警情数据占比分析  proportionSource
                                this.proportionSource = [
                                    {name: '110报警', value: 0},
                                    {name: '122报警', value: 0},
                                    {name: '119报警', value: 0},
                                    {name: '综合报警', value: 0},
                                    {name: '其它接警类型', value: 10},
                                ];

                                let obj5 = this.tableData['proportion'];


                                this.proportionSource[0]['value'] =  obj5['110报警'];
                                this.proportionSource[1]['value'] =  obj5['122报警'];
                                this.proportionSource[2]['value'] =  obj5['119报警'];
                                this.proportionSource[3]['value'] =  obj5['综合报警'];
                                this.proportionSource[4]['value'] =  obj5['其它接警类型'];

                                // 接警类型数据分析

                                // x 轴  数据
                                let obj6 = this.tableData['sevenDays']['110报警'];
                                let str1 ;
                                let qian ;
                                let hou ; 
                                this.xAxisData = [];
                                obj6.forEach((item,index)=>{
                                    str1 = item['tjrq'] ;
                                    str1 = str1.substring(4,8);
                                    qian = str1.substring(0,2);
                                    hou = str1.substring(2,4);
                                    str1 = qian + '-' + hou;
                                    this.xAxisData.push(str1);

                                })

                                this.trendChartSource = [
                                    {name: '110报警', value: []},
                                    {name: '122报警', value: []},
                                    {name: '119报警', value: []},
                                    {name: '综合报警', value: []},
                                    {name: '其它接警类型', value: []},
                                ];
                                let obj7 = this.tableData['sevenDays']
                                for(let key in obj7){
                                    switch (key) {
                                        case '110报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[0]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '119报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[2]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '122报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[1]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '其它接警类型':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[4]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '综合报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[3]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                    }
                                }

                                this.renderChart();
                            }
                        }.bind(this))

                        break;
                    
                    case '全省报警方式数据分析':
                        this.$http.get( this.apiRoot+this.findUrl[1],{
                            params : {
                                startTime : str1['start'],
                                endTime : str1['end'],
                            }
                        })
                        .then(function (res) { 

                            this.tableData =   res['data'];
                            if(this.tableData){
                                //接警类型数据分析
                                this.leftList = this.tableData['type'];
                                let firstChild = this.leftList[0];   //找到初始

                                // this.tableData[firstChild];
                                this.cityTypeNUm = [];  // y  数据清空\
                                this.roseSource = [];   

                                this.citySource.forEach((item,index)=>{

                                    this.cityTypeNUm.push( {city :this.citySource1[index],value:parseInt(this.tableData[firstChild][item]),type : item });
                                    this.roseSource.push({name : item, value : this.tableData['rose'][firstChild][item]  })
                                })
                                this.roseSource.sort( function (a,b) {
                                    return b.value - a.value;
                                })

                                // 报警方式数据占比分析  proportionSource
                                this.proportionSource = [
                                    {name: '电话报警', value: 0},
                                    {name: '来人来电报警', value: 0},
                                    {name: '技防报警', value: 0},
                                    {name: '短信报警', value: 0},
                                    {name: '其它报警方式', value: 0},
                                ];

                                let obj5 = this.tableData['proportion'];

                                this.proportionSource[0]['value'] =  obj5['电话报警'];
                                this.proportionSource[1]['value'] =  obj5['来人(来电)报警'];
                                this.proportionSource[2]['value'] =  obj5['技防报警'];
                                this.proportionSource[3]['value'] =  obj5['短信报警'];
                                this.proportionSource[4]['value'] =  obj5['其它报警方式'];

                                // 近七日接警类型数据分析

                                // x 轴  数据
                                let obj6 = this.tableData['sevenDays']['电话报警'];
                                let str1 ;
                                let qian ;
                                let hou ; 

                                this.xAxisData = [];
                                obj6.forEach((item,index)=>{
                                    str1 = item['tjrq'] ;
                                    str1 = str1.substring(4,8);
                                    qian = str1.substring(0,2);
                                    hou = str1.substring(2,4);
                                    str1 = qian + '-' + hou;
                                    this.xAxisData.push(str1);

                                })

                                this.trendChartSource = [
                                    {name: '电话报警', value: []},
                                    {name: '来人来电报警', value: []},
                                    {name: '技防报警', value: []},
                                    {name: '短信报警', value: []},
                                    {name: '其它报警方式', value: []},


                                ];
                                let obj7 = this.tableData['sevenDays']
                                for(let key in obj7){
                                    switch (key) {
                                        case '电话报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[0]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '来人(来电)报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[1]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '技防报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[2]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '短信报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[3]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '其它报警方式':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[4]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                    }
                                }



                                this.renderChart();
                            }
                        }.bind(this))



                        break;

                    case '全省来话类型数据分析':
                        this.show = false;
                        this.$http.get(this.apiRoot+this.findUrl[2],{
                            params : {
                                startTime : str2['start'],
                                endTime : str2['end'],
                            }
                        })
                        .then(function (res) { 

                            this.tableData =   res['data'];

                            if(this.tableData){
                               //接警类型数据分析
                                this.leftList = this.tableData['type'];
                                let firstChild = this.leftList[0];   //找到初始

                                // this.tableData[firstChild];
                                this.cityTypeNUm = [];  // y  数据清空\
                                this.roseSource = [];   

                                this.citySource.forEach((item,index)=>{

                                   this.cityTypeNUm.push( {city :this.citySource1[index],value:parseInt(this.tableData[firstChild][item]),type : item });
                                    this.roseSource.push({name : item, value : this.tableData['rose'][firstChild][item]  })
                                })
                                this.roseSource.sort( function (a,b) {
                                    return b.value - a.value;
                                })



                                // 报警方式数据占比分析  proportionSource
                                this.proportionSource = [
                                    {name: '报警求助、举报投诉', value: 0},
                                    {name: '处警反馈', value: 0},
                                    {name: '信息咨询', value: 0},
                                    {name: '重复报警', value: 0},
                                    {name: '骚扰电话', value: 0},
                                    {name: '系统测试', value: 0},
                                    {name: '其它处理类型', value: 0},
                                ];

                                let obj5 = this.tableData['proportion'];

                                this.proportionSource[0]['value'] =  obj5['报警求助、举报投诉'];
                                this.proportionSource[1]['value'] =  obj5['处警反馈'];
                                this.proportionSource[2]['value'] =  obj5['信息咨询'];
                                this.proportionSource[3]['value'] =  obj5['重复报警'];
                                this.proportionSource[4]['value'] =  obj5['骚扰电话'];
                                this.proportionSource[5]['value'] =  obj5['系统测试'];
                                this.proportionSource[6]['value'] =  obj5['其它处理类型'];


                                // // 近七日接警类型数据分析

                                // // x 轴  数据
                                let obj6 = this.tableData['sevenDays']['信息咨询'];
                                let str1 ;
                                let qian ;
                                let hou ; 

                                this.xAxisData = [];
                                obj6.forEach((item,index)=>{
                                    str1 = item['tjrq'] ;
                                    str1 = str1.substring(4,8);
                                    qian = str1.substring(0,2);
                                    hou = str1.substring(2,4);
                                    str1 = qian + '-' + hou;
                                    this.xAxisData.push(str1);

                                })

                                this.trendChartSource = [
                                    {name: '报警求助、举报投诉', value: []},
                                    {name: '处警反馈', value: []},
                                    {name: '信息咨询', value: []},
                                    {name: '重复报警', value: []},
                                    {name: '骚扰电话', value: []},
                                    {name: '系统测试', value: []},
                                    {name: '其它处理类型', value: []}
                                ];
                                let obj7 = this.tableData['sevenDays']
                                for(let key in obj7){
                                    switch (key) {
                                        case '报警求助、举报投诉':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[0]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '处警反馈':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[1]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '信息咨询':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[2]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '重复报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[3]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '骚扰电话':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[4]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '系统测试':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[5]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '其它处理类型':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[6]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        
                                    }
                                   
                                }



                                this.renderChart();
                            }
                        }.bind(this))



                        break;

                    



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
            cityFx(){

            }

        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            clearInterval(counter);
            counter = null;
           
            this.pdFilter_btn();   // 判断筛选框是否显示
            this.getScale();    //获取缩放值
            // this.renderChart();

             this.getShen();

            



            // this.renderChart();
            



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
        height: 10%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        
    }

    .chartBox {
        height: 90%;
    }

    .r {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .chart-wrap {
            width: 100%;
            height: 100%;

            .chartBox {
                width: 100%;
                height: 90%;
                .chart {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .r-t {
            width: 100%;
            height: 38.58%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .r-t-l {
                width: 50%;
                height: 100%;
                background-image: url('../assets/images/index/l-t-bg1.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }

            .r-t-r {
                width:50%;
                height: 100%;
                background-image: url('../assets/images/index/l-t-bg1.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                
            }
        }

        .r-b {
            width: 100%;
            height: 57%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            background-image: url('../assets/images/index/l-t-bg2.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            h3{
                display: flex;
				align-items: center;
				justify-content: center;
            }
            .r-b-main{
                padding: 0 2.5%;
                height: 85%;
                display: flex; 
                // margin-bottom: 10%;
                .r-b-l{
                    width: 18%;
                    height: 100%;
                    background: url('../assets/images/index/r-b-m-l.png'); // tab 背景
                    background-repeat: no-repeat;
                    background-size: 100% 100%; 
                    ul{
                        height: 100%;
                        li{
                            display: block;
                            height: 10%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-bottom: 1px solid #0b5fa7;
                            cursor: pointer;
                        }
                        .active {
                            background-color: #4c7fff;
                        }
                    }
                }
                .r-b-m{
                    width: 70%;
                    height: 100%;
                    .chartBox{
                        height: 100%;
                        .chart{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .r-b-r{
                    width: 30%;
                    height: 100%;
                    .chartBox{
                        .chart{
                            width: 100%;
                            height: 100%;
                        }
                        table{
                            width: 85%;
                            height: 100%;
                            margin-left:7.5%; 
                            margin-right:7.5%; 
                            tr{
                                td:nth-child(1){
                                    color: #5abcff;
                                    text-align: center;
                                }
                                td:nth-child(2){
                                    color: #ffe754 ;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }

            }
        }
    }
</style>
