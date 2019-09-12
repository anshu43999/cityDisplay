<template>
    <div>
        <div id="setting" style="right: -34.71rem;">
<!--        <div id="setting" style="right: 0;">-->
            <!--        顶部-->
            <div class="t">
                <div class="avatar">
                    <img src="../assets/images/setting/avatar.png" alt="">
                </div>
                <p class="admin">{{admin}}</p>
                <div class="exit" @click="exit">
                    <i class="iconfont iconexit"></i>
                </div>
            </div>
            <!--        设置-->
            <div class="b" v-if="this.$route.name==='首页'">
                <ul class="b-l" @click="changeOption">
                    <li v-for="item in settings" :key="item">
                        <!--                    <div>{{item}}</div>-->
                        {{item}}
                    </li>
                </ul>
                <div class="b-r" v-if="settingsOption==='distribute'">
                    <div class="settingBox" v-if="model==='display'">
                        <ul>
                            <li v-for="item in grading" :key="item.gradedm">
                                <div class="b-r-l">
                                    <!--                                <p>-->
                                    警情{{item.categories}}
                                    <!--                                </p>-->
                                </div>
                                <div class="b-r-r">
                                    {{item.proportion}}%
                                    <!--                                <div class="value">{{item.value}}%</div>-->
                                </div>
                            </li>
                        </ul>
                        <div class="edit btn" @click="edit">
                            <!--                        <div>编辑</div>-->
                            编辑
                        </div>
                    </div>
                    <div class="settingBox" v-if="model==='edit'">
                        <ul>
                            <li v-for="item in grading" :key="item.gradedm">
                                <div class="b-r-l">
                                    <!--                                <p>-->
                                    警情{{item.categories}}
                                    <!--                                </p>-->
                                </div>
                                <div class="b-r-r">
                                    <div class="inputBox" @click="changeValue">
                                        <input class="input grade" type="number" placeholder="%" v-model="item.proportion" :data-id='item.gradedm'>
                                        <div class="dec" :data-id='item.gradedm'>-</div>
                                        <div class="add" :data-id='item.gradedm'>+</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="saveGrade btn" @click="saveGrade">
                            确定
                        </div>
                        <div class="cancel btn" @click="cancel">
                            取消
                        </div>
                    </div>
                </div>
                <div class="b-r" v-if="settingsOption==='peak'">
                    <div class="settingBox1" v-if="model==='display'">
                        <ul>
                            <li v-for="item in peak" :key="item.xzqhdm">
                                <div class="b-r-l">
                                    {{item.xzqhmc}}
                                </div>
                                <div class="b-r-r">
                                    {{item.jjslsx}}
                                </div>
                            </li>
                        </ul>
                        <div class="edit btn" @click="edit">
                            <!--                        <div>编辑</div>-->
                            编辑
                        </div>
                    </div>
                    <div class="settingBox1" v-if="model==='edit'">
                        <ul>
                            <li v-for="item in peak" :key="item.xzqhdm">
                                <div class="b-r-l">
                                    {{item.xzqhmc}}
                                </div>
                                <div class="b-r-r">
                                    <div class="inputBox">
                                        <input class="input city" type="number" v-model="item.jjslsx" :data-id='item.xzqhdm'>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="saveGrade btn" @click="savePeak">
                            确定
                        </div>
                        <div class="cancel btn" @click="cancel">
                            取消
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='bar'></div>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        data() {
            return {
                admin: 'admin',
                settings: ['警情分布占比设置', '各市警情峰值设置'],
                model: 'display',
                settingsOption: 'distribute'
            }
        },
        props:['mapSource','grading','peak'],

        methods: {
            edit() {
                this.model = 'edit'
            },
            saveGrade() {
                // localStorage.setItem('grading',JSON.stringify(this.grading));
                this.grading.map(item=>{
                    delete item.categories;
                    return item;
                });
                let data =this.grading;
                this.$http.post(`${this.apiRoot}/redGrade/alterGrade`,data)
                    .then(res=>{
                        console.log('res=>',res);
						this.$parent.getGrading();
						this.model = 'display';
                    });
            },
            cancel() {
                this.model = 'display';
            },
            changeValue(e) {
                console.log(e.target);
                let gradedm = e.target.getAttribute('data-id');
                if (e.target.getAttribute('class') === 'dec') {
                    // this.distribute.forEach(value => {
                    this.grading.forEach(value => {
                        if (value.gradedm == gradedm) {
                            e.target.parentNode.childNodes[0].value>0?e.target.parentNode.childNodes[0].value--:e.target.parentNode.childNodes[0].value=0;
                            value.proportion = e.target.parentNode.childNodes[0].value;
                            console.log(value.value);
                        }
                    })
                }else if (e.target.getAttribute('class')==='add'){
                    // this.distribute.forEach(value => {
                    this.grading.forEach(value => {
                        if (value.gradedm == gradedm) {
                            e.target.parentNode.childNodes[0].value++;
                            value.proportion = e.target.parentNode.childNodes[0].value;
                            // console.log(value.value);
                        }
                    })
                }
            },
            addActive() {
                let options = document.querySelectorAll('.b-l>li');
                options[0].classList.add('active');
            },
            changeOption(e) {
                let options = document.querySelectorAll('.b-l>li');
                options.forEach(value => {
                    value.classList.remove('active');
                });
                e.target.classList.add('active');
                // console.log();
                if (e.target.innerText === '警情分布占比设置') {
                    this.settingsOption = 'distribute';
                } else {
                    this.settingsOption = 'peak';
                }
            },
            savePeak(){
                let data =this.peak;
                this.$http.post(`${this.apiRoot}/dictXZQHB/updateXZQH`,data)
                    .then(res=>{
                        console.log('res=>',res);
						this.$parent.getPeak();
						this.model = 'display';
                    });
            },
            exit(){
                sessionStorage.removeItem('user');
                this.$router.push('/');
            }
        },
        mounted() {
            // console.log(this.peak);
            this.addActive();
            // this.getGrade();
            let bar=document.querySelector('#bar');
            let setting=document.querySelector('#setting');
            let right=parseInt(setting.style.right);
            let slide='';
            bar.onmouseenter=function () {
				clearInterval(slide);
                slide=setInterval(function(){
                    if(right<=0){
						// console.log('start');
                        right++;
                        setting.style.right=right+'rem';
                    }else {
                        clearInterval(slide);
                    }
                },10);
            };
            setting.onmouseleave=function () {
                clearInterval(slide);
                slide=setInterval(function(){
                    if(right>-34.71){
						// console.log('end');
                        right--;
                        setting.style.right=right+'rem';
                    }else {
                        clearInterval(slide);
                    }
                },10);
            };
        }
    }
</script>

<style scoped lang="scss">
    $btn1: #5ea2f5;
    $btn2: #3d8bea;
    $btn3: #2a5cc0;
    $btn4: #0f07b0;
    $btn5: #060086;

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
    #bar{
        width: 0.5rem;
        height: 5rem;
        background: rgba(28, 97, 157, 0.75);
        position: fixed;
        right: 0;
        top: 0;
        z-index: 999;
        border-radius: 0.5rem;
    }
    #setting {
        width: 34.71rem;
        position: fixed;
        top: 0;
        z-index: 999999999;
        overflow: hidden;

        /*顶部*/
        .t {
            width: 100%;
            height: 5rem;
            background-image: linear-gradient(-90deg,
                    #0761af,
                    #004a8f);
            border-style: solid;
            border-width: 1px;
            border-image-source: linear-gradient(-83deg,
                    #00a8ff 40%,
                    rgba(0, 168, 255, 0.99) 40%,
                    #0d4c82 100%);
            border-image-slice: 1;
            padding: 0 1rem;
            box-sizing: border-box;

            .avatar {
                width: 7.7%;
                height: 100%;
                float: left;
                position: relative;

                img {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                }
            }

            .admin {
                display: flex;
                align-items: center;
                justify-content: center;
                float: left;
                height: 100%;
                margin-left: 1.22rem;
                font-size: 1.5rem;
            }

            .exit {
                cursor: pointer;
                float: right;
                width: 7.7%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-shadow: 0 0 6px #ffffff;

                .iconfont {
                    font-size: 3rem;
                }
            }
        }

        /*    设置*/
        .b {
            margin-top: 1rem;
            width: 100%;
            height: 26.92rem;
            background-image: linear-gradient(180deg,
                    #0761af,
                    #004a8f);
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .b-l {
                width: 33.6%;
                height: 100%;
                background-image: linear-gradient(180deg,
                        #0761af 15%,
                        #004a8f 100%);
                box-shadow: 0 0 1.2rem rgba(27,123,155,0.5);
                float: left;

                li {
                    width: 89.9%;
                    height: 13.6%;
                    margin-top: 8%;
                    background-image: linear-gradient(-90deg,
                            #0761af 0%,
                            rgba(28, 97, 157, 0.65) 30%,
                            rgba(49, 97, 138, 0.31) 59%,
                            rgba(48, 96, 137, 0.3) 60%,
                            rgba(32, 80, 122, 0.15) 80%,
                            #0f3e6a 100%);
                    border-style: solid;
                    border-width: 1px;
                    border-image-source: linear-gradient(-83deg,
                            #00a8ff 40%,
                            rgba(0, 168, 255, 0.99) 40%,
                            #0d4c82 100%);
                    border-image-slice: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    letter-spacing: 1px;
                    cursor: pointer;

                    &.active {
                        background-image: linear-gradient(86deg,
                                #0860ab 0%,
                                #1bcfca 100%);
                        box-shadow: 0 0 8px #1b7bff;
                    }
                }
            }

            .b-r {
                width: 66.4%;
                height: 100%;
                position: relative;

                .settingBox {
                    width: 72.9%;
                    height: 82.2%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    margin: auto;

                    ul {
                        width: 100%;
                        height: 84.93%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-bottom: 1.2rem;

                        li {
                            width: 100%;
                            height: 19.51%;
                            background-image: url("../assets/images/setting/item.png");
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            padding: 0.58rem 1.17rem;
                            box-sizing: border-box;

                            &:first-child {
                                .btn {
                                    background-image: linear-gradient(-50deg, $btn1 0%, $btn2 100%)
                                }
                            }

                            &:nth-child(2) {
                                .btn {
                                    background-image: linear-gradient(-50deg,
                                            $btn2 0%,
                                            $btn3 100%);
                                }
                            }

                            &:nth-child(3) {
                                .btn {
                                    background-image: linear-gradient(-50deg,
                                            $btn3 0%,
                                            $btn4 100%);
                                }
                            }

                            &:nth-child(4) {
                                .btn {
                                    background-image: linear-gradient(-50deg,
                                            $btn4 0%,
                                            $btn5 100%);
                                }
                            }

                            .b-r-l {
                                height: 100%;
                                float: left;
                                letter-spacing: 1px;
                                color: #1af7f1;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }

                            .b-r-r {
                                height: 100%;
                                float: right;
                                color: #17fff3;
                                display: flex;
                                justify-content: center;
                                align-items: center;

                                .inputBox {
                                    width: 6.21rem;
                                    height: 80%;
                                    position: relative;

                                    .input {
                                        border-radius: 1rem;
                                        border: solid 0.1rem #a6a5ff;
                                        width: 6.21rem;
                                        height: 100%;
                                        background: transparent;
                                        outline: none;
                                        display: block;
                                        padding: 0 1.5rem;
                                        text-align: center;
                                        color: #1af7f1;

                                        &::-webkit-input-placeholder {
                                            /* WebKit browsers */
                                            color: #1af7f1;
                                        }

                                        &:-moz-placeholder {
                                            /* Mozilla Firefox 4 to 18 */
                                            color: #1af7f1;
                                        }

                                        &::-moz-placeholder {
                                            /* Mozilla Firefox 19+ */
                                            color: #1af7f1;
                                        }

                                        &:-ms-input-placeholder {
                                            /* Internet Explorer 10+ */
                                            color: #1af7f1;
                                        }
                                    }

                                    .dec {
                                        width: 1.5rem;
                                        height: 100%;
                                        position: absolute;
                                        top: 0;
                                        bottom: 0;
                                        left: 0;
                                        margin: auto;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                    }

                                    .add {
                                        width: 1.5rem;
                                        height: 100%;
                                        position: absolute;
                                        top: 0;
                                        bottom: 0;
                                        right: 0;
                                        margin: auto;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                    }
                                }
                            }
                        }
                    }
                }

                .btn {
                    width: 7.46rem;
                    height: 1.8rem;
                    background-image: linear-gradient(-86deg,
                            #53b0ff 0%,
                            #0b5fa7 100%);
                    border-radius: 0.2rem;
                    opacity: 0.7;
                    margin: auto;
                    cursor: pointer;
                    text-align: center;
                    line-height: 1.8rem;
                }

                .saveGrade {
                    float: left;
                }

                .cancel {
                    float: right;
                }

                .settingBox1 {
                    width: 72.9%;
                    height: 82.2%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    margin: auto;

                    ul {
                        width: 100%;
                        height: 84.93%;
                        margin-bottom: 1.2rem;

                        li {
                            width: 50%;
                            height: 16.67%;
                            box-sizing: border-box;
                            float: left;

                            &:nth-child(even) {
                                padding-left: 1rem;
                            }

                            &:nth-child(odd) {
                                padding-right: 1rem;
                            }

                            .b-r-l,
                            .b-r-r {
                                height: 100%;
                                float: left;
                                display: flex;
                                align-items: center;
                            }

                            .b-r-l {
                                width: 30%;
                            }

                            .b-r-r {
                                width: 70%;
                                justify-content: flex-end;
                                color: #1bcfca;
                            }

                            .inputBox {
                                width: 90%;
                                height: 60%;

                                .input {
                                    border-radius: 1rem;
                                    border: solid 0.1rem #a6a5ff;
                                    width: 100%;
                                    height: 100%;
                                    background: transparent;
                                    outline: none;
                                    display: block;
                                    text-align: center;
                                    color: #1af7f1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
