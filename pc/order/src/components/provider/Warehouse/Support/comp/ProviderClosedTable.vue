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
                        label="Case number"
                        sortable
                        prop="casenumber"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="vendor"
                        label="Vendor"
                        width="150">
                    <template slot-scope="scope">
                        <div v-html="scope.row.vendor" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="status"
                        label="Status">
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="category"
                        label="Category">
                </el-table-column>
                <el-table-column
                        prop="details"
                        label="Details"
                        width="550">
                    <template slot-scope="scope">
                        <div>
                            <span class="bolderto">Title:</span>
                            {{scope.row.title}}
                        </div>

                        <div>
                            <span class="bolderto">Tracking#:</span>
                            {{scope.row.tracking}}
                        </div>

                        <div>
                            <span class="bolderto">
                                {{scope.row.username}}
                                [{{scope.row.userspeaktime}}]
                                :
                            </span>
                            {{scope.row.usermessage}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="createtime"
                        label="Create Time">
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleOpen(scope.row)">Open
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
            handleOpen(row) {
                //传父数据
                this.$emit('func', row)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped lang="less">
    .block {
        margin-top: 10px;
        margin-right: 5px;
        display: flex;
        justify-content: flex-end;
    }

    .bolderto{
        font-weight: bolder;
    }
</style>