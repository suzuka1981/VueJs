<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <el-table
                    :header-cell-style="{fontSize:'12px'}"
                    :cell-style="{fontSize:'12px'}"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        prop="commodity"
                        label="Commodity"
                        width="120">
                    <template slot-scope="scope">
                        <div v-html="scope.row.commodity" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="schedulebcode"
                        label="Schedule B code"
                        width="120"
                >
                    <template slot-scope="scope">
                        <div v-html="scope.row.schedulebcode" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="exportinfocode"
                        label="Export info code"
                        width="130"
                >
                    <template slot-scope="scope">
                        <div v-html="scope.row.exportinfocode" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="countryoforigin"
                        label="Country of origin"
                        width="130"
                >
                    <template slot-scope="scope">
                        <div v-html="scope.row.countryoforigin" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="licenseexceptionsymbol"
                        label="License exception symbol"
                        width="180"
                >
                    <template slot-scope="scope">
                        <div v-html="scope.row.licenseexceptionsymbol" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="customsvalue"
                        label="Customs value($)"
                        width="130"
                >
                    <template slot-scope="scope">
                        <div v-html="scope.row.customsvalue" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="quantity"
                        label="Quantity"
                        width="90"
                >
                    <template slot-scope="scope">
                        <div v-html="scope.row.quantity" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="quantity2"
                        label="Quantity2"
                        width="90"
                >
                    <template slot-scope="scope">
                        <div v-html="scope.row.quantity2" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="totalweight"
                        label="Total weight(Lbs)"
                        width="130"
                >
                    <template slot-scope="scope">
                        <div v-html="scope.row.totalweight" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
<!--                        <el-tooltip class="item" effect="dark" content="Open label" placement="top"-->
<!--                                    style="margin-right: 10px">-->
<!--                            <el-button-->
<!--                                    type="text"-->
<!--                                    size="mini"-->
<!--                                    @click="handleOpenLabe(scope.row)">-->
<!--                                <i class="el-icon-camera-solid" style="font-size: 20px"></i>-->
<!--                            </el-button>-->
<!--                        </el-tooltip>-->
                    </template>
                </el-table-column>
            </el-table>

<!--            <div class="block">-->
<!--                <el-pagination-->
<!--                        @size-change="handleSizeChange"-->
<!--                        @current-change="handleCurrentChange"-->
<!--                        :page-sizes="[100, 200, 300, 400]"-->
<!--                        :page-size="100"-->
<!--                        layout=" sizes, prev, pager, next"-->
<!--                        :total="400">-->
<!--                </el-pagination>-->
<!--            </div>-->
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: {
            tableData: [],
            propsMsg: '',
        },
        data() {
            return {
                multipleSelection: []
            }
        },

        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // handleEdit(row) {
            //     //传父数据
            //     this.$emit('func', row, 'edit')
            // },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

        }
    }
</script>

<style scoped>
    .block {
        margin-top: 10px;
        margin-right: 5px;
        display: flex;
        justify-content: flex-end;
    }
</style>