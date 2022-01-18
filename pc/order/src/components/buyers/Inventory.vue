<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2" style="display: flex;justify-content: space-between">
                <el-col :span="12" style="display: flex;justify-content: flex-start;">
                    <div style="width:200px;margin-right: 10px;">
                        <span class="demonstration">Organization name</span>

                        <el-select v-model="valueOfOrganization" placeholder="-- All --">
                            <el-option
                                    @click.native="handleSelectChange(item)"
                                    v-for="item in optionsOfOrganization"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>

                <el-col :span="12" style="display: flex;justify-content: flex-end">
                    <div style="width: 250px;margin-right: 25px;margin-top: 20px">
                        <el-input
                                placeholder="Search"
                                suffix-icon="el-icon-search"
                                v-model="searchinput"
                                clearable
                                @input="getListTaskHistory"
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
                    @func="getRowDetailFormSon"
                    propsMsg="active"/>
        </div>

        <!--        details-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Product details" :visible.sync="dialogFormConfirmVisible">
            <!--            <el-row>-->
            <!--                <el-col :span="24">-->
            <!--                    <span class="spanlabel">-->
            <!--                        {{form.product}}-->
            <!--                    </span>-->
            <!--                </el-col>-->
            <!--            </el-row>-->

            <div class="topMenu">
                <el-row class="block-col-2">
                    <el-col :span="24">
                        <el-row class="block-col-2" style="display: flex;justify-content: flex-end;margin-right: 20px">
                            <el-col :span="6">
                                <el-input
                                        @input="searchQuery"
                                        placeholder="Search"
                                        suffix-icon="el-icon-search"
                                        v-model="searchinputdetail"
                                        clearable
                                >
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>

            <DialogTable
                    @funcDetailSizeChange="getDetailDataSizeChange"
                    @funcDetailCurrentChange="getDetailDataCurrentChange"
                    :pageInfo="pageInfodetail"
                    :tableData="formDialogToTable"
                    @funReport="getRowReportFormSon"
                    propsMsg="active"/>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormConfirmVisible = false">Close</el-button>
            </div>
        </el-dialog>

        <!--        report-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Report missing items" :visible.sync="dialogFormReportVisible">
            <el-form
                    :rules="reportForm_Rules"
                    ref="reportFormRef"
                    :model="formDialog">
                <div style="font-size: 12px;margin-top: 10px">
                    Product
                </div>
                <el-form-item>
                    <el-input
                            placeholder="Offer"
                            v-model="formDialog.name"
                            :disabled="true"
                            prefix-icon="el-icon-shopping-cart-full"
                    >
                    </el-input>
                </el-form-item>

                <div style="font-size: 12px;margin-top: 10px">
                    Quantity
                </div>
                <el-form-item prop="tmpquantity">
                    <el-input
                            @input="reportQuantity"
                            placeholder="Quantity"
                            v-model="formDialog.tmpquantity"
                            prefix-icon="el-icon-shopping-cart-full"
                    >
                    </el-input>
                </el-form-item>

                <div style="font-size: 12px;margin-top: 10px">
                    Site
                </div>
                <el-form-item>
                    <el-input
                            placeholder="Offer"
                            v-model="formDialog.sitename"
                            :disabled="true"
                            prefix-icon="el-icon-shopping-cart-full"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormReportVisible = false">Close</el-button>
                <el-button type="primary" @click="handleReport">Report</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Warehouse/Inventory/InventoryTable.vue')
    const DialogTable = () => import('@/components/buyers/Warehouse/Inventory/InventoryDialogTable.vue')

    import '../../assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table,
            DialogTable,
        },
        created() {
            this.getListTaskHistory()
        },
        data() {
            return {
                reportForm_Rules: {
                    tmpquantity: [
                        {required: true, message: 'Quantity is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },

                //表单分页
                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                //表单分页
                pageInfodetail: {
                    pageSize: 30,
                    total: 10,
                    current: 1,
                },

                searchinput: '',
                searchinputdetail: '',

                tableData: [],

                optionsOfOrganization: [],
                valueOfOrganization: '',

                //dialog
                dialogFormConfirmVisible: false,
                dialogFormReportVisible: false,

                form: [],
                formDialogToTable: [],
                formDialog: [],

                detailData: {},
            };
        },
        methods: {
            reportQuantity() {
                this.$forceUpdate();
                if (this.formDialog.tmpquantity > this.formDialog.quantity) {
                    return this.$message.error('Insufficient quantity Error.');
                }
            },
            handleSelectChange(item) {
                if (item.value != 'all') {
                    this.pageInfo.orguserselect = item.value
                } else {
                    this.pageInfo.orguserselect = null
                }

                this.getListTaskHistory()
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

                const {data: res} = await this.$http.post('taskoffer/querylistbuyersinventory', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tableData = res.querybuyersInventorylist

                    this.optionsOfOrganization = []
                    let tmpOrgList = []
                    let tmpOrg = {
                        value: 'all',
                        label: '-- All --'
                    }
                    tmpOrgList.push(tmpOrg)
                    if (res.selleruserlist) {
                        res.selleruserlist.forEach(function (row) {
                            let labeltmp = null
                            if (typeof (row.name) != 'undefined' && row.name && row.name != 0 && row.name != 'null') {
                                labeltmp = row.name
                            } else if (typeof (row.username) != 'undefined') {
                                labeltmp = row.username.split('@')[0]
                            }

                            tmpOrg = {
                                value: row.id,
                                label: labeltmp
                            }
                            tmpOrgList.push(tmpOrg)
                        })
                    }
                    this.optionsOfOrganization = tmpOrgList

                    // console.log(this.tableData)

                    if (res.info) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total

                    }
                }
            },
            async getRowDetailFormSon(data) {
                this.detailData = data

                this.pageInfodetail.searchinputdetail = this.searchinputdetail
                this.pageInfodetail.data = data

                const {data: res} = await this.$http.post('taskoffer/queryinventorydetail', this.pageInfodetail)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    if (res.querybuyersInventoryDetailPojo) {
                        this.formDialogToTable = []
                        this.formDialogToTable = res.querybuyersInventoryDetailPojo
                    } else {
                        this.formDialogToTable = []
                    }

                    if (res.info) {
                        this.pageInfodetail.current = res.info.pageNum
                        this.pageInfodetail.pageSize = res.info.pageSize
                        this.pageInfodetail.total = res.info.total

                    }

                    this.dialogFormConfirmVisible = true
                }
            },
            getDetailDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getRowDetailFormSon(this.detailData)
            },
            getDetailDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getRowDetailFormSon(this.detailData)
            },
            getRowReportFormSon(data) {
                data.tmpquantity = data.quantity
                this.formDialog = data
                this.dialogFormReportVisible = true
            },
            searchQuery() {
                this.getRowDetailFormSon(this.detailData)
            },
            handleReport() {
                this.$refs.reportFormRef.validate(async valid => {
                    if (!valid) return;

                    if (this.formDialog.tmpquantity > this.formDialog.quantity) {
                        return this.$message.error('Insufficient quantity Error.');
                    } else {

                    }

                    const {data: res} = await this.$http.post('taskoffer/reportreduceconfirm', this.formDialog)

                    if (res.meta.status != 200) {
                        return this.$message.error("Report error!");
                    } else {
                        this.dialogFormReportVisible = false
                        this.getRowDetailFormSon(this.detailData)
                    }
                })
            },
        },
    }
</script>

<style scoped lang="less">
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
            background: url('../../assets/img/car.png') no-repeat;
            background-size: 16px 14px;
            background-position: 4px 10px;
            padding: 0px 0 0 26px;
            box-sizing: border-box;
            font-size: 14px;
        }
    }

    .topMenu {
        margin-top: 15px;
    }

    .spanlabel {
        font-size: 20px;
        font-family: "Times New Roman", Times, serif;
    }
</style>