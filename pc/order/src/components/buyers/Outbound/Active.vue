<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2" style="display: flex;justify-content: flex-end">
                <el-col :span="12" style="display: flex;justify-content: flex-end">
                    <div style="width: 250px;margin-right: 25px;">
                        <el-input
                                @input="getStatusList"
                                placeholder="Search"
                                suffix-icon="el-icon-search"
                                v-model="searchinput"
                                clearable
                        >
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="body">
            <Table
                    @funccancel="getDataCancel"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :pageInfo="pageInfo"
                    :tableData="tableData"
                    @funUpcToSearch="getCellUpcToSearch"
                    @func="getRowFormSon"
                    propsMsg="active"/>
        </div>

        <!--        confirm-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Confirm Shipment" :visible.sync="dialogFormConfirmVisible" width="80%">
                    <span>
                        <i class="el-icon-warning"></i>
                        <span style="padding-left: 3px">
                            Shipment info
                        </span>
                    </span>

            <el-card style="margin-top: 10px">
                <el-form :model="form">
                    <div style="font-weight: bolder">
                        More services:
                    </div>
                    <div>
                        <el-row style="margin-top: 20px;">
                            <el-col :span="6">
                                <el-checkbox @change="selectAllFunc" v-model="form.ExpEdite">ExpEdite
                                </el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox @change="selectAllFunc" v-model="form.Label">Label</el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox @change="selectAllFunc" v-model="form.Photo">Photo</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row style="margin-top: 20px;margin-bottom: 20px;">
                            <el-col :span="6">
                                <el-checkbox @change="selectAllFunc" v-model="form.Sn">Sn</el-checkbox>
                            </el-col>
                        </el-row>
                    </div>

                    <el-divider></el-divider>

                    <div style="font-weight: bolder">
                        Tenant note & Instruction:
                    </div>

                    <el-divider></el-divider>

                    <div>
                        <div class="iconofupload">
                            <i class="el-icon-upload"></i>
                            <el-upload
                                    :on-success="handleSuccess"
                                    :on-change="handleChange"
                                    class="uploadself"
                                    ref="upload"
                                    :action="uploadUrl"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="form.fileList"
                                    :limit="10"
                                    :data="uploadData"
                                    :auto-upload="false"
                                    :http-request="newFiles"
                                    :multiple="true"
                            >
                                <el-button slot="trigger" size="small">Upload label</el-button>
                            </el-upload>
                            <!--                        <el-button @click="submitUpload" :disabled="disabledStart">Start</el-button>-->
                        </div>
                    </div>

                    <div style="margin-top: 20px">
                        <el-input
                                @input="onInput"
                                type="textarea"
                                :rows="5"
                                placeholder="Note"
                                v-model="form.textareaofNote">
                        </el-input>
                    </div>
                </el-form>
            </el-card>


            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormConfirmVisible = false">Close</el-button>
                <el-button type="primary" @click="confirmshipment">Submit</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {formatDate} from "../../utils/dateFormat";

    const Table = () => import('@/components/buyers/Outbound/comp/ActiveTable.vue')

    import '../../../assets/icon/iconfont.css'
    import axios from "axios";

    export default {
        name: "Active",
        components: {
            Table,
        },
        created() {
            this.getStatusList()
        },
        data() {
            return {
                dialogFormConfirmVisible: false,

                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                searchinput: '',
                tableData: [],

                tableDataActive: [],


                //dialog
                dialogFormConfirmOfWarehouseVisible: false,

                form: {
                    unitedelectronicsdeals: '',
                    fileList: [],
                    ExpEdite: true,
                    Label: false,
                    Photo: false,
                    Sn: false,
                },

                activeName: 'first',

                totalcost: 0,
                totalprice: 0,

                //upload
                createShipmentdisabled: true,
                uploadUrl: axios.defaults.baseURL + "outbound/label/labelstatusuploadsave",
                uploadData: {},
                uploadForm: new FormData(),
            };
        },
        methods: {
            async confirmshipment() {
                // console.log(this.form.Photo)
                if (this.form.Photo) {
                    if (!this.form.fileListTmp || this.form.fileListTmp.length == 0) {
                        return this.$message.error('Upload file select Error.');
                    }
                }


                this.uploadForm.delete('uploadData')
                this.uploadForm.append('uploadData', JSON.stringify(this.form))

                const {data: res} = await this.$http.post('outbound/label/buyersconfirmshipment', this.uploadForm)

                if (res.meta.status != 200) {
                    return this.$message.error('Update Error.');
                } else {
                    this.dialogFormConfirmVisible = false
                    this.getStatusList()
                    return this.$message.success("Update ok!")
                }
            },
            selectAllFunc(val) {
                this.$forceUpdate();
            },
            newFiles(file) {
                // this.uploadForm.append('file', file)

                // return false
            },
            onInput() {
                this.$forceUpdate();
            },
            async getDataCancel(data) {
                let subTmp = {
                    labelid: data.labelid,
                    rate_no: data.rate_no
                }

                const {data: res} = await this.$http.post('outbound/label/cancellabel', subTmp)

                if (res.meta.status != 200) {
                    this.$message.error(res.meta.msg);

                    const {data: rest} = await this.$http.post('outbound/label/labelstatuscancel', data)

                    if (rest.meta.status != 200) {
                        return this.$message.error(res.meta.msg);
                    } else {
                        this.getStatusList()
                        this.$message({
                            type: 'success',
                            message: 'Update Ok!'
                        });
                    }
                } else {
                    this.$message({
                        type: 'success',
                        message: 'Label delete Ok!'
                    });

                    const {data: rest} = await this.$http.post('outbound/label/labelstatuscancel', data)

                    if (rest.meta.status != 200) {
                        return this.$message.error(res.meta.msg);
                    } else {
                        this.getStatusList()
                        this.$message({
                            type: 'success',
                            message: 'Update Ok!'
                        });
                    }
                }


                // console.log(data)
            },
            async labelstatusuploadsave() {
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
                this.form.orgid = window.sessionStorage.getItem("userid")
                this.uploadForm.delete('uploadData')
                this.uploadForm.append('uploadData', JSON.stringify(this.form))

                const {data: res} = await this.$http.post('outbound/label/labelstatusuploadsave', this.uploadForm)

                if (res.meta.status != 200) {
                    return this.$message.error('Update Error.');
                } else {
                    this.dialogFormConfirmOfWarehouseVisible = false
                    return this.$message.success("Update ok!")
                }

            },

            //upload
            handleSuccess(res, file, fileList) {
                // console.log(res)
                if (res.meta.status === '200') {
                    // this.$message.success(file.name + 'Upload success');
                    this.$message.success(res.meta.successSize + ' upload successed, ' + res.meta.errorSize + ' upload failed');

                    this.$refs.upload.clearFiles()

                    this.disabledStart = true
                }
            },
            handleChange(file, fileList) {
                // if (fileList.length > 0) {
                //     this.disabledStart = true
                // } else {
                //     this.disabledStart = false
                // }
                this.form.fileListTmp = fileList
                this.uploadForm.append('file', file.raw)
                // console.log(file.raw)

            },
            costandpricetotal(data) {
                let tmpcost = 0
                let tmpprice = 0
                data.forEach(function (item) {
                    tmpcost = tmpcost + item.productsize.toship * item.productsize.unitcost
                    tmpprice = tmpprice + item.productsize.toship * item.productsize.unitprice
                })

                this.totalcost = tmpcost
                this.totalprice = tmpprice
            },
            getDate(data) {
                let tmpDate = formatDate(new Date(data), "MM-dd-yyyy hh:mm")
                if ((tmpDate.slice(11, 13) - 12) > 0) {

                    return tmpDate.slice(0, 11) + '0' + (tmpDate.slice(11, 13) - 12) + tmpDate.slice(13, tmpDate.length) + ' PM'
                } else {
                    return tmpDate + ' AM'
                }
                return tmpDate
            },
            async getStatusList() {
                this.pageInfo.userselect = window.sessionStorage.getItem("userid")
                this.pageInfo.status = ''

                this.pageInfo.searchinput = this.searchinput

                const {data: res} = await this.$http.post('outbound/label/querystatuslist', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tableData = res.info.list

                    this.tableData.forEach(function (item) {
                        if (item.outboundStatusProductSize.length > 0) {

                            item.type = item.outboundStatusProductSize[0].type
                        }
                    })

                    if (this.pageInfo) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total

                    }
                }

            },
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getStatusList()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getStatusList()
            },
            getRowFormSon(data) {
                data.ExpEdite = false
                data.Label = false
                data.Photo = false
                data.Sn = false
                data.textareaofNote = ''

                this.form = data
                this.form.fileList = []


                this.dialogFormConfirmVisible = true
            },
            tabHandleClick(tab, event) {
                console.log(tab.label);
            },
            getCellUpcToSearch(val) {
                this.searchinput = val
            },
            handleRemove(file, fileList) {
                this.$refs.upload.clearFiles()
                this.disabledStart = true
                this.form.fileListTmp = fileList
                this.createshipmentDisabled()
            },
            handlePreview(file) {
                // console.log(file);
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

    .elrowofdialogwh {
        display: flex;
        justify-content: space-between;
    }

    .butOfWhSearch {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }

    .marginofdiv {
        margin-top: 10px;
    }

    .iconofupload {
        display: flex;
        font-size: 25px;

        i {
            margin-top: 7px;
            margin-right: 5px;
        }
    }
</style>