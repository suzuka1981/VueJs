<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <el-table
                    :header-cell-style="{fontSize:'12px'}"
                    :cell-style="{fontSize:'12px'}"
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
                        prop="details"
                        label="Details"
                        width="220">
                    <template slot-scope="scope">
                        <div>
                            <span class="fontw">
                                ID:
                            </span>
                            {{scope.row.id}}
                            <br>
                            <span class="fontw">
                                Shipment ID:
                            </span>
                            <span v-if="scope.row.outboundShipment">
                                {{scope.row.outboundShipment.id}}
                            </span>
                        </div>

                        <div v-for="item in scope.row.outboundPackageSizeList">
                            <el-row>
                                <el-col :span="10">
                                    <span class="fontw">Size(L/W/H):</span>
                                    <br>
                                    {{item.length}}"/{{item.width}}"/{{item.height}}"
                                </el-col>

                                <el-col :span="10" :offset="2">
                                    <span class="fontw">Weight:</span>
                                    {{item.weight}}
                                </el-col>
                            </el-row>
                            <div>
                                <span class="fontw">Weight type: </span>
                                <span>{{item.weighttype}}</span>
                            </div>
                            <div>
                                <span class="fontw">Declared Value: </span>
                                <span>{{item.declaredvalue}}</span>
                            </div>
                        </div>
                        <div>
                            <span class="fontw">Signature: </span>
                            <span>{{scope.row.valueOfSignature}}</span>
                        </div>
                        <div>
                            <span class="fontw">Memo: </span>
                            <span>{{scope.row.inputMemo}}</span>
                        </div>
                        <div>
                            <span class="fontw">Note: </span>
                            <span>{{scope.row.inputNote}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="from"
                        label="From"
                        width="180"
                >
                    <template slot-scope="scope">
                        <div>
                            <div class="fontw" v-if="scope.row.outsenderForm">{{scope.row.outsenderForm.companyname}}</div>
                            <div class="fontw" v-if="scope.row.outsenderForm">{{scope.row.outsenderForm.fullname}}</div>
                            <div v-if="scope.row.outsenderForm">{{scope.row.outsenderForm.address1}}</div>
                            <div v-if="scope.row.outsenderForm">{{scope.row.outsenderForm.city}},
                                {{scope.row.outsenderForm.valueOfState}} - {{scope.row.outsenderForm.zipcode}}
                            </div>
                            <div v-if="scope.row.outsenderForm">{{scope.row.outsenderForm.phone}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="to"
                        label="To"
                        width="180"
                >
                    <template slot-scope="scope">
                        <div>
                            <div class="fontw" v-if="scope.row.outrecipientForm">{{scope.row.outrecipientForm.companyname}}</div>
                            <div class="fontw" v-if="scope.row.outrecipientForm">{{scope.row.outrecipientForm.fullname}}</div>
                            <div v-if="scope.row.outrecipientForm">{{scope.row.outrecipientForm.address1}}</div>
                            <div v-if="scope.row.outrecipientForm">{{scope.row.outrecipientForm.city}},
                                {{scope.row.outrecipientForm.valueOfState}} - {{scope.row.outrecipientForm.zipcode}}
                            </div>
                            <div v-if="scope.row.outrecipientForm">{{scope.row.outrecipientForm.phone}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createshipEstdeliverydate"
                        label="Create/Ship/Est delivery date"
                        width="200"
                >
                    <template slot-scope="scope">
                        <div>
                            {{getDate(scope.row.createdate)}}
                        </div>
                        <div v-if="scope.row.shipdate">
                            {{getDate(scope.row.shipdate)}}
                        </div>
                        <div v-if="scope.row.outboundShipment">
                            {{scope.row.outboundShipment.bussiness_days}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="trackinginfo"
                        label="Tracking/Info"
                        width="180"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.outboundShipment">
                            {{scope.row.outboundShipment.tracking_number}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="service"
                        label="Service"
                        width="180"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.rateSub" class="fontw">
                            {{scope.row.rateSub.carrier}}
                        </div>
                        <div v-if="scope.row.rateSub" class="fontw">
                            {{scope.row.rateSub.servicelevel_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="Amount"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.outboundShipment" class="fontcolorred">
                            ${{scope.row.outboundShipment.amount}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="Status"
                >
                    <template slot-scope="scope">
                        <div v-html="scope.row.status" style="white-space: pre-wrap"></div>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <!--                        <a :href="scope.row.outboundShipment.label_url" target="_blank">PDF</a>-->
                        <el-tooltip class="item" effect="dark" content="Open label" placement="top"
                                    style="margin-right: 10px">
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="handleOpenLabe(scope.row)">
                                <i class="el-icon-camera-solid" style="font-size: 20px"></i>
                            </el-button>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="Open label" placement="top">
                            <el-dropdown trigger="click"
                                         @command="handleCommand"
                            >
                              <span class="el-dropdown-link">
                                <i class="el-icon-s-tools" style="font-size: 20px"></i>
                              </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="commandValue('Editnote',scope.row)">Edit note
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="commandValue('Cancel',scope.row)">Cancel
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
    import {formatDate} from "../../../../../utils/dateFormat";

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
            commandValue(command, row) {
                return {
                    'command': command,
                    'row': row,
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // handleEdit(row) {
            //     //传父数据
            //     this.$emit('func', row, 'edit')
            // },
            handleSizeChange(val) {
                this.$emit('funcSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcCurrentChange', val)
            },
            handleOpenLabe(row) {
                //跳转新页面router写法
                const routeData = this.$router.resolve({
                    name: 'ViewImages',
                    query: {urls: row.outboundShipment.label_url, rowlength: 1, type: 'pdf'},
                    // params: {urlsp: row.outboundShipment.label_url}
                })

                window.open(routeData.href, '_blank');
            },
            handleCommand(item) {
                const {row, command} = item

                if (command === 'Cancel') {
                    this.$confirm('Are you sure to cancel this label?', 'Tips', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                    }).then(async () => {
                        let subTmp = {
                            labelid: item.row.id,
                            rate_no: item.row.outboundShipment.rate_no
                        }

                        const {data: res} = await this.$http.post('outbound/label/cancellabel', subTmp)

                        this.$emit('funcCancelSuccess', row)

                        if (res.meta.status != 200) {
                            return this.$message.error(res.meta.msg);
                        } else {
                            this.$message({
                                type: 'success',
                                message: 'Ok!'
                            });
                        }
                        // console.log(item.row.outboundShipment.rate_no)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Cancel'
                        });
                    });
                } else if (command === 'Editnote') {
                    this.$emit('funcEditnote', row)
                }
                // this.$message('click on item ' + command);
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

    .fontw {
        font-weight: bold;
    }

    .fontcolorred {
        color: red;
    }
</style>