<template>
    <div id="city">
        <main>
            <div class="r">
                <div class="r-l">
                    <div class="r-l-t">
                        <div class="chart-wrap">
                            <h3>今日接警类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="jrPieChart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-l-b">
                        <div class="chart-wrap">
                            <h3>今日报警方式数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="jrbjfssjfxChart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-l-m">
                        <div class="chart-wrap">
                            <h3>今日来话类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="jrrlhlxsjfxChart"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="r-r">
                    <div class="r-r-t">
                        <div class="chart-wrap">
                            <h3 @click="jump">近七日接警类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevenjjlxsjfxChart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-r-m">
                        <div class="chart-wrap">
                            <h3 @click="jump">近七日报警方式数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevenbjfssjfxChart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-r-b">
                        <div class="chart-wrap">
                            <h3 @click="jump">近七日来话类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevenlhlxsjfxChart"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: "City"
    }
</script>

<style scoped>

</style>