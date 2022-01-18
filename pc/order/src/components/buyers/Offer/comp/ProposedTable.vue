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
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="ID#"
                        width="120">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                        prop="sellerusername"
                        label="Organization"
                        width="150">
                    <template slot-scope="scope">
                        {{getMember(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Offer"
                        width="650"
                >
                    <template slot-scope="scope">
                        <div :class="{'linethrough':getlinethrough(scope.row)}">
                            <span v-show="scope.row.warehouseProduct.conditionvalue">
                                {{scope.row.warehouseProduct.conditionvalue.charAt(0).toUpperCase()+scope.row.warehouseProduct.conditionvalue.slice(1)}}

                                &nbsp;-&nbsp;
                            </span>
                            <span v-show="scope.row.warehouseProduct.name">{{scope.row.warehouseProduct.name}}</span>
                        </div>
                        </br>
                        <div v-for="item in getArr(scope.row.note)">
                            <a :href="getHref(item)" target="_blank">
                                {{item}}
                            </a>
                        </div>
                        </br>
                        <div>
                            <i class="el-icon-user-solid iconsize" style="font-size: 22px"></i>
                            <span v-show="scope.row.visibletoallmembers==='true'">
                                Visible to all members
                            </span>
                            <span v-show="scope.row.visibletoallmembers==='false'">
                                Only visible to limited
                            </span>
                            &nbsp;
                            &nbsp;
                            <i class="el-icon-alarm-clock" style="font-size: 22px"></i>
                            Valid: {{getDateNohouse(scope.row.createdate)}}
                            <span>
                                {{expirationdatesub(scope.row)}}
                            </span>

                            &nbsp;
                            &nbsp;
                            <i class="el-icon-alarm-clock" style="font-size: 22px"></i>
                            Pending period: {{scope.row.pendingperioddays}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="Price ($)"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>
                            {{bonusshow(scope.row)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="usedquantity"
                        label="Quantity"
                        width="100"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="createdate"
                        label="Create time"
                        width="180px"
                        sortable
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{getDate(scope.row.createdate)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                        width="200px"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleEdit(scope.row)" v-show="propsMsg==='proposed'">Edit
                        </el-button>
                        <!--                        <el-button-->
                        <!--                                type="text"-->
                        <!--                                size="mini"-->
                        <!--                                @click="handleComments(scope.row)" v-show="propsMsg==='proposed'">Comments-->
                        <!--                        </el-button>-->

                        <el-button type="text"
                                   size="mini"
                                   @click="confirmClick(scope.row)">Cancel
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[50,100, 200, 300]"
                        :page-size="pageInfo.pageSize"
                        layout=" sizes, prev, pager, next"
                        :total="pageInfo.total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {formatDate} from "../../../utils/dateFormat";
    import {toMoney} from "../../../utils/toMoney";

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
            handleEdit(row) {
                //传父数据
                this.$emit('func', row)
            },
            handleComments(row) {
                //传父数据
                this.$emit('funComments', row)
            },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            confirmClick(row) {
                this.$confirm('Are you sure to cancel the task?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.$emit('funcCancel', row)
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
            getlinethrough(row) {
                let exTime = new Date(row.expirationdate).valueOf()
                let now = new Date().valueOf()

                if (now > exTime) {
                    return true;
                } else {
                    return false;
                }
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
                    return '- ' + this.getDateNohouseofday(row.expirationdate,row.pendingperioddays)
                }
            },
            bonusshow(row) {
                return toMoney(row.price + '')
                // if (row.onlyshiptowarehouse === 'false' && row.bonus !== null) {
                //     return (row.price + row.bonus) + '+ (' + row.bonus + ')'
                // } else {
                //     return row.price
                // }
            },
            getMember(row) {
                if (typeof (row.sellerrelname) != 'undefined' && row.sellerrelname && row.sellerrelname != 0 && row.sellerrelname != 'null') {
                    return row.sellerrelname
                } else if (typeof (row.sellerusername) != 'undefined') {
                    return row.sellerusername.split('@')[0]
                }
            },
            getDate(data) {
                let tmpDate = formatDate(new Date(data), "MM-dd-yyyy hh:mm")
                if ((tmpDate.slice(11, 13) - 12) > 0) {

                    return tmpDate.slice(0, 11) + '0' + (tmpDate.slice(11, 13) - 12) + tmpDate.slice(13, tmpDate.length) + ' PM'
                } else {
                    return tmpDate + ' AM'
                }
                return tmpDate
            },
            getDateNohouse(data) {
                return  formatDate(new Date(data), "MM-dd-yyyy")
            },
            getDateNohouseofday(data,day){
                return formatDate(this.addDay(day, data), "MM-dd-yyyy")
            },
            addDay(dayNumber, date) {
                date = date ? date : new Date();
                date = new Date(date)
                var ms = dayNumber * (1000 * 60 * 60 * 24)

                var newDate = new Date(date.getTime() + ms);

                return newDate;
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