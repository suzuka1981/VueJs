<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2">
                <el-col :span="12">
                    <el-row class="block-col-2">
                        <el-col :span="12">
                            <el-input
                                    placeholder="Product name / Offer id / Org name / Tracking"
                                    v-model="searchinput"
                                    style="margin-top: 20px"
                                    @input="getListTaskHistory"
                                    clearable
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>

                <el-col :span="10" style="display: flex;justify-content: space-between">
                    <div>
                        <span class="demonstration">Start date</span>
                        <!--                        :picker-options="pickerOptions"-->
                        <el-date-picker
                                v-model="startDate"
                                type="date"
                                placeholder="Select date"
                        >
                        </el-date-picker>
                    </div>

                    <div>
                        <span class="demonstration">end date</span>
                        <el-date-picker
                                v-model="endDate"
                                type="date"
                                placeholder="Select date"
                        >
                        </el-date-picker>
                    </div>

                    <div>
                        <el-button @click="getListTaskHistory" style="margin-top: 21px">Search</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="body">
            <Table
                    @funCancel="getRowCancelFormSon"
                    @funWarehouseClick="getRowWarehouseClickFormSon"
                    :tableData="tableData"
                    :pageInfo="pageInfo"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    propsMsg="active"/>
        </div>

        <!--cancel-->
        <!--cancel-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Cancel task" :visible.sync="dialogFormCancelVisible">
            <el-form
                    :rules="confirmForm_Rules"
                    ref="CancelFormRef"
                    :model="form">
                <div style="font-size: 12px;margin-top: 10px">
                    Quantity to cancel
                </div>
                <el-form-item prop="tmpquantity">
                    <el-input
                            @input="onInput()"
                            placeholder="Quantity"
                            v-model="form.tmpquantity"
                            prefix-icon="iconfont icon-quantity"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormCancelVisible = false">Close</el-button>
                <el-button type="primary" @click="handleCancelClick">ok</el-button>
            </div>
        </el-dialog>
        <!--    warehouse 点击    -->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Address" :visible.sync="dialogWarehouseTableVisible" width="70%">
            <el-table :data="gridData">
                <el-table-column property="sitename" label="Site name" width="300"></el-table-column>
                <el-table-column property="orgid" label="Organization id" width="200"></el-table-column>
                <el-table-column property="address1" label="Address"></el-table-column>
                <el-table-column property="contact" label="Site code"></el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Task/comp/ProviderActiveTable.vue')

    import '../../../assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table
        },
        created() {
            this.getListTaskHistory()
        },
        data() {
            return {
                confirmForm_Rules: {
                    selfsite: [
                        {required: true, message: 'Location is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    quantity: [
                        {required: true, message: 'Quantity is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    tmpquantity: [
                        {required: true, message: 'Quantity is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    trackingnumber: [
                        {required: true, message: 'Tracking number is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },

                //表单分页
                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                searchinput: '',
                tableData: [],
                gridData: [{
                    sitename: 'Easygo warehouse - 55 Harvey Road',
                    organizationid: 'XRV',
                    address: '55 Harvey Road, Unit XRV, Londonderry, New Hampshire 03053\n'
                },
                ],

                //dialog
                dialogFormCancelVisible: false,
                dialogWarehouseTableVisible: false,
                form: [],
                formLabelWidth: '120px',

                startDate: '',
                endDate: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
            };
        },
        methods: {
            handleCancelClick() {
                this.$refs.CancelFormRef.validate(async valid => {
                    if (!valid) return;

                    if (this.form.tmpquantity > this.form.usedquantity) {
                        return this.$message.error('Insufficient quantity Error.');
                    }

                    let tmp = this.form
                    if (tmp.warehousesitesvalue) {
                        tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                    }

                    // tmp.selfid = window.sessionStorage.getItem("userid")
                    tmp.type = 'warehouse'

                    tmp.usedquantity = tmp.tmpquantity

                    delete tmp.warehousesites

                    const {data: res} = await this.$http.post('taskoffer/taskcancel', tmp)

                    if (res.meta.status == 200) {
                        this.getListTaskHistory()
                        this.dialogFormCancelVisible = false
                    } else {
                        return this.$message.error('Cancel Error.');
                    }
                })
            },
            onInput() {
                // this.$forceUpdate();
                if (this.form.tmpquantity > this.form.usedquantity) {
                    return this.$message.error('Insufficient quantity Error.');
                }
            },
            getRowCancelFormSon(data) {
                this.form = data
                this.dialogFormCancelVisible = true
            },
            async getRowWarehouseClickFormSon(data) {
                let tmp = data
                if (tmp.warehousesitesvalue) {
                    tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                }

                // tmp.selfid = window.sessionStorage.getItem("userid")
                tmp.type = 'warehouse'

                delete tmp.warehousesites

                const {data: res} = await this.$http.post('taskoffer/querywarehouselist', tmp)

                if (res.sellersitedata) {
                    this.gridData = []
                    this.gridData = res.sellersitedata
                } else {
                    this.gridData = []
                }

                this.dialogWarehouseTableVisible = true
            },
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListTaskHistory()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListTaskHistory()
            },
            async getListTaskHistory() {
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.searchinput = this.searchinput
                this.pageInfo.startDate = this.startDate
                this.pageInfo.endDate = this.endDate

                this.pageInfo.selecttype = 'provider'
                this.pageInfo.userid = window.sessionStorage.getItem("userid")
                // this.pageInfo.startDate = this.startDate
                // this.pageInfo.endDate = this.endDate

                const {data: res} = await this.$http.post('taskoffer/queryBuyersTaskListPageActive', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tableData = []
                    this.tableData = res.querylistOfferList
                    // console.log(this.tableData)

                    if (this.pageInfo) {
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