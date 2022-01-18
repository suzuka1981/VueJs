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
                        label="ID"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                        label="Order Date"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.orderdate }}</template>
                </el-table-column>
                <el-table-column
                        label="Item Link"
                        width="350">
                    <template slot-scope="scope">
                        <div v-html="scope.row.itemlink"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Item Name"
                        width="550">
                    <template slot-scope="scope">{{ scope.row.itemname }}</template>
                </el-table-column>
                <el-table-column
                        label="Unit Cost"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.unitcost }}</template>
                </el-table-column>
                <el-table-column
                        label="Unit Take"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.unittake }}</template>
                </el-table-column>
                <el-table-column
                        label="Quantity"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.quantity }}</template>
                </el-table-column>
                <el-table-column
                        label="Merchant"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.merchant }}</template>
                </el-table-column>
                <el-table-column
                        label="Web User"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.webuser }}</template>
                </el-table-column>
                <el-table-column
                        label="Destination"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.destination }}</template>
                </el-table-column>
                <el-table-column
                        label="Ship to address"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.shiptoaddress }}</template>
                </el-table-column>
                <el-table-column
                        label="Order ID"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.orderid }}</template>
                </el-table-column>
                <el-table-column
                        label="Source"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.source }}</template>
                </el-table-column>
                <el-table-column
                        label="Source ID"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.sourceid }}</template>
                </el-table-column>
                <el-table-column
                        label="Status"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.status }}</template>
                </el-table-column>
                <el-table-column
                        label="Delivered Date"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.delivereddate }}</template>
                </el-table-column>
                <el-table-column
                        label="Carrier"
                        width="220">
                    <template slot-scope="scope">{{ scope.row.carrier }}</template>
                </el-table-column>
                <el-table-column
                        label="Tracking Number"
                        width="220">
                    <template slot-scope="scope">{{ scope.row.trackingnumber }}</template>
                </el-table-column>
                <el-table-column
                        label="Note"
                        width="220">
                    <template slot-scope="scope">{{ scope.row.note }}</template>
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                        width="200px"
                >
                    <template slot-scope="scope">
                        <el-button type="text"
                                size="mini"
                                @click="handleEdit(scope.row)" v-show="propsMsg==='active'">Edit
                        </el-button>
                        <el-button type="text"
                                size="mini"
                                @click="handleClone(scope.row)" v-show="propsMsg==='active'">Clone
                        </el-button>

                        <el-button type="text"
                                   size="mini"
                                   @click="confirmClick(scope.row)">Delete</el-button>
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
            handleEdit(row) {
                //传父数据
                this.$emit('func', row, 'edit')
            },
            handleClone(row) {
                //传父数据
                this.$emit('func', row, 'clone')
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            confirmClick(row) {
                this.$confirm('Are you sure to delete this site?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: 'Ok!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel'
                    });
                });            }
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