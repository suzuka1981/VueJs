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
                        label="Tracking#"
                        width="250">
                    <template slot-scope="scope">{{ scope.row.tracking }}</template>
                </el-table-column>
                <el-table-column
                        prop="usedquantity"
                        label="Qty"
                        width="150"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="lastupdate"
                        label="Date"
                        width="250"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
<!--                        {{ scope.row.lastupdate.substring(0,10) }}-->
                        {{ getReleaseDate(scope.row.lastupdate,1) }}
                    </template>
                </el-table-column>
                <el-table-column
                        type="selection"
                        width="125">
                </el-table-column>
            </el-table>

<!--            <div class="block">-->
<!--                <el-pagination-->
<!--                        @size-change="handleSizeChange"-->
<!--                        @current-change="handleCurrentChange"-->
<!--                        :page-sizes="[5, 10, 30, 100]"-->
<!--                        :page-size="confirmpageInfo.pageSize"-->
<!--                        layout=" sizes, prev, pager, next"-->
<!--                        :total="confirmpageInfo.total">-->
<!--                </el-pagination>-->
<!--            </div>-->
        </el-card>
    </div>
</template>

<script>
    import {formatDate} from "../../../utils/dateFormat";

    export default {
        name: "Table",
        props: {
            tableData: [],
            propsMsg: '',
            confirmpageInfo: {},
        },
        data() {
            return {
                multipleSelection: []
            }
        },

        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;

                this.$emit('funcmultipleSelectionChange', this.multipleSelection)
            },
            // handleConfirm(row,type) {
            //     //传父数据
            //     this.$emit('func', row,type)
            // },

            handleSizeChange(val) {
                this.$emit('funcConfirmSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcConfirmCurrentChange', val)
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