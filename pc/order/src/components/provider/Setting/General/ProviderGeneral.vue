<template>
    <div>
        <el-card>
            <el-form
                    :rules="form_Rules"
                    ref="formRef" :model="formData">
                <div class="titletosize">
                    Offer Settings
                </div>

                <el-divider></el-divider>

                <el-row>
                    <el-col :span="5" :offset="2">
                        <div class="divofsizesmall">
                            Default pending period
                        </div>

                        <div class="flexofdiv">
                            <el-form-item class="widthofsmall" prop="pendingperioddays">
                                <el-input v-model="formData.pendingperioddays"></el-input>
                            </el-form-item>
                            <span class="spanofright">
                                Days
                            </span>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="4" :offset="2">
                        <el-form-item>
                            <el-checkbox v-model="formData.checkedVisibletoallmembers">Visible to all members
                            </el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>

<!--                <el-row>-->
<!--                    <el-col :span="10" :offset="2">-->
<!--                        <el-form-item>-->
<!--                            <div class="spanofcenter">-->
<!--                                Default users-->
<!--                            </div>-->
<!--                            <el-select-->
<!--                                    clearable-->
<!--                                    multiple-->
<!--                                    class="widthall"-->
<!--                                    v-model="formData.defaultusers"-->
<!--                                    placeholder="Default users">-->
<!--                                <el-option-->
<!--                                        v-for="item in structForm.optionsOfDefaultusers"-->
<!--                                        :key="item.value"-->
<!--                                        :label="item.label"-->
<!--                                        :value="item.value">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                </el-row>-->

                <div class="titletosize">
                    Other Settings
                </div>

                <el-divider></el-divider>

                <el-row>
                    <el-col :span="5" :offset="2">
                        <div class="divofsizesmall">
                            Minimum payment amount
                        </div>

                        <div class="flexofdiv">
                            <span class="spanofleft">
                                $
                            </span>
                            <el-form-item class="widthofsmall">
                                <el-input v-model="formData.minimumpaymentamount"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="4" :offset="2">
                        <el-form-item>
                            <el-checkbox v-model="formData.checkedComments">
                                Email notification for new comments
                            </el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="4" :offset="2">
                        <el-form-item>
                            <el-switch
                                    v-model="formData.valueOfSwitch"
                                    active-text="Imperial(lbs/inch)">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="4" :offset="2">
                        <div class="divofsizesmall">
                            <i class="el-icon-warning"></i>
                            Metric system is only for input data
                        </div>
                        <el-form-item>
                            <el-checkbox v-model="formData.checkedEnableAmazonSites">
                                Enable Amazon Sites
                            </el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <el-row>
                <el-col :span="4" :offset="2">
                    <el-button @click="formSave">Save</el-button>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
    export default {
        name: "ProviderGeneral",
        created() {
            this.getFormData()
        },
        data() {
            return {
                //表单验证规则
                form_Rules: {
                    pendingperioddays: [
                        {required: true, message: 'Default pending period is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },
                formData: {
                    pendingperioddays: '7',
                    checkedVisibletoallmembers: false,
                    defaultusers: '',
                    minimumpaymentamount: '1000',
                    checkedComments: false,
                    valueOfSwitch: false,
                    checkedEnableAmazonSites: false,
                },

                structForm: {
                    optionsOfDefaultusers: [
                        {
                            value: '1',
                            label: 'bcstyle'
                        },
                        {
                            value: '2',
                            label: 'asthma5'
                        },
                        {
                            value: '3',
                            label: 'avince'
                        },
                    ],
                },
            }
        },
        methods: {
            formSave() {
                this.$refs.formRef.validate(async valid => {
                    if (!valid) return

                    let tmp = this.formData

                    // console.log(this.formData.defaultusers.toString())
                    if (tmp.defaultusers) {
                        tmp.defaultusers = tmp.defaultusers.toString()
                    }
                    tmp.orgid = window.sessionStorage.getItem("userid")

                    const {data: res} = await this.$http.post('setting/savegeneral', tmp)

                    this.getFormData()

                    return this.$message.success('Save ok.');
                })
            },
            async getFormData() {
                let tmpData = {};
                tmpData.orgid = window.sessionStorage.getItem("userid")
                const {data: res} = await this.$http.post('setting/querygeneral', tmpData)

                if (res.meta.status != 200) {
                    // return this.$message.error('Select Error.');
                } else {
                    this.formData = res.data
                    if (this.formData.defaultusers) {
                        this.formData.defaultusers = this.formData.defaultusers.split(',')
                    }
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .titletosize {
        font-size: 20px;
    }

    .divofsizesmall {
        font-size: 12px;
    }

    .widthofsmall {
        width: 90%;
    }

    .flexofdiv {
        display: flex;
    }

    .spanofright {
        margin-left: 5px;
        margin-top: 10px;
    }

    .widthall {
        width: 100%;
    }

    .spanofleft {
        margin-right: 5px;
        margin-top: 10px;
    }
</style>