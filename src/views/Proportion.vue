<template>
    <div id="container">
        <my-header></my-header>
        <div class="back" @click="back">
            <i class="iconfont iconfanhui"></i>
            <span>返回</span>
        </div>
        <main>
            <div class="chart-wrap">
                <!--                    标题-->
                <div class="title_wrap">
                    <span>{{this.$route.query.type}}分类</span>
                </div>
                <!--                                            内容-->
                <div class="chartBox">
                    <div class="mahjong" id="mahjong">
                        <div class="chart" id="mahjong1"></div>
                        <div class="chart" id="mahjong2"></div>
                    </div>
                    <div class="pie">
                        <div id="pie" class="chart"></div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import MyHeader from "../components/Header";

    export default {
        name: "Proportion",
        components: {MyHeader},
        data(){
            return {
                //需要刷新的图表
                refreshCharts: [],
                //    所有的图标对象
                chartsObj: {},
                myData:['侵犯人身、民主权利', '2', '3', '4', '5', '6', '7','8','9', '10', '11', '12', '13', '14', '15','16','17','18','19','20'],
                lineData:[100, 100, 100, 100, 100, 100, 100,100,100,100,100,100,100,100,100,100,100,100,100,100],
                last:[3, 20, 0, 34, 55, 65, 33,90,20,10,50,40,21,15,25,13,16,25,15,45],
                yesterday:[0, 38, 23, 39, 66, 66, 79,90,15,26,48,34,54,45,21,45,12,13,15,45],
                /*myData:[],
                lineData:[],
                last:[],
                yesterday:[]*/
                codeObj:{}
            }
        },
        methods:{
            //麻将
            randerCharts(myData,lineData,last,yesterday){
                // console.log(myData);
                let that = this;
                let myChart = this.$echarts.init(document.getElementById('mahjong'));
                this.chartsObj.mahjong = myChart;
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
                            top : '4%',
                            left : '30%',
                            itemWidth : 22,
                            itemHeight : 14,
                            itemGap: 343,
                            icon : 'horizontal',
                            textStyle : {
                                color : '#ffffff',
                                fontSize : 20,
                                padding:[0,0,0,6]
                            },
                            data: ['昨天','前天']
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
                            triggerEvent: true,
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
                            triggerEvent: true,
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
                                    fontSize: 16,
                                    padding:[0,0,0,35],
                                    lineHeight:25
                                },
                                formatter: function (params) {
                                    let newParamsName = "";
                                    let paramsNameNumber = params.length;
                                    let provideNumber = 5;  //一行显示几个字
                                    let rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                    if (paramsNameNumber > provideNumber) {
                                        for (let p = 0; p < rowNumber; p++) {
                                            let tempStr = "";
                                            let start = p * provideNumber;
                                            let end = start + provideNumber;
                                            if (p == rowNumber - 1) {
                                                tempStr = params.substring(start, paramsNameNumber);
                                            } else {
                                                tempStr = params.substring(start, end) + "\n";
                                            }
                                            newParamsName += tempStr;
                                        }

                                    } else {
                                        newParamsName = params;
                                    }
                                    return newParamsName
                                },
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
                            triggerEvent: true,
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
                };
                option.baseOption.timeline.data.push(timeLineData[0]);
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
                                        return last[timeLineData[0]][series.dataIndex]
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
                            data: last[timeLineData[0]],
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
                                        return yesterday[timeLineData[0]][series.dataIndex]
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
                            data: yesterday[timeLineData[0]],
                            animationEasing: 'elasticOut',
                            animationDelay: function (dataIndex, params) {
                                return params.index * 30 * 1.1;
                            }
                        }
                    ]
                });
                myChart.setOption(option);
                myChart.on('click',params=>{
                    this.$router.push({
                        name: '分类列表',
                        query: {
                            code: JSON.stringify(this.codeObj),
                            type: params.name||params.value
                        }
                    });
                })
            },
            randerCharts1(myData,lineData,last,yesterday){
                // console.log(myData);
                let that = this;
                let myChart = this.$echarts.init(document.getElementById('mahjong1'));
                this.chartsObj.mahjong1 = myChart;
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
                            top : '4%',
                            left : '12%',
                            itemWidth : 22,
                            itemHeight : 14,
                            itemGap: 343,
                            icon : 'horizontal',
                            textStyle : {
                                color : '#ffffff',
                                fontSize : 20,
                                padding:[0,0,0,6]
                            },
                            data: ['昨天','前天']
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
                            triggerEvent: true,
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
                            triggerEvent: true,
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
                                    fontSize: 16,
                                    padding:[0,0,0,35],
                                    lineHeight:25
                                },
                                formatter: function (params) {
                                    let newParamsName = "";
                                    let paramsNameNumber = params.length;
                                    let provideNumber = 5;  //一行显示几个字
                                    let rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                    if (paramsNameNumber > provideNumber) {
                                        for (let p = 0; p < rowNumber; p++) {
                                            let tempStr = "";
                                            let start = p * provideNumber;
                                            let end = start + provideNumber;
                                            if (p == rowNumber - 1) {
                                                tempStr = params.substring(start, paramsNameNumber);
                                            } else {
                                                tempStr = params.substring(start, end) + "\n";
                                            }
                                            newParamsName += tempStr;
                                        }

                                    } else {
                                        newParamsName = params;
                                    }
                                    return newParamsName
                                },
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
                            triggerEvent: true,
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
                };
                option.baseOption.timeline.data.push(timeLineData[0]);
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
                                        return last[timeLineData[0]][series.dataIndex]
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
                            data: last[timeLineData[0]],
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
                                        return yesterday[timeLineData[0]][series.dataIndex]
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
                            data: yesterday[timeLineData[0]],
                            animationEasing: 'elasticOut',
                            animationDelay: function (dataIndex, params) {
                                return params.index * 30 * 1.1;
                            }
                        }
                    ]
                });
                myChart.setOption(option);
                myChart.on('click',params=>{
                    myChart.on('click',params=>{
                        this.$router.push({
                            name: '分类列表',
                            query: {
                                code: JSON.stringify(this.codeObj),
                                type: params.name||params.value
                            }
                        });
                    })
                })
            },
            randerCharts2(myData,lineData,last,yesterday){
                let that = this;
                let myChart = this.$echarts.init(document.getElementById('mahjong2'));
                this.chartsObj.mahjong2 = myChart;
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
                            top : '4%',
                            left : '12%',
                            itemWidth : 22,
                            itemHeight : 14,
                            itemGap: 343,
                            icon : 'horizontal',
                            textStyle : {
                                color : '#ffffff',
                                fontSize : 20,
                                padding:[0,0,0,6]
                            },
                            data: ['昨天','前天']
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
                            triggerEvent: true,
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
                            triggerEvent: true,
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
                                    fontSize: 16,
                                    padding:[0,0,0,35],
                                    lineHeight:25
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
                            triggerEvent: true,
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
                };
                option.baseOption.timeline.data.push(timeLineData[0]);
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
                                        return last[timeLineData[0]][series.dataIndex]
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
                            data: last[timeLineData[0]],
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
                                        return yesterday[timeLineData[0]][series.dataIndex]
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
                            data: yesterday[timeLineData[0]],
                            animationEasing: 'elasticOut',
                            animationDelay: function (dataIndex, params) {
                                return params.index * 30 * 1.1;
                            }
                        }
                    ]
                });
                myChart.setOption(option);
                let type='';
                myChart.on('click',params=>{
                    this.$router.push({
                        name: '分类列表',
                        query: {
                            code: JSON.stringify(this.codeObj),
                            type: params.name||params.value
                        }
                    });
                })
            },
            //饼
            detailProportionChart(myData,last,yesterday) {
                let myChart = this.$echarts.init(document.getElementById('pie'));
                this.chartsObj.detailProportionChart = myChart;
                let colorList = ['#fff093', '#00ffeb', '#0096ff', '#ffffff',
                    '#8fd1ff', '#ffdf18', '#ff9f16', '#b9ff9e',
                    '#00ffc0', '#84ff00', '#1ada86', '#49bcf3',
                    '#ff64bf', '#ff8155', '#3ecf6a', '#fff497',
                    '#c64f47', '#81799e', '#2f9a94', '#9e57b7',
                    '#d58a85'
                ];
                let yesTotal = 0;
                yesTotal=eval(yesterday.join("+"));
                let lastTotal=0;
                lastTotal=eval(last.join("+"));
                let yesSourceArr=[];
                let lastSourceArr=[];
                myData.forEach((value,index)=>{
                    yesSourceArr.push({
                        name:value,
                        value:yesterday[index]
                    });
                    lastSourceArr.push({
                        name:value,
                        value:last[index]
                    })
                });
                yesSourceArr.forEach((value, index) => {
                    if (value.value==0){
                        yesSourceArr.splice(index,1);
                    }
                });
                lastSourceArr.forEach((value, index) => {
                    if (value.value==0){
                        lastSourceArr.splice(index,1);
                    }
                });
                // console.log(yesSourceArr);
                let option = {
                    title:[{
                        show:true,
                        text:'昨日'+this.$route.query.type+'占比',
                        top:'40%',
                        right:0,
                        textStyle:{
                            color:'#fff',
                            fontSize:14
                        }
                    },{
                        show:true,
                        text:'前日'+this.$route.query.type+'占比',
                        top:'90%',
                        right:0,
                        textStyle:{
                            color:'#fff',
                            fontSize:14
                        }
                    }],
                    tooltip: {
                        formatter: function (params) {
                            // console.log(params);
                            if(params.seriesName==='昨日'){
                                return params.seriesName+'<br>'+params.marker + params.name + '：' + parseFloat(((params.data.value / yesTotal) * 100).toFixed(2)) + '%'
                            }else {
                                return params.seriesName+'<br>'+params.marker + params.name + '：' + parseFloat(((params.data.value / lastTotal) * 100).toFixed(2)) + '%'
                            }
                        }
                    },
                    series: [{
                        name: '昨日',
                        type: 'pie',
                        radius: ['30%', '40%'],
                        center: ['50%','25%'],
                        data:yesSourceArr,
                        label: {
                            textStyle:{
                                fontSize:20*this.scale,
                                fontWeight:'bold'
                            },
                        },
                        labelLine:{
                            show:true,
                            length:25,
                            length2:25
                        },
                        itemStyle: {
                            borderColor: '#021f3b',
                            color:function (params) {
                                return colorList[params.dataIndex]
                            }
                        },
                    },{
                        name: '前日',
                        type: 'pie',
                        radius: ['30%', '40%'],
                        center: ['50%','75%'],
                        data:lastSourceArr,
                        labelLine:{
                            show:true,
                            length:25,
                            length2:25
                        },
                        label: {
                            textStyle:{
                                fontSize:20*this.scale,
                                fontWeight:'bold'
                            },
                        },
                        itemStyle: {
                            borderColor: '#021f3b',
                            color:function (params) {
                                return colorList[params.dataIndex]
                            }
                        },
                    }]
                };
                myChart.setOption(option);
                myChart.on('click',params=>{
                    this.$router.push({
                        name: '分类列表',
                        query: {
                            code: JSON.stringify(this.codeObj),
                            type: params.name||params.value,
                        }
                    });
                })
            },
        //    返回
            back(){
                this.$router.go(-1);
            },

        //    获取数据
            getData() {
                // console.log(JSON.parse(sessionStorage.getItem('myArea')));
                let type=JSON.parse(sessionStorage.getItem('type'));
                // console.log(type[this.$route.query.type]);
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
                    url: this.apiRoot + 'recJQFLTJB/findJQFLsecondNumHB',
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
                        qtTime: start2,
                        tjTime: start1,
                        xzqhdm:JSON.parse(sessionStorage.getItem('myArea')),
                        fldm:type[this.$route.query.type]
                    }
                }).then(res => {
                    // console.log(res);
                    let beforeYesterday=res.data.jqflschb.QT;
                    let yesterday=res.data.jqflschb.ZT;
                    let hb=res.data.jqflschb.ZTHB;
                    let code=res.data.jqflschb.ZTDM;
                    if(res.data.jqflschb.ZTHB!=='{}'){
                        hb=res.data.jqflschb.ZTHB.slice(1,res.data.jqflschb.ZTHB.length-1);
                        yesterday=res.data.jqflschb.ZT.slice(1,res.data.jqflschb.ZT.length-1);
                        beforeYesterday=res.data.jqflschb.QT.slice(1,res.data.jqflschb.QT.length-1);
                        code=res.data.jqflschb.ZTDM.slice(1,res.data.jqflschb.ZTDM.length-1);

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
                        this.codeObj=toJson(code);

                        let nameArr=[];
                        /* let nameArr1=[];
                         let nameArr2=[];
                         let nameArr3=[];
                         let temp=[];
                         for (let item in beforeYesterday){
                             nameArr1.push(item)
                         }
                         for (let item in yesterday){
                             nameArr2.push(item)
                         }
                         for (let item in hb){
                             nameArr3.push(item)
                         }
                         nameArr1.length>nameArr2.length?temp=nameArr1:temp=nameArr2;
                         temp.length>nameArr3.length?nameArr=temp:nameArr=nameArr3;
                         // console.log(nameArr);*/
                        for (let item in this.codeObj){
                            nameArr.push(item);
                        }
                        // console.log(nameArr);
                        let yD=[];
                        let lD=[];
                        nameArr.forEach(value => {
                            if (value in yesterday){
                                yD.push(Number(yesterday[value]));
                            }else {
                                yD.push(0);
                            }
                            if (value in beforeYesterday){
                                lD.push(Number(beforeYesterday[value]));
                            }else {
                                lD.push(0);
                            }
                        });
                        let totalM=[];
                        /*yD.forEach((value, index) => {
                            totalM.push(Number(value)+Number(lD[index]));
                        });*/
                        let arr=[];
                        arr=[...lD,...yD];
                        let t=Math.max(...arr);
                        nameArr.forEach(value => {
                            totalM.push(t);
                        });
                        let totalY=eval(yD.join('+'));
                        let totalL=eval(lD.join('+'));
                        // console.log(totalY,totalL);
                        this.myData=nameArr;
                        this.lineData=totalM;
                        this.yesterday=yD;
                        this.last=lD;

                        let myData1=[];
                        let myData2=[];
                        let lineData1=[];
                        let lineData2=[];
                        let last1=[];
                        let last2=[];
                        let yesterday1=[];
                        let yesterday2=[];
                        if (nameArr.length>11){
                            myData1=nameArr.slice(0,11);
                            myData2=nameArr.slice(11,nameArr.length);
                            lineData1=totalM.slice(0,11);
                            lineData2=totalM.slice(11,totalM.length);
                            last1={1:lD.slice(0,11)};
                            last2={1:lD.slice(11,lD.length)};
                            yesterday1={1:yD.slice(0,11)};
                            yesterday2={1:yD.slice(11,yD.length)};
                            this.randerCharts1(myData1,lineData1,last1,yesterday1);
                            this.randerCharts2(myData2,lineData2,last2,yesterday2);
                        }else {
                            myData1=nameArr;
                            lineData1=totalM;
                            last1={1:lD};
                            yesterday1={1:yD};
                            /*console.log(myData1);
                            console.log(lineData1);
                            console.log(last1);
                            console.log(yesterday1);*/
                            this.randerCharts(myData1,lineData1,last1,yesterday1);
                            this.detailProportionChart(nameArr,lD,yD);
                        }

                    }
                })
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
                        that.getData();
                    },
                };
                Index.init();
            },
        },
        mounted() {


            this.renderChart();
            /*let myData1=[];
            let myData2=[];
            let lineData1=[];
            let lineData2=[];
            let last1=[];
            let last2=[];
            let yesterday1=[];
            let yesterday2=[];
            if (this.myData.length>11){
                myData1=this.myData.slice(0,11);
                myData2=this.myData.slice(11,this.myData.length);
                lineData1=this.lineData.slice(0,11);
                lineData2=this.lineData.slice(11,this.lineData.length);
                last1={1:this.last.slice(0,11)};
                last2={1:this.last.slice(11,this.last.length)};
                yesterday1={1:this.yesterday.slice(0,11)};
                yesterday2={1:this.yesterday.slice(11,this.yesterday.length)};
            }
            this.randerCharts1(myData1,lineData1,last1,yesterday1);
            this.randerCharts2(myData2,lineData2,last2,yesterday2);
            this.detailProportionChart(this.myData,this.last,this.yesterday)*/

            // this.detailProportionChart(this.myData,this.last,this.yesterday)
        },
         beforeDestroy() {
            clearInterval(counter);
            counter = null;


        }, //生命周期 - 销毁之前
    }
</script>

<style scoped lang="scss">
    .back{
        position: fixed;
        left: 2%;
        top: 8%;
        z-index: 10;
        cursor: pointer;
        .iconfont{
            font-size: 1rem;
        }
    }
main{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1.2rem;
    .chart{
        width: 100%;
        height: 100%;
    }
    .chart-wrap{
        width: 96%;
        height: 100%;
        .title_wrap {
            width: 100%;
            height: 3.6rem;
            box-sizing: border-box;
            position: relative;
            background-repeat: no-repeat;
            background-size: auto 100%;
            background-image: url("../assets/images/index/title_left.png");
            background-position: left;
            span {
                height: 100%;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                font-size: 1.5rem;
                letter-spacing: 2px;
                margin-left: 3%;
                float: left;
            }
        }
        .chartBox{
            width: 100%;
            height: calc(100% - 3.6rem);
            background-image: url("../assets/images/index/proportionBg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            padding: 1% 1% 1.3%;
            box-sizing: border-box;
            .mahjong{
                width: 66%;
                height: 100%;
                float: left;
                .chart{
                    float: left;
                    width: 50%;
                }
            }
            .pie{
                width: 34%;
                height: 100%;
                float: right;
            }
        }
    }
}
</style>
