<template>
    <div id="linkBar">
        <div id="setting">
            <!--        设置-->
            <div class="b">
                <ul class="b-l" @click="changeOption">
                    <li v-for="item in links" :key="item">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="l" @click="linkSlide">
            <i class="iconfont iconqiehuan"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Link",
        data(){
            return {
                links:['警情详情','受立案统计']
            }
        },
        methods:{
            linkSlide(){
                let setting=document.getElementById('linkBar');
                // console.log(setting);
                let icon=document.querySelector('#linkBar>.l');
                this.click=!this.click;

                if (this.click===true){
                    setting.style.transform='translate(11.67rem)';
                    icon.innerHTML='<i class="iconfont iconxiangzuo1"></i>'
                }else {
                    setting.style.transform='translate(0rem)';
                    icon.innerHTML='<i class="iconfont iconqiehuan"></i>'
                }
            },
            changeOption(e) {
                console.log(e.target.innerText);
                switch (e.target.innerText) {
                    case '警情详情':
                            // this.$router.push({path : '10.94.7.4' })
                            // window.location.href = 'http://10.94.7.4'
                            window.open('http://10.94.7.4', '_blank');
                        break;
                    case '受立案统计':
                            this.$router.push({path : 'handling'})
                        break;
                    default:
                        break;
                }

            },
        }
    }
</script>

<style scoped lang="scss">
    #linkBar {
        width: 13.27rem;
        height: 9.2rem;
        position: fixed;
        left: -11.67rem;
        top: 1%;
        z-index: 999999999;
        transition: all 1s;
        .l{
            width: 1.6rem;
            height: 6rem;
            float: left;
            background: url("../assets/images/setting/r.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            line-height: 6rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .iconfont{
                font-size: 1rem;
                color: white;
            }
        }


        #setting {
            width: 11.67rem;
            float: left;
            z-index: 999999999;
            overflow: hidden;

            /*    设置*/
            .b {
                width: 100%;
                height: 9.2rem;
                background-image: linear-gradient(180deg,
                        #0761af,
                        #004a8f);
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .b-l {
                    width: 100%;
                    height: 100%;
                    background-image: linear-gradient(180deg,
                            #0761af 15%,
                            #004a8f 100%);
                    box-shadow: 0 0 1.2rem rgba(27, 123, 155, 0.5);
                    float: left;

                    li {
                        width: 89.9%;
                        height: 3.2rem;
                        margin-top: 8%;
                        background-image: linear-gradient(86deg,
                                #0860ab 0%,
                                #1bcfca 100%);
                        box-shadow: 0 0 8px #1b7bff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        letter-spacing: 1px;
                        cursor: pointer;
						font-size: 1.1rem;

                        &.active {
                            background-image: linear-gradient(86deg,
                                    #0860ab 0%,
                                    #1bcfca 100%);
                            box-shadow: 0 0 8px #1b7bff;
                        }
                    }
                }
            }
        }
    }
</style>