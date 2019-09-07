<template>
    <div id="map" class="chart"></div>
</template>

<script>
    export default {
        props : ['typeAnalyze'],
        name: "Map",
        data(){
           return {
               chartsObj:{},
               type:'',
               newStr : '',
               flag : false,   //判断省市
			   scale:1
           }
        },
        methods:{
			//获取缩放比例
			getScale() {
			    this.scale = localStorage.getItem('scale');
			},
            //地图
            mapChart() {
                let cityObj = {};
                let that = this;
                let myChart = that.$echarts.init(document.getElementById('map'));//初始化
                this.chartsObj.mapChart = myChart;
                let mapdata = [];
                //初显示


                let refresh = this.$route.query.title.substring(0,1);
                // console.log(refresh);

                let Session = window.sessionStorage;
                let num = Session.getItem('city')
                // Session.getItem('city')  ==1;


                if(refresh == '市' && num == 1 ){
                    let Session = window.sessionStorage;
                    // Session.setItem('city',0)
                    // console.log('市刷新');
                    let city = that.$route.query.city;
                    let sxCityObj = {
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
                    }
                    // that.$http.get('/static/json/' +sxCityObj[city] + '_full.json').then(res => {

                    that.$http.get(that.apiRoot + 'dictBJFSDMB/getAll' ,{params : {json :sxCityObj[city]+'_full' }} ).then(res => {
                    
                        if (res.status === 200) {
                            let d = [];
                            that.$echarts.registerMap(city, res.data);
                            //插入获取数据
                            for (let i = 0; i < res.data.features.length; i++) {
                                d.push({
                                    name: res.data.features[i].properties.name,
                                })
                            }
                            // console.log(d);

                            that.flag = true;
                            
                            // console.log(that.newStr)
                            // console.log('这是鬼畜的原因')
                            let str =  '市'+that.newStr;
                            // console.log(str);
                            // that.$router.push({name:str,query:{title:str,city:city}});
                            renderMap(city, d);
                            
                        }
                    });

                }else if(refresh == '全'){
                    // console.log('省刷新');
                    Session.setItem('city',1)   // 进入省   city 标识设置为1
                    // this.$http.get('static/json/140000_full.json').then(res => {
                    this.$http.get(that.apiRoot +'dictBJFSDMB/getAll',{ params : {json : '140000_full'} }).then(res => {

                        if (res.status === 200) {
                            let d = [];
                            for (let i = 0; i < res.data.features.length; i++) {
                                d.push({
                                    name: res.data.features[i].properties.name,
                                });
                                cityObj[res.data.features[i].properties.name] = res.data.features[i].properties.adcode;
                            }
                            // console.log(cityObj)
                            // console.log( d)

                            mapdata = d;
                            // 注册地图
                            that.$echarts.registerMap('山西省', res.data);
                            // 绘制地图
                            renderMap('山西省', d);
                        }
                    });
                }


                
                //点击地图    点击时触发
                myChart.on('click', function (params) {
                    // console.log('执行');
                    // console.log('click')
                    // console.log(params.data);
                    // console.log(that.flag);
                    // console.log(cityObj[params.name]);
                    that.xzqhdm=cityObj[params.name];

                    if(that.flag){     //
                        // console.log('全省');
                        that.flag = false;
                        // console.log(mapdata);


                        if(mapdata[0]){
                            // console.log('有数据');

                            renderMap('山西省', mapdata);
                            // console.log(that.newStr)
                            let str =  '省'+that.newStr;
                                    console.log(str);
                            let str1 = '全省'+that.newStr;
                            // console.log(str);
                            that.$router.push({name:str,query:{title:str1}});
                        }else{
                            // console.log('无数据');

                            that.$http.get(that.apiRoot +'dictBJFSDMB/getAll',{ params : {json : '140000_full'} }).then(res => {
                                if (res.status === 200) {
                                    let d = [];
                                    for (let i = 0; i < res.data.features.length; i++) {
                                        d.push({
                                            name: res.data.features[i].properties.name,
                                        });
                                        cityObj[res.data.features[i].properties.name] = res.data.features[i].properties.adcode;
                                    }
                                    // console.log(cityObj)
                                    // console.log( d)

                                    mapdata = d;
                                    // 注册地图
                                    that.$echarts.registerMap('山西省', res.data);
                                    // 绘制地图
                                    renderMap('山西省', d);

                                     let str =  '省'+that.newStr;
                                            console.log(str);
                                    let str1 = '全省'+that.newStr;
                                    that.$router.push({name:str,query:{title:str1}});
                                }
                            });

                        }
                        // console.log(mapdata);





                        

                        // console.log('开始渲染全省地图');
                        
                    }else if(params.name in cityObj) {
                        // 如果点击的是11个市，绘制选中地区的二级地图
                        // console.log(params.name);
                        // console.log(cityObj[params])
                        // console.log(cityObj[params.name]);

                        // that.$http.get('/static/json/' + cityObj[params.name] + '_full.json').then(res => {
                        that.$http.get(that.apiRoot + 'dictBJFSDMB/getAll' ,{params : {json :cityObj[params.name]+'_full' }} ).then(res => {

                        
                        


                            if (res.status === 200) {
                                let d = [];
                                that.$echarts.registerMap(params.name, res.data);
                                //插入获取数据
                                for (let i = 0; i < res.data.features.length; i++) {
                                    d.push({
                                        name: res.data.features[i].properties.name,
                                    })
                                }
                                console.log(d);
                                that.flag = true;
                                // console.log('这是鬼畜的原因')
                                let str =  '市'+that.newStr;
                                that.$router.push({name:str,query:{title:str,city:params.name}});
                                // console.log(params.name)
                                renderMap(params.name, d);

                            }
                        });
                    } else {
                        
                    }
                });
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
                    option.series = [
                        {
                            map: map,
                            type: 'map',
                            mapType: map,
                            roam: false,
                            zoom: 1.1,   //这里是关键，一定要放在 series中
                            data: data,
                            nameMap: {
                                '山西省': '山西省'
                            },
                            label: {
                                normal: {
                                    show: true,
									fontSize:20*that.scale,
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: '#243cce',
                                    borderColor: '#122496',
                                    borderWidth: 1,
                                    label: {
                                        show: true,
                                        color: '#ffe754',
                                    },
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        color: '#ffe754'
                                    },
                                    areaColor: '#2049ff',
                                }
                            },
                        },
                    ];
// 渲染地图
                    myChart.setOption(option);
                }
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
            clearInterval(counter);
            counter = null;
			this.getScale();
            this.pdFilter_btn();
            let that=this;
            let Index = {
                init() {
                    this.loadData();
                    Public.chartsResize(that.chartsObj);
                    Public.chartsReDraw(that.chartsObj, null, [
                    ], [],this.loadData)
                },
                loadData() {
                    that.mapChart();
                },
            };
            Index.init();
            // console.log(this.typeAnalyze);
            // this.typeAnalyze.slice(0,1);
            // this.newStr  = this.typeAnalyze.substring(2);
            // console.log(newStr);
            // this.newStr
            
            // console.log(this.$route.path);

        },
        created(){
            if(this.typeAnalyze){
                
                // console.log(this.newStr);
                // console.log(this.typeAnalyze);
                let shou = this.typeAnalyze.substring(0,1);
                // console.log(shou);
                if(shou == '市'){
                    this.newStr  = this.typeAnalyze.substring(1);

                }else{
                    this.newStr  = this.typeAnalyze.substring(2);
                }

            }
            // console.log(this.newStr);
            // this.newStr 
            // console.log(this.$route.query.title);




            

        },
        updated(){
            // console.log('updated');
        }
    }
</script>

<style scoped lang="scss">
    .chart{
        width: 100%;
        height: 100%;
    }
</style>