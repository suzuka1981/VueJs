<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="4" :offset="20">
                    <el-input placeholder="Search"
                              @input="getListOfferActive"
                              suffix-icon="el-icon-search"
                              v-model="searchinput"></el-input>
                </el-col>
            </el-row>
        </div>

        <div class="tablebody">
            <Table
                    :pageInfo="pageInfo"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :tableData="tabledata"
                    @func="getRowhandleEdit"
                    @funcRefresh="getListOfferActive"
            />
        </div>

        <div class="dialog">
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Edit user" :visible.sync="dialogFormVisible" width="30%">
                <el-form
                        :rules="editForm_Rules"
                        ref="editFormRef"
                        :model="formEdituser">
                    <el-form-item>
                        <span class="spanofitem">
                            User name
                        </span>
                        <el-input disabled v-model="formEdituser.username" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-divider></el-divider>

                    <el-form-item class="writemodeofitem" prop="status">
                        <el-radio-group v-model="formEdituser.status">
                            <el-radio class="buttSet" :label="2">Blocked</el-radio>
                            <!--                        <el-radio v-model="formEdituser.radio" label="limited">Limited</el-radio>-->
                            <el-radio :label="1">Accepted</el-radio>
                            <!--                        <el-radio v-model="formEdituser.radio" disabled label="unsubscribed">Unsubscribed</el-radio>-->
                        </el-radio-group>
                    </el-form-item>

                    <!--                    <el-form-item>-->
                    <!--                        <span class="demonstration">Groups</span>-->

                    <!--                        <el-select multiple v-model="valueOfGroups" placeholder="" class="widthall">-->
                    <!--                            <el-option-->
                    <!--                                    v-for="item in struct.optionsOfGroups"-->
                    <!--                                    :key="item.value"-->
                    <!--                                    :label="item.label"-->
                    <!--                                    :value="item.value">-->
                    <!--                            </el-option>-->
                    <!--                        </el-select>-->
                    <!--                    </el-form-item>-->
                </el-form>

                <el-divider></el-divider>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Close</el-button>
                    <el-button type="primary" @click="saveUserStatus">Save</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Setting/Member/Users/comp/UsersTable.vue')

    export default {
        name: "ProviderUsers",
        components: {
            Table,
        },
        created() {
            this.getListOfferActive()
        },
        data() {
            return {
                //表单验证规则
                editForm_Rules: {
                    status: [
                        // {required: true, message: 'radio to is required.', change: 'blur'},
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

                tabledata: [],

                //dialog
                dialogFormVisible: false,
                formEdituser: {},
                valueOfGroups: '',

                struct: {
                    optionsOfGroups: [
                        {
                            value: '1',
                            label: 'Business Owner Group'
                        },
                    ],
                }
            }
        },
        methods: {
            saveUserStatus() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) return;

                    if (this.formEdituser.tmpstatus != this.formEdituser.status) {
                        let tmp = {
                            buyersid: this.formEdituser.id,
                            sellerid: window.sessionStorage.getItem("userid"),
                            status: this.formEdituser.status
                        }

                        const {data: res} = await this.$http.post('setting/updatebuyerstatus', tmp)

                        if (res.meta.status != 200) {
                            return this.$message.error('Error.');
                        } else {
                            this.getListOfferActive()
                        }
                    }

                    this.dialogFormVisible = false
                })


                // console.log(this.formEdituser)
            },
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListOfferActive()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListOfferActive()
            },
            getRowhandleEdit(row) {
                row.status = row.tmpstatus
                this.formEdituser = row

                this.dialogFormVisible = true
            },
            async getListOfferActive() {
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.sellerid = window.sessionStorage.getItem("userid")
                this.pageInfo.searchinput = this.searchinput
                const {data: res} = await this.$http.post('setting/queryuserlist', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tabledata = []

                    if (res.selleruserlist) {
                        this.tabledata = res.selleruserlist
                        this.tabledata.forEach(function (item) {
                            item.tmpstatus = item.status
                        })
                    }

                    // console.log(this.sitedata)
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
    .leftof {
        margin-left: 5px;
    }

    .spanofitem {
        font-size: 12px;
    }

    /deep/ .el-dialog__body {
        padding-top: 0px;
    }

    .writemodeofitem {
        width: 100px;
        display: flex;
    }

    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 12px;
        /*margin-bottom: 5px;*/
    }

    /deep/ .widthall {
        width: 100%;
    }

    .buttSet {
        margin-bottom: 5px;
    }
</style>
