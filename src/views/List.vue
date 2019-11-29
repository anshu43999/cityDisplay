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
                    <span>{{this.$route.query.type}}</span>
                </div>

                <!--                                            内容-->
                <div class="chartBox">
                    <div class="t">
                        <ul @click="select">
                            <li v-for="item in navList">{{item}}</li>
                        </ul>
                    </div>
                    <div class="b">
                        <div class="caseWarp">
                            <ul>
                                <li v-for="item in caseList">
                                    <div class="b-l">
                                        <img src="../assets/images/index/caseIcon.png">
                                        <p>{{item.cameName}}</p>
                                    </div>
                                    <div class="b-r">
                                        <p>{{item.time}}</p>
                                    </div>
                                </li>
                            </ul>
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
        name: "List",
        components: {MyHeader},
        data(){
            return {
                navList:['危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全',
                    '危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全','危害国家安全',
                    '危害国家安全','危害国家安全'],
                caseList:[],
                caseListLength:7,
                ularr:[],
            }
        },
        methods:{
            select(e){
                let li=document.querySelectorAll('.t>ul>li');
                li.forEach(value => {
                    value.classList.remove('active');
                });
                e.target.classList.add('active');
            },
            dueCaseList(){
                let caseArr=[{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                },{
                    cameName:'案件1',
                    time:'2019.10.15  10：35：26'
                }];
                console.log(caseArr.slice(0, 10));
                this.caseList=caseArr.slice(0, 10);
            },
            //    返回
            back(){
                this.$router.go(-1);
            }
        },
        mounted() {
            this.dueCaseList();
        }
    }
</script>

<style scoped lang="scss">
    .back{
        position: fixed;
        left: 2%;
        top: 8%;
        z-index: 10;
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
                height: calc(100% - 4.8rem);
                .t{
                    width: 100%;
                    height: 13%;
                    background-image: url("../assets/images/index/nav.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    margin: 1% 0;
                    ul{
                        width: 100%;
                        height: 100%;
                        padding: 0.5% 0;
                        li{
                            float: left;
                            width: 9%;
                            height: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            letter-spacing: 2px;
                            &.active{
                                color: #00f1e3;
                                font-size: 1.25rem;
                            }
                        }
                    }
                }
                .b{
                    width: 100%;
                    height: 84%;
                    background-image: url("../assets/images/index/proportionBg.png");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    padding: 1.5% 1%;
                    box-sizing: border-box;
                    .caseWarp{
                        width: 100%;
                        height: 100%;
                        position: relative;
                        ul{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            li{
                                width: 100%;
                                height: 6.2%;
                                margin: 0.7% 0;
                                padding: 0 1rem;
                                box-sizing: border-box;
                                float: left;
                                cursor: pointer;
                                .b-l{
                                    float: left;
                                    width: 80%;
                                    height: 100%;
                                    img{
                                        float: left;
                                    }
                                    p{
                                        font-size: 1rem;
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        margin-left: 3.2rem;
                                    }
                                }
                                .b-r{
                                    float: right;
                                    width: 20%;
                                    height: 100%;
                                    p{
                                        font-size: 1.1rem;
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        color: #05ede0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
