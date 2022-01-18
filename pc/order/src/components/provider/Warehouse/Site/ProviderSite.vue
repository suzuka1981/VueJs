<template>
    <div>
        <div class="top topOfMar">
            <el-row class="rowOfFlex">
                <el-col :span="6">
                    <div class="spanofcenter">
                        Select warehouse
                    </div>
                    <el-select
                            class="selectwidth"
                            v-model="selectWarehouseValue"
                            placeholder="Select warehouse">
                        <el-option
                                v-for="item in structForm.optionsSelectWarehouseValue"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="6" :offset="18">
                    <el-button @click="openAddSiteDialog('add',null)" class="topOfMar selectwidth">Add site</el-button>
                </el-col>
            </el-row>
        </div>

        <div class="tablebody">
            <Table
                    :optionsOfStates="structForm.optionsOfStates"
                    :tableData="tabledata"
                    :pageInfo="pageInfo"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    @funcEdit="openAddSiteDialog"
            />
        </div>

        <!--        add Site-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Please fill in address information"
                width="65%"
                :visible.sync="dialogFormVisible">
            <el-form
                    :rules="addSiteForm_Rules"
                    ref="addSiteFormRef"
                    :model="dialogForm">
                <el-row class="rowofbetleft">
                    <el-col :span="12">
                        <el-form-item prop="sitename" class="itemheight">
                            <div class="el-form-item__error errorColor" v-show="dialogForm.sitename">
                                Site name
                            </div>
                            <el-input
                                    v-model="dialogForm.sitename"
                                    placeholder="Site name"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item prop="address1" class="itemheight">
                    <div class="el-form-item__error errorColor" v-show="dialogForm.address1">
                        Address line1
                    </div>
                    <el-input v-model="dialogForm.address1"
                              placeholder="Address line1"
                              autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item class="itemheight">
                    <div class="el-form-item__error errorColor" v-show="dialogForm.address2">
                        Address line2
                    </div>
                    <el-input v-model="dialogForm.address2"
                              placeholder="Address line2"
                              autocomplete="off"></el-input>
                </el-form-item>

                <!--                <el-row class="rowitemheight">-->
                <!--                    <el-col :span="7">-->
                <!--                        <el-form-item prop="appkey">-->
                <!--                            <div class="el-form-item__error errorColor" v-show="dialogForm.appkey">-->
                <!--                                Appkey-->
                <!--                            </div>-->
                <!--                            <el-input v-model="dialogForm.appkey"-->
                <!--                                      placeholder="Appkey"-->
                <!--                                      autocomplete="off"></el-input>-->
                <!--                        </el-form-item>-->
                <!--                    </el-col>-->

                <!--                    <el-col :span="7" :offset="1">-->
                <!--                        <el-form-item prop="signature">-->
                <!--                            <div class="el-form-item__error errorColor" v-show="dialogForm.signature">-->
                <!--                                Signature-->
                <!--                            </div>-->
                <!--                            <el-input v-model="dialogForm.signature"-->
                <!--                                      placeholder="Signature"-->
                <!--                                      autocomplete="off"></el-input>-->
                <!--                        </el-form-item>-->
                <!--                    </el-col>-->
                <!--                    <el-col :span="7" :offset="1">-->
                <!--                        <el-form-item prop="mfyccid">-->
                <!--                            <div class="el-form-item__error errorColor" v-show="dialogForm.mfyccid">-->
                <!--                                Mfyccid-->
                <!--                            </div>-->
                <!--                            <el-input v-model="dialogForm.mfyccid"-->
                <!--                                      placeholder="Mfyccid"-->
                <!--                                      autocomplete="off"></el-input>-->
                <!--                        </el-form-item>-->
                <!--                    </el-col>-->
                <!--                </el-row>-->

                <el-row class="rowitemheight">
                    <el-col :span="7">
                        <el-form-item prop="city">
                            <div class="el-form-item__error errorColor" v-show="dialogForm.city">
                                City
                            </div>
                            <el-input v-model="dialogForm.city"
                                      placeholder="City"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7" :offset="1">
                        <el-form-item>
                            <div class="el-form-item__error errorColor" v-show="dialogForm.state">
                                States
                            </div>
                            <!--                                        @click.native="handelClickOfStateSelect(item)"-->
                            <el-select
                                    class="selectwidth"
                                    v-model="dialogForm.state"
                                    placeholder="States">
                                <el-option
                                        v-for="item in structForm.optionsOfStates"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                    <span>{{item.label}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item prop="zip">
                            <div class="el-form-item__error errorColor" v-show="dialogForm.zip">
                                Zip code
                            </div>
                            <el-input v-model="dialogForm.zip"
                                      placeholder="Zip code"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item>
                            <el-form-item>
                                <div class="el-form-item__error errorColor" v-show="dialogForm.contact">
                                    Site Code
                                </div>
                                <el-input v-model="dialogForm.contact"
                                          placeholder="Site Code"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7" :offset="1">
                        <el-form-item>
                            <div class="el-form-item__error errorColor" v-show="dialogForm.phone">
                                Phone
                            </div>
                            <el-input v-model="dialogForm.phone"
                                      placeholder="Phone"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7" :offset="1">
                        <el-form-item prop="checked">
                            <div class="el-form-item__error errorColor" v-show="dialogForm.checked">
                                SAP Warehouse
                            </div>
                            <el-select
                                    :disabled="checkeddisabled"
                                    class="selectwidth"
                                    v-model="dialogForm.checked"
                                    placeholder="SAP Warehouse">
                                <el-option
                                        v-for="item in structForm.optionsSelectsqp"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Close</el-button>
                <el-button type="primary" @click="saveSite">Save</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Warehouse/Site/comp/SiteTable.vue')

    export default {
        name: "ProviderSite",
        components: {
            Table,
        },
        data() {
            return {
                //表单分页
                pageInfo: {
                    pageSize: 5,
                    total: 10,
                    current: 1,
                },

                //表单验证规则
                addSiteForm_Rules: {
                    sitename: [
                        {required: true, message: 'Site name is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    address1: [
                        {required: true, message: 'Address is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: 'City is required.', trigger: 'blur'},
                        // {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
                    ],
                    zip: [
                        {required: true, message: 'Zip code is required.', trigger: 'blur'},
                        // {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
                    ],
                    checked: [
                        {required: true, message: 'SAP Warehouse is required.', trigger: 'change'},
                        // {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
                    ],
                    // appkey: [
                    //     {required: true, message: 'Appkey is required.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    // signature: [
                    //     {required: true, message: 'Signature is required.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    // mfyccid: [
                    //     {required: true, message: 'Mfyccid is required.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                },

                selectWarehouseValue: "1",

                structForm: {
                    optionsSelectWarehouseValue: [
                        {
                            value: '1',
                            label: 'Bizblock warehouse'
                        },
                        {
                            value: '2',
                            label: 'Others'
                        },
                    ],
                    optionsSelectsqp: [
                        {
                            value: '1',
                            label: ' '
                        },
                        {
                            value: '2',
                            label: 'bizblock_or'
                        },
                    ],
                    optionsOfStates: [
                        {value: 'AL', label: 'AL - Alabama'},
                        {value: 'AK', label: 'AK - Alaska'},
                        {value: 'AZ', label: 'AZ - Arizona'},
                        {value: 'AR', label: 'AR - Arkansas'},
                        {value: 'CA', label: 'CA - California'},
                        {value: 'CO', label: 'CO - Colorado'},
                        {value: 'CT', label: 'CT - Connecticut'},
                        {value: 'DE', label: 'DE - Delaware'},
                        {value: 'FL', label: 'FL - Florida'},
                        {value: 'GA', label: 'GA - Georgia'},
                        {value: 'HI', label: 'HI - Hawaii'},
                        {value: 'ID', label: 'ID - Idaho'},
                        {value: 'IL', label: 'IL - Illinois'},
                        {value: 'IN', label: 'IN - Indiana'},
                        {value: 'IA', label: 'IA - Iowa'},
                        {value: 'KS', label: 'KS - Kansas'},
                        {value: 'KY', label: 'KY - Kentucky'},
                        {value: 'LA', label: 'LA - Louisiana'},
                        {value: 'ME', label: 'ME - Maine'},
                        {value: 'MD', label: 'MD - Maryland'},
                        {value: 'MA', label: 'MA - Massachusetts'},
                        {value: 'MI', label: 'MI - Michigan'},
                        {value: 'MN', label: 'MN - Minnesota'},
                        {value: 'MS', label: 'MS - Mississippi'},
                        {value: 'MO', label: 'MO - Missouri'},
                        {value: 'MT', label: 'MT - Montana'},
                        {value: 'NE', label: 'NE - Nebraska'},
                        {value: 'NV', label: 'NV - Nevada'},
                        {value: 'NH', label: 'NH - New Hampshire'},
                        {value: 'NJ', label: 'NJ - New Jersey'},
                        {value: 'NM', label: 'NM - New Mexico'},
                        {value: 'NY', label: 'NY - New York'},
                        {value: 'NC', label: 'NC - North Carolina'},
                        {value: 'ND', label: 'ND - North Dakota'},
                        {value: 'OH', label: 'OH - Ohio'},
                        {value: 'OK', label: 'OK - Oklahoma'},
                        {value: 'OR', label: 'OR - Oregon'},
                        {value: 'PA', label: 'PA - Pennsylvania'},
                        {value: 'RI', label: 'RI - Rhode Island'},
                        {value: 'SC', label: 'SC - South Carolina'},
                        {value: 'SD', label: 'SD - South Dakota'},
                        {value: 'TN', label: 'TN - Tennessee'},
                        {value: 'TX', label: 'TX - Texas'},
                        {value: 'UT', label: 'UT - Utah'},
                        {value: 'VT', label: 'VT - Vermont'},
                        {value: 'VA', label: 'VA - Virginia'},
                        {value: 'WA', label: 'WA - Washington'},
                        {value: 'WV', label: 'WV - West Virginia'},
                        {value: 'WI', label: 'WI - Wisconsin'},
                        {value: 'WY', label: 'WY - Wyoming'}
                    ],
                },

                tabledata: [],
                tabledataTmp: [],

                //dialog
                dialogForm: {},
                dialogFormVisible: false,

                checkeddisabled: false,
            }
        },
        created() {
            this.getListSite()
        },
        methods: {
            handelClickOfStateSelect(item) {
                // console.log(this.dialogForm.state)
                // this.dialogForm.state = item.value
                // this.$forceUpdate()
            },
            saveSite() {
                this.$refs.addSiteFormRef.validate(async valid => {
                    if (!valid) return;

                    this.dialogForm.orgid = window.sessionStorage.getItem("userid")

                    // console.log(this.dialogForm)

                    const {data: res} = await this.$http.post('warehouse/addsite', this.dialogForm)

                    if (res.meta.status == 200) {
                        this.dialogFormVisible = false

                        this.getListSite()
                    }
                })
            },
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListSite()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListSite()
            },
            async getListSite() {
                this.pageInfo.orgid = window.sessionStorage.getItem("userid")
                const {data: res} = await this.$http.post('warehouse/queryListPageWarehousesite', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tabledataTmp = res.data
                    // // this.tableData = []
                    // // this.$set(this.tableData, [...res.data])
                    // this.tableData = Object.assign({}, this.tableData)

                    // this.$set(this.tableData, this.pageInfo.current, res.data)

                    this.pageInfo.current = res.info.pageNum
                    this.pageInfo.pageSize = res.info.pageSize
                    this.pageInfo.total = res.info.total
                }
            },
            openAddSiteDialog(type, row) {
                this.dialogFormVisible = true
                if (type == 'add') {
                    this.checkeddisabled = false
                    this.dialogForm = {}
                } else if (type == 'edit') {
                    this.checkeddisabled = true
                    // console.log(row)

                    this.dialogForm = row

                    // if ((this.dialogForm.checked && this.dialogForm.checked == 'true') || this.dialogForm.checked == true) {
                    //     this.dialogForm.checked = true
                    // } else {
                    //     this.dialogForm.checked = false
                    // }
                }


            },
        },
        watch: {
            tabledataTmp() {
                this.tabledata = this.tabledataTmp
            },
        },
    }
</script>

<style scoped lang="less">
    .spanofcenter {
        font-size: 12px;
    }

    .selectwidth {
        width: 100%;
    }

    .topOfMar {
        margin-top: 16px;
    }

    .rowOfFlex {
        display: flex;
    }

    .rowofbetleft {
        display: flex;
        justify-content: left;
    }

    /deep/ .errorColor {
        margin-top: -60px;
        color: black;
    }

    .itemheight {
        margin-bottom: 35px;
    }

    .rowitemheight {
        margin-bottom: 15px;
    }
</style>