<!--  -->
<template>
<div id='header_wrap' @click="handleClick">
    <div id="header_main">
        <div style="margin: 0 auto;width:40%;display : flex">
            <div id="header_title">山西省公安厅110指挥中心警情数据可视化平台</div>
            <time id="headerTime"></time>
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
    handleClick(e){
        this.$parent.filter(e);
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

#header_wrap{
    // background-color: #011426;
    // height:10rem;
    background-image: url('../assets/images/index/top.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 99% 90%;
    overflow: hidden;
    // height: 7rem;
    #header_main{
        height: 100%;
    }
    #header_title{
        height: 7rem;
        overflow: hidden;
        line-height: 7rem;
        text-align: center;
        font-size: 4rem;
    }
    #headerTime{
        margin-left: 1rem;
        height: 7rem;
        overflow: hidden;
        line-height:8rem;
        font-size: 1rem;

    }
}
</style>