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
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.id }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Name"
                        width="500">
                    <template slot-scope="scope">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Length"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.length }}"
                    </template>
                </el-table-column>
                <el-table-column
                        label="Width"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.width }}"
                    </template>
                </el-table-column>
                <el-table-column
                        label="Height"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.height }}"
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
                                @click="handleEdit(scope.row)">Edit
                        </el-button>
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleDelete(scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[50,100, 200, 300]"
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
            handleDelete(row) {
                this.$confirm('Are you sure to delete this packaging?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.$emit('funcdelete', row)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel'
                    });
                });
            },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
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