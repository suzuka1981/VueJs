<template>
    <div>
        <div class="top">
            <el-button @click="dialogOpen(null,'add')">
                <span class="spanofaddress">+</span>Address
            </el-button>
        </div>

        <div class="body">
            <el-row>
                <el-col :span="4" class="cardoflineheight" v-for="(item,index) in formData" :key="index">
                    <el-card>
                        <div>
                            {{item.addressname}}
                        </div>
                        <div class="divoffontsize">
                            {{item.fullname}}
                        </div>
                        <div class="divoffontsize">
                            {{item.address1}}
                        </div>
                        <div class="divoffontsize">
                            <span v-show="item.city">
                                {{item.city}}
                            </span>
                            <span v-show="item.valueOfState">
                                -{{item.valueOfState}}
                            </span>
                            <span v-show="item.zipcode">
                                -{{item.zipcode}}
                            </span>
                        </div>
                        <div class="divoffontsize">
                            {{item.phone}}
                        </div>

                        <div class="divofbetween">
                            <el-button @click="dialogOpen(item,'edit')">Edit</el-button>
                            <el-button @click="handleDeleteClick(item)">Delete</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <!--        Please fill in address information-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Please fill in address information"
                width="65%"
                :visible.sync="dialogFormVisible">
            <el-form
                    :rules="dialogForm_Rules"
                    ref="dialogFormRef"
                    :model="dialogForm">
                <el-row class="rowofbetleft">
                    <el-col :span="12">
                        <span class="divoffontsize">Address name</span>
                        <el-form-item prop="addressname">
                            <el-input v-model="dialogForm.addressname"
                                      placeholder="Address name"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <span class="divoffontsize">Full name</span>
                        <el-form-item>
                            <el-input v-model="dialogForm.fullname"
                                      placeholder="Full name"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <span class="divoffontsize">Address line1</span>
                <el-form-item>
                    <el-input v-model="dialogForm.address1"
                              placeholder="Address line1"
                              autocomplete="off"></el-input>
                </el-form-item>

                <span class="divoffontsize">Address line2</span>
                <el-form-item>

                    <el-input v-model="dialogForm.address2"
                              placeholder="Address line2"
                              autocomplete="off"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="7">
                        <span class="divoffontsize">City</span>
                        <el-form-item>
                            <el-input v-model="dialogForm.city"
                                      placeholder="City"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7" :offset="1">
                        <span class="divoffontsize">Status</span>
                        <el-form-item>
                            <el-select
                                    v-model="dialogForm.valueOfState"
                                    placeholder="Status">
                                <el-option
                                        v-for="item in formstruct.optionsOfState"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                    <span>{{item.label}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <span class="divoffontsize">Zip code</span>
                        <el-form-item>
                            <el-input v-model="dialogForm.zipcode"
                                      placeholder="Zip code"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <span class="divoffontsize">Phone</span>
                        <el-form-item>
                            <el-input v-model="dialogForm.phone"
                                      placeholder="Phone"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7" :offset="1">
                        <span class="divoffontsize">Company name</span>
                        <el-form-item>
                            <el-form-item>
                                <el-input v-model="dialogForm.companyname"
                                          placeholder="Company name"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <span class="divoffontsize">Ein</span>
                        <el-form-item>
                            <el-input v-model="dialogForm.ein"
                                      placeholder="Ein"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7" :offset="1">
                        <span class="divoffontsize">Email</span>
                        <el-form-item>
                            <el-input v-model="dialogForm.email"
                                      placeholder="Email"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7" :offset="1">
                        <span class="divoffontsize">Country</span>
                        <el-form-item>
                            <el-select
                                    v-model="dialogForm.valueOfCountry"
                                    placeholder="Country">
                                <el-option
                                        v-for="item in formstruct.optionsOfCountry"
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
                <el-button type="primary" @click="addresssave">Save</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ProviderAddress",
        created() {
            this.queryOutboundAddress()
        },
        data() {
            return {
                dialogForm_Rules: {
                    addressname: [
                        {required: true, message: 'The address name is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    // email: [
                    //     {required: true, message: 'The email address is empty.', trigger: 'blur'},
                    //     {type: 'email', message: 'The email address is badly formatted.', trigger: ['blur', 'change']},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    // password: [
                    //     {required: true, message: 'Password must be valid', trigger: 'blur'},
                    //     // {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
                    // ]
                },


                dialogFormVisible: false,
                dialogForm: {
                    addressname: '',
                    fullname: '',
                    address1: '',
                    address2: '',
                    city: '',
                    valueOfState: '',
                    zipcode: '',
                    phone: '',
                    companyname: '',
                    ein: '',
                    email: '',
                    valueOfCountry: '',
                },

                formData: [],

                formstruct: {
                    optionsOfState: [
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

                    optionsOfCountry: [
                        {
                            value: 'Afghanistan',
                            label: 'Afghanistan'
                        },
                        {
                            value: 'Aland Islands',
                            label: 'Aland Islands'
                        },
                        {
                            value: 'Albania',
                            label: 'Albania'
                        }
                    ],
                },
            }
        },
        methods: {
            async queryOutboundAddress() {
                let tmp = {
                    orgid: window.sessionStorage.getItem("userid")
                }

                const {data: res} = await this.$http.post('outbound/label/queryoutboundaddress', tmp)

                if (res.meta.status == 303) {
                    return this.$message.error(res.meta.msg);
                } else if (res.meta.status == 200) {
                    this.formData = res.data
                    // console.log(res.data)
                }
            },
            addresssave() {
                this.$refs.dialogFormRef.validate(async valid => {
                    if (!valid) return;

                    this.dialogForm.orgid = window.sessionStorage.getItem("userid")

                    const {data: res} = await this.$http.post('outbound/label/addaddress', this.dialogForm)

                    this.dialogFormVisible = false

                    if (res.meta.status == 303) {
                        return this.$message.error(res.meta.msg);
                    } else if (res.meta.status == 200) {
                        this.queryOutboundAddress()

                        return this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    }
                })
            },
            dialogOpen(row, type) {
                if (type === 'add') {
                    this.dialogForm = {}
                    this.dialogFormVisible = true
                } else if (type === 'edit') {
                    this.dialogFormVisible = true
                    this.dialogForm = row
                }
            },
            handleDeleteClick(row) {
                this.$confirm('Are you sure to delete this address?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(async () => {
                    let tmp = {
                        id: row.id
                    }
                    const {data: res} = await this.$http.post('outbound/label/deleteaddress', tmp)

                    this.queryOutboundAddress()

                    this.$message({
                        type: 'success',
                        message: 'Ok!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel'
                    });
                });
            }
        },
    }
</script>

<style scoped lang="less">
    .top {
        margin-bottom: 25px;
    }

    /deep/ .spanofaddress {
        font-size: 25px;
        margin-right: 5px;
    }

    /deep/ .el-card {
        margin-right: 10px;
    }

    .rowofbetleft {
        display: flex;
        justify-content: left;
    }

    .cardoflineheight {
        line-height: 35px;
        margin-bottom: 20px;
    }

    .divofbetween {
        display: flex;
        justify-content: space-between;
    }

    .divoffontsize {
        font-size: 12px;
    }

</style>