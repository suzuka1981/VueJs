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
                        label="Site name"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.sitename }}</template>
                </el-table-column>
                <el-table-column
                        label="Unit Code"
                        width="120">
                    <template slot-scope="scope">{{ scope.row.contact }}</template>
                </el-table-column>
                <el-table-column
                        label="Address1"
                        width="220">
                    <template slot-scope="scope">{{ scope.row.address1 }}</template>
                </el-table-column>
                <el-table-column
                        label="Address2"
                        width="220">
                    <template slot-scope="scope">{{ scope.row.address2 }}</template>
                </el-table-column>
                <el-table-column
                        label="State"
                        width="150">
                    <template slot-scope="scope">
                        {{optionResult(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="City"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="zip"
                        label="Zip"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="Phone"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleEdit(scope.row)">Edit
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[5, 10, 50, 100]"
                        :page-size="pageInfo.pageSize"
                        layout=" sizes, total,prev, pager, next"
                        :total="pageInfo.total">
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
            pageInfo: {},
            optionsOfStates: [],
        },
        data() {
            return {
                multipleSelection: [],

            }
        },
        methods: {
            optionResult(val) {
                let retsult = null
                this.optionsOfStates.forEach(function (item) {
                    if (item.value.indexOf(val) >= 0) {
                        // console.log(item.label)
                        retsult = item.label
                    }
                })

                return retsult
                // console.log(retsult)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
                // console.log(`当前页: ${val}`);
            },
            handleEdit(row) {
                this.$emit('funcEdit', 'edit', row)
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