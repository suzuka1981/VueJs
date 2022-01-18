<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="4" class="topofall">
                    <el-button @click="handleAdjustbalanceClick">Adjust balance</el-button>
                </el-col>

                <!--                <el-col :span="4">-->
                <!--                    <div class="spanofcenter">-->
                <!--                        Filter-->
                <!--                    </div>-->
                <!--                    <el-select-->
                <!--                            class="selectwidth"-->
                <!--                            v-model="filter"-->
                <!--                            placeholder="Warehouse">-->
                <!--                        <el-option-->
                <!--                                v-for="item in structForm.optionsOfFilter"-->
                <!--                                :key="item.value"-->
                <!--                                :label="item.label"-->
                <!--                                :value="item.value">-->
                <!--                        </el-option>-->
                <!--                    </el-select>-->
                <!--                </el-col>-->

                <el-col :span="4" :offset="16" class="topofall">
                    <el-input
                            @input="getListPaymentRequests"
                            placeholder="Search"
                            suffix-icon="el-icon-search"
                            v-model="searchinput"></el-input>
                </el-col>
            </el-row>
        </div>

        <div class="tablebody">
            <Table
                    @funcCancel="getDataCancel"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :pageInfo="pageInfo"
                    :tableData="tabledata"
                    @func="getRowhandleOpen"
                    @funcPay="getRowhandlePay"
            />
        </div>

        <div class="dialog">
            <!--            Comments-->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Comments" :visible.sync="dialogFormVisible" width="90%">
                <el-form :model="dialogForm">
                    <el-card class="heightofcard">
                        <el-card class="cardofbottom">
                            <div>
                                <span class="bolderofall">Note: </span>
                                <span>UPC: </span>
                                <span>{{dialogForm.upc}}</span>
                                <span>total Qty: </span>
                                <span>{{dialogForm.quantity}}</span>
                                <span>normal Qty: </span>
                                <span>{{dialogForm.quantity}}</span>
                                <span>abnormal Qty: </span>
                                <span>{{dialogForm.quantity}}</span>
                            </div>
                            <div>
                                <el-button
                                        class="topofall"
                                        v-show="imageButtonShow(dialogForm)"
                                        @click="handleImageView(dialogForm)">Image view
                                </el-button>
                            </div>
                        </el-card>

                        <el-card v-for="(item,index) in dialogForm.messagelist" :key="index" class="cardofbottom">
                            <div>
                                <span class="bolderofall tobluecolor">unitedelectronicsdeals &nbsp;</span>
                                <span>{{item.date}}</span>
                            </div>
                            <div class="topofall">
                                {{item.msg}}
                            </div>
                            <div class="topofall">
                                <el-button
                                        v-show="imageButtonShow(item)"
                                        @click="handleImageView(dialogForm)">Image view
                                </el-button>
                            </div>
                        </el-card>
                    </el-card>

                    <div>
                        <div style="font-size: 12px;margin-top: 10px;text-align: right">
                            Message quantity: 0/200
                        </div>
                        <el-form-item>
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="unitedelectronicsdeals"
                                    aria-label="unitedelectronicsdeals"
                                    v-model="dialogForm.message">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Close</el-button>
                    <el-checkbox class="leftandright" v-model="dialogForm.checkedMarkunread">Mark unread</el-checkbox>
                    <el-button type="primary" @click="dialogFormVisible = false">Send</el-button>
                </div>
            </el-dialog>

            <!--            Adjust balance-->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Adjust balance" :visible.sync="dialogFormAdjustbalanceVisible" width="65%">
                <el-form
                        :rules="addAdjustbalanceForm_Rules"
                        ref="addAdjustbalanceFormRef"
                        :model="dialogFormAdjustbalance">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="buyersid">
                                <div class="spanofcenter">
                                    User
                                </div>
                                <el-select
                                        class="selectwidth"
                                        v-model="dialogFormAdjustbalance.buyersid"
                                        placeholder="User">
                                    <el-option
                                            v-for="item in structForm.optionsOfSelectuser"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item prop="amount">
                                <div class="spanofcenter">
                                    Amount
                                </div>
                                <el-input
                                        type="number"
                                        class="selectwidth"
                                        prefix-icon="iconfont icon-1"
                                        v-model="dialogFormAdjustbalance.amount"
                                        placeholder="Amount" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <div class="noteoftop">
                        <el-form-item>
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="Note"
                                    v-model="dialogFormAdjustbalance.note">
                            </el-input>
                        </el-form-item>
                    </div>

                    <div class="spanofcenter topofall">
                        Balance adjustment will only appear in payment history, but not in request history. Please do
                        not use balance adjustment to record payments.
                    </div>
                </el-form>

                <el-divider></el-divider>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormAdjustbalanceVisible = false">Close</el-button>
                    <el-button type="primary" @click="addAdjustbalanceConfirm">Confirm</el-button>
                </div>
            </el-dialog>

            <!--            Payment confirm-->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Payment confirm" :visible.sync="dialogFormPaymentconfirmVisible" width="65%">
                <el-form
                        :rules="addPaymentConfirmForm_Rules"
                        ref="addPaymentConfirmRef"
                        :model="dialogFormPaymentconfirm">
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <div class="spanofcenter">
                                    User
                                </div>
                                <el-input
                                        disabled
                                        class="selectwidth"
                                        prefix-icon="iconfont icon-1"
                                        v-model="dialogFormPaymentconfirm.tmpusername"
                                        placeholder="User" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div>
                        Temp pay -- {{dialogFormPaymentconfirm.displayname}}
                    </div>

                    <el-row>
                        <el-col :span="5">
                            Description:
                        </el-col>
                        <el-col :span="5">
                            {{dialogFormPaymentconfirm.description}}
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="10">
                            <el-form-item>
                                <div class="spanofcenter">
                                    Amount
                                </div>
                                <el-input
                                        disabled
                                        class="selectwidth"
                                        prefix-icon="iconfont icon-1"
                                        v-model="dialogFormPaymentconfirm.amount"
                                        placeholder="Amount" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="4">
                            <div class="spanofcenter topofall bottomofdiv">
                                Estimate deliver date
                            </div>
                            <el-form-item prop="estimatedeliverdate">
                                <el-date-picker
                                        class="selectwidth"
                                        v-model="dialogFormPaymentconfirm.estimatedeliverdate"
                                        type="date"
                                        placeholder="Select date"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div class="iconofupload">
                        <i class="el-icon-upload"></i>
                        <el-form-item prop="fileList">
                            <el-upload
                                    ref="upload"
                                    :action="uploadUrl"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="dialogFormPaymentconfirm.fileList"
                                    :limit="1"
                                    :data="uploadData"
                                    :auto-upload="false">
                                <el-button slot="trigger" size="small">Upload file (max 1 files)</el-button>
                            </el-upload>
                            <!--                            <el-upload-->
                            <!--                                    class="upload-demo"-->
                            <!--                                    ref="upload"-->
                            <!--                                    :action="uploadUrl"-->
                            <!--                                    :on-preview="handlePreview"-->
                            <!--                                    :on-remove="handleRemove"-->
                            <!--                                    :file-list="dialogFormPaymentconfirm.fileList"-->
                            <!--                                    :auto-upload="false"-->
                            <!--                                    :data="data"-->
                            <!--                            >-->
                            <!--                                <el-button slot="trigger" size="small">Upload file (max 1 files)</el-button>-->
                            <!--                            </el-upload>-->
                        </el-form-item>
                    </div>

                    <div class="noteoftop">
                        <el-form-item>
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="Note"
                                    v-model="dialogFormPaymentconfirm.note">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>

                <el-divider></el-divider>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormPaymentconfirmVisible = false">Close</el-button>
                    <el-button type="primary" @click="paymentConfirm">Confirm</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    const Table = () => import('@/components/provider/Payment/ToPay/comp/ProviderToPayTable.vue')

    export default {
        name: "ProviderPackageBytracking",
        components: {
            Table,
        },
        created() {
            this.getListPaymentRequests()
        },
        data() {
            return {
                //表单验证规则
                addAdjustbalanceForm_Rules: {
                    buyersid: [
                        {required: true, message: 'The user is required.', trigger: 'change'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    amount: [
                        {required: true, message: 'The amount is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },

                addPaymentConfirmForm_Rules: {
                    estimatedeliverdate: [
                        {required: true, message: 'The estimatedeliver date is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    // fileList: [
                    //     {required: true, message: 'The upload file is required.', trigger: 'change'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                },

                structForm: {
                    optionsOfSelectuser: [],
                },

                //表单分页
                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                searchinput: '',

                filter: '1',
                structForm: {
                    optionsOfFilter: [
                        {
                            value: '1',
                            label: 'All'
                        },
                        {
                            value: '2',
                            label: 'New Comments'
                        },
                        {
                            value: '3',
                            label: 'Starred'
                        },
                    ],
                },

                tabledata: [],

                //dialog
                //Comments
                dialogFormVisible: false,
                dialogForm: {
                    urls: [],
                },

                uploadData: {
                    buyersConfirmid: '',
                },

                uploadUrl: axios.defaults.baseURL + "taskoffer/upload",

                //Adjust balance
                dialogFormAdjustbalanceVisible: false,
                dialogFormAdjustbalance: {},

                // Payment confirm
                dialogFormPaymentconfirmVisible: false,
                dialogFormPaymentconfirm: {},
                endDate: '',
            }
        },
        methods: {
            paymentConfirm() {
                this.$refs.addPaymentConfirmRef.validate(async valid => {
                    if (!valid) return;

                    this.dialogFormPaymentconfirm.sellerid = window.sessionStorage.getItem("userid")
                    this.dialogFormPaymentconfirm.paytype = 'PaymentSleep'

                    const {data: res} = await this.$http.post('taskoffer/addAdjustbalanceConfirm', this.dialogFormPaymentconfirm)

                    if (res.meta.status != 200) {
                        return this.$message.error('Select Error.');
                    } else {

                        this.uploadData.buyersConfirmid = res.data

                        this.$refs.upload.submit()

                        this.getListPaymentRequests()

                        this.dialogFormPaymentconfirmVisible = false

                        return this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    }
                })
            },
            addAdjustbalanceConfirm() {
                this.$refs.addAdjustbalanceFormRef.validate(async valid => {
                    if (!valid) return;

                    this.dialogFormAdjustbalance.sellerid = window.sessionStorage.getItem("userid")

                    const {data: res} = await this.$http.post('taskoffer/addAdjustbalanceConfirm', this.dialogFormAdjustbalance)

                    if (res.meta.status != 200) {
                        return this.$message.error('Select Error.');
                    } else {
                        this.getListPaymentRequests()
                    }

                    this.dialogFormAdjustbalanceVisible = false

                    return this.$message({
                        message: 'success',
                        type: 'success'
                    });
                })
            },
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListPaymentRequests()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListPaymentRequests()
            },

            async getListPaymentRequests() {
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.userid = window.sessionStorage.getItem("userid")
                this.pageInfo.searchinput = this.searchinput
                this.pageInfo.paymentrequestsstatus = 'buyersrp'

                this.pageInfo.usertype = 'seller'

                const {data: res} = await this.$http.post('taskoffer/querygetpaymentrequests', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    let tmpItem = {
                        releasedBalance: res.releasedBalance,
                        pendingBalance: res.pendingBalance,
                        sellerTmpAmountTotal: res.sellerTmpAmountTotal,
                    }


                    this.$emit('funcGetData', tmpItem)

                    this.tabledata = []
                    if (res.pageInfoPaymentRequestMap && res.pageInfoPaymentRequestMap.list) {
                        this.tabledata = res.pageInfoPaymentRequestMap.list
                    }

                    this.structForm.optionsOfSelectuser = []
                    let tmpOrgList = []
                    let tmpOrg = {
                        value: 'all',
                        label: '-- All --'
                    }
                    // tmpOrgList.push(tmpOrg)
                    if (res.buyersList) {
                        res.buyersList.forEach(function (row) {
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
                    this.structForm.optionsOfSelectuser = tmpOrgList

                    if (res.info) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total

                    }
                }
            },

            selectChangeOfProduct(val) {
                if (val === '1') {
                    this.dialogForm = {
                        upc: '195908335825',
                        note: 'HP 15.6" Touchscreen Laptop - 11th Gen Intel Core i5-1135G7, 12GB, 512GB SSD',
                    }
                }
            },
            handleImageView(row) {
                //跳转新页面router写法
                const routeData = this.$router.resolve({
                    name: 'ViewImages',
                    query: {urls: row.urls, rowlength: row.urls.length},
                    // params: {urls: row}
                })

                window.open(routeData.href, '_blank');
            },
            imageButtonShow(row) {
                // console.log(this.dialogForm.urls.length)
                return row.urls.length > 0
            },
            getRowhandleOpen(row) {
                this.dialogFormVisible = true
                this.dialogForm = row
            },
            handleAdjustbalanceClick() {
                this.dialogFormAdjustbalance = {}
                this.dialogFormAdjustbalanceVisible = true
            },
            getRowhandlePay(row) {
                this.dialogFormPaymentconfirm = row

                this.dialogFormPaymentconfirm.tmpusername = this.getMember(row)
                this.dialogFormPaymentconfirm.fileList = []

                this.dialogFormPaymentconfirmVisible = true
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            async getDataCancel(row) {
                let subTmp = {
                    id: row.id
                }

                const {data: res} = await this.$http.post('taskoffer/cancelpaymentrequest', subTmp)

                if (res.meta.status != 200) {
                    return this.$message.error('Cancel error.');
                } else {
                    this.getListPaymentRequests()

                    return this.$message({
                        message: 'success',
                        type: 'success'
                    });
                }
            },
            getMember(row) {
                if (typeof (row.buyersrelname) != 'undefined' && row.buyersrelname && row.buyersrelname != 0 && row.buyersrelname != 'null') {
                    return row.buyersrelname
                } else if (typeof (row.buyersusername) != 'undefined') {
                    return row.buyersusername.split('@')[0]
                }
            },
        },
    }
</script>

<style scoped lang="less">
    .leftof {
        margin-left: 5px;
    }

    .selectwidth {
        width: 100%;
    }

    .spanofcenter {
        font-size: 12px;
    }

    .el-form-item {
        margin-bottom: 5px;
    }

    .noteoftop {
        margin-top: 10px;
    }

    .heightofcard {
        height: 300px;
        overflow-y: auto;
    }

    .cardofbottom {
        margin-bottom: 5px;
    }

    .bolderofall {
        font-weight: bolder;
    }

    .topofall {
        margin-top: 15px;
    }

    .tobluecolor {
        color: #42b983;
    }

    .leftandright {
        margin-left: 10px;
        margin-right: 10px;
    }

    /deep/ .el-dialog__body {
        padding-bottom: 0px;
    }

    .el-dialog__footer {
        padding-top: 0px;
    }

    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 12px;
        /*margin-bottom: 5px;*/
    }

    .bottomofdiv {
        margin-bottom: 10px;
    }

    .iconofupload {
        display: flex;
        font-size: 25px;

        i {
            margin-top: 7px;
            margin-right: 5px;
        }
    }
</style>