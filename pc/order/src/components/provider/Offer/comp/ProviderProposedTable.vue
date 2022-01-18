<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
<!--            @selection-change="handleSelectionChange"-->
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
            >
<!--                <el-table-column-->
<!--                        type="selection"-->
<!--                        width="40">-->
<!--                </el-table-column>-->
                <el-table-column
                        label="ID#"
                        width="55">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                        prop="member"
                        label="Member"
                        width="100">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Offer"
                        width="620"
                >
                    <template slot-scope="scope">
                        <div :class="{'linethrough':getlinethrough(scope.row)}">
                            <span v-show="scope.row.warehouseProduct.conditionvalue"> {{scope.row.warehouseProduct.conditionvalue.charAt(0).toUpperCase()+scope.row.warehouseProduct.conditionvalue.slice(1)}}
                                &nbsp;-&nbsp;
                            </span>
                            <span v-show="scope.row.warehouseProduct.name">{{scope.row.warehouseProduct.name}}</span>
                        </div>
                        </br>
                        <div v-for="item in getArr(scope.row.note)">
                            <a :href="getHref(item)" target="_blank">
                                {{item}}
                            </a>
                        </div>
                        </br>
                        <div>
                            <i class="el-icon-user-solid iconsize" style="font-size: 22px"></i>
                            <span v-show="scope.row.visibletoallmembers==='true'">
                                Visible to all members
                            </span>
                            <span v-show="scope.row.visibletoallmembers==='false'">
                                Only visible to limited
                            </span>
                            &nbsp;
                            <i class="el-icon-alarm-clock" style="font-size: 22px"></i>
                            Valid: {{getDateNohouse(scope.row.createdate)}}
                            <span>
                                {{expirationdatesub(scope.row)}}
                            </span>

                            &nbsp;
                            &nbsp;
                            <i class="el-icon-alarm-clock" style="font-size: 22px"></i>
                            Pending period: {{scope.row.pendingperioddays}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="Price"
                        width="100"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>
                            {{bonusshow(scope.row)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="wprice"
                        label="Origin price"
                        width="110px"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="subquantity"
                        label="Quantity"
                        width="120px"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="createdate"
                        label="Create time"
                        width="180px"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{getDate(scope.row.createdate)}}
                    </template>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                        width="200px"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleApprove(scope.row)" v-show="propsMsg==='proposed'">Approve
                        </el-button>
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleDeny(scope.row)" v-show="propsMsg==='proposed'">Deny
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
    import {formatDate} from "../../../utils/dateFormat";
    import {toMoney} from '../../../utils/toMoney.js'

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
            getDateNohouse(data) {
                return  formatDate(new Date(data), "MM-dd-yyyy")
            },
            getMember(row) {
                if (typeof (row.selfrelname) != 'undefined' && row.selfrelname && row.selfrelname != 0 && row.selfrelname != 'null') {
                    return row.selfrelname
                } else if (typeof (row.selfname) != 'undefined') {
                    return row.selfname.split('@')[0]
                }
            },
            getDate(data) {
                let tmpDate = formatDate(new Date(data), "MM-dd-yyyy hh:mm")
                if ((tmpDate.slice(11, 13) - 12) > 0) {

                    return tmpDate.slice(0, 11) + '0' + (tmpDate.slice(11, 13) - 12) + tmpDate.slice(13, tmpDate.length) + ' PM'
                } else {
                    return tmpDate + ' AM'
                }
                return tmpDate
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleApprove(row) {
                //传父数据
                this.$emit('funcApprove', row)
            },
            handleDeny(row) {
                //传父数据
                this.$emit('funDeny', row)
            },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },

            getlinethrough(row) {
                let exTime = new Date(row.expirationdate).valueOf()
                let now = new Date().valueOf()

                if (now > exTime) {
                    return true;
                } else {
                    return false;
                }
            },
            getArr(note) {
                if (note !== null) {
                    let tmp = note.split(/[(\r\n)\r\n]+/)
                    return tmp
                }
            },
            getHref(item) {
                if (item !== null) {
                    if (item.indexOf('http') >= 0) {
                        return item
                    }
                }
            },
            expirationdatesub(row) {
                if (row.expirationdate === null) {
                    return;
                } else {
                    return '- ' + this.getDateNohouse(row.expirationdate)
                }
            },
            bonusshow(row) {
                return toMoney(row.price + '')
                // if ((row.onlyshiptowarehouse === 'false' || row.onlyshiptowarehouse === false) && row.bonus !== null) {
                //     return (row.price) + '+ (' + row.bonus + ')'
                // } else {
                //     return row.price
                // }
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