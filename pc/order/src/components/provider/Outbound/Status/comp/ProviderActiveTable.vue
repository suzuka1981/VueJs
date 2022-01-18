<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <el-table
                    :header-cell-style="{fontSize:'12px'}"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="Note：">
                                <span>{{ props.row.notetoyourself }}</span>
                            </el-form-item>
                            <el-form-item label="Instruction：">
                                <span>{{ props.row.instruction }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="info"
                        label="Info"
                        width="180">
                    <template slot-scope="scope">
                        <div class="fontsizeoftemplate">
                            <div v-if="scope.row.type == 'self'">
                                <span class="fontweightspan">
                                    User:
                                </span>
                                <span v-if="scope.row.type == 'self'">
                                    {{getMember(scope.row.user)}}
                                </span>
                            </div>
                            <div v-else>
                                Bizblock warehouse
                            </div>
                            <div v-if="scope.row.id">
                            <span class="fontweightspan">
                                ID:
                            </span>
                                {{scope.row.id}}
                            </div>
                            <div>
                            <span class="fontweightspan">
                                Type:
                            </span>
                                Shipment
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="servicetype"
                        label="Service type"
                        width="110">
                    <template slot-scope="scope">{{ scope.row.servicetype }}</template>
                </el-table-column>
                <el-table-column
                        prop="outboundshipmentquantity"
                        label="Outbound shipment <--> Quantity"
                        width="270">
                    <template slot-scope="scope">
                        <div class="fontsizeoftemplate"
                             v-for="iproduct in scope.row.warehouseProduct"
                             v-if="scope.row.warehouseProduct">
                            <div class="fontweightspan">
                                <div v-if="iproduct.conditionvalue"
                                     :class="{'newFontBolder':iproduct.conditionvalue==='new'}">
                                    {{iproduct.conditionvalue.charAt(0).toUpperCase()+iproduct.conditionvalue.slice(1)}}
                                    <span v-html="iproduct.name" style="white-space: pre-wrap"></span>
                                </div>
                            </div>

                            <div>
                                <a href="" @click.prevent="handleSpanUPC(iproduct.upc)"
                                   style="cursor: pointer;text-decoration:none;">
                                    UPC: {{iproduct.upc}}
                                </a>
                            </div>
                        </div>

                        <!--                        <div v-html="scope.row.outboundshipmentquantity" style="white-space: pre-wrap"></div>-->

                        <div v-if="scope.row.otherservices">
                            Other services:
                            <span v-show="scope.row.otherservices.size > 0" class="otherservicesofspan">
                                {{scope.row.otherservices}}
                            </span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="quantity"
                        label=""
                        width="70">
                    <template slot-scope="scope">{{ getToship(scope.row) }}</template>
                </el-table-column>
                <el-table-column
                        prop="shipmentid"
                        label="Shipment ID"
                        width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.labelid">
                            {{ scope.row.labelid }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tracking#"
                        label="Tracking"
                        width="140">
                    <template slot-scope="scope">{{ scope.row.tracking_number }}</template>
                </el-table-column>
                <el-table-column
                        prop="pkgqty"
                        label="Pkg qty"
                        width="100">
                    <template slot-scope="scope">{{ scope.row.packagequantity }}</template>
                </el-table-column>
                <el-table-column
                        prop="destination"
                        label="Destination"
                        width="110">
                    <template slot-scope="scope">
                        <div v-if="scope.row.destination">
                            {{ getdestination(scope.row) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createtime"
                        label="Create time"
                        width="170"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{getDate(scope.row.createdate)}}
                    </template>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="Open" placement="top">
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="handleDown(scope.row,1)">
                                <i class="el-icon-download" style="font-size: 20px"></i>
                            </el-button>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="Internal(Only visible to organization)"
                                    placement="top">

                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="handleDraftComments(scope.row,2)">
                                <i class="el-icon-office-building" style="font-size: 20px"></i>
                            </el-button>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="Cancel" placement="top">
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="handleCancel(scope.row)">
                                <i class="el-icon-delete" style="font-size: 20px"></i>
                            </el-button>
                        </el-tooltip>
<!--                        <el-tooltip class="item" effect="dark" content="Confirm" placement="top">-->
<!--                            <el-button-->
<!--                                    type="text"-->
<!--                                    size="mini"-->
<!--                                    @click="handleConfirm(scope.row)">-->
<!--                                <i class="el-icon-success" style="font-size: 20px"></i>-->
<!--                            </el-button>-->
<!--                        </el-tooltip>-->
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
    import axios from "axios";

    export default {
        name: "Table",
        props: {
            tableData: [],
            propsMsg: '',
        },
        data() {
            return {
                multipleSelection: [],
                pageInfo: {},
                downloadUrl: '',
            }
        },

        methods: {
            getdestination(row){
                if(row.destination && row.destination!='other,-- Other --'){
                    return row.destination.split(',')[1]
                } else {
                    return row.destinationcontent
                }
            },
            getToship(row) {
                if (row.outboundStatusProductSize && row.outboundStatusProductSize.length > 0) {
                    let tmpResult = 0;
                    row.outboundStatusProductSize.forEach(function (item) {

                        tmpResult = tmpResult + item.toship
                    })

                    return tmpResult
                }
            },
            getMember(row) {
                if (typeof (row.name) != 'undefined' && row.name && row.name != 0 && row.name != 'null') {
                    return row.name
                } else if (typeof (row.username) != 'undefined') {
                    return row.username.split('@')[0]
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleDraftComments(row) {
                //传父数据
                this.$emit('func', row)
            },
            handleDown(row, type) {
                // console.log(row)
                let urltmp = row.label_url
                if (!urltmp) {
                    let id = row.id
                    this.downloadUrl = axios.defaults.baseURL + "taskoffer/download/label/" + id
                    window.open(this.downloadUrl, '_blank');
                } else {
                    //跳转新页面router写法
                    const routeData = this.$router.resolve({
                        name: 'ViewImages',
                        query: {urls: urltmp, rowlength: 1, type: 'pdf'},
                        // params: {urlsp: row.outboundShipment.label_url}
                    })

                    window.open(routeData.href, '_blank');
                }
            },
            handleCancel(row) {
                this.$confirm('Are you sure to cancel this shipment?',
                    'Tips', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                    }).then(() => {
                    this.$emit('funccancel', row)
                    // this.$message({
                    //     type: 'success',
                    //     message: 'Ok!'
                    // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel'
                    });
                });
            },
            handleConfirm(row) {

            },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            handleSpanUPC(val) {
                this.$emit('funUpcToSearch', val)
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

<style scoped lang="less">
    .block {
        margin-top: 10px;
        margin-right: 5px;
        display: flex;
        justify-content: flex-end;
    }

    .el-button {
        margin-right: 10px;
    }

    .otherservicesofspan {
        padding: 6px 6px 6px 6px;
        background-color: #999999;
        border-radius: 10px 10px 10px 10px;
    }

    .fontweightspan {
        font-weight: bold;
    }

    .fontsizeoftemplate {
        font-size: 12px;
    }
</style>