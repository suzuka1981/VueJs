<template>
    <div>
        <div class="top">
            <el-row type="flex" justify="space-between">
                <el-col :span="8" class="betweenofspan">
                    <el-button @click="handleAddProduct(null,'add')"><span class="bigsizeofspan">+</span>Add product
                    </el-button>

                    <!--                    <el-button @click=""><span class="bigsizeofspan">+</span>Add Offer没写-->
                    <!--                    </el-button>-->

                    <!--                    <el-dropdown @command="handleCommandExport" class="dropdownset">-->
                    <!--                      <span class="el-dropdown-link">-->
                    <!--                        Export（待做）<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                    <!--                      </span>-->
                    <!--                        <el-dropdown-menu slot="dropdown">-->
                    <!--                            <el-dropdown-item command="Exportall">Export all</el-dropdown-item>-->
                    <!--                        </el-dropdown-menu>-->
                    <!--                    </el-dropdown>-->

                    <!--                    <el-button :disabled="openIsDisabled"-->
                    <!--                               @click="handleofArchiveselected">Archive selected（待做）-->
                    <!--                    </el-button>-->
                </el-col>
                <!--                <el-col :span="6" class="betweenofspan">-->
                <!--                    <div>Total: $0（待做）</div>-->
                <!--                    <div>-->
                <!--                        Current page: $0（待做）-->
                <!--                    </div>-->
                <!--                </el-col>-->

                <el-col :span="4">
                    <el-input
                            @input="getListProduct"
                            v-model="searchinput" placeholder="Search"></el-input>
                </el-col>
            </el-row>
        </div>


        <div class="tablebody">
            <Table :tableData="tabledata"
                   :pageInfo="pageInfo"
                   @funcSizeChange="getDataSizeChange"
                   @funcCurrentChange="getDataCurrentChange"

                   @func="getRowhandleSelectionChange"
                   @funcEditnote="handleAddProduct"
                   @funcDetail="handleDetail"
                   @funcAddOffer="getRowFormSon"
            />
        </div>

        <!--        add and edit product-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :title="dialogForm.titileName" width="70%" :visible.sync="dialogFormVisible">
            <el-form
                    :rules="addAndEditSiteForm_Rules"
                    ref="addAndEditProductFormRef"
                    :model="dialogForm">
                <el-form-item prop="name">
                    <div class="el-form-item__error errorColor" v-show="dialogForm.name">
                        Names
                    </div>
                    <el-input
                            prefix-icon="el-icon-c-scale-to-original"
                            v-model="dialogForm.name"
                            placeholder="Names" autocomplete="off"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="11">
                        <el-form-item>
                            <div class="el-form-item__error errorColor" v-show="dialogForm.price">
                                Price
                            </div>
                            <el-input
                                    class="selectwidth"
                                    prefix-icon="iconfont icon-1"
                                    v-model="dialogForm.price"
                                    placeholder="Price" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item prop="conditionvalue">
                            <div class="el-form-item__error errorColor" v-show="dialogForm.conditionvalue">
                                Condition
                            </div>
                            <el-select
                                    class="selectwidth"
                                    v-model="dialogForm.conditionvalue"
                                    placeholder="-- All --">
                                <el-option
                                        v-for="item in formstruct.optionsOfCondition"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <div class="el-form-item__error errorColor" v-show="dialogForm.asin">
                        ASIN
                    </div>
                    <el-input
                            prefix-icon="el-icon-aim"
                            v-model="dialogForm.asin"
                            placeholder="ASIN" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <div class="el-form-item__error errorColor" v-show="dialogForm.sku">
                        SKU
                    </div>
                    <el-input
                            prefix-icon="el-icon-aim"
                            v-model="dialogForm.sku"
                            placeholder="SKU" autocomplete="off"></el-input>
                </el-form-item>

                <div class="leftofdiv">
                    <el-form-item class="selectwidth" prop="upc">
                        <div class="el-form-item__error errorColor" v-show="dialogForm.upc">
                            UPC
                        </div>
                        <el-input
                                prefix-icon="el-icon-s-flag"
                                v-model="dialogForm.upc"
                                placeholder="UPC" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-button
                            type="text"
                            size="small"
                            @click="" disabled> Check archive
                    </el-button>
                </div>

                <el-form-item>
                    <el-checkbox v-model="dialogForm.checked">Please confirm. Warning: leaving UPC empty will cause
                        inbound packages not able to link
                    </el-checkbox>
                </el-form-item>

                <el-form-item>
                    <div class="spanofcenter">
                        Note
                    </div>
                    <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="Note"
                            v-model="dialogForm.note">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Close</el-button>
                <el-button type="primary" @click="addAndEditProductSave">Save</el-button>
            </div>
        </el-dialog>

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

        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Add offer" :visible.sync="dialogFormTakeVisible" width="95%">
            <el-form
                    :rules="addAndEditOfferForm_Rules"
                    ref="addAndEditOfferFormRef"
                    :model="form">
                <div style="font-size: 12px;margin-top: 10px">
                    Product
                </div>
                <el-form-item prop="offer">
                    <el-autocomplete
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

                <el-divider></el-divider>

                <el-row>
                    <el-col :span="8">
                        <div style="font-size: 12px;margin-top: 10px">
                            Expiration date
                        </div>
                        <el-form-item prop="expirationdate">
                            <el-date-picker
                                    style="width: 100%"
                                    v-model="form.expirationdate"
                                    type="date"
                                    placeholder="Expiration date">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <div style="font-size: 12px;margin-top: 10px">
                            Payment pending period
                        </div>
                        <el-form-item prop="pendingperioddays">
                            <el-input
                                    placeholder="Payment pending period"
                                    v-model="form.pendingperioddays"
                                    prefix-icon="el-icon-s-operation"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <div style="font-size: 12px;margin-top: 10px">
                            Quantity
                        </div>
                        <el-form-item prop="quantity">
                            <el-input
                                    placeholder="Quantity"
                                    v-model="form.quantity"
                                    prefix-icon="el-icon-s-operation"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <div style="font-size: 12px;margin-top: 10px">
                            Price
                        </div>
                        <el-form-item prop="price">
                            <el-input
                                    :precision="2"
                                    placeholder="Price"
                                    v-model="form.price"
                                    prefix-icon="iconfont icon-1"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="6">
                        <el-checkbox v-model="form.onlyshiptowarehouse" class="widthAll topOfCheckWH">
                            <div style="font-size: 12px">
                                Only ship to warehouse
                            </div>
                        </el-checkbox>
                    </el-col>
                    <el-col :span="6" v-show="!form.onlyshiptowarehouse">
                        <div style="font-size: 12px;margin-top: 10px;word-wrap:break-word;word-break:break-all;width: 100%">
                            Min self-storage quantity
                        </div>
                        <el-form-item prop="minselfstoragequantity">
                            <el-input
                                    placeholder="Min self-storage quantity"
                                    v-model="form.minselfstoragequantity"
                                    prefix-icon="el-icon-s-operation"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-show="!form.onlyshiptowarehouse">
                        <div style="font-size: 12px;margin-top: 10px">
                            Bonus
                        </div>
                        <el-form-item prop="bonus">
                            <el-input
                                    placeholder="Bonus"
                                    v-model="form.bonus"
                                    prefix-icon="iconfont icon-1"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div style="font-size: 12px;margin-top: 10px">
                    Select
                </div>
                <el-form-item prop="warehousesites">
                    <el-select
                            clearable
                            v-model="form.warehousesitesvalue" multiple placeholder="Select" style="width: 100%">
                        <el-checkbox
                                @change="selectall"
                                style="margin-left: 15px;margin-bottom: 10px;"
                                v-model="checkSelectAll">Select all
                        </el-checkbox>
                        <el-option
                                v-for="item in form.warehousesites"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-divider></el-divider>

                <el-row>
                    <el-col :span="6">
                        <el-checkbox v-model="form.visibletoallmembers" style="width: 100%">
                            <div style="font-size: 12px">
                                Visible to all members
                            </div>
                        </el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox v-model="form.notifymembers" style="width: 100%">
                            <div style="font-size: 12px">
                                Notify members
                            </div>
                        </el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox v-model="form.requiredservicetag" style="width: 100%">
                            <div style="font-size: 12px">
                                Required service tag
                            </div>
                        </el-checkbox>
                    </el-col>
                </el-row>

                <el-input
                        type="textarea"
                        autosize
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="Note"
                        style="margin-top: 20px"
                        v-model="form.note">
                </el-input>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormTakeVisible = false">Close</el-button>
                <el-checkbox v-model="movetotop" style="width: 100%;margin-right: 10px;margin-top: 10px;"
                             v-show="type === 'edit'"
                >
                    Move to top
                </el-checkbox>
                <el-button type="primary" @click="offerSave">Save</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Warehouse/Inventory/comp/ProviderInventoryActiveTable.vue')
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
                addAndEditOfferForm_Rules: {
                    offer: [
                        {required: true, message: 'offer is required.', change: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    // expirationdate: [
                    //     {required: true, message: 'Expiration date is required.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    pendingperioddays: [
                        {required: true, message: 'Pending period days is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    quantity: [
                        {required: true, message: 'Quantity is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: 'Price is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    warehousesites: [
                        {required: true, message: 'Warehouse sites is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },
                //表单分页
                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                detailPageInfo: {
                    pageSize: 100,
                    total: 10,
                    current: 1,
                },

                detailInstockPageInfo: {
                    pageSize: 100,
                    total: 10,
                    current: 1,
                },

                //表单验证规则
                addAndEditSiteForm_Rules: {
                    name: [
                        {required: true, message: 'Name is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    conditionvalue: [
                        {required: true, message: 'Condition value is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    upc: [
                        {required: true, message: 'Upc value is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },


                xAxisData: ['2021/09/01', '2021/09/02', '2021/09/03', '2021/09/04', '2021/09/05', '2021/09/06', '2021/09/07',],
                seriesPriceData: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                seriesQuantityData: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],

                formstruct: {
                    optionsOfExport: [
                        {
                            value: '1',
                            label: 'Export all'
                        },
                    ],

                    optionsOfCondition: [
                        {
                            value: 'new',
                            label: 'New'
                        }, {
                            value: 'used',
                            label: 'Used'
                        }, {
                            value: 'refurbished',
                            label: 'Refurbished'
                        }
                    ],

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
                openIsDisabled: true,

                tabledata: [],
                tabledataTmp: [],

                //add and edit
                dialogForm: {
                    conditionvalue: 'new',
                    checked: false,
                },
                dialogFormVisible: false,

                //Details
                dialogdetailsVisible: false,
                activeName: 'first',

                instockTable: [],
                instockTableforwarehouse: [],

                confirmedTable: [],

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

                detailData: {},

                form: {},
                checkSelectAll: false,
                movetotop: false,
                dialogFormTakeVisible: false,
                type: '',
                sittingdata: [],
            }
        },
        methods: {
            getRowFormSon(data, type) {
                this.dialogFormTakeVisible = true

                //没有解决 之后 新add保留了edit的错误状态
                this.$nextTick(() => {
                    if (this.$refs.addAndEditOfferForm_Rules !== undefined) {
                        this.$refs.addAndEditOfferForm_Rules.resetFields()
                        this.$refs.addAndEditOfferForm_Rules.clearStates()
                    }
                })

                let tmp = {}
                tmp.value = data.id

                if (data.conditionvalue !== null)
                    tmp.value += '---' + data.conditionvalue

                if (data.name !== null)
                    tmp.value += '---' + data.name

                this.type = 'add'
                this.form = {
                    offer: tmp.value,
                    price: '',
                    pendingperioddays: this.sittingdata.pendingperioddays,
                    quantity: '',
                    onlyshiptowarehouse: false,
                    minselfstoragequantity: '1',
                    bonus: '0',
                    warehousesites: this.warehousesites,
                    warehousesitesvalue: [],
                    visibletoallmembers: true,
                    notifymembers: true,
                    requiredservicetag: true,
                    note: '',
                    movetotop: true,

                    //默认当前日期+3天？
                    expirationdate: this.getDataPThree,
                }
            },
            async offerSave() {
                this.$refs.addAndEditOfferFormRef.validate(async valid => {
                    if (!valid) return;

                    if (this.offersearcherror) {
                        return this.$message.error('Product not exist.');
                    }

                    // console.log(this.form)

                    let tmp = this.form

                    if (tmp.quantitybak) {
                        let tmpquantitychange = tmp.quantity - tmp.quantitybak
                        if ((tmpquantitychange + tmp.usedquantity) < 0) {
                            return this.$message.error('Offer quantity is error.');
                        }

                        tmp.usedquantity = tmpquantitychange + tmp.usedquantity

                        // console.log(tmpquantitychange)
                        // console.log(tmp.quantity)
                        // console.log(tmp.usedquantity)

                    }


                    tmp.orgid = window.sessionStorage.getItem("userid")
                    tmp.productid = tmp.offer.split('---')[0]
                    if (tmp.warehousesitesvalue && tmp.warehousesitesvalue != '') {
                        tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                    } else {
                        tmp.warehousesitesvalue = null
                    }

                    // delete tmp.offer
                    delete tmp.warehousesites

                    this.dialogFormTakeVisible = false

                    const {data: res} = await this.$http.post('offer/addandeditoffer', tmp)

                })
            },
            selectall() {
                if (this.checkSelectAll) {
                    this.form.warehousesites.map((item) => {
                        this.form.warehousesitesvalue.push(item.value)
                    })
                } else {
                    this.form.warehousesitesvalue = []
                }
            },
            async querySearchOffer(queryString, cb) {
                this.pageInfo.pagetype = "active"
                this.pageInfo.orgid = window.sessionStorage.getItem("userid")
                let result = []
                this.offersearcherror = true

                if (queryString && queryString != '') {
                    if (queryString.split('---').length > 2) {
                        this.pageInfo.searchoffer = queryString.split('---')[2]
                    } else {
                        this.pageInfo.searchoffer = queryString
                    }
                } else {
                    this.pageInfo.searchoffer = queryString
                }

                const {data: res} = await this.$http.post('offer/queryListPageActive', this.pageInfo)

                // console.log(res)

                if (!res.productdata && res.productdata.length == 0) {
                    this.offersearcherror = true
                } else {
                    this.offersearcherror = false
                }

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
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

                    if (result.length == 0) {
                        this.offersearcherror = true
                    } else {
                        this.offersearcherror = false
                    }


                    cb(result);
                }
            },
            handleOfferSelect(item) {
                // console.log(this.form.offer)
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
            addAndEditProductSave() {
                this.$refs.addAndEditProductFormRef.validate(async valid => {
                    if (!valid) return;
                    this.dialogForm.orgid = window.sessionStorage.getItem("userid")

                    const {data: res} = await this.$http.post('warehouse/addandeditproduct', this.dialogForm)

                    if (res.meta.status == 303) {
                        return this.$message.error(res.meta.msg)
                    } else if (res.meta.status == 200) {
                        this.dialogFormVisible = false

                        this.getListProduct()
                    }
                })
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

            async handleAddProduct(val, type) {
                if (type === 'add') {
                    this.dialogForm = {}
                    this.dialogForm.conditionvalue = 'new'
                    this.dialogForm.titileName = 'Add product'
                    this.dialogFormVisible = true
                } else if (type === 'edit') {
                    this.dialogForm = val
                    this.dialogForm.titileName = 'Edit product'
                    this.dialogFormVisible = true
                } else if (type == 'archive') {
                    this.dialogForm.orgid = window.sessionStorage.getItem("userid")

                    val.status = 'archive'
                    const {data: res} = await this.$http.post('warehouse/addandeditproduct', val)

                    this.getListProduct()
                }
            },

            async handleDetail(val) {
                //拼接instock
                // console.log(this.detailPageInfo)
                this.detailPageInfo.instcokpageSize = this.detailInstockPageInfo.pageSize
                this.detailPageInfo.instcokcurrent = this.detailInstockPageInfo.current
                // console.log(this.detailInstockPageInfo)

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
                    }

                    if (res.infoinsotckforwarehouse.list) {
                        this.instockTable = res.infoinsotckforwarehouse.list
                        // console.log(res.infoinsotckforwarehouse.list)
                        // console.log(this.instockTable)

                    }

                    // if (res.infoinsotck.list) {
                    //     // this.instockTable = res.infoinsotck.list
                    //     // this.instockTable.push(...res.infoinsotck.list)
                    //
                    //     // console.log(this.confirmedTable)
                    // }

                    this.detailPageInfo.current = res.info.pageNum
                    this.detailPageInfo.pageSize = res.info.pageSize
                    this.detailPageInfo.total = res.info.total

                    this.detailInstockPageInfo.current = res.infoinsotckforwarehouse.pageNum
                    this.detailInstockPageInfo.pageSize = res.infoinsotckforwarehouse.pageSize
                    this.detailInstockPageInfo.total = res.infoinsotckforwarehouse.total
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

                    if (res.infoinsotckforwarehouse.list) {
                        this.instockTable = res.infoinsotckforwarehouse.list

                    }

                    // if (res.infoinsotck.list) {
                    //     // this.instockTable = res.infoinsotck.list
                    //     // this.instockTable.push(...res.infoinsotck.list)
                    //
                    //     // console.log(this.confirmedTable)
                    // }

                    this.detailPageInfo.current = res.info.pageNum
                    this.detailPageInfo.pageSize = res.info.pageSize
                    this.detailPageInfo.total = res.info.total

                    this.detailInstockPageInfo.current = res.infoinsotckforwarehouse.pageNum
                    this.detailInstockPageInfo.pageSize = res.infoinsotckforwarehouse.pageSize
                    this.detailInstockPageInfo.total = res.infoinsotckforwarehouse.total
                }

            },

            handleClick(tab, event) {
                // console.log(tab, event);
                // console.log(this.activeName);
            },
            async getListProduct() {
                this.pageInfo.orgid = window.sessionStorage.getItem("userid")
                this.pageInfo.searchinput = this.searchinput

                this.tabledataTmp = []

                const {data: res} = await this.$http.post('warehouse/queryListPageProduct', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.sittingdata = res.sittingdata

                    let tmpSites = []
                    if (res.sitedata) {
                        res.sitedata.forEach(function (item) {
                            let tmp = {}
                            tmp.value = item.id

                            // tmp.label = item.sitename + '-' + item.address1 + '-' + item.address2 + '-' + item.contact + '-' + item.city + '-' + item.state + '-' + item.zip

                            tmp.label = item.sitename

                            if (item.address1) {
                                tmp.label = tmp.label + '-' + item.address1
                            }
                            if (item.address2) {
                                tmp.label = tmp.label + '-' + item.address2
                            }
                            if (item.contact) {
                                tmp.label = tmp.label + '-' + item.contact
                            }
                            if (item.city) {
                                tmp.label = tmp.label + '-' + item.city
                            }
                            if (item.state) {
                                tmp.label = tmp.label + '-' + item.state
                            }
                            if (item.zip) {
                                tmp.label = tmp.label + '-' + item.zip
                            }

                            tmpSites.push(tmp)
                        })
                    }

                    this.warehousesites = tmpSites

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

    .divofflex {
        display: flex;
    }

    /deep/ .errorColor {
        margin-top: -60px;
        color: black;
    }

    .widthAll {
        width: 100%;
    }
</style>