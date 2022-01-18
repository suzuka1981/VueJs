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
                        label="Tracking number"
                        width="170">
                    <template slot-scope="scope">
                        {{ scope.row.tracking }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="upcsku"
                        label="UPC/SKU(SN)"
                        width="130">
                    <template slot-scope="scope">
                        <div v-html="scope.row.upc" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="description"
                        label="Description">
                    <template slot-scope="scope">
                        <!--                                                {{scope.row}}-->
                        <span v-show="scope.row.conditionvalue">
                                {{getCtv(scope.row)}}
                                &nbsp;-&nbsp;
                            </span>

                        <span v-show="scope.row.name">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="quantity"
                        label="Quantity">
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="usedquantity"
                        label="Unconfirmed Quantity">
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="warehouse"
                        label="Warehouse">
                    <template slot-scope="scope">
                        <span v-show="scope.row.sitename">
                                {{scope.row.sitename}}
                                &nbsp;-&nbsp;
                        </span>

                        <span v-show="scope.row.address1">{{scope.row.address1}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="confirmed"
                        label="Confirmed">
                    <template slot-scope="scope">
                        <i v-show="scope.row.buyersconfirmsize > 0" class="el-icon-success sizeoficon"></i>
                    </template>
                </el-table-column>
                <el-table-column
                        width="80"
                        prop="linked"
                        label="Linked">
                    <template slot-scope="scope">
                        <i v-show="scope.row.offersize > 0" class="el-icon-success sizeoficon"></i>
                    </template>
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="received"
                        label="Received Date">
                    <template slot-scope="scope">
                        <div v-show="scope.row.lastupdate">
                            {{getDatereceived(scope.row.lastupdate)}}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        width="170"
                        prop="received"
                        label="Sync Date">
                    <template slot-scope="scope">
                        {{getDate(scope.row.createdate)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="Action"
                        class="tocenter"
                >
                    <template slot-scope="scope">
                        <!--                        <el-tooltip class="item" effect="dark" content="Open to sea detail" placement="top">-->
                        <!--                            <el-button-->
                        <!--                                    type="text"-->
                        <!--                                    size="mini"-->
                        <!--                                    @click="handleOpenDetail(scope.row,2)">-->
                        <!--                                <i class="el-icon-s-order" style="font-size: 25px;"></i>-->
                        <!--                            </el-button>-->
                        <!--                        </el-tooltip>-->

<!--                        <el-tooltip-->
<!--                                class="item" effect="dark" content="Remove" placement="top">-->
<!--                            <el-button-->
<!--                                    type="text"-->
<!--                                    size="mini"-->
<!--                                    @click="handleRemove(scope.row.id)">-->
<!--                                <i class="el-icon-delete-solid" style="font-size: 25px;"></i>-->
<!--                            </el-button>-->
<!--                        </el-tooltip>-->

                        <el-tooltip
                                v-show="scope.row.offersize ==0
                                && scope.row.buyersconfirmsize ==0
                                && !scope.row.conditionvalue
                                && !scope.row.name
                                "
                                class="item" effect="dark" content="Link Product" placement="top">
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="handleAddProduct(scope.row)">
                                <i class="el-icon-circle-plus" style="font-size: 25px;"></i>
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[50, 100, 200, 300, 400]"
                        :page-size="pageInfo.pageSize"
                        layout=" sizes, prev, pager, next"
                        :total="pageInfo.total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {formatDate} from "../../../../utils/dateFormat";

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
            getDate(data) {
                let tmpDate = formatDate(new Date(data), "MM-dd-yyyy hh:mm")
                if ((tmpDate.slice(11, 13) - 12) > 0) {

                    return tmpDate.slice(0, 11) + '0' + (tmpDate.slice(11, 13) - 12) + tmpDate.slice(13, tmpDate.length) + ' PM'
                } else {
                    return tmpDate + ' AM'
                }
                return tmpDate
            },
            getDatereceived(data) {
                let tmpDate = formatDate(new Date(data), "MM-dd-yyyy")
                // if ((tmpDate.slice(11, 13) - 12) > 0) {
                //
                //     return tmpDate.slice(0, 11) + '0' + (tmpDate.slice(11, 13) - 12) + tmpDate.slice(13, tmpDate.length) + ' PM'
                // } else {
                //     return tmpDate + ' AM'
                // }
                return tmpDate
            },
            getCtv(row) {
                if (row.conditionvalue) {
                    return row.conditionvalue.charAt(0).toUpperCase() + row.conditionvalue.slice(1)
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleOpenDetail(row) {
                //传父数据
                this.$emit('funcDetail', row)
            },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            async handleRemove(id) {
                let subTmpData = {
                    id:id
                }
                const {data: res} = await this.$http.post('warehouse/deleteexcelpackagebyid', subTmpData)

                if (res.meta.status != 200) {
                    return this.$message.error('Remove Error.');
                } else {
                    this.$emit('funcRefresh')
                    return this.$message.success('Remove success.');
                }
            },
            handleAddProduct(row) {
                this.$emit('funcAddProduct', row)
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

    /deep/ .tocenter {
        display: flex;
        justify-content: center;
    }

    /deep/ .sizeoficon {
        display: flex;
        justify-content: center;
        font-size: 25px;
    }
</style>