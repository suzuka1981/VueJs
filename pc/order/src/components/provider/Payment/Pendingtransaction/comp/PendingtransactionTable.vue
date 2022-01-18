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
                        prop="releasedate"
                        label="Release date">
                    <template slot-scope="scope">{{ getReleaseDate(scope.row) }}</template>
                </el-table-column>
                <el-table-column
                        width="170"
                        prop="buyersusername"
                        label="User">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        width="550"
                        prop="name"
                        label="Product">
                </el-table-column>
                <el-table-column
                        width="150"
                        label="Unit price * Qty">
                    <template slot-scope="scope">
                        ${{handelToMaoney(scope.row.price)}}
                        <!--                        <span v-show="scope.row.onlyshiptowarehouse == 'false' && scope.row.bonus">-->
                        <!--                            ({{ scope.row.bonus}})-->
                        <!--                        </span>-->
                        *
                        {{scope.row.quantity}}
                    </template>
                </el-table-column>
                <el-table-column
                        width="120"
                        label="Total">
                    <template slot-scope="scope">
                        ${{getTotal(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="type"
                        label="Warehouse">
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // handleAdd(row) {
            //     //传父数据
            //     this.$emit('func', row)
            // },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            getMember(row) {
                if (typeof (row.selfrelname) != 'undefined' && row.selfrelname && row.selfrelname != 0 && row.selfrelname != 'null') {
                    return row.selfrelname
                } else if (typeof (row.buyersusername) != 'undefined') {
                    return row.buyersusername.split('@')[0]
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