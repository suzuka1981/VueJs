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
                        width="50">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                        label="Organization"
                        width="200">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Product"
                        width="570">
                    <template slot-scope="scope">
                        {{scope.row.conditionvalue}} -
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="upc"
                        label="UPC"
                        width="200"
                >
                    <template slot-scope="scope">{{ scope.row.upc }}</template>
                </el-table-column>
                <el-table-column
                        prop="quantity"
                        label="Quantity"
                        width="150"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                        show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleDetail(scope.row)" v-show="propsMsg==='active'">Detail
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[50, 100, 200, 300]"
                        :page-size="pageInfo.pageSize"
                        layout=" sizes, prev, pager, next"
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
            handleDetail(row) {
                //传父数据
                this.$emit('func', row)
            },

            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            getArr(note) {
                if (note !== null) {
                    let tmp = note.split(/[(\r\n)\r\n]+/)
                    return tmp
                }
            },
            getHref(item) {
                if (item !== null) {
                    if (item.indexOf('http') >= 0) {
                        return item
                    }
                }
            },
            expirationdatesub(row) {
                if (row.expirationdate === null) {
                    return;
                } else {
                    return '- ' + row.expirationdate.substring(0, 10)
                }
            },
            getlinethrough(row) {
                let exTime = new Date(row.expirationdate).valueOf()
                let now = new Date().valueOf()

                if (now > exTime) {
                    return true;
                } else {
                    return false;
                }
            },
            bonusshow(row) {
                if (row.onlyshiptowarehouse === 'false' && row.bonus !== null) {
                    return (row.price + row.bonus) + '+ (' + row.bonus + ')'
                } else {
                    return row.price
                }
            },
            getMember(row) {
                if (typeof (row.sellerrelname) != 'undefined' && row.sellerrelname && row.sellerrelname != 0 && row.sellerrelname != 'null') {
                    return row.sellerrelname
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

    /*.linethrough {*/
    /*    text-decoration-line: line-through;*/
    /*}*/
</style>