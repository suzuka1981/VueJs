<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2" style="display: flex">
                <el-col :span="11">
                    <el-checkbox
                            @change="getListTransactionhistory"
                            v-model="checked" style="margin-top: 15px;margin-left: 15px">Payment only
                    </el-checkbox>
                </el-col>

                <el-col :span="10" style="display: flex;justify-content: flex-end">
                    <div style="margin-right: 5px">
                        <span class="demonstration">End date</span>
                        <el-date-picker
                                v-model="endDate"
                                type="date"
                                placeholder="Select date"
                        >
                        </el-date-picker>
                    </div>
                    <div style="margin-top: 20px">
                        <el-button @click="getListTransactionhistory">Search</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="body">
            <Table
                    :pageInfo="pageInfo"
                    :tableData="tableData"
                    @func="getRowCommentsFormSon"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    propsMsg="active"/>
        </div>

        <!--        Comments-->
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
                                    <i class="el-icon-warning" style="color: cornflowerblue" v-show="item.unreadstatus=='true'"></i>
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
</template>

<script>
    import {formatDate} from "../../utils/dateFormat";

    const Table = () => import('@/components/buyers/Payment/TransactionHistory/TransactionHistoryTable.vue')

    import '@/assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table
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

                tableData: [],

                checked: false,
                dialogFormCommentsVisible: false,
                endDate: '',

                dialogForm: {
                    unreadstatus: true,
                    msgsourceid: '',
                    userid: '',
                    username: '',
                    message: '',
                    msgtype: '',
                    comments: [],
                },
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
            async msgUnread(item){
                if(item.unreadstatus != 'false' && item.userid != window.sessionStorage.getItem("userid")) {
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
                    console.log(this.dialogForm)
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
                    if(res.commentsList) {
                        this.dialogForm.comments = res.commentsList
                    }
                }
            },
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListTransactionhistory()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListTransactionhistory()
            },
            getRowCommentsFormSon(data) {
                this.dialogForm.msgsourceid = data.id
                this.dialogFormCommentsVisible = true
                this.getMessage(data.id)
            },
            async getListTransactionhistory() {
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.checked = this.checked
                this.pageInfo.endDate = this.endDate

                const {data: res} = await this.$http.post('taskoffer/querytransactionhistory', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tableData = []
                    if (res.transactionHistoryMap) {
                        this.tableData = res.transactionHistoryMap
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
    .el-dropdown-link {
        cursor: pointer;
        color: #666666;
        text-decoration: underline;
    }

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

</style>