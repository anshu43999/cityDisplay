<template>
    <div id="pjqflsjfx">
        <my-header :topTitle='topTitle'></my-header>
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
                        <my-map :typeAnalyze='typeAnalyze' @filter_btn='filter_btn'></my-map>
                    </div>
                </div>
            </div>

            <div class="r">
                <router-view ref="child" :typeAnalyze='typeAnalyze' @filter_btn='filter_btn' :is-click="isClick"></router-view>
            </div>
        </main>
    </div>
</template>

<script>
    import MyHeader from "../components/Header";
    import MyMap from "../components/Map";

    export default {
        name: "PJQFLSJFX",
        components: {
            MyMap, MyHeader
        },
        data() {
            return {
                // 标题
                topTitle : '山西省公安厅情报指挥中心警情分析统计系统',
                show: true,
                filterShow: true,
                //缩放值
                scale: 1,
                //筛选
                periodArr: ['今天', '昨天', '前天'],
                typeAnalyze: '111111',    //判断点击的类型
                filter_show: true,

                //筛选时间
                myPeriod:{},
                startDate:'',
                endDate:'',
            //    行政区划代码
                xzqhdm:'',
                cityPage:'',
                cityData:[],

                isClick:false
            }
        },
        methods: {
            //获取筛选日期
            getStorage() {
                switch(this.$route.query.title){
                    case '全省警情分类数据分析':
                        this.myPeriod = JSON.parse(sessionStorage.getItem('jqfl'));
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
                if (this.myPeriod.per==='today'){
                    item[0].classList.add('active');
                }else if (this.myPeriod.per==='yesterday'){
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
                    case "今天":
                        let date1 = new Date();
                        let start1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate().toString().padStart(2, '0');
                        this.myPeriod.per='today';
                        this.myPeriod.date=start1;
                        this.startDate=start1;
                        break;
                    case "昨天":
                        let timestamp = (new Date()).getTime();
                        let day = timestamp - 24 * 60 * 60 * 1000;
                        let date2 = new Date(day);
                        let start2 = date2.getFullYear().toString() + (date2.getMonth() + 1).toString().padStart(2, '0') + date2.getDate().toString().padStart(2, '0');
                        this.myPeriod.per='yesterday';
                        this.myPeriod.date=start2;
                        this.startDate=start2;
                        break;
                    case "前天":
                        let timestamp1 = (new Date()).getTime();
                        let day1 = timestamp1 -2* 24 * 60 * 60 * 1000;
                        let date3 = new Date(day1);
                        let start3 = date3.getFullYear().toString() + (date3.getMonth() + 1).toString().padStart(2, '0') + date3.getDate().toString().padStart(2, '0');

                        this.myPeriod.per='threeDaysAgo';
                        this.myPeriod.date=start3;
                        this.startDate=start3;
                        break;
                    default:
                        console.log('false');
                }
                sessionStorage.setItem('jqfl',JSON.stringify(this.myPeriod));
                this.isClick=true;
            },
            filter_btn(v) {
                // this.filter_show = false;
                // console.log(v);
                this.filter_show = v;
            },
        },
        mounted() {
            // console.log(this.$children);
            this.getStorage();
            this.selectedItem();
        },
        watch:{
            myPeriod:{//深度监听，可监听到对象、数组的变化
                handler(val, oldVal){
                    // console.log(val,oldVal);//但是这两个值打印出来却都是一样的
                    // console.log(val.per,oldVal.per);
                    // console.clear();
                    // console.log(this.$children[2]);
                    // console.log(val);
                    this.$children[2].renderChart()
                },
                deep:true
            }
        },
        created() {
            this.typeAnalyze = this.$route.query.title
        }
    }
</script>

<style scoped lang="scss">
    //样式里的l, m, r, t, b分别代表左，中，右，上，下
    //布局
    #pjqflsjfx {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // justify-content: space-around;

        // main{
        //     padding:0 2rem 4rem;
        // }
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
            width: 18rem;
            height: 2rem;
            /*background: url("../assets/images/province/filterBg.png");*/
            /*background-repeat: no-repeat;*/
            /*background-size: 100% 100%;*/
            float: right;
            position: relative;
            top: 24%;
            bottom: 0;
            margin: auto;
            right: 0;

            .filterItem {
                /*width: 13.8rem;*/
                /*height: 1.4rem;*/
                width: 100%;
                height: 100%;
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
                        /*width: 167%;
                        height: 167%;*/
                        width: 100%;
                        height: 100%;
                        background: url("../assets/images/province/filterItemBg.png");
                        /*transform: scale(0.6);*/
                        /*transform-origin: left top;*/
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        font-size: 1.2rem;
                        letter-spacing: 2px;

                        &.active {
                            background-image: linear-gradient(86deg,
                                    #53b0ff 0%,
                                    #0b5fa7 100%);
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }

    main {
        display: flex;
        flex: 1;
        padding: 0 2rem 2rem;
        flex-direction: row;
        justify-content: space-between;

        h3 {
            height: 10%;
            text-align: center;
        }

        .chartBox {
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

        .l {
            width: 25.73%;
            height: 100%;
            background-image: url('../assets/images/index/m.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;

            .chart {
                width: 100%;
                height: 100%;
            }

            .chartBox {
                width: 100%;
                height: 100%;
            }
        }

        .chart-wrap {
            // border: .0625rem solid rgba(76, 180, 231, 0.33);
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
                height: 38.58%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .chartBox {
                    width: 100%;
                    height: 90%;
                }

                .r-t-l {
                    width: 37.26%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;


                }

                .r-t-r {
                    width: 60.52%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
            }

            .r-b {
                width: 100%;
                height: 57.78%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                background-image: url('../assets/images/index/l-t-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;

                .selectListBox {
                    width: 12.14%;
                    height: 100%;
                    float: left;

                    ul {
                        width: 100%;
                        height: 21.67rem;
                        margin-top: 1.44rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background-image: url('../assets/images/type/bg.png');
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        box-shadow: 0 0 5px #011425;

                        li {
                            width: 100%;
                            height: 5.85%;
                            background-image: url('../assets/images/type/itemBg.png');

                            div {
                                width: 166%;
                                height: 167%;
                                transform: scale(0.6);
                                transform-origin: left top;
                                text-align: center;
                                line-height: 2;
                                cursor: pointer;

                                &.active {
                                    background: #4c7fff;
                                }
                            }
                        }
                    }
                }

                .chart {
                    width: 36.97%;
                    height: 80%;
                    float: left;
                    margin-left: 1.01rem;
                    margin-top: 2rem;
                }

                .chart:nth-child(3) {
                    float: left;
                    width: 32.77rem;
                    margin-right: 3rem;
                }
            }
        }
    }
</style>