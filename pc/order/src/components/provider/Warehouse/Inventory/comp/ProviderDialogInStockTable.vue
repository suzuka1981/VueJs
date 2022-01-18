<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
<!--                <el-table-column-->
<!--                        label="ID"-->
<!--                        width="120">-->
<!--                    <template slot-scope="scope">-->
<!--                        {{ scope.row.id }}-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column
                        label="User"
                        prop="user"
                        width="350">
                    <template slot-scope="scope">
                        <div v-show="scope.row.type=='self'">
                            {{getMember(scope.row)}}
<!--                            {{scope.row.type}}-->
                        </div>
                        <div v-show="!scope.row.type">
                            <span>Bizblock warehouse</span>
                        </div>
<!--                        {{getMember(scope.row)}}-->
                    </template>
                </el-table-column>
                <el-table-column
                        label="Site"
                        prop="site"
                        width="350">
                    <template slot-scope="scope">
                        <span v-show="scope.row.sendto == 'self'">
                            {{scope.row.selfsitename}}
                            -
                            {{scope.row.selfaddress1}}
                        </span>
                        <span v-show="!scope.row.sendto">
                            {{scope.row.sitename}}
                            -
                            {{scope.row.address1}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Quantity"
                        prop="quantity"
                        width="300">
                    <template slot-scope="scope">
                        <div v-show="scope.row.type=='self'">
                            {{scope.row.quantity}}
                        </div>
                        <div v-show="!scope.row.type">
                            {{scope.row.epquantity}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="detailPageInfo.pageSize"
                        layout=" sizes, prev, pager, next"
                        :total="detailPageInfo.total">
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
            detailPageInfo: {},
        },
        data() {
            return {

            }
        },
        methods: {
            handleSizeChange(val) {
                this.$emit('funcDetailSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcDetailCurrentChange', val)
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

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>