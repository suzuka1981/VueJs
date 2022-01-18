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
                        width="90">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                        prop="productname"
                        label="Product name"
                        sortable
                        width="170">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="upc"
                        label="UPC"
                        width="250"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="quantity"
                        label="Quantity"
                        width="100"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.productsize.toship}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="unitcost"
                        label="Unit cost"
                        width="100"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.productsize.unitcost}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="unitprice"
                        label="Unit price"
                        width="100"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.productsize.unitprice}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="totalcost"
                        label="Total cost"
                        width="100"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.productsize.toship * scope.row.productsize.unitcost}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="totalprice"
                        label="Total price"
                        width="100"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.productsize.toship * scope.row.productsize.unitprice}}
                    </template>
                </el-table-column>
            </el-table>
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
                multipleSelection: [],
            }
        },

        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // handleConfirm(row,type) {
            //     //传父数据
            //     this.$emit('func', row,type)
            // },

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