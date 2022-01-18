<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
<!--                <el-table-column-->
<!--                        label="ID#"-->
<!--                        width="120">-->
<!--                    <template slot-scope="scope">-->
<!--                        {{ scope.row }}-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column
                        prop="product"
                        label="Product"
                        width="450">
                    <template slot-scope="scope">
                        <div v-if="scope.row.conditionvalue"
                             :class="{'newFontBolder':scope.row.conditionvalue==='new'}">
                            {{scope.row.conditionvalue.charAt(0).toUpperCase()+scope.row.conditionvalue.slice(1)}}

                            <span v-html="scope.row.name" style="white-space: pre-wrap"></span>
                            <span v-html="scope.row.whpname" style="white-space: pre-wrap"></span>
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
                        prop="user"
                        label="User name">
                    <template slot-scope="scope">
                        <div v-show="scope.row.type=='self'">
                            {{getMember(scope.row)}}
                        </div>
                        <div v-show="!scope.row.type">
                            <span>Bizblock warehouse</span>
                        </div>
                        <!--                        {{getMember(scope.row)}}-->
                    </template>
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="site"
                        label="Site">
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
                        width="150"
                        sortable
                        prop="qty"
                        label="Quantity">
                    <template slot-scope="scope">
                        <div v-show="scope.row.type=='self'">
                            {{scope.row.quantity}}
                        </div>
                        <div v-show="!scope.row.type">
                            {{scope.row.epquantity}}
                        </div>
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
                                @click="handleAdd(scope.row)">Add
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
            getMember(row) {
                if (typeof (row.name) != 'undefined' && row.name && row.name != 0 && row.name != 'null') {
                    return row.name
                } else if (typeof (row.username) != 'undefined') {
                    return row.username.split('@')[0]
                }
            },
            getArr(note) {
                if (note) {
                    let tmp = note.split(/[(\r\n)\r\n]+/)
                    return tmp
                } else{
                    return note
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
            handleAdd(row) {
                let tmp = {
                    instockdata: row,
                    productdata: row,
                }
                //传父数据
                this.$emit('func', tmp)
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