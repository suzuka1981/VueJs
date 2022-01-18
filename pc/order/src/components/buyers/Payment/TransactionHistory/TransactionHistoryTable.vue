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
                        width="100">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                        label="Date"
                        width="170">
                    <template slot-scope="scope">
                        {{ getReleaseDate(scope.row.createdate,1) }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sellerusername"
                        label="Organization"
                        width="170">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Transaction"
                        width="400">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.historystatus}}
                            <span v-show="scope.row.historystatus == 'Inbound'
                            || scope.row.historystatus == 'Reportmiss'
                            ">
                                -
                                {{scope.row.productname}}
                            </span>
                            <span v-show="scope.row.historystatus == 'AdjustBalance'">
                                <br>
                                -
                                <br>
                                {{scope.row.note}}
                            </span>
                        </div>
                        <div v-show="scope.row.historystatus == 'Inbound'">
                            ${{scope.row.price}}
                            *
                            {{scope.row.quantity}}
                        </div>

                        <div v-show="scope.row.historystatus == 'Payment'">
                            <div>
                                {{getCategoryName(scope.row.category)}}
                                -
                                ${{scope.row.displayname}}
                            </div>
                            <div>
                                {{scope.row.description}}
                            </div>
                            <div>
                                Estimate deliver date:
                                {{getReleaseDate(scope.row.lastupdate,2)}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="Amount"
                        width="140"
                >
                    <template slot-scope="scope">
                        <div :class="
                        {
                           'divcolorred':(scope.row.historystatus == 'Inbound'
                           || (scope.row.historystatus == 'AdjustBalance' && scope.row.amount >= 0)),

                           'divcolorblue':(scope.row.historystatus != 'Inbound'
                           && !(scope.row.historystatus == 'AdjustBalance' && scope.row.amount >= 0)),
                            }">
                            ${{handelToMaoney(scope.row.amount)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="balance"
                        label="Balance"
                        width="150"
                >
                    <template slot-scope="scope">
                        ${{handelToMaoney(scope.row.balance)}}
                    </template>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                        show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <div v-show="
                        scope.row.historystatus == 'Payment'
                        || scope.row.historystatus == 'AdjustBalance'
                        ">
<!--                            <el-button-->
<!--                                    type="text"-->
<!--                                    size="mini"-->
<!--                                    @click="" v-show="propsMsg==='active'">Attachment（未知）-->
<!--                            </el-button>-->
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="handleComments(scope.row)" v-show="propsMsg==='active'">Comments
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[15, 30, 50, 100]"
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
            getCategoryName(name) {
                if (name == 'temp') {
                    return 'Temporary pay'
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleComments(row) {
                //传父数据
                this.$emit('func', row)
            },

            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            getReleaseDate(date, type) {
                let tmpDate
                if (type == 1) {
                    tmpDate = formatDate(new Date(date), "MM-dd-yyyy hh:mm")
                } else if (type == 2) {
                    tmpDate = formatDate(new Date(date), "MM-dd-yyyy")
                }

                if ((tmpDate.slice(11, 13) - 12) > 0) {
                    return tmpDate.slice(0, 11) + '0' + (tmpDate.slice(11, 13) - 12) + tmpDate.slice(13, tmpDate.length) + ' PM'
                } else {
                    if (type == 1) {
                        return tmpDate + ' AM'
                    }
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

<style scoped lang="less">
    .block {
        margin-top: 10px;
        margin-right: 5px;
        display: flex;
        justify-content: flex-end;
    }

    .divcolorred {
        color: red;
    }

    .divcolorblue {
        color: #42b983;
    }
</style>