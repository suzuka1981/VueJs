<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2">
                <el-col :span="12">
                    <el-row class="block-col-2">
                        <el-col :span="12">
                            <el-input
                                    placeholder="Product name / Offer id / Org name"
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
            <Table :tableData="tableData"
                   :pageInfo="pageInfo"
                   @funcSizeChange="getDataSizeChange"
                   @funcCurrentChange="getDataCurrentChange"
                   propsMsg="active"/>
        </div>

        <!--        confirm-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Confirm Task" :visible.sync="dialogFormConfirmVisible">
            <el-form :model="form">
                <div style="font-size: 12px;margin-top: 10px">
                    Product Name
                </div>
                <el-form-item>
                    <el-input
                            placeholder="Offer"
                            v-model="form.item"
                            prefix-icon="el-icon-document-copy"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                            placeholder="Organization"
                            v-model="form.organization"
                            prefix-icon="el-icon-takeaway-box"
                    >
                    </el-input>
                </el-form-item>
                <div style="font-size: 12px;margin-top: 10px">
                    Price
                </div>
                <el-form-item>
                    <el-input
                            placeholder="Price"
                            v-model="form.price"
                            prefix-icon="iconfont icon-1"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="form.region" placeholder="local_shipping *" class="selectprefix">
                        <el-option label="Warehouse" value="Warehouse"></el-option>
                        <el-option label="Self" value="Self"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input
                            placeholder="Quantity"
                            v-model="form.quantity"
                            prefix-icon="iconfont icon-quantity"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormTakeVisible = false">Close</el-button>
                <el-button type="primary" @click="dialogFormTakeVisible = false">Confirm</el-button>
            </div>
        </el-dialog>

        <!--cancel-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Cancel task" :visible.sync="dialogFormCancelVisible">
            <el-form :model="form">
                <div style="font-size: 12px;margin-top: 10px">
                    Quantity to cancel
                </div>
                <el-form-item>
                    <el-input
                            placeholder="Quantity"
                            v-model="form.quantity"
                            prefix-icon="iconfont icon-quantity"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormTakeVisible = false">Close</el-button>
                <el-button type="primary" @click="dialogFormTakeVisible = false">ok</el-button>
            </div>
        </el-dialog>

        <!--    warehouse 点击    -->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Address" :visible.sync="dialogWarehouseTableVisible" width="70%">
            <el-table :data="gridData">
                <el-table-column property="sitename" label="Site name" width="300"></el-table-column>
                <el-table-column property="organizationid" label="Organization id" width="200"></el-table-column>
                <el-table-column property="address" label="Address"></el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Task/comp/CenceledTable.vue')

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
                dialogFormConfirmVisible: false,
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
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListTaskHistory()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListTaskHistory()
            },
            async getListTaskHistory(){
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.searchinput = this.searchinput
                this.pageInfo.startDate = this.startDate
                this.pageInfo.endDate = this.endDate
                const {data: res} = await this.$http.post('taskoffer/querytaskcancellist', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tableData = res.querylistCancelList
                    // console.log(this.tableData)

                    if (this.info) {
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