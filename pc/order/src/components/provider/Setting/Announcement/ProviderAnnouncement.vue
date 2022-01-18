<template>
    <div>
        <div class="top">
            <el-button @click="dialogFormVisible=true">Add</el-button>
        </div>

        <div class="tablebody">
            <Table :tableData="tableData"/>
        </div>

        <div class="dialogbody">
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Add announcement" :visible.sync="dialogFormVisible" width="85%">
                <el-form :model="dialogFormData">
                    <el-row>
                        <el-col :span="4">
                            <el-date-picker
                                    class="widthAll"
                                    v-model="dialogFormData.enddate"
                                    type="date"
                                    placeholder="End date">
                            </el-date-picker>
                        </el-col>

                        <el-col :span="4" class="checkedto">
                            <el-form-item>
                                <el-checkbox v-model="dialogFormData.checkedSendEmail">Send email</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item>
                        <el-input
                                type="textarea"
                                :rows="7"
                                placeholder="Announcement"
                                v-model="dialogFormData.announCement">
                        </el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Close</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">Save</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Setting/Announcement/comp/AnnouncementTable.vue')

    export default {
        name: "ProviderAnnouncement",
        components: {
            Table,
        },
        data() {
            return {
                tableData: [],

                dialogFormVisible: false,
                dialogFormData: {
                    enddate: '',
                    checkedSendEmail: '',

                },
            }
        },
    }
</script>

<style scoped lang="less">
    .top {
        margin-top: 20px;
        margin-left: 20px;
    }

    .widthAll {
        width: 100%;
    }

    .checkedto {
        margin-top: 10px;
        margin-left: 10px;
    }
</style>