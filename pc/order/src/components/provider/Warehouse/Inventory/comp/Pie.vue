<template>
    <div id="line" style="height: 100%; width: 100%;"></div>
</template>

<script>
    export default {
        name: "SafeThingTrendLineChart",
        props: {
            xAxisData: [],
            seriesPriceData: [],
            seriesQuantityData: [],
            title: '',
        },
        data() {
            return {
                option: {
                    title: {
                        text: 'Price && quantity',
                        subtext: 'history'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['price', 'quantity']
                    },
                    // toolbox: {
                    //     show: true,
                    //     feature: {
                    //         dataView: {show: true, readOnly: false},
                    //         magicType: {show: true, type: ['line', 'bar']},
                    //         restore: {show: true},
                    //         saveAsImage: {show: true}
                    //     }
                    // },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: this.xAxisData,
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'price',
                            type: 'bar',
                            data: this.seriesPriceData,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: 'quantity',
                            type: 'bar',
                            data: this.seriesQuantityData,
                            // markPoint: {
                            //     data: [
                            //         {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                            //         {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                            //     ]
                            // },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                },
            }
        },
        created() {

        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("line"));
                // 指定图表的配置项和数据
                // yAxisIndex: 0,

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(this.option);
            },
        },
        mounted() {
            this.drawLine();
        }
    }
</script>

<style scoped>

</style>