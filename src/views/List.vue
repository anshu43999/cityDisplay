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
                            <li v-for="(item,index) in navList"    :key="index"  :class="index ==actived ? 'active' : ''" >{{item}}</li>
                        </ul>
                    </div>
                    <div class="b"  v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
                        <div class="caseWarp">
                            <ul @click='checked1'>
                                <li v-for="(item,index) in caseList" :class="item.jjdbh" :data-id="item['jjdbh']" :key="index" @click="checked2(item['jjdbh'])">
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
                navList:[],  //tab 栏
                caseList:[],
                caseListLength:7,
                ularr:[],
                getDataUrl : this.apiRoot + 'JJDB/findJQLXDMaj',
                loading: true,
                dictionaries :{},   // 字典
                actived : '',
            }
        },
        methods:{
            select(e){

                let index = this.navList.indexOf(e.target.innerHTML);
                console.log(index);
                this.actived = index;
                this.getData( this.dictionaries[e.target.innerHTML]    );
            },

            //    返回
            back(){
                this.$router.go(-1);
            },
            getData(checkedDM){
                this.loading = true;
                let sessionStorage = window.sessionStorage;
                let xzqhdm = sessionStorage.getItem('myArea');
                console.log(typeof(xzqhdm)    );
                let str = Number(xzqhdm)
                console.log(str);
                let timestamp = (new Date()).getTime();
                // let day1 = timestamp;
                let date1 = new Date(timestamp);
                let start1 = date1.getFullYear().toString() + '-' + (date1.getMonth() + 1).toString().padStart(2, '0') + '-'  + date1.getDate().toString().padStart(2, '0');
                console.log(start1)

                let dm = this.dictionaries[this.$route.query.type];
                console.log(dm)

                // return
                this.$http.get(this.getDataUrl,{
                    params : {
                        jqlxdm : checkedDM||dm,
                        tjTime :start1,
                        xzqhdm :JSON.parse(sessionStorage.getItem('myArea')),
                    }
                })
                .then(function (res) {
                    console.log(res['data']);
                    this.caseList = [];
                    this.loading = false;
                    res['data'].forEach( (item,index)=>{

                        this.caseList.push({
                            cameName:item['bjnr'],
                            time:item['bjsj'],
                            jjdbh : item['jjdbh'],

                        })

                    })
                    // let caseArr
                    // this.caseList.pu


                }.bind(this))
            },
            checked1(e){
                // console.log(e['path'][2]['className'])
            },

            checked2(e){
                // console.log(e);
                this.$router.push({ name : '案件详情',query : {dm : e} })
            }

        },
        mounted() {
            // this.dueCaseList();
            let str = JSON.parse(this.$route.query.code);
            this.dictionaries = str;
            this.navList = Object.keys(this.dictionaries);
            let type = this.$route.query.type;
            let index = this.navList.indexOf(type);
            console.log(index);
            this.actived = index;



            this.getData();

        }
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
                                margin: 0.5% 0;
                                padding: 0 1rem;
                                box-sizing: border-box;
                                float: left;
                                cursor: pointer;
                                .b-l{
                                    float: left;
                                    width: 80%;
                                    height: 100%;
                                    display: flex;
                                    img{
                                        // float: left;
                                        width: 2.8rem;
                                        height: 2.8rem;
                                    }
                                    p{
                                        flex: 1;
                                        font-size: 1rem;
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        margin-left: 3.2rem;
                                        overflow: hidden;
                                        white-space: nowrap;
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
