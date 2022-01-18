<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2" style="display: flex;justify-content: space-between">
                <el-col :span="12" style="display: flex;justify-content: flex-start;">
                    <!--                    <div style="margin-right: 10px;margin-top: 18px">-->
                    <!--                        <el-button @click="getRowFormSon('', 'add')">-->
                    <!--                            <span style="font-size: 20px;">+</span> Add offer-->
                    <!--                        </el-button>-->
                    <!--                    </div>-->

                    <!--                    <div style="margin-right: 10px;margin-top: 18px">-->
                    <!--                        <el-button @click="" :disabled="true">-->
                    <!--                            <span style="font-size: 20px;">+</span> Archive offers (0)-->
                    <!--                        </el-button>-->
                    <!--                    </div>-->
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
                    @funcDataReLoad="getListOfferActive"
                    @func="getRowFormSon"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :pageInfo="pageInfo"
                    :tableData="tableData"
                    propsMsg="active"/>
        </div>

        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :title="getTypeTitle" :visible.sync="dialogFormTakeVisible" width="95%">
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
    const Table = () => import('@/components/provider/Offer/comp/ProviderExpiredTable.vue')

    import '../../../assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table
        },
        created() {
            this.getListOfferActive()
        },
        data() {
            return {
                //表单验证规则
                addAndEditOfferForm_Rules: {
                    offer: [
                        {required: true, message: 'offer is required.', change: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    // expirationdate: [
                    //     {required: true, message: 'Expiration date is required.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    // pendingperioddays: [
                    //     {required: true, message: 'Pending period days is required.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
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

                searchinput: '',
                tabledataTmp: [],
                tableData: [],


                //dialog
                productdata: [],
                sittingdata: [],
                warehousesitesTmp: [],
                dialogFormTakeVisible: false,
                form: {},
                type: '',
                movetotop: false,
            };
        },
        methods: {
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListOfferActive()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListOfferActive()
            },
            getRowFormSon(data, type) {
                this.dialogFormTakeVisible = true

                //没有解决 之后 新add保留了edit的错误状态
                this.$nextTick(() => {
                    if (this.$refs.addAndEditOfferForm_Rules !== undefined) {
                        this.$refs.addAndEditOfferForm_Rules.resetFields()
                        this.$refs.addAndEditOfferForm_Rules.clearStates()
                    }
                })


                if (type === 'edit') {
                    this.type = 'edit'
                    data.warehousesites = this.warehousesitesTmp
                    this.form = data
                } else if (type === 'add') {
                    this.type = 'add'
                    this.form = {
                        offer: '',
                        price: '',
                        pendingperioddays: this.sittingdata.pendingperioddays,
                        quantity: '',
                        onlyshiptowarehouse: false,
                        minselfstoragequantity: '1',
                        bonus: '0',
                        warehousesites: this.warehousesitesTmp,
                        warehousesitesvalue: [],
                        visibletoallmembers: true,
                        notifymembers: true,
                        requiredservicetag: true,
                        note: '',
                        movetotop: true,

                        //默认当前日期+3天？
                        expirationdate: this.getDataPThree,
                    }
                }
                // console.log(this.form)
            },
            async getListOfferActive() {
                this.pageInfo.orgid = window.sessionStorage.getItem("userid")
                this.pageInfo.pagetype = "expired"
                this.pageInfo.searchinput = this.searchinput
                const {data: res} = await this.$http.post('offer/queryListPageActive', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.sitedata = res.sitedata
                    this.productdata = res.productdata
                    this.sittingdata = res.sittingdata

                    let tmpSites = []
                    if (res.sitedata) {
                        res.sitedata.forEach(function (item) {
                            let tmp = {}
                            tmp.value = item.id
                            tmp.label = item.sitename + '-' + item.address1
                            tmpSites.push(tmp)
                        })
                    }

                    this.warehousesitesTmp = tmpSites

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

                    // console.log(this.tabledataTmp)

                    this.pageInfo.current = res.info.pageNum
                    this.pageInfo.pageSize = res.info.pageSize
                    this.pageInfo.total = res.info.total
                }
            },
            async querySearchOffer(queryString, cb) {
                this.pageInfo.pagetype = "active"
                this.pageInfo.orgid = window.sessionStorage.getItem("userid")

                if (queryString !== null && queryString != '') {
                    if (queryString.split('---').length > 2) {
                        this.pageInfo.searchoffer = queryString.split('---')[2]
                    } else {
                        this.pageInfo.searchoffer = queryString
                    }
                } else {
                    this.pageInfo.searchoffer = queryString
                }

                const {data: res} = await this.$http.post('offer/queryListPageActive', this.pageInfo)

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

            handleOfferSelect(item) {
                // console.log(this.form.offer)
            },
            async offerSave() {
                this.$refs.addAndEditOfferFormRef.validate(async valid => {
                    if (!valid) return;

                    console.log(this.form)

                    let tmp = this.form


                    tmp.orgid = window.sessionStorage.getItem("userid")
                    tmp.productid = tmp.offer.split('---')[0]
                    if (tmp.warehousesitesvalue && tmp.warehousesitesvalue != '') {
                        tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                    } else {
                        // return this.$message.error('Select is required.');
                    }

                    // delete tmp.offer
                    delete tmp.warehousesites

                    this.dialogFormTakeVisible = false

                    const {data: res} = await this.$http.post('offer/addandeditoffer', tmp)

                    this.getListOfferActive()
                })
            },
        },
        computed: {
            getTypeTitle() {
                if (this.type === 'edit') {
                    return 'Edit offer'
                } else if (this.type === 'add') {
                    return 'Add offer'
                }
            },
            getDataPThree() {
                let datetime = new Date()
                datetime = datetime.setDate(datetime.getDate() + 3)
                return new Date(datetime)
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
    .widthAll {
        width: 100%;
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

    .el-checkbox, .el-checkbox__input {
        white-space: normal;
        word-break: break-all;
    }

    .dialog-footer {
        display: flex;
        justify-content: space-between;
    }

    /deep/ .errorColor {
        margin-top: -60px;
        color: black;
    }

    .topOfCheckWH {
        margin-top: 20px;
    }
</style>