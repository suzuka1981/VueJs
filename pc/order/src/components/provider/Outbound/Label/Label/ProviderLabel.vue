<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="3">
                    <el-button @click="domesticlabelopen">
                        <span style="font-size: 20px;">+</span>
                        Domestic Label
                    </el-button>
                </el-col>
                <!--                <el-col :span="3">-->
                <!--                    <el-button @click="internationalDialog.dialogcreateinternationalFormVisible=true">-->
                <!--                        <span style="font-size: 20px;">+</span>-->
                <!--                        International label-->
                <!--                    </el-button>-->
                <!--                </el-col>-->
            </el-row>

            <el-row>
                <el-col :span="10" class="topofcol">
                    <div>
                        <div style="width:250px;">
                            <span class="demonstration">Label status</span>

                            <el-select v-model="form.valueOfLabelStatus" placeholder="-- Filter --">
                                <el-option
                                        v-for="item in form.formstruct.optionsOfLabelStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>

                    <div style="width: 250px;margin-right: 25px;margin-top: 20px">
                        <el-input
                                placeholder="Search"
                                suffix-icon="el-icon-search"
                                v-model="form.inputSearch"
                                clearable
                                @input="getListOutboundLabelList"
                        >
                        </el-input>
                    </div>
                </el-col>

                <el-col :span="9" class="topofcolbetween" :offset="3">
                    <div>
                        <span class="demonstration">Start date</span>
                        <el-date-picker
                                v-model="form.startDate"
                                type="date"
                                placeholder="Select date"
                                :picker-options="form.pickerOptions"
                        >
                        </el-date-picker>
                    </div>

                    <div>
                        <span class="demonstration">end date</span>
                        <el-date-picker
                                v-model="form.endDate"
                                type="date"
                                placeholder="Select date"
                        >
                        </el-date-picker>
                    </div>

                    <div>
                        <el-button @click="getListOutboundLabelList" style="margin-top: 20px">Search</el-button>
                    </div>

                    <!--                    <div class="switchofdiv">-->
                    <!--                        <el-switch-->
                    <!--                                v-model="form.switchValue"-->
                    <!--                                active-text="zip"-->
                    <!--                                inactive-text="pdf">-->
                    <!--                        </el-switch>-->
                    <!--                    </div>-->

                    <!--                    <div>-->
                    <!--                        <el-button disabled @click="" style="margin-top: 20px">-->
                    <!--                            Download labels(0)-->
                    <!--                        </el-button>-->
                    <!--                    </div>-->
                </el-col>
            </el-row>
        </div>

        <div class="tableofchild">
            <ProviderLabel
                    :pageInfo="pageLabelInfo"
                    @funcCancelSuccess="getListOutboundLabelList"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    @funcEditnote="getRowEditnote" :tableData="form.tableData"/>
        </div>

        <div class="dialogofdiv">
            <!--        Domestic Label    Create label -->
            <div v-if="dialog.dialogDomesticCreateFormVisible">
                <el-dialog
                        :close-on-press-escape="false"
                        :close-on-click-modal="false"
                        title="Create label"
                        width="90%"
                        :visible.sync="dialog.dialogDomesticCreateFormVisible">
                    <el-form :model="dialog">
                        <el-row class="dialogofrowbetween">
                            <el-col :span="12">
                                <el-card>
                                    <el-row class="dialogofrowbetween">
                                        <el-col :span="16" class="dialogofrowbetween">
                                        <span class="marginrightofAll"
                                              style="width:150px;margin-top: 10px">Sender:</span>
                                            <el-form-item style="width:400px;">
                                                <el-select class="marginrightofAll"
                                                           v-model="dialog.senderForm.valueOfAddressName"
                                                           @change="changeOfSenderAddressName"
                                                           placeholder="Address name">
                                                    <el-option
                                                            v-for="item in dialog.dialogformstruct.optionsOfAddressName"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item style="width:150px;">
                                                <el-checkbox v-model="dialog.senderForm.saveOfchecked">Save
                                                </el-checkbox>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item v-show="dialog.senderForm.saveOfchecked">
                                                <el-input
                                                        placeholder="Address name"
                                                        v-model="dialog.senderForm.addressname"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-row class="dialogofrowbetween">
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Full name"
                                                        v-model="dialog.senderForm.fullname"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Phone"
                                                        v-model="dialog.senderForm.phone"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Company name"
                                                        v-model="dialog.senderForm.companyname"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-row class="dialogofrowbetween">
                                        <el-col :span="15">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Address 1"
                                                        v-model="dialog.senderForm.address1"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Address 2"
                                                        v-model="dialog.senderForm.address2"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-row class="dialogofrowbetween">
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="City"
                                                        v-model="dialog.senderForm.city"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7">
                                            <el-form-item>
                                                <!--                                                <el-input-->
                                                <!--                                                        placeholder="State"-->
                                                <!--                                                        v-model="dialog.senderForm.valueOfState"-->
                                                <!--                                                >-->
                                                <!--                                                </el-input>-->
                                                <el-select class="marginrightofAll"
                                                           v-model="dialog.senderForm.valueOfState"
                                                           placeholder="State">
                                                    <el-option
                                                            v-for="item in dialog.dialogformstruct.optionsOfState"
                                                            :key="item.value"
                                                            :label="item.value"
                                                            :value="item.value">
                                                        <span>{{item.label}}</span>
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Zip code"
                                                        v-model="dialog.senderForm.zipcode"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card>
                                    <el-row class="dialogofrowbetween">
                                        <el-col :span="16" class="dialogofrowbetween">
                                        <span class="marginrightofAll"
                                              style="width:150px;margin-top: 10px">Recipient:</span>
                                            <el-form-item style="width:400px;">
                                                <el-select class="marginrightofAll"
                                                           @change="changeOfRecipientAddressName"
                                                           v-model="dialog.recipientForm.valueOfAddressName"
                                                           placeholder="Address name">
                                                    <el-option
                                                            v-for="item in dialog.dialogformstruct.optionsOfAddressName"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item style="width:150px;">
                                                <el-checkbox v-model="dialog.recipientForm.saveOfchecked">Save
                                                </el-checkbox>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item v-show="dialog.recipientForm.saveOfchecked">
                                                <el-input
                                                        placeholder="Address name"
                                                        v-model="dialog.recipientForm.addressname"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-row class="dialogofrowbetween">
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Full name"
                                                        v-model="dialog.recipientForm.fullname"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Phone"
                                                        v-model="dialog.recipientForm.phone"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Company name"
                                                        v-model="dialog.recipientForm.companyname"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-row class="dialogofrowbetween">
                                        <el-col :span="15">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Address 1"
                                                        v-model="dialog.recipientForm.address1"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Address 2"
                                                        v-model="dialog.recipientForm.address2"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-row class="dialogofrowbetween">
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="City"
                                                        v-model="dialog.recipientForm.city"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7">
                                            <el-form-item>
                                                <!--                                                <el-input-->
                                                <!--                                                        placeholder="State"-->
                                                <!--                                                        v-model="dialog.recipientForm.valueOfState"-->
                                                <!--                                                >-->
                                                <!--                                                </el-input>-->
                                                <el-select class="marginrightofAll"
                                                           v-model="dialog.recipientForm.valueOfState"
                                                           placeholder="State">
                                                    <el-option
                                                            v-for="item in dialog.dialogformstruct.optionsOfState"
                                                            :key="item.value"
                                                            :label="item.value"
                                                            :value="item.value">
                                                        <span>{{item.label}}</span>
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7">
                                            <el-form-item>
                                                <el-input
                                                        placeholder="Zip code"
                                                        v-model="dialog.recipientForm.zipcode"
                                                >
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-col>
                        </el-row>

                        <el-card>
                            <el-row class="switchofdiv">
                                <el-col :span="6">
                                <span class="fontsettoall">
                                    Label details:
                                </span>
                                </el-col>
                                <el-col :span="4">
                                    <span class="demonstration">Template</span>
                                    <el-form-item>
                                        <el-input
                                                style="width: 95%;"
                                                placeholder="Template"
                                                v-model="dialog.labelDetailsForm.valueOfTemplate"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <!--                                <el-form-item class="switchofdiv">-->
                                    <!--                                    <el-select class="marginrightofAll"-->
                                    <!--                                               v-model="dialog.labelDetailsForm.valueOfTemplate"-->
                                    <!--                                               placeholder="Template">-->
                                    <!--                                        <el-option-->
                                    <!--                                                v-for="item in dialog.dialogformstruct.optionsOfTemplate"-->
                                    <!--                                                :key="item.value"-->
                                    <!--                                                :label="item.label"-->
                                    <!--                                                :value="item.value">-->
                                    <!--                                        </el-option>-->
                                    <!--                                    </el-select>-->
                                    <!--                                </el-form-item>-->
                                </el-col>
                                <el-col :span="4">
                                    <span class="demonstration">Ship date</span>
                                    <el-form-item>
                                        <el-date-picker
                                                style="width: 95%;"
                                                v-model="dialog.labelDetailsForm.shipdate"
                                                type="date"
                                                placeholder="Ship date">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <span class="demonstration">Ship service</span>
                                    <el-form-item>
                                        <el-select
                                                v-model="dialog.labelDetailsForm.valueOfShipService"
                                                placeholder="Ship service">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsOfShipService"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <span class="demonstration">Signature</span>
                                    <el-form-item>
                                        <el-select
                                                v-model="dialog.labelDetailsForm.valueOfSignature"
                                                placeholder="Ship service">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsOfSignature"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row class="topofcolbetween">
                                <el-col :span="15">
                                    <el-form-item>
                                        <el-input
                                                placeholder="Note"
                                                v-model="dialog.inputNote"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item>
                                        <el-input
                                                placeholder="Memo"
                                                v-model="dialog.inputMemo"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <ProviderCreateInputTable
                                    :dropdata="optionsOfdropdown"
                                    @func="getRowFormSonAndhandleTitleAdd"
                                    @funcRemove="getRowFormSonAndhandleRemove"
                                    :tableData="dialog.providerCreateInputTableData"/>
                        </el-card>
                    </el-form>

                    <div class="getrate">
                        <el-button type="primary" @click="getRate">Get rate</el-button>
                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialog.dialogDomesticCreateFormVisible = false">Close</el-button>
                        <el-button :disabled="createLabelSaveDisabled" type="primary" @click="createLabelSave">Submit
                        </el-button>
                    </div>
                </el-dialog>
            </div>

            <!--            Create international label-->
            <div v-if="internationalDialog.dialogcreateinternationalFormVisible">
                <el-dialog
                        :close-on-press-escape="false"
                        :close-on-click-modal="false"
                        title="Create international label"
                        width="90%"
                        :visible.sync="internationalDialog.dialogcreateinternationalFormVisible">
                    <el-form :model="internationalDialog">
                        <!--         Electronic Export Information:           -->
                        <el-card>
                            <el-col :span="8" class="fontsettoall">
                                <span>Electronic Export Information:</span>
                            </el-col>
                            <el-col :span="8">
                                <div style="width: 70%" class="divofflex">
                                    <el-form-item class="elformitemlineheight">
                                        <el-input
                                                placeholder="Import info"
                                                v-model="internationalDialog.itn"></el-input>
                                        <span class="fontsetsmalltoall" style="line-height: 0px;">
                                        ITN is required when shipment customs value is over $2500.
                                    </span>
                                    </el-form-item>
                                    <el-tooltip class="item" effect="dark" content="Get selected ITN" placement="top"
                                                style="margin-right: 10px">
                                        <i class="fontsetbigtoall el-icon-refresh-left"></i>
                                    </el-tooltip>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-checkbox v-model="internationalDialog.checkedOfCommercialInvoice">Commercial
                                        invoice
                                    </el-checkbox>
                                </el-form-item>
                            </el-col>
                        </el-card>

                        <!--                    Sender && Recipient-->
                        <el-card>
                            <el-row class="dialogofrowbetween">
                                <el-col :span="12">
                                    <el-card>
                                        <el-row class="dialogofrowbetween">
                                            <el-col :span="16" class="dialogofrowbetween">
                                        <span class="marginrightofAll"
                                              style="width:150px;margin-top: 10px">Sender:</span>
                                                <el-form-item style="width:400px;">
                                                    <el-select class="marginrightofAll"
                                                               v-model="dialog.senderForm.valueOfAddressName"
                                                               @change="changeOfSenderAddressName"
                                                               placeholder="Address name">
                                                        <el-option
                                                                v-for="item in dialog.dialogformstruct.optionsOfAddressName"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item style="width:150px;">
                                                    <el-checkbox v-model="dialog.senderForm.saveOfchecked">Save
                                                    </el-checkbox>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item v-show="dialog.senderForm.saveOfchecked">
                                                    <el-input
                                                            placeholder="Address name"
                                                            v-model="dialog.senderForm.addressname"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row class="dialogofrowbetween">
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Full name"
                                                            v-model="dialog.senderForm.fullname"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Phone"
                                                            v-model="dialog.senderForm.phone"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Company name"
                                                            v-model="dialog.senderForm.companyname"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row class="dialogofrowbetween">
                                            <el-col :span="15">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Address 1"
                                                            v-model="dialog.senderForm.address1"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Address 2"
                                                            v-model="dialog.senderForm.address2"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row class="dialogofrowbetween">
                                            <!--                                            <el-col :span="7">-->
                                            <!--                                                <el-form-item>-->
                                            <!--                                                    <el-input-->
                                            <!--                                                            placeholder="City"-->
                                            <!--                                                            v-model="dialog.senderForm.city"-->
                                            <!--                                                    >-->
                                            <!--                                                    </el-input>-->
                                            <!--                                                </el-form-item>-->
                                            <!--                                            </el-col>-->
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-select class="marginrightofAll"
                                                               v-model="dialog.senderForm.valueOfState"
                                                               placeholder="State">
                                                        <el-option
                                                                v-for="item in dialog.dialogformstruct.optionsOfState"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Zip code"
                                                            v-model="dialog.senderForm.zipcode"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                </el-col>
                                <el-col :span="12">
                                    <el-card>
                                        <el-row class="dialogofrowbetween">
                                            <el-col :span="16" class="dialogofrowbetween">
                                        <span class="marginrightofAll"
                                              style="width:150px;margin-top: 10px">Recipient:</span>
                                                <el-form-item style="width:400px;">
                                                    <el-select class="marginrightofAll"
                                                               @change="changeOfRecipientAddressName"
                                                               v-model="dialog.recipientForm.valueOfAddressName"
                                                               placeholder="Address name">
                                                        <el-option
                                                                v-for="item in dialog.dialogformstruct.optionsOfAddressName"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item style="width:150px;">
                                                    <el-checkbox v-model="dialog.recipientForm.saveOfchecked">Save
                                                    </el-checkbox>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item v-show="dialog.recipientForm.saveOfchecked">
                                                    <el-input
                                                            placeholder="Address name"
                                                            v-model="dialog.recipientForm.addressname"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row class="dialogofrowbetween">
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Full name"
                                                            v-model="dialog.recipientForm.fullname"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Phone"
                                                            v-model="dialog.recipientForm.phone"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Company name"
                                                            v-model="dialog.recipientForm.companyname"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row class="dialogofrowbetween">
                                            <el-col :span="15">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Address 1"
                                                            v-model="dialog.recipientForm.address1"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Address 2"
                                                            v-model="dialog.recipientForm.address2"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row class="dialogofrowbetween">
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="City"
                                                            v-model="dialog.recipientForm.city"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-select class="marginrightofAll"
                                                               v-model="dialog.recipientForm.valueOfState"
                                                               placeholder="State">
                                                        <el-option
                                                                v-for="item in dialog.dialogformstruct.optionsOfState"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="7">
                                                <el-form-item>
                                                    <el-input
                                                            placeholder="Zip code"
                                                            v-model="dialog.recipientForm.zipcode"
                                                    >
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-card>

                        <!--                    Package & Shipment details:-->
                        <el-card>
                            <el-row class="switchofdiv">
                                <el-col :span="6">
                                <span class="fontsettoall">
                                    Package & Shipment details:
                                </span>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item class="switchofdiv">
                                        <el-select class="marginrightofAll"
                                                   v-model="dialog.labelDetailsForm.valueOfTemplate"
                                                   placeholder="Template">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsOfTemplate"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7">
                                    <span class="demonstration">Ship date</span>
                                    <el-form-item>
                                        <el-date-picker
                                                style="width: 95%;"
                                                v-model="dialog.labelDetailsForm.shipdate"
                                                type="date"
                                                placeholder="Ship date">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7">
                                    <span class="demonstration">Ship service</span>
                                    <el-form-item>
                                        <el-select
                                                v-model="dialog.labelDetailsForm.valueOfShipService"
                                                placeholder="Ship service">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsOfShipService"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <span class="demonstration">Products/Commodities</span>
                                    <el-form-item>
                                        <el-select
                                                v-model="internationalDialog.valueOfproductscommodities"
                                                placeholder="Products/Commodities">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsproductscommodities"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="4">
                                    <span class="demonstration">Shipment purpose</span>
                                    <el-form-item style="width: 95%">
                                        <el-select
                                                v-model="internationalDialog.valueOfshipmentpurpose"
                                                placeholder="Shipment purpose">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsshipmentpurpose"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="7">
                                    <span class="demonstration">Signature</span>
                                    <el-form-item>
                                        <el-select
                                                v-model="dialog.labelDetailsForm.valueOfSignature"
                                                placeholder="Ship service">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsOfSignature"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <span class="demonstration">
                                    Signature is required for FedEx international shipment
                                </span>
                                </el-col>
                            </el-row>

                            <ProviderCreateInputTable
                                    @func="getRowFormSonAndhandleTitleAdd"
                                    @funcRemove="getRowFormSonAndhandleRemove"
                                    :tableData="dialog.providerCreateInputTableData"
                                    :dropdata="optionsOfdropdown"
                            />
                        </el-card>

                        <!--                    Billing details:-->
                        <el-card>
                            <el-row>
                                <el-col :span="6">
                                <span class="fontsettoall">
                                    Billing details:
                                </span>
                                </el-col>

                                <el-col :span="4" class="marginrightofAll">
                                    <span class="demonstration">Billing transportation to</span>
                                    <el-form-item>
                                        <el-select
                                                v-model="internationalDialog.valueOfBillingtransportationto"
                                                placeholder="Ship service">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsOfBillingtransportationto"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="4">
                                    <span class="demonstration">Bill duties/taxes/fees to</span>
                                    <el-form-item>
                                        <el-select
                                                v-model="internationalDialog.valueOfBilldutiestaxesfeesto"
                                                placeholder="Ship service">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsOfBilldutiestaxesfeesto"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>

                        <el-card>
                            <el-row>
                                <el-col :span="6">
                                <span class="fontsettoall">
                                    Commodity info:
                                </span>
                                </el-col>
                                <el-col :span="6" class="divofflex">
                                    <el-input
                                            placeholder="Profile"
                                            suffix-icon="el-icon-search"
                                            v-model="form.inputSearch"
                                            clearable
                                            class="marginrightofAll"
                                    >
                                    </el-input>
                                    <el-button @click=""
                                               type="text"
                                    >Search
                                    </el-button>
                                </el-col>
                            </el-row>

                            <ProviderCommodityInfoTable
                                    :tableData="internationalDialog.ProviderCommodityInfoTableTableData"/>

                            <el-row class="switchofdiv">
                                <el-col :span="6">
                                    <span class="demonstration">Schedule B description</span>
                                    <el-form-item class="widthpasenntoset">
                                        <el-input
                                                placeholder=""
                                                v-model="internationalDialog.schedulebdescription"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <span class="demonstration">Schedule B code</span>
                                    <el-form-item class="widthpasenntoset">
                                        <el-input
                                                placeholder=""
                                                v-model="internationalDialog.schedulebcode"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <span class="demonstration">Export information code</span>
                                    <el-form-item>
                                        <el-select
                                                class="widthpasenntoset"
                                                v-model="internationalDialog.valueOfExportinformationcode"
                                                placeholder="">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsOfExportinformationcode"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <span class="demonstration">License exception symbol</span>
                                    <el-form-item>
                                        <el-select
                                                class="widthpasenntoset"
                                                v-model="internationalDialog.valueOfLicenseexceptionsymbol"
                                                placeholder="">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsOfLicenseexceptionsymbol"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row class="elrowofbottom">
                                <el-col :span="6">
                                    <span class="demonstration">Country of origin</span>
                                    <el-form-item>
                                        <el-select
                                                class="widthpasenntoset"
                                                v-model="internationalDialog.valueOfCountryoforigin"
                                                placeholder="United States">
                                            <el-option
                                                    v-for="item in dialog.dialogformstruct.optionsOfCountryoforigin"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <span class="demonstration">ECCN</span>
                                    <el-form-item class="widthpasenntoset">
                                        <el-input
                                                placeholder="ECCN"
                                                v-model="internationalDialog.eccn"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <span class="demonstration">Total commodity weight</span>
                                    <div class="divofflex">
                                        <el-form-item class="widthpasenntosetsmall">
                                            <el-input
                                                    placeholder="Total commodity weight"
                                                    v-model="internationalDialog.totalcommodityweight"
                                            >
                                            </el-input>
                                        </el-form-item>
                                        <span class="demonstration topofcol">LBS</span>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <span class="demonstration">Total commodity weight</span>
                                    <el-form-item class="widthpasenntoset">
                                        <el-input
                                                placeholder="Total customs value($)"
                                                v-model="internationalDialog.totalcustomsvalue"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <span class="demonstration">Quantity</span>
                                    <el-form-item class="widthpasenntoset">
                                        <el-input
                                                placeholder="Total customs value($)"
                                                v-model="internationalDialog.quantity"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row class="rowofright">
                                <el-col :span="8">
                                    <el-checkbox
                                            class="marginrightofAll"
                                            v-model="internationalDialog.checkedsavecommodityprofile">Save commodity
                                        profile
                                    </el-checkbox>
                                    <el-button @click="">Add commodity</el-button>
                                </el-col>
                            </el-row>
                        </el-card>

                        <el-row class="rowofcenter">
                            <el-col :span="10">
                                <el-button @click="" class="marginrightofAll">Get rate</el-button>
                                Discount charge: $ ---- Surcharge: $ Total: $ ----
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-divider></el-divider>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialog.dialogDomesticCreateFormVisible = false">Close</el-button>
                        <el-button type="primary" @click="dialog.dialogDomesticCreateFormVisible = false">Submit
                        </el-button>
                    </div>
                </el-dialog>
            </div>

            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Edit note" :visible.sync="editNoteDialog.dialogeditNoteVisible">
                <el-form :model="editNoteDialog.formData">
                    <span class="demonstration">
                        Note
                    </span>
                    <el-form-item>
                        <el-input v-model="editNoteDialog.formData.note" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editNoteDialog.dialogeditNoteVisible = false">Close</el-button>
                    <el-button type="primary" @click="editnoteupdate">Submit</el-button>
                </div>
            </el-dialog>

            <!--    warehouse 点击    -->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Get rate" :visible.sync="dialogGetRateTableVisible" width="70%">
                <el-card>
                    <el-table :data="getRateData">
                        <el-table-column property="amount" label="amount" width="100"></el-table-column>
                        <el-table-column property="bussiness_days" label="bussiness_days" width="230"></el-table-column>
                        <el-table-column property="carrier" label="carrier" width="90"></el-table-column>
                        <el-table-column property="currency" label="currency" width="90"></el-table-column>
                        <el-table-column property="retail_amount" label="retail_amount"></el-table-column>
                        <el-table-column property="servicelevel_name" label="servicelevel_name"></el-table-column>
                        <el-table-column property="servicelevel_token" label="servicelevel_token"></el-table-column>
                    </el-table>
                </el-card>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    const ProviderLabel = () => import('@/components/provider/Outbound/Label/Label/comp/ProviderLabelTable.vue')
    const ProviderCreateInputTable = () => import('@/components/provider/Outbound/Label/Label/comp/ProviderCreateInputTable.vue')
    const ProviderCommodityInfoTable = () => import('@/components/provider/Outbound/Label/Label/comp/ProviderCommodityInfoTable.vue')

    export default {
        name: "Label",
        components: {
            ProviderLabel,
            ProviderCreateInputTable,
            ProviderCommodityInfoTable,
        },
        created() {
            this.getListOutboundLabelList()
        },
        methods: {
            async editnoteupdate() {
                let subTmp = {
                    labelid: this.editrowid,
                    inputNote: this.editNoteDialog.formData.note,
                }

                const {data: res} = await this.$http.post('outbound/label/labelnoteupdate', subTmp)

                if (res.meta.status != 200) {
                    return this.$message.error('Update Error.');
                } else {
                    this.editNoteDialog.dialogeditNoteVisible = false
                    this.getListOutboundLabelList()
                }
            },
            domesticlabelopen() {
                this.dialog.dialogDomesticCreateFormVisible = true
                this.dialog.senderForm = {}
                this.dialog.recipientForm = {}
                this.dialog.labelDetailsForm = {}
                this.dialog.inputNote = ""
                this.dialog.inputMemo = ""

                this.dialog.providerCreateInputTableData = []
                let tmp = {
                    //one table
                    identicalpackageqty: '1',
                    weight: '0',
                    length: '0',
                    width: '0',
                    height: '0',
                    declaredvalue: '0',
                    memo: '',
                    weightcontent: 'Click here switch to Oz',
                    weighttype: 'LBS',
                }

                this.dialog.providerCreateInputTableData.push(tmp)
            },
            async getListOutboundLabelList() {
                this.pageLabelInfo.username = window.sessionStorage.getItem("username")
                this.pageLabelInfo.userid = window.sessionStorage.getItem("userid")
                this.pageLabelInfo.labelstatus = this.form.valueOfLabelStatus
                this.pageLabelInfo.searchinput = this.form.inputSearch
                this.pageLabelInfo.startDate = this.form.startDate
                this.pageLabelInfo.endDate = this.form.endDate

                // this.pageInfo.startDate = this.startDate
                // this.pageInfo.endDate = this.endDate

                const {data: res} = await this.$http.post('outbound/label/queryoutboundlabellist', this.pageLabelInfo)

                this.form.tableData = []
                this.dialog.dialogformstruct.optionsOfAddressName = []
                this.optionsOfdropdown = []

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    // console.log(res.pageInfolabelList.list)
                    this.form.tableData = res.pageInfolabelList.list

                    res.addresstmplatelist.forEach(function (item) {
                        item.value = item.id
                        item.label = item.addressname
                    })

                    this.dialog.dialogformstruct.optionsOfAddressName = res.addresstmplatelist

                    this.optionsOfdropdown = res.packagesizetemplatelist

                    if (this.pageLabelInfo) {
                        this.pageLabelInfo.current = res.pageInfolabelList.pageNum
                        this.pageLabelInfo.pageSize = res.pageInfolabelList.pageSize
                        this.pageLabelInfo.total = res.pageInfolabelList.total

                    }
                }
            },
            getDataSizeChange(val) {
                this.pageLabelInfo.pageSize = val
                this.getListOutboundLabelList()
            },
            getDataCurrentChange(val) {
                this.pageLabelInfo.current = val
                this.getListOutboundLabelList()
            },
            async createLabelSave() {
                let tmpSub = {}
                tmpSub.labelDetailsForm = this.dialog.labelDetailsForm
                tmpSub.labelDetailsForm.inputMemo = this.dialog.inputMemo
                tmpSub.labelDetailsForm.inputNote = this.dialog.inputNote
                tmpSub.providerCreateInputTableData = this.dialog.providerCreateInputTableData
                tmpSub.recipientForm = this.dialog.recipientForm
                tmpSub.senderForm = this.dialog.senderForm
                tmpSub.orgid = window.sessionStorage.getItem("userid")


                this.rateList.forEach((item, index, array) => {
                    if (item.servicelevel_token == this.dialog.labelDetailsForm.valueOfShipService) {
                        this.rateSub = item
                    }
                })

                tmpSub.rateSub = this.rateSub

                const {data: res} = await this.$http.post('outbound/label/createlabelsave', tmpSub)

                if (res.meta.status != 200) {
                    return this.$message.error(res.meta.msg);
                } else {
                    this.dialog.dialogDomesticCreateFormVisible = false
                    this.createLabelSaveDisabled = true
                    this.getListOutboundLabelList()
                }
            },
            async getRate() {
                let tmpSub = {}
                tmpSub.inputMemo = this.dialog.inputMemo
                tmpSub.inputNote = this.dialog.inputNote
                tmpSub.labelDetailsForm = this.dialog.labelDetailsForm
                tmpSub.providerCreateInputTableData = this.dialog.providerCreateInputTableData
                tmpSub.recipientForm = this.dialog.recipientForm
                tmpSub.senderForm = this.dialog.senderForm

                const {data: res} = await this.$http.post('outbound/label/getRate', tmpSub)

                if (res.meta.status != 200) {
                    return this.$message.error('Select error.');
                } else {
                    if (res.data) {
                        // console.log(res.data)
                        // for (let item in res.data) {
                        //     console.log(item + '---' + res.data.get(item))
                        // }
                        this.dialog.dialogformstruct.optionsOfShipService = []
                        // console.log(res.data)
                        res.data.forEach((item, index, array) => {
                            let tmp = {
                                value: item.servicelevel_token,
                                label: item.servicelevel_name
                            }

                            this.dialog.dialogformstruct.optionsOfShipService.push(tmp)
                            // console.log(item.servicelevel_token)
                        })

                        this.rateList = res.data
                        this.dialogGetRateTableVisible = true
                        this.getRateData = res.data
                        this.createLabelSaveDisabled = false
                    }
                }
            },
            changeOfSenderAddressName(val) {
                this.dialog.senderForm = []
                let tmp = []
                this.dialog.dialogformstruct.optionsOfAddressName.forEach(function (item) {
                    if (item.id == val) {
                        tmp.push(JSON.parse(JSON.stringify(item)))
                        return
                    }
                })

                if (tmp.length > 0) {
                    this.dialog.senderForm = tmp[0]
                    this.dialog.senderForm.valueOfAddressName = this.dialog.senderForm.id
                }
            },
            changeOfRecipientAddressName(val) {
                this.dialog.recipientForm = []

                let tmp2 = []
                this.dialog.dialogformstruct.optionsOfAddressName.forEach(function (item) {
                    if (item.id == val) {
                        tmp2.push(JSON.parse(JSON.stringify(item)))
                        return
                    }
                })

                if (tmp2.length > 0) {
                    this.dialog.recipientForm = tmp2[0]
                    this.dialog.recipientForm.valueOfAddressName = this.dialog.recipientForm.id
                }
            },
            getRowFormSonAndhandleTitleAdd(column) {
                let tmp = {
                    //one table
                    identicalpackageqty: '1',
                    weight: '0',
                    length: '0',
                    width: '0',
                    height: '0',
                    declaredvalue: '0',
                    memo: '',
                    weightcontent: 'Click here switch to Oz',
                    weighttype: 'LBS',
                }

                this.dialog.providerCreateInputTableData.push(tmp)
            },
            getRowFormSonAndhandleRemove(row) {
                this.dialog.providerCreateInputTableData.splice(row.index, 1)
            },

            getRowEditnote(row) {
                this.editNoteDialog.dialogeditNoteVisible = true
                // this.editNoteDialog.formData = row
                this.editNoteDialog.formData = {}

                this.editrowid = row.id
                // console.log(row)
            }
        },
        data() {
            return {
                optionsOfdropdown: [],

                editrowid: '',

                //表单分页
                pageLabelInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                createLabelSaveDisabled: true,
                rateList: [],
                rateSub: {},
                dialogGetRateTableVisible: false,
                getRateData: [],

                form: {
                    formstruct: {
                        optionsOfLabelStatus: [
                            {
                                value: 'all',
                                label: '-- All --'
                            },
                            {
                                value: 'newcomments',
                                label: 'New Comments'
                            },
                            {
                                value: 'starred',
                                label: 'Starred'
                            }
                        ],
                    },
                    valueOfLabelStatus: '',
                    inputSearch: '',

                    startDate: '',
                    endDate: '',

                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        },
                    },

                    switchValue: true,

                    tableData: [],
                },
                dialog: {
                    // Domestic Label    Create label
                    // formDomesticCreate: {},
                    dialogDomesticCreateFormVisible: false,

                    dialogformstruct: {
                        optionsOfAddressName: [
                            {
                                value: '1',
                                label: 'United Electronics Deals_Ballwin'
                            },
                            {
                                value: '2',
                                label: 'United Electronics Deals_CA'
                            },
                            {
                                value: '3',
                                label: '55 Harvey RD'
                            }
                        ],

                        optionsOfState: [
                            {value: 'AL', label: 'AL - Alabama'},
                            {value: 'AK', label: 'AK - Alaska'},
                            {value: 'AZ', label: 'AZ - Arizona'},
                            {value: 'AR', label: 'AR - Arkansas'},
                            {value: 'CA', label: 'CA - California'},
                            {value: 'CO', label: 'CO - Colorado'},
                            {value: 'CT', label: 'CT - Connecticut'},
                            {value: 'DE', label: 'DE - Delaware'},
                            {value: 'FL', label: 'FL - Florida'},
                            {value: 'GA', label: 'GA - Georgia'},
                            {value: 'HI', label: 'HI - Hawaii'},
                            {value: 'ID', label: 'ID - Idaho'},
                            {value: 'IL', label: 'IL - Illinois'},
                            {value: 'IN', label: 'IN - Indiana'},
                            {value: 'IA', label: 'IA - Iowa'},
                            {value: 'KS', label: 'KS - Kansas'},
                            {value: 'KY', label: 'KY - Kentucky'},
                            {value: 'LA', label: 'LA - Louisiana'},
                            {value: 'ME', label: 'ME - Maine'},
                            {value: 'MD', label: 'MD - Maryland'},
                            {value: 'MA', label: 'MA - Massachusetts'},
                            {value: 'MI', label: 'MI - Michigan'},
                            {value: 'MN', label: 'MN - Minnesota'},
                            {value: 'MS', label: 'MS - Mississippi'},
                            {value: 'MO', label: 'MO - Missouri'},
                            {value: 'MT', label: 'MT - Montana'},
                            {value: 'NE', label: 'NE - Nebraska'},
                            {value: 'NV', label: 'NV - Nevada'},
                            {value: 'NH', label: 'NH - New Hampshire'},
                            {value: 'NJ', label: 'NJ - New Jersey'},
                            {value: 'NM', label: 'NM - New Mexico'},
                            {value: 'NY', label: 'NY - New York'},
                            {value: 'NC', label: 'NC - North Carolina'},
                            {value: 'ND', label: 'ND - North Dakota'},
                            {value: 'OH', label: 'OH - Ohio'},
                            {value: 'OK', label: 'OK - Oklahoma'},
                            {value: 'OR', label: 'OR - Oregon'},
                            {value: 'PA', label: 'PA - Pennsylvania'},
                            {value: 'RI', label: 'RI - Rhode Island'},
                            {value: 'SC', label: 'SC - South Carolina'},
                            {value: 'SD', label: 'SD - South Dakota'},
                            {value: 'TN', label: 'TN - Tennessee'},
                            {value: 'TX', label: 'TX - Texas'},
                            {value: 'UT', label: 'UT - Utah'},
                            {value: 'VT', label: 'VT - Vermont'},
                            {value: 'VA', label: 'VA - Virginia'},
                            {value: 'WA', label: 'WA - Washington'},
                            {value: 'WV', label: 'WV - West Virginia'},
                            {value: 'WI', label: 'WI - Wisconsin'},
                            {value: 'WY', label: 'WY - Wyoming'}
                        ],

                        optionsOfTemplate: [
                            {
                                value: '1',
                                label: 'Xbox Series S'
                            },
                            {
                                value: '2',
                                label: 'General Monitor'
                            },
                        ],

                        optionsOfShipService: [],

                        optionsOfSignature: [
                            {
                                value: 'No signature',
                                label: 'No signature'
                            },
                            {
                                value: 'Indirect',
                                label: 'Indirect'
                            },
                            {
                                value: 'Direct',
                                label: 'Direct'
                            },
                            {
                                value: 'Adult',
                                label: 'Adult'
                            },
                        ],

                        optionsproductscommodities: [],

                        optionsshipmentpurpose: [
                            {
                                value: '1',
                                label: 'Commercial'
                            },
                        ],

                        optionsOfBillingtransportationto: [
                            {
                                value: '1',
                                label: 'Sender'
                            },
                        ],

                        optionsOfBilldutiestaxesfeesto: [
                            {
                                value: '1',
                                label: 'Recipient'
                            },
                        ],

                        optionsOfExportinformationcode: [
                            {
                                value: '1',
                                label: 'OS - ALL OTHER EXPORTS'
                            },
                        ],

                        optionsOfLicenseexceptionsymbol: [
                            {
                                value: '1',
                                label: 'C33 - NO LICENSE REQUIRED (ALL OTHERS)'
                            },
                        ],

                        optionsOfCountryoforigin: [
                            {
                                value: '1',
                                label: 'Albania'
                            },
                        ],
                    },
                    //Sender:
                    senderForm: {
                        valueOfAddressName: '',
                        saveOfchecked: false,
                        addressname: '',
                        fullname: '',
                        phone: '',
                        companyname: '',
                        address1: '',
                        address2: '',
                        city: '',
                        valueOfState: '',
                        zipcode: '',
                    },
                    // senderFormData: {
                    //     valueOfAddressName: '1',
                    //     saveOfchecked: false,
                    //     addressname: '11747 NE Sumner St Bldg 4',
                    //     fullname: 'Unit A Portland',
                    //     phone: '97220',
                    //     companyname: 'US',
                    //     address1: '11747 NE Sumner St Bldg 4',
                    //     address2: '11747 NE Sumner St Bldg 4',
                    //     city: 'United States',
                    //     valueOfState: 'OR',
                    //     zipcode: '97220',
                    // },

                    //Recipient
                    recipientForm: {
                        valueOfAddressName: '',
                        saveOfchecked: false,
                        addressname: '',
                        fullname: '',
                        phone: '',
                        companyname: '',
                        address1: '',
                        address2: '',
                        city: '',
                        valueOfState: '',
                        zipcode: '',
                    },
                    // recipientFormData: {
                    //     valueOfAddressName: '1',
                    //     saveOfchecked: false,
                    //     addressname: 'United Electronics Deals_Ballwin',
                    //     fullname: 'JunAn Express',
                    //     phone: '2162463797',
                    //     companyname: 'US',
                    //     address1: '6215 NE 92nd Dr',
                    //     address2: '6215 NE 92nd Dr',
                    //     city: 'Portland',
                    //     valueOfState: 'OR',
                    //     zipcode: '97253',
                    // },

                    labelDetailsForm: {
                        valueOfTemplate: '',
                        shipdate: '',
                        valueOfShipService: '',
                        valueOfSignature: '',
                    },

                    inputNote: '',
                    inputMemo: '',

                    providerCreateInputTableData: [
                        {
                            //one table
                            identicalpackageqty: '1',
                            weight: '0',
                            length: '0',
                            width: '0',
                            height: '0',
                            declaredvalue: '0',
                            memo: '',
                        },
                    ],

                },

                internationalDialog: {
                    dialogcreateinternationalFormVisible: false,
                    itn: '',
                    checkedOfCommercialInvoice: true,

                    //Package & Shipment details:
                    valueOfproductscommodities: '',
                    valueOfshipmentpurpose: '1',
                    valueOfBillingtransportationto: '1',
                    valueOfBilldutiestaxesfeesto: '1',

                    //ProviderCommodityInfoTable
                    ProviderCommodityInfoTableTableData: [
                        {
                            commodity: '1',
                            schedulebcode: '1',
                            exportinfocode: '1',
                            countryoforigin: '1',
                            licenseexceptionsymbol: '1',
                            customsvalue: '1',
                            quantity: '1',
                            quantity2: '1',
                            totalweight: '1',
                        },
                    ],

                    schedulebdescription: '',
                    schedulebcode: '',
                    valueOfExportinformationcode: '1',
                    valueOfLicenseexceptionsymbol: '1',
                    valueOfCountryoforigin: '',
                    eccn: '',
                    totalcommodityweight: 0,
                    totalcustomsvalue: 0,
                    quantity: 0,
                    checkedsavecommodityprofile: false,
                },

                //    Edit note
                editNoteDialog: {
                    dialogeditNoteVisible: false,

                    formData: {},
                },
            }
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

    .topofcol {
        margin-top: 10px;
        display: flex;
    }

    .topofcolbetween {
        margin-top: 10px;
        display: flex;
        justify-content: space-between
    }

    .switchofdiv {
        margin-top: 20px;
    }

    .dialogofrowbetween {
        display: flex;
        justify-content: space-between
    }

    .marginrightofAll {
        margin-right: 10px;
    }

    .fontsettoall {
        font-size: 18px;
    }

    .fontsetsmalltoall {
        font-size: 12px;
    }

    .divofflex {
        display: flex;
    }

    .fontsetbigtoall {
        margin-left: 5px;
        margin-top: 10px;
        font-size: 25px;
        cursor: pointer;
    }

    .elformitemlineheight /deep/ .el-form-item__content {
        line-height: 15px;
    }

    /*/deep/ .el-form-item.lastItem {*/
    /*    margin-bottom: 5px;*/
    /*}*/

    .widthpasenntoset {
        width: 95%;
    }

    .widthpasenntosetsmall {
        width: 85%;
        margin-right: 10px;
    }

    .el-form-item {
        margin-bottom: 5px;
    }

    .rowofright {
        display: flex;
        justify-content: flex-end;
    }

    .rowofcenter {
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }

    /deep/ .el-dialog__body {
        padding-bottom: 0;
    }

    .getrate {
        margin-top: 15px;
        margin-left: 50%;
    }
</style>