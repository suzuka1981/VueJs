<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        label="Date"
                        prop="date"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="Type"
                        prop="type"
                        width="200">
                </el-table-column>
                <el-table-column
                        width="450"
                        label="Note">
                    <template slot-scope="scope">
                        <div v-show="scope.row.labeltype==='1'">
                            Cancel label &nbsp;{{scope.row.labelid.join(',')}}
                        </div>
                        <div v-show="scope.row.labeltype==='2'">
                            Label for &nbsp;{{scope.row.labelid.join(',')}}
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                        label="Amount"
                        prop="amount"
                        width="200">
                    <template slot-scope="scope">
                        <span :class="fontColor(scope.row.amount)">
                            ${{scope.row.amount}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Balance"
                        prop="balance"
                        width="200">
                    <template slot-scope="scope">
                        ${{scope.row.balance}}
                    </template>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleDetails(scope.row)">Details
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout=" sizes, prev, pager, next"
                        :total="400">
                </el-pagination>
            </div>
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
            handleDetails(row) {
                //传父数据
                this.$emit('func', row)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            fontColor(amount) {
                // console.log(amount < 0)
                return {
                    fontcolor: amount < 0
                }
            },
        },
        computed: {

        },
    }
</script>

<style scoped>
    .block {
        margin-top: 10px;
        margin-right: 5px;
        display: flex;
        justify-content: flex-end;
    }

    .fontcolor {
        color: red;
    }
</style>