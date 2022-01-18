<template>
    <div>
        <div class="top">
            <div>
                <el-button @click="handlePackagingOpen(null,'add')">
                    <span class="spanofbutton">+</span>Packaging
                </el-button>
            </div>

            <div>
                <el-input
                        @input="querypackagesizetemplate"
                        clearable
                        v-model="searchinput" placeholder="Search"></el-input>
            </div>
        </div>

        <div class="tablebody">
            <Table
                    @funcCurrentChange="getDataCurrentChange"
                    @funcSizeChange="getDataSizeChange"
                    :pageInfo="pageInfo"
                    @funcdelete="handlePackagingDelete"
                    :tableData="tabledata"
                    @func="handlePackagingOpen"/>
        </div>

        <!--        Packaging-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Packaging"
                width="65%"
                :visible.sync="dialogFormVisible">
            <el-form
                    :rules="dialogForm_Rules"
                    ref="dialogFormRef"
                    :model="dialogForm">
                <el-form-item prop="name">
                    <el-input v-model="dialogForm.name"
                              placeholder="Name"
                              autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="length">
                    <el-input v-model="dialogForm.length"
                              placeholder="Length"
                              autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="width">
                    <el-input v-model="dialogForm.width"
                              placeholder="Width"
                              autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="height">
                    <el-input v-model="dialogForm.height"
                              placeholder="Height"
                              autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Close</el-button>
                <el-button type="primary" @click="savepackagetemplate">Submit</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Outbound/Label/Packaging/comp/ProviderPackagingTable.vue')

    export default {
        name: "ProviderPackaging",
        components: {
            Table
        },
        created() {
            this.querypackagesizetemplate()
        },
        data() {
            return {
                dialogForm_Rules: {
                    name: [
                        {required: true, message: 'The name is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    length: [
                        {required: true, message: 'The length is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    width: [
                        {required: true, message: 'The width is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    height: [
                        {required: true, message: 'The height is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],

                },

                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                searchinput: '',

                tabledata: [],

                dialogFormVisible: false,

                dialogForm: {
                    id: '',
                    name: '',
                    length: '',
                    width: '',
                    height: '',
                },

            }
        },
        methods: {
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.querypackagesizetemplate()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.querypackagesizetemplate()
            },
            async handlePackagingDelete(row) {
                let tmp = {
                    id: row.id
                }

                const {data: res} = await this.$http.post('outbound/label/deletepackagesizetemplate', tmp)

                if (res.meta.status == 303) {
                    return this.$message.error(res.meta.msg);
                } else if (res.meta.status == 200) {
                    this.querypackagesizetemplate()
                    this.$message({
                        type: 'success',
                        message: 'Ok!'
                    });
                }
            },
            async querypackagesizetemplate() {
                this.pageInfo.orgid = window.sessionStorage.getItem("userid")
                this.pageInfo.searchinput = this.searchinput

                this.tabledata = []

                const {data: res} = await this.$http.post('outbound/label/querypackagesizetemplate', this.pageInfo)

                if (res.meta.status == 303) {
                    return this.$message.error(res.meta.msg);
                } else if (res.meta.status == 200) {
                    this.tabledata = res.info.list

                    this.pageInfo.current = res.info.pageNum
                    this.pageInfo.pageSize = res.info.pageSize
                    this.pageInfo.total = res.info.total
                }
            },
            async savepackagetemplate() {
                this.$refs.dialogFormRef.validate(async valid => {
                    if (!valid) return;

                    this.dialogForm.orgid = window.sessionStorage.getItem("userid")

                    const {data: res} = await this.$http.post('outbound/label/addpackagesizetemplate', this.dialogForm)

                    this.dialogFormVisible = false

                    if (res.meta.status == 303) {
                        return this.$message.error(res.meta.msg);
                    } else if (res.meta.status == 200) {
                        this.querypackagesizetemplate()

                        return this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    }
                })
            },
            handlePackagingOpen(row, type) {
                if (type === 'add') {
                    this.dialogForm = {}
                    this.dialogFormVisible = true
                } else if (type === 'edit') {
                    this.dialogForm = row
                    this.dialogFormVisible = true
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .top {
        display: flex;
        justify-content: space-between;
    }

    .spanofbutton {
        font-size: 25px;
        margin-right: 5px;
    }

</style>