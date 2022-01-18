<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="3">
                    <div class="spanofcenter">
                        Select user
                    </div>
                    <el-select
                            class="selectwidth"
                            v-model="topSearchForm.selectuser"
                            placeholder="Select user">
                        <el-option
                                @click.native="handleSelectChange(item)"
                                v-for="item in structForm.optionsOfSelectuser"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="4" class="martopto leftof">
                    <el-checkbox
                            @change="getListTransactionhistory"
                            v-model="topSearchForm.checkedPaymentonly">Payment only
                    </el-checkbox>
                </el-col>

                <!--                <el-col :span="4" :offset="5" class="martopto">-->
                <!--                    <el-switch-->
                <!--                            v-model="topSearchForm.searchDateOfWsitch"-->
                <!--                            active-text="Search by create date"-->
                <!--                            >-->
                <!--                    </el-switch>-->
                <!--                </el-col>-->

                <el-col :span="4" :offset="9">
                    <span class="demonstration">end date</span>
                    <el-date-picker
                            v-model="topSearchForm.endDate"
                            type="date"
                            placeholder="Select date"
                    >
                    </el-date-picker>
                </el-col>

                <el-col :span="3" class="searchbut">
                    <el-button @click="getListTransactionhistory">Search</el-button>
                </el-col>
            </el-row>
        </div>

        <div class="tablebody">
            <Table
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :pageInfo="pageInfo"
                    :tableData="tabledata"
                    @func="getRowhandleComments"
            />
        </div>

        <div class="dialog">
            <!--            Comments-->
            <!--            <el-dialog title="Comments" :visible.sync="dialogFormVisible" width="90%">-->
            <!--                <el-form :model="dialogForm">-->
            <!--                    <el-card class="heightofcard">-->
            <!--                        <el-card class="cardofbottom">-->
            <!--                            <div>-->
            <!--                                <span class="bolderofall">Note: </span>-->
            <!--                                <span>UPC: </span>-->
            <!--                                <span>{{dialogForm.upc}}</span>-->
            <!--                                <span>total Qty: </span>-->
            <!--                                <span>{{dialogForm.quantity}}</span>-->
            <!--                                <span>normal Qty: </span>-->
            <!--                                <span>{{dialogForm.quantity}}</span>-->
            <!--                                <span>abnormal Qty: </span>-->
            <!--                                <span>{{dialogForm.quantity}}</span>-->
            <!--                            </div>-->
            <!--                            <div>-->
            <!--                                <el-button-->
            <!--                                        class="topofall"-->
            <!--                                        v-show="imageButtonShow(dialogForm)"-->
            <!--                                        @click="handleImageView(dialogForm)">Image view-->
            <!--                                </el-button>-->
            <!--                            </div>-->
            <!--                        </el-card>-->

            <!--                        <el-card v-for="(item,index) in dialogForm.messagelist" :key="index" class="cardofbottom">-->
            <!--                            <div>-->
            <!--                                <span class="bolderofall tobluecolor">unitedelectronicsdeals &nbsp;</span>-->
            <!--                                <span>{{item.date}}</span>-->
            <!--                            </div>-->
            <!--                            <div class="topofall">-->
            <!--                                {{item.msg}}-->
            <!--                            </div>-->
            <!--                            <div class="topofall">-->
            <!--                                <el-button-->
            <!--                                        v-show="imageButtonShow(item)"-->
            <!--                                        @click="handleImageView(dialogForm)">Image view-->
            <!--                                </el-button>-->
            <!--                            </div>-->
            <!--                        </el-card>-->
            <!--                    </el-card>-->

            <!--                    <div>-->
            <!--                        <div style="font-size: 12px;margin-top: 10px;text-align: right">-->
            <!--                            Message quantity: 0/200-->
            <!--                        </div>-->
            <!--                        <el-form-item>-->
            <!--                            <el-input-->
            <!--                                    type="textarea"-->
            <!--                                    :rows="5"-->
            <!--                                    placeholder="unitedelectronicsdeals"-->
            <!--                                    aria-label="unitedelectronicsdeals"-->
            <!--                                    v-model="dialogForm.message">-->
            <!--                            </el-input>-->
            <!--                        </el-form-item>-->
            <!--                    </div>-->
            <!--                </el-form>-->
            <!--                <div slot="footer" class="dialog-footer">-->
            <!--                    <el-button @click="dialogFormVisible = false">Close</el-button>-->
            <!--                    <el-checkbox class="leftandright" v-model="dialogForm.checkedMarkunread">Mark unread</el-checkbox>-->
            <!--                    <el-button type="primary" @click="dialogFormVisible = false">Send</el-button>-->
            <!--                </div>-->
            <!--            </el-dialog>-->

            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Comments" :visible.sync="dialogFormCommentsVisible">
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
                    <el-button @click="dialogFormCommentsVisible = false">Close</el-button>
                    <el-button type="primary" @click="handleSendMsg">Send</el-button>
                </div>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "../../../utils/dateFormat";

    const Table = () => import('@/components/provider/Payment/Transactionhistory/comp/TransactionhistoryTable.vue')

    export default {
        name: "ProviderTransactionhistory",
        components: {
            Table,
        },
        created() {
            this.getListTransactionhistory()
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
                //表单分页
                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                topSearchForm: {
                    selectuser: 'all',
                    checkedPaymentonly: false,
                    searchDateOfWsitch: false,
                    endDate: '',
                },

                structForm: {
                    optionsOfSelectuser: [],
                },

                tabledata: [
                    {
                        id: '1',
                        createdate: '09/14/2021 00:25',
                        user: 'lsuo',
                        amount: '650',
                        balance: '64933.5',

                        product: 'NEW - Acer Nitro 5 Gaming Laptop, 9th Gen Intel Core i5-9300H, NVIDIA GeForce GTX 1650, 15.6" Full HD IPS Display, 8GB DDR4, 256GB NVMe SSD, Wi-Fi 6, Backlit Keyboard, Alexa Built-in, AN515-54-5812',
                        qty: '2',
                        warehouse: 'warehouse',

                        // urls: ['http://localhost:8080/Upload/Xiaolong_$1300.pdf', 'http://localhost:8080/Upload/picsample.png', 'http://localhost:8080/Upload/picsample.png'],
                        urls: ['http://localhost:8080/Upload/Xiaolong_$1300.pdf'],
                    }
                ],

                //dialog
                //Comments
                dialogFormCommentsVisible: false,
                // dialogFormVisible: false,
                dialogForm: {
                    unreadstatus: true,
                    msgsourceid: '',
                    userid: '',
                    username: '',
                    message: '',
                    msgtype: '',
                    comments: [],
                },
            }
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
                    this.dialogForm.msgtype = 'transactionhistory'

                    const {data: res} = await this.$http.post('profile/addcomments', this.dialogForm)

                    this.getMessage(this.dialogForm.msgsourceid)

                    this.dialogForm.message = ''
                    // console.log(this.dialogForm)
                    // this.dialogFormCommentsVisible = false
                })
            },
            async getMessage(msgsourceid) {
                let subTmpData = {
                    msgtype: 'transactionhistory',
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
            handleSelectChange(item) {
                if (item.value != 'all') {
                    this.pageInfo.buyersselect = item.value
                } else {
                    this.pageInfo.buyersselect = null
                }

                this.getListTransactionhistory()
            },
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListTransactionhistory()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListTransactionhistory()
            },
            handleImageView(row) {
                //跳转新页面router写法
                const routeData = this.$router.resolve({
                    name: 'ViewImages',
                    query: {urls: row.urls, rowlength: row.urls.length, type: 'pdf'},
                    // params: {urls: row}
                })

                window.open(routeData.href, '_blank');
            },
            imageButtonShow(row) {
                // console.log(this.dialogForm.urls.length)
                return row.urls.length > 0
            },
            getRowhandleComments(data) {
                this.dialogForm.msgsourceid = data.id
                this.dialogFormCommentsVisible = true
                this.getMessage(data.id)
            },
            async getListTransactionhistory() {
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.userid = window.sessionStorage.getItem("userid")
                this.pageInfo.checked = this.topSearchForm.checkedPaymentonly
                this.pageInfo.endDate = this.topSearchForm.endDate
                this.pageInfo.usertype = 'seller'

                const {data: res} = await this.$http.post('taskoffer/querytransactionhistory', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tabledata = []
                    if (res.transactionHistoryMap) {
                        this.tabledata = res.transactionHistoryMap
                    }


                    this.structForm.optionsOfSelectuser = []
                    let tmpOrgList = []
                    let tmpOrg = {
                        value: 'all',
                        label: '-- All --'
                    }
                    tmpOrgList.push(tmpOrg)
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

    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 12px;
        /*margin-bottom: 5px;*/
    }

    .martopto {
        margin-top: 20px;
    }

    .searchbut {
        margin-top: 15px;
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
</style>