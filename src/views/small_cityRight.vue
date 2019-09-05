<template>
    <div class="r">
        <div class="r-t">
            <div class="r-t-l">
                <div class="chart-wrap">
                    <h3>{{this.chartTitle[0]}}</h3>
                    <div class="chartBox">
                        <div class="chart" id="bar"></div>
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
            <div class="chart-wrap">
                <h3>{{this.chartTitle[2]}}</h3>
                <div class="selectListBox">
                    <ul @click="selectItem">
                        <li v-for="item in selectOptions" :key="item">
                            <div>{{item}}</div>
                        </li>
                    </ul>
                </div>
                <!--                <div class="chart" id="detailChart"></div>-->
                <div class="detail">
                    <ul>
                        <li v-for="item in detailSource" :key="item.name">
                            <p>{{item.name}}</p>
                            <p>{{item.value}}</p>
                        </li>
                    </ul>
                </div>
                <div class="chart" id="detailProportionChart"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "small_proRight",
        props: ['typeAnalyze'],
        data(){
            return {
                sxCityObj: {
                    '临汾市': 141000,
                    '吕梁市': 141100,
                    '大同市': 140200,
                    '太原市': 140100,
                    '忻州市': 140900,
                    '晋中市': 140700,
                    '晋城市': 140500,
                    '朔州市': 140600,
                    '运城市': 140800,
                    '长治市': 140400,
                    '阳泉市': 140300,
                },
                scale: 1,
                selectOptions:[],
                //需要刷新的图表
                refreshCharts: [],
                //    所有的图标对象
                chartsObj: {},
                //坐标轴颜色
                axisesColor: '#36b2ae',
                //标题
                chartTitle: [],
                totalSource:[],
                jqflsjfxSource: [
                    /*{name: '刑事', value: 1300},
                    {name: '行政(治安)', value: 1500},
                    {name: '交通类', value: 900},
                    {name: '消防救援', value: 900},
                    {name: '群众救助', value: 1400},
                    {name: '应急联动事件(非警情事件)', value: 1100},
                    {name: '群体事件', value: 1500},
                    {name: '纠纷', value: 1400},
                    {name: '灾害事故', value: 800},
                    {name: '举报', value: 850},
                    {name: '投诉监督', value: 700}*/
                ],
                proportionSource: [
                    /*{name: '刑事', value: 23.5},
                    {name: '行政(治安)', value: 14},
                    {name: '交通类', value: 13.45},
                    {name: '消防救援', value: 23},
                    {name: '群众救助', value: 12.4},
                    {name: '应急联动事件(非警情事件)', value: 13.2},
                    {name: '群体事件', value: 14.56},
                    {name: '纠纷', value: 45},
                    {name: '灾害事故', value: 43},
                    {name: '举报', value: 15.5},
                    {name: '投诉监督', value: 12}*/
                ],
                detailSource:   [
                    /*{name: '危害国家安全', value: 3},
                    {name: '危害公共安全', value: 12},
                    {name: '防火', value: 4},
                    {name: '爆炸', value: 1},
                    {name: '劫持', value: 1},
                    {name: '侵犯人身、民主权利', value: 6},
                    {name: '杀人', value: 7},
                    {name: '伤害', value: 8},
                    {name: '强奸', value: 2},
                    {name: '绑架', value: 2},
                    {name: '抢劫', value: 6},
                    {name: '盗窃', value: 7},
                    {name: '诈骗 ', value: 10},
                    {name: '抢夺 ', value: 13},
                    {name: '妨碍社会管理秩序 ', value: 9},
                    {name: '破坏市场经济秩序 ', value: 11},
                    {name: '破坏金融管理秩序 ', value: 8},
                    {name: '金融诈骗 ', value: 9},
                    {name: '侵犯财产 ', value: 6},
                    {name: '破坏环境资源 ', value: 16},
                    {name: '其他刑事警情 ', value: 15},*/
                ],
            }
        },
        methods: {
            //获取缩放值
            getScale() {
                this.scale = localStorage.getItem('scale');
            },
            //返回
            goBack() {
                this.$router.go(-1);
            },
            setName() {
                this.chartTitle = ['警情分类数据分析', '警情分类数据占比分析','警情分类数据占比分析']
            },
            //柱状图
            barChart(Arr,brr,crr) {
                let myChart = this.$echarts.init(document.getElementById('bar'));
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
                                lineHeight: 24*this.scale,
                                fontSize:14*this.scale,
                            },
                            rotate : 30,
                            interval:0,
                            margin:24*this.scale,
                            formatter: function (params) {
                                let newParamsName = "";
                                let paramsNameNumber = params.length;
                                let provideNumber = 6;  //一行显示几个字
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
                            fontSize:14*this.scale,
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
                        data: brr,
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
                    grid:{
                        top:50*this.scale,
                        left:70*this.scale,
                        right:20*this.scale,
                        bottom : 100*this.scale
                    }
                };
                myChart.setOption(option);
            },
            //占比
            percent() {
                let myChart = this.$echarts.init(document.getElementById('proportionChart'));
                this.chartsObj['proportionChart'] = myChart;
                let colorList = ['#ff4860', '#84fff7', '#e3ff7c', '#b137ff', '#387eff', '#ffa4d6', '#a4ffb1', '#cde3ff', '#ec7b15', '#1fa78f', '#8dffd5', '#8e88ff'];
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
                                color: function (value, index) {
                                    return colorList[index];
                                },
                            },
                            interval: 0,
                            formatter:function (value,index) {
                                let type=index%2===0?'up':'down';
                                return '{'+type+'|'+value+'}'
                            },
                            rich:{
                                up:{
                                    height:20*this.scale,
                                    fontSize:14*this.scale
                                },
                                down:{
                                    height:80*this.scale,
                                    fontSize:14*this.scale
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
                            fontSize:20*this.scale,
                        }
                    },
                    series: {
                        type: 'pictorialBar',
                        barCategoryGap: '-50%',
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
                                fontSize:14*this.scale,
                            }
                        },
                        data: sourceArr,
                        z: 10
                    },
                    tooltip: {
                        formatter:function (params) {
                            // return params.marker+params.data.name+'：'+params.data.value+'%';
                        }
                    },
                    grid: {
                        top: 50 * this.scale,
                        bottom: 100 * this.scale,
                        left: 90 * this.scale,
                        right: 40 * this.scale,
                    }
                };
                myChart.setOption(option);
            },
            //细类
            detailChart() {
                let myChart = this.$echarts.init(document.getElementById('detailChart'));
                let sourceArr = this.detailSource;
                let yData = [];
                let colorList = ['#0054a2', '#00a0a3'];
                for (let i = 0; i < sourceArr.length; i++) {
                    yData.push(sourceArr[i].name);
                }
                let option = {
                    xAxis: {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#0c9ca3',
                                type: 'dashed'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#0c9ca3',
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                        },
                        position: 'top',
                    },
                    yAxis: {
                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#0c9ca3',
                                type: 'dashed'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            fontSize: 20 * this.scale
                        },
                        data: yData
                    },
                    series: {
                        type: 'bar',
                        data: sourceArr,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    //右，下，左，上
                                    0, 0, 1, 0, [{
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
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: function (params) {
                                    return params.value
                                },
                                color: '#0c9ca3',
                                fontSize:20*this.scale
                            }
                        },
                        barWidth: 17 * this.scale
                    },
                    grid: {
                        left:80,
                        top: 0,
                        bottom: 0
                    },
                    tooltip:{}
                };
                myChart.setOption(option);
            },
            detailProportionChart(){
                let myChart=this.$echarts.init(document.getElementById('detailProportionChart'));
                let sourceArr=this.detailSource;
                let colorList1=['#815179','#66a99f','#fc6262','#8cacc7','#eacf79','#63d3c3','#e9ab50','#b7564f','#d8bcca','#89b8c7','#a4c585','#49bcf3','#8e88ff', '#ff8155','#3ecf6a','#fff497','#c64f47','#81799e','#2f9a94','#9e57b7','#d58a85'];
                sourceArr.forEach((value, index) => {
                    value.itemStyle={
                        normal: {
                            color: colorList1[index],
                        },
                    };
                    value.label={
                        textStyle: {
                            color: colorList1[index],
                            fontSize:18*this.scale,
                        },
                    };
                });
                let option={
                    tooltip: {},
                    series: {
                        // type: 'sunburst',
                        type: 'pie',
                        radius: ['47%', '60%'],
                        // center: ['50%', '55%'],
                        center: ['50%', '50%'],
                        data: sourceArr,
                        label: {
                            // rotate: 'radial',
                            // align:'left',
                            // position:'top',
                            // distance:20,
                        },
                        itemStyle: {
                            borderColor: '#021f3b',
                        },
                    }
                };
                myChart.setOption(option);
            },
            renderChart() {
                console.log(2);
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
                        that.getCityDataDetail();
                        that.getCityData();
                        /*that.detailChart();
                        that.detailProportionChart();*/
                    },
                };
                Index.init();
            },
            selectedItem(){
                let item = document.querySelectorAll('.selectListBox>ul>li>div');
                item[0].classList.add('active');
            },
            selectItem(e){
                let item = document.querySelectorAll('.selectListBox>ul>li>div');
                if(e.target.nodeName == 'UL') return;
                item.forEach((value) => {
                    value.classList.remove('active');
                });
                e.target.classList.add('active');
                this.totalSource.forEach(value => {
                    if (e.target.innerText===value.name){
                        this.detailSource=value.dataArr;
                        // this.detailChart();
                        this.detailProportionChart();
                    }
                })
            },

            getCityData(){
                this.myPeriod = JSON.parse(sessionStorage.getItem('jqfl'));
                this.getXzqh();
                let that=this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + 'recJQFLTJB/findJQFLNumXZQH',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
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
                        // startTime: this.jjlx.start,
                        // endTime: this.jjlx.end,
                        tjTime: that.myPeriod.date,
                        xzqhdm:that.xzqhdm
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        let arr = [];
                        let brr = [];
                        let crr = [];
                        let total=0;
                        res.data.forEach((item,index) => {
                            total+=item.jjsl;
                            if(!item['fldmmc']){
                                item['fldmmc']='其它';
                            }
                            arr.push(item['fldmmc'])
                            brr.push(item['jjsl'])
                            crr.push({ value : item['jjsl'], symbolPosition: 'end'  })
                        });
                        // console.log(total);
                        that.barChart(arr,brr,crr);
                        let rencentArr=[];
                        res.data.forEach(value => {
                            // console.log(value.value);
                            if (value.fldmmc){
                                rencentArr.push({name:value.fldmmc,value:Math.round((value.jjsl/total)*100)})
                            }
                        });
                        that.proportionSource=rencentArr;
                        that.percent();
                    })
            },
            getCityDataDetail(){
                this.myPeriod = JSON.parse(sessionStorage.getItem('jqfl'));
                this.getXzqh();
                let that=this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + 'recJQFLTJB/findJQFLsecondNumXZQH',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
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
                        // startTime: this.jjlx.start,
                        // endTime: this.jjlx.end,
                        tjTime: that.myPeriod.date,
                        xzqhdm:that.xzqhdm
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        let r =[];
                        let narr=[];
                        for(let i =0;i<res.data.length;i++){
                            // arr.push({name:res.data[i].fldmmc,value:res.data[i].jjsl});
                            let n = r.indexOf(res.data[i].sjdmmc);
                            if(n == -1){
                                r.push(res.data[i].sjdmmc);
                                narr.push({"name":res.data[i].sjdmmc,dataArr:[{name:res.data[i].fldmmc,value:res.data[i].jjsl}]});
                            }else{
                                narr[n].dataArr.push({name:res.data[i].fldmmc,value:res.data[i].jjsl})
                            }
                        }
                        let nameArr=[];
                        for (let i=0;i<narr.length;i++){
                            if (narr[i].name===undefined){
                                narr[i].name='其它'
                            }
                            nameArr.push(narr[i].name);
                        }
                        that.selectOptions=nameArr;
                        that.totalSource=narr;
                        that.detailSource=that.totalSource[0].dataArr;
                        // console.log(that.detailSource);
                        // console.log(that.totalSource);
                        // that.selectOptions=nameArr;
                        that.detailSource=that.totalSource[0].dataArr;
                        // // that.detailChart();
                        that.detailProportionChart();
                    }).then(()=>{
                    that.selectedItem();
                })
            },

            getXzqh(){
                let xzqh=this.$route.query.city;
                this.xzqhdm=this.sxCityObj[xzqh];
            },
            pdFilter_btn(){
                let str = this.$route.query.title;

                str = str.substring(0,1);
                // console.log(str);

                if(str == '全'){
                    this.$emit('filter_btn',true)
                }else{
                    this.$emit('filter_btn',false)
                }
            }
        },
        mounted() {
            // console.log(this.cityData);
            this.pdFilter_btn();
            this.getScale();
            this.setName();
            this.renderChart();
            // this.selectedItem();
        },
    }
</script>

<style scoped lang="scss">
    h3{
        height: 10%;
        text-align: center;
    }
    .chart-wrap{
        width: 100%;
        height: 100%;
    }
    .chartBox{
        height: 90%;
    }

    .l > div, .m > div, .r > div {
        width: 100%;
        align-content: space-between;
    }

    .chart {
        width: 100%;
        height: 100%;
    }
    .r {
        width: 72.6%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .r-t {
            width: 100%;
            height: 39%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .chartBox {
                width: 100%;
                height: 90%;
            }

            .r-t-l {
                width: 38%;
                height: 100%;
                background-image: url('../assets/images/index/l-t-bg1.png') ;
                background-repeat: no-repeat;
                background-size: 105% 105%;
                background-position: center;

            }

            .r-t-r {
                width: 60.52%;
                height: 100%;
                background-image: url('../assets/images/index/l-t-bg1.png') ;
                background-repeat: no-repeat;
                background-size: 105% 105%;
                background-position: center;
            }
        }

        .r-b {
            width: 100%;
            height: 57.78%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            background-image: url('../assets/images/index/l-t-bg1.png') ;
            background-repeat: no-repeat;
            background-size: 105% 105%;
            background-position: center;

            h3{
                height: 8%;
            }

            .selectListBox {
                width: 16%;
                height: 85%;
                float: left;
                margin-left: 1.2rem;
                margin-top: 0.5rem;
                position: relative;
                overflow: auto;
                &::-webkit-scrollbar {display:none}
                /* & { -ms-overflow-style: none; }
                & { overflow: -moz-scrollbars-none; }*/

                ul {
                    width: 100%;
                    height: auto;
                    background-image: url('../assets/images/type/bg.png') ;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    box-shadow:0 0 5px #011425;
                    li{
                        width: 100%;
                        height: 3rem;
                        div{
                            width: 100%;
                            height: 100%;
                            text-align: center;
                            line-height: 2;
                            cursor: pointer;
                            background-image: url('../assets/images/type/itemBg.png') ;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 1.17em;
                            letter-spacing: 1px;
                            &.active{
                                background: #4c7fff;
                            }
                        }
                    }
                }
            }

            .detail{
                width: 28rem;
                height: 85%;
                box-shadow: 0px 4px 24px 0px
                rgba(0, 130, 255, 0.75);
                border-radius: 2px;
                border: solid 1px #00baff;
                opacity: 0.75;
                float: left;
                margin-top: 0.5rem;
                position: relative;
                overflow: auto;
                &::-webkit-scrollbar {display:none}
                /* & { -ms-overflow-style: none; }
                 & { overflow: -moz-scrollbars-none; }*/
                ul{
                    width: 100%;
                    height: auto;
                    li{
                        width: 33.3%;
                        height: 4rem;
                        float: left;
                        border-right: solid 1px #00ffff;
                        border-bottom: solid 1px #00ffff;
                        &:nth-child(3n){
                            border-right: none;
                            width: 33.4%;
                        }
                        p{
                            width: 100%;
                            height: 50%;
                            text-align: center;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            &:first-child{
                                color: #5abcff;
                            }
                            &:nth-child(2){
                                color: #ffe754;
                            }
                        }
                    }
                }
            }

            .chart {
                width: 36.97%;
                height: 90%;
                float: right;
                margin-right: 1rem;
            }
        }
    }
</style>