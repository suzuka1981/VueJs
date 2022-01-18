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
                        width="500">
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
                        label="Incoming"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.suminbound }}
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
                                @click="handleAddOffer(scope.row)">Add offer
                        </el-button>

                        &nbsp

                        <el-tooltip class="item" effect="dark" content="Open label" placement="top">
                            <el-dropdown trigger="click"
                                         @command="handleCommand"
                            >
                              <span class="el-dropdown-link">
                                  Other
                                <i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="commandValue('Edit',scope.row)">Edit
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="commandValue('Archive',scope.row)">Archive
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-tooltip>
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
    import {toMoney} from '../../../../utils/toMoney.js'

    export default {
        name: "Table",
        props: {
            tableData: [],
            propsMsg: '',
            pageInfo: {},
        },
        data() {
            return {}
        },
        methods: {
            toHandelMoney(val){
                if(val){
                    return toMoney(val + '')
                }
            },
            commandValue(command, row) {
                return {
                    'command': command,
                    'row': row,
                }
            },
            handleSelectionChange(val) {
                this.$emit('func', val)
            },
            handleDetail(row) {
                //传父数据
                this.$emit('funcDetail', row)
            },
            handleAddOffer(row) {
                //传父数据
                this.$emit('funcAddOffer', row)
            },
            handleCommand(item) {
                const {row, command} = item

                if (command === 'Archive') {
                    this.$confirm('Product 00100\'s in-stock quantity is not 0. Cannot archive product.', 'Tips', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                    }).then(() => {
                        this.$emit('funcEditnote', row, 'archive')
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
                } else if (command === 'Edit') {
                    this.$emit('funcEditnote', row, 'edit')
                }
                // this.$message('click on item ' + command);
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
        },
        computed: {},
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

    .newFontBolder {
        font-weight: bolder;
    }
</style>