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
                        prop="id"
                        width="80">
                    <template slot-scope="scope">
                        <div class="marflax">
                            {{scope.row.id}}
<!--                            <i-->
<!--                                    @click="handleOfIconClick(scope.row)"-->
<!--                                    v-show="!scope.row.startStatus"-->
<!--                                    class="iconfontsizesmall el-icon-star-off"></i>-->
<!--                            <i-->
<!--                                    @click="handleOfIconClick(scope.row)"-->
<!--                                    v-show="scope.row.startStatus"-->
<!--                                    class="iconfontsize el-icon-star-on"></i>-->
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="date"
                        sortable
                        label="Date"
                        width="250">
                    <template slot-scope="scope">{{ getReleaseDate(scope.row) }}</template>
                </el-table-column>
                <el-table-column
                        prop="user"
                        sortable
                        label="User"
                        width="150">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="description"
                        sortable
                        label="Description"
                        width="550">
                    <template slot-scope="scope">
                        <div v-html="scope.row.description" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="balance"
                        sortable
                        label="Balance"
                        width="150">
                    <template slot-scope="scope">
                        ${{handelToMaoney(scope.row.sellertotalbalance)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="amount"
                        sortable
                        label="Amount"
                        width="150">
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
                                @click="handlePay(scope.row)">Pay
                        </el-button>
<!--                        <el-button-->
<!--                                type="text"-->
<!--                                size="mini"-->
<!--                                @click="handleComments(scope.row)">Comments-->
<!--                        </el-button>-->
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleCancel(scope.row)">Cancel
                        </el-button>
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
    import {formatDate} from "../../../../utils/dateFormat";
    import {toMoney} from "../../../../utils/toMoney";

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
            handleOfIconClick(row) {
                row.startStatus = !row.startStatus
            },
            handlePay(row) {
                //传父数据
                this.$emit('funcPay', row)
            },
            handleComments(row) {
                //传父数据
                this.$emit('func', row)
            },
            handleCancel(row) {
                this.$confirm('Are you sure to delete this payment request?', 'Tips', {
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
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
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
                if (typeof (row.buyersrelname) != 'undefined' && row.buyersrelname && row.buyersrelname != 0 && row.buyersrelname != 'null') {
                    return row.buyersrelname
                } else if (typeof (row.buyersusername) != 'undefined') {
                    return row.buyersusername.split('@')[0]
                }
            },
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

    .bolderto {
        font-weight: bolder;
    }

    /deep/ .iconfontsizesmall {
        cursor: pointer;
        margin-left: 5px;
        font-size: 20px;
    }

    /deep/ .iconfontsize {
        cursor: pointer;
        margin-left: 5px;
        margin-top: -5px;
        color: #ee9900;
        font-size: 30px;
    }

    .marflax {
        display: flex;
    }

</style>