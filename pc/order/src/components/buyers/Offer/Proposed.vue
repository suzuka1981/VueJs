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
                                @input="getListOfferActive"
                        >
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="body">
            <Table
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :pageInfo="pageInfo"
                    :tableData="tableData"
                    @func="getRowFormSon"
                    @funComments="getRowCommentsFormSon"
                    @funcCancel="getRowCancel"
                    propsMsg="proposed"/>
        </div>

        <!--        edit-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Take Offer" :visible.sync="dialogFormTakeVisible">
            <el-form
                    :rules="editOfferForm_Rules"
                    ref="editOfferFormRef"
                    :model="form">
                <span style="margin-right: 20px">
                    Offer ID:{{form.id}}
                </span>
                <span>
                    Organization: {{form.organization}}
                </span>

                <div style="font-size: 12px;margin-top: 10px">
                    Product
                </div>
                <el-form-item>
                    <el-input
                            placeholder="Offer"
                            v-model="form.offer"
                            :disabled="true"
                            prefix-icon="el-icon-shopping-cart-full"
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-select :disabled="true" v-model="form.sendto" placeholder="local_shipping *" class="selectprefix">
                        <el-option label="Warehouse" value="warehouse"></el-option>
                        <el-option label="Self" value="self"></el-option>
                    </el-select>
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
                <div style="font-size: 12px;margin-top: 10px">
                    Quantity
                </div>
                <el-form-item prop="tmpsubquantity">
                    <el-input
                            placeholder="Quantity"
                            v-model="form.tmpsubquantity"
                            prefix-icon="iconfont icon-quantity"
                            @input="getQuantityMAx"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormTakeVisible = false">Close</el-button>
                <el-button type="primary" @click="dialogEditSubmit">Submit</el-button>
            </div>
        </el-dialog>

        <!--        Comments-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Comments" :visible.sync="dialogCommentsFormVisible">
            <el-form :model="form">
                <div style="font-size: 12px;margin-top: 10px;text-align: right">
                    Message quantity: 0/200
                </div>
                <el-form-item>
                    <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="godupgodzr"
                            aria-label="godupgodzr"
                            v-model="form.message">
                    </el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-checkbox v-model="form.checked">Mark unread</el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Close</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">Send</el-button>
            </div>

            <div>
                <el-card style="overflow-y: auto;height: 150px">
                    <div v-for="count in 10">
                        <div>
                            <span style="font-size: 12px;margin-right: 10px;">
                                User:
                            </span>
                            <span style="font-size: 14px;">
                                Mr.Li {{count}}
                                <span style="font-size: 10px;">
                                    <i class="el-icon-warning" style="color: cornflowerblue" v-show="count%2==0"></i>
                                </span>
                            </span>
                        </div>
                        <div>
                            <span style="font-size: 12px;margin-right: 10px;">
                                Create time:
                            </span>
                            <span style="font-size: 14px;">
                                2021/8/24
                            </span>
                        </div>
                        <div style="margin-bottom: 10px">
                            <span style="font-size: 12px;margin-right: 10px;">
                                Message:
                            </span>
                            <span style="font-size: 14px;">
                                I want to speaking
                            </span>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Offer/comp/ProposedTable.vue')

    import '../../../assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table
        },
        created() {
            this.timer = setInterval(() => {
                // console.log('刷新test')
                this.getListOfferActive()
            }, 1000 * 10)

            if (this.tableData == null) {
                this.tableData = []
                this.getListOfferActive()
            }
        },
        beforeDestroy() {
            if(this.timer) {
                clearInterval(this.timer); //关闭
            }
        },
        data() {
            return {
                //表单验证规则
                editOfferForm_Rules: {
                    tmpsubquantity: [
                        {required: true, message: 'Quantity is required.', trigger: 'blur'},
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
                tableData: null,

                optionsOfOrganization: [],
                valueOfOrganization: '',

                //dialog
                dialogFormTakeVisible: false,
                dialogCommentsFormVisible: false,
                form: [],
                formLabelWidth: '120px'
            };
        },
        methods: {
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListOfferActive()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListOfferActive()
            },
            getRowFormSon(data) {
                this.form = data
                this.dialogFormTakeVisible = true
            },
            getRowCommentsFormSon(data) {
                this.form = data
                this.dialogCommentsFormVisible = true
            },
            handleSelectChange(item) {
                if (item.value != 'all') {
                    this.pageInfo.orguserselect = item.value
                } else {
                    this.pageInfo.orguserselect = null
                }

                this.getListOfferActive()
            },
            async getListOfferActive() {
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.type = window.sessionStorage.getItem("type")
                this.pageInfo.id = window.sessionStorage.getItem("userid")
                this.pageInfo.searchinput = this.searchinput
                const {data: res} = await this.$http.post('buyersoffer/queryBuyersListPageProposed', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tabledataTmp = []
                    // if (res.querylistOfferList) {
                    //     res.querylistOfferList.forEach(function (item) {
                    //         if (item.warehousesitesvalue) {
                    //             let dataStrArr = item.warehousesitesvalue.split(',')
                    //             let dataIntArr = [];
                    //             dataIntArr = dataStrArr.map(item => {
                    //                 return +item;
                    //             });
                    //             item.warehousesitesvalue = dataIntArr
                    //         }
                    //     })
                    // }

                    this.tableData = res.querylistOfferList

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

                    // console.log(this.tabledataTmp)

                    if (res.info) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total
                    }
                }
            },
            dialogEditSubmit() {
                this.$refs.editOfferFormRef.validate(async valid => {
                    if (!valid) return;
                    if (this.form.tmpsubquantity > this.form.usedquantity) {
                        return this.$message.error('Insufficient quantity Error.');
                    }

                    this.form.subquantity = this.form.tmpsubquantity
                    let tmp = this.form
                    if (tmp.warehousesitesvalue) {
                        tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                    }

                    tmp.selfid = window.sessionStorage.getItem("userid")
                    delete tmp.warehousesites
                    delete tmp.tmpsubquantity

                    tmp.tmpstatus = 'editpropose'

                    const {data: res} = await this.$http.post('buyersoffer/taskorconfirmoffer', tmp)

                    // console.log(this.form)

                    this.dialogFormTakeVisible = false

                    this.getListOfferActive()
                })
            },
            getQuantityMAx() {
                if (this.form.tmpsubquantity > this.form.usedquantity) {
                    return this.$message.error('Insufficient quantity Error.');
                }
            },
            async getRowCancel(data) {
                let tmp = data
                if (tmp.warehousesitesvalue) {
                    tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                }

                tmp.selfid = window.sessionStorage.getItem("userid")
                delete tmp.warehousesites
                delete tmp.tmpsubquantity

                tmp.tmpstatus = 'cancelpropose'

                const {data: res} = await this.$http.post('buyersoffer/taskorconfirmoffer', tmp)

                // console.log(this.form)

                this.dialogFormTakeVisible = false

                this.getListOfferActive()
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
            background: url('../../../assets/img/car.png') no-repeat;
            background-size: 16px 14px;
            background-position: 4px 10px;
            padding: 0px 0 0 26px;
            box-sizing: border-box;
            font-size: 14px;
        }
    }

</style>