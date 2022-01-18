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
                        label="ID#"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.id }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="product"
                        label="Product"
                        width="750">
                    <
                    <template slot-scope="scope">
                        <div v-if="scope.row.conditionvalue"
                             :class="{'newFontBolder':scope.row.conditionvalue==='new'}">
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
                        width="150"
                        label="Quantity">
                    <template slot-scope="scope">
                        {{ scope.row.suminstock }}
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
                                @click="handleSelect(scope.row)">Select
                        </el-button>

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
                        :page-sizes="[500,1000, 2000, 5000]"
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(row) {
                //传父数据
                this.$emit('func', row)
            },
            handleSelect(row) {
                //传父数据
                this.$emit('funcSelect', row)
            },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
                // console.log(`当前页: ${val}`);
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