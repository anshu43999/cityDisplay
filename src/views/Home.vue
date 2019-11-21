<template>
    <div id="container" @click="hideJump">
        <my-header :topTitle='topTitle'></my-header>
        <main @click="filter">
            <!--<div class="goLawCase" @click="skiping">
                <div class="box">
                    <p>受立案情况统计</p>
                </div>
                <i class="iconfont iconxiangzuoshuangjiantou"></i>
            </div>-->

            <!--样式里的l,m,r,t,b分别代表左，中，右，上，下-->
            <div class="l">
                <div class="l-t">
                    <div class="chart-wrap">
                        <!--                    标题-->
                        <div class="title_wrap filter">
                            警情统计监测
                            <div class="options">
                                <div>
                                    <!--<div>
                                        <img class="iconBox" data-id="jjlx" src="../assets/images/index/childrenPage.png">
                                    </div>-->
                                    <div data-id="jjlx" class="option">
                                        <div class="filterTitle">
                                            <div>页面跳转</div>
                                        </div>
                                        <ul class="filterItem" @click="selectItem">
                                            <li v-for="item in periodArr2" :key="item">
                                                <div data-id="jjlx">{{item}}</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--                    内容-->
                        <div class="chartBox">
                            <!--                        数据-->
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


                <!-- 警情分类数据分析 -->
                <div class="l-b">
                    <div class="chart-wrap">
                        <!--                    标题-->
                        <div class="title_wrap">今日各市警情数据分析</div>
                        <!--                    内容-->
                        <div class="chartBox" v-show="rankShow">
                            <ul>
                                <li>
                                    <span class="span1">地市</span>
                                    <span class="span2">报警总数</span>
                                    <span class="span3">有效警情</span>
                                </li>
                                <li v-for="(item,index) in  ranking" :key="index">
                                    <span class="span1 sp1" @click="jump">{{item['xzqhdm']}}</span>
                                    <span class="span2 sp2">{{item['jjsl']}}</span>
                                    <span class="span3 sp3">{{item['yxjq']}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>


            <div class="m_wrap">
                <div class="m">
                    <div class="chart-wrap">
                        <div class="chartBox">
                            <div class="yxjq">
                                <p>{{mapData.name}}</p>
                                <p>{{mapData.value}}</p>
                            </div>
                            <div class="yxjqhb">
                                <p>{{mapData.name}}环比</p>
                                <p :class="mapHbClass">
                                    {{
                                    mapData.hb<0?-mapData.hb:mapData.hb
                                    }}%
                                    <i :class="['iconfont',mapHbIcon]"></i>
                                </p>
                            </div>
                            <div class="shoulian">
                                <p>{{shoulian.name}}</p>
                                <p>{{shoulian.value}}</p>
                            </div>
                            <div class="shoulianhb">
                                <p>{{shoulian.name}}环比</p>
                                <p :class="shoulianClass">
                                    {{
                                    shoulian.hb<0?-shoulian.hb:shoulian.hb
                                    }}%
                                    <i :class="['iconfont',shoulianHbIcon]"></i>
                                </p>
                            </div>
                            <!--                        图表-->
                            <div id="mapChart" class="chart"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="r">

                <div class="r-t">
                    <!--<div class="options">
                        <div class="timer_btn" @click="selectItem">
                            <img class="iconBox" data-id="jqfl" src='../assets/images/index/filter_time.png'>
                        </div>
                        <div data-id="jqfl" class="option">
                            <div class="filterTitle">
                                <div>时间筛选</div>
                            </div>
                            <ul class="filterItem" @click="selectItem">
                                <li v-for="item in periodArr1" :key="item">
                                    <div data-id="jqfl">{{item}}</div>
                                </li>
                            </ul>
                        </div>

                    </div>
-->
                    <div class="chart-wrap">
                        <div @click="jump" class="title_wrap">警情分类数据分析</div>
                        <div class="chartBox">
                            <div class="chart" id="jqflsjfxChart"></div>
                        </div>
                    </div>


                </div>

                <div class="r-b">
                    <!--<div class="options">
                        <div>
                            <div>
                                <img class="iconBox" data-id="jjlx" src="../assets/images/index/filter_time.png">
                            </div>
                            <div data-id="jjlx" class="option">
                                <div class="filterTitle">
                                    <div>时间筛选</div>
                                </div>
                                <ul class="filterItem" @click="selectItem">
                                    <li v-for="item in periodArr" :key="item">
                                        <div data-id="jjlx">{{item}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div>
                                <img class="iconBox" data-id="jjlx" src="../assets/images/index/childrenPage.png">
                            </div>
                            <div data-id="jjlx" class="option">
                                <div class="filterTitle">
                                    <div>页面跳转</div>
                                </div>
                                <ul class="filterItem" @click="selectItem">
                                    <li v-for="item in periodArr2" :key="item">
                                        <div data-id="jjlx">{{item}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </div>-->


                    <!--					<div :class="[showIndex === 1 ? 'showIndex' : 'disappear'    ,'chart-wrap']">-->
                    <!--						<div @click="jump" class="title_wrap">接警类型数据分析</div>-->
                    <!--						<div class="chartBox">-->
                    <!--							<div class="chart" id="sevenjjlxsjfxChart"></div>-->
                    <!--						</div>-->
                    <!--					</div>-->

                    <!--					<div :class="[showIndex === 2 ? 'showIndex' : 'disappear'    ,'chart-wrap']">-->
                    <!--						<div @click="jump" class="title_wrap">报警方式数据分析</div>-->
                    <!--						<div class="chartBox">-->
                    <!--							<div class="chart" id="sevenbjfssjfxChart"></div>-->
                    <!--						</div>-->
                    <!--					</div>-->

                    <!--					<div :class="[showIndex === 3 ? 'showIndex' : 'disappear'    ,'chart-wrap']">-->
                    <!--						<div @click="jump" class="title_wrap">来话类型数据分析</div>-->
                    <!--						<div class="chartBox">-->
                    <!--							<div class="chart" id="sevenlhlxsjfxChart"></div>-->
                    <!--						</div>-->
                    <!--					</div>-->

                    <div :class="[showIndex === 1 ? 'showIndex' : 'disappear'    ,'chart-wrap']">
                        <div @click="jump" class="title_wrap">警情分类环比分析</div>
                        <div class="chartBox">
                            <div class="chart" id="jqflhbfx"></div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
        <my-setting :map-source="mapSource" :grading="grading" :peak="peak"></my-setting>
        <my-link></my-link>
    </div>
</template>

<script>
    import MyHeader from "../components/Header";
    import MySetting from "../components/Setting";
    import MyLink from "../components/Link";
    // import gl from "../assets/js/GL"

    export default {
        name: "Test",
        components: {
            MyHeader,
            MySetting,
            MyLink
        },
        data() {
            return {
                // 标题
                topTitle: '山西省公安厅情报指挥中心警情分析统计系统',
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
                    value: 0,
                    radius: '55%'
                },
                    {
                        name: '有效警情占比',
                        value: 0,
                        radius: '55%'
                    },
                    {
                        name: '已反馈数占比',
                        value: 0,
                        radius: '55%'
                    }
                ],

                // 排名
                ranking: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}

                ],

                //    近期警情统计  y
                jqjqtjScoure: [],
                //  近期警情统计  x
                // jqjqtjXdata: ['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7'],

                //    警情分类数据分析
                jqflsjfxSource: [],
                jqflhbfxSource: [/*{
                    name: '刑事警情',
                    beforeYesterday: 800,
                    yesterday: 850
                },
                    {
                        name: '行政治安',
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
                    name: "太原市",
                    value: 0
                },
                    {
                        name: "长治市",
                        value: 0
                    },
                    {
                        name: "朔州市",
                        value: 0
                    },
                    {
                        name: "运城市",
                        value: 0
                    },
                    {
                        name: "大同市",
                        value: 0
                    },
                    {
                        name: "晋城市",
                        value: 0
                    },
                    {
                        name: "晋中市",
                        value: 0
                    },
                    {
                        name: "临汾市",
                        value: 0
                    },
                    {
                        name: "忻州市",
                        value: 0
                    },
                    {
                        name: "阳泉市",
                        value: 0
                    },
                    {
                        name: "吕梁市",
                        value: 0
                    },
                ],
                geoCoordMap: {
                    "太原市": [112.549248, 36]
                },
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
            //获取缩放比例
            getScale() {
                this.scale = localStorage.getItem('scale');
            },
            //    警情统计监测
            panChart() {
                let myChart = this.$echarts.init(document.getElementById('jqtjjcChart'));
                this.chartsObj.panChart = myChart; //放入charts对象方便后面的刷新缩放以及其他操作
                let that = this;
                let sourceArr = this.jqtjjcSource;
                let colorSet = [
                    [0.2, '#ffe754'],
                    [0.8, '#0079cc'],
                    [1, '#1af7f1']
                ];
                let option = {
                    series: (function () {
                        let result = [];
                        sourceArr.forEach(function (item, index) {
                            result.push(
                                // 外围仪表盘刻度与数字
                                {
                                    name: item.name,
                                    type: 'gauge',
                                    center: [index * 28 + 22 + '%', '45%'],
                                    radius: item.radius,
                                    splitNumber: 2,
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            color: colorSet,
                                            width: 14 * that.scale,
                                            shadowOffsetX: 0,
                                            shadowOffsetY: 0,
                                            opacity: 1
                                        }
                                    },
                                    pointer: {
                                        show: false,
                                    },
                                    detail: {
                                        show: false,
                                    },
                                    splitLine: {
                                        length: 10 * that.scale,
                                        lineStyle: {
                                            width: 2 * that.scale
                                        }
                                    },
                                    axisTick: {
                                        show: true,
                                        splitNumber: 5,
                                        length: 6 * that.scale,
                                        lineStyle: {
                                            width: 1 * that.scale
                                        }
                                    },
                                    axisLabel: {
                                        fontSize: 16 * that.scale, // 刻度盘 数字
                                        color: '#91c7ae',
                                    },
                                    data: [{
                                        value: item.value
                                    }]
                                },
                                // 小刻度
                                {
                                    name: item.name,
                                    type: 'gauge',
                                    center: [index * 28 + 22 + '%', '45%'],
                                    radius: item.radius,
                                    splitNumber: 2,
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                            color: colorSet,
                                            width: 18 * that.scale,
                                            shadowOffsetX: 0,
                                            shadowOffsetY: 0,
                                            opacity: 1
                                        }
                                    },
                                    pointer: {
                                        show: false,
                                    },
                                    detail: {
                                        show: false,
                                    },
                                    splitLine: {
                                        length: 14 * that.scale,
                                        lineStyle: {
                                            width: 1 * that.scale
                                        }
                                    },
                                    axisTick: {
                                        show: true,
                                        splitNumber: 25,
                                        length: 2 * that.scale,
                                        lineStyle: {
                                            width: 1 * that.scale
                                        }
                                    },
                                    axisLabel: {
                                        show: false,
                                    },
                                    data: [{
                                        value: item.value
                                    }]
                                },
                                // 内侧指针、数值显示
                                {
                                    name: item.name,
                                    type: 'gauge',
                                    center: [index * 28 + 22 + '%', '45%'],
                                    radius: item.radius,
                                    splitNumber: 2,
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                            color: colorSet,
                                            width: 15 * that.scale,
                                            shadowOffsetX: 0,
                                            shadowOffsetY: 0,
                                            opacity: 1
                                        }
                                    },
                                    pointer: {
                                        show: true,
                                        length: '70%', // 指针
                                        width: 5 * that.scale
                                    },
                                    detail: {
                                        show: true,
                                        offsetCenter: [0, '140%'],
                                        textStyle: {
                                            fontSize: 20 * that.scale, //百分比
                                            color: '#5ae6ff',
                                            fontWeight: 'bold'
                                        },
                                        formatter: [
                                            '{value}% ' + (item.unit || ''),
                                            '{name|' + item.name + '}'
                                        ].join('\n'),
                                        rich: {
                                            name: {
                                                fontSize: 20 * that.scale,
                                                lineHeight: 50 * that.scale, //下方文字描述
                                                color: '#ffffff',
                                            }
                                        }
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                    axisLabel: {
                                        show: false,
                                    },
                                    data: [{
                                        value: item.value
                                    }]
                                },
                                // 扩大提示范围
                                {
                                    name: item.name,
                                    type: 'gauge',
                                    center: [index * 28 + 22 + '%', '40%'],
                                    radius: item.radius,
                                    splitNumber: 2,
                                    axisLine: {
                                        show: false,
                                    },
                                    pointer: {
                                        show: true,
                                        length: '150%',
                                        width: '150%',
                                    },
                                    tooltip: {},
                                    itemStyle: {
                                        normal: {
                                            color: 'transparent'
                                        }
                                    },
                                    detail: {
                                        show: false,
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    axisLabel: {
                                        show: false
                                    },
                                    data: [{
                                        value: item.value
                                    }]
                                }
                            );
                        });
                        return result;
                    })(),
                    tooltip: {
                        formatter: function (params) {
                            return params.seriesName + '：' + params.data.value + '%';
                        }
                    },
                };
                myChart.setOption(option);
            },

            //    警情分类数据分析
            jqflsjfxChart(Arr, brr, crr) {
                console.log(crr);
                let drr=[];
                Arr.forEach(value=>{
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
                                fontWeight:'bold'
                            },
                            margin:30*this.scale,
                            interval: 0,
                            formatter: function (value, index) {
                                // let type = index % 2 === 0 ? 'up' : 'down';
                                // return '{' + type + '|' + value + '}'
                                return value
                            },
                            /*rich: {
                                up: {
                                    height: 50 * this.scale,
                                    fontWeight: 'bold',
                                    fontSize: 20 * this.scale,
                                },
                                down: {
                                    height: 80 * this.scale,
                                    fontWeight: 'bold',
                                    fontSize: 20 * this.scale,
                                }
                            }*/
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
                        symbolSize: [24, 10],
                        symbolOffset: [0, -5],
                        z: 12,
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: '#14b1eb'
                            }
                        },
                        label: {
                            show: true,
                            position: 'top',
                            fontWeight: 'bold',
                            fontSize: 18 * this.scale,
                            color: '#ffe754'
                        },
                        data: crr
                    }, {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [24, 10],
                        symbolOffset: [0, 5],
                        z: 12,
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: '#14b1eb'
                            }
                        },
                        data: drr
                    }, {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#14b1eb',
                                opacity: .7
                            }
                        },
                        // silent: true,
                        barWidth: 24,
                        barGap: '-100%', // Make series be overlap
                        data: brr
                    }],
                    grid: {
                        top: 42 * this.scale,
                        bottom: 55 * this.scale,
                        left: 40 * this.scale,
                        right: 40 * this.scale
                    }
                };
                myChart.setOption(option);
            },
            //    警情分类环比
            jqflhbfxChart(typeArr,yesterdayArr,beforeYesterdayArr,hb) {
                // this.jqflhbfxChart(name,yesterdayArr,beforedayArr,yesterdayHBArr);
                // console.log(yesterdayArr);
                let myChart = this.$echarts.init(document.getElementById('jqflhbfx'));
                this.chartsObj.jqflsjhbChart = myChart;
                // let data = this.jqflhbfxSource;
                // let typeArr = [];
                // let beforeYesterdayArr = [];
                // let yesterdayArr = [];
                // let pArr = [];

                let total = [];

                typeArr.forEach(value => {
                    total.push(0);
                });

                let option = {
                    tooltip: {},
                    xAxis: {
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
                                fontSize: 19 * this.scale,
                                fontWeight:'bold'
                            },
                            margin:25*this.scale,
                            interval: 0,
                            formatter: function (value, index) {
                                // let type = index % 2 === 0 ? 'up' : 'down';
                                // return '{' + type + '|' + value + '}'
                                return value
                            },
                           /* rich: {
                                up: {
                                    height: 20 * this.scale,
                                    fontWeight: 'bold',
                                },
                                down: {
                                    height: 60 * this.scale,
                                    fontWeight: 'bold',
                                }
                            }*/
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
                                    // console.log(params);
                                    let color = '';
                                    let p=0;
                                    if(beforeYesterdayArr[params.dataIndex]=='0'){
                                        p=yesterdayArr[params.dataIndex]
                                    }else{
                                        p= Number(((yesterdayArr[params.dataIndex] - beforeYesterdayArr[params.dataIndex]) /
                                            beforeYesterdayArr[params.dataIndex]).toFixed(2));
                                    }
                                    if (p > 0) {
                                        color = 'red';
                                    } else {
                                        color = 'green';
                                        p = -p;
                                    }
                                    return `{${color}|${p}}`
                                },
                                rich: {
                                    red: {
                                        color: '#ff5e17',
                                        fontSize: 18 * this.scale,
                                        fontWeight: 'bold'
                                    },
                                    green: {
                                        color: '#00ff78',
                                        fontSize: 18 * this.scale,
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
                        }],
                        textStyle: {
                            color: '#fff',
                            fontSize: 16 * this.scale,
                            fontWeight: 'bold'
                        },
                        icon: "circle",
                        itemGap: 20 * this.scale
                    },
                    grid: {
                        left: 60 * this.scale,
                        right: 20 * this.scale
                    }
                };
                myChart.setOption(option);
            },

            //地图
            mapChart() {
                let running = false;
                Object.keys(this.flag).forEach((item, index) => {
                    if (!this.flag[item]) {
                        running = true;
                    }
                });
                if (running) return;
                // console.log('rander');

                let cityObj = {};
                let cityData = this.mapSource;
                let that = this;
                let myChart = that.$echarts.init(document.getElementById('mapChart')); //初始化
                this.chartsObj.mapChart = myChart;
                let data2 = [];
                cityData.forEach(value => {
                    data2.push({
                        name: value.name,
                        value: parseFloat(value.value / value.value1).toFixed(2),
                        value1: value.value
                    });
                });
                that.data1 = data2;
                //初显示   http://192.168.1.252:8082/dataDisplay/dictBJFSDMB/140000_full.json
                this.$http.get(this.apiRoot + 'dictBJFSDMB/getAll', {
                    params: {
                        json: '140001_full'
                    }
                }).then(res => {
                    // this.$http.get('static/json/140001_full.json').then(res => {
                    if (res.status === 200) {

                        for (let i = 0; i < res.data.features.length; i++) {
                            cityObj[res.data.features[i].properties.name] = res.data.features[i].properties.adcode;
                        }
                        // 注册地图
                        that.$echarts.registerMap('山西省', res.data);
                        // 绘制地图
                        renderMap('山西省', data2);
                    }
                });
                myChart.on('click', function (params) {
                    console.log(params['data']['name']);
                    that.$router.push({
                        path: '/index/particulars/city',
                        query: {title: '市占比数据分析', city: params['data']['name']}
                    })
                })

                //配置项
                let option = {
                    title: {
                        show: false
                    },
                    animationDuration: 1000,
                    animationEasing: 'cubicOut',
                    animationDurationUpdate: 1000,
                };

                function renderMap(map, data) {
                    // 初始化绘制全国地图配置
                    option.title.subtext = map;
                    option.series = [{
                        name: '散点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: data,
                        symbolSize: 0,
                    },
                        {
                            map: map,
                            type: 'map3D',
                            roam: true,
                            data: data,
                            nameMap: {
                                '山西省': '山西省'
                            },
                            shading: 'realistic', //光照
                            light: {
                                main: { //主光源设置
                                    intensity: 0.7, //主光源强度
                                    shadow: false, //主光源是否投射阴影
                                    shadowQuality: 'low', //阴影的质量
                                    /*alpha: 120, //主光源绕 x 轴偏离的角度
                                    beta: 190//主光源绕 y 轴偏离的角度*/
                                },
                                ambient: { //全局的环境光设置。
                                    intensity: 0 //环境光的强度
                                }
                            },
                            boxWidth: 100,
                            viewControl: { //用于鼠标的旋转，缩放等视角控制
                                distance: 250, //默认视角距离主体的距离
                                panMouseButton: 'left', //平移操作使用的鼠标按键
                                rotateMouseButton: 'left', //旋转操作使用的鼠标按键
                                alpha: 60, // 让canvas在x轴有一定的倾斜角度
                                // autoRotate : true,
                                animation: true,
                                panSensitivity: 0,
                            },
                            postEffect: { //后处理特效的相关配置，后处理特效可以为画面添加高光，景深，环境光遮蔽（SSAO），调色等效果。可以让整个画面更富有质感。
                                enable: true,
                                bloom: { //光晕
                                    enable: false
                                },
                                SSAO: { //屏幕空间环境光遮蔽
                                    radius: 1, //环境光遮蔽的强度。值越大颜色越深。
                                    intensity: 1, //环境光遮蔽的强度。值越大颜色越深。
                                    enable: true
                                },
                                depthOfField: { //景深
                                    enable: false,
                                    focalRange: 10, //完全聚焦的区域范围，在此范围内的物体时完全清晰的，不会有模糊
                                    blurRadius: 10, //焦外的模糊半径
                                    fstop: 1 //焦外的模糊半径
                                }
                            },
                            temporalSuperSampling: { //分帧超采样。在开启 postEffect 后，WebGL 默认的 MSAA 会无法使用,分帧超采样用来解决锯齿的问题
                                enable: true
                            },
                            itemStyle: { //三维图形的视觉属性
                                color: '#4ced7a', //地图颜色
                                borderWidth: 1.2,
                                borderColor: '#050324'
                            },
                            regionHeight: 10,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.name
                                    },
                                    position: 'inside',
                                    textStyle: {
                                        color: '#ffffff',
                                        opacity: 1, // 字体透明度
                                        backgroundColor: 'transparent',
                                        fontSize: 20 * that.scale,
                                        borderColor: '#004c51',
                                        fontWeight: 'bold'
                                    }
                                },
                            },
                            emphasis: {
                                itemStyle: { //三维图形的视觉属性
                                    color: '#50a0ea',
                                    borderWidth: 1.2,
                                    borderColor: '#050324'
                                },
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#02061a',
                                        borderColor: '#7f91ff',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        },
                    ];
                    option.tooltip = {
                        formatter: function (params) {
                            return params.marker + params.data.name + '：' + params.data.value1
                        }
                    };
                    option.visualMap = {
                        type: 'piecewise',
                        pieces: [{
                            max: (100 + Number(that.grading[0].proportion)) / 100,
                            label: '良好',
                            color: '#4ced7a'
                        }, {
                            min: (100 + Number(that.grading[0].proportion)) / 100,
                            max: (100 + Number(that.grading[1].proportion)) / 100,
                            label: '一般',
                            color: '#ffe538'
                        }, {
                            min: (100 + Number(that.grading[1].proportion)) / 100,
                            max: (100 + Number(that.grading[2].proportion)) / 100,
                            label: '较重',
                            color: '#ff8f2c'
                        },
                            {
                                min: (100 + Number(that.grading[2].proportion)) / 100,
                                // max: Number((that.grading[3].proportion / 100).toFixed(2)),
                                label: '严重',
                                color: '#ff3600'
                            },
                        ],
                        right: 20 * that.scale,
                        bottom: 20 * that.scale,
                        calculable: true,
                        seriesIndex: [1],
                        textStyle: {
                            color: '#fff'
                        },
                        /*itemWidth:24*that.scale,
                        itemHeight:24*that.scale*/

                        /*inRange: {
                            color: ['#00e57c', '#ed0000']
                        }*/
                    };
                    // 渲染地图

                    myChart.setOption(option);
                };
            },


            //    今日接警类型数据分析、今日报警方式数据分析、今日来话类型数据分析
            /**
             * @param chartContainer String 图表容器
             * @param sourceArr Arrary 数据数组
             * @param colorList Arrary 颜色数组
             * */
            // 近七日接警类型数据分析、近七日报警方式数据分析、近七日来话类型数据分析
            sevensjfx1(chartContainer, sourceArr, colorList, dateArr) {
                let seriesArr = [];
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
                            width: 0.9
                        },
                        data: sourceArr[i].value
                    });
                }
                let option = {
                    legend: {
                        textStyle: {
                            fontSize: 18 * this.scale,
                            color: '#fff',
                            width: 40,
                        },
                        icon: 'rect',
                        itemWidth: 18 * this.scale,
                        itemHeight: 14 * this.scale,
                        width: '85%',
                        itemGap: 25 * this.scale,
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
                                color: this.axisesColor,
                                width: 3 * this.scale
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: 18 * this.scale,
                            fontWeight: 'bold'
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
                                color: this.axisesColor,
                                width: 3 * this.scale
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: 18 * this.scale,
                            fontWeight: 'bold'
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
                        bottom: 30 * this.scale,
                        left: 80 * this.scale,
                    }
                };
                myChart.setOption(option);
            },
            //柱状图渐变
            gradient(colorList) {
                return new this.$echarts.graphic.LinearGradient(
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
            // 跳转
            jump(e) {
                let h3 = e.currentTarget;
                // console.log(h3.innerText);
                switch (h3.innerText) {
                    case '接警类型数据详情':
                        this.$router.push({
                            name: '省接警类型数据分析',
                            query: {
                                title: '全省接警类型数据分析'
                            }
                        });
                        break;
                    case '报警方式数据详情':
                        this.$router.push({
                            name: '省接警类型数据分析',
                            query: {
                                title: '全省报警方式数据分析'
                            }
                        });
                        break;
                    case '来话类型数据详情':
                        this.$router.push({
                            name: '省接警类型数据分析',
                            query: {
                                title: '全省来话类型数据分析'
                            }
                        });
                        break;
                    case '警情分类数据分析':
                        this.$router.push({
                            name: '省警情分类数据分析',
                            query: {
                                title: '全省警情分类数据分析'
                            }
                        });
                        break;

                    case '接警类型数据分析':
                        this.$router.push({
                            name: '省接警类型数据分析',
                            query: {
                                title: '全省接警类型数据分析'
                            }
                        });
                        break;
                    case '报警方式数据分析':
                        this.$router.push({
                            name: '省接警类型数据分析',
                            query: {
                                title: '全省报警方式数据分析'
                            }
                        });
                        break;
                    case '来话类型数据分析':
                        this.$router.push({
                            name: '省接警类型数据分析',
                            query: {
                                title: '全省来话类型数据分析'
                            }
                        });
                        break;
                    case '警情分类环比分析':
                        this.$router.push({
                            name: "省占比数据分析",
                            query: {
                                title: '全省占比数据分析'
                            }
                        })
                        break;


                    default:
                        // console.log(h3.innerText);
                        let city = h3.innerText + '市';
                        // console.log(city);
                        this.$router.push({path: '/index/particulars/city', query: {title: '市占比数据分析', city: city}})

                        break;
                }
            },
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
                        that.getJqfl();
                        that.getJqflHb();
                        that.getYxjqHb();
                        that.getLAS();
                        // that.jqflhbfxChart();
                        // that.getJjlxSeven();
                        // that.getBjfsSeven();
                        // that.getLhlxSeven();

                    },
                };
                Index.init();
            },
            //进入渲染选中的选项
            selectedItem() {
                let item = document.querySelectorAll('.option>.filterItem');
                switch (this.jqfl.per) {
                    case "today":
                        item[0].childNodes[0].firstChild.classList.add('active');
                        break;
                    case "yesterday":
                        item[0].childNodes[1].firstChild.classList.add('active');
                        break;
                    case "threeDaysAgo":
                        item[0].childNodes[2].childNodes[0].classList.add('active');
                        break;
                    default:
                }
                switch (this.jjlx.per) {
                    case "week":
                        item[1].childNodes[0].firstChild.classList.add('active');
                        break;
                    case "lastWeek":
                        item[1].childNodes[1].childNodes[0].classList.add('active');
                        break;
                    case "halfYear":
                        item[1].childNodes[2].childNodes[0].classList.add('active');
                        break;
                    default:

                }
                switch (this.bjfs.per) {
                    case "week":
                        item[1].childNodes[0].firstChild.classList.add('active');
                        break;
                    case "lastWeek":
                        item[1].childNodes[1].childNodes[0].classList.add('active');
                        break;
                    case "halfYear":
                        item[1].childNodes[2].childNodes[0].classList.add('active');
                        break;
                    default:

                }
                switch (this.lhlx.per) {
                    case "week":
                        item[1].childNodes[0].firstChild.classList.add('active');
                        break;
                    case "lastWeek":
                        item[1].childNodes[1].childNodes[0].classList.add('active');
                        break;
                    case "halfYear":
                        item[1].childNodes[2].childNodes[0].classList.add('active');
                        break;
                    default:

                }
            },
            //选择选项
            selectItem(e) {

                // return;
                let item = document.querySelectorAll('.option');
                let type = e.target.getAttribute('data-id');
                item.forEach(value => {
                    let children = value.childNodes[1].childNodes;
                    if (value.getAttribute('data-id') === type) {

                        switch (e.target.innerHTML) {
                            // sessionStorage.setItem('jqfl', JSON.stringify(this.jqfl));

                            // sessionStorage.setItem('jjlx', JSON.stringify(this.jjlx));
                            // sessionStorage.setItem('bjfs', JSON.stringify(this.bjfs));
                            // sessionStorage.setItem('lhlx', JSON.stringify(this.lhlx));

                            case '近7日':
                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                let type1 = e.target.getAttribute('data-id');

                                this['jjlx'].end = this.todayIndex;
                                this['jjlx'].start = this.sevenDaysAgo;
                                this['jjlx'].per = 'week';

                                this['bjfs'].end = this.todayIndex;
                                this['bjfs'].start = this.sevenDaysAgo;
                                this['bjfs'].per = 'week';

                                this['lhlx'].end = this.todayIndex;
                                this['lhlx'].start = this.sevenDaysAgo;
                                this['lhlx'].per = 'week';

                                // this.start = this.todayIndex;
                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            case '上周':
                                let d = new Date();
                                // set to Monday of this week
                                d.setDate(d.getDate() - (d.getDay() + 6) % 7);
                                // set to previous Monday
                                let date3 = new Date(d.setDate(d.getDate() - 7));
                                let Monday = date3.getFullYear().toString() + (date3.getMonth() + 1).toString().padStart(2, '0') + date3.getDate()
                                    .toString().padStart(2, '0');
                                // create new date of day before
                                let date4 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 6);
                                let Sunday = date4.getFullYear().toString() + (date4.getMonth() + 1).toString().padStart(2, '0') + date4.getDate()
                                    .toString().padStart(2, '0');
                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                let type2 = e.target.getAttribute('data-id');

                                this['jjlx'].end = Sunday;
                                this['jjlx'].start = Monday;
                                this['jjlx'].per = 'lastWeek';

                                this['bjfs'].end = Sunday;
                                this['bjfs'].start = Monday;
                                this['bjfs'].per = 'lastWeek';

                                this['lhlx'].end = Sunday;
                                this['lhlx'].start = Monday;
                                this['lhlx'].per = 'lastWeek';


                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            case '上上周':
                                let dt = new Date();
                                // set to Monday of this week
                                dt.setDate(dt.getDate() - (dt.getDay() + 6) % 7);
                                // set to previous Monday
                                let date5 = new Date(dt.setDate(dt.getDate() - 14));

                                let beforeMonday = date5.getFullYear().toString() + ((date5.getMonth() + 1).toString()).padStart(2, 0) + (
                                    date5.getDate().toString()).padStart(2, 0);
                                // create new date of day before
                                let date6 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 6);
                                let beforeSunday = date6.getFullYear().toString() + ((date6.getMonth() + 1).toString()).padStart(2, 0) + (
                                    date6.getDate().toString()).padStart(2, 0);

                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                let type3 = e.target.getAttribute('data-id');


                                this['jjlx'].end = beforeSunday;
                                this['jjlx'].start = beforeMonday;
                                this['jjlx'].per = 'halfYear';

                                this['bjfs'].end = beforeSunday;
                                this['bjfs'].start = beforeMonday;
                                this['bjfs'].per = 'halfYear';

                                this['lhlx'].end = beforeSunday;
                                this['lhlx'].start = beforeMonday;
                                this['lhlx'].per = 'halfYear';


                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            case '今天':
                                let type4 = e.target.getAttribute('data-id');
                                this[type4].date = this.todayIndex;
                                this[type4].per = 'today';
                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                // this.start = this.todayIndex;

                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            case '昨天':
                                let timestamp = (new Date()).getTime();
                                let day = timestamp - 24 * 60 * 60 * 1000;
                                let date1 = new Date(day);
                                let start1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate()
                                    .toString().padStart(2, '0');
                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                let type5 = e.target.getAttribute('data-id');
                                this[type5].date = start1;
                                this[type5].per = 'yesterday';
                                // this.start = this.todayIndex;

                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            case '前天':
                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                let type6 = e.target.getAttribute('data-id');
                                this[type6].date = this.threeDaysAgo;
                                this[type6].per = 'threeDaysAgo';
                                // this.start = this.todayIndex;

                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;


                            // periodArr2: ['接警类型数据详情', '报警方式数据详情', '来话类型数据详情'],

                            case '接警类型数据详情':
                                this.$router.push({
                                    name: '省接警类型数据分析',
                                    query: {
                                        title: '全省接警类型数据分析'
                                    }
                                });
                                break;
                            case '报警方式数据详情':
                                this.$router.push({
                                    name: '省接警类型数据分析',
                                    query: {
                                        title: '全省报警方式数据分析'
                                    }
                                });
                                break;
                            case '来话类型数据详情':
                                this.$router.push({
                                    name: '省接警类型数据分析',
                                    query: {
                                        title: '全省来话类型数据分析'
                                    }
                                });
                                break;


                            default:

                                break;
                        }
                    }
                });

                sessionStorage.setItem('jqfl', JSON.stringify(this.jqfl));
                sessionStorage.setItem('jjlx', JSON.stringify(this.jjlx));
                sessionStorage.setItem('bjfs', JSON.stringify(this.bjfs));
                sessionStorage.setItem('lhlx', JSON.stringify(this.lhlx));

                switch (type) {
                    case 'jqfl':
                        this.getFlsj();
                        break;
                    case 'jjlx':
                        // this.getJjlx();

                        // this.getJjlxSeven();
                        // this.getBjfsSeven();
                        // this.getLhlxSeven();
                        break;
                    case 'bjfs':
                        // this.getBjfs();

                        // this.getJjlxSeven();
                        // this.getBjfsSeven();
                        // this.getLhlxSeven();
                        break;
                    case 'lhlx':
                        // this.getLhlx();

                        // this.getJjlxSeven();
                        // this.getBjfsSeven();
                        // this.getLhlxSeven();
                        break;
                    default:

                }
            },
            //筛选显示隐藏
            filter(e) {
                /*let ele = e.target.getAttribute('class');
                // console.log(ele);
                let option = document.getElementsByClassName('option');
                // console.log(ele);
                if (ele == 'iconBox') {

                    for (let i = 0; i < option.length; i++) {
                        option[i].style.display = 'none';
                    }
                    let selected = e.target.parentNode.parentNode.lastChild;
                    selected.style.display = 'block';
                }
                if (ele === null) {
                    for (let i = 0; i < option.length; i++) {
                        option[i].style.display = 'none';
                    }
                }*/
            },
            hideJump(e) {
                let c = e.target.getAttribute('class');
                let options = document.querySelector('.options');

                if (c != null && c == 'title_wrap filter') {
                    // console.log(options);
                    options.style.display = 'block'
                } else {
                    if (options) {
                        options.style.display = 'none'
                    }
                }
            },
            //获取或保存筛选时间
            setperiod() {
                if (sessionStorage.getItem('jqfl') && sessionStorage.getItem('jjlx') && sessionStorage.getItem('bjfs') &&
                    sessionStorage.getItem('lhlx')) {
                    this.jqfl = JSON.parse(sessionStorage.getItem('jqfl'));
                    this.jjlx = JSON.parse(sessionStorage.getItem('jjlx'));
                    this.bjfs = JSON.parse(sessionStorage.getItem('bjfs'));
                    this.lhlx = JSON.parse(sessionStorage.getItem('lhlx'));
                } else {
                    this.jjlx.end = this.todayIndex;
                    this.jjlx.start = this.sevenDaysAgo;
                    this.jjlx.per = 'week';
                    this.bjfs.end = this.todayIndex;
                    this.bjfs.start = this.sevenDaysAgo;
                    this.bjfs.per = 'week';
                    this.jqfl.date = this.todayIndex;
                    this.jqfl.per = 'today';
                    this.lhlx.end = this.todayIndex;
                    this.lhlx.start = this.sevenDaysAgo;
                    this.lhlx.per = 'week';
                    sessionStorage.setItem('jqfl', JSON.stringify(this.jqfl));
                    sessionStorage.setItem('jjlx', JSON.stringify(this.jjlx));
                    sessionStorage.setItem('bjfs', JSON.stringify(this.bjfs));
                    sessionStorage.setItem('lhlx', JSON.stringify(this.lhlx));
                }
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

            // 警情分类数据分析
            // getFlsj() {
            //
            //     let that = this;
            //     this.$http({
            //         method: 'post',
            //         url: this.apiRoot + this.findUrl[2],
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded',
            //             'crossDomain': true
            //         },
            //         transformRequest: [function (data) {
            //             let ret = '';
            //             for (let it in data) {
            //                 ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            //             }
            //             return ret
            //         }],
            //         // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
            //         crossDomain: true,
            //         data: {
            //             tjTime: that.jqfl.date,
            //             // tjTime: '20160909',
            //         }
            //     })
            //         .then(function (res) {
            //             // console.log(res);
            //             res.data.sort(function (a, b) {
            //                 return Number(a.fldm) - Number(b.fldm)
            //             });
            //             res.data = res.data.slice(0, 8);
            //
            //
            //             let arr = [];
            //             let brr = [];
            //             let crr = [];
            //             // [{
            //             //     value: 300,
            //             //     symbolPosition: 'end'
            //             // }, {
            //             //     value: 50,
            //             //     symbolPosition: 'end'
            //             // }, {
            //             //     value: 20,
            //             //     symbolPosition: 'end'
            //             // }]
            //             res.data.forEach((item, index) => {
            //
            //                 /*if (!item['fldmmc']) {
            //                         item['fldmmc'] = '其它警情';
            //                     }*/
            //                 arr.push(item['fldmmc'])
            //                 brr.push(item['jjsl'])
            //                 crr.push({
            //                     value: item['jjsl'],
            //                     symbolPosition: 'end'
            //                 })
            //
            //
            //             });
            //
            //             that.jqflsjfxChart(arr, brr, crr);
            //         })
            // },
            getJqfl(){
                let timestamp = (new Date()).getTime();
                let day1 = timestamp;
                let day2 = timestamp -  24 * 60 * 60 * 1000;
                let date1 = new Date(day1);
                let date2 = new Date(day2);
                let start1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate()
                    .toString().padStart(2, '0');
                let start2 = date2.getFullYear().toString() + (date2.getMonth() + 1).toString().padStart(2, '0') + date2.getDate()
                    .toString().padStart(2, '0');
                // console.log(start1);
                // let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + 'recJQTJB/findNumHB',
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
                        // tjTime: '20160909',
                    }
                }).then(res => {
                    let crr = [];
                    let name=res.data.aa;
                    let yesterdayArr=[];
                    for (let i=0;i<name.length;i++){
                        if(name[i] in res.data.yesterday){
                        }else {
                            res.data.yesterday[name[i]]='0';
                        }
                        yesterdayArr.push(res.data.yesterday[name[i]]);
                    };
                    // console.log(yesterdayHBArr);
                    yesterdayArr.forEach(value => {
                        crr.push({
                            value: value,
                            symbolPosition: 'end'
                        })
                    });
                    this.jqflsjfxChart(name, yesterdayArr, crr);
                })
            },
            getJqflHb() {
                let timestamp = (new Date()).getTime();
                let day1 = timestamp - 24 * 60 * 60 * 1000;
                let day2 = timestamp - 2 * 24 * 60 * 60 * 1000;
                let date1 = new Date(day1);
                let date2 = new Date(day2);
                let start1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate()
                    .toString().padStart(2, '0');
                let start2 = date2.getFullYear().toString() + (date2.getMonth() + 1).toString().padStart(2, '0') + date2.getDate()
                    .toString().padStart(2, '0');
                // let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + 'recJQTJB/findNumHB',
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
                        // tjTime: '20160909',
                    }
                }).then(res => {
                    let crr = [];
                    let name=res.data.aa;
                    let yesterdayArr=[];
                    let beforedayArr=[];
                    let yesterdayHBArr=[];
                    for (let i=0;i<name.length;i++){
                        if(name[i] in res.data.yesterday){
                        }else {
                            res.data.yesterday[name[i]]='0';
                        }
                        if(name[i] in res.data.beforeday){
                        }else {
                            res.data.beforeday[name[i]]='0'
                        }
                        if(name[i] in res.data.yesterdayHB){
                        }else {
                            res.data.yesterdayHB[name[i]]='0.0'
                        }
                        yesterdayArr.push(res.data.yesterday[name[i]]);
                        beforedayArr.push(res.data.beforeday[name[i]]);
                        yesterdayHBArr.push(res.data.yesterdayHB[name[i]]);
                    };
                    // console.log(yesterdayHBArr);
                    yesterdayArr.forEach(value => {
                        crr.push({
                            value: value,
                            symbolPosition: 'end'
                        })
                    });

                    // console.log(yesterdayHBArr);
                    // this.jqflsjfxChart(name, yesterdayArr, crr);
                    this.jqflhbfxChart(name,yesterdayArr,beforedayArr,yesterdayHBArr);
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

            // 近七日接警类型数据分析
            getJjlxSeven() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[5],
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
                        startTime: this.jjlx.start,
                        endTime: this.jjlx.end,
                        // startTime: '20160909',
                        // endTime: '20160915',
                    }
                })
                    .then(function (res) {
                        let s = JSON.parse(sessionStorage.getItem('jjlx'));
                        let d = new Date(s.start.slice(0, 4) + '-' + s.start.slice(4, 6) + '-' + s.start.slice(6, 8)).getTime();
                        let dateArr1 = [];
                        for (let i = 0; i < 7; i++) {
                            let t = d + i * 24 * 60 * 60 * 1000;
                            let d1 = new Date(t);
                            dateArr1.push(
                                d1.getFullYear().toString() +
                                (d1.getMonth() + 1).toString().padStart(2, '0') +
                                d1.getDate().toString().padStart(2, '0')
                            );
                        }
                        let data1 = [];
                        let data2 = [];
                        for (let i in res.data.sevenDays) {

                            data1.push(...res.data.sevenDays[i]);
                            if (res.data.sevenDays[i].length < 7) {
                                for (let j = 0; j < 7; j++) {
                                    data2.push({
                                        tjrq: dateArr1[j],
                                        jjlxdm: i
                                    });
                                }
                            }
                        }
                        data1.push(...data2);
                        res.data = data1;
                        let r = [];
                        let narr = [];
                        for (let i = 0; i < res.data.length; i++) {
                            // arr.push({name:res.data[i].fldmmc,value:res.data[i].jjsl});
                            let n = r.indexOf(res.data[i].tjrq);
                            if (n == -1) {
                                r.push(res.data[i].tjrq);
                                narr.push({
                                    "date": res.data[i].tjrq,
                                    dataArr: [{
                                        name: res.data[i].jjlxdm,
                                        value: res.data[i].jjsl
                                    }]
                                });
                            } else {
                                narr[n].dataArr.push({
                                    name: res.data[i].jjlxdm,
                                    value: res.data[i].jjsl
                                })
                            }
                        }
                        let dateArr = [];
                        let data = [];
                        narr.forEach(value => {
                            data.push(...value.dataArr);
                            dateArr.push(value.date);
                        });
                        for (let i = 0; i < dateArr.length; i++) {
                            let Y = dateArr[i].slice(0, 4);
                            let M = dateArr[i].slice(4, 6);
                            let D = dateArr[i].slice(6, 8);
                            dateArr[i] = M + '-' + D;
                        }

                        let r1 = [];
                        let narr1 = [];
                        for (let i = 0; i < data.length; i++) {

                            let n = r1.indexOf(data[i].name);
                            if (n == -1) {
                                r1.push(data[i].name);
                                narr1.push({
                                    "name": data[i].name,
                                    value: [data[i].value]
                                })
                            } else {
                                narr1[n].value.push(data[i].value)
                            }
                        }
                        that.sevensjfx1('sevenjjlxsjfxChart', narr1, that.jrjjlxsjfxSourceColor, dateArr);
                    })
            },

            // 近七日报警方式数据分析
            getBjfsSeven() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[7],
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
                        startTime: this.bjfs.start,
                        endTime: this.bjfs.end
                        // startTime: '20160909',
                        // endTime: '20160915',
                    }
                })
                    .then(function (res) {
                        // console.log(res)
                        let s = JSON.parse(sessionStorage.getItem('bjfs'));
                        let d = new Date(s.start.slice(0, 4) + '-' + s.start.slice(4, 6) + '-' + s.start.slice(6, 8)).getTime();
                        let dateArr1 = [];
                        for (let i = 0; i < 7; i++) {
                            let t = d + i * 24 * 60 * 60 * 1000;
                            let d1 = new Date(t);
                            dateArr1.push(
                                d1.getFullYear().toString() +
                                (d1.getMonth() + 1).toString().padStart(2, '0') +
                                d1.getDate().toString().padStart(2, '0')
                            );
                        }
                        let data1 = [];
                        let data2 = [];
                        for (let i in res.data.sevenDays) {
                            data1.push(...res.data.sevenDays[i]);
                            if (res.data.sevenDays[i].length < 7) {
                                for (let j = 0; j < 7; j++) {
                                    data2.push({
                                        tjrq: dateArr1[j],
                                        bjfsdm: i
                                    });
                                }
                            }
                        }
                        // data1.forEach((value, index) => {
                        //     if (value.bjfsdm.slice(0, 2) === '其它' || value.bjfsdm.slice(0, 2) === '其他') {

                        //         let v = value;
                        //         // delete value;
                        //     }
                        // });
                        // data1.push(...data2);
                        res.data = data1;
                        let r = [];
                        let narr = [];
                        for (let i = 0; i < res.data.length; i++) {
                            // arr.push({name:res.data[i].fldmmc,value:res.data[i].jjsl});
                            let n = r.indexOf(res.data[i].tjrq);
                            if (n == -1) {
                                r.push(res.data[i].tjrq);
                                narr.push({
                                    "date": res.data[i].tjrq,
                                    dataArr: [{
                                        name: res.data[i].bjfsdm,
                                        value: res.data[i].jjsl
                                    }]
                                });
                            } else {
                                narr[n].dataArr.push({
                                    name: res.data[i].bjfsdm,
                                    value: res.data[i].jjsl
                                })
                            }
                        }

                        let dateArr = [];
                        let data = [];
                        narr.forEach(value => {
                            data.push(...value.dataArr);
                            dateArr.push(value.date);
                        });
                        for (let i = 0; i < dateArr.length; i++) {
                            let Y = dateArr[i].slice(0, 4);
                            let M = dateArr[i].slice(4, 6);
                            let D = dateArr[i].slice(6, 8);
                            dateArr[i] = M + '-' + D;
                        }

                        let r1 = [];
                        let narr1 = [];
                        for (let i = 0; i < data.length; i++) {

                            let n = r1.indexOf(data[i].name);
                            if (n == -1) {
                                r1.push(data[i].name);
                                narr1.push({
                                    "name": data[i].name,
                                    value: [data[i].value]
                                })
                            } else {
                                narr1[n].value.push(data[i].value)
                            }
                        }
                        that.sevensjfx1('sevenbjfssjfxChart', narr1, that.jrbjfssjfxColor, dateArr);
                    })
            },


            // 近七日来话类型数据分析
            getLhlxSeven() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[9],
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
                        startTime: this.bjfs.start,
                        endTime: this.bjfs.end
                        // startTime: '20160909',
                        // endTime: '20160915',
                    }
                })
                    .then(function (res) {
                        let s = JSON.parse(sessionStorage.getItem('jjlx'));
                        let d = new Date(s.start.slice(0, 4) + '-' + s.start.slice(4, 6) + '-' + s.start.slice(6, 8)).getTime();
                        let dateArr1 = [];
                        for (let i = 0; i < 7; i++) {
                            let t = d + i * 24 * 60 * 60 * 1000;
                            let d1 = new Date(t);
                            dateArr1.push(
                                d1.getFullYear().toString() +
                                (d1.getMonth() + 1).toString().padStart(2, '0') +
                                d1.getDate().toString().padStart(2, '0')
                            );
                        }

                        let data1 = [];
                        let data2 = [];
                        for (let i in res.data.sevenDays) {
                            data1.push(...res.data.sevenDays[i]);
                            if (res.data.sevenDays[i].length < 7) {
                                for (let j = 0; j < 7; j++) {
                                    data2.push({
                                        tjrq: dateArr1[j],
                                        lhlxdm: i
                                    });
                                }
                            }
                        }
                        data1.push(...data2);
                        res.data = data1;
                        let r = [];
                        let narr = [];
                        for (let i = 0; i < res.data.length; i++) {
                            // arr.push({name:res.data[i].fldmmc,value:res.data[i].jjsl});
                            let n = r.indexOf(res.data[i].tjrq);
                            if (n == -1) {
                                r.push(res.data[i].tjrq);
                                narr.push({
                                    "date": res.data[i].tjrq,
                                    dataArr: [{
                                        name: res.data[i].lhlxdm,
                                        value: res.data[i].jjsl
                                    }]
                                });
                            } else {
                                narr[n].dataArr.push({
                                    name: res.data[i].lhlxdm,
                                    value: res.data[i].jjsl
                                })
                            }
                        }

                        let dateArr = [];
                        let data = [];
                        narr.forEach(value => {
                            data.push(...value.dataArr);
                            dateArr.push(value.date);
                        });
                        for (let i = 0; i < dateArr.length; i++) {
                            let Y = dateArr[i].slice(0, 4);
                            let M = dateArr[i].slice(4, 6);
                            let D = dateArr[i].slice(6, 8);
                            dateArr[i] = M + '-' + D;
                        }

                        let r1 = [];
                        let narr1 = [];
                        for (let i = 0; i < data.length; i++) {

                            let n = r1.indexOf(data[i].name);
                            if (n == -1) {
                                r1.push(data[i].name);
                                narr1.push({
                                    "name": data[i].name,
                                    value: [data[i].value]
                                })
                            } else {
                                narr1[n].value.push(data[i].value)
                            }
                        }

                        that.sevensjfx1('sevenlhlxsjfxChart', narr1, that.jrrlhlxsjfxColor, dateArr);
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

            // 开始轮播
            goSwiper() {
                let that = this;
                let timer = setInterval(function () {
                    that.showIndex++;
                    if (that.showIndex === 4) {
                        that.showIndex = 1;
                    }
                }, 10000)
            },

            //    获取分布占比设置
            getGrading() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + 'redGrade/findAll',
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
                    data: {}
                })
                    .then(function (res) {
                        that.grading = res.data;
                        let type = ['良好', '一般', '较重', '严重'];
                        for (let i = 0; i < that.grading.length; i++) {
                            that.grading[i].categories = type[i];
                        }

                        that.flag.proportionValue = true;
                        that.mapChart();
                    })
            },
            //获取峰值
            getPeak() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + 'dictXZQHB/findAll',
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
                    data: {}
                })
                    .then(function (res) {
                        res.data.forEach(function (o, d) {
                            for (let k in o) {
                                that.peak.forEach(function (t) {
                                    for (let key in t) {
                                        if (t.xzqhdm == o.xzqhdm) {
                                            t[k] = o[k];
                                        }
                                    }
                                })
                            }
                        });
                        res.data.map(item => {
                            item.name = item.xzqhmc + '市';
                            item.value1 = item.jjslsx;
                            delete item.xzqhmc;
                            delete item.jjslsx;
                            return item;
                        });
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

                        that.flag.peakValue = true;
                        that.mapChart();
                    });
            },
            // 跳转到立案数
            skiping() {
                this.$router.push({
                    path: '/index/handling'
                })
            },

            //获取环比
            getYxjqHb() {
                //1 今天，2 昨天
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
                })
            },
            // 立案数
            getLAS(){
                this.$http.get(this.apiRoot+'processHandling/findProcessCase',{
                    // params : {}
                })
                .then(function (res) {
                    // console.log(res['data']['total'] );
                    this.shoulian.value = res['data']['total'];
                }.bind(this))

                let timestamp = (new Date()).getTime();
                let day1 = timestamp - 24 * 60 * 60 * 1000;
                let date1 = new Date(day1);
                let start1 = date1.getFullYear().toString() + '-'+ (date1.getMonth() + 1).toString().padStart(2, '0')  + '-'+ date1.getDate()
                                    .toString().padStart(2, '0');
                // console.log(start1);
                this.$http.get(this.apiRoot+'processHandling/findProcessCaseHB',{
                    params : {
                        tjTime : start1,
                    }
                } )
                .then(function(res){
                    this.shoulian.hb = res['data']['hb'];
                }.bind(this))




            }
        },

        mounted() {
            // this.getPeak();
            this.getDate();
            this.setperiod();
            this.getScale();
            // this.selectedItem();
            this.renderChart();
            // this.goSwiper();  // this.getPeak();
            this.getDate();
            this.setperiod();
            this.getScale();
            // this.selectedItem();
            // this.renderChart();
            // this.goSwiper();
            // this.getYxjqHb();
            
            // this.getJqfl();
            // this.getJqflHb();
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
    .filter {
        position: relative;
    }

    .options {
        z-index: 99999;
        display: flex;
        flex-direction: row-reverse;
        position: absolute;
        width: 50%;
        height: 26%;
        /*background: #ffffff;*/
        left: 20%;
        top: 0;
        display: none;
        /*margin: auto;*/

        // >div{
        //     cursor: pointer;
        //     width : 3rem;
        //     height :2.6rem;
        // }
        .timer_btn {
            width: 2rem;
            height: 2rem;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
            }
        }


        .option {
            width: 100%;
            height: 18rem;
            position: absolute;
            top: 1rem;
            right: -0.5rem;
            background: url("../assets/images/index/filter.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            /*display: none;*/

            .filterTitle {
                color: #17fff3;
                position: absolute;
                top: 2rem;
                left: 0;
                right: 0;
                margin: auto;
                height: 18%;

                div {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    /*transform: scale(0.6);*/
                    /*transform-origin: left top;*/
                    letter-spacing: 2px;
                }
            }

            .filterItem {
                position: absolute;
                top: 33%;
                width: 70%;
                height: 50%;
                left: 0;
                right: 0;
                margin: auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                li {
                    width: 100%;
                    height: 27.4%;

                    div {
                        width: 100%;
                        height: 100%;
                        /*width: 167%;
                        height: 167%;
                        transform: scale(0.6);
                        transform-origin: left top;*/
                        font-size: 1.2rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        letter-spacing: 2px;
                        cursor: pointer;
                        background-image: linear-gradient(-86deg,
                                #0b5fa7 0%,
                                #0b5fa7 100%);
                        border-style: solid;
                        border-width: 1px;
                        border-image-source: linear-gradient(268deg,
                                #0493e4 41%,
                                #0492e3 43%,
                                rgba(8, 120, 197, 0.5) 71%,
                                #0b5fa7 100%);
                        border-image-slice: 1;

                        &.active {
                            background-image: linear-gradient(-86deg,
                                    #53b0ff 0%,
                                    #0b5fa7 100%);
                        }
                    }
                }
            }
        }
    }

    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 1rem;
        margin-bottom: .6rem;

        h3 {
            cursor: pointer;

        }

        .l > div,
        .m > div,
        .r > div {
            width: 100%;
            align-content: space-between;
        }

        /*.filter {
            position: absolute;
            right: 0;
            width: 1.5rem;
            height: 1.5rem;
            z-index: 1;

            .iconBox {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
            }

            .iconguolv {
                color: #17fff3;
                font-weight: lighter;
                transform: scale(0.4);
                transform-origin: top right;
                margin-top: 0.1rem;
                position: absolute;
                top: 0.08rem;
                right: 0.2rem;
            }


        }*/

        .l {
            width: 32%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .l-t {
                height: 39%;
                background-image: url('../assets/images/index/l-t-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;

                .title_wrap {
                    cursor: pointer;
                    box-sizing: border-box;
                    position: relative;
                }
            }

            .l-b {
                height: 52%;
                background-image: url('../assets/images/index/l-b-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                position: relative;

                .title_wrap {

                    box-sizing: border-box;
                    margin-top: -0.5rem;
                }

                .chartBox {
                    padding: 2% 12% 0;

                    ul {
                        li {
                            margin: .3rem 0;
                            display: flex;
                            justify-content: space-between;

                            &:first-child {
                                margin-bottom: 0.4rem;
                            }

                            span {
                                width: 20%;
                                text-align: center;
                                font-size: 1.2rem;
                            }

                            .sp1 {
                                cursor: pointer;
                                color: #FFFFFF;
                                font-weight: 550;
                            }

                            .sp2 {
                                color: #ffe754;
                                font-weight: bold;
                                letter-spacing: 2px;
                            }

                            .sp3 {
                                color: #5ae6ff;
                                font-weight: bold;
                                letter-spacing: 2px;
                            }
                        }
                    }
                }
            }

            //内容
            .chartBox {
                height: 80%;
                margin: 0 auto;
                display: flex;
                flex-direction: column;

                //数据
                .statistics {
                    width: 80%;
                    /*height: 21%;*/
                    margin: 3% 10% 0;
                    display: flex;
                    justify-content: space-around;

                    li {
                        p {
                            text-align: center;
                            color: #ffe754;
                            letter-spacing: 2px;

                            &:first-child {
                                margin-bottom: 1rem;
                                color: #ffffff;
                                font-size: 1.2rem;
                            }

                            &:nth-child(2) {
                                /*transform: scale(1.5);*/
                                // font-family: heijian;
                                font-weight: 900;
                                font-size: 1.4rem;
                            }
                        }
                    }
                }

                // 图表
                #jqtjjcChart {
                    width: 100%;
                    // height: 8.19rem;
                    flex: 1;
                }
            }
        }

        .chart {
            width: 100%;
            height: 100%;
        }

        .chart-wrap {
            // border: .0625rem solid rgba(76, 180, 231, 0.33);
            width: 100%;
            height: 100%;


            //标题
            .title_wrap {
                height: 12%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3rem;
                font-weight: 600;
                /*background: linear-gradient(-180deg, #ffffff 50%, #0731FF 70%);
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;*/
                color: #FFFFFF;
            }

            // > h3 {
            //     height: 15%;
            //     text-align: center;
            // }
        }

        .chartBox {
            width: 100%;
            height: 100%;
        }

        .m_wrap {
            width: 30%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .m {
                width: 100%;
                height: 96%;
                // margin: 2.5% 0;
                background-image: url('../assets/images/index/m.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;

                .chart-wrap {
                    width: 100%;
                    height: 100%;


                    .chartBox {
                        padding: 5%;
                    }
                }

                .chartBox {
                    position: relative;
                    // padding : 2%
                    .yxjq {
                        position: absolute;
                        top: 5%;
                        left: 7%;
                        text-align: center;

                        p:first-child {
                            font-size: 1.5rem;
                            letter-spacing: 2px;
                            font-weight: bold;
                            color: #fff;
                        }

                        p:nth-child(2) {
                            color: #ffe754;
                            font-size: 2rem;
                            letter-spacing: 2px;
                            font-weight: bold;
                        }
                    }

                    .yxjqhb {
                        position: absolute;
                        top: 15%;
                        left: 7%;
                        text-align: left;

                        p:first-child {
                            font-size: 1.3rem;
                            letter-spacing: 2px;
                            font-weight: bold;
                            color: #fff;
                        }

                        p:nth-child(2) {
                            font-size: 1.8rem;
                            letter-spacing: 2px;
                            font-weight: bold;

                            &.up {
                                color: #ff5e17;
                            }

                            &.down {
                                color: #00ffa2;
                            }

                            &.static {
                                color: #fff900;
                            }

                            .iconfont {
                                font-size: 1.5rem;
                            }
                        }
                    }

                    .shoulian {
                        position: absolute;
                        top: 5%;
                        right: 7%;
                        text-align: center;

                        p:first-child {
                            font-size: 1.3rem;
                            letter-spacing: 2px;
                            font-weight: bold;
                            color: #fff;
                        }

                        p:nth-child(2) {
                            color: #ff9c54;
                            font-size: 1.8rem;
                            letter-spacing: 2px;
                            font-weight: bold;
                        }
                    }

                    .shoulianhb {
                        position: absolute;
                        top: 13%;
                        right: 7%;
                        text-align: right;

                        p:first-child {
                            font-size: 1.3rem;
                            letter-spacing: 2px;
                            font-weight: bold;
                            color: #fff;
                        }

                        p:nth-child(2) {
                            font-size: 1.8rem;
                            letter-spacing: 2px;
                            font-weight: bold;

                            &.up {
                                color: #ff5e17;
                            }

                            &.down {
                                color: #00ffa2;
                            }

                            &.static {
                                color: #fff900;
                            }

                            .iconfont {
                                font-size: 1.5rem;
                            }
                        }
                    }


                    // #mapData {
                    // 	position: absolute;
                    // 	top: 8%;
                    // 	left: 10%;

                    // 	p:first-child {
                    // 		font-size: 3rem;
                    // 		letter-spacing: 0.3rem;
                    // 		// font-family: heijian;
                    // 		color: #13fef8;
                    // 	}

                    // 	p:nth-child(2) {
                    // 		transform: scale(0.6);
                    // 		transform-origin: left;
                    // 		color: #ffffff;
                    // 		font-size: 2rem;
                    // 		letter-spacing: 0.3rem;
                    // 	}
                    // }
                }
            }
        }


        .r {
            width: 32%;
            display: flex;
            flex-direction: column;
            // flex-direction: row;
            justify-content: space-around;


            .r-t {
                width: 100%;
                height: 39%;
                background-image: url('../assets/images/index/l-t-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                position: relative;

                .title_wrap {
                    // padding-left: 2.2rem;
                    box-sizing: border-box;
                }

                .chart-wrap {
                    .title_wrap {
                        cursor: pointer;
                    }

                    .chartBox {
                        height: 88%;
                        padding-bottom: 2.5rem;
                        padding-left: .2rem;
                        padding-right: .2rem;

                    }
                }

            }

            .r-b {
                width: 100%;
                height: 52%;
                position: relative;
                background-image: url('../assets/images/index/l-b-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;

                .title_wrap {
                    // cursor: pointer;
                    // padding-left: 2.2rem;
                    box-sizing: border-box;
                    margin-top: -0.5rem;
                }


                .chart-wrap {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;

                    .title_wrap {
                        cursor: pointer;
                    }

                    .chartBox {
                        padding: 3% 5% 15%;
                    }
                }

                .showIndex {
                    z-index: 9999;
                    opacity: 1
                }

                .disappear {
                    z-index: -1;
                    opacity: 0
                }

            }

        }
    }
</style>
