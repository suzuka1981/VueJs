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
                        label="Organization"
                        width="220">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="buyersAndSellersstatus"
                        label="Status"
                        width="200">

                    <template slot-scope="scope">
                        <!--                        状态：0 等待确认 1已经确认通过-->
                        <div v-show="scope.row.buyersAndSellersstatus===1">
                            accepted
                        </div>
                        <div v-show="scope.row.buyersAndSellersstatus===2">
                            Waiting for approval
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                        show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button type="text"
                                   size="mini"
                                   @click="handleUnsubscribe(scope.row)">Cancel
                        </el-button>
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
                multipleSelection: []
            }
        },

        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleUnsubscribe(row) {
                this.$confirm('Are you sure to unsubscribe organization unitedelectronicsdeals?', 'Tips', {
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
            getMember(row) {
                if (typeof (row.name) != 'undefined' && row.name && row.name != 0 && row.name != 'null') {
                    return row.name
                } else if (typeof (row.username) != 'undefined') {
                    return row.username.split('@')[0]
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