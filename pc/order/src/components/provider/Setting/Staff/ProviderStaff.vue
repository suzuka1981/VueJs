<template>
    <div>
        <div class="toptitle">
            Staff
        </div>

        <div class="body">
            <el-card>
                <el-row>
                    <el-col :span="6">
                        <div class="divofsize">
                            Name
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="divofsize">
                            Email
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="divofsize">
                            Role
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="divofsize">
                            Action
                        </div>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-col :span="6">
                        <div class="divofsizesmall">
                            {{userData.name}}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="divofsizesmall">
                            {{userData.email}}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="divofsizesmall radiusofdiv">
                            {{userData.role}}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="divofsizesmall">
                            {{userData.action}}
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </div>

        <div class="raiusofall" @click="dialogFormVisible=true">
            <span class="sizeofbutton">+</span>
        </div>

        <!--    Add user    -->
        <div class="dialog">
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Add user" :visible.sync="dialogFormVisible" width="90%">
                <el-form :model="formAdduser">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item>
                                <el-input
                                        aria-placeholder="Email"
                                        placeholder="Email"
                                        v-model="formAdduser.email" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-card>
                        <div class="divofsize bottomto">
                            Roles
                        </div>

                        <el-row>
                            <el-col :span="11">
                                <el-checkbox v-model="formAdduser.checkedLogisticoperator">
                                    <div class="divofsize">
                                        Logistic operator
                                    </div>
                                    <div class="whitespaceofidv">
                                        Label, Label, Offer, Order, Outbound/Create, Outbound/Create,
                                        Outbound/Status, Package, Support, Task, Warehouse/Inventory,
                                        Warehouse/Transfer, Warehouse/Upload packages
                                    </div>
                                </el-checkbox>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-checkbox v-model="formAdduser.checkedLogisticadmin">
                                    <div class="divofsize">
                                        Logistic admin
                                    </div>
                                    <div class="whitespaceofidv">
                                        Label, Label, Offer, Order, Outbound/Create, Outbound/Create, Outbound/Status,
                                        Package, Setting/Member, Setting/Shipping, Setting/Site, Support, Task,
                                        Warehouse/Export, Warehouse/Inventory, Warehouse/Transfer
                                    </div>
                                </el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="11">
                                <el-checkbox v-model="formAdduser.checkedBilling">
                                    <div class="divofsize">
                                        Billing
                                    </div>
                                    <div>
                                        Billing
                                    </div>
                                </el-checkbox>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-checkbox v-model="formAdduser.checkedStaff">
                                    <div class="divofsize">
                                        Staff
                                    </div>
                                    <div>
                                        Setting/Staff
                                    </div>
                                </el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="11">
                                <el-checkbox v-model="formAdduser.checkedBilling">
                                    <div class="divofsize">
                                        Payment
                                    </div>
                                    <div>
                                        Payment
                                    </div>
                                </el-checkbox>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-checkbox v-model="formAdduser.checkedStaff">
                                    <div class="divofsize">
                                        General setting
                                    </div>
                                    <div>
                                        Setting/General
                                    </div>
                                </el-checkbox>
                            </el-col>
                        </el-row>
                    </el-card>

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
    export default {
        name: "ProviderStaff",
        data() {
            return {
                userData: {
                    name: 'unitedelectronicsdeals',
                    email: 'unitedelectronicsdeals@gmail.com',
                    role: 'Owner',
                    action: 'Owner',
                },

                //dialog
                dialogFormVisible: false,
                formAdduser: {
                    email: '',

                    checkedLogisticoperator: false,
                    checkedLogisticadmin: false,
                    checkedBilling: false,
                    checkedStaff: false,
                },
            }
        },
    }
</script>

<style scoped lang="less">
    .toptitle {
        font-size: 25px;
        margin-bottom: 15px;
    }

    /deep/ .divofsize {
        font-size: 15px;
    }

    /deep/ .divofsizesmall {
        font-size: 12px;
    }

    .radiusofdiv {
        width: 40px;
        height: 20px;
        background-color: #999999;
        border-radius: 10px;
        border: 1px solid white;
    }

    .sizeofbutton {
        font-size: 45px;

    }

    .raiusofall {
        background-color: #409EFF;
        color: white;
        width: 50px;
        height: 70px;
        border-radius: 50px;
        border: 1px solid white;
        padding-left: 20px;

        position: absolute;
        right: 0px;
        bottom: 0px;

        cursor: pointer;
    }

    .whitespaceofidv {
        width: 96%;
        white-space: pre-wrap;
    }

    /deep/ .el-checkbox__input {
        top: -30px;
    }

    /deep/ .el-checkbox__inner {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .bottomto {
        margin-bottom: 20px;
    }

    .el-row {
        margin-bottom: 5px;
    }
</style>