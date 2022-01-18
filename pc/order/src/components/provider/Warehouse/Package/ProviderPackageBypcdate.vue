<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="4">
                    <el-input
                            @input="getListPackageByUpcData"
                            class="topofall" placeholder="UPC / SKU / SN" v-model="searchinput"></el-input>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-button
                            @click="handleFromSap"
                            class="sapbutton"
                            type="text">Sync sap
                    </el-button>

                    <span
                            v-show="runstatus"
                            class="spanrun">Running...</span>
                    <img
                            v-show="runstatus"
                            class="runimg"
                            src="../../../../assets/running.gif" alt="">
                </el-col>
                <el-col :span="9" :offset="5" class="betweenofcol">
                    <div>
                        <span class="demonstration">Start date</span>
                        <el-date-picker
                                v-model="startDate"
                                type="date"
                                placeholder="Select date"
                                :picker-options="pickerOptions"
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
                        <el-button @click="getListPackageByUpcData" class="topofall">Search
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="tablebody">
            <Table
                    :pageInfo="pageInfo"
                    :tableData="tabledata"
                    @funcDetail="handleDetail"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    @funcRefresh="getListPackageByUpcData"
                    @funcAddProduct="handleAddProduct"
            />
        </div>

        <div class="dialog">
            <!--            <el-dialog title="Package info" :visible.sync="dialogFormVisible" width="90%">-->
            <!--                <el-form :model="dialogForm">-->
            <!--                    <el-card class="heightofcard">-->
            <!--                        <el-card class="cardofbottom">-->
            <!--                            <div>-->
            <!--                                <span class="bolderofall">Note: </span>-->
            <!--                                <span>UPC: </span>-->
            <!--                                <span>{{dialogForm.upc}}</span>-->
            <!--                                <span>total Qty: </span>-->
            <!--                                <span>{{dialogForm.quantity}}</span>-->
            <!--                                <span>normal Qty: </span>-->
            <!--                                <span>{{dialogForm.quantity}}</span>-->
            <!--                                <span>abnormal Qty: </span>-->
            <!--                                <span>{{dialogForm.quantity}}</span>-->
            <!--                            </div>-->
            <!--                            <div>-->
            <!--                                <el-button-->
            <!--                                        class="topofall"-->
            <!--                                        v-show="imageButtonShow(dialogForm)"-->
            <!--                                        @click="handleImageView(dialogForm)">Image view-->
            <!--                                </el-button>-->
            <!--                            </div>-->
            <!--                        </el-card>-->

            <!--                        <el-card v-for="(item,index) in dialogForm.messagelist" :key="index" class="cardofbottom">-->
            <!--                            <div>-->
            <!--                                <span class="bolderofall tobluecolor">unitedelectronicsdeals &nbsp;</span>-->
            <!--                                <span>{{item.date}}</span>-->
            <!--                            </div>-->
            <!--                            <div class="topofall">-->
            <!--                                {{item.msg}}-->
            <!--                            </div>-->
            <!--                            <div class="topofall">-->
            <!--                                <el-button-->
            <!--                                        v-show="imageButtonShow(item)"-->
            <!--                                        @click="handleImageView(dialogForm)">Image view-->
            <!--                                </el-button>-->
            <!--                            </div>-->
            <!--                        </el-card>-->
            <!--                    </el-card>-->

            <!--                    <div>-->
            <!--                        <div style="font-size: 12px;margin-top: 10px;text-align: right">-->
            <!--                            Message quantity: 0/200-->
            <!--                        </div>-->
            <!--                        <el-form-item>-->
            <!--                            <el-input-->
            <!--                                    type="textarea"-->
            <!--                                    :rows="5"-->
            <!--                                    placeholder="unitedelectronicsdeals"-->
            <!--                                    aria-label="unitedelectronicsdeals"-->
            <!--                                    v-model="dialogForm.message">-->
            <!--                            </el-input>-->
            <!--                        </el-form-item>-->
            <!--                    </div>-->

            <!--                    <div>-->
            <!--                        <div class="iconofupload">-->
            <!--                            <i class="el-icon-upload"></i>-->
            <!--                            <el-upload-->
            <!--                                    class="upload-demo"-->
            <!--                                    ref="upload"-->
            <!--                                    action="#"-->
            <!--                                    :on-preview="handlePreview"-->
            <!--                                    :on-remove="handleRemove"-->
            <!--                                    :file-list="dialogForm.fileList"-->
            <!--                                    :auto-upload="false">-->
            <!--                                <el-button slot="trigger" size="small">Select file</el-button>-->
            <!--                            </el-upload>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </el-form>-->
            <!--                <div slot="footer" class="dialog-footer">-->
            <!--                    <el-button @click="dialogFormVisible = false">Close</el-button>-->
            <!--                    <el-button type="primary" @click="dialogFormVisible = false">Send</el-button>-->
            <!--                </div>-->
            <!--            </el-dialog>-->

            <!--        add and edit product-->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    :title="dialogForm.titileName" width="70%" :visible.sync="dialogFormVisible">
                <el-form
                        :rules="addAndEditSiteForm_Rules"
                        ref="addAndEditProductFormRef"
                        :model="dialogForm">
                    <el-form-item prop="name">
                        <div class="el-form-item__error errorColor" v-show="dialogForm.name">
                            Names
                        </div>
                        <el-input
                                v-show="!dialogForm.existproductstatus"
                                style="width: 70%;margin-right: 10px"
                                prefix-icon="el-icon-c-scale-to-original"
                                v-model="dialogForm.name"
                                placeholder="Names" autocomplete="off"></el-input>

                        <el-autocomplete
                                style="width: 70%;margin-right: 10px"
                                v-show="dialogForm.existproductstatus"
                                class="inline-input widthAll"
                                :fetch-suggestions="querySearchOffer"
                                placeholder="Offer"
                                clearable
                                v-model="dialogForm.name"
                                prefix-icon="el-icon-shopping-cart-full"
                                @select="handleOfferSelect"
                        >
                        </el-autocomplete>
                        <el-checkbox v-model="dialogForm.existproductstatus">Use exist product</el-checkbox>
                    </el-form-item>

                    <el-row>
                        <el-col :span="11">
                            <el-form-item>
                                <div class="el-form-item__error errorColor" v-show="dialogForm.price">
                                    Price
                                </div>
                                <el-input
                                        class="selectwidth"
                                        prefix-icon="iconfont icon-1"
                                        v-model="dialogForm.price"
                                        placeholder="Price" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item prop="conditionvalue">
                                <div class="el-form-item__error errorColor" v-show="dialogForm.conditionvalue">
                                    Condition
                                </div>
                                <el-select
                                        class="selectwidth"
                                        v-model="dialogForm.conditionvalue"
                                        placeholder="-- All --">
                                    <el-option
                                            v-for="item in formstruct.optionsOfCondition"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item>
                        <div class="el-form-item__error errorColor" v-show="dialogForm.asin">
                            ASIN
                        </div>
                        <el-input
                                prefix-icon="el-icon-aim"
                                v-model="dialogForm.asin"
                                placeholder="ASIN" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="el-form-item__error errorColor" v-show="dialogForm.sku">
                            SKU
                        </div>
                        <el-input
                                prefix-icon="el-icon-aim"
                                v-model="dialogForm.sku"
                                placeholder="SKU" autocomplete="off"></el-input>
                    </el-form-item>

                    <div class="leftofdiv">
                        <el-form-item class="selectwidth" prop="upc">
                            <div class="el-form-item__error errorColor" v-show="dialogForm.upc">
                                UPC
                            </div>
                            <el-input
                                    disabled
                                    prefix-icon="el-icon-s-flag"
                                    v-model="dialogForm.upc"
                                    placeholder="UPC" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-button
                                type="text"
                                size="small"
                                @click="" disabled> Check archive
                        </el-button>
                    </div>

                    <el-form-item>
                        <el-checkbox v-model="dialogForm.checked">Please confirm. Warning: leaving UPC empty will cause
                            inbound packages not able to link
                        </el-checkbox>
                    </el-form-item>

                    <el-form-item>
                        <div class="spanofcenter">
                            Note
                        </div>
                        <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="Note"
                                v-model="dialogForm.note">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Close</el-button>
                    <el-button type="primary" @click="addAndEditProductSave">Save</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Warehouse/Package/PackageComp/PackageByupcdateTable.vue')
    import '../../../../assets/icon/iconfont.css'

    export default {
        name: "ProviderPackageBytracking",
        components: {
            Table,
        },
        created() {
            this.getListPackageByUpcData()
        },
        data() {
            return {
                runstatus: false,

                formstruct: {
                    optionsOfCondition: [
                        {
                            value: 'new',
                            label: 'New'
                        }, {
                            value: 'used',
                            label: 'Used'
                        }, {
                            value: 'refurbished',
                            label: 'Refurbished'
                        }
                    ],
                },

                //表单验证规则
                addAndEditSiteForm_Rules: {
                    name: [
                        {required: true, message: 'Name is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    conditionvalue: [
                        {required: true, message: 'Condition value is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    upc: [
                        {required: true, message: 'Upc value is required.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },

                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                searchinput: '',
                startDate: '',
                endDate: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },

                tabledata: [],

                //dialog
                dialogFormVisible: false,
                dialogForm: {
                    upc: '',
                    existproductstatus: false,
                    // urls: [],
                    // fileList: [],
                },

                offersearcherror: false,
                productList: [],
            }
        },
        methods: {
            handleOfferSelect(item) {
                if (this.dialogForm.name) {
                    let id = this.dialogForm.name.split("---")[0]

                    let tmpList = []
                    // console.log(this.productList)
                    this.productList.forEach(function (product) {
                        if(product.id == id) {
                            tmpList.push(product)
                        }
                    })

                    // console.log(tmpList)
                    let product = tmpList[0]
                    this.dialogForm.price = product.price
                    this.dialogForm.conditionvalue = product.conditionvalue
                    this.dialogForm.asin = product.asin
                    this.dialogForm.sku = product.sku
                    this.dialogForm.id = product.id

                    if(this.dialogForm.upc){
                        if(product.upc){
                            this.dialogForm.upc = this.dialogForm.upc + ',' + product.upc
                        }
                    }

                    this.dialogForm.note = product.note
                }



            },
            async querySearchOffer(queryString, cb) {
                this.pageInfo.pagetype = "active"
                this.pageInfo.orgid = window.sessionStorage.getItem("userid")
                let result = []
                this.offersearcherror = true

                if (queryString && queryString != '') {
                    if (queryString.split('---').length > 2) {
                        this.pageInfo.searchoffer = queryString.split('---')[2]
                    } else {
                        this.pageInfo.searchoffer = queryString
                    }
                } else {
                    this.pageInfo.searchoffer = queryString
                }

                const {data: res} = await this.$http.post('offer/queryListPageActive', this.pageInfo)

                // console.log(res)

                if (!res.productdata && res.productdata.length == 0) {
                    this.offersearcherror = true
                } else {
                    this.offersearcherror = false
                }

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    if (!res.productdata) {
                        return result
                    }

                    this.productList = res.productdata
                    res.productdata.forEach(function (element) {
                        let tmp = {}
                        tmp.value = element.id

                        if (element.conditionvalue !== null)
                            tmp.value += '---' + element.conditionvalue

                        if (element.name !== null)
                            tmp.value += '---' + element.name

                        result.push(tmp)
                    });

                    if (result.length == 0) {
                        this.offersearcherror = true
                    } else {
                        this.offersearcherror = false
                    }


                    cb(result);
                }
            },
            async handleFromSap() {
                let subTmp = {
                    username: window.sessionStorage.getItem("username"),
                    userid: window.sessionStorage.getItem("userid")
                }

                this.runstatus = true

                const {data: res} = await this.$http.post('msss/linkfromsapfordata', subTmp)

                if (res.meta.status != 200) {
                    return this.$message.error('Sap Data Error.');
                } else {
                    this.$message.success(res.meta.successSize + ' upload successed, ' + res.meta.errorSize + ' upload failed');
                    this.getListPackageByUpcData()

                    this.runstatus = false
                }
            },
            handleAddProduct(val) {
                // console.log(val)
                this.dialogForm = {
                    upc: '',
                    existproductstatus: false,
                },
                    this.dialogForm.conditionvalue = 'new'
                this.dialogForm.titileName = 'Link product'
                this.dialogForm.upc = val.upc
                this.dialogFormVisible = true
            },
            addAndEditProductSave() {
                this.$refs.addAndEditProductFormRef.validate(async valid => {
                    if (!valid) return;

                    if (this.dialogForm.existproductstatus && this.offersearcherror) {
                        return this.$message.error('Product not exist.');
                    }

                    if(!this.dialogForm.existproductstatus){
                        delete this.dialogForm.id
                    }

                    // console.log(this.dialogForm)

                    this.dialogForm.orgid = window.sessionStorage.getItem("userid")

                    // console.log(this.dialogForm)
                    this.dialogFormVisible = false

                    const {data: res} = await this.$http.post('warehouse/addandeditproduct', this.dialogForm)

                    this.getListPackageByUpcData()
                })
            },
            handleDetail(row) {
                this.dialogForm = row
                this.dialogFormVisible = true
            },
            handleImageView(row) {
                //跳转新页面router写法
                const routeData = this.$router.resolve({
                    name: 'ViewImages',
                    query: {urls: row.urls, rowlength: row.urls.length},
                    // params: {urls: row}
                })

                window.open(routeData.href, '_blank');
            },
            imageButtonShow(row) {
                // console.log(this.dialogForm.urls.length)
                return row.urls.length > 0
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },

            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListPackageByUpcData()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListPackageByUpcData()
            },
            async getListPackageByUpcData() {
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.searchinput = this.searchinput
                this.pageInfo.startDate = this.startDate
                this.pageInfo.endDate = this.endDate

                this.pageInfo.userid = window.sessionStorage.getItem("userid")

                const {data: res} = await this.$http.post('warehouse/querypackagebyupcdata', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tabledata = []
                    this.tabledata = res.info.list
                    // console.log(this.tableData)

                    if (this.pageInfo) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total

                    }
                }
            }
        },
        computed: {},
    }
</script>

<style scoped lang="less">
    .betweenofcol {
        display: flex;
        justify-content: space-between;
    }

    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 12px;
        /*margin-bottom: 5px;*/
    }

    .topofall {
        margin-top: 15px;
    }

    .heightofcard {
        height: 300px;
        overflow-y: auto;
    }

    .bolderofall {
        font-weight: bolder;
    }

    /deep/ .el-dialog__body {
        padding-bottom: 0px;
    }

    .tobluecolor {
        color: #42b983;
    }

    .cardofbottom {
        margin-bottom: 5px;
    }

    .iconofupload {
        display: flex;
        font-size: 25px;

        i {
            margin-top: 7px;
            margin-right: 5px;
        }
    }

    .el-form-item {
        margin-bottom: 25px;
    }

    /deep/ .errorColor {
        margin-top: -60px;
        color: black;
    }

    .sapbutton {
        margin-top: 15px;
    }

    .runimg {
        width: 15%;
        height: 15%;
    }

    .spanrun {
        margin-left: 10px;
        font-size: 12px;
        color: red;
    }
</style>