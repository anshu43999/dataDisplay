<template>
    <div id="setting">
        <!--        顶部-->
        <div class="t">
            <div class="avatar">
                <img src="../assets/images/setting/avatar.png" alt="">
            </div>
            <p class="admin">{{admin}}</p>
            <div class="exit">
                <i class="iconfont iconexit"></i>
            </div>
        </div>
        <!--        设置-->
        <div class="b">
            <ul class="b-l">
                <li v-for="item in settings" :key="item">
                    <div>{{item}}</div>
                    <!--                    {{item}}-->
                </li>
            </ul>
            <div class="b-r">
                <div class="settingBox" v-if="model==='display'">
                    <ul>
                        <li v-for="item in percent" :key="item.categories">
                            <div class="b-r-l">
                                <p>
                                    警情{{item.categories}}
                                </p>
                            </div>
                            <div class="b-r-r">
                                <div class="value">{{item.value2}}%</div>
                            </div>
                        </li>
                    </ul>
                    <div class="edit btn" @click="edit">
                        <div>编辑</div>
                    </div>
                </div>
                <div class="settingBox" v-if="model==='edit'">
                    <ul>
                        <li v-for="item in percent" :key="item.index">
                            <div class="b-r-l">
                                <p>
                                    警情{{item.categories}}
                                </p>
                            </div>
                            <div class="b-r-r">
                                <div class="inputBox">
                                    <input class="input">
                                </div>
                                <div class="dec"></div>
                            </div>
                        </li>
                    </ul>
                    <div class="edit btn">
                        <div>编辑</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        data() {
            return {
                admin: 'admin',
                settings: ['警情分布占比设置', '各市警情峰值设置'],
                percent: [
                    {
                        categories: '良好',
                        value1: 0,
                        value2: 25
                    },
                    {
                        categories: '一般',
                        value1: 25,
                        value2: 50
                    },
                    {
                        categories: '较重',
                        value1: 50,
                        value2: 75
                    },
                    {
                        categories: '严重',
                        value1: 75,
                        value2: 100
                    }
                ],
                percent1:25,
                percent2:50,
                percent3:75,
                percent4:100,
                model:'display'
            }
        },
        methods:{
            edit(){
                this.model='edit'
            }
        }
    }
</script>

<style scoped lang="scss">
    $btn1: #5ea2f5;
    $btn2: #3d8bea;
    $btn3: #2a5cc0;
    $btn4: #0f07b0;
    $btn5: #060086;
    #setting {
        width: 21.11rem;
        height: 19.92rem;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /*顶部*/
        .t {
            width: 100%;
            height: 14.4%;
            background-image: linear-gradient(-90deg,
                    #0761af 0%,
                    rgba(28, 97, 157, 0.75) 30%,
                    rgba(49, 97, 138, 0.51) 59%,
                    rgba(48, 96, 137, 0.5) 60%,
                    rgba(32, 80, 122, 0.5) 80%,
                    rgba(15, 62, 106, 0.5) 100%,
                    rgba(15, 62, 106, 0.4) 100%,
                    rgba(15, 62, 106, 0.3) 100%);
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
                font-size: 2rem;
            }

            .exit {
                float: right;
                width: 7.7%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-shadow: 0 0 6px #ffffff;

                .iconfont {
                    font-size: 4rem;
                }
            }
        }

        /*    设置*/
        .b {
            width: 100%;
            height: 79.6%;
            background-image: linear-gradient(180deg,
                    rgba(7, 97, 175, 0.7) 15%,
                    rgba(0, 74, 143, 0.3) 100%);
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .b-l {
                width: 33.6%;
                height: 100%;
                background-image: linear-gradient(180deg,
                        rgba(7, 97, 175, 0.7) 15%,
                        rgba(0, 74, 143, 0.3) 100%);
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
                    /*display: flex;
                    align-items: center;
                    justify-content: center;
                    letter-spacing: 1px;*/

                    &.active {
                        background-image: linear-gradient(86deg,
                                #0860ab 0%,
                                #1bcfca 100%);
                        box-shadow: 0 0 8px #1b7bff;
                    }

                    div {
                        width: 167%;
                        height: 167%;
                        transform: scale(0.6);
                        transform-origin: top left;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        letter-spacing: 1px;
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
                        height: 80%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-bottom: 1.2rem;

                        li {
                            width: 100%;
                            height: 19.51%;
                            background-image: linear-gradient(0deg,
                                    rgba(7, 97, 175, 0.7) 15%,
                                    rgba(0, 74, 143, 0.3) 100%);
                            border-radius: 0.25rem;
                            opacity: 0.7;
                            padding: 0.35rem 0.53rem;
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
                                width: 50%;
                                height: 100%;
                                float: left;

                                p {
                                    width: 167%;
                                    height: 167%;
                                    transform: scale(0.6);
                                    transform-origin: top left;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    letter-spacing: 1px;
                                    color: #1af7f1;
                                }
                            }

                            .b-r-r {
                                height: 100%;
                                float: right;
                                color: #17fff3;
                                .value{
                                    width: 167%;
                                    height: 167%;
                                    transform: scale(0.6);
                                    transform-origin: top left;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                }
                                .inputBox{
                                    width: 3.78rem;
                                    height: 100%;
                                    .input{
                                        border-radius: 1rem;
                                        border: solid 0.1rem #a6a5ff;
                                        width: 100%;
                                        height: 90%;
                                        margin-top: 5%;
                                        background: transparent;
                                        outline: none;
                                        display: block;
                                    }
                                    .dec{

                                    }
                                }

                            }
                        }
                    }

                    .btn {
                        width: 4.54rem;
                        height: 1.2rem;
                        background-image: linear-gradient(-86deg,
                                #53b0ff 0%,
                                #0b5fa7 100%);
                        border-radius: 0.2rem;
                        opacity: 0.7;
                        margin: auto;
                        cursor: pointer;
                        div{
                            width: 167%;
                            height: 167%;
                            transform: scale(0.6);
                            transform-origin: top left;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
            }
        }
    }
</style>