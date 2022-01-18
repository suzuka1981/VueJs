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
                        <!--                        <i class="el-icon-s-flag" style="font-size: 6px;" v-show="scope.row.participated"></i>-->
                    </template>
                </el-table-column>
                <el-table-column
                        label="Offer"
                        width="750"
                >
                    <template slot-scope="scope">
<!--                        <div>-->
<!--                            {{scope.row}}-->
<!--                        </div>-->
                        <div :class="{'linethrough':getlinethrough(scope.row)}">
                            <span v-show="scope.row.warehouseProduct && scope.row.warehouseProduct.conditionvalue">
                                {{getconditionvalue(scope.row)}}
                                &nbsp;-&nbsp;
                            </span>
                            <span v-show="scope.row.warehouseProduct && scope.row.warehouseProduct.name">
                                {{getProductname(scope.row)}}
                            </span>
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
                        prop="quantity"
                        label="Total qty"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="usedquantity"
                        label="Available qty"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <el-button type="text"
                                   size="mini"
                                   @click="confirmClick(scope.row)">Archive
                        </el-button>

                        <el-button
                                type="text"
                                size="mini"
                                @click="handleEdit(scope.row)" v-show="propsMsg==='active'">Edit
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
    import {toMoney} from '../../../utils/toMoney.js'
    import {formatDate} from "../../../utils/dateFormat";

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
        mounted() {
            // console.log(this.tableData)
        },
        created() {

        },
        filters: {},
        methods: {
            getconditionvalue(row){
                if(row.warehouseProduct && row.warehouseProduct.conditionvalue){
                    return row.warehouseProduct.conditionvalue.charAt(0).toUpperCase()+row.warehouseProduct.conditionvalue.slice(1)
                }
            },
            getProductname(row){
                if(row.warehouseProduct && row.warehouseProduct.name) {
                    return row.warehouseProduct.name
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(row) {
                // console.log(row)

                //传父数据
                this.$emit('func', row, 'edit')
            },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            confirmClick(row) {
                this.$confirm('Warning: The related tasks won\'t be able to confirm.Do you want to Proceed?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(async () => {
                    let tmp = row

                    tmp.orgid = window.sessionStorage.getItem("userid")
                    tmp.productid = tmp.offer.split('---')[0]
                    if (tmp.warehousesitesvalue && tmp.warehousesitesvalue != '') {
                        tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                    } else {
                        // return this.$message.error('Select is required.');
                    }

                    tmp.status = 'archived'

                    // delete tmp.offer
                    delete tmp.warehousesites

                    const {data: res} = await this.$http.post('offer/addandeditoffer', tmp)

                    if (res.meta.status != 200) {
                        return this.$message.error('Update Error.');
                    } else {
                        this.$emit('funcDataReLoad')
                        this.$message({
                            type: 'success',
                            message: 'Ok!'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel'
                    });
                });
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
                    return '- ' + this.getDateNohouse(row.expirationdate)
                }
            },
            bonusshow(row) {
                if ((row.onlyshiptowarehouse === 'false' || row.onlyshiptowarehouse === false) && row.bonus !== null) {
                    // return (parseFloat(row.price).toFixed(2) + '+ (' + row.bonus + ')')
                    return toMoney(row.price + '') + ' + (' + row.bonus + ')'
                } else {
                    // return parseFloat(row.price).toFixed(2)
                    return toMoney(row.price + '')
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
            getDateNohouse(data) {
                return  formatDate(new Date(data), "MM-dd-yyyy")
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

    .linethrough {
        text-decoration-line: line-through;
    }
</style>