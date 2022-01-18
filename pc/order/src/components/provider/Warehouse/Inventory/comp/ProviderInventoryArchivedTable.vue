<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <!--            @selection-change="handleSelectionChange"-->
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
            >
                <!--                <el-table-column-->
                <!--                        type="selection"-->
                <!--                        width="55">-->
                <!--                </el-table-column>-->
                <el-table-column
                        label="ID#"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.id }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Product"
                        width="600">
                    <template slot-scope="scope">
                        <div :class="{'newFontBolder':scope.row.conditionvalue==='new'}">
                            {{scope.row.conditionvalue.charAt(0).toUpperCase()+scope.row.conditionvalue.slice(1)}}
                            <span v-html="scope.row.name" style="white-space: pre-wrap"></span>
                        </div>
                        <div class="divofflex">
                            $
                            <span v-html="scope.row.price" style="white-space: pre-wrap"></span>
                        </div>
                        <div v-for="item in getArr(scope.row.note)">
                            <a :href="getHref(item)" target="_blank">
                                {{item}}
                            </a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="UPC"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.upc }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Inbound"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.suminbound }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="In-stock"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.suminstock }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Value"
                        width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.value">$</span>
                        {{ toHandelMoney(scope.row.sumvalue) }}
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
                                @click="handleDetail(scope.row)">Detail
                        </el-button>

                        &nbsp

                        <el-button
                                type="text"
                                size="mini"
                                @click="handleRestore(scope.row)">Restore
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[50,100, 200, 500]"
                        :page-size="pageInfo.pageSize"
                        layout=" sizes, prev, pager, next"
                        :total="pageInfo.total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {toMoney} from "../../../../utils/toMoney";

    export default {
        name: "Table",
        props: {
            tableData: [],
            propsMsg: '',
            pageInfo: {},
        },
        data() {
            return {

            }
        },

        methods: {
            toHandelMoney(val){
                if(val){
                    return toMoney(val + '')
                }
            },
            handleSelectionChange(val) {
                this.$emit('func', val)
            },
            handleDetail(row) {
                //传父数据
                this.$emit('funcDetail', row)
            },
            handleDetail(row) {
                //传父数据
                this.$emit('funcDetail', row)
            },
            handleRestore(item) {
                this.$confirm('Are you sure to restore this product?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.$emit('funcEditnote', item, 'restore')
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
                this.$emit('funcSizeChange', val)
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
                // console.log(`当前页: ${val}`);
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