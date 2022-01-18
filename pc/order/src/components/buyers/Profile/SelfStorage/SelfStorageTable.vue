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
                        label="Site name"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.sitename }}</template>
                </el-table-column>
                <el-table-column
                        label="Address1"
                        width="220">
                    <template slot-scope="scope">{{ scope.row.address1 }}</template>
                </el-table-column>
                <el-table-column
                        label="Address2"
                        width="220">
                    <template slot-scope="scope">{{ scope.row.address2 }}</template>
                </el-table-column>
                <el-table-column
                        label="State"
                        width="170">
                    <template slot-scope="scope">
                        {{optionResult(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="City"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="zip"
                        label="Zip"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleEdit(scope.row)" v-show="propsMsg==='active'">Edit
                        </el-button>

                        <el-button type="text"
                                   size="mini"
                                   @click="confirmClick(scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[5, 10, 50, 100]"
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
            pageInfo:{},
            optionsOfStates:[],
        },
        data() {
            return {
                multipleSelection: []
            }
        },
        methods: {
            optionResult(val){
                this.optionsOfStates.forEach(function (item) {
                    if(item.value.indexOf(val) >=0) {
                        return item.label
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(row) {
                //传父数据
                this.$emit('func', row, 'edit')
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
                // console.log(`当前页: ${val}`);
            },
            confirmClick(row) {
                this.$confirm('Are you sure to delete this site?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.$emit('funcRowDelete', row)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel'
                    });
                });
            }
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