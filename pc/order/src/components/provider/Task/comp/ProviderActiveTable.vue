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
                        width="90">
                    <template slot-scope="scope">{{ scope.row.offerid }}</template>
                </el-table-column>
                <el-table-column
                        prop="selfname"
                        label="Member"
                        width="120">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="item"
                        label="Item"
                        width="400"
                >
                    <template slot-scope="scope">
                        <div :class="{'linethrough':getlinethrough(scope.row)}">
                            <span v-show="scope.row.warehouseProduct.conditionvalue">
                                {{scope.row.warehouseProduct.conditionvalue.charAt(0).toUpperCase()+scope.row.warehouseProduct.conditionvalue.slice(1)}}
                                &nbsp;-&nbsp;
                            </span>

                            <span v-show="scope.row.warehouseProduct.name">{{scope.row.warehouseProduct.name}}</span>
                        </div>
                        <!--                        </br>-->
                        <!--                        <div v-for="item in getArr(scope.row.note)">-->
                        <!--                            <a :href="getHref(item)" target="_blank">-->
                        <!--                                {{item}}-->
                        <!--                            </a>-->
                        <!--                        </div>-->
                        <!--                        </br>-->
                        <!--                        <div>-->
                        <!--                            <i class="el-icon-user-solid iconsize" style="font-size: 22px"></i>-->
                        <!--                            <span v-show="scope.row.visibletoallmembers==='true'">-->
                        <!--                                Visible to all members-->
                        <!--                            </span>-->
                        <!--                            <span v-show="scope.row.visibletoallmembers==='false'">-->
                        <!--                                Only visible to limited-->
                        <!--                            </span>-->
                        <!--                            &nbsp;-->
                        <!--                            &nbsp;-->
                        <!--                            <i class="el-icon-alarm-clock" style="font-size: 22px"></i>-->
                        <!--                            Valid: {{scope.row.createdate.substring(0,10)}}-->
                        <!--                            <span>-->
                        <!--                                {{expirationdatesub(scope.row)}}-->
                        <!--                            </span>-->

                        <!--                            &nbsp;-->
                        <!--                            &nbsp;-->
                        <!--                            <i class="el-icon-alarm-clock" style="font-size: 22px"></i>-->
                        <!--                            Pending period: {{scope.row.pendingperioddays}}-->
                        <!--                        </div>-->
                    </template>
                </el-table-column>
                <el-table-column
                        label="Send-to"
                        width="130"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleWarehouseClick(scope.row)" v-show="scope.row.sendto==='warehouse'">{{
                            scope.row.sendto }}
                        </el-button>
                        <span v-show="scope.row.sendto!=='warehouse'">
                            {{ scope.row.sendto }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="Price"
                        width="95"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>
                            {{bonusshow(scope.row)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="subquantity"
                        label="Total qty"
                        width="100"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="usedquantity"
                        label="Unconfirmed qty"
                        width="150"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="createdate"
                        label="Create time"
                        width="180"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{getDate(scope.row.createdate)}}
                    </template>
                </el-table-column>

                <el-table-column
                        width="150"
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <div class="divflex">
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="handleCancel(scope.row)" v-show="propsMsg==='active'">Cancel
                            </el-button>
                        </div>
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCancel(row) {
                //传父数据
                this.$emit('funCancel', row)
            },
            handleWarehouseClick(row) {
                //传父数据
                this.$emit('funWarehouseClick', row)
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
                    return '- ' + row.expirationdate.substring(0, 10)
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
                // if ((row.onlyshiptowarehouse === 'false' || row.onlyshiptowarehouse === false) && row.bonus !== null && row.sendto !== 'warehouse') {
                //     return (row.price) + '+ (' + row.bonus + ')'
                // } else {
                //     return row.price
                // }
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

    /deep/ .divflex {
        display: flex;
        /*justify-content: space-between;*/
    }

    .el-button {
        margin-right: 10px;
    }

    /*.linethrough {*/
    /*    text-decoration-line: line-through;*/
    /*}*/
</style>