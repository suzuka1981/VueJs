<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        label="Transaction ID"
                        width="130">
                    <template slot-scope="scope">
                        {{ scope.row.id }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="From"
                        prop="from"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="To"
                        prop="to"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="Items"
                        prop="items"
                        width="250">
                </el-table-column>
                <el-table-column
                        label="Unit price"
                        prop="unitprice"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="Quantity"
                        prop="quantity"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="Location"
                        prop="location"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="Date"
                        prop="date"
                        width="150">
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
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

            }
        },
        methods: {

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

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>