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
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="ID#"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.id }}
                        <i class="el-icon-s-flag" style="font-size: 6px;" v-show="scope.row.participated"></i>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sellerusername"
                        label="Organization"
                        width="150">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Offer"
                        width="750"
                >
                    <template slot-scope="scope">
<!--                        <div :class="{'linethrough':getlinethrough(scope.row)}">-->
                            <span v-show="scope.row.warehouseProduct.conditionvalue">
                                {{scope.row.warehouseProduct.conditionvalue.charAt(0).toUpperCase()+scope.row.warehouseProduct.conditionvalue.slice(1)}}
                                &nbsp;-&nbsp; </span>
                            <span v-show="scope.row.warehouseProduct.name">{{scope.row.warehouseProduct.name}}</span>
<!--                        </div>-->
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
                        label="Price ($)"
                        width="200"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>
                            {{bonusshow(scope.row)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="usedquantity"
                        label="Quantity"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <el-button
                                v-show="scope.row.usedquantity > 0"
                                type="text"
                                size="mini"
                                @click="handleTake(scope.row, 'take')">Take
                        </el-button>

                        <el-button
                                v-show="scope.row.usedquantity == 0"
                                type="text"
                                size="mini"
                                @click="handlePropose(scope.row,'propose')">Propose
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
    import {toMoney} from "../../../utils/toMoney";
    import {formatDate} from "../../../utils/dateFormat";

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
            handleTake(row, type) {
                //传父数据
                this.$emit('func', row, type)
            },
            handlePropose(row, type) {
                //传父数据
                this.$emit('func', row, type)
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
                if (row.onlyshiptowarehouse === 'false' && row.bonus !== null) {
                    return toMoney(row.price + '') + ' + (' + row.bonus + ')'
                } else {
                    return toMoney(row.price + '')
                }
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

    .linethrough {
        text-decoration-line: line-through;
    }
</style>