<!--  -->
<template>
    <div class='r'>
        <div class="r-t">
            <div class="r-t-l">
                <div class="title_wrap">{{this.chartTitle[0]}}</div>
                <div class="chartBox">
                    <div class="chart" id="jqflsjfxChart13"></div>
                </div>
            </div>


            <div class="r-t-r">
                <div class="title_wrap">{{this.chartTitle[1]}}</div>
                <div class="chartBox">
                    <div class="chart" id="proportionChart"></div>
                </div>
            </div>
        </div>


        <div class="r-b">
            <div class="chart-wrap">
                <div class="title_wrap">{{this.chartTitle[2]}}</div>
                <div class="chartBox">
                    <table>
                        <tr v-for="(item,index) in bottomList" :key="index" :class="index ===0 ? 'topStyle' : ''">
                            <td v-for="(val,i) in item " :key="i" :class="i === 0  ? 'firstcolum' :'normalColor' ">
                                {{val}}
                            </td>
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

    export default {
//import引入的组件需要注入到对象中才能使用

        // props : ['tableData'],

        components: {},

        data() {
//这里存放数据
            return {
                show: true,
                scale: 1,
                refreshCharts: [],
                proportionSource: [],
                proportionColor: [],
                title: [],
                chartsObj: {},
                axisesColor: '#36b2ae',
                dateArr: [],
                position: [],
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
                //细类6
                subClassSource6: [],
                subClassColorList6: [],
                // 
                findUrl: [
                    'recJJLXTJB/findCityAlarmData',
                    'recBJFSTJB/findCityAlarmMode',
                    'recLHLXTJB/findCityIncomingType',


                ],
                cityDm: {
                    '太原市': '1401',
                    '大同市': '1402',
                    '阳泉市': '1403',
                    '长治市': '1404',
                    '晋城市': '1405',
                    '朔州市': '1406',
                    '晋中市': '1407',
                    '运城市': '1408',
                    '忻州市': '1409',
                    '临汾市': '1410',
                    '吕梁市': '1411'
                },
                tableData: [],
                xAxisData: [],
                // 左上
                leftTop: [],
                leftTopy: [],
                leftTopBy: [],

                // 列表
                bottomList: [[], [], [], [], [], [], []],
                chartTitle: [],
                leftTopAgin: [],   //


            };
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {},
//方法集合
        methods: {
            getScale() {
                this.scale = localStorage.getItem('scale');
            },/*
            percent(sourceArr, colorList, postion) {
                let myChart = this.$echarts.init(document.getElementById('proportionChart'));
                this.chartsObj.proportionChart = myChart;
                let titleArr = [];
                let seriesArr = [];
                sourceArr.forEach(function (item, index) {
                    titleArr.push(
                        {
                            text: item.name,
                            left: index * postion[0] + postion[1] + '%',
                            top: '80%',
                            textAlign: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 12,
                                color: '#1af7f1',
                                textAlign: 'center',
                            },
                        }
                    );
                    seriesArr.push(
                        {
                            name: item.name,
                            type: 'pie',
                            clockWise: false,
                            radius: [48, 54],
                            itemStyle: {
                                normal: {
                                    color: colorList[index][0],
                                    shadowColor: colorList[index][0],
                                    shadowBlur: 0,
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    fontSize: 20
                                }
                            },
                            hoverAnimation: false,
                            center: [index * postion[0] + postion[1] + '%', '40%'],
                            data: [{
                                value: item.value,
                                label: {
                                    show: true,
                                    normal: {
                                        formatter: function (params) {

                                            return params.value + '%';
                                        },
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: 20,
                                            color: '#1af7f1'
                                        }
                                    }
                                },
                            }, {
                                value: 100 - item.value,
                                name: 'invisible',
                                itemStyle: {
                                    normal: {
                                        color: colorList[index][1]
                                    },
                                    emphasis: {
                                        color: colorList[index][1]
                                    }
                                }
                            }]
                        }
                    )
                });
                let option = {
                    title: titleArr,
                    series: seriesArr
                };
                myChart.setOption(option);
            },*/

            // 左一

            //    警情分类数据分析
            // leftTopBy
            jqflsjfxChart() {
                let myChart = this.$echarts.init(document.getElementById('jqflsjfxChart13'));
                var xData = [],
                    yData = [];
                var min = 0;
                this.leftTopBy.map(function (a, b) {
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
                        formatter: function (prams) {
                            if (prams[0].data === min) {
                                return prams[1].name + "：0%"
                            } else {

                                return prams[1].name + "：" + prams[0].data
                            }
                        }
                    },
                    // legend: {},
                    grid: {
                        left: '7%',
                        right: '7%',
                        bottom: '27%',
                        top: '7%',
                        containLabel: true,
                        z: 22
                    },
                    xAxis: [{
                        type: 'category',
                        gridIndex: 0,
                        data: xData,

                        axisTick: {
                            show: false,
                            alignWithLabel: true
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor,
                                width: 3 * this.scale
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#FFF',
                            },
                            interval: 0,
                            formatter: function (value, index) {
                                let type = index % 2 === 0 ? 'up' : 'down';
                                // console.log(type);
                                return '{' + type + '|' + value + '}'
                            },
                            rich: {
                                up: {
                                    height: 20 * this.scale,
                                    fontWeight: 'bold',
                                    fontSize: 16 * this.scale,
                                },
                                down: {
                                    height: 80 * this.scale,
                                    fontWeight: 'bold',
                                    fontSize: 16 * this.scale,
                                }
                            }
                        },
                    }],
                    yAxis: [{
                        type: 'value',
                        name: "",
                        nameTextStyle: {
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
                            show: true,
                            lineStyle: {
                                color: this.axisesColor,
                                width: 3 * this.scale
                            }
                        },
                        axisLabel: {
                            color: '#fff',
                            formatter: '{value}',
                            fontWeight: 'bold',
                            fontSize:16*this.scale
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
                            textStyle:{
                                fontWeight:'bold',
                                color:'#fff',
                                fontSize: 16 * this.scale,
                            },
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
                            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
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


            // 左二
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
                            },
                            width: 3*this.scale
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: function (value, index) {
                                    return colorList[index];
                                },
                            },
                            interval: 0,
                            formatter: function (value, index) {
                                let type = index % 2 === 0 ? 'up' : 'down';
                                return '{' + type + '|' + value + '}'
                            },
                            rich: {
                                up: {
                                    height: 20 * this.scale,
                                    fontSize: 16 * this.scale,
                                    fontWeight:'bold'
                                },
                                down: {
                                    height: 80 * this.scale,
                                    fontSize: 16 * this.scale,
                                    fontWeight:'bold'
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
                                color: this.axisesColor,
                                width:3*this.scale
                            }
                        },
                        axisLabel: {
                            show: true,
                            formatter: '{value} %',
                            fontSize: 16 * this.scale,
                            fontWeight:'bold',
                            color:'#fff'
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
                                fontSize: 16 * this.scale,
                                fontWeight:'bold'
                            }
                        },
                        data: sourceArr,
                        z: 10
                    },
                    tooltip: {
                        formatter: function (params) {
                            return params.marker + params.data.name + '：' + params.data.value + '%';
                        }
                    },
                    grid: {
                        // top: 90 * this.scale,
                        // bottom: 90 * this.scale,
                        // left: 100 * this.scale,
                        // right : 100 * this.scale


                        left: '14%',
                        right: '7%',
                        bottom: '35%',
                        top: '10%',
                    }
                };
                myChart.setOption(option);
            },


            renderChart() {
                switch (this.$route.query.title) {
                    case '市接警类型数据分析':
                        this.show = true;
                        this.proportionColor = [['#05dbb0', '#ccfff5'], ['#00a3c0', '#9ff1ff'], ['#4160fd', '#a5b4ff'], ['#bd0fdc', '#f2aaff'], ['#803ff7', '#c3a2ff']];
                        this.chartTitle = ['接警类型数据分析', '接警类型占比分析', '七日接警类型数据分析'];
                        this.trendChartColor =  ['#ffe754', '#6becff', '#00fe90', '#c7efff', '#0096ff'];

                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#6ffeff', '#00a0a6', '#05dbb0'];
                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba', '#009eba'];
                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6f87ff', '#0024dd', '#5470fd'];
                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#ff6cfa', '#a0009b', '#bd0fdc'];
                        this.position = [20, 10];
                        break;
                    case '市报警方式数据分析':
                        this.show = true;

                        this.proportionColor = [['#ffd75d', '#ffe9a6'], ['#00a3c0', '#9ff1ff'], ['#4160fd', '#a5b4ff'], ['#6400cb', '#ce9eff'], ['#e344ff', '#f9d8ff']];
                        this.chartTitle = ['报警方式数据分析', '报警方式占比分析', '七日报警方式数据分析'];
                        this.trendChartColor =  ['#00ffe4', '#0096ff', '#ffffff', '#fff093', '#2cfa75'];


                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#ffebaf', '#ffd75e', '#ffd75d'];
                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba', '#009eba'];
                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6f87ff', '#0024dd', '#5470fd'];
                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#a650ff', '#a650ff', '#bd0fdc'];
                        this.position = [20, 10];
                        break;
                    case '市来话类型数据分析':
                        this.show = false;

                        this.proportionColor = [['#ed69ec', '#ffdeff'], ['#4a66ed', '#aebcff'], ['#1b22ac', '#7b8bff'], ['#8c4ff9', '#c7a8ff'], ['#6c08c8', '#b361ff'], ['#20f5ed', '#c3fffd'], ['#8b06a6', '#ed95ff']];
                        this.chartTitle = ['来话类型数据分析', '来话类型占比分析', '七日来话类型数据分析'];
                        this.trendChartColor = ['#4ced7a', '#ffb955', '#00ffeb', '#0096ff', '#8fd1ff', '#ffffff', '#fff093'];

                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#ff6cfa', '#a0009b', '#ff6cfa'];
                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#8298ff', '#324fcc', '#415fec'];
                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6163ff', '#3032d7', '#243bcd'];
                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#ad81ff', '#733be3', '#7c46e7'];
                        // this.subClassSource5 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList5 = ['#8919ee', '#620ab4', '#8618ea'];
                        // this.subClassSource6 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList6 = ['#b0fffb', '#119b9d', '#18f3e9'];
                        this.position = [14, 8];
                        break;
                }
                this.proportionSource.forEach(value => {

                    this.title.push(value.name);
                });

                let myCharts = document.querySelectorAll('.chart');
                myCharts.forEach(value => {
                    this.refreshCharts.push(value.getAttribute('id'))
                });
                let that = this;
                let Index = {
                    init() {
                        this.loadData();
                        Public.chartsResize(that.chartsObj);
                        Public.chartsReDraw(that.chartsObj, null, [], this.refreshCharts)
                    },
                    loadData() {

                        that.percent();
                        that.jqflsjfxChart();


                    },
                };
                Index.init();
            },


            pdFilter_btn() {
                let str = this.$route.query.title;

                str = str.substring(0, 1);

                if (str == '全') {
                    this.$emit('filter_btn', true)
                } else {
                    this.$emit('filter_btn', false)
                }
            },
            getInitData() {
                // 开始获取  省的 时间选择
                let str = JSON.parse(sessionStorage.getItem('jjlx'));
                let str1 = JSON.parse(sessionStorage.getItem('bjfs'));
                let str2 = JSON.parse(sessionStorage.getItem('lhlx'));
                let that = this;

                switch (this.$route.query.title) {
                    case '市接警类型数据分析':
                        this.$http.get(this.apiRoot + this.findUrl[0], {
                            params: {
                                startTime: str['start'],
                                endTime: str['end'],
                                xzqhdm: that.cityDm[that.$route.query.city],
                            }
                        })
                            .then(function (res) {

                                that.tableData = res['data'];
                                that.leftTop = res['data']['type'];

                                let sum;
                                that.leftTopy = [];
                                that.leftTopBy = [];
                                that.leftTop.forEach((item, index) => {
                                    sum = 0;


                                    that.tableData[item].forEach((val, i) => {

                                        sum += parseInt(val['jjsl'])
                                    })
                                    that.leftTopy.push(sum);
                                    // leftTopy[index]  = sum;

                                    that.leftTopBy.push({value: sum, city: that.leftTop[index]});
                                })


                                if (that.tableData) {
                                    let obj1 = that.tableData['110报警'];
                                    let str1;
                                    let qian;
                                    let hou;

                                    that.dateArr = [];
                                    obj1.forEach((item, index) => {
                                        str1 = item['tjrq'];
                                        str1 = str1.substring(4, 8);
                                        qian = str1.substring(0, 2);
                                        hou = str1.substring(2, 4);
                                        str1 = qian + '-' + hou;
                                        that.dateArr.push(str1);
                                    })


                                    let obj5 = that.tableData['proportion'];
                                    that.proportionSource = [
                                        {name: '110报警', value: 0},
                                        {name: '122报警', value: 0},
                                        {name: '119报警', value: 0},
                                        {name: '综合报警', value: 0},
                                        {name: '其它接警类型', value: 0},
                                    ];

                                    that.proportionSource.forEach((item, indx) => {
                                        // console.log(item['name']);
                                        item['value'] = obj5[item['name']]

                                    })


                                    // bottomList
                                    let yDate = [];
                                    // 加入时间
                                    yDate = that.tableData['days'];

                                    that.bottomList.forEach((item, index) => {
                                        item.push(yDate[index])
                                    })


                                    // 加入数据


                                    that.leftTop.forEach((item, index) => {

                                        yDate.forEach((val, i) => {

                                            if (!that.tableData['num'][item][val]) {
                                                that.bottomList[i].push(0);
                                            } else {
                                                that.bottomList[i].push(that.tableData['num'][item][val]);
                                            }
                                        })
                                    })

                                    let arr = that.leftTop;
                                    arr.unshift(' ');

                                    that.bottomList.unshift(arr);

                                    that.renderChart();
                                }
                            })
                        break;
                    case '市报警方式数据分析':
                        this.$http.get(this.apiRoot + this.findUrl[1], {
                            params: {
                                startTime: str['start'],
                                endTime: str['end'],
                                xzqhdm: that.cityDm[that.$route.query.city],
                            }
                        })
                            .then(function (res) {

                                that.tableData = res['data'];
                                if (that.tableData) {
                                    that.leftTopAgin = res['data']['type'];


                                    that.leftTop = res['data']['type'];
                                    let sum;
                                    that.leftTopy = [];
                                    that.leftTopBy = [];
                                    that.leftTop.forEach((item, index) => {
                                        sum = 0;


                                        that.tableData[item].forEach((val, i) => {

                                            sum += parseInt(val['jjsl'])
                                        })
                                        that.leftTopy.push(sum);
                                        // leftTopy[index]  = sum;

                                        that.leftTopBy.push({value: sum, city: that.leftTop[index]});
                                    })


                                    let obj1 = that.tableData['电话报警'];
                                    let str1;
                                    let qian;
                                    let hou;

                                    that.dateArr = [];
                                    obj1.forEach((item, index) => {
                                        str1 = item['tjrq'];
                                        str1 = str1.substring(4, 8);
                                        qian = str1.substring(0, 2);
                                        hou = str1.substring(2, 4);
                                        str1 = qian + '-' + hou;
                                        that.dateArr.push(str1);
                                    })
                                    obj1.forEach((item, index) => {
                                        that.subClassSource1[index] = parseInt(item['jjsl'])
                                    })
                                    let obj2 = that.tableData['来人(来电)报警'];
                                    obj2.forEach((item, index) => {
                                        that.subClassSource2[index] = parseInt(item['jjsl'])
                                    })
                                    let obj3 = that.tableData['技防报警'];
                                    obj3.forEach((item, index) => {
                                        that.subClassSource3[index] = parseInt(item['jjsl'])
                                    })
                                    let obj4 = that.tableData['短信报警'];
                                    obj4.forEach((item, index) => {
                                        that.subClassSource4[index] = parseInt(item['jjsl'])
                                    })
                                    let obj5 = that.tableData['proportion'];


                                    that.proportionSource = [
                                        {name: '电话报警', value: 0},
                                        {name: '来人(来电)报警', value: 0},
                                        {name: '技防报警', value: 0},
                                        {name: '短信报警', value: 0},
                                        {name: '其它报警方式', value: 0},
                                    ];


                                    that.proportionSource.forEach((item, indx) => {

                                        item['value'] = obj5[item['name']]

                                    })


                                    // bottomList
                                    let yDate = [];
                                    // 加入时间
                                    yDate = that.tableData['days'];

                                    that.bottomList.forEach((item, index) => {
                                        item.push(yDate[index])
                                    })


                                    // 加入数据


                                    that.leftTop.forEach((item, index) => {

                                        yDate.forEach((val, i) => {

                                            if (!that.tableData['num'][item][val]) {
                                                that.bottomList[i].push(0);
                                            } else {
                                                that.bottomList[i].push(that.tableData['num'][item][val]);
                                            }
                                        })
                                    })

                                    let arr = that.leftTop;
                                    arr.unshift(' ');

                                    that.bottomList.unshift(arr);


                                    that.renderChart();
                                }
                            })

                        break;

                    case '市来话类型数据分析':
                        this.$http.get(this.apiRoot + this.findUrl[2], {
                            params: {
                                startTime: str['start'],
                                endTime: str['end'],
                                xzqhdm: that.cityDm[that.$route.query.city],
                            }
                        })
                            .then(function (res) {

                                that.tableData = res['data'];
                                if (that.tableData) {

                                    that.leftTop = res['data']['type'];
                                    let sum;
                                    that.leftTopy = [];
                                    that.leftTopBy = [];
                                    that.leftTop.forEach((item, index) => {
                                        sum = 0;


                                        that.tableData[item].forEach((val, i) => {

                                            sum += parseInt(val['jjsl'])
                                        })
                                        that.leftTopy.push(sum);
                                        // leftTopy[index]  = sum;

                                        that.leftTopBy.push({value: sum, city: that.leftTop[index]});
                                    })


                                    let obj1 = that.tableData['报警求助、举报投诉'];
                                    let str1;
                                    let qian;
                                    let hou;

                                    that.dateArr = [];
                                    obj1.forEach((item, index) => {
                                        str1 = item['tjrq'];
                                        str1 = str1.substring(4, 8);
                                        qian = str1.substring(0, 2);
                                        hou = str1.substring(2, 4);
                                        str1 = qian + '-' + hou;
                                        that.dateArr.push(str1);
                                    })


                                    obj1.forEach((item, index) => {
                                        that.subClassSource1[index] = parseInt(item['jjsl'])
                                    })
                                    let obj2 = that.tableData['处警反馈'];
                                    obj2.forEach((item, index) => {
                                        that.subClassSource2[index] = parseInt(item['jjsl'])
                                    })
                                    let obj3 = that.tableData['信息咨询'];
                                    obj3.forEach((item, index) => {
                                        that.subClassSource3[index] = parseInt(item['jjsl'])
                                    })
                                    let obj4 = that.tableData['重复报警'];
                                    obj4.forEach((item, index) => {
                                        that.subClassSource4[index] = parseInt(item['jjsl'])
                                    })
                                    let obj7 = that.tableData['骚扰电话'];
                                    obj7.forEach((item, index) => {
                                        that.subClassSource5[index] = parseInt(item['jjsl'])
                                    })
                                    let obj8 = that.tableData['系统测试'];
                                    obj8.forEach((item, index) => {
                                        that.subClassSource6[index] = parseInt(item['jjsl'])
                                    })
                                    let obj5 = that.tableData['proportion'];


                                    that.proportionSource = [
                                        {name: '报警求助、举报投诉', value: 0},
                                        {name: '处警反馈', value: 0},
                                        {name: '信息咨询', value: 0},
                                        {name: '重复报警', value: 0},
                                        {name: '骚扰电话', value: 0},
                                        {name: '系统测试', value: 0},
                                        {name: '其它处理类型', value: 0},
                                    ];


                                    that.proportionSource.forEach((item, indx) => {

                                        item['value'] = obj5[item['name']]

                                    })

                                    // bottomList
                                    let yDate = [];
                                    // 加入时间
                                    yDate = that.tableData['days'];

                                    that.bottomList.forEach((item, index) => {
                                        item.push(yDate[index])
                                    })

                                    // 加入数据


                                    that.leftTop.forEach((item, index) => {

                                        yDate.forEach((val, i) => {

                                            if (!that.tableData['num'][item][val]) {
                                                that.bottomList[i].push(0);
                                            } else {
                                                that.bottomList[i].push(that.tableData['num'][item][val]);
                                            }
                                        })
                                    })

                                    let arr = that.leftTop;
                                    arr.unshift(' ');

                                    that.bottomList.unshift(arr);

                                    that.renderChart();
                                }
                            })

                        break;
                    // default:
                    //     break;
                }
            },
        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            clearInterval(counter);
            counter = null;

            this.pdFilter_btn();
            this.getScale();
            this.getInitData();


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
    .title_wrap {
        height: 13%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        font-weight: bold;
    }

    .chart-wrap {
        width: 100%;
        height: 100%;


        .chartBox {
            width: 100%;
            height: 88%;

            .chart {
                width: 100%;
                height: 100%;
            }
        }
    }

    .r {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .r-t {
            width: 100%;
            height: 38%;
            display: flex;

            .r-t-l {
                width: 50%;
                height: 100%;
                background-image: url('../assets/images/index/e-r-t-l.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
/*
                .title_wrap {
                    height: 12%;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }*/

                .chartBox {
                    height: 88%;

                    .chart {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .r-t-r {
                width: 50%;
                height: 100%;
                background-image: url('../assets/images/index/e-r-t-r.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;

                /*.title_wrap {
                    height: 12%;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }
*/
                .chartBox {
                    height: 88%;

                    .chart {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .r-b {
            width: 100%;
            height: 57%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-image: url('../assets/images/index/e-r-b-c.png'); //背景图
            background-repeat: no-repeat;
            background-size: 100% 100%;
            // padding: 4%;
            .chart-wrap {
                padding: 0 4% 4% 4%;

                .title_wrap {
                    padding-bottom: 0.8rem;
                    box-sizing: border-box;
                }
            }

            table {
                width: 100%;
                height: 100%;

                tr {
                    td {
                        text-align: center;
                        font-weight: bold;
                    }

                    .firstcolum {
                        color: #fff;
                        font-size: 1.1rem;
                    }

                    .normalColor {
                        color: #ffe754;
                        font-size: 1.4rem;
                    }

                }

                .topStyle {
                    td {
                        color: #fff;
                        font-size: 1.1rem;
                    }
                }
            }


        ;


        }


    }
</style>