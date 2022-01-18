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
                        label="Tracking number"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.trackingnumber }}</template>
                </el-table-column>
                <el-table-column
                        label="UPC"
                        width="100">
                    <template slot-scope="scope">{{ scope.row.upc }}</template>
                </el-table-column>
                <el-table-column
                        prop="quantity"
                        label="Quantity"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="organization"
                        label="Organization"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="warehouse"
                        label="Warehouse"
                        width="140"
                >
                </el-table-column>
                <el-table-column
                        prop="confirmed"
                        label="Confirmed"
                        width="300"
                >
                </el-table-column>
                <el-table-column
                        prop="received"
                        label="Received"
                        width="175"
                        show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                        show-overflow-tooltip
                >
                    <template slot-scope="scope">

                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[15, 30, 50, 100]"
                        :page-size="15"
                        layout=" sizes, prev, pager, next"
                        :total="400">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: {
            tableData: [],
            propsMsg: '',
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
            // handleConfirm(row) {
            //     //传父数据
            //     this.$emit('func',row)
            // },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
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