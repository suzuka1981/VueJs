<template>
    <div>
        <el-row>
            <el-col :span="11">
                <el-card class="box-card">
                    <div>
                        Name: {{splitusername()}}
                    </div>
                    <div>
                        Email: {{profile.username}}
                    </div>
                    <div class="buttonofdiv">
                        <el-button
                                @click="handleJoinClick" style="margin-right: 15px">Join an
                            Organization
                        </el-button>

                        <el-button
                                @click="handleRenameClick" style="margin-right: 15px">
                            User rename
                        </el-button>

                        <el-button
                                size="mini"
                                @click="handleResetPassword">Reset password
                        </el-button>
                    </div>
                    <div class="bottofdiv">
                        <!--                        <el-link :underline="false" @click="handleSuggesti">Suggestion?</el-link>-->
                        <span style="font-size: 12px">
                            ©2021 Version: 3.5.10
                        </span>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card class="box-card">
                    <Table :tableData="profile.UserList"/>
                </el-card>
            </el-col>
        </el-row>

        <!--      Join an organization  -->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Join an organization" :visible.sync="dialogJoinanorganizationFormVisible" width="450px">
            <el-form
                    :rules="JoinFormRef_Rules"
                    ref="JoinFormRef"
                    :model="formJoinanorganization">
                <el-form-item prop="invitationcode">
                    <el-input v-model="formJoinanorganization.invitationcode" autocomplete="off"
                              placeholder="Invitationcode"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="formJoinanorganization.note" autocomplete="off" placeholder="Note"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogJoinanorganizationFormVisible = false">Close</el-button>
                <el-button type="primary" @click="joinForm">Apply</el-button>
            </div>
        </el-dialog>

        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="User rename" :visible.sync="renameFormVisible" width="450px">
            <el-form
                    :rules="renameFormRef_Rules"
                    ref="renameFormRef"
                    :model="renameForm">
                <el-form-item prop="name">
                    <el-input v-model="renameForm.name" autocomplete="off"
                              placeholder="User name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="renameFormVisible = false">Close</el-button>
                <el-button type="primary" @click="handleRenameForm">Apply</el-button>
            </div>
        </el-dialog>

        <!--      Suggestions  -->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Join an organization" :visible.sync="dialogSuggestionsFormVisible">
            <div>
                Please only submit suggestions or questions about using the system.
            </div>
            <div>
                If you have any question regarding packages, products or payment, please contact the other party
                directly.
            </div>
            <br>
            <div>
                Contact us by
            </div>
            <div>
                QQ: {{formSuggestions.qq}}
            </div>
            <br>
            <div>
                or
            </div>
            <br>
            <el-form :model="formSuggestions">
                <span class="demonstration">Email</span>
                <el-form-item>
                    <el-input v-model="formSuggestions.email" autocomplete="off"
                              placeholder="Email" style="width: 250px"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input
                            type="textarea"
                            :rows="9"
                            placeholder="Suggestions"
                            v-model="formSuggestions.suggestions">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSuggestionsFormVisible = false">Close</el-button>
                <el-button type="primary" @click="dialogSuggestionsFormVisible = false">Send</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Profile/BasicInfo/BasicInfoTable.vue')

    export default {
        name: "BasicInfo",
        components: {
            Table
        },
        created() {
            this.getPageData()
        },
        data() {
            return {
                profile: {},

                //表单验证规则
                JoinFormRef_Rules: {
                    invitationcode: [
                        {required: true, message: 'The invitation code is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },
                renameFormRef_Rules: {
                    name: [
                        {required: true, message: 'User name is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },

                //dialog
                dialogJoinanorganizationFormVisible: false,
                formJoinanorganization: {
                    invitationcode: '',
                    note: '',
                },

                dialogSuggestionsFormVisible: false,
                formSuggestions: {
                    qq: '3372450933',
                    email: 'godupgodzr@gmail.com',
                    suggestions: '',
                },

                renameFormVisible:false,
                renameForm: {
                    name: '',
                },
            }
        },
        methods: {
            handleRenameClick(){
                this.renameForm.name = ''
                this.renameFormVisible = true
            },
            handleJoinClick() {
                this.formJoinanorganization = {}
                this.dialogJoinanorganizationFormVisible = true;
            },
            handleResetPassword() {
                this.$confirm('A reset email will be sent to your mailbox. Are your sure about this?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(async () => {
                    let subData = {
                        email: this.profile.username,
                    }
                    const {data: res} = await this.$http.post('pswretrieval', subData)

                    if (res.meta.status == 303) {
                        return this.$message.error(res.meta.msg);
                    } else if (res.meta.status == 200) {
                        return this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel'
                    });
                });
            },
            handleSuggesti() {
                this.dialogSuggestionsFormVisible = true
                this.formJoinanorganization = {
                    invitationcode: '',
                    note: '',
                }
            },
            async getPageData() {
                const {data: res} = await this.$http.get('profile/getbuyersandseller', {
                    params: {
                        username: window.sessionStorage.getItem('username')
                    }
                })

                this.profile = []
                if(res.data) {
                    this.profile = res.data
                    this.splitusername()
                }

                // console.log(res.data)
            },
            splitusername() {
                if (this.profile != undefined && this.profile.name && this.profile.name != 0) {
                    return this.profile.name
                } else if (this.profile != undefined && this.profile.username && !this.profile.name) {
                    return this.profile.username.split('@')[0]
                }
            },
            joinForm() {
                this.$refs.JoinFormRef.validate(async valid => {
                    if (!valid) return;

                    const {data: res} = await this.$http.post('profile/updatajoinorganization', {
                        data: this.formJoinanorganization,
                        username: window.sessionStorage.getItem('username')
                    })

                    this.dialogJoinanorganizationFormVisible = false

                    // this.getPageData()
                })
            },
            handleRenameForm() {
                this.$refs.renameFormRef.validate(async valid => {
                    if (!valid) return;


                    const {data: res} = await this.$http.post('profile/renameuser', {
                        userid: window.sessionStorage.getItem('userid'),
                        name: this.renameForm.name,
                        username: window.sessionStorage.getItem('username')
                    })

                    this.renameFormVisible = false

                    this.getPageData()
                })
            },

        },
        computed: {
            profileToArr(data) {
                return function (data) {
                    let tmp = []
                    tmp.push(data)
                    return tmp
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .el-row {
        display: flex;
        justify-content: space-between
    }

    .bottofdiv {
        display: flex;
        justify-content: flex-end;
    }

    .buttonofdiv {
        margin-top: 20px;
        margin-bottom: 20px
    }

    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 12px;
        margin-bottom: 5px;
    }
</style>