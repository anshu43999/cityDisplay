<!--  -->
<template>
    <div class='r'>
        <div class="r-t">
            <div class="chart-wrap">
                <div class="title_wrap">{{this.chartTitle[0]}}</div>
                <div class="chartBox">
                    <div class="chart" id="jqflsjfxChart"></div>
                </div>
            </div>


            <div class="chart-wrap">
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
                            <td  v-for="(val,i) in item " :key="i" :class="i === 0  ? 'firstcolum' :'normalColor' ">
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
                show:true,
                scale: 1,
                refreshCharts: [],
                proportionSource: [],
                proportionColor: [],
                title: [],
                chartsObj:{},
                axisesColor: '#36b2ae',
                dateArr:[],
                position:[],
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
                findUrl :[
                    'recJJLXTJB/findCityAlarmData',
                    'recBJFSTJB/findCityAlarmMode',
                    'recLHLXTJB/findCityIncomingType',

                    
                ],
                cityDm : {
                    '太原市' : '1401',
                    '大同市' : '1402',
                    '阳泉市' :'1403',
                    '长治市' : '1404',
                    '晋城市' : '1405',
                    '朔州市' : '1406',
                    '晋中市' : '1407',
                    '运城市' : '1408',
                    '忻州市' : '1409',
                    '临汾市' : '1410',
                    '吕梁市'  : '1411'
                },
                tableData :[],
                xAxisData :[],
                // 左上
                leftTop : [],
                leftTopy :[],
                leftTopBy : [],

                // 列表
                bottomList :[ [],[],[],[],[],[],[]],
                chartTitle : [],
                leftTopAgin :[],   // 


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
            },
            percent(sourceArr, colorList,postion) {
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
                                    show:true,
                                    normal: {
                                        formatter: function (params) {
                                            console.log(params.value)
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
            },

            // 左一

            //    警情分类数据分析

            jqflsjfxChart() {
                // this.leftTopAgin   = this.leftTop ;
                // leftTop : [],
                // leftTopy :[],
                // leftTopBy : [],
                let  Arr = [];
                console.log(this.leftTop);
                this.leftTop.forEach( (item,index)=>{
                    console.log(item);
                    if(item !== ' ' ){
                        Arr.push(item);
                    }
                } )
                console.log(Arr);



                let brr = this.leftTopy;
                let crr = this.leftTopBy;
                // console.log(Arr);
                // Arr.shift();
                // console.log(Arr);
                
                let myChart = this.$echarts.init(document.getElementById('jqflsjfxChart'));
                this.chartsObj.jqflsjfxChart = myChart;
                let xData = [];
                // let sourceArr = this.jqflsjfxSource;
                // sourceArr.forEach(value => {
                //     xData.push(value.name);
                // });
                // console.log(Arr);
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
                                color: '#00d7d4',
                                lineHeight: 20,
                            },
                            rotate : 45,
                            // margin:40
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
                            }
                        }
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
                        symbolSize: [20, 10],
                        symbolOffset: [0, -5],
                        z: 12,
                        itemStyle: {
                            normal: {
                                color: '#14b1eb'
                            }
                        },
                        label:{
                            show :true,
                            position :'top',
                        },
                        data: crr
                    }, {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [20, 10],
                        symbolOffset: [0, 5],
                        z: 12,
                        itemStyle: {
                            normal: {
                                color: '#14b1eb'
                            }
                        },
                        data: brr
                    }, {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#14b1eb',
                                opacity: .7
                            }
                        },
                        silent: true,
                        barWidth: 20,
                        barGap: '-100%', // Make series be overlap
                        data:brr
                    }],
                    grid : {
                        bottom: 40 + '%',
                    }
                };
                myChart.setOption(option);
            },




            // 左二
            //占比
            percent() {
                let myChart = this.$echarts.init(document.getElementById('proportionChart'));
                this.chartsObj['proportionChart'] = myChart;
                let colorList = this.proportionColor;
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
                            show: true,
                            interval : 0,
                          
                            fontSize: 16 * this.scale
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
                        top: 90 * this.scale,
                        bottom: 90 * this.scale,
                        left: 140 * this.scale
                    }
                };
                myChart.setOption(option);
            },




           
            renderChart() {
                switch (this.$route.query.title) {
                    case '市接警类型数据分析':
                        this.show=true;
                        this.proportionColor = [['#05dbb0', '#ccfff5'], ['#00a3c0', '#9ff1ff'], ['#4160fd', '#a5b4ff'], ['#bd0fdc', '#f2aaff'], ['#803ff7', '#c3a2ff']];
                        this.chartTitle = ['接警类型数据分析','接警类型占比分析','七日接警类型数据分析'];
                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#6ffeff', '#00a0a6','#05dbb0'];
                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba','#009eba'];
                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6f87ff', '#0024dd','#5470fd'];
                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#ff6cfa', '#a0009b','#bd0fdc'];
                        this.position=[20,10];
                        break;
                    case '市报警方式数据分析':
                        this.show=true;
                        // this.proportionSource = [
                        //     {name: '电话报警', value: 25},
                        //     {name: '来人（来电报警）', value: 25},
                        //     {name: '技防报警', value: 25},
                        //     {name: '短信报警', value: 25},
                        //     {name: '其他报警方式', value: 25},
                        // ];
                        this.proportionColor = [['#ffd75d', '#ffe9a6'], ['#00a3c0', '#9ff1ff'], ['#4160fd', '#a5b4ff'], ['#6400cb', '#ce9eff'], ['#e344ff', '#f9d8ff']];
                        this.chartTitle = ['报警方式数据分析','报警方式占比分析','七日报警方式数据分析'];
                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#ffebaf', '#ffd75e','#ffd75d'];
                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba','#009eba'];
                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6f87ff', '#0024dd','#5470fd'];
                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#a650ff', '#a650ff','#bd0fdc'];
                        this.position=[20,10];
                        break;
                    case '市来话类型数据分析':
                        this.show=false;
 
                        this.proportionColor = [['#ed69ec', '#ffdeff'], ['#4a66ed', '#aebcff'], ['#1b22ac', '#7b8bff'], ['#8c4ff9', '#c7a8ff'], ['#6c08c8', '#b361ff'], ['#20f5ed', '#c3fffd'], ['#8b06a6', '#ed95ff']];
                        this.chartTitle = ['来话类型数据分析','来话类型占比分析','七日来话类型数据分析'];
                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#ff6cfa', '#a0009b','#ff6cfa'];
                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#8298ff', '#324fcc','#415fec'];
                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6163ff', '#3032d7','#243bcd'];
                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#ad81ff', '#733be3','#7c46e7'];
                        // this.subClassSource5 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList5 = ['#8919ee', '#620ab4','#8618ea'];
                        // this.subClassSource6 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList6 = ['#b0fffb', '#119b9d','#18f3e9'];
                        this.position=[14,8];
                        break;
                }
                this.proportionSource.forEach(value => {
                    console.log(value);
                    this.title.push(value.name);
                });
                    console.log(this.title);

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
                        // leftTop : [],
                            // leftTopy :[],
                            // leftTopBy : [],
                        

                        
                        

                       
                        
                    },
                };
                Index.init();
            },


            pdFilter_btn(){
                let str = this.$route.query.title;

                str = str.substring(0,1);
                console.log(str);

                if(str == '全'){
                    this.$emit('filter_btn',true)
                }else{
                    this.$emit('filter_btn',false)
                }
            },
            getInitData(){
                // 开始获取  省的 时间选择
                let str = JSON.parse(sessionStorage.getItem('jjlx'));
                let str1 = JSON.parse(sessionStorage.getItem('bjfs'));
                let str2 = JSON.parse(sessionStorage.getItem('lhlx'));
                let that = this;

                switch (this.$route.query.title) {
                    case '市接警类型数据分析':
                        this.$http.get(this.apiRoot + this.findUrl[0],{
                            params : {
                                startTime : str['start'],
                                endTime : str['end'],
                                xzqhdm :  that.cityDm[that.$route.query.city], 
                            }
                        })
                        .then(function (res) { 
                            console.log(res['data']);
                            that.tableData = res['data'];
                            that.leftTop = res['data']['type'];

                            let sum ;
                            that.leftTopy = [];
                            that.leftTopBy = [];
                            that.leftTop.forEach((item,index)=>{
                                sum = 0;
                                // console.log(that.tableData[item]);
                                
                                that.tableData[item].forEach((val,i)=>{
                                    // console.log(val);
                                    sum += parseInt(val['jjsl']) 
                                })
                                that.leftTopy.push(sum);
                                // leftTopy[index]  = sum;

                                that.leftTopBy.push({ value : sum, symbolPosition: 'end'  });
                            })

                            console.log(that.leftTop);
                            console.log(that.leftTopy);
                            console.log(that.leftTopBy);


                            if(that.tableData){
                                let obj1 = that.tableData['110报警'];
                                let str1 ;
                                let qian ;
                                let hou ; 
                                // console.log(obj6 );
                                that.dateArr = [];
                                obj1.forEach((item,index)=>{
                                    str1 = item['tjrq'] ;
                                    str1 = str1.substring(4,8);
                                    qian = str1.substring(0,2);
                                    hou = str1.substring(2,4);
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
                                // console.log(obj5)
                                that.proportionSource.forEach( (item,indx)=>{
                                    console.log(item['name']);
                                    item['value'] =  obj5[item['name']]
                                    console.log(obj5[item['name']])
                                } )

                                
                                console.log(that.tableData['num']);
                                console.log(that.leftTop);   // ["110报警", "122报警", "119报警", "综合报警", "其它接警类型", __ob__: Observer]



                                // bottomList
                                let yDate = [];
                                // 加入时间
                                yDate = that.tableData['days'];   
                                console.log(yDate);   //"08-30", "08-31", "09-01", "09-02", "09-03", "09-04", "09-05"
                                that.bottomList.forEach( (item,index) =>{
                                    item.push(yDate[index])
                                } )
                                console.log(that.bottomList);

                                // 加入数据


                                that.leftTop.forEach((item,index)=>{
                                    console.log(that.tableData['num'][item]);
                                    yDate.forEach( (val,i) => {
                                        console.log(that.tableData['num'][item][val])
                                        console.log(that.bottomList[i]);
                                        if(!that.tableData['num'][item][val]){
                                            that.bottomList[i].push(0)  ;
                                        }else{
                                            that.bottomList[i].push(that.tableData['num'][item][val])  ;
                                        }   
                                    } )
                                }) 
                                console.log(that.bottomList);
                                let arr = that.leftTop;
                                arr.unshift(' ');
                                // console.log(arr);
                                that.bottomList.unshift(arr);

                                that.renderChart();
                            }
                         })
                        break;
                    case '市报警方式数据分析':
                        this.$http.get(this.apiRoot + this.findUrl[1],{
                            params : {
                                startTime : str['start'],
                                endTime : str['end'],
                                xzqhdm :  that.cityDm[that.$route.query.city], 
                            }
                        })
                        .then(function (res) { 
                            // console.log(res);
                            console.log(res['data']);
                            that.tableData = res['data'];
                            if(that.tableData){
                                that.leftTopAgin = res['data']['type'];
                                console.log(res['data']['type']);
                                
                                that.leftTop = res['data']['type'];
                                let sum ;
                                that.leftTopy = [];
                                that.leftTopBy = [];
                                that.leftTop.forEach((item,index)=>{
                                    sum = 0;
                                    // console.log(that.tableData[item]);
                                    
                                    that.tableData[item].forEach((val,i)=>{
                                        // console.log(val);
                                        sum += parseInt(val['jjsl']) 
                                    })
                                    that.leftTopy.push(sum);
                                    // leftTopy[index]  = sum;

                                    that.leftTopBy.push({ value : sum, symbolPosition: 'end'  });
                                })


                                let obj1 = that.tableData['电话报警'];
                                let str1 ;
                                let qian ;
                                let hou ; 
                                // console.log(obj6 );
                                that.dateArr = [];
                                obj1.forEach((item,index)=>{
                                    str1 = item['tjrq'] ;
                                    str1 = str1.substring(4,8);
                                    qian = str1.substring(0,2);
                                    hou = str1.substring(2,4);
                                    str1 = qian + '-' + hou;
                                    that.dateArr.push(str1);
                                })
                                obj1.forEach( (item,index)=>{
                                    that.subClassSource1[index] = parseInt(item['jjsl']) 
                                } )
                                let obj2 = that.tableData['来人(来电)报警'];
                                obj2.forEach( (item,index)=>{
                                    that.subClassSource2[index] = parseInt(item['jjsl']) 
                                } )
                                let obj3 = that.tableData['技防报警'];
                                obj3.forEach( (item,index)=>{
                                    that.subClassSource3[index] = parseInt(item['jjsl']) 
                                } )
                                let obj4 = that.tableData['短信报警'];
                                obj4.forEach( (item,index)=>{
                                    that.subClassSource4[index] = parseInt(item['jjsl']) 
                                } )
                                let obj5 = that.tableData['proportion'];
                               

                                that.proportionSource = [
                                    {name: '电话报警', value: 0},
                                    {name: '来人(来电)报警', value: 0},
                                    {name: '技防报警', value: 0},
                                    {name: '短信报警', value: 0},
                                    {name: '其它报警方式', value: 0},
                                ];

                                // console.log(obj5)
                                that.proportionSource.forEach( (item,indx)=>{
                                    console.log(item['name']);
                                    item['value'] =  obj5[item['name']]
                                    console.log(obj5[item['name']])
                                } )


                                // bottomList
                                let yDate = [];
                                // 加入时间
                                yDate = that.tableData['days'];   
                                console.log(yDate);   //"08-30", "08-31", "09-01", "09-02", "09-03", "09-04", "09-05"
                                that.bottomList.forEach( (item,index) =>{
                                    item.push(yDate[index])
                                } )
                                console.log(that.bottomList);

                                // 加入数据


                                that.leftTop.forEach((item,index)=>{
                                    console.log(that.tableData['num'][item]);
                                    yDate.forEach( (val,i) => {
                                        console.log(that.tableData['num'][item][val])
                                        console.log(that.bottomList[i]);
                                        if(!that.tableData['num'][item][val]){
                                            that.bottomList[i].push(0)  ;
                                        }else{
                                            that.bottomList[i].push(that.tableData['num'][item][val])  ;
                                        }   
                                    } )
                                }) 
                                console.log(that.bottomList);
                                let arr = that.leftTop;
                                arr.unshift(' ');
                                console.log(arr);
                                that.bottomList.unshift(arr);



                                that.renderChart();
                            }
                         })

                        break;

                    case '市来话类型数据分析':
                        this.$http.get(this.apiRoot + this.findUrl[2],{
                            params : {
                                startTime : str['start'],
                                endTime : str['end'],
                                xzqhdm :  that.cityDm[that.$route.query.city], 
                            }
                        })
                        .then(function (res) { 
                            
                            // console.log(res);
                            console.log(res['data']);
                            that.tableData = res['data'];
                            if(that.tableData){
                            
                                that.leftTop = res['data']['type'];
                                let sum ;
                                that.leftTopy = [];
                                that.leftTopBy = [];
                                that.leftTop.forEach((item,index)=>{
                                    sum = 0;
                                    // console.log(that.tableData[item]);
                                    
                                    that.tableData[item].forEach((val,i)=>{
                                        // console.log(val);
                                        sum += parseInt(val['jjsl']) 
                                    })
                                    that.leftTopy.push(sum);
                                    // leftTopy[index]  = sum;

                                    that.leftTopBy.push({ value : sum, symbolPosition: 'end'  });
                                })

                            
                            
                                let obj1 = that.tableData['报警求助、举报投诉'];
                                let str1 ;
                                let qian ;
                                let hou ; 
                                // console.log(obj6 );
                                that.dateArr = [];
                                obj1.forEach((item,index)=>{
                                    str1 = item['tjrq'] ;
                                    str1 = str1.substring(4,8);
                                    qian = str1.substring(0,2);
                                    hou = str1.substring(2,4);
                                    str1 = qian + '-' + hou;
                                    that.dateArr.push(str1);
                                })
                                

                                obj1.forEach( (item,index)=>{
                                    that.subClassSource1[index] = parseInt(item['jjsl']) 
                                } )
                                let obj2 = that.tableData['处警反馈'];
                                obj2.forEach( (item,index)=>{
                                    that.subClassSource2[index] = parseInt(item['jjsl']) 
                                } )
                                let obj3 = that.tableData['信息咨询'];
                                obj3.forEach( (item,index)=>{
                                    that.subClassSource3[index] = parseInt(item['jjsl']) 
                                } )
                                let obj4 = that.tableData['重复报警'];
                                obj4.forEach( (item,index)=>{
                                    that.subClassSource4[index] = parseInt(item['jjsl']) 
                                } )
                                let obj7 = that.tableData['骚扰电话'];
                                obj7.forEach( (item,index)=>{
                                    that.subClassSource5[index] = parseInt(item['jjsl']) 
                                } )
                                let obj8 = that.tableData['系统测试'];
                                obj8.forEach( (item,index)=>{
                                    that.subClassSource6[index] = parseInt(item['jjsl']) 
                                } )
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

                                // console.log(obj5)
                                that.proportionSource.forEach( (item,indx)=>{
                                    console.log(item['name']);
                                    item['value'] =  obj5[item['name']]
                                    console.log(obj5[item['name']])
                                } )



                                // bottomList
                                let yDate = [];
                                // 加入时间
                                yDate = that.tableData['days'];   
                                console.log(yDate);   //"08-30", "08-31", "09-01", "09-02", "09-03", "09-04", "09-05"
                                that.bottomList.forEach( (item,index) =>{
                                    item.push(yDate[index])
                                } )
                                console.log(that.bottomList);

                                // 加入数据


                                that.leftTop.forEach((item,index)=>{
                                    console.log(that.tableData['num'][item]);
                                    yDate.forEach( (val,i) => {
                                        console.log(that.tableData['num'][item][val])
                                        console.log(that.bottomList[i]);
                                        if(!that.tableData['num'][item][val]){
                                            that.bottomList[i].push(0)  ;
                                        }else{
                                            that.bottomList[i].push(that.tableData['num'][item][val])  ;
                                        }   
                                    } )
                                }) 
                                console.log(that.bottomList);
                                let arr = that.leftTop;
                                arr.unshift(' ');
                                console.log(arr);
                                that.bottomList.unshift(arr);





                                that.renderChart();
                            }
                         })


                        break;
                    
                
                    // default:
                    //     break;
                }
                console.log(that.dateArr);




                




                

               
            },

        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.pdFilter_btn();
            this.getScale();
            // this.renderChart();
            this.getInitData();
            // console.log(1111);
            // console.log(this.tableData)
            // console.log(this.title);

            // let arr = ["110报警", "122报警", "119报警", "综合报警", "其它接警类型"]
            // let brr = [7001, 1470, 204, 0, 0]
            // let crr = [
            //     {value: 7001,symbolPosition: "end"},
            //     {value: 1470,symbolPosition: "end"},
            //     {value: 204,symbolPosition: "end"},
            //     {value: 0,symbolPosition: "end"},
            //     {value: 0,symbolPosition: "end"},

                
            // ]



            // this.jqflsjfxChart(arr,brr,crr);



           

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
    .chart-wrap {
        width: 100%;
        height: 100%;

        .title_wrap {
            height: 12%;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            // background: linear-gradient(-180deg, #ffffff 50%, #384a6b 70%);
            // -webkit-background-clip: text;
            // color: transparent;
            // font-size: 2.3rem;
            // -webkit-text-fill-color: transparent;
        }

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
            
            .chart-wrap{
                width: 50%;
                height: 100%;
                background-image: url('../assets/images/index/l-t-bg1.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                // padding-bottom: 1%;
            }
        }

        .r-b {
            width: 100%;
            height: 57%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-image: url('../assets/images/index/l-t-bg2.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            // padding: 4%;
            .chart-wrap{
                padding: 0 4% 4% 4%;
            }

            table{
                width: 100%;
                height: 100%;
                tr{
                    td{
                        text-align: center;
                    }
                    .firstcolum{
                        color: #5abcff
                    }
                    .normalColor{
                        color: #ffe754
                    }

                }
                .topStyle{
                    td{
                        color: #5abcff
                    }
                }
            }

         

           
        ;
         

        }


    }
</style>