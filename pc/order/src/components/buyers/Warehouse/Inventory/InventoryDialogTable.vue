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
                        label="#"
                        width="50">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                        label="Warehouse Site"
                        width="300">
                    <template slot-scope="scope">
                        <div v-show="scope.row.type == 'self'">
                            {{ scope.row.sitename }}
                            -
                            {{ scope.row.address1 }}
                        </div>
                        <div v-show="scope.row.type == 'warehouse'">
                            {{ scope.row.wsitename }}
                            -
                            {{ scope.row.waddress1 }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="quantity"
                        label="Quantity"
                        width="150"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                        show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleReport(scope.row)" v-show="propsMsg==='active'">Report
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[30,50,100,400]"
                        :page-size="pageInfo.pageSize"
                        layout=" sizes, prev, pager, next"
                        :total="pageInfo.total">
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
            pageInfo: {},
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
            handleReport(row) {
                // console.log(row)
                //传父数据
                this.$emit('funReport', row)
            },
            handleSizeChange(val) {
                this.$emit('funcDetailSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcDetailCurrentChange', val)
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