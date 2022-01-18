<template>
    <div>
        <div class="top">
            <el-row type="flex" justify="space-between">
                <el-col :span="7">
                    <el-input
                            @input="getListProduct"
                            placeholder="Keyword / upc / asin" v-model="searchinput"></el-input>
                </el-col>

                <el-col :span="7" class="flexleftofcol">
                    <div>
                        <span class="demonstration">end date</span>
                        <el-date-picker
                                v-model="endDate"
                                type="date"
                                placeholder="Select date"
                        >
                        </el-date-picker>
                    </div>
                    <div>
                        <el-button @click="getListProduct">Search</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>


        <div class="tablebody">
            <Table
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    @funcEditnote="handleAddProduct"
                    :pageInfo="pageInfo"
                    :tableData="tabledata"
                    @funcDetail="handleDetail"
            />
        </div>


        <!--      details  -->
        <!--      details  -->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Product details"
                :visible.sync="dialogdetailsVisible"
                width="90%"
        >
            <div class="centerofdiv">
                <div class="widthofdiv">
                    <div class="bottomofdiv">
                        <span>{{dialogForm.condition}}&nbsp </span>
                        <span class="fontweight">{{dialogForm.name}}</span>
                    </div>
                    <div class="bottomofdiv">
                        <span>${{dialogForm.price}}</span>
                        <span>&nbsp-&nbsp</span>
                        <span>{{dialogForm.upc}}</span>
                    </div>

                    <el-divider></el-divider>

                    <div>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="In-stock" name="first">
                                <ProviderDialogInStockTable
                                        :detailPageInfo="detailInstockPageInfo"
                                        @funcDetailSizeChange="getDetailInstockDataSizeChange"
                                        @funcDetailCurrentChange="getDetailInstockDataCurrentChange"
                                        :tableData="instockTable"/>
                            </el-tab-pane>
                            <el-tab-pane label="Confirmed" name="second">
                                <ProviderDialogInConfirmedTable
                                        :detailPageInfo="detailPageInfo"
                                        @funcDetailSizeChange="getDetailDataSizeChange"
                                        @funcDetailCurrentChange="getDetailDataCurrentChange"
                                        :tableData="confirmedTable"/>
                            </el-tab-pane>
                            <!--                            <el-tab-pane label="Transfers" name="third">-->
                            <!--                                <el-row>-->
                            <!--                                    <el-col :span="3">-->
                            <!--                                        <div class="spanofcenter">-->
                            <!--                                            Type-->
                            <!--                                        </div>-->
                            <!--                                        <el-select-->
                            <!--                                                v-model="transfersForm.type"-->
                            <!--                                                placeholder="&#45;&#45; All &#45;&#45;">-->
                            <!--                                            <el-option-->
                            <!--                                                    v-for="item in formstruct.optionsOfType"-->
                            <!--                                                    :key="item.value"-->
                            <!--                                                    :label="item.label"-->
                            <!--                                                    :value="item.value">-->
                            <!--                                            </el-option>-->
                            <!--                                        </el-select>-->
                            <!--                                    </el-col>-->
                            <!--                                    <el-col :span="3" class="betweenofspan">-->
                            <!--                                        <el-input-->
                            <!--                                                class="dropdownset"-->
                            <!--                                                suffix-icon="el-icon-arrow-down"-->
                            <!--                                                v-model="transfersForm.organizationname"-->
                            <!--                                                placeholder="Organization name"></el-input>-->
                            <!--                                    </el-col>-->
                            <!--                                    <el-col :span="9" :offset="5" class="betweenofspan">-->
                            <!--                                        <div>-->
                            <!--                                            <span class="demonstration">Start date</span>-->
                            <!--                                            <el-date-picker-->
                            <!--                                                    v-model="transfersForm.startDate"-->
                            <!--                                                    type="date"-->
                            <!--                                                    placeholder="Select date"-->
                            <!--                                                    :picker-options="transfersForm.pickerOptions"-->
                            <!--                                            >-->
                            <!--                                            </el-date-picker>-->
                            <!--                                        </div>-->
                            <!--                                        <div>-->
                            <!--                                            <span class="demonstration">end date</span>-->
                            <!--                                            <el-date-picker-->
                            <!--                                                    v-model="transfersForm.endDate"-->
                            <!--                                                    type="date"-->
                            <!--                                                    placeholder="Select date"-->
                            <!--                                            >-->
                            <!--                                            </el-date-picker>-->
                            <!--                                        </div>-->
                            <!--                                        <div>-->
                            <!--                                            <el-button @click="" style="margin-top: 15px;width: 100%;">Search-->
                            <!--                                            </el-button>-->
                            <!--                                        </div>-->
                            <!--                                    </el-col>-->
                            <!--                                </el-row>-->

                            <!--                                <ProviderDialogTransfersTable-->
                            <!--                                        :tableData="TransfersTable"/>-->
                            <!--                            </el-tab-pane>-->
                            <!--                            <el-tab-pane label="Price history" name="fourth">-->
                            <!--                                <pie style="width: 800px;height: 400px;"-->
                            <!--                                     :xAxisData="xAxisData"-->
                            <!--                                     :seriesPriceData="seriesPriceData"-->
                            <!--                                     :seriesQuantityData="seriesQuantityData"-->
                            <!--                                ></pie>-->
                            <!--                            </el-tab-pane>-->
                        </el-tabs>
                    </div>

                    <el-divider></el-divider>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogdetailsVisible = false">close</el-button>
                    </span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Warehouse/Inventory/comp/ProviderInventoryArchivedTable.vue')
    const ProviderDialogInStockTable = () => import('@/components/provider/Warehouse/Inventory/comp/ProviderDialogInStockTable.vue')
    const ProviderDialogInConfirmedTable = () => import('@/components/provider/Warehouse/Inventory/comp/ProviderDialogInConfirmedTable.vue')
    const ProviderDialogTransfersTable = () => import('@/components/provider/Warehouse/Inventory/comp/ProviderDialogTransfersTable.vue')
    const Pie = () => import('@/components/provider/Warehouse/Inventory/comp/Pie.vue')

    import '../../../../assets/icon/iconfont.css'

    export default {
        name: "ProviderInventoryActive",
        components: {
            Table,
            ProviderDialogInStockTable,
            ProviderDialogInConfirmedTable,
            ProviderDialogTransfersTable,
            Pie,
        },
        created() {
            this.getListProduct()
        },
        data() {
            return {
                detailInstockPageInfo: {
                    pageSize: 5,
                    total: 10,
                    current: 1,
                },
                detailPageInfo: {
                    pageSize: 5,
                    total: 10,
                    current: 1,
                },
                //表单分页
                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                xAxisData: ['2021/09/01', '2021/09/02', '2021/09/03', '2021/09/04', '2021/09/05', '2021/09/06', '2021/09/07',],
                seriesPriceData: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                seriesQuantityData: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],

                formstruct: {
                    optionsOfCondition: [{
                        value: 'new',
                        label: 'new'
                    }, {
                        value: 'used',
                        label: 'used'
                    }, {
                        value: 'refurbished',
                        label: 'refurbished'
                    }],

                    optionsOfType: [{
                        value: '1',
                        label: '--All--'
                    }, {
                        value: '2',
                        label: 'In'
                    }, {
                        value: '3',
                        label: 'Out'
                    }],
                },

                searchinput: '',
                endDate: '',


                tabledataTmp: [],
                tabledata: [],

                //add and edit
                dialogForm: {
                    name: '',
                    price: '',
                    condition: 'new',
                    asin: '',
                    sku: '',
                    upc: '',
                    inbound: '',
                    instock: '',
                    value: '',
                    note: '',
                    titileName: '',
                    checked: false,
                },


                //Details
                dialogdetailsVisible: false,
                activeName: 'first',

                instockTable: [
                    {
                        id: '1',
                        user: 'Easygo warehouse',
                        site: 'New Hampshire - 03053 - 55 Harvey Road',
                        quantity: '6',
                    }
                ],

                confirmedTable: [
                    {
                        id: '1',
                        user: 'Easygo warehouse',
                        site: 'warehouse',
                        price: '520',
                        quantity: '6',
                        lastUpdate: '09/09/2021',
                    },
                    {
                        id: '2',
                        user: 'bliu6768',
                        site: 'warehouse',
                        price: '520',
                        quantity: '6',
                        lastUpdate: '09/09/2021',
                    },
                ],

                transfersForm: {
                    type: '1',
                    organizationname: '',
                    startDate: '',
                    endDate: '',
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        },
                    },
                },

                TransfersTable: [],

            }
        },
        methods: {
            async handleAddProduct(val, type) {
                if (type == 'restore') {
                    this.dialogForm.orgid = window.sessionStorage.getItem("userid")

                    val.status = ''
                    const {data: res} = await this.$http.post('warehouse/addandeditproduct', val)

                    this.getListProduct()
                }
            },
            handleofArchiveselected() {
                this.$confirm('Some of selected products have in-stock quantity, cannot be archived', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
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


            async handleDetail(val) {
                //拼接instock
                this.detailPageInfo.instcokpageSize = this.detailInstockPageInfo.pageSize
                this.detailPageInfo.instcokcurrent = this.detailInstockPageInfo.current

                this.detailPageInfo.orgid = val.orgid
                this.detailPageInfo.productid = val.id

                this.dialogForm = val

                this.detailData = {
                    orgid: val.orgid,
                    productid: val.id,
                }

                const {data: res} = await this.$http.post('taskoffer/queryconfirmofproduct', this.detailPageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    if (res.info.list) {
                        this.confirmedTable = res.info.list
                        // console.log(this.confirmedTable)
                    }

                    if (res.infoinsotck.list) {
                        this.instockTable = res.infoinsotck.list
                        // console.log(this.confirmedTable)
                    }


                    this.detailPageInfo.current = res.info.pageNum
                    this.detailPageInfo.pageSize = res.info.pageSize
                    this.detailPageInfo.total = res.info.total

                    this.detailInstockPageInfo.current = res.infoinsotck.pageNum
                    this.detailInstockPageInfo.pageSize = res.infoinsotck.pageSize
                    this.detailInstockPageInfo.total = res.infoinsotck.total
                }

                this.dialogdetailsVisible = true
            },

            async detailPage() {
                //拼接instock
                this.detailPageInfo.instcokpageSize = this.detailInstockPageInfo.pageSize
                this.detailPageInfo.instcokcurrent = this.detailInstockPageInfo.current

                this.detailPageInfo.orgid = this.detailData.orgid
                this.detailPageInfo.productid = this.detailData.productid

                const {data: res} = await this.$http.post('taskoffer/queryconfirmofproduct', this.detailPageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    if (res.info.list) {
                        this.confirmedTable = res.info.list
                        // console.log(this.confirmedTable)
                    }

                    if (res.infoinsotck.list) {
                        this.instockTable = res.infoinsotck.list
                        // console.log(this.confirmedTable)
                    }


                    this.detailPageInfo.current = res.info.pageNum
                    this.detailPageInfo.pageSize = res.info.pageSize
                    this.detailPageInfo.total = res.info.total

                    this.detailInstockPageInfo.current = res.infoinsotck.pageNum
                    this.detailInstockPageInfo.pageSize = res.infoinsotck.pageSize
                    this.detailInstockPageInfo.total = res.infoinsotck.total
                }

            },

            handleClick(tab, event) {
                // console.log(tab, event);
                // console.log(this.activeName);
            },
            getDetailInstockDataSizeChange(val) {
                this.detailInstockPageInfo.pageSize = val
                this.detailPage()
            },
            getDetailInstockDataCurrentChange(val) {
                this.detailInstockPageInfo.current = val
                this.detailPage()
            },

            getDetailDataSizeChange(val) {
                this.detailPageInfo.pageSize = val
                this.detailPage()
            },
            getDetailDataCurrentChange(val) {
                this.detailPageInfo.current = val
                this.detailPage()
            },

            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListProduct()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListProduct()
            },
            handleCommandExport(command) {
                this.$message('click on item ' + command);
            },

            getRowhandleSelectionChange(val) {
                if (val.length > 0) {
                    this.openIsDisabled = false
                } else {
                    this.openIsDisabled = true
                }
            },
            async getListProduct() {
                this.pageInfo.orgid = window.sessionStorage.getItem("userid")
                this.pageInfo.searchinput = this.searchinput
                this.pageInfo.status = 'archive'
                this.pageInfo.endDate = this.endDate

                const {data: res} = await this.$http.post('warehouse/queryListPageProduct', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tabledataTmp = res.data

                    this.pageInfo.current = res.info.pageNum
                    this.pageInfo.pageSize = res.info.pageSize
                    this.pageInfo.total = res.info.total
                }
            },
        },
        watch: {
            tabledataTmp() {
                this.tabledata = this.tabledataTmp
            },
        },
    }
</script>

<style scoped lang="less">
    .betweenofspan {
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
    }

    .bigsizeofspan {
        font-size: 25px;
        margin-right: 5px;
    }

    .el-dropdown-link {
        cursor: pointer;
        /*color: #409EFF;*/
        color: #222222;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .dropdownset {
        margin-top: 15px;
    }

    .spanofcenter {
        font-size: 10px;
    }

    .topset {
        margin-top: 40px;
    }

    /deep/ .selectwidth {
        width: 70%;
    }

    .leftofdiv {
        display: flex;
        justify-content: left;

        .el-button {
            margin-top: -20px;
            margin-left: 10px;
        }
    }

    .fontweight {
        font-weight: bolder;
        font-size: 16px;
    }

    .bottomofdiv {
        margin-bottom: 5px;
    }

    .centerofdiv {
        display: flex;
        justify-content: center;
    }

    .widthofdiv {
        width: 90%;
    }

    .topandleft {
        width: 95%;
        margin-top: 15px;
    }

    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 12px;
        /*margin-bottom: 5px;*/
    }

    .flexleftofcol {
        display: flex;
        justify-content: left;

        .el-button {
            margin-top: 15px;
            margin-left: 5px;
        }
    }
</style>