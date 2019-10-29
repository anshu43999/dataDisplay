<template>
    <div id="login">

        <!-- <div class="video-container">
            <div class="filter"></div>
            <video autoplay loop muted playsinline src="../assets/video/dongtu1.mp4" class="fillWidth"></video>
            <div class="poster hidden">
            </div>
        </div> -->

         <div class="homepage-hero-module">
            <div class="video-container">
            <div class="filter">
                <div class="login_wrap">
                    <!-- <h4>用户登录</h4> -->
                    <div class="login_main">
                        <h4>用户登录</h4>

                        <div class="inputs_wrap">
                            <div>账号</div>
                            <input type="text">
                            <i class="iconfont iconusername icons"></i>
                        </div>

                        <div class="inputs_wrap">

                            <div>密码</div>
                            <input type="password">
                            <i class="iconfont iconmima   icons"></i>

                        </div>

                        <div class="inputs_btn" :class="[ active? 'btnActive':'btnFocurs','btn','input']" @click="submit" >
                            
                            <span>登录</span>
                            </div>

                    </div>


                </div>


            </div>
            <video autoplay loop muted playsinline src="../assets/video/dongtu1.mp4" class="fillWidth"></video>
            <div class="poster hidden">
                <img src="PATH_TO_JPEG" alt="">
            </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                active : false,
            }
        },
        methods : {
            submit(){
                 this.active = true;
                 this.$router.push({name:'首页'})


                //   this.active = false;

            },

        },
        mounted(){
             $( document ).ready(function() {
                scaleVideoContainer();

                initBannerVideoSize('.video-container .poster img');
                initBannerVideoSize('.video-container .filter');
                initBannerVideoSize('.video-container video');

                $(window).on('resize', function() {
                scaleVideoContainer();
                scaleBannerVideoSize('.video-container .poster img');
                scaleBannerVideoSize('.video-container .filter');
                scaleBannerVideoSize('.video-container video');
                });
            });

            function scaleVideoContainer() {
                var height = $(window).height() + 5;
                var unitHeight = parseInt(height) + 'px';
                $('.homepage-hero-module').css('height',unitHeight);
            }

            function initBannerVideoSize(element){
                $(element).each(function(){
                $(this).data('height', $(this).height());
                $(this).data('width', $(this).width());
                });

                scaleBannerVideoSize(element);
            }

            function scaleBannerVideoSize(element) {

                var windowWidth = $(window).width(),
                windowHeight = $(window).height() + 5,
                videoWidth,
                videoHeight;

                // console.log(windowHeight);

                $(element).each(function(){
                var videoAspectRatio = $(this).data('height')/$(this).data('width');

                $(this).width(windowWidth);

                if(windowWidth < 1000){
                    videoHeight = windowHeight;
                    videoWidth = videoHeight / videoAspectRatio;
                    $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

                    $(this).width(videoWidth).height(videoHeight);
                }

                $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

                });
            }
        }
    }
</script>

<style scoped lang="scss">
input{
    background: transparent;
    border: none;
    color: white;
}

#login{
    background : url('../assets/images/index/login_bg.png');
    width: 100%;
        height: 100%;

    // border-right: none;
    // border-left: none;
    // position: relative;


    // .video_bg{
    //     position: absolute;
    //     left: 0;
    //     right: 0;
    //     top:  0;
    //     bottom: 0;
    //     width: 100%;
    //     height: 100%;


    // }

    .video-container {
        position: relative;
        bottom: 0%;
        left: 0%;
        height: 100%;
        width: 100%;
        overflow: hidden;
        // background: #fff;
        background : url('../assets/images/index/login_bg.png');
    }

    // .video-container .poster img {
    //     width: 100%;
    //     bottom: 0;
    //     position: absolute;
    // }

    .video-container .filter {
        z-index: 100;
        position: absolute;
        // background: rgba(210, 221, 150, 0.4);
        // width: 5rem;
        top: 35%;
        height:45%;
        .login_wrap{
            position: absolute;
            right: 17%;
            top: 0;
            height: 100%;
            background: url('../assets/images/index/login_wrap.png') ;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            padding: 4rem  6rem ;

            width: 23%;
            // h4{
            //     text-align: center;
            // }
            .login_main{
                width: 100%;
                height: 100%;
                // background-color: #fff;
                text-align: center;
                // padding: 10px;
                h4{
                    color: #00baff;
                    font-size: 3rem;
                    font-weight: 550;

                }
                .inputs_wrap{
                    width: 100%;
                    height: 15%;
                    margin-top:10%; 
                    background: url('../assets/images/index/login_inputs.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    justify-content: space-around;
                    align-items:center;
                    input{
                        height: 70%;
                    }
                    div{
                        color: #00c6ff;
                    }
                    .icons{
                        color: #00c6ff;
                    }
                }
                .inputs_btn{
                    width: 90%;
                    margin: 0 5%;
                    height: 15%;
                    // line-height: 4rem;
                    display:flex;align-items:center;justify-content:center;
                    border-radius: 4px;
                    font-size: 2.5rem;
                    letter-spacing: 5px;
                    margin-top:20%; 
                    background: linear-gradient(to right,#037fe2,#00309b);
                    color: #ffffff;
                    cursor: pointer;
                }
            }
        }
        
    }

    .video-container video {
        height: 100%;
        position: absolute;
        z-index: 0;
        bottom: 0;
    }

    .video-container video.fillWidth {
        width: 100%;
    }

    .btnActive{
            transform: scale(0.9);
    }
    .btnFocurs{
        transform: scale(1);
    }



}
</style>