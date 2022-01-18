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
                        width="50">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                        label="Offer id#"
                        width="100">
                    <template slot-scope="scope">{{ scope.row.buyersTaskList.offerid }}</template>
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="Organization"
                        sortable
                        width="150">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Item"
                        width="630"
                >
                    <template slot-scope="scope">
                        <div :class="{'linethrough':getlinethrough(scope.row.buyersTaskList)}">
                            <span v-if="scope.row.warehouseProduct">
                            <span v-show="scope.row.warehouseProduct.conditionvalue"> {{scope.row.warehouseProduct.conditionvalue.charAt(0).toUpperCase()+scope.row.warehouseProduct.conditionvalue.slice(1)}}
                                &nbsp;-&nbsp;
                            </span>
                            <span v-show="scope.row.warehouseProduct.name">{{scope.row.warehouseProduct.name}}</span>
                            </span>
                        </div>
                        </br>
                        <div v-for="item in getArr(scope.row.buyersTaskList.note)">
                            <a :href="getHref(item)" target="_blank">
                                {{item}}
                            </a>
                        </div>
                        </br>
                        <div>
                            <i class="el-icon-user-solid iconsize" style="font-size: 22px"></i>
                            <span v-show="scope.row.buyersTaskList.visibletoallmembers==='true'">
                                Visible to all members
                            </span>
                            <span v-show="scope.row.buyersTaskList.visibletoallmembers==='false'">
                                Only visible to limited
                            </span>
                            &nbsp;
                            &nbsp;
                            <i class="el-icon-alarm-clock" style="font-size: 22px"></i>
                            Valid: {{getDateNohouse(scope.row.buyersTaskList.createdate)}}
                            <span>
                                {{expirationdatesub(scope.row.buyersTaskList)}}
                            </span>

                            &nbsp;
                            &nbsp;
                            <i class="el-icon-alarm-clock" style="font-size: 22px"></i>
                            Pending period: {{scope.row.buyersTaskList.pendingperioddays}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Send-to"
                        width="100"
                        prop="type"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="Price($)"
                        width="105"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>
                            {{bonusshow(scope.row)}}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="quantity"
                        label="Quantity"
                        width="150"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="createdate"
                        label="Canceled Time"
                        width="180"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{getDate(scope.row.createdate)}}
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
            getDateNohouse(data) {
                return  formatDate(new Date(data), "MM-dd-yyyy")
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
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
            getlinethrough(row) {
                let exTime = new Date(row.expirationdate).valueOf()
                let now = new Date().valueOf()

                if (now > exTime) {
                    return true;
                } else {
                    return false;
                }
            },
            bonusshow(row) {
                return toMoney(row.price + '')

                // if (row.onlyshiptowarehouse === 'false' && row.bonus !== null) {
                //     return (row.price + row.bonus) + '+ (' + row.bonus + ')'
                // } else {
                //     return row.price
                // }
            },
            getMember(row) {
                if (typeof (row.sellerrelname) != 'undefined' && row.sellerrelname && row.sellerrelname != 0 && row.sellerrelname != 'null') {
                    return row.sellerrelname
                } else if (typeof (row.username) != 'undefined') {
                    return row.username.split('@')[0]
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
        },
    }
</script>

<style scoped>
    .block {
        margin-top: 10px;
        margin-right: 5px;
        display: flex;
        justify-content: flex-end;
    }

    /*.linethrough {*/
    /*    text-decoration-line: line-through;*/
    /*}*/
</style>