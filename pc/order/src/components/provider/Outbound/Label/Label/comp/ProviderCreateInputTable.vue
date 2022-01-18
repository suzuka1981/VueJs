<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    @header-click="handleTitleAdd"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        prop="action"
                        label="+"
                        width="70"
                        class="actionstyle">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                v-show="scope.row.index !== 0"
                                @click="handleRemove(scope.row)">

                            <i class="el-icon-delete" style="font-size: 22px;margin-left: 3px"></i>
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column
                        label="Identical package qty"
                        width="190">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.identicalpackageqty"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Weight"
                        width="270">
                    <template slot-scope="scope">
                        <div class="coloffilx">
                            <el-input v-model="scope.row.weight" style="width: 85%"></el-input>
                            <el-tooltip
                                    class="item" effect="dark" :content="scope.row.weightcontent" placement="top">
                                <span class="weightspan" @click="weightchange(scope.row)"> &nbsp;{{scope.row.weighttype}}</span>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Length / Width / Height"
                        width="270">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="7" class="coloffilx">
                                <el-input v-model="scope.row.length"></el-input>
                                <span>" &nbsp;</span>
                            </el-col>
                            <el-col :span="7" class="coloffilx">
                                <el-input v-model="scope.row.width"></el-input>
                                <span>" &nbsp;</span>
                            </el-col>
                            <el-col :span="7" class="coloffilx">
                                <el-input v-model="scope.row.height"></el-input>
                                <span>" &nbsp;</span>
                            </el-col>
                            <el-col :span="3">
                                <el-dropdown trigger="click"
                                             @command="handleCommand">
                                      <span class="el-dropdown-link">
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                      </span>

                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item
                                                v-for="(item,index) in formstruct.optionsOfdropdown"
                                                :key="index"
                                                :command="commandValue(item.command,scope.row)"
                                        >{{item.value}}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Declared value"
                        width="220">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.declaredvalue"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Memo"
                        width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.memo"></el-input>
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
            dropdata: [],
            tableData: [],
            propsMsg: '',
        },
        created() {

        },
        mounted() {
            this.dropdownDataCreate()
        },
        data() {
            return {
                multipleSelection: [],
                formstruct: {
                    optionsOfdropdown: [
                        {
                            command: {
                                length: 8,
                                width: 8,
                                height: 8,
                            },
                            value: 'Default(8"x8"x8")',

                        },
                        {
                            command: {
                                length: 20,
                                width: 14,
                                height: 4,
                            },
                            value: 'vite(20"x14"x4")',
                        },

                    ],
                },
            }
        },

        methods: {
            dropdownDataCreate() {
                this.formstruct.optionsOfdropdown = []

                let tmpList = []
                this.dropdata.forEach(function (item) {
                    let command = {
                        length: item.length,
                        width: item.width,
                        height: item.height,
                    }
                    let value = item.name + '(' + item.length + '"'  + item.width + '"' + item.height + '"' + ')'

                    let subTmp = {
                        command: command,
                        value: value
                    }

                    tmpList.push(subTmp)
                })

                this.formstruct.optionsOfdropdown = tmpList
            },
            weightchange(row) {
                if (row.weighttype == 'LBS') {
                    // this.$forceUpdate()
                    // this.$set(row, 'weighttype', 'Oz')
                    row.weighttype = 'OZ'
                    row.weightcontent = 'Click here switch to LBS'
                } else {
                    row.weighttype = 'LBS'
                    row.weightcontent = 'Click here switch to Oz'
                }

                console.log(row.weighttype)
            },
            commandValue(command, row) {
                return {
                    'command': command,
                    'row': row,
                }
            },
            tableRowClassName({row, rowIndex}) {
                row.index = rowIndex;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleRemove(row) {
                //传父数据
                this.$emit('funcRemove', row)
            },
            handleTitleAdd(column, event) {
                if (column.label === '+') {
                    this.$emit('func', column)
                }
            },
            handleCommand(item) {
                const {row, command} = item
                row.length = command.length
                row.width = command.width
                row.height = command.height
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

    .coloffilx {
        display: flex
    }

    .weightspan {
        margin-top: 7px;
        cursor: pointer;
    }

</style>