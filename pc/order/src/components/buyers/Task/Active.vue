<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2" style="display: flex;justify-content: space-between">
                <el-col :span="12" style="display: flex;justify-content: flex-start;">
                    <div style="width:200px;margin-right: 10px;">
                        <span class="demonstration">Organization name</span>

                        <el-select v-model="valueOfOrganization" placeholder="-- All --">
                            <el-option
                                    @click.native="handleSelectChange(item)"
                                    v-for="item in optionsOfOrganization"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>

                <el-col :span="12" style="display: flex;justify-content: flex-end">
                    <div style="width: 250px;margin-right: 25px;margin-top: 20px">
                        <el-input
                                placeholder="Search"
                                suffix-icon="el-icon-search"
                                v-model="searchinput"
                                @input="getListOfferActive"
                                clearable
                        >
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="body">
            <Table
                    :pageInfo="pageInfo"
                    :tableData="tableData"
                    @func="getRowFormSon"
                    @funCancel="getRowCancelFormSon"
                    @funWarehouseClick="getRowWarehouseClickFormSon"

                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    propsMsg="active"/>
        </div>

        <!--        confirm self-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Confirm Task" :visible.sync="dialogFormConfirmVisible">
            <el-form
                    :rules="confirmForm_Rules"
                    ref="confirmSelfFormRef"
                    :model="form">
                <div style="font-size: 12px;margin-top: 10px">
                    Product Name
                </div>
                <el-form-item prop="offer">
                    <el-autocomplete
                            disabled
                            class="inline-input widthAll"
                            :fetch-suggestions="querySearchOffer"
                            placeholder="Offer"
                            clearable
                            v-model="form.offer"
                            prefix-icon="el-icon-shopping-cart-full"
                            @select="handleOfferSelect"
                    >
                    </el-autocomplete>
                </el-form-item>
                <el-form-item>
                    <el-input
                            readonly
                            placeholder="Organization"
                            v-model="form.name"
                            prefix-icon="el-icon-takeaway-box"
                    >
                    </el-input>
                </el-form-item>
                <div style="font-size: 12px;margin-top: 10px">
                    Price
                </div>
                <el-form-item>
                    <el-input
                            readonly
                            placeholder="Price"
                            v-model="form.price"
                            prefix-icon="iconfont icon-1"
                    >
                    </el-input>
                </el-form-item>

                <el-form-item prop="selfsite">
                    <el-select v-model="form.selfsite" placeholder="">
                        <el-option
                                v-for="item in optionsOfOfConfirmSelf"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <div style="font-size: 12px;margin-top: 10px">
                    Quantity
                </div>
                <el-form-item prop="quantity">
                    <el-input
                            placeholder="Quantity"
                            v-model="form.usedquantity"
                            prefix-icon="iconfont icon-quantity"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormConfirmVisible = false">Close</el-button>
                <el-button type="primary" @click="handleTaskConfirm('self')">Confirm</el-button>
            </div>
        </el-dialog>


        <!--        confirm warehouse-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Confirm Task" :visible.sync="dialogFormConfirmOfWarehouseVisible" width="75%">
            <el-form
                    :rules="confirmForm_Rules"
                    ref="confirmWarehouseFormRef"
                    :model="form">
                <div style="font-size: 12px;margin-top: 10px">
                    Product Name
                </div>
                <el-form-item prop="offer">
                    <el-autocomplete
                            disabled
                            class="inline-input widthAll"
                            :fetch-suggestions="querySearchOffer"
                            placeholder="Offer"
                            clearable
                            v-model="form.offer"
                            prefix-icon="el-icon-shopping-cart-full"
                            @select="handleOfferSelect"
                    >
                    </el-autocomplete>
                </el-form-item>

                <el-row class="elrowofdialogwh">
                    <el-col :span="8" style="margin: 0 0 0 5px">
                        <div style="font-size: 12px;margin-top: 10px">
                            Remain quantity
                        </div>
                        <el-form-item prop="quantity">
                            <el-input
                                    readonly
                                    placeholder="Offer"
                                    v-model="form.usedquantity"
                                    prefix-icon="el-icon-document-copy"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" style="margin: 0 0 0 5px">
                        <div style="font-size: 12px;margin-top: 10px">
                            Price
                        </div>
                        <el-form-item prop="price">
                            <el-input
                                    readonly
                                    placeholder="Offer"
                                    v-model="form.price"
                                    prefix-icon="iconfont icon-1"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" style="margin: 0 0 0 5px">
                        <div style="font-size: 12px;margin-top: 10px">
                            Organization
                        </div>
                        <el-form-item>
                            <el-input
                                    readonly
                                    placeholder="Offer"
                                    v-model="form.name"
                                    prefix-icon="el-icon-takeaway-box"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item prop="trackingnumber">
                    <el-input
                            @input="forceUpdate"
                            type="textarea"
                            :rows="5"
                            placeholder="Tracking number"
                            v-model="form.trackingnumber">
                    </el-input>
                </el-form-item>

                <div class="butOfWhSearch">
                    <el-button :disabled="!this.form.trackingnumber" @click="queryConfirmCheckWarehouse">Search
                    </el-button>
                </div>


                <el-tabs v-model="activeName" @tab-click="tabHandleClick">
                    <el-tab-pane :disabled="checkConfirmable" label="Confirmable" name="first">
                        <ActiveConfirmTable
                                @funcmultipleSelectionChange="getmultipleSelectionChange"
                                @funcConfirmSizeChange="getConfirmDataSizeChange"
                                @funcConfirmCurrentChange="getConfirmDataCurrentChange"
                                :confirmpageInfo="confirmpageInfo"
                                :tableData="tableConfirmData"
                                propsMsg="active"/>
                        <ActiveConfirmedTable
                                @funcmultipleSelectionChange="getmultipleSelectionChange"
                                @funcConfirmSizeChange="getConfirmDataSizeChange"
                                @funcConfirmCurrentChange="getConfirmDataCurrentChange"
                                :confirmpageInfo="confirmpageInfo"
                                :tableData="tableConfirmedData"
                                propsMsg="active"/>
                    </el-tab-pane>
                    <el-tab-pane :disabled="!checkConfirmable" label="Unconfirmable" name="second">
                        <div class="divoffont">
                            Not Found.
                        </div>
                        <div>
                            {{form.trackingnumber}}
                        </div>
                    </el-tab-pane>
                </el-tabs>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormConfirmOfWarehouseVisible = false">Close</el-button>
                <el-button
                        :disabled="!this.multipleSelection.length>0"
                        type="primary"
                        @click="handleTaskConfirm('warehouse')">Confirm
                </el-button>
            </div>
        </el-dialog>


        <!--cancel-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Cancel task" :visible.sync="dialogFormCancelVisible">
            <el-form
                    :rules="confirmForm_Rules"
                    ref="CancelFormRef"
                    :model="form">
                <div style="font-size: 12px;margin-top: 10px">
                    Quantity to cancel
                </div>
                <el-form-item prop="tmpquantity">
                    <el-input
                            @input="onInput()"
                            placeholder="Quantity"
                            v-model="form.tmpquantity"
                            prefix-icon="iconfont icon-quantity"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormCancelVisible = false">Close</el-button>
                <el-button type="primary" @click="handleCancelClick">ok</el-button>
            </div>
        </el-dialog>

        <!--    warehouse 点击    -->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Address" :visible.sync="dialogWarehouseTableVisible" width="70%">
            <el-table :data="gridData">
                <el-table-column property="sitename" label="Site name" width="300"></el-table-column>
                <el-table-column property="orgid" label="Organization id" width="200"></el-table-column>
                <el-table-column property="address1" label="Address"></el-table-column>
                <el-table-column property="contact" label="Site code"></el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Task/comp/ActiveTable.vue')
    const ActiveConfirmTable = () => import('@/components/buyers/Task/comp/ActiveConfirmTable.vue')
    const ActiveConfirmedTable = () => import('@/components/buyers/Task/comp/ActiveConfirmedTable.vue')

    import '../../../assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table,
            ActiveConfirmedTable,
            ActiveConfirmTable
        },
        created() {
            if (this.tableData == null) {
                this.tableData = []
                this.getListOfferActive()
            }

            // this.timer = setInterval(() =>{
            //     // console.log('刷新test')
            //     this.getListOfferActive()
            // },1000* 3)

        },
        data() {
            return {
                //表单分页
                pageInfoConfirmOfWarehouse: {
                    pageSize: 5,
                    total: 10,
                    current: 1,
                },

                //表单验证规则
                confirmForm_Rules: {
                    selfsite: [
                        {required: true, message: 'Location is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    quantity: [
                        {required: true, message: 'Quantity is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    tmpquantity: [
                        {required: true, message: 'Quantity is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    trackingnumber: [
                        {required: true, message: 'Tracking number is required.', trigger: 'change'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },

                //表单分页
                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                confirmpageInfo: {
                    pageSize: 5,
                    total: 10,
                    current: 1,
                    sellerid: null,
                    buyersid: null,
                    buyerstaskid: null,
                },

                searchinput: '',
                tabledataTmp: null,
                tableData: null,
                gridData: [{
                    sitename: 'Easygo warehouse - 55 Harvey Road',
                    organizationid: 'XRV',
                    address: '55 Harvey Road, Unit XRV, Londonderry, New Hampshire 03053\n'
                },
                ],

                optionsOfOrganization: [],
                valueOfOrganization: '',

                optionsOfOfConfirmSelf: [],
                valueOfConfirmSelf: '',

                //dialog
                dialogFormConfirmVisible: false,
                dialogFormCancelVisible: false,
                dialogWarehouseTableVisible: false,
                dialogFormConfirmOfWarehouseVisible: false,
                form: {},
                formLabelWidth: '120px',

                activeName: 'first',

                tableConfirmData: [],
                tableConfirmedData: [],
                confirmpagedata: {
                    sellerid: null,
                    buyersid: null,
                    buyerstaskid: null,
                },

                multipleSelection: [],

                checkConfirmable: false,
            };
        },
        methods: {
            forceUpdate() {
                this.$forceUpdate()
            },
            onInput() {
                this.$forceUpdate();
                if (this.form.tmpquantity > this.form.usedquantity) {
                    return this.$message.error('Insufficient quantity Error.');
                }
            },
            async getRowFormSon(data, type) {
                // console.log(this.confirmpagedata)
                this.type = 'edit'

                delete data.trackingnumber

                this.form = data

                this.form.name = this.getMember(data)

                if (type == '1') {
                    this.tableConfirmData = []
                    this.tableConfirmedData = []

                    this.dialogFormConfirmOfWarehouseVisible = true
                }

                if (type == '2') {
                    this.dialogFormConfirmVisible = true
                }

            },
            getRowCancelFormSon(data) {
                data.tmpquantity = data.usedquantity

                this.form = data
                this.dialogFormCancelVisible = true
            },
            async getRowWarehouseClickFormSon(data) {
                let tmp = data
                if (tmp.warehousesitesvalue) {
                    tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                }

                tmp.selfid = window.sessionStorage.getItem("userid")
                tmp.type = 'warehouse'

                delete tmp.warehousesites

                const {data: res} = await this.$http.post('taskoffer/querywarehouselist', tmp)

                if (res.sellersitedata) {
                    this.gridData = []
                    this.gridData = res.sellersitedata
                } else {
                    this.gridData = []
                }

                this.dialogWarehouseTableVisible = true
            },
            tabHandleClick(tab, event) {
                // console.log(tab.label);
            },
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListOfferActive()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListOfferActive()
            },
            getConfirmDataSizeChange(val) {
                this.confirmpageInfo.pageSize = val
                this.queryConfirmCheckWarehouse()
            },
            getConfirmDataCurrentChange(val) {
                this.confirmpageInfo.current = val
                this.queryConfirmCheckWarehouse()
            },
            handleSelectChange(item) {
                if (item.value != 'all') {
                    this.pageInfo.orguserselect = item.value
                } else {
                    this.pageInfo.orguserselect = null
                }

                this.getListOfferActive()
            },
            async getListOfferActive() {
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.searchinput = this.searchinput
                const {data: res} = await this.$http.post('taskoffer/queryBuyersTaskListPageActive', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tabledataTmp = []
                    if (res.querylistOfferList) {
                        res.querylistOfferList.forEach(function (item) {
                            if (item.warehousesitesvalue) {
                                let dataStrArr = item.warehousesitesvalue.split(',')
                                let dataIntArr = [];
                                dataIntArr = dataStrArr.map(item => {
                                    return +item;
                                });
                                item.warehousesitesvalue = dataIntArr
                            }
                        })
                    }

                    this.tabledataTmp = res.querylistOfferList

                    this.optionsOfOrganization = []
                    let tmpOrgList = []
                    let tmpOrg = {
                        value: 'all',
                        label: '-- All --'
                    }
                    tmpOrgList.push(tmpOrg)
                    if (res.selleruserlist) {
                        res.selleruserlist.forEach(function (row) {
                            let labeltmp = null
                            if (typeof (row.name) != 'undefined' && row.name && row.name != 0 && row.name != 'null') {
                                labeltmp = row.name
                            } else if (typeof (row.username) != 'undefined') {
                                labeltmp = row.username.split('@')[0]
                            }

                            tmpOrg = {
                                value: row.id,
                                label: labeltmp
                            }
                            tmpOrgList.push(tmpOrg)
                        })
                    }
                    this.optionsOfOrganization = tmpOrgList

                    if (res.sitedata) {
                        let tmpoptionsOfOfConfirmSelf = []
                        res.sitedata.forEach(function (item) {
                            let tmp = {
                                value: '',
                                label: ''
                            }
                            tmp.value = item.id
                            tmp.label = item.sitename
                            tmpoptionsOfOfConfirmSelf.push(tmp)
                        })
                        this.optionsOfOfConfirmSelf = tmpoptionsOfOfConfirmSelf
                    }

                    // console.log(this.sitedata)
                    if (this.info) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total

                    }
                }
            },
            handleOfferSelect(item) {
                // console.log(this.form.offer)
            },
            async querySearchOffer(queryString, cb) {
                this.pageInfo.orgid = window.sessionStorage.getItem("userid")

                // console.log(queryString)

                if (queryString !== null && queryString != '') {
                    if (queryString.split('---').length > 2) {
                        this.pageInfo.searchoffer = queryString.split('---')[2]
                    } else {
                        this.pageInfo.searchoffer = queryString
                    }
                } else {
                    this.pageInfo.searchoffer = queryString
                }

                const {data: res} = await this.$http.post('taskoffer/queryBuyersTaskListPageActive', this.pageInfo)

                let result = []

                if (!res.productdata) {
                    return result
                }

                res.productdata.forEach(function (element) {
                    let tmp = {}
                    tmp.value = element.id

                    if (element.conditionvalue !== null)
                        tmp.value += '---' + element.conditionvalue

                    if (element.name !== null)
                        tmp.value += '---' + element.name

                    result.push(tmp)
                });

                cb(result);
            },
            handleCancelClick() {
                this.$refs.CancelFormRef.validate(async valid => {
                    if (!valid) return;

                    if (this.form.tmpquantity > this.form.usedquantity) {
                        return this.$message.error('Insufficient quantity Error.');
                    }


                    let tmp = this.form
                    if (tmp.warehousesitesvalue) {
                        tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                    }

                    tmp.selfid = window.sessionStorage.getItem("userid")
                    tmp.type = 'warehouse'

                    tmp.usedquantity = tmp.tmpquantity

                    delete tmp.warehousesites

                    const {data: res} = await this.$http.post('taskoffer/taskcancel', tmp)

                    if (res.meta.status == 200) {
                        this.getListOfferActive()
                        this.dialogFormCancelVisible = false
                    } else {
                        return this.$message.error('Cancel Error.');
                    }

                })
            },

            handleTaskConfirm(type) {
                // console.log(type)
                if (type == 'warehouse') {

                    this.$refs.confirmWarehouseFormRef.validate(async valid => {
                        if (!valid) return;

                        let tmp = this.form
                        if (tmp.warehousesitesvalue) {
                            tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                        }

                        tmp.selfid = window.sessionStorage.getItem("userid")
                        tmp.type = 'warehouse'

                        delete tmp.warehousesites

                        let data = {
                            buyersTask: tmp,
                            excelPackages: this.tableConfirmData
                        }

                        const {data: res} = await this.$http.post('taskoffer/taskconfirm', data)

                        if (res.meta.status == 200) {
                            this.getListOfferActive()
                        } else {
                            return this.$message.error('Quantity Error.');
                        }
                        // console.log(subTmp)
                        this.multipleSelection.length = 0
                        // this.dialogFormConfirmOfWarehouseVisible = false
                    })
                } else if (type == 'self') {
                    this.$refs.confirmSelfFormRef.validate(async valid => {
                        if (!valid) return;

                        let tmp = this.form
                        if (tmp.warehousesitesvalue) {
                            tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                        }

                        tmp.selfid = window.sessionStorage.getItem("userid")
                        tmp.type = 'self'

                        delete tmp.warehousesites

                        let data = {
                            buyersTask: tmp,
                            excelPackages: this.tableConfirmData
                        }

                        const {data: res} = await this.$http.post('taskoffer/taskconfirm', data)

                        // console.log(subTmp)
                        if (res.meta.status == 200) {
                            this.getListOfferActive()
                        } else {
                            return this.$message.error('Quantity Error.');
                        }

                        this.dialogFormConfirmVisible = false
                    })
                }
            },
            async queryConfirmCheckWarehouse() {
                this.confirmpageInfo.sellerid = this.form.sellerid
                this.confirmpageInfo.buyersid = this.form.buyersid
                this.confirmpageInfo.buyerstaskid = this.form.id
                this.confirmpageInfo.tracking = this.form.trackingnumber

                const {data: res} = await this.$http.post('taskoffer/queryConfirmCheckWarehouse', this.confirmpageInfo)

                this.tableConfirmData = []
                this.tableConfirmedData = []

                if (res.info.list.length > 0) {
                    this.activeName = 'first'
                    this.checkConfirmable = false
                    this.tableConfirmData = res.info.list

                    let tmpList = []
                    res.info.list.forEach(function (item) {
                        item.warehouseconfirmpackages.forEach(function (whcpitem) {
                            if(whcpitem.id){
                                tmpList.push(whcpitem)
                            }
                        })
                    })

                    this.tableConfirmedData = tmpList
                    this.$message.success('success');
                } else {
                    this.checkConfirmable = true
                    this.activeName = 'second'
                }

                if (this.pageInfo) {
                    this.confirmpageInfo.current = res.info.pageNum
                    this.confirmpageInfo.pageSize = res.info.pageSize
                    this.confirmpageInfo.total = res.info.total
                }
            },
            getmultipleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getMember(row) {
                if (typeof (row.sellerrelname) != 'undefined' && row.sellerrelname && row.sellerrelname != 0 && row.sellerrelname != 'null') {
                    return row.sellerrelname
                } else if (typeof (row.sellerusername) != 'undefined') {
                    return row.sellerusername.split('@')[0]
                }
            },
        },
        watch: {
            tabledataTmp() {
                this.tableData = this.tabledataTmp
            },
        },
    }
</script>

<style scoped lang="less">
    .el-icon-arrow-down {
        font-size: 12px;
    }

    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 12px;
        margin-bottom: 5px;
    }

    .el-col {
        margin-left: 20px;
        text-align: left;
    }

    .selectprefix {
        /deep/ .el-input__inner {
            background: url('../../../assets/img/car.png') no-repeat;
            background-size: 16px 14px;
            background-position: 4px 10px;
            padding: 0px 0 0 26px;
            box-sizing: border-box;
            font-size: 14px;
        }
    }

    .elrowofdialogwh {
        display: flex;
        justify-content: space-between;
    }

    .butOfWhSearch {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }

    .widthAll {
        width: 100%;
    }

    .divoffont {
        font-weight: bolder;
    }
</style>