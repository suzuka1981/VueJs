<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2" style="display: flex;justify-content: flex-end;margin-bottom: 10px">
                <el-col :span="16" style="display: flex;justify-content: flex-start;">
                    <div style="width:200px;margin-right: 10px;">
                        <span class="demonstration">Organization name</span>

                        <el-select v-model="valueOfOrganization" placeholder="--- All ---">
                            <el-option
                                    @click.native="handleSelectChange(item)"
                                    v-for="item in optionsOfOrganization"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                    <div class="menudiv">
                        <span>
                                Total balance:
                        </span>
                        <span style="color: #66b1ff">
                                ${{handelToMaoney(releasedBalance + pendingBalance)}}
                        </span>
                    </div>

                    <div class="menudiv">
                        <span>
                                Pending balance:
                        </span>
                        <span style="color: #66b1ff">
                                ${{handelToMaoney(releasedBalance)}}
                        </span>
                    </div>

                    <div class="menudiv">
                        <span>
                                Released balance:
                            </span>
                        <span style="color: #66b1ff">
                                ${{handelToMaoney(pendingBalance)}}
                            </span>
                    </div>
                </el-col>
            </el-row>

            <el-row class="block-col-2" style="display: flex;justify-content: space-between">
                <el-col :span="12" style="display: flex;justify-content: flex-start;">
                    <div style="margin-right: 10px;margin-top: 18px">
                        <el-button @click="openRequet">
                            <span style="font-size: 20px;">+</span> Request payment
                        </el-button>
                    </div>

                    <!--                    <div style="width:250px;">-->
                    <!--                        <span class="demonstration">Filter</span>-->

                    <!--                        <el-select v-model="valueOfFilter" placeholder="&#45;&#45; Filter &#45;&#45;">-->
                    <!--                            <el-option-->
                    <!--                                    v-for="item in optionsOfFilter"-->
                    <!--                                    :key="item.value"-->
                    <!--                                    :label="item.label"-->
                    <!--                                    :value="item.value">-->
                    <!--                            </el-option>-->
                    <!--                        </el-select>-->
                    <!--                    </div>-->
                </el-col>

                <el-col :span="12" style="display: flex;justify-content: flex-end">
                    <div style="width: 250px;margin-right: 25px;margin-top: 20px">
                        <el-input
                                placeholder="Search"
                                suffix-icon="el-icon-search"
                                v-model="searchinput"
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
                    @funcCancel="getDataCancel"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :tableData="tableData"
                    @func="getRowFormSon"
                    @funComments="getRowCommentsFormSon"
                    propsMsg="active"/>
        </div>

        <!--Payment request-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Payment request" :visible.sync="dialogPaymentRequestFormVisible">
            <el-form
                    :rules="requestpaymentDialog"
                    ref="requestpaymentRef"
                    :model="form">
                <div style="font-size: 12px;margin-top: 5px">
                    Methods
                </div>
                <el-form-item prop="displayname">
                    <el-autocomplete
                            class="inline-input widthAll"
                            :fetch-suggestions="querySearchMethod"
                            placeholder="Methods"
                            clearable
                            v-model="form.displayname"
                            prefix-icon="el-icon-shopping-cart-full"
                            @select="handleMethodSelect"
                    >
                    </el-autocomplete>
                </el-form-item>

                <div style="font-size: 12px;margin-top: 5px">
                    Select Organization
                </div>
                <el-form-item prop="sellerid">
                    <el-select v-model="form.sellerid" placeholder="Organization">
                        <el-option
                                v-for="item in optionsOfOrganizationDialog"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <div style="font-size: 12px;margin-top: 5px">
                    Amount
                </div>
                <el-form-item prop="amount">
                    <el-input
                            type="number"
                            @input="amountCheck"
                            v-model="form.amount" autocomplete="off"></el-input>
                </el-form-item>

                <div style="font-size: 12px;margin-top: 5px">
                    Comment
                </div>
                <el-form-item>
                    <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="Comment"
                            v-model="form.comment">
                    </el-input>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPaymentRequestFormVisible = false">Close</el-button>
                <el-button type="primary" @click="paymentRequestConfirm">Confirm</el-button>
            </div>
        </el-dialog>

        <!--        Comments-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Comments" :visible.sync="dialogCommentsFormVisible">
            <el-form
                    ref="CommentsRef"
                    :rules="CommentsDialogRules"
                    :model="dialogForm">
                <!--                <div style="font-size: 12px;margin-top: 10px;text-align: right">-->
                <!--                    Message quantity: 0/200-->
                <!--                </div>-->
                <el-form-item prop="message">
                    <el-input
                            show-word-limit
                            maxlength="200"
                            type="textarea"
                            :rows="5"
                            placeholder="godupgodzr"
                            aria-label="godupgodzr"
                            v-model="dialogForm.message">
                    </el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-checkbox v-model="dialogForm.unreadstatus">Mark unread</el-checkbox>
                </el-form-item>
            </el-form>

            <div>
                <el-card style="overflow-y: auto;height: 150px">
                    <div v-for="item in dialogForm.comments">
                        <div @mouseover="msgUnread(item)">
                            <span style="font-size: 12px;margin-right: 10px;">
                                User:
                            </span>
                            <span style="font-size: 14px;">
                                {{getMember(item)}}
                                <span style="font-size: 10px;">
                                    <i class="el-icon-warning" style="color: cornflowerblue"
                                       v-show="item.unreadstatus=='true'"></i>
                                </span>
                            </span>
                        </div>
                        <div>
                            <span style="font-size: 12px;margin-right: 10px;">
                                Create time:
                            </span>
                            <span style="font-size: 14px;">
                                {{getReleaseDate(item.createdate,1)}}
                            </span>
                        </div>
                        <div style="margin-bottom: 10px">
                            <span style="font-size: 12px;margin-right: 10px;">
                                Message:
                            </span>
                            <span style="font-size: 14px;">
                                {{item.message}}
                            </span>
                        </div>
                    </div>
                </el-card>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCommentsFormVisible = false">Close</el-button>
                <el-button type="primary" @click="handleSendMsg">Send</el-button>
            </div>
        </el-dialog>

        <!--        edit-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Payment request" :visible.sync="dialogFormEditVisible">
            <el-form
                    :rules="requestpaymentDialog"
                    ref="requestpaymenteditRef"
                    :model="dialogForm">
                <span>
                    Organization: {{getMember(dialogForm)}}
                </span>

                <div style="font-size: 12px;margin-top: 10px">
                    Payment request
                </div>

                <el-form-item prop="displayname">
                    <el-autocomplete
                            class="inline-input widthAll"
                            :fetch-suggestions="querySearchMethod"
                            placeholder="Methods"
                            clearable
                            v-model="dialogForm.displayname"
                            prefix-icon="el-icon-shopping-cart-full"
                            @select="handleDialogFormMethodSelect"
                    >
                    </el-autocomplete>
                </el-form-item>
                <div style="font-size: 12px;margin-top: 10px">
                    Amount
                </div>
                <el-form-item prop="amount">
                    <el-input
                            @input="amountdialogFormCheck"
                            placeholder="Price"
                            v-model="dialogForm.amount"
                            prefix-icon="iconfont icon-1"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEditVisible = false">Close</el-button>
                <el-button type="primary" @click="editSubmit">Submit</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {toMoney} from "../../utils/toMoney";

    const Table = () => import('@/components/buyers/Payment/PaymentRequests/PaymentRequestsTable.vue')

    import '@/assets/icon/iconfont.css'
    import {formatDate} from "../../utils/dateFormat";

    export default {
        name: "Active",
        components: {
            Table
        },
        created() {
            this.getListPaymentRequests()
        },
        data() {
            return {
                CommentsDialogRules: {
                    // names: [
                    //     {required: true, message: 'The names is empty.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    message: [
                        {required: true, message: 'The message is empty.', trigger: 'blur'},
                        // {type: 'email', message: 'The email address is badly formatted.', trigger: ['blur', 'change']},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    // suggestion: [
                    //     {required: true, message: 'Suggestion content is required.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],

                },
                requestpaymentDialog: {
                    displayname: [
                        {required: true, message: 'The displayname is empty.', change: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    sellerid: [
                        {required: true, message: 'The organization is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    amount: [
                        {required: true, message: 'The amount is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],

                },

                releasedBalance: 0,
                pendingBalance: 0,

                //表单分页
                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                searchinput: '',
                tableData: [],

                optionsOfOrganization: [],
                optionsOfOrganizationDialog: [],
                valueOfOrganization: '',

                optionsOfFilter: [
                    {
                        value: 'all',
                        label: '-- All --'
                    },
                    {
                        value: 'newcomments',
                        label: 'New Comments'
                    },
                    {
                        value: 'starred',
                        label: 'Starred'
                    }
                ],
                valueOfFilter: '',

                //    Payment requestdialog
                dialogPaymentRequestFormVisible: false,
                form: {
                    methodsid: '',
                    displayname: '',
                    amount: '',
                    sellerid: '',
                    comment: '',
                    buyersid: '',
                },
                formLabelWidth: '120px',

                //dialog
                dialogForm: {
                    unreadstatus: true,
                    msgsourceid: '',
                    userid: '',
                    username: '',
                    message: '',
                    msgtype: '',
                    comments: [],
                },
                dialogFormEditVisible: false,
                dialogCommentsFormVisible: false,
            };
        },
        methods: {
            getMember(row) {
                if (typeof (row.userrelname) != 'undefined' && row.userrelname && row.userrelname != 0 && row.userrelname != 'null') {
                    return row.userrelname
                } else if (typeof (row.username) != 'undefined' && row.username) {
                    // console.log(row.buyersname)
                    // console.log(row.buyersname.split('@')[0])
                    return row.username.split('@')[0]
                }
            },
            getReleaseDate(date, type) {
                let tmpDate
                if (type == 1) {
                    tmpDate = formatDate(new Date(date), "MM-dd-yyyy hh:mm")
                } else if (type == 2) {
                    tmpDate = formatDate(new Date(date), "MM-dd-yyyy")
                }

                if ((tmpDate.slice(11, 13) - 12) > 0) {
                    return tmpDate.slice(0, 11) + '0' + (tmpDate.slice(11, 13) - 12) + tmpDate.slice(13, tmpDate.length) + ' PM'
                } else {
                    if (type == 1) {
                        return tmpDate + ' AM'
                    }
                }
                return tmpDate
            },
            async msgUnread(item) {
                if (item.unreadstatus != 'false' && item.userid != window.sessionStorage.getItem("userid")) {
                    const {data: res} = await this.$http.post('profile/addcomments', item)

                    this.getMessage(this.dialogForm.msgsourceid)
                }
            },
            async handleSendMsg() {
                this.$refs.CommentsRef.validate(async valid => {
                    if (!valid) return;

                    this.dialogForm.userid = window.sessionStorage.getItem("userid")
                    this.dialogForm.username = window.sessionStorage.getItem("username")
                    this.dialogForm.msgtype = 'paymentrequests'

                    const {data: res} = await this.$http.post('profile/addcomments', this.dialogForm)

                    this.getMessage(this.dialogForm.msgsourceid)

                    this.dialogForm.message = ''
                    // console.log(this.dialogForm)
                    // this.dialogFormCommentsVisible = false
                })
            },
            async getMessage(msgsourceid) {
                let subTmpData = {
                    msgtype: 'paymentrequests',
                    msgsourceid: msgsourceid,
                }

                const {data: res} = await this.$http.post('profile/querycomments', subTmpData)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Message Error.');
                } else {
                    this.dialogForm.comments = []
                    if (res.commentsList) {
                        this.dialogForm.comments = res.commentsList
                    }
                }
            },
            handelToMaoney(val) {
                return toMoney(val + '')
            },
            openRequet() {
                this.form = {}
                this.dialogPaymentRequestFormVisible = true
            },
            amountCheck() {
                if (this.form.amount > this.pendingBalance) {
                    this.$message.error('The amount error.');
                }
            },
            amountdialogFormCheck() {
                if (this.dialogForm.amount > this.pendingBalance) {
                    this.$message.error('The amount error.');
                }
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
            editSubmit() {
                this.$refs.requestpaymenteditRef.validate(async valid => {
                    if (!valid) return;

                    if (this.dialogForm.amount > this.pendingBalance) {
                        return this.$message.error('The amount error.');
                    }

                    let subTmp = {
                        id: this.dialogForm.id,
                        methodsid: this.dialogForm.methodsid,
                        displayname: this.dialogForm.displayname,
                        amount: this.dialogForm.amount,
                    }

                    const {data: res} = await this.$http.post('taskoffer/addpaymentrequest', subTmp)

                    if (res.meta.status != 200) {
                        return this.$message.error('Edit error.');
                    } else {
                        //设置token
                        this.dialogFormEditVisible = false

                        this.getListPaymentRequests()

                        return this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    }
                })
            },

            getMember(row) {
                if (typeof (row.sellerrelname) != 'undefined' && row.sellerrelname && row.sellerrelname != 0 && row.sellerrelname != 'null') {
                    return row.sellerrelname
                } else if (typeof (row.sellerusername) != 'undefined') {
                    return row.sellerusername.split('@')[0]
                }
            },
            paymentRequestConfirm() {
                this.$refs.requestpaymentRef.validate(async valid => {
                    if (!valid) return;

                    if (this.form.amount > this.pendingBalance) {
                        return this.$message.error('The amount error.');
                    }

                    this.form.buyersid = window.sessionStorage.getItem('userid')

                    this.form.status = 'buyersrp'

                    const {data: res} = await this.$http.post('taskoffer/addpaymentrequest', this.form)

                    if (res.meta.status != 200) {
                        return this.$message.error('Add error.');
                    } else {
                        //设置token
                        this.dialogPaymentRequestFormVisible = false

                        this.getListPaymentRequests()

                        return this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    }
                })
            },
            handleMethodSelect(item) {
                this.form.methodsid = item.id
            },
            handleDialogFormMethodSelect(item) {
                this.dialogForm.methodsid = item.id
            },
            async querySearchMethod(queryString, cb) {
                let subdate = {}

                subdate.userid = window.sessionStorage.getItem("userid")

                if (queryString && queryString != '') {
                    subdate.inputSearch = queryString
                } else {
                    subdate.inputSearch = ''
                }

                subdate.current = 1
                subdate.pageSize = 5

                const {data: res} = await this.$http.post('profile/querybuyerspaymentmethod', subdate)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    let result = []

                    if (res.querylistBuyersPaymentMethod) {
                        res.querylistBuyersPaymentMethod.forEach(function (item) {
                            let tmp = {}
                            tmp.value = item.displayname
                            tmp.id = item.id
                            result.push(tmp)
                        })
                    }
                    cb(result);
                }
            },
            handleSelectChange(item) {
                if (item.value != 'all') {
                    this.pageInfo.orguserselect = item.value
                } else {
                    this.pageInfo.orguserselect = null
                }

                this.getListPaymentRequests()
            },
            getRowFormSon(data) {
                this.dialogForm = data
                this.dialogFormEditVisible = true
            },
            getRowCommentsFormSon(data) {
                this.dialogForm.msgsourceid = data.id
                this.dialogCommentsFormVisible = true
                this.getMessage(data.id)
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

                const {data: res} = await this.$http.post('taskoffer/querygetpaymentrequests', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    // if(res.pendingTransactionsMap){
                    //     this.tableData = res.pendingTransactionsMap
                    // }

                    this.optionsOfOrganization = []
                    let tmpOrgList = []
                    let tmpOrgListDialog = []
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
                            tmpOrgListDialog.push(tmpOrg)
                        })
                    }
                    this.optionsOfOrganization = tmpOrgList
                    this.optionsOfOrganizationDialog = tmpOrgListDialog

                    this.releasedBalance = res.releasedBalance
                    this.pendingBalance = res.pendingBalance

                    this.tableData = []
                    if (res.pageInfoPaymentRequestMap && res.pageInfoPaymentRequestMap.list) {
                        this.tableData = res.pageInfoPaymentRequestMap.list
                    }
                    if (res.info) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total

                    }
                }
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

    .menudiv {
        margin-top: 20px;
        margin-right: 5px;
    }

</style>