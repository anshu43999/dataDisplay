<!--  -->
<template>
    <div class='r'>
        <div class="r-t">
            <div class="chart-wrap">

            </div>
        </div>


        <div class="r-b">
            <div class="r-b-t">
                <div class="r-b-t-l">

                </div>

                <div class="r-b-t-l">

                </div>

            </div>

            <div class="r-b-b">
                <div class="r-b-b-l">

                </div>

                <div class="r-b-b-l">

                </div>


            </div>


        </div>


    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
//import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
//这里存放数据
            return {

            };
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {},
//方法集合
        methods: {

        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
        beforeCreate() {
        }, //生命周期 - 创建之前
        beforeMount() {
        }, //生命周期 - 挂载之前
        beforeUpdate() {
        }, //生命周期 - 更新之前
        updated() {
        }, //生命周期 - 更新之后
        beforeDestroy() {
        }, //生命周期 - 销毁之前
        destroyed() {
        }, //生命周期 - 销毁完成
        activated() {
        }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='scss' scoped>
    //@import url(); 引入公共css类
    .r {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .r-t {
            width: 100%;
            height: 38%;
            background-image: url('../assets/images/index/l-t-bg.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }

        .r-b {
            width: 100%;
            height: 57%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .r-b-t {
                height: 47.2%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .r-b-t-l {
                    width: 48%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }


            }
        ;

            .r-b-b {
                height: 47.2%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                // background-image: url('../assets/images/index/l-t-bg.png') ;
                // background-repeat: no-repeat;
                // background-size:100% 100%;
                .r-b-b-l {
                    width: 48%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }

            }

        }


    }
</style>