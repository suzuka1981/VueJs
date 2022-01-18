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
                        label="Name"
                        width="300">
                    <template slot-scope="scope">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Sender name"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.sendername }}"
                    </template>
                </el-table-column>
                <el-table-column
                        label="Sku"
                        width="150">
                    <template slot-scope="scope">
                        {{ scope.row.sku }}"
                    </template>
                </el-table-column>
                <el-table-column
                        label="Details"
                        width="200">
                    <template slot-scope="scope">
                        <div>
                            <div class="fontbolder">
                                Size(L/W/H):
                            </div>
                            <span>{{scope.row.packaging}}</span>
                        </div>

                        <div>
                            <span class="fontbolder">
                                Weight:
                            </span>
                            <span>{{scope.row.weight}}lbs</span>
                        </div>

                        <div>
                            <span class="fontbolder">
                                Signature:
                            </span>
                            <span>{{scope.row.signatureservice}}</span>
                        </div>

                        <div>
                            <span class="fontbolder">
                                Memo:
                            </span>
                            <span>{{scope.row.memo}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Service type"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.servicetype }}"
                    </template>
                </el-table-column>
                <el-table-column
                        label="Shipping service"
                        width="180">
                    <template slot-scope="scope">
                        {{ scope.row.shippingservice }}"
                    </template>
                </el-table-column>
                <el-table-column
                        label="Other services"
                        width="180">
                    <template slot-scope="scope">
                        {{ scope.row.otherservices }}"
                    </template>
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
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleDelete(scope.row)">Delete
                        </el-button>
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
            handleDelete(row) {
                this.$confirm('Are you sure to delete this template?', 'Tips', {
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
                });
            },
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

    .fontbolder{
        font-weight: bolder;
    }
</style>