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
                        label="ID#"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                        label="Category"
                        width="220">
                    <template slot-scope="scope">{{ scope.row.category }}</template>
                </el-table-column>
                <el-table-column
                        label="Name"
                        width="220">
                    <template slot-scope="scope">{{ scope.row.displayname }}</template>
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="Description"
                        width="270">
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
                                   @click="confirmClick(scope.row)">Delete(待做)</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[50, 100, 200, 300]"
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
            handleEdit(row) {
                //传父数据
                this.$emit('func', row, 'edit')
            },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            confirmClick(row) {
                this.$confirm('Are you sure to delete this payment method?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: 'Ok!'
                    });
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