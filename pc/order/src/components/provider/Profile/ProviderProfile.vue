<template>
    <div>
        <div class="top">
            <el-tabs v-model="selectTabs">
                <el-tab-pane label="Basic info" name="first">
                    <el-card class="cardto top">
                        <div class="bottomofdiv">
                            Name: {{splitusername()}}
                        </div>
                        <div class="bottomofdiv">
                            Email: {{username}}
                        </div>
                        <div class="bottomofdiv">
                            Invitation code: {{code}}
                        </div>

                        <el-row>
                            <el-col :span="6" class="betweenofcol">
                                <el-button @click="createcode">Generate invitation code</el-button>
                                <el-button
                                        @click="handleRenameClick" style="margin-right: 15px">
                                    User rename
                                </el-button>
                                <el-button @click="hanleRestPSWClick">Reset password</el-button>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-tab-pane>
            </el-tabs>
        </div>

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
    </div>
</template>

<script>
    export default {
        name: "ProviderProfile",

        data() {
            return {
                renameFormRef_Rules: {
                    name: [
                        {required: true, message: 'User name is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },
                renameFormVisible: false,
                renameForm: {
                    name: '',
                },

                selectTabs: 'first',

                username: window.sessionStorage.getItem("username"),
                name: window.sessionStorage.getItem("name"),
                code: window.sessionStorage.getItem("code"),

            }
        },
        methods: {
            splitusername() {
                if (typeof (this.name) != 'undefined' && this.name && this.name != 0 && this.name != 'null') {
                    return this.name
                } else if (typeof (this.username) != 'undefined') {
                    return this.username.split('@')[0]
                }
            },
            handleRenameClick() {
                this.renameForm.name = ''
                this.renameFormVisible = true
            },
            async createcode() {
                let data = {
                    username: window.sessionStorage.getItem("username")
                }

                // console.log(username)
                const {data: res} = await this.$http.post('setting/createcode', data)

                if (res.meta.status != 200) {
                    return this.$message.error('Code create error.');
                } else {
                    if (res.code) {
                        window.sessionStorage.setItem('code', res.code)
                        this.code = res.code
                    }
                }
            },
            hanleRestPSWClick() {
                this.$confirm('A reset email will be sent to your mailbox. Are your sure about this?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(async () => {
                    let subData = {
                        email: this.username,
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
            handleRenameForm() {
                this.$refs.renameFormRef.validate(async valid => {
                    if (!valid) return;

                    const {data: res} = await this.$http.post('profile/renameuser', {
                        userid: window.sessionStorage.getItem('userid'),
                        name: this.renameForm.name,
                        username: window.sessionStorage.getItem('username')
                    })

                    this.name = res.name
                    window.sessionStorage.setItem('name', this.name)
                    this.renameFormVisible = false
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .bottomofdiv {
        margin-bottom: 5px;
    }

    .betweenofcol {
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }

    .top {
        margin-left: 20px;
    }

    .cardto {
        width: 95%;
    }
</style>