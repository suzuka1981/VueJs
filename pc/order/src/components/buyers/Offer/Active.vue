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

                    <!--                    <div style="width:200px">-->
                    <!--                        <span class="demonstration">Participation</span>-->

                    <!--                        <el-select-->
                    <!--                                v-model="valueOfParticipation" placeholder="&#45;&#45; All &#45;&#45;">-->
                    <!--                            <el-option-->
                    <!--                                    v-for="item in optionsOfParticipation"-->
                    <!--                                    :key="item.value"-->
                    <!--                                    :label="item.label"-->
                    <!--                                    :value="item.value">-->
                    <!--                            </el-option>-->
                    <!--                        </el-select>-->
                    <!--                    </div>-->
                </el-col>

                <el-col :span="12" style="display: flex;justify-content: flex-end">
                    <div style="width: 250px;margin-right: 25px;margin-top: 20px">
                        <el-input
                                placeholder="Search"
                                suffix-icon="el-icon-search"
                                v-model="searchinput"
                                @input="getListOfferActive"
                                clearable
                        >
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="body">
            <Table :tableData="tableData"
                   :pageInfo="pageInfo"
                   @funcSizeChange="getDataSizeChange"
                   @funcCurrentChange="getDataCurrentChange"
                   @func="getRowFormSon"/>
        </div>

        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :title="titleName" :visible.sync="dialogFormTakeVisible">
            <el-form
                    :rules="takeOfferForm_Rules"
                    ref="takeOfferFormRef"
                    :model="form">
                <span style="margin-right: 20px">
                    Offer ID:{{form.id}}
                </span>
                <span>
                    Organization: {{getMember(form)}}
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

                <el-form-item prop="sendto">
                    <div style="font-size: 12px;margin-top: 10px">
                        Send to
                    </div>
                    <el-select v-model="form.sendto" placeholder="local_shipping *" class="selectprefix"
                               @change="sendtoChange">
                        <el-option label="Warehouse" value="warehouse"></el-option>
                        <el-option v-show="form.onlyshiptowarehouse == 'false'" label="Self" value="self"></el-option>
                    </el-select>
                </el-form-item>

                <div style="font-size: 12px;margin-top: 10px">
                    Price
                </div>
                <el-form-item>
                    <el-input
                            placeholder="Price"
                            v-model="form.pricetmp"
                            :disabled="true"
                            prefix-icon="iconfont icon-1"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item prop="subquantity">
                    <div style="font-size: 12px;margin-top: 10px">
                        Quantity
                    </div>
                    <el-input
                            @input="onInput()"
                            placeholder="Quantity"
                            v-model="form.subquantity"
                            prefix-icon="iconfont icon-quantity"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormTakeVisible = false">Close</el-button>
                <el-button type="primary" @click="takeOfferSubmit">Submit</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Offer/comp/ActiveTable.vue')

    import '../../../assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table
        },
        mounted() {
            //阻止F5刷新
            // this.stopF5Refresh()
        },
        created() {
            this.timer = setInterval(() => {
                // console.log('刷新test')
                this.getListOfferActive()
            }, 1000 * 3)

            if (this.tableData == null) {
                this.tableData = []
                this.getListOfferActive()
            }
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer); //关闭
            }
        },
        data() {
            return {
                //表单验证规则
                takeOfferForm_Rules: {
                    sendto: [
                        {required: true, message: 'Send to is required.', change: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    subquantity: [
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
                tabledataTmp: [],
                tableData: null,

                optionsOfOrganization: [
                    {
                        value: 'all',
                        label: '-- All --'
                    },
                    {
                        value: 'unitedelectronicsdeals',
                        label: 'unitedelectronicsdeals'
                    }
                ],
                valueOfOrganization: '',

                optionsOfParticipation: [
                    {
                        value: 'all',
                        label: '-- All --'
                    },
                    {
                        value: 'participated',
                        label: 'Participated'
                    },
                    {
                        value: 'notparticipated',
                        label: 'Not participated'
                    }
                ],
                valueOfParticipation: '',


                //dialog
                dialogFormTakeVisible: false,
                form: [],
                formLabelWidth: '120px',
                titleName: '',
                type: '',
            };
        },
        methods: {
            stopF5Refresh() {
                // this.$router.push(this.$route.path)
                // document.onkeydown = function (e) {
                //     var evt = window.event || e;
                //     var code = evt.keyCode || evt.which;
                //     if (code == 116) {
                //         // location.reload()
                //         if (evt.preventDefault) {
                //
                //             // location.reload()
                //             // this.$router.go(0)
                //             evt.preventDefault();
                //         } else {
                //             evt.keyCode = 0;
                //             evt.returnValue = false
                //         }
                //     }
                // }
            },
            onInput() {
                this.$forceUpdate();
                if (this.type != 'propose') {
                    if (this.form.subquantity > this.form.usedquantity) {
                        return this.$message.error('Insufficient quantity Error.');
                    }
                }
            },
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListOfferActive()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListOfferActive()
            },
            sendtoChange() {
                this.form.pricetmp = this.form.price
                this.form.pricetmp = this.form.pricetmp.toFixed(2)

                if (this.form.sendto == 'self') {
                    if (this.form.onlyshiptowarehouse == 'false' && this.form.bonus) {
                        this.form.pricetmp = this.form.price + this.form.bonus
                    }
                }
            },
            getRowFormSon(data, type) {
                if (type == 'take') {
                    this.titleName = 'Take Offer'
                    this.type = 'take'
                } else if (type == 'propose') {
                    this.titleName = 'Propose Offer'
                    this.type = 'propose'
                }
                data.subquantity = data.usedquantity
                data.pricetmp = data.price

                this.form = data
                this.dialogFormTakeVisible = true
                // console.log(this.form)
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
                this.pageInfo.pagetype = "active"
                this.pageInfo.searchinput = this.searchinput
                const {data: res} = await this.$http.post('buyersoffer/queryBuyersListPageActive', this.pageInfo)

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

                    this.tabledataTmp = res.querylistOfferList

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

                    // console.log(res.selleruserlist)

                    if (res.info) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total
                    }
                }
            },
            async takeOfferSubmit() {
                this.$refs.takeOfferFormRef.validate(async valid => {
                    if (!valid) return;

                    if (this.type != 'propose') {
                        if (this.form.subquantity > this.form.usedquantity) {
                            return this.$message.error('Insufficient quantity Error.');
                        }
                    }

                    this.form.price = this.form.pricetmp
                    delete this.form.pricetmp

                    let tmp = this.form
                    if (tmp.warehousesitesvalue) {
                        tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                    }

                    tmp.selfid = window.sessionStorage.getItem("userid")
                    delete tmp.warehousesites

                    if (this.type == 'take') {
                        tmp.status = 'task'
                    } else if (this.type == 'propose') {
                        tmp.status = 'propose'
                    }

                    const {data: res} = await this.$http.post('buyersoffer/taskorconfirmoffer', tmp)

                    if (res.meta.status === '303') {
                        return this.$message.error('Insufficient quantity Error.');
                    }
                    // console.log(this.form)

                    this.dialogFormTakeVisible = false

                    this.getListOfferActive()
                })
            },
            getMember(row) {
                if (typeof (row.sellerrelname) != 'undefined' && row.sellerrelname && row.sellerrelname != 0 && row.sellerrelname != 'null') {
                    return row.sellerrelname
                } else if (typeof (row.sellerusername) != 'undefined') {
                    return row.sellerusername.split('@')[0]
                }
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