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
                    <template slot-scope="scope">
                        {{ scope.row.trackingnumber }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="upcsku"
                        label="UPC/SKU(SN)"
                        width="130">
                    <template slot-scope="scope">
                        <div v-html="scope.row.upcsku" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="450"
                        prop="description"
                        label="Description">
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="quantity"
                        label="Quantity(0)">
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="warehouse"
                        label="Warehouse">
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="confirmed"
                        label="Confirmed">
                    <template slot-scope="scope">
                        <i v-show="scope.row.confirmed" class="el-icon-success sizeoficon"></i>
                    </template>
                </el-table-column>
                <el-table-column
                        width="80"
                        prop="linked"
                        label="Linked">
                    <template slot-scope="scope">
                        <i v-show="scope.row.linked" class="el-icon-success sizeoficon"></i>
                    </template>
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="received"
                        label="Received">
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <!--                        <el-button-->
                        <!--                                type="text"-->
                        <!--                                size="mini"-->
                        <!--                                @click="handleAdd(scope.row)">Add-->
                        <!--                        </el-button>-->
                    </template>
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
                multipleSelection: []
            }
        },

        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // handleAdd(row) {
            //     //传父数据
            //     this.$emit('func', row)
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