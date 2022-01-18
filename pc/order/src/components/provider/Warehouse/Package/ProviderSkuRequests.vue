<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="4">
                    <el-button
                            size="small"
                            @click="handleAddRequest">
                        <span class="sizeofadd">+</span>
                        <span class="martop">Request</span>
                    </el-button>
                </el-col>
                <el-col :span="4" :offset="16">
                    <el-input placeholder="Search"
                              suffix-icon="el-icon-search"
                              v-model="searchInput"></el-input>
                </el-col>
            </el-row>
        </div>

        <div class="tablebody">
            <!--            @func="getRowhandleSelectionChange"-->
            <!--            @funcEditnote="handleAddProduct"-->
            <!--            @funcDetail="handleDetail"-->
            <Table :tableData="tabledata"
            />
        </div>

        <div class="dialog">
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Add SKU request" :visible.sync="dialogFormVisible">
                <el-form :model="dialogForm">
                    <el-form-item>
                        <div class="spanofcenter">
                            Product
                        </div>
                        <el-select
                                @change="selectChangeOfProduct"
                                class="selectwidth"
                                v-model="dialogForm.product"
                                placeholder="-- All --">
                            <el-option
                                    v-for="item in formstruct.optionsOfProduct"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <div class="spanofcenter">
                            UPC
                        </div>
                        <el-input v-model="dialogForm.upc" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="spanofcenter">
                            SKU
                        </div>
                        <el-input v-model="dialogForm.SKU" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="spanofcenter">
                            Warehouse
                        </div>
                        <el-select
                                class="selectwidth"
                                v-model="dialogForm.warehouse"
                                placeholder="Warehouse">
                            <el-option
                                    v-for="item in formstruct.optionsOfWarehouse"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-input
                                class="noteoftop"
                                type="textarea"
                                :rows="5"
                                placeholder="Note"
                                v-model="dialogForm.note">
                        </el-input>

                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Close</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">Submit</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Warehouse/Package/PackageComp/SkuRequestsTable.vue')

    export default {
        name: "ProviderPackageBytracking",
        components: {
            Table,
        },
        data() {
            return {
                searchInput: '',

                tabledata: [{}],

                //dialog
                dialogForm: {},
                dialogFormVisible: false,

                formstruct: {
                    optionsOfProduct: [
                        {
                            value: '1',
                            label: '00100 - NEW - HP 15.6" Touchscreen Laptop - 11th Gen Intel Core i5-1135G7, 12GB, 512GB SSD'
                        }, {
                            value: '2',
                            label: '00099 - NEW - Wrong OMEN needs return'
                        },
                    ],

                    optionsOfWarehouse: [
                        {
                            value: '1',
                            label: 'Easygo warehouse'
                        },
                    ],
                },
            }
        },
        methods: {
            handleAddRequest() {
                this.dialogFormVisible = true
            },
            selectChangeOfProduct(val) {
                if(val === '1') {
                    this.dialogForm = {
                        upc:'195908335825',
                        note:'HP 15.6" Touchscreen Laptop - 11th Gen Intel Core i5-1135G7, 12GB, 512GB SSD',
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

    .sizeofadd {
        font-size: 25px;
        margin-right: 5px;
    }

    .martop {
        font-size: 20px;
    }

    .selectwidth {
        width: 100%;
    }

    .spanofcenter {
        font-size: 12px;
    }

    .el-form-item {
        margin-bottom: 5px;
    }

    .noteoftop{
        margin-top: 10px;
    }
</style>