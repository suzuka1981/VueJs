<template>
    <div class="login_container" v-title data-title="Login">
        <el-container>
            <el-header>
                <div class="headerlink">
                    <el-link :underline="false" :class="{ellinkcoloractive:headerActive}" @click="ellinkClick">Signup
                    </el-link>
                    <el-link :underline="false" :class="{ellinkcoloractive:!headerActive}" @click="ellinkClick">Signin
                    </el-link>
                </div>
            </el-header>
            <el-main>
                <div class="login_box">
                    <!--      头像-->
                    <div class="avatar_box">
                        <img alt="Vue logo" src="../assets/img/login.jpg">
                    </div>

                    <!--      表单 Signin-->
                    <el-form label-width="0px" class="login_form"
                             :model="loginForm"
                             :rules="loginForm_Rules"
                             ref="loginFormRef" v-show="vshowForm">
                        <el-form-item prop="username">
                            <el-input prefix-icon="iconfont icon-emailFilled" v-model="loginForm.username"
                                      placeholder="Email"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" prefix-icon="el-icon-lock" v-model="loginForm.password"
                                      placeholder="Password"></el-input>
                        </el-form-item>
                        <el-form-item class="btns">
                            <!--                            <span>-->
                            <!--                                <el-link :underline="false"-->
                            <!--                                         @click="dialogContactUsFormVisible = true">Contact us</el-link>-->
                            <!--                            </span>-->

                            <span>
                                <el-link :underline="false" @click="handleFPsw">Forgot password?</el-link>
                            </span>

                            <el-button type="info" @click="login" style="margin-left: 25px">Signin</el-button>
                        </el-form-item>
                    </el-form>

                    <!--      表单 Signup-->
                    <el-form label-width="0px" class="Signup_form" :model="signupForm" :rules="forgotPasswordDialog"
                             ref="SignupFormRef" v-show="!vshowForm">
                        <el-form-item prop="email">
                            <el-input prefix-icon="iconfont icon-emailFilled" v-model="signupForm.email"
                                      placeholder="Email"></el-input>
                        </el-form-item>

                        <el-form-item class="btns">
                            <span>
                                <el-link :underline="false" @click="handleFPsw">Forgot password?</el-link>
                            </span>

                            <el-button type="info" @click="register" style="margin-left: 25px">Send</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </el-main>
        </el-container>

        <!--Forgot password dialog-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Please enter your email address" :visible.sync="dialogForgotPasswordFormVisible">
            <el-form
                    ref="SignupSendRef"
                    :model="form" :rules="forgotPasswordDialog">
                <el-form-item label="Email: " :label-width="formLabelWidth" prop="email">
                    <el-input v-model="form.email" autocomplete="off" placeholder="Email"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForgotPasswordFormVisible = false">Close</el-button>
                <el-button type="primary" @click="handleSendEmail">Send Email</el-button>
            </div>
        </el-dialog>

        <!--        &lt;!&ndash;Contact us dialog&ndash;&gt;-->
        <!--        <el-dialog title="Suggestions" :visible.sync="dialogContactUsFormVisible">-->
        <!--            <el-form :model="contactUsForm" :rules="forgotPasswordDialog">-->
        <!--                <span>-->
        <!--                Please submit suggestions or questions about using the system.-->
        <!--                <br><br>-->
        <!--                Contact us by-->
        <!--                <br>-->
        <!--                QQ: 420416140-->
        <!--                <br>-->
        <!--                <br>-->
        <!--                or-->
        <!--            </span>-->

        <!--                <el-form-item label="Names: " :label-width="formLabelWidth" prop="names">-->
        <!--                    <el-input v-model="form.names" autocomplete="off" placeholder="Names"></el-input>-->
        <!--                </el-form-item>-->

        <!--                <el-form-item label="Email: " :label-width="formLabelWidth" prop="email">-->
        <!--                    <el-input v-model="form.email" autocomplete="off" placeholder="Email"></el-input>-->
        <!--                </el-form-item>-->

        <!--                <el-form-item label="Suggestion: " :label-width="formLabelWidth" prop="suggestion">-->
        <!--                    <el-input-->
        <!--                            type="textarea"-->
        <!--                            :autosize="{ minRows: 5}"-->
        <!--                            placeholder="Suggestion"-->
        <!--                            v-model="suggestion">-->
        <!--                    </el-input>-->
        <!--                </el-form-item>-->


        <!--            </el-form>-->
        <!--            <div slot="footer" class="dialog-footer">-->
        <!--                <el-button @click="dialogContactUsFormVisible = false">Close</el-button>-->
        <!--                <el-button type="primary" @click="dialogContactUsFormVisible = false">Send</el-button>-->
        <!--            </div>-->
        <!--        </el-dialog>-->
    </div>
</template>

<script>
    import '../assets/icon/iconfont.css'


    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                signupForm: {
                    email: ''
                },
                //表单验证规则
                loginForm_Rules: {
                    username: [
                        {required: true, message: 'The email address is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: 'The email address is empty.', trigger: 'blur'},
                        {type: 'email', message: 'The email address is badly formatted.', trigger: ['blur', 'change']},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Password must be valid', trigger: 'blur'},
                        // {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
                    ]
                },

                forgotPasswordDialog: {
                    // names: [
                    //     {required: true, message: 'The names is empty.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    email: [
                        {required: true, message: 'The email address is badly formatted.', trigger: 'blur'},
                        {type: 'email', message: 'The email address is badly formatted.', trigger: ['blur', 'change']},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    // suggestion: [
                    //     {required: true, message: 'Suggestion content is required.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],

                },

                //header背景变色控制
                headerActive: false,
                //控制form显示
                vshowForm: true,
                //控制Forgot password dialog
                dialogForgotPasswordFormVisible: false,
                form: {
                    email: ''
                },
                formLabelWidth: '120px',

                //Contact us dialog
                dialogContactUsFormVisible: false,
                contactUsForm: {
                    names: '',
                    email: ''
                },
                suggestion: ''

            };
        },
        methods: {
            handleFPsw() {
                this.form = {
                    email: ''
                }
                this.dialogForgotPasswordFormVisible = true
            },
            //重置按钮
            resetLoinForm() {
                this.$refs.loginFormRef.resetFields()
            },
            login() {
                //表单自带的验证
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) return;
                    const {data: res} = await this.$http.post('login', this.loginForm)

                    if (res.meta.status != 200) {
                        return this.$message.error('The password is invalid or the user does not have a password.');
                    } else {
                        //设置token
                        window.sessionStorage.setItem('token', res.meta.token)
                        window.sessionStorage.setItem('username', res.data.username)
                        window.sessionStorage.setItem('userid', res.data.id)
                        window.sessionStorage.setItem('type', res.data.type)
                        window.sessionStorage.setItem('code', res.data.code)
                        window.sessionStorage.setItem('name', res.data.name)

                        // 30天后过期
                        this.$cookies.config('30d')
                        this.$cookies.set("token", res.meta.token)
                        this.$cookies.set("usernameone", res.data.username.split('@')[0])
                        this.$cookies.set("usernametwo", res.data.username.split('@')[1])
                        this.$cookies.set("userid", res.data.id)
                        this.$cookies.set("type", res.data.type)
                        this.$cookies.set("code", res.data.code)
                        this.$cookies.set("name", res.data.name)

                        // console.log(this.$cookies.get("token"))
                        if (res.data.type === 0) {
                            //跳转
                            this.$router.push('/home/offer')
                        } else {
                            //跳转
                            this.$router.push('/providerhome')
                        }

                        return this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    }
                })
            },
            ellinkClick() {
                this.headerActive = !this.headerActive
                this.vshowForm = !this.vshowForm
            },
            register() {
                this.$refs.SignupFormRef.validate(async valid => {
                    if (!valid) return;

                    const {data: res} = await this.$http.post('register', this.signupForm)

                    // console.log(res)

                    if (res.meta.status != 200) {
                        return this.$message.error(res.meta.msg);
                    } else {
                        //设置token
                        window.sessionStorage.setItem('token', res.meta.token)
                        window.sessionStorage.setItem('username', res.data.username)
                        window.sessionStorage.setItem('userid', res.data.id)
                        window.sessionStorage.setItem('type', res.data.type)
                        window.sessionStorage.setItem('code', res.data.code)
                        window.sessionStorage.setItem('name', res.data.name)

                        // 30天后过期
                        this.$cookies.config('30d')
                        this.$cookies.set("token", res.meta.token)
                        this.$cookies.set("usernameone", res.data.username.split('@')[0])
                        this.$cookies.set("usernametwo", res.data.username.split('@')[1])
                        this.$cookies.set("userid", res.data.id)
                        this.$cookies.set("type", res.data.type)
                        this.$cookies.set("code", res.data.code)
                        this.$cookies.set("name", res.data.name)


                        // //设置token
                        // window.sessionStorage.setItem('token', res.meta.token)
                        // window.sessionStorage.setItem('username', res.data.username)
                        // window.sessionStorage.setItem('userid', res.data.id)
                        // window.sessionStorage.setItem('type', res.data.type)
                        // window.sessionStorage.setItem('name', res.data.name)
                        //
                        // // 30天后过期
                        // this.$cookies.config('30d')
                        // this.$cookies.set('token', res.meta.token)
                        // this.$cookies.set('username', res.data.username)
                        // this.$cookies.set('userid', res.data.id)
                        // this.$cookies.set('type', res.data.type)
                        // this.$cookies.set('code', res.data.code)
                        // this.$cookies.set('name', res.data.name)

                        if (res.data.type === 0) {
                            //跳转
                            this.$router.push('/home')
                        } else {
                            //跳转
                            this.$router.push('/providerhome')
                        }

                        return this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    }
                })
            },
            handleSendEmail() {
                this.$refs.SignupSendRef.validate(async valid => {
                    if (!valid) return;

                    const {data: res} = await this.$http.post('pswretrieval', this.form)
                    this.dialogForgotPasswordFormVisible = false

                    if (res.meta.status == 303) {
                        return this.$message.error(res.meta.msg);
                    } else if (res.meta.status == 200) {
                        return this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    }
                })
            }

        }
    }
</script>

<style lang="less" scoped>
    .el-header, .el-footer {
        background-color: #545c64;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: 160px;
        height: 100%;
    }

    .el-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .el-header {
        display: flex;
        justify-content: flex-end;
    }

    .headerlink {
        display: flex;
        justify-content: flex-end;

        .el-link {
            padding-right: 7px;
            padding-left: 7px;
            margin-left: 5px;
            color: white;
            height: 95%;
        }
    }

    .ellinkcoloractive {
        background-color: #B3C0D1;
        background-color: #999999;
        color: #666666;
    }

    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px; /* 圆角 */
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .avatar_box {
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%); /*横向纵向*/
            background-color: #fff;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }

    .btns {
        display: flex;
        justify-content: space-between;

        span {
            padding-left: 15px;
        }
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        /*box-shadow: 0 0 10px #ddd;*/
    }

    .Signup_form {
        position: absolute;
        bottom: 50px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        /*box-shadow: 0 0 10px #ddd;*/
    }

</style>