<template>
    <div>
        <div class="top">
            <div>
                <el-button @click="handlePackagingOpen(null,'add')">
                    <span class="spanofbutton">+</span>Packaging
                </el-button>
            </div>

            <div>
                <el-input v-model="searchinput" placeholder="Search"></el-input>
            </div>
        </div>

        <div class="tablebody">
            <Table :tableData="tabledata" @func="handlePackagingOpen"/>
        </div>

        <!--        Packaging-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Packaging"
                width="95%"
                :visible.sync="dialogFormVisible">
            <el-form :model="dialogForm">
                <el-card>
                    <el-row>
                        <el-col :span="4">
                            <span class="fontbolder">Template Info:</span>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <span class="fontsizesmailofspan">
                                Template name
                            </span>
                            <el-form-item>
                                <el-input v-model="dialogForm.name"
                                          placeholder="Template name"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <span class="fontsizesmailofspan">
                                Sender name
                            </span>
                            <el-form-item>
                                <el-input v-model="dialogForm.sendername"
                                          placeholder="Sender name"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <span class="fontsizesmailofspan">
                                Company name
                            </span>
                            <el-form-item>
                                <el-input v-model="dialogForm.companyname"
                                          placeholder="Company name"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <span class="fontsizesmailofspan">
                                SKU
                            </span>
                            <el-form-item>
                                <el-input v-model="dialogForm.sku"
                                          placeholder="SKU"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="4">
                            <span class="fontbolder">Label details:</span>
                        </el-col>
                        <el-col :span="4">

                        </el-col>
                        <el-col :span="4">

                        </el-col>
                        <el-col :span="4">

                        </el-col>
                        <el-col :span="4">

                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="4">
                            <span class="fontsizesmailofspan">
                                Shipping service
                            </span>
                            <el-form-item>
                                <el-select class="marginrightofAll" v-model="dialogForm.shippingservice"
                                           placeholder="Shipping service">
                                    <el-option
                                            v-for="item in formstruct.optionsOfshippingservice"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <span class="fontsizesmailofspan">
                                Weight(Click Lbs switch to Oz)
                            </span>
                            <el-form-item>
                                <el-input v-model="dialogForm.weight"
                                          placeholder="Weight"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <span class="fontsizesmailofspan">
                                Declared value
                            </span>
                            <el-form-item>
                                <el-input v-model="dialogForm.declaredvalue"
                                          style="width: 85%"
                                          placeholder="Declared value"
                                          autocomplete="off"></el-input>&nbsp;LBS
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="4">
                            <span class="fontsizesmailofspan">
                                Packaging
                            </span>
                            <el-form-item>
                                <el-select class="marginrightofAll" v-model="dialogForm.packaging"
                                           placeholder="Packaging">
                                    <el-option
                                            v-for="item in formstruct.optionsOfPackaging"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <span class="fontsizesmailofspan">
                                Signature service
                            </span>
                            <el-form-item>
                                <el-select class="marginrightofAll" v-model="dialogForm.signatureservice"
                                           placeholder="Signature service">
                                    <el-option
                                            v-for="item in formstruct.optionsOfsignatureservice"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <span class="fontsizesmailofspan">
                                Service type
                            </span>
                            <el-form-item>
                                <el-select class="marginrightofAll" v-model="dialogForm.servicetype"
                                           placeholder="Service type">
                                    <el-option
                                            v-for="item in formstruct.optionsOfservicetype"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="1">
                            <span class="fontsizesmailofspan">
                                Other Services
                            </span>
                            <el-form-item>
                                <el-select class="marginrightofAll"
                                           style="width: 100%"
                                           multiple
                                           v-model="dialogForm.otherservices"
                                           placeholder="Other Services">
                                    <el-option
                                            v-for="item in formstruct.optionsOfotherservices"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div>
                        <span class="fontsizesmailofspan">
                                Memo
                            </span>
                        <el-form-item>
                            <el-input v-model="dialogForm.memo"
                                      placeholder="Memo"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </div>

                    <div>
                        <el-form-item>
                            <el-select class="marginrightofAll"
                                       multiple
                                       v-model="dialogForm.instructiontemplate"
                                       placeholder="Instruction template">
                                <el-option
                                        v-for="item in formstruct.optionsOfinstructiontemplate"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div>
                        <el-input
                                type="textarea"
                                :rows="6"
                                placeholder="Instruction"
                                v-model="dialogForm.instruction">
                        </el-input>
                    </div>
                </el-card>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Close</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Outbound/Label/Template/comp/ProviderTemplateTable.vue')

    export default {
        name: "ProviderTemplate",
        components: {
            Table,
        },
        data() {
            return {
                formstruct: {
                    optionsOfshippingservice: [
                        {
                            value: '1',
                            label: 'FedEx ground/home'
                        },
                        {
                            value: '2',
                            label: 'FedEx express saver'
                        },
                        {
                            value: '3',
                            label: 'FedEx 2 day'
                        }
                    ],

                    optionsOfPackaging: [
                        {
                            value: '1',
                            label: 'Default(8"x8"x8")'
                        },
                        {
                            value: '2',
                            label: 'vite(20"x14"x4")'
                        },
                    ],

                    optionsOfsignatureservice: [
                        {
                            value: '1',
                            label: 'No signature'
                        },
                        {
                            value: '2',
                            label: 'Indirect'
                        },
                    ],

                    optionsOfservicetype: [
                        {
                            value: '1',
                            label: 'Normal'
                        },
                        {
                            value: '2',
                            label: 'Expedite'
                        },
                    ],

                    optionsOfotherservices: [
                        {
                            value: '1',
                            label: 'Label'
                        },
                        {
                            value: '2',
                            label: 'Photo'
                        },
                        {
                            value: '3',
                            label: 'SN'
                        },
                    ],

                    optionsOfinstructiontemplate: [],
                },
                searchinput: '',
                dialogFormVisible: false,

                dialogForm: {
                    name: '',
                    sendername: '',
                    companyname: '',
                    sku: '',
                    servicetype: '',
                    shippingservice: '',
                    otherservices: '',

                    weight: '',
                    packaging: '',
                    signatureservice: '',
                    memo: '',

                    declaredvalue: '',
                    instructiontemplate: '',
                    instruction: '',
                },

                tabledata: [
                    {
                        name: 'OMEN RTX 3080',
                        sendername: 'United Electronics Deals',
                        sku: 'BJ-KH2Q-H9B9',
                        details: 'Size(L/W/H): 20"/14"/4"\n' +
                            'Weight: 8lbs\n' +
                            'Signature: \n' +
                            'SIGNATURE_REQUIRED\n' +
                            'Memo: \n' +
                            '#{orderId}\n',
                        servicetype: 'UPS_GROUND - KSAGSP',
                        shippingservice: 'Normal',
                        otherservices: '',

                        weight: '8',
                        packaging: 'vite(20"x14"x4")',
                        signatureservice: 'Direct',
                        memo: 'Memo',

                        companyname: '',
                        declaredvalue: '',
                        instructiontemplate: '',
                        instruction: '',
                    },
                    {
                        name: 'OMEN RTX 3080',
                        sendername: 'United Electronics Deals',
                        sku: 'BJ-KH2Q-H9B9',
                        details: 'Size(L/W/H): 20"/14"/4"\n' +
                            'Weight: 8lbs\n' +
                            'Signature: \n' +
                            'SIGNATURE_REQUIRED\n' +
                            'Memo: \n' +
                            '#{orderId}\n',
                        servicetype: 'UPS_GROUND - KSAGSP',
                        shippingservice: 'Normal',
                        otherservices: '',

                        size: '',
                        weight: '8',
                        packaging: '',
                        signatureservice: 'Direct',
                        memo: 'Memo',

                        companyname: '',
                        declaredvalue: '',
                        instructiontemplate: '',
                        instruction: '',
                    },
                ],
            }
        },
        methods: {
            handlePackagingOpen(row, type) {
                if (type === 'add') {
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

    .fontbolder {
        font-weight: bolder;
    }

    .fontsizesmailofspan {
        font-size: 12px;
    }

</style>