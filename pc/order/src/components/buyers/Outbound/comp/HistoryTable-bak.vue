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
                        label="Info"
                        width="250">
                    <template slot-scope="scope">
                        <div v-html="scope.row.info"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Service type"
                        width="150">
                    <template slot-scope="scope">{{ scope.row.servicetype }}</template>
                </el-table-column>
                <el-table-column
                        label="Outbound shipment <--> Quantity"
                        width="400">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top" v-show="scope.row.Instructions!==''">
                            <p>Instructions: {{ scope.row.Instructions }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">
                                    <div v-html="scope.row.outboundshipmentquantity"></div>
                                </el-tag>
                            </div>
                        </el-popover>
                        <div v-html="scope.row.outboundshipmentquantity" v-show="scope.row.Instructions===''"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tracking"
                        label="Tracking#"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        prop="pkgqty"
                        label="Pkg qty"
                        width="75"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="createtime"
                        label="Create time"
                        width="150"
                        show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleDetails(scope.row)" v-show="propsMsg==='active'">Details
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
            handleDetails(row) {
                //传父数据
                this.$emit('func', row)
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
</style>