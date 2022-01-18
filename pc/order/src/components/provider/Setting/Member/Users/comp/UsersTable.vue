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
                        label="Index"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.id }}
                    </template>
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="username"
                        label="User">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        width="180"
                        label="Status">
                    <template slot-scope="scope">
                        <div v-show="scope.row.tmpstatus == '1'">accepted</div>
                        <div v-show="scope.row.tmpstatus == '2'">Waiting for approval</div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="320"
                        prop="info"
                        label="Info">
                    <template slot-scope="scope">
                        <div>
                            Email: {{scope.row.username}}
                        </div>
                        <!--                        <div>-->
                        <!--                            Note: {{scope.row.note}}-->
                        <!--                        </div>-->
                    </template>
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="balance"
                        label="Balance">
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
                this.$emit('func', row)
            },
            handleDelete(row) {
                this.$confirm('Warning: The related tasks won\'t be able to confirm.Do you want to Proceed?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(async () => {
                    // console.log(row)
                    let tmpSubData = {
                        id: row.bsid
                    }

                    const {data: res} = await this.$http.post('setting/deletebuyerstatus', tmpSubData)

                    if (res.meta.status != 200) {
                        return this.$message.error('Delete Error.');
                    } else {
                        this.$message({
                            type: 'success',
                            message: 'Ok!'
                        });

                        this.$emit('funcRefresh')
                    }

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
            getMember(row) {
                if (typeof (row.name) != 'undefined' && row.name && row.name != 0 && row.name != 'null') {
                    return row.name
                } else if (typeof (row.username) != 'undefined') {
                    return row.username.split('@')[0]
                }
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