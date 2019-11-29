<template>
    <div id="container">
        <my-header></my-header>
        <main>
            <div class="myContainer">
                <!--样式里的l,m,r,t,b分别代表左，中，右，上，下-->
                <div class="t">
                    <div class="t-l">
                        <div class="chart-wrap">
                            <!--                    标题-->
                            <div class="title_wrap">
                                <span>警情统计监测</span>
                            </div>

                            <!--                                            内容-->
                            <div class="chartBox">
                                <!--                                                    数据-->
                                <ul class="statistics">
                                    <li v-for="item in jqtjjcData" :key="item.name">
                                        <p>{{item.name}}</p>
                                        <p>{{item.value}}</p>
                                    </li>
                                </ul>
                                <!--                        图表-->
                                <div class="chart" id="jqtjjcChart"></div>
                            </div>
                        </div>
                    </div>

                    <div class="t-m">
                        <div class="box">
                            <table cellspacing="0">
                                <tr>
                                    <td>{{mapData.name}}</td>
                                    <td>{{shoulian.name}}</td>
                                </tr>
                                <tr>
                                    <td>{{mapData.value}}</td>
                                    <td>{{shoulian.value}}</td>
                                </tr>
                                <tr>
                                    <td>{{mapData.name}}环比</td>
                                    <td>{{shoulian.name}}环比</td>
                                </tr>
                                <tr>
                                    <td :class="mapHbClass">
                                        <span>{{Math.abs(mapData.hb)}}</span>
                                        <i :class="['iconfont',mapHbIcon]"></i>
                                    </td>
                                    <td :class="mapHbClass">
                                        <span>{{Math.abs(shoulian.hb)}}</span>
                                        <i :class="['iconfont',mapHbIcon]"></i>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="t-r">
                        <div class="chart-wrap">
                            <!--                    标题-->
                            <div class="title_wrap">
                                <span>警情分类数据分析</span>
                            </div>

                            <!--                                            内容-->
                            <div class="chartBox">
                                <!--                                                    数据-->
                                <!--                        图表-->
                                <div class="chart" id="jqflsjfxChart"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="b">
                    <div class="b-l">
                        <div class="chart-wrap">
                            <!--标题-->
                            <div class="title_wrap">
                                <span>今日县区警情数据分析</span>
                            </div>

                            <!--内容-->
                            <!-- <div class="chartBox" v-show="rankShow"> -->
                            <div class="chartBox">
                                <div class="myBox">
                                    <table>
                                        <tr>
                                            <td class="span1">县（区）</td>
                                            <td class="span2">报警总数</td>
                                            <td class="span3">有效警情</td>
                                        </tr>
                                        <tr v-for="(item,index) in  ranking" :key="index">
<!--                                            <td class="span1 sp1" @click="jump">{{item['xzqhdm']}}</td>-->
                                            <td class="span1 sp1">{{item['xzqhdm']}}</td>
                                            <td class="span2 sp2">{{item['jjsl']}}</td>
                                            <td class="span3 sp3">{{item['yxjq']}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="b-m">
                        <div class="chart-wrap">
                            <!--图表-->
                            <div class="chartBox">
                                <div class="chart" id="mapChart"></div>
                            </div>
                            <div class="mapLegend">
                                <p>1:杏花岭区</p>
                                <p>2:迎泽区</p>
                                <p>3:小店区</p>
                            </div>
                        </div>
                    </div>

                    <div class="b-r">
                        <div class="chart-wrap">
                            <!--标题-->
                            <div class="title_wrap">
                                <span>今日县区警情数据分析</span>
                            </div>

                            <!--内容-->
                            <div class="chartBox" id="jqflhbfx"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import MyHeader from "../components/Header";

    export default {
        name: "Test",
        components: {
            MyHeader
        },
        data() {
            return {
                // 标题
                // topTitle: '太原市公安局情报指挥中心警情分析统计系统',
                //今天的日期
                todayIndex: '',
                threeDaysAgo: '',
                sevenDaysAgo: '',
                // select: true,
                // 接口
                findUrl: [
                    'recJQTJB/findJQNum', //警情统计监测
                    'recJQTJB/findJQSevenDayShen', //近期警情统计
                    'recJQFLTJB/findJQFLNum', //警情分类数据分析
                    'recJQTJB/findXZQHNum', //map
                    'recJJLXTJB/findJJLXShen', ///  饼    今日接警类型数据分析
                    'recJJLXTJB/findJJLXSevenDayShen', ///  右   七日接警类型数据分析
                    'recBJFSTJB/findBJFSShen', //   今日报警方式数据分析
                    'recBJFSTJB/findBJFSSevenDayShen', //    七日报警方式数据分析
                    'recLHLXTJB/findLHLXShen', //今日来话类型数据分析
                    'recLHLXTJB/findLHLXSevenDayShen' //七日来话类型数据分析
                ],
                //需要刷新的图表
                refreshCharts: [],
                //    所有的图标对象
                chartsObj: {},
                //坐标轴颜色
                axisesColor: '#04d5ce',
                //缩放值
                scale: 1,
                //筛选选项
                periodArr: ['近7日', '上周', '上上周'],
                periodArr1: ['今天', '昨天', '前天'],
                periodArr2: ['接警类型数据详情', '报警方式数据详情', '来话类型数据详情'],

                //默认获取本周数据
                jqfl: {
                    date: '',
                    per: ''
                },
                jjlx: {
                    start: '',
                    end: '',
                    per: ''
                },
                lhlx: {
                    start: '',
                    end: '',
                    per: ''
                },
                bjfs: {
                    start: '',
                    end: '',
                    per: ''
                },
                //警情统计监测
                jqtjjcData: [{
                    name: '报警总数',
                    value: 0
                },
                    {
                        name: '有效警情',
                        value: 0
                    },
                    {
                        name: '已处警数',
                        value: 0
                    },
                    {
                        name: '已反馈数',
                        value: 0
                    },
                ],
                jqtjjcSource: [{
                    name: '已处警数占比',
                    value: 10
                },
                    {
                        name: '有效警情占比',
                        value: 10
                    },
                    {
                        name: '已反馈数占比',
                        value: 10
                    }
                ],

                // 排名
                ranking: [{
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }, {
                    'xzqhdm': '尖草坪区',
                    'jjsl': 10,
                    'yxjq': 10
                }],

                //    近期警情统计  y
                jqjqtjScoure: [],
                //  近期警情统计  x
                // jqjqtjXdata: ['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7'],

                //    警情分类数据分析
                jqflsjfxSource: [/*{
                    name: '刑事',
                    value: 10
                },
                    {
                        name: '行政（治安）',
                        value: 10
                    },
                    {
                        name: '交通类',
                        value: 10
                    },
                    {
                        name: '消防救援',
                        value: 10
                    },
                    {
                        name: '群众求助',
                        value: 10
                    },
                    {
                        name: '应急联动事件',
                        value: 10
                    },
                    {
                        name: '群体事件',
                        value: 10
                    },
                    {
                        name: '纠纷',
                        value: 10
                    },
                    {
                        name: '灾害事故',
                        value: 10
                    },
                    {
                        name: '举报',
                        value: 10
                    },
                    {
                        name: '投诉监督',
                        value: 10
                    },
                    {
                        name: '其它警情',
                        value: 10
                    },*/
                ],
                jqflhbfxSource: [/*{
                    name: '刑事警情',
                    beforeYesterday: 800,
                    yesterday: 850
                },
                    {
                        name: '行政(治安)',
                        beforeYesterday: 700,
                        yesterday: 600
                    },
                    {
                        name: '交通类',
                        beforeYesterday: 1000,
                        yesterday: 1200
                    },
                    {
                        name: '消防救援',
                        beforeYesterday: 400,
                        yesterday: 300
                    },
                    {
                        name: '群众救助',
                        beforeYesterday: 200,
                        yesterday: 150
                    },
                    {
                        name: '应急联动事件',
                        beforeYesterday: 200,
                        yesterday: 150
                    },
                    {
                        name: '群体事件',
                        beforeYesterday: 200,
                        yesterday: 150
                    },
                    {
                        name: '纠纷',
                        beforeYesterday: 400,
                        yesterday: 500
                    },
                    {
                        name: '灾害事故',
                        beforeYesterday: 600,
                        yesterday: 600
                    },
                    {
                        name: '举报',
                        beforeYesterday: 600,
                        yesterday: 600
                    },
                    {
                        name: '投诉监督',
                        beforeYesterday: 600,
                        yesterday: 550
                    },
                    {
                        name: '其他警情',
                        beforeYesterday: 700,
                        yesterday: 800
                    }*/
                ],

                grading: [{
                    gradedm: 1,
                    proportion: 20
                },
                    {
                        gradedm: 2,
                        proportion: 40
                    },
                    {
                        gradedm: 3,
                        proportion: 60
                    },
                ],
                mapSource: [{
                    name: "娄烦县",
                    value: 10
                },
                    {
                        name: "古交市",
                        value: 0
                    },
                    {
                        name: "阳曲县",
                        value: 0
                    },
                    {
                        name: "万柏林区",
                        value: 0
                    },
                    {
                        name: "尖草坪区",
                        value: 0
                    },
                    {
                        name: "杏花岭区",
                        value: 0
                    },
                    {
                        name: "迎泽区",
                        value: 0
                    },
                    {
                        name: "晋源区",
                        value: 0
                    },
                    {
                        name: "小店区",
                        value: 0
                    },
                    {
                        name: "清徐县",
                        value: 0
                    },
                ],
                mapData: {
                    name: '有效警情',
                    value: 0,
                    hb: 0,
                },
                shoulian: {
                    name: '立案总数',
                    value: 0,
                    hb: 0,
                },
                //    今日接警类型数据分析、今日来话类型数据分析
                jrjjlxsjfxSourceSource: [],
                jrjjlxsjfxSourceColor: ['#ffe754', '#6becff', '#00fe90', '#c7efff', '#0096ff'],
                //    今日报警方式数据分析
                jrbjfssjfxSource: [],
                jrbjfssjfxColor: ['#ffffff', '#0096ff', '#76ffed', '#fff093', '#6400cb'],
                //    今日来话类型数据分析
                jrrlhlxsjfxSource: [],
                jrrlhlxsjfxColor: ['#6c96ff', '#4160fb', '#2626e7', '#e344ff', '#00b3e9', '#803ff7', '#6905c6', '#17fff3'],
                //    近七日接警类型数据分析
                sevenjjlxsjfxSource: [],
                // sevenjjlxsjfxSource: {},
                //    近七日报警方式数据分析
                sevenbjfssjfxSource: [],

                sevenlhlxsjfxSource: [],
                showIndex: 1,
                rankShow: false,
                // sevenlhlxsjfxSource:{}

                peak: [{
                    xzqhdm: '140100',
                    xzqhmc: '太原',
                    jjslsx: 5000
                },
                    {
                        xzqhdm: '140200',
                        xzqhmc: '大同',
                        jjslsx: 4000,
                    },
                    {
                        xzqhdm: '140600',
                        xzqhmc: '朔州',
                        jjslsx: 3000,
                    },
                    {
                        xzqhdm: '140900',
                        xzqhmc: '忻州',
                        jjslsx: 4000,
                    },
                    {
                        xzqhdm: '141100',
                        xzqhmc: '吕梁',
                        jjslsx: 1600,
                    },
                    {
                        xzqhdm: '140300',
                        xzqhmc: '阳泉',
                        jjslsx: 2000,
                    },
                    {
                        xzqhdm: '140700',
                        xzqhmc: '晋中',
                        jjslsx: 3600,
                    },
                    {
                        xzqhdm: '140400',
                        xzqhmc: '长治',
                        jjslsx: 4000,
                    },
                    {
                        xzqhdm: '141000',
                        xzqhmc: '临汾',
                        jjslsx: 4000,
                    },
                    {
                        xzqhdm: '140500',
                        xzqhmc: '晋城',
                        jjslsx: 3000,
                    },
                    {
                        xzqhdm: '140800',
                        xzqhmc: '运城',
                        jjslsx: 2000,
                    },
                ],
                geoCoordMap: {
                    '娄烦县': [111.81, 37.98],
                    '古交市':[112.16, 37.87],
                    '阳曲县':[112.68, 38.07],
                    '万柏林区': [112.40558624267578, 37.84],
                    '尖草坪区':[112.48, 37.94],
                    '杏花岭区':[112.63, 37.89],
                    '迎泽区':[112.7, 37.84],
                    '晋源区':[112.43785858154297, 37.69],
                    '小店区':[112.59, 37.68],
                    '清徐县': [112.40009307861328, 37.53]
                },
                flag: {
                    proportionValue: false, // 分布占比
                    peakValue: false, // 获取峰值
                    mapValue: false, // 获取地图数据
                }

            }
        },
        computed: {
            mapHbClass() {
                let c = '';
                if (this.mapData.hb > 0) {
                    c = 'up';
                } else if (this.mapData.hb == 0) {
                    c = 'static';
                } else {
                    c = 'down';
                }
                return c
            },
            mapHbIcon() {
                let c = '';
                if (this.mapData.hb > 0) {
                    c = 'iconxiangshang';
                } else if (this.mapData.hb == 0) {
                    c = 'iconchiping';
                } else {
                    c = 'iconxiangshang-copy';
                }
                return c
            },
            shoulianClass() {
                let c = '';
                if (this.shoulian.hb > 0) {
                    c = 'up';
                } else if (this.shoulian.hb == 0) {
                    c = 'static';
                } else {
                    c = 'down';
                }
                return c
            },
            shoulianHbIcon() {
                let c = '';
                if (this.shoulian.hb > 0) {
                    c = 'iconxiangshang';
                } else if (this.shoulian.hb == 0) {
                    c = 'iconchiping';
                } else {
                    c = 'iconxiangshang-copy';
                }
                return c
            },
        },
        methods: {
            setCity(){
                sessionStorage.setItem('city',JSON.stringify(this.$route.query.city));
            },
            //获取缩放比例
            getScale() {
                this.scale = localStorage.getItem('scale');
            },
            //    警情统计监测
            panChart() {
                let myChart = this.$echarts.init(document.getElementById('jqtjjcChart'));
                this.chartsObj.panChart = myChart; //放入charts对象方便后面的刷新缩放以及其他操作
                let myColor = [{left: "#07fe92", right: "#73ffb8"},
                    {left: "#0076ff", right: "#00f7ff"},
                    {left: "#febf07", right: "#f3fd66"}];
                let titlename = [];
                let data = [];
                let valdata = [];
                let that = this;
                let sourceArr = this.jqtjjcSource;
                sourceArr.forEach(value => {
                    titlename.push(value.name);
                    data.push(value.value);
                    valdata.push(100);
                });
                let option = {
                    xAxis: {
                        show: false
                    },
                    yAxis: [{
                        show: true,
                        data: titlename,
                        inverse: true,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#fff',
                            formatter: function (value, index) {
                                return value
                            },
                            textStyle: {
                                fontSize: 20 * this.scale,
                                color: '#fff',
                                fontWeight: 'bold'
                            },
                        },
                    }, {
                        show: true,
                        inverse: true,
                        data: data,
                        axisLabel: {
                            formatter: function (params) {
                                return params + '%'
                            },
                            textStyle: {
                                fontSize: 20 * this.scale,
                                color: '#fff',
                                fontWeight: 'bold'
                            },
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                    }],
                    tooltip:{
                        formatter:function (params) {
                            console.log(params);
                            let t='';
                            if (params.seriesName==='条'){
                                t=`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${myColor[params.dataIndex].left};"></span>`+params.name+'：'+params.value
                            }else {
                                t='';
                            }
                            return t;
                        }
                    },
                    series: [{
                        name: '条',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: data,
                        barWidth: 20 * this.scale,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 30,
                                color: function (params) {
                                    return new that.$echarts.graphic.LinearGradient(
                                        //右，下，左，上
                                        0, 0, 1, 0, [{
                                            //0%位置的颜色
                                            offset: 0,
                                            color: myColor[params.dataIndex].left
                                        },
                                            {
                                                //100%位置的颜色
                                                offset: 1,
                                                color: myColor[params.dataIndex].right
                                            }
                                        ]
                                    )
                                },
                            }
                        },
                    }, {
                        name: '框',
                        type: 'bar',
                        yAxisIndex: 1,
                        barGap: '-100%',
                        data: [100, 100, 100, 100, 100],
                        barWidth: 25 * this.scale,
                        itemStyle: {
                            normal: {
                                color: 'none',
                                borderColor: '#00c1de',
                                borderWidth: 2,
                                barBorderRadius: 15,
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                formatter: function (params) {
                                    return data[params.dataIndex] + '%'
                                }
                            }
                        },
                    },],
                    grid: {
                        top: 10 * this.scale,
                        bottom: 10 * this.scale,
                        left: 164 * this.scale,
                        right: 100 * this.scale,
                    }
                };
                myChart.setOption(option);
            },

            //    警情分类数据分析
            jqflsjfxChart(Arr, brr, crr) {
                // console.log(crr);
                let drr = [];
                Arr.forEach(value => {
                    drr.push(1);
                });
                // console.log(drr);
                let myChart = this.$echarts.init(document.getElementById('jqflsjfxChart'));
                this.chartsObj.jqflsjfxChart = myChart;
                let option = {
                    tooltip: {},
                    xAxis: {
                        data: Arr,
                        // "行政(治安)", "交通类",'消防救援','群众求助','应急联动事件（非警情事件）','群体事件','纠纷','灾害事故','举报','投诉监督','其它警情'
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 19 * this.scale,
                                fontWeight: 'bold'
                            },
                            interval: 0,
                            formatter: function (value, index) {
                                let type = index % 2 === 0 ? 'up' : 'down';
                                // console.log(type);
                                return '{' + type + '|' + value + '}'
                            },
                            rich: {
                                up: {
                                    height: 30 * this.scale,
                                    fontWeight: 'bold',
                                    fontSize: 16 * this.scale,
                                },
                                down: {
                                    height: 80 * this.scale,
                                    fontWeight: 'bold',
                                    fontSize: 16 * this.scale
                                },
                            }

                        },

                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        }
                    },
                    series: [{
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [24*this.scale, 10*this.scale],
                        symbolOffset: [0, -5],
                        z: 12,
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,255,174,1)'
                            }
                        },
                        label: {
                            show: true,
                            position: 'top',
                            fontWeight: 'bold',
                            fontSize: 18 * this.scale,
                            color: '#fff'
                        },
                        data: crr
                    }, {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [24*this.scale, 10*this.scale],
                        symbolOffset: [0, 5],
                        z: 12,
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,255,174,1)'
                            }
                        },
                        data: drr
                    }, {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,255,174,1)',
                                opacity: .7
                            }
                        },
                        // silent: true,
                        barWidth: 24*this.scale,
                        barGap: '-100%', // Make series be overlap
                        data: brr
                    }],
                    grid: {
                        top: 70 * this.scale,
                        bottom: 100 * this.scale,
                        left: 30 * this.scale,
                        right: 30 * this.scale
                    }
                };
                /*myChart.on('click', function (p) {
                    // console.log(p.value);
                    option.xAxis.axisLabel.formatter=function (params,index) {
                        if (params===p.value){
                            let c = index % 2 === 0 ? 'activeUp' : 'activeDown';
                            console.log(c);
                            return '{'+c+'|'+p.value+'}';
                            // return p.value
                        }else {
                            let type = index % 2 === 0 ? 'up' : 'down';
                            // console.log(type);
                            return '{' + type + '|' + params + '}'
                        }
                    };
                    option.xAxis.axisLabel.rich.activeUp={
                        height: 30 * that.scale,
                        fontWeight: 'bold',
                        fontSize: 16 * that.scale,
                        color:'red',
                    };
                    option.xAxis.axisLabel.rich.activeDown={
                        height: 80 * that.scale,
                        fontWeight: 'bold',
                        fontSize: 16 * that.scale,
                        color:'red',
                    };
                    myChart.setOption(option);
                });*/
                myChart.setOption(option);
            },
            //    警情分类环比
            jqflhbfxChart(typeArr, yesterdayArr, beforeYesterdayArr, hb) {
                let myChart = this.$echarts.init(document.getElementById('jqflhbfx'));
                this.chartsObj.jqflsjhbChart = myChart;
                let total = [];

                typeArr.forEach(value => {
                    total.push(0);
                });

                let option = {
                    tooltip: {},
                    xAxis: {
                        triggerEvent: true,
                        type: 'category',
                        data: typeArr,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#fff',
                                width: 2 * this.scale
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#ffffff',
                                fontWeight: 'bold'
                            },
                            margin: 25 * this.scale,
                            interval: 0,
                            formatter: function (value, index) {
                                let type = '';
                                if (index % 3 === 0) {
                                    type = 'up';
                                } else if (index % 3 === 1) {
                                    type = 'middle'
                                } else {
                                    type = 'down'
                                }
                                return '{' + type + '|' + value + '}'
                                // return value
                            },
                            rich: {
                                up: {
                                    height: 20 * this.scale,
                                    fontWeight: 'bold',
                                    fontSize: 18 * this.scale,
                                },
                                middle: {
                                    height: 70 * this.scale,
                                    fontWeight: 'bold',
                                    fontSize: 18 * this.scale,
                                },
                                down: {
                                    height: 120 * this.scale,
                                    fontWeight: 'bold',
                                    fontSize: 18 * this.scale,
                                }
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#fff',
                                width: 2 * this.scale,
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: 20 * this.scale,
                            color: '#fff',
                            margin: 10,
                            fontWeight: 'bold',
                        },
                        splitLine: {
                            show: false
                        },
                    },
                    series: [{
                        name: '昨日',
                        type: 'bar',
                        stack: '数量',
                        data: yesterdayArr,
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
                                //右，下，左，上
                                0, 0, 0, 1, [{
                                    //0%位置的颜色
                                    offset: 0,
                                    color: '#006cff'
                                }, {
                                    //0%位置的颜色
                                    offset: 0.5,
                                    color: '#00fcff'
                                },/*{
										//0%位置的颜色
										offset: 0.87,
										color: 'rgba(44,247,176,0.5)'
									},*/
                                    {
                                        //100%位置的颜色
                                        offset: 1,
                                        color: 'rgba(50,255,187,0)'
                                    }
                                ]
                            ),
                            barBorderRadius: [12 * this.scale, 12 * this.scale, 0, 0]
                        },
                        barWidth: 18 * this.scale
                    }, {
                        name: '前日',
                        type: 'bar',
                        stack: '数量',
                        data: beforeYesterdayArr,
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
                                //右，下，左，上
                                0, 0, 0, 1, [{
                                    //0%位置的颜色
                                    offset: 0,
                                    color: '#ffba00'
                                }, {
                                    //0%位置的颜色
                                    offset: 0.5,
                                    color: '#f3ff6a'
                                },/*{
										//0%位置的颜色
										offset: 0.87,
										color: 'rgba(189,244,49,0.5)'
									},*/
                                    {
                                        //100%位置的颜色
                                        offset: 1,
                                        color: 'rgba(187,255,50,0)'
                                    }
                                ]
                            ),
                            barBorderRadius: [12 * this.scale, 12 * this.scale, 0, 0]
                        },
                        barWidth: 18 * this.scale
                    }, {
                        name: '占比',
                        type: 'bar',
                        stack: '数量',
                        data: total,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: function (params) {
                                    let color = '';
                                    let p = 0;
                                    if (beforeYesterdayArr[params.dataIndex] == '0') {
                                        p = yesterdayArr[params.dataIndex]
                                    } else {
                                        p = Number(((yesterdayArr[params.dataIndex] - beforeYesterdayArr[params.dataIndex]) /
                                            beforeYesterdayArr[params.dataIndex]).toFixed(2));
                                    }
                                    if (p > 0) {
                                        color = 'red';
                                    } else if (p === 0) {
                                        color = 'yellow';
                                    } else {
                                        color = 'green';
                                        p = -p;
                                    }
                                    // console.log(p);
                                    return `{${color}|${p}}`
                                },
                                rich: {
                                    red: {
                                        color: '#ff5e17',
                                        fontSize: 16 * this.scale,
                                        fontWeight: 'bold'
                                    },
                                    green: {
                                        color: '#00ff78',
                                        fontSize: 16 * this.scale,
                                        fontWeight: 'bold'
                                    },
                                    yellow: {
                                        color: '#fdff05',
                                        fontSize: 16 * this.scale,
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        },
                    }, {
                        name: '环比增长',
                        type: 'bar',
                        stack: '数量',
                        data: total,
                        itemStyle: {
                            normal: {
                                color: '#ff5e17'
                            }
                        }
                    }, {
                        name: '环比减少',
                        type: 'bar',
                        stack: '数量',
                        data: total,
                        itemStyle: {
                            normal: {
                                color: '#00ff78'
                            }
                        }
                    }, {
                        name: '环比持平',
                        type: 'bar',
                        stack: '数量',
                        data: total,
                        itemStyle: {
                            normal: {
                                color: '#fdff05'
                            }
                        }
                    }],
                    legend: {
                        data: [{
                            name: '前日',
                        }, {
                            name: '昨日'
                        }, {
                            name: '环比增长',
                        }, {
                            name: '环比减少',
                        }, {
                            name: '环比持平',
                        }],
                        textStyle: {
                            color: '#fff',
                            fontSize: 16 * this.scale,
                            fontWeight: 'bold'
                        },
                        icon: "circle",
                        itemGap: 20 * this.scale,
                        top: 40 * this.scale
                    },
                    grid: {
                        top: 100 * this.scale,
                        bottom: 130 * this.scale,
                        left: 90 * this.scale,
                        right: 40 * this.scale
                    }
                };
                myChart.setOption(option);
                myChart.on('click',params=>{
                    this.$router.push({
                        name: '占比',
                        query: {
                            type: params.name||params.value
                        }
                    });
                });
            },
            //地图
            mapChart() {
                let cityObj = {};
                let mapdata = [];
                let flag = true;
                let that = this;
                let myChart = this.$echarts.init(document.getElementById('mapChart')); //初始化
                this.chartsObj = myChart;
                this.$http.get('static/json/140100_full.json').then(res => {
                    // console.log(res);
                    let d = [];
                    for (let i = 0; i < res.data.features.length; i++) {
                        cityObj[res.data.features[i].properties.name] = res.data.features[i].properties.adcode;
                    }
                    mapdata = d;
                    // console.log(mapdata);
                    // 注册地图
                    that.$echarts.registerMap('太原市', res.data);
                    // 绘制地图
                    renderMap('太原市', that.mapSource, that.geoCoordMap);
                });

                let option = {
                    animationDuration: 1000,
                    animationEasing: 'cubicOut',
                    animationDurationUpdate: 1000,
                };

                let convertData = function (d) {
                    // console.log(d);
                    let res = [];
                    for (let i = 0; i < d.length; i++) {
                        let geoCoord = that.geoCoordMap[d[i].name];
                        // console.log(that.geoCoordMap[data[i].name]);
                        if (geoCoord) {
                            res.push({
                                name: d[i].name,
                                value: geoCoord.concat(d[i].value)
                            });
                        }
                        // console.log(d[i].value);
                    }
                    return res;
                };

                function renderMap(map, data) {
                    // console.log(geo);
                    // 初始化绘制全国地图配置

                    option.series = [{
                        name: '',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        symbolSize: 1,
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    if (params.data.name === '杏花岭区') {
                                        params.data.name = '1';
                                    } else if (params.data.name === '迎泽区') {
                                        params.data.name = '2';
                                    } else if (params.data.name === '小店区') {
                                        params.data.name = '3';
                                    }
                                    ;
                                    // console.log(params.data.name);
                                    return params.data.name
                                },
                                position: 'top',
                                textStyle: {
                                    fontSize: 20 * that.scale,
                                    fontWeight: 'bold',
                                    color: '#9a8758'
                                }
                            },
                            emphasis: {
                                formatter: function (params) {
                                    return params.data.name
                                },
                                position: 'top',
                                show: true,
                                textStyle: {
                                    fontSize: 20 * that.scale,
                                    fontWeight: 'bold',
                                    color: '#9a8758'
                                }
                            }
                        },
                        itemStyle: {
                            color: 'transparent'
                        },
                        animation: false
                    },
                        {
                            map: map,
                            type: 'map',
                            mapType: map,
                            roam: false,
                            data: data,
                            zoom: 1.2,
                            nameMap: {
                                '山西省': '山西省'
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: '#d1bd8f'
                                },
                                emphasis: {
                                    areaColor: '#d1bd8f'
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                    formatter: function (params) {
                                        return params.name
                                    },
                                    position: 'inside',
                                    color: '#9a8758',
                                    textStyle: {
                                        fontSize: 20 * that.scale,
                                        fontWeight: 'bold'
                                    }
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                        },
                    ];
                    option.geo = {
                        show: false,
                        map: map,
                        zoom: 1.2,
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        roam: false,
                    };
                    option.tooltip={
                        formatter:function (params) {
                            return params.name+'：'+params.value;
                        }
                    };
                    myChart.setOption(option);
                    // console.log(option);
                }

				myChart.on('click',(params)=>{
					$("#msg").remove();
					let pWidth=200;
					let content='正在开发，尚未开发';
					        var html ='<div id="msg" style="position:fixed;top:50%;width:100%;height:30px;line-height:30px;margin-top:-15px;"><p style="background:#000;opacity:0.8;width:'+ pWidth +'px;color:#fff;text-align:center;padding:10px 10px;margin:0 auto;font-size:12px;border-radius:4px;">'+ content +'</p></div>'
					                $("body").append(html);
					                var t=setTimeout(next,2000);
					                function next()
					                {
					                    $("#msg").remove();

					                }
				})
			},

            //    今日接警类型数据分析、今日报警方式数据分析、今日来话类型数据分析

            //渲染图表
            renderChart() {
                let myCharts = document.querySelectorAll('.chart');
                myCharts.forEach(value => {
                    this.refreshCharts.push(value.getAttribute('id'))
                });


                let that = this;
                let Index = {
                    init() {
                        this.loadData();
                        Public.chartsResize(that.chartsObj);
                        Public.chartsReDraw(that.chartsObj, null, [
                            ''
                        ], that.refreshCharts, this.loadData)
                    },
                    loadData() {
                        that.flag = {
                            proportionValue: false, // 分布占比
                            peakValue: false, // 获取峰值
                            mapValue: false, // 获取地图数据
                        };
                        // 获取地图数据
                        that.getPeak(); //获取峰值
                        that.getGrading(); //获取分布占比设置
                        that.getMapData(); // map  数据

                        that.getJqtj(); //警情统计监测  左上角
                        // that.getFlsj();
                        that.getYxjqHb();
                        that.getJqfl();
                        that.getJqflHb();
                        // that.jqflhbfxChart();
                        // that.getJjlxSeven();
                        // that.getBjfsSeven();
                        // that.getLhlxSeven();

                    },
                };
                Index.init();
            },

            // 警情统计监测  左上角
            getJqtj() {
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[0],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'crossDomain': true
                    },
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        // tjTime: 20160909,
                        tjTime: this.todayIndex,
                    }
                })
                    .then(function (res) {

                        // cjsl: 14020      //处警事件总数 // fksl: 7419   //反馈事件总数 // hb: 0      //环比
                        // jjsl: 18669    //报警事件总数 // yxjq: 4887  //有效警情总数
                        this.jqtjjcData[0]['value'] = res['data'][0]['jjsl'];
                        this.mapData['value'] = res['data'][0]['yxjq'];
                        this.jqtjjcData[1]['value'] = res['data'][0]['yxjq'];
                        this.jqtjjcData[2]['value'] = res['data'][0]['cjsl'];
                        this.jqtjjcData[3]['value'] = res['data'][0]['fksl'];

                        // 处警事件占比
                        let sum1 = res['data'][0]['cjsl'] / res['data'][0]['yxjq'];

                        // 有效警情占比
                        let sum2 = res['data'][0]['yxjq'] / res['data'][0]['jjsl'];
                        // 反馈事件占比
                        let sum3 = res['data'][0]['fksl'] / res['data'][0]['cjsl'];

                        if (sum1 > 1) {
                            this.jqtjjcSource[0]['value'] = 100
                        } else {
                            this.jqtjjcSource[0]['value'] = parseFloat(sum1 * 100).toFixed(2);
                        }
                        if (sum2 > 1) {
                            this.jqtjjcSource[1]['value'] = 100;
                        } else {
                            this.jqtjjcSource[1]['value'] = parseFloat(sum2 * 100).toFixed(2);
                        }
                        if (sum3 > 1) {
                            this.jqtjjcSource[2]['value'] = 100;
                        } else {
                            this.jqtjjcSource[2]['value'] = parseFloat(sum3 * 100).toFixed(2);
                        }


                        this.panChart();
                    }.bind(this))
            },
            getJqfl() {
                let timestamp = (new Date()).getTime();
                let day1 = timestamp;
                let day2 = timestamp - 24 * 60 * 60 * 1000;
                let date1 = new Date(day1);
                let date2 = new Date(day2);
                let start1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate()
                    .toString().padStart(2, '0');
                let start2 = date2.getFullYear().toString() + (date2.getMonth() + 1).toString().padStart(2, '0') + date2.getDate()
                    .toString().padStart(2, '0');
                // console.log(start1);
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + 'recJQFLTJB/findJQFLNumXZQHHB',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'crossDomain': true
                    },
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        qtTime: start2,
                        tjTime: start1,
                        xzqhdm: JSON.parse(sessionStorage.getItem('city'))
                    }
                }).then(res => {
                    if (res.status===200){
                        let hb1='';
                        let nameArr1=[];
                        let yesterday1=[];
                        let yesterdayArr1=[];
                        if(res.data.jqflsyhb.ZTHB!=='{}'){
                            hb1=res.data.jqflsyhb.ZTHB.slice(1,res.data.jqflsyhb.ZTHB.length-1);
                            yesterday1=res.data.jqflsyhb.ZT.slice(1,res.data.jqflsyhb.ZT.length-1);
                            function toJson(str) {
                                return eval("("+toArray(str)+")");
                            }
                            //返回拼好json格式的字符串
                            function toArray(str) {
                                var list = str.split(",");
                                var myStr = "{";
                                for(var i=0;i<list.length;i++)
                                {
                                    try{
                                        var keys = list[i].split("=");
                                        var key = Trim(keys[0]);
                                        var value= Trim(keys[1]);
                                        if(i>0)
                                        {
                                            myStr += ",";
                                        }
                                        myStr += "\""+key+"\":\""+value+"\"";
                                    }catch(e)
                                    {
                                        continue;
                                    }
                                }
                                myStr += "}";
                                return myStr;
                            }
                            //替换掉字符串中头尾的空格
                            function Trim(str){
                                return str.replace(/(^\s*)|(\s*$)/g, "");
                            }
                            hb1=toJson(hb1);
                            yesterday1=toJson(yesterday1);
                            for (let item in hb1) {
                                item=item.slice(0,item.length-2);
                                nameArr1.push(item);
                            }
                            for (let i=0;i<nameArr1.length;i++){
                                if (nameArr1[i] in yesterday1){
                                    yesterdayArr1.push(yesterday1[nameArr1[i]]);
                                }else {
                                    // that.jqflhbfxSource[i].yesterday='0';
                                    yesterdayArr1.push('0');
                                }
                            }
                        }
                        let crr=[];
                        yesterdayArr1.forEach(value => {
                            crr.push({
                                value: value,
                                symbolPosition: 'end'
                            })
                        });
                        this.jqflsjfxChart(nameArr1, yesterdayArr1, crr);
                    }else{
                        console.log(res.statusText);
                    }
                }).catch(res=>{
                    console.log(res);
                })
            },
            getJqflHb() {
                let that=this;
                //1 昨天，2 前天
                let timestamp = (new Date()).getTime();
                let day1 = timestamp - 24 * 60 * 60 * 1000;
                let day2 = timestamp - 2 * 24 * 60 * 60 * 1000;
                let date1 = new Date(day1);
                let date2 = new Date(day2);
                let start1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate()
                    .toString().padStart(2, '0');
                let start2 = date2.getFullYear().toString() + (date2.getMonth() + 1).toString().padStart(2, '0') + date2.getDate()
                    .toString().padStart(2, '0');
                this.$http({
                    method: 'post',
                    url: this.apiRoot + 'recJQFLTJB/findJQFLNumXZQHHB',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'crossDomain': true
                    },
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        qtTime: start2,
                        tjTime: start1,
                        xzqhdm: JSON.parse(sessionStorage.getItem('city'))
                    }
                }).then(res => {
                    if (res.status===200){
                        let hb='';
                        let nameArr=[];
                        let yesterday=[];
                        let yesterdayArr=[];
                        let beforeYesterday=[];
                        let beforeYesterdayArr=[];
                        if(res.data.jqflsyhb.ZTHB!=='{}'){
                            hb=res.data.jqflsyhb.ZTHB.slice(1,res.data.jqflsyhb.ZTHB.length-1);
                            yesterday=res.data.jqflsyhb.ZT.slice(1,res.data.jqflsyhb.ZT.length-1);
                            beforeYesterday=res.data.jqflsyhb.QT.slice(1,res.data.jqflsyhb.QT.length-1);
                            function toJson(str) {
                                return eval("("+toArray(str)+")");
                            }
                            //返回拼好json格式的字符串
                            function toArray(str) {
                                var list = str.split(",");
                                var myStr = "{";
                                for(var i=0;i<list.length;i++)
                                {
                                    try{
                                        var keys = list[i].split("=");
                                        var key = Trim(keys[0]);
                                        var value= Trim(keys[1]);
                                        if(i>0)
                                        {
                                            myStr += ",";
                                        }
                                        myStr += "\""+key+"\":\""+value+"\"";
                                    }catch(e)
                                    {
                                        continue;
                                    }
                                }
                                myStr += "}";
                                return myStr;
                            }
                            //替换掉字符串中头尾的空格
                            function Trim(str){
                                return str.replace(/(^\s*)|(\s*$)/g, "");
                            }
                            hb=toJson(hb);
                            yesterday=toJson(yesterday);
                            beforeYesterday=toJson(beforeYesterday);
                            for (let item in hb) {
                                item=item.slice(0,item.length-2);
                                nameArr.push(item);
                            }
                            for (let i=0;i<nameArr.length;i++){
                                if (nameArr[i] in yesterday){
                                    yesterdayArr.push(yesterday[nameArr[i]]);
                                }else {
                                    // that.jqflhbfxSource[i].yesterday='0';
                                    yesterdayArr.push('0');
                                }
                                if (nameArr[i] in beforeYesterday){
                                    beforeYesterdayArr.push(beforeYesterday[nameArr[i]]);
                                }else {
                                    // that.jqflhbfxSource[i].beforeYesterday='0';
                                    beforeYesterdayArr.push('0');
                                }
                            }
                        }
                        this.jqflhbfxChart(nameArr, yesterdayArr, beforeYesterdayArr, hb);
                    }else{
                        console.log(res.statusText);
                    }
                }).catch(res=>{
                    console.log(res);
                })
            },
            // 地图
            getMapData() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[3],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'crossDomain': true
                    },
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        tjTime: this.todayIndex
                        // tjTime: 20160909,  //今天
                    }
                })
                    .then(function (res) {
                        res['data'].forEach((item, index) => {

                            that.ranking[index]['xzqhdm'] = item['xzqhdm'];
                            that.ranking[index]['jjsl'] = item['jjsl'];
                            that.ranking[index]['yxjq'] = item['yxjq'];
                            that.rankShow = true;
                        });
                        res.data.map(item => {
                            item.name = item.xzqhdm + '市';
                            item.value = item.yxjq;

                            return item;
                        });
                        //把data合并到source
                        res.data.forEach(function (o, d) {
                            for (let k in o) {
                                that.mapSource.forEach(function (t) {
                                    for (let key in t) {
                                        if (t.name == o.name) {
                                            t[k] = o[k];
                                        }
                                    }
                                })
                            }
                        });

                        that.flag.mapValue = true;
                        that.mapChart();
                    })
            },
            //获取7天日期
            getDate() {
                let date = new Date();
                this.todayIndex = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate()
                    .toString().padStart(2, '0');
                let timestamp = date.getTime();
                let day1 = timestamp - 2 * 24 * 60 * 60 * 1000;
                let day = timestamp - 6 * 24 * 60 * 60 * 1000;
                let date1 = new Date(day1);
                this.threeDaysAgo = date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate()
                    .toString().padStart(2, '0');
                let date2 = new Date(day);
                this.sevenDaysAgo = date2.getFullYear().toString() + (date2.getMonth() + 1).toString().padStart(2, '0') + date2.getDate()
                    .toString().padStart(2, '0');
            },

            //获取环比
            getYxjqHb() {
                //1 昨天，2 前天
                let timestamp = (new Date()).getTime();
                let day1 = timestamp - 24 * 60 * 60 * 1000;
                let day2 = timestamp - 2 * 24 * 60 * 60 * 1000;
                let date1 = new Date(day1);
                let date2 = new Date(day2);
                let start1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate()
                    .toString().padStart(2, '0');
                let start2 = date2.getFullYear().toString() + (date2.getMonth() + 1).toString().padStart(2, '0') + date2.getDate()
                    .toString().padStart(2, '0');
                this.$http({
                    method: 'get',
                    url: this.apiRoot + 'recJQTJB/findNumSYHB',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'crossDomain': true
                    },
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    params: {
                        // tjTime: 20160909,
                        qtTime: start2,
                        tjTime: start1
                    }
                }).then(res => {
                    // console.log(res);
                    this.mapData.hb = parseFloat((res.data['Sjqhbfx']['有效警情环比'] * 100).toFixed(2));
                    if (this.mapData.hb > 100) {
                        this.mapData.hb = 100;
                    }
                    if (this.mapData.hb < -100) {
                        this.mapData.hb = -100
                    }
                })
            },
        },
        mounted() {
            this.setCity();
            this.getDate();
            this.getScale();
            this.panChart();
            this.mapChart();

            this.getJqfl();
            /*let arr = [];
            let brr = [];
            let crr = [];
            this.jqflsjfxSource.forEach(value => {
                arr.push(value.name);
                brr.push(value.value);
                crr.push({
                    value: value.value,
                    symbolPosition: 'end'
                })
            });
            this.jqflsjfxChart(arr, brr, crr);*/


            this.getJqflHb();
            /*let typeArr = [];
            let yesterdayArr = [];
            let beforeYesterdayArr = [];
            let hb = '';
            this.jqflhbfxSource.forEach(value => {
                typeArr.push(value.name);
                yesterdayArr.push(value.yesterday);
                beforeYesterdayArr.push(value.beforeYesterday)
            });
            this.jqflhbfxChart(typeArr, yesterdayArr, beforeYesterdayArr, hb);*/
			// console.log($);
        },
        beforeDestroy() {
            clearInterval(counter);
            counter = null;


        }, //生命周期 - 销毁之前
    }
</script>

<style scoped lang="scss">
    //样式里的l, m, r, t, b分别代表左，中，右，上，下
    //布局
    .myContainer{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 96%;
        height: 100%;
        margin: auto;
        margin-top: -1%;
    }
    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 1.2rem;

        h3 {
            cursor: pointer;
        }

        .up {
            color: #ff5e17;
        }

        .down {
            color: #00ffa2;
        }

        .static {
            color: #fff900;
        }

        .title_wrap {
            width: 100%;
            height: 3.6rem;
            cursor: pointer;
            box-sizing: border-box;
            position: relative;
            background-repeat: no-repeat;
            background-size: auto 100%;

            span {
                height: 100%;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                font-size: 1.5rem;
                letter-spacing: 2px;
            }
        }

        .t {
            width: 100%;
            height: 40%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .t-l {
                width: 33%;
                height: 100%;

                .title_wrap {
                    background-image: url("../assets/images/index/title_left.png");
                    background-position: left;

                    span {
                        float: left;
                        margin-left: 13%;
                    }
                }

                .chartBox {
                    width: 100%;
                    height: calc(100% - 3.6rem);
                    background-image: url("../assets/images/index/t-l.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    font-weight: bold;
                    float: left;

                    //数据
                    .statistics {
                        width: 100%;
                        margin: 6% 0 0;
                        display: flex;
                        justify-content: space-around;

                        li {
                            p {
                                text-align: center;
                                color: #ffe754;
                                letter-spacing: 2px;

                                &:first-child {
                                    margin-bottom: 0.3rem;
                                    color: #ffffff;
                                    font-size: 1.2rem;
                                }

                                &:nth-child(2) {
                                    font-weight: 900;
                                    font-size: 1.4rem;
                                }
                            }
                        }
                    }

                    /*图表*/
                    #jqtjjcChart {
                        width: 100%;
                        // height: 8.19rem;
                        flex: 1;
                        height: 60%;
                    }
                }
            }

            .t-m {
                width: 26%;
                height: 100%;
                position: relative;

                .box {
                    position: absolute;
                    bottom: 16%;
                    /*right: 0;*/
                    left: 21%;
                    /*margin: auto;*/
                    width: 70%;
                    height: 57%;

                    table {
                        width: 100%;
                        height: 100%;
                        font-weight: bold;

                        .iconfont {
                            margin-left: 0.2rem;
                            font-size: 1.4rem;
                        }

                        tr:nth-child(1) {
                            td:nth-child(1) {
                                font-size: 1.6rem;
                            }

                            td:nth-child(2) {
                                font-size: 1.3rem;
                            }
                        }

                        tr:nth-child(2) {
                            td:nth-child(1) {
                                font-size: 2rem;
                                color: #ffe754;
                            }

                            td:nth-child(2) {
                                font-size: 1.5rem;
                                color: #ff9c54;
                            }
                        }

                        tr:nth-child(3) {
                            td {
                                font-size: 1.3rem;
                            }
                        }

                        tr:nth-child(4) {
                            td:nth-child(1) {
                                font-size: 1.5rem;
                            }

                            td:nth-child(2) {
                                font-size: 1.5rem;
                            }
                        }
                    }
                }

            }

            .t-r {
                width: 41%;
                height: 100%;

                .title_wrap {
                    background-image: url("../assets/images/index/title_right.png");
                    background-position: right;

                    span {
                        float: right;
                        margin-right: 10%;
                    }
                }

                .chartBox {
                    width: 100%;
                    height: calc(100% - 3.6rem);
                    background-image: url("../assets/images/index/t-r.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    font-weight: bold;
                    float: left;
                }
            }
        }

        .b {
            width: 100%;
            height: 56%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;

            .b-l {
                width: 28%;
                height: 100%;

                .title_wrap {
                    background-image: url("../assets/images/index/title_left.png");
                    background-position: left;

                    span {
                        float: left;
                        margin-left: 15%;
                    }
                }

                .chartBox {
                    height: calc(100% - 3.6rem);
                    letter-spacing: 4px;
                    padding: 5% 4% 0;
                    box-sizing: border-box;
                    background-image: url("../assets/images/index/b-l.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    /*position: relative;*/
                    .myBox{
                        width: 100%;
                        height: 95%;
                        overflow: auto;
                        position: relative;
                        &::-webkit-scrollbar {
                            width: 1rem;     /*高宽分别对应横竖滚动条的尺寸*/
                            height: 1px;
                        }
                        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                            border-radius: 10px;
                            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                            background: #4c7fff;
                        }
                        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                            border-radius: 10px;
                            background: #e1ebff;
                        }
                        table {
                            width: 100%;
                            height: 90%;
                            position: absolute;
                            top: 0;
                            left: 0;

                            tr {
                                width: 100%;
                                td {
                                    text-align: center;
                                    font-size: 1.2rem;
                                }

                                .sp1 {
                                    /*cursor: pointer;*/
                                    color: #FFFFFF;
                                    font-weight: 550;
                                }

                                .sp2 {
                                    color: #ffe754;
                                    font-weight: bold;
                                    letter-spacing: 2px;
                                }

                                .sp3 {
                                    color: #0effb2;
                                    font-weight: bold;
                                    letter-spacing: 2px;
                                }
                            }
                        }
                    }
                }
            }

            .b-m {
                width: 33%;
                height: 110%;
                background-image: url(../assets/images/index/mapBg.png);
                background-size: 80% auto;
                background-repeat: no-repeat;
                background-position: center;
                margin-top: -3.6%;
                position: relative;

                .chartBox {
                    width: 100%;
                    height: 100%;
                }

                .mapLegend {
                    position: absolute;
                    bottom: 0;
                    left: 10%;

                    p {
                        font-size: 1.3rem;
                        font-weight: bold;
                        letter-spacing: 2px;
                    }
                }
            }

            .b-r {
                width: 38.9%;
                height: 100%;
                flex-grow: 1;

                .title_wrap {
                    background-image: url("../assets/images/index/title_right.png");
                    background-position: right;

                    span {
                        float: right;
                        margin-right: 10%;
                    }
                }

                .chartBox {
                    background-image: url("../assets/images/index/b-r.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    height: calc(100% - 3.6rem);
                }
            }
        }

        .chart {
            width: 100%;
            height: 100%;
        }

        .chart-wrap {
            width: 100%;
            height: 100%;
        }

        .chartBox {
            width: 100%;
            height: 100%;
        }
    }
</style>
