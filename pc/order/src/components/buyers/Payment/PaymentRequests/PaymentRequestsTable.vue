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
                        width="50">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                        label="Date"
                        width="250">
                    <template slot-scope="scope">{{ getReleaseDate(scope.row) }}</template>
                </el-table-column>
                <el-table-column
                        prop="sellerusername"
                        label="Organization"
                        width="250">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="Payment request"
                        width="400"
                >
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="Amount"
                        width="175"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        ${{handelToMaoney(scope.row.amount)}}
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
                                @click="handleComments(scope.row)">Comments
                        </el-button>

                        <el-button
                                type="text"
                                size="mini"
                                @click="handleEdit(scope.row)">Edit
                        </el-button>

                        <el-button type="text"
                                   size="mini"
                                   @click="confirmClick(scope.row)">Cancel</el-button>
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
    import {formatDate} from "../../../utils/dateFormat";
    import {toMoney} from "../../../utils/toMoney";

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
            handelToMaoney(val) {
                return toMoney(val + '')
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(row) {
                //传父数据
                this.$emit('func', row)
            },
            handleComments(row) {
                //传父数据
                this.$emit('funComments', row)
            },

            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            confirmClick(row) {
                this.$confirm('You can change payment method by editing payment. Cancelling pamyent will lose the spot in payment request queue. Are you sure to delete this payment request?',
                    'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.$emit('funcCancel', row)
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
            },
            getReleaseDate(row) {
                let tmpDate = formatDate(new Date(row.createdate), "MM-dd-yyyy hh:mm")
                if ((tmpDate.slice(11, 13) - 12) > 0) {

                    return tmpDate.slice(0, 11) + '0' + (tmpDate.slice(11, 13) - 12) + tmpDate.slice(13, tmpDate.length) + ' PM'
                } else {
                    return tmpDate + ' AM'
                }
                return tmpDate
            },
            getMember(row) {
                if (typeof (row.sellerrelname) != 'undefined' && row.sellerrelname && row.sellerrelname != 0 && row.sellerrelname != 'null') {
                    return row.sellerrelname
                } else if (typeof (row.sellerusername) != 'undefined') {
                    return row.sellerusername.split('@')[0]
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