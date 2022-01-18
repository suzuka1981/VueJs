<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2">
                <el-col :span="12">
                    <el-row class="block-col-2">
                        <el-col :span="11">
                            <el-button @click="getRowFormSon('','add')">Add an address</el-button>
                        </el-col>
                    </el-row>
                </el-col>

                <el-col :span="8" style="display: flex;justify-content: flex-end">
                    <div style="width: 250px">
                        <el-input
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
                    :optionsOfStates = "optionsOfState"
                    @funcRowDelete="getRowDelete"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :pageInfo="pageInfo"
                    :tableData="tableData"
                    @func="getRowFormSon"
                    propsMsg="active"/>
        </div>

        <!--        Edit-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Please fill in address information" :visible.sync="dialogFormEditVisible">
            <el-form
                    :rules="addSiteForm_Rules"
                    ref="addSiteFormRef"
                    :model="form">
                <div style="font-size: 12px;margin-top: 10px">
                    Site name
                </div>
                <el-form-item prop="sitename">
                    <el-input
                            placeholder="Site name"
                            v-model="form.sitename"
                            prefix-icon="el-icon-document-copy"
                    >
                    </el-input>
                </el-form-item>

                <div style="font-size: 12px;margin-top: 10px">
                    Address line 1
                </div>
                <el-form-item prop="address1">
                    <el-input
                            placeholder="Address line 1"
                            v-model="form.address1"
                            prefix-icon="el-icon-document-copy"
                    >
                    </el-input>
                </el-form-item>

                <div style="font-size: 12px;margin-top: 10px">
                    Address line 2
                </div>
                <el-form-item>
                    <el-input
                            placeholder="Address line 2"
                            v-model="form.address2"
                            prefix-icon="el-icon-document-copy"
                    >
                    </el-input>
                </el-form-item>

                <el-row style="display: flex;justify-content: space-between">
                    <el-col :span="8">
                        <span class="demonstration">City</span>
                        <el-form-item prop="city">
                            <el-input v-model="form.city"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <span class="demonstration">State</span>

                        <el-select v-model="form.state" placeholder="State">
                            <el-option
                                    v-for="item in optionsOfState"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="8">
                        <span class="demonstration">Zip Code</span>
                        <el-form-item prop="zip">
                            <el-input v-model="form.zip"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEditVisible = false">Close</el-button>
                <el-button type="primary" @click="saveSite">Save</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Profile/SelfStorage/SelfStorageTable.vue')

    import '@/assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table
        },
        created() {
            this.getListSite()
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
                },

                inputSearch: '',

                tableData: [],
                tabledataTmp: [],

                //dialog
                dialogFormEditVisible: false,

                form: [],

                optionsOfState: [
                    {
                        value: 'AL',
                        label: 'Alabama'
                    },
                    {
                        value: 'AK',
                        label: 'Alaska'
                    },
                    {
                        value: 'AZ',
                        label: 'Arizona'
                    },
                    {
                        value: 'AR',
                        label: 'Arkansas'
                    },
                    {
                        value: 'CA',
                        label: 'California'
                    },
                    {
                        value: 'CO',
                        label: 'Colorado'
                    },
                    {
                        value: 'CT',
                        label: 'Connecticut'
                    },
                    {
                        value: 'DE',
                        label: 'Delaware'
                    },
                    {
                        value: 'FL',
                        label: 'Florida'
                    },
                    {
                        value: 'GA',
                        label: 'Georgia'
                    },
                    {
                        value: 'HI',
                        label: 'Hawaii'
                    },
                    {
                        value: 'ID',
                        label: 'Idaho'
                    },
                    {
                        value: 'IL',
                        label: 'Illinois'
                    },
                    {
                        value: 'IN',
                        label: 'Indiana'
                    },
                    {
                        value: 'IA',
                        label: 'Iowa'
                    },
                    {
                        value: 'KS',
                        label: 'Kansas'
                    },
                    {
                        value: 'KY',
                        label: 'Kentucky'
                    },
                    {
                        value: 'LA',
                        label: 'Louisiana'
                    },
                    {
                        value: 'ME',
                        label: 'Maine'
                    },
                    {
                        value: 'MD',
                        label: 'Maryland'
                    },
                    {
                        value: 'MA',
                        label: 'Massachusetts'
                    },
                    {
                        value: 'MI',
                        label: 'Michigan'
                    },
                    {
                        value: 'MN',
                        label: 'Minnesota'
                    },
                    {
                        value: 'MS',
                        label: 'Mississippi'
                    },
                    {
                        value: 'MO',
                        label: 'Missouri'
                    },
                    {
                        value: 'MT',
                        label: 'Montana'
                    },
                    {
                        value: 'NE',
                        label: 'Nebraska'
                    },
                    {
                        value: 'NV',
                        label: 'Nevada'
                    },
                    {
                        value: 'NH',
                        label: 'New Hampshire'
                    },
                    {
                        value: 'NJ',
                        label: 'New Jersey'
                    },
                    {
                        value: 'NM',
                        label: 'New Mexico'
                    },
                    {
                        value: 'NY',
                        label: 'New York'
                    },
                    {
                        value: 'NC',
                        label: 'North Carolina'
                    },
                    {
                        value: 'ND',
                        label: 'North Dakota'
                    },
                    {
                        value: 'OH',
                        label: 'Ohio'
                    },
                    {
                        value: 'OK',
                        label: 'Oklahoma'
                    },
                    {
                        value: 'OR',
                        label: 'Oregon'
                    },
                    {
                        value: 'PA',
                        label: 'Pennsylvania'
                    },
                    {
                        value: 'RI',
                        label: 'Rhode Island'
                    },
                    {
                        value: 'SC',
                        label: 'South Carolina'
                    },
                    {
                        value: 'SD',
                        label: 'South Dakota'
                    },
                    {
                        value: 'TN',
                        label: 'Tennessee'
                    },
                    {
                        value: 'TX',
                        label: 'Texas'
                    },
                    {
                        value: 'UT',
                        label: 'Utah'
                    },
                    {
                        value: 'VT',
                        label: 'Vermont'
                    },
                    {
                        value: 'VA',
                        label: 'Virginia'
                    },
                    {
                        value: 'WA',
                        label: 'Washington'
                    },
                    {
                        value: 'WV',
                        label: 'West Virginia'
                    },
                    {
                        value: 'WI',
                        label: 'Wisconsin'
                    },
                    {
                        value: 'WY',
                        label: 'Wyoming'
                    }
                ],
            };
        },
        methods: {
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListSite()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListSite()
            },
            getRowFormSon(data, type) {
                if (type === 'edit') {
                    this.form = data
                } else if (type === 'add') {
                    this.form = {
                        sitename: '',
                        address1: '',
                        address2: '',
                        state: '',
                        city: '',
                        zip: '',
                    }
                }

                this.dialogFormEditVisible = true
                // console.log(this.form)
            },
            saveSite() {
                this.$refs.addSiteFormRef.validate(async valid => {
                    if (!valid) return;
                    this.form.selfid = window.sessionStorage.getItem("userid")

                    // console.log(this.dialogForm)

                    const {data: res} = await this.$http.post('warehouse/addsite', this.form)


                    this.dialogFormEditVisible = false

                    this.getListSite()
                })
            },
            async getListSite() {
                this.pageInfo.selfid = window.sessionStorage.getItem("userid")
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
            async getRowDelete(row) {
                const {data: res} = await this.$http.post('warehouse/deleteWarehousesite',
                    {id: row.id}
                )

                if (res.meta.status == 200) {
                    this.$message({
                        type: 'success',
                        message: 'Ok!'
                    });
                }
                this.getListSite()
            },
        },
        watch: {
            tabledataTmp() {
                this.tableData = this.tabledataTmp
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

</style>