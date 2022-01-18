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
                        width="80">
                    <template slot-scope="scope">
                        {{ scope.row.id }}
                    </template>
                </el-table-column>
                <el-table-column
                        width="170"
                        prop="createdate"
                        label="Create date">
                    <template slot-scope="scope">
                        {{ getReleaseDate(scope.row.createdate,1) }}
                    </template>
                </el-table-column>
                <el-table-column
                        width="170"
                        prop="buyersname"
                        label="User">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        width="450"
                        prop="transaction"
                        label="Transaction">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.historystatus}}
                            <span v-show="scope.row.historystatus == 'Inbound'">
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
                        width="140"
                        prop="amount"
                        label="Amount">
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
                        width="150"
                        prop="balance"
                        label="Balance">
                    <template slot-scope="scope">
                        ${{handelToMaoney(scope.row.balance)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <div v-show="
                        scope.row.historystatus == 'Payment'
                        || scope.row.historystatus == 'AdjustBalance'

                        ">
                            <!--                        <el-button-->
                            <!--                                type="text"-->
                            <!--                                size="mini"-->
                            <!--                                @click="handleAttachment(scope.row)">Attachment-->
                            <!--                        </el-button>-->
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="handleComments(scope.row)">Comments
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
            getCategoryName(name) {
                if (name == 'temp') {
                    return 'Temporary pay'
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleAttachment(row) {
                //跳转新页面router写法
                const routeData = this.$router.resolve({
                    name: 'ViewImages',
                    query: {urls: row.urls, rowlength: row.urls.length, type: 'pdf'},
                    // params: {urls: row}
                })

                window.open(routeData.href, '_blank');
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

                if (typeof (row.buyersrelname) != 'undefined' && row.buyersrelname && row.buyersrelname != 0 && row.buyersrelname != 'null') {
                    return row.buyersrelname
                } else if (typeof (row.buyersname) != 'undefined' && row.buyersname) {
                    // console.log(row.buyersname)
                    // console.log(row.buyersname.split('@')[0])
                    return row.buyersname.split('@')[0]
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

    .fontset {
        font-weight: bolder;
    }

    .fontcolor {
        color: #42b983;
    }

    .divcolorred {
        color: red;
    }

    .divcolorblue {
        color: #42b983;
    }
</style>