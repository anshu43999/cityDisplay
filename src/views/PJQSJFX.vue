<template>
    <div id="pjqsjfx">
        <my-header></my-header>
        <div class="headerBox">
            <h3 id="back" @click="goBack">返回</h3>
            <div class="filter" v-show="filter_show">

                <ul class="filterItem" @click="selectItem">
                    <li v-for="item in periodArr" :key="item">
                        <div>{{item}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <main>
            <!--样式里的l,m,r,t,b分别代表左，中，右，上，下-->
            <div class="l">
                <div class="chart-wrap">
                    <div class="chartBox">
                        <!-- <keep-alive> -->
                        <my-map :typeAnalyze='typeAnalyze' @filter_btn='filter_btn'></my-map>
                        <!-- </keep-alive> -->
                    </div>
                </div>
            </div>
            <div class="r">

                <router-view  :typeAnalyze='typeAnalyze'  ref="getMethods"   @filter_btn='filter_btn'></router-view>


            </div>
        </main>


    </div>
</template>

<script>
    import MyHeader from "../components/Header";
    import MyMap from "../components/Map";

    export default {
        name: "PJQSJFX",
        components: {MyHeader, MyMap},
        data() {
            return {
                show: true,
                filterShow: true,
                //缩放值
                scale: 1,
                //筛选
                periodArr: ['近7日', '上周', '上上周'],
                typeAnalyze: '111111',    //判断点击的类型
                filter_show: true,

                //筛选时间
                myPeriod:{},
                pageName:'',
                startDate:'',
                endDate:'',
                findUrl : [
                    'recJJLXTJB/findSAlarmData',   //省 近七日接警类型数据分析
                ],
                tableData :'',

            }
        },
        methods: {
            //获取筛选日期
            getStorage() {
                switch(this.$route.query.title){
                    case '全省接警类型数据分析':
                        this.myPeriod = JSON.parse(sessionStorage.getItem('jjlx'));
                        this.pageName='jjlx';
                        this.startDate=this.myPeriod.start;
                        this.endDate=this.myPeriod.end;
                        break;
                    case '全省报警方式数据分析':
                        this.myPeriod = JSON.parse(sessionStorage.getItem('bjfs'));
                        this.pageName='bjfs';
                        this.startDate=this.myPeriod.start;
                        this.endDate=this.myPeriod.end;
                        break;
                    case '全省来话类型数据分析':
                        this.myPeriod = JSON.parse(sessionStorage.getItem('lhlx'));
                        this.pageName='lhlx';
                        this.startDate=this.myPeriod.start;
                        this.endDate=this.myPeriod.end;
                        break;
                    default:
                        console.log('false');
                }
            },
            //返回
            goBack() {
                this.$router.push('/index/home');
            },
            //筛选选中项
            selectedItem() {
                let item = document.querySelectorAll('.filter>.filterItem>li>div');
                if (this.myPeriod.per==='week'){
                    item[0].classList.add('active');
                }else if (this.myPeriod.per==='lastWeek'){
                    item[1].classList.add('active');
                }else {
                    item[2].classList.add('active');
                }
            },
            // 筛选点击
            selectItem(e) {
                let item = document.querySelectorAll('.filter>.filterItem>li>div');
                item.forEach((value) => {
                    value.classList.remove('active');
                });
                e.target.classList.add('active');
                switch (e.target.innerText) {
                    case "近7日":
                        let date1 = new Date();
                        let end1 = date1.getFullYear().toString() + ((date1.getMonth() + 1).toString()).padStart(2,0) +(date1.getDate().toString()).padStart(2,0);
                        let timestamp = (new Date()).getTime();
                        let day = timestamp - 6 * 24 * 60 * 60 * 1000;
                        let date2 = new Date(day);
                        let start1 = date2.getFullYear().toString() + ((date2.getMonth() + 1).toString()).padStart(2,0) + (date2.getDate().toString()).padStart(2,0);
                        this.myPeriod.per='week';
                        this.myPeriod.start=start1;
                        this.myPeriod.end=end1;
                        this.startDate=start1;
                        this.endDate=end1;

                        // this.getShen(start1,end1)
                        break;
                    case "上周":
                        let d = new Date();
                    // set to Monday of this week
                        d.setDate(d.getDate() - (d.getDay() + 6) % 7);
// set to previous Monday
                        let date3 = new Date(d.setDate(d.getDate() - 7));
                        let Monday = date3.getFullYear().toString() + ((date3.getMonth() + 1).toString()).padStart(2,0) + (date3.getDate().toString()).padStart(2,0);
// create new date of day before
                        let date4 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 6);
                        let Sunday = date4.getFullYear().toString() + ((date4.getMonth() + 1).toString()).padStart(2,0) + (date4.getDate().toString()).padStart(2,0);
                        this.myPeriod.per='lastWeek';
                        this.myPeriod.start=Monday;
                        this.myPeriod.end=Sunday;
                        this.startDate=Monday;
                        this.endDate=Sunday;

                        // this.getShen(Monday,Sunday)
                    break;
                    case "上上周":
                        let dt = new Date();
                    // set to Monday of this week
                        dt.setDate(dt.getDate() - (dt.getDay() + 6) % 7);
                        // set to previous Monday
                        let date5 = new Date(dt.setDate(dt.getDate() - 14));

                        let beforeMonday = date5.getFullYear().toString() + ((date5.getMonth() + 1).toString()).padStart(2,0) + (date5.getDate().toString()).padStart(2,0);
                    // create new date of day before
                        let date6 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 6);
                        let beforeSunday = date6.getFullYear().toString() + ((date6.getMonth() + 1).toString()).padStart(2,0) + (date6.getDate().toString()).padStart(2,0);

                        
                        this.myPeriod.per='halfYear';
                        this.myPeriod.start=beforeMonday;
                        this.myPeriod.end=beforeSunday;
                        this.startDate=beforeMonday;
                        this.endDate=beforeSunday;



                        // this.getShen(beforeMonday,beforeSunday)
                        break;
                    default:
                        console.log('false');
                }
                // console.log('开始报尺寸');
                sessionStorage.setItem(this.pageName,JSON.stringify(this.myPeriod));
                this.getShen()
            },
            filter_btn(v) {
                // this.filter_show = false;
                // console.log(v);
                this.filter_show = v;
            },

            // 省
            getShen(start,endTime){
               
                this.$refs.getMethods.getShen()
            }
        },
        mounted() {
            this.getStorage();
            this.selectedItem();
            // this.getShen();
        },
        created() {
            this.typeAnalyze = this.$route.query.title
        },
        watch:{
            myPeriod:{//深度监听，可监听到对象、数组的变化
                handler(val, oldVal){
                    // console.log(val,oldVal);//但是这两个值打印出来却都是一样的
                    // console.log(val.per,oldVal.per);
                    this.$children[2].renderChart();
                },
                deep:true
            }
        },
        
    }
</script>

<style scoped lang="scss">
    //样式里的l, m, r, t, b分别代表左，中，右，上，下
    //布局
    #pjqsjfx {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        main {
            padding: 0 2rem 2rem;
        }
    }

    .headerBox {
        width: 100%;
        position: relative;
        margin-top: -3rem;
        height: 4rem;
        padding: 0 2rem;
        margin-bottom: 0.7rem;

        #back {
            color: #17fff3;
            cursor: pointer;
            float: left;
            line-height: 4rem;
        }

        .filter {
            width: 16rem;
            height: 4rem;
            background: url("../assets/images/province/filterBg.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            float: right;
            position: relative;

            .filterItem {
                width: 13.8rem;
                height: 1.4rem;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                display: flex;
                flex-direction: row;
                align-content: space-between;

                li {
                    width: 33.33%;

                    div {
                        width: 167%;
                        height: 167%;
                        background: url("../assets/images/province/filterItemBg.png");
                        transform: scale(0.6);
                        transform-origin: left top;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;

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
        flex: 1;

        .l > div, .m > div, .r > div {
            width: 100%;
            align-content: space-between;
        }

        .l {
            width: 25.73%;
            height: 100%;
            // background-image: url('../assets/images/index/m.png');
            background-image: url('../assets/images/index/m1.png');


            background-repeat: no-repeat;
            background-size: 100% 100%;

            .chartBox {
                width: 100%;
                height: 100%;
            }

            .chart {
                width: 100%;
                height: 100%;
            }

        }
        .chart-wrap {
            // border: .0625rem solid rgba(76, 180, 231, 0.33);
            width: 100%;
            height: 100%;
        }
        .chart {
            width: 100%;
            height: 100%;
        }
        .r {
            width: 72.6%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
</style>