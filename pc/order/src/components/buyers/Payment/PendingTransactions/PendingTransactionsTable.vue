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
                        label="Release date"
                        width="170">
                    <template slot-scope="scope">{{ getReleaseDate(scope.row) }}</template>
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="Organization"
                        width="170">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="Product"
                        width="550"
                >
                </el-table-column>
                <el-table-column
                        prop="unitpriceqty"
                        label="Unit price * Qty"
                        width="175"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        ${{ handelToMaoney(scope.row.price)}}
<!--                        <span v-show="scope.row.onlyshiptowarehouse == 'false' && scope.row.bonus">-->
<!--                            ({{ scope.row.bonus}})-->
<!--                        </span>-->
                        *
                        {{ scope.row.quantity}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="total"
                        label="Total"
                        width="175"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        ${{getTotal(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="Warehouse"
                        width="200"
                        show-overflow-tooltip>
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
    import {formatDate} from '../../../utils/dateFormat.js'
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
            // handleConfirm(row) {
            //     //传父数据
            //     this.$emit('func', row)
            // },

            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            getTotal(row) {
                return this.handelToMaoney(row.price * row.quantity)
                //
                // if (row.onlyshiptowarehouse == 'false' && row.bonus) {
                //     return (row.price + row.bonus) * row.quantity
                // } else {
                //     return row.price * row.quantity
                // }
            },
            getReleaseDate(row) {
                let tmpDate = formatDate(this.addDay(row.pendingperioddays, row.createdate), "MM-dd-yyyy hh:mm")
                if ((tmpDate.slice(11, 13) - 12) > 0) {

                    return tmpDate.slice(0, 11) + '0' + (tmpDate.slice(11, 13) - 12) + tmpDate.slice(13, tmpDate.length) + ' PM'
                } else {
                    return tmpDate + ' AM'
                }
                return tmpDate
            },

            addDay(dayNumber, date) {
                date = date ? date : new Date();
                date = new Date(date)
                var ms = dayNumber * (1000 * 60 * 60 * 24)

                var newDate = new Date(date.getTime() + ms);

                return newDate;
            },
            getMember(row) {
                if (typeof (row.sellerrelname) != 'undefined' && row.sellerrelname && row.sellerrelname != 0 && row.sellerrelname != 'null') {
                    return row.sellerrelname
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