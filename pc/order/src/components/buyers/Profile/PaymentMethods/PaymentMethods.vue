<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2">
                <el-col :span="12">
                    <el-button @click="getRowFormSon('','add')"><span style="font-size: 20px;margin-right: 3px">+</span>Payment
                        method
                    </el-button>
                </el-col>

                <el-col :span="8" style="display: flex;justify-content: flex-end">
                    <div style="width: 250px">
                        <el-input
                                @input="getPageData"
                                placeholder="Search"
                                suffix-icon="el-icon-search"
                                v-model="inputSearch"
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
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :tableData="tableData"
                    @func="getRowFormSon"
                    propsMsg="active"/>
        </div>

        <!--        Edit-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Please fill in payment method information" :visible.sync="dialogFormEditVisible">
            <el-form
                    :rules="paymentDialog"
                    ref="paymentRef"
                    :model="form">
                <el-row class="elrowofset">
                    <el-col :span="11">
                        <span class="demonstration">
                            Category
                        </span>

                        <el-form-item prop="category">
                            <el-select v-model="form.category" placeholder="Temporary pay">
                                <!--                                    @click.native="handleSelectChange(item)"-->
                                <el-option
                                        v-for="item in optionsOfCategory"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <!--                        <el-input v-model="form.category"></el-input>-->
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <span class="demonstration">
                            Display name
                        </span>

                        <el-form-item prop="displayname">
                            <el-input v-model="form.displayname"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div class="cardofdiv">
                    <el-card class="cardbox">
                        <!--                        <el-row class="elrowofset">-->
                        <!--                            <el-col :span="11">-->
                        <!--                                <span class="demonstration">-->
                        <!--                                    Receipient name-->
                        <!--                                </span>-->
                        <!--                                <el-input v-model="form.receipientname"></el-input>-->
                        <!--                            </el-col>-->

                        <!--                            <el-col :span="11">-->
                        <!--                                <span class="demonstration">-->
                        <!--                                    Phone number-->
                        <!--                                </span>-->
                        <!--                                <el-input v-model="form.phonenumber"></el-input>-->
                        <!--                            </el-col>-->
                        <!--                        </el-row>-->

                        <span class="demonstration" style="margin-top: 10px">
                                    Description
                        </span>
                        <el-form-item prop="description">
                            <el-input v-model="form.description"></el-input>
                        </el-form-item>
                    </el-card>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEditVisible = false">Close</el-button>
                <el-button type="primary" @click="paymentSave">Save</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Profile/PaymentMethods/PaymentMethodsTable.vue')

    import '@/assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table
        },
        created() {
            this.getPageData()
        },
        data() {
            return {
                //表单分页
                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                paymentDialog: {
                    displayname: [
                        {required: true, message: 'The display name is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    category: [
                        {required: true, message: 'The Category is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: 'Description is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],

                },

                optionsOfCategory: [
                    {
                        value: 'temp',
                        label: 'Temporary pay'
                    },
                ],

                inputSearch: '',
                tableData: [
                    // {
                    //     id: '1',
                    //     category: 'Check',
                    //     name: 'Rong Check',
                    //     receipientname: 'Rong Zhang',
                    //     phonenumber: '44324',
                    //     receipientaddress: '65 Pelican Ln, Irvine CA 92618',
                    //     description: 'lsuo * 65 Pelican Ln, Irvine CA 92618 * (302)56-89',
                    // },
                ],

                //dialog
                dialogFormEditVisible: false,

                form: {
                    category: 'temp',
                    displayname: '',
                    description: '',

                    creditcardcompany: '',
                    cardholdername: '',
                    accountnumber: '',
                    bankpobox: '',

                    bankname: '',
                    accountholdername: '',
                    currency: '',
                    routingnumber: '',
                    bankaddress: '',
                    billingaddress: '',

                    receipientname: '',
                    phonenumber: '',
                    receipientaddress: '',
                },

            };
        },
        methods: {
            paymentSave() {
                this.$refs.paymentRef.validate(async valid => {
                    if (!valid) return;

                    this.form.buyersid = window.sessionStorage.getItem('userid')

                    const {data: res} = await this.$http.post('profile/addbuyerspaymentmethod', this.form)

                    if (res.meta.status != 200) {
                        return this.$message.error('Add error.');
                    } else {
                        //设置token
                        this.dialogFormEditVisible = false

                        this.getPageData()

                        return this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    }
                })
            },
            async getPageData() {
                this.pageInfo.userid = window.sessionStorage.getItem("userid")
                this.pageInfo.inputSearch = this.inputSearch

                const {data: res} = await this.$http.post('profile/querybuyerspaymentmethod', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tableData = []
                    this.tableData = res.querylistBuyersPaymentMethod

                    if (res.info) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total

                    }
                }
            },
            getRowFormSon(data, type) {
                if (type === 'edit') {
                    this.form = data
                } else if (type === 'add') {
                    this.form = {
                        category: 'temp',
                        displayname: '',
                        description: '',

                        creditcardcompany: '',
                        cardholdername: '',
                        accountnumber: '',
                        bankpobox: '',

                        bankname: '',
                        accountholdername: '',
                        currency: '',
                        routingnumber: '',
                        bankaddress: '',
                        billingaddress: '',

                        receipientname: '',
                        phonenumber: '',
                        receipientaddress: '',
                    }
                }

                this.dialogFormEditVisible = true
                // console.log(this.form)
            },
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getPageData()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getPageData()
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
            background: url('../../../../assets/img/car.png') no-repeat;
            background-size: 16px 14px;
            background-position: 4px 10px;
            padding: 0px 0 0 26px;
            box-sizing: border-box;
            font-size: 14px;
        }
    }

    .cardofdiv {
        display: flex;
        justify-content: center;
    }

    .cardbox {
        margin-top: 10px;
        width: 85%;
    }

    .elrowofset {
        display: flex;
    }
</style>