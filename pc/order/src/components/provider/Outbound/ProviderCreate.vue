<template>
    <div>
        <el-row class="block-col-2 elrowoftop">
            <el-col :span="3">
                <el-button @click="handleAddProduct"><span
                        style="font-size: 20px;margin-right: 3px">+</span>Add product
                </el-button>
            </el-col>
            <el-col :span="6">
                <div v-show="errormsgshow">
                    <i class="el-icon-warning errormsgbig"></i>
                    &nbsp;
                    <span class="errormsg">
                        Cannot outbound shipment from multiple sites.
                    </span>
                    &nbsp;
                    &nbsp;
                    <i class="el-icon-error errormsgbig handercur"
                       @click="errormsgshow=false"
                    ></i>
                </div>
            </el-col>
            <el-col :span="8">
                <i class="el-icon-warning"></i>
                <span class="spanofcenter">
                    Unit price is for book keeping purpose, and only visible to organization.
                </span>
            </el-col>
            <el-col :span="6" class="searchofcol">
                <div style="width: 250px">
                    <el-input
                            placeholder="Search"
                            suffix-icon="el-icon-search"
                            v-model="form.inputSearch"
                            clearable
                    >
                    </el-input>
                </div>
            </el-col>
        </el-row>

        <el-form
                :rules="shipFormRefrules"
                :model="form" ref="shipFormRef">
            <div>
                <Table :tableData="form.tableData" @func="deleteRowFormSon" propsMsg="create"/>
            </div>

            <el-card>
                <div class="divofcard">
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

                    <div class="iconofbuy">
                        <i class="iconfont icon-gouwucheman"></i>
                        <el-button
                                @click="domesticlabelopen"
                                slot="trigger" size="small">Buy label
                        </el-button>
                    </div>
                </div>
            </el-card>

            <div>
                <el-row class="formofrow elrowoftop">
                    <el-col :span="4.6">
                        <el-form-item prop="labelid">
                            <el-input
                                    placeholder="Label ID"
                                    v-model="form.labelid"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4.6">
                        <el-form-item prop="tracking_number">
                            <el-input
                                    placeholder="Tracking number"
                                    v-model="form.tracking_number"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4.6">
                        <el-form-item>
                            <el-input
                                    placeholder="Package quantity"
                                    v-model="form.packagequantity"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4.6">
                        <el-form-item>
                            <el-select v-model="form.servicetype" placeholder="Service type">
                                <el-option
                                        v-for="item in structofform.servicetypeoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4.6">
                        <el-form-item>
                            <el-select multiple v-model="form.otherservices" placeholder="Other Services">
                                <el-option
                                        v-for="item in structofform.otherservicesoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

            <div>
                <el-row class="formofrow">
                    <el-col :span="4.6" class="formofcol">
                        <span class="requiredofspan">
                            *
                        </span>
                        <el-form-item prop="carrier">
                            <el-select v-model="form.carrier" placeholder="Carrier">
                                <el-option
                                        v-for="item in structofform.carrieroptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">
                        <el-form-item>
                            <el-select
                                    @change="destinationChange"
                                    v-model="form.destination" placeholder="Destination">
                                <el-option
                                        v-for="item in structofform.destinationoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value + ',' +item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">
                        <el-form-item>
                            <el-input
                                    v-show="this.form.destination == 'other,-- Other --'"
                                    placeholder="Destination content"
                                    v-model="form.destinationcontent"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <!--                    <el-col :span="4.6">-->
                    <!--                        <el-form-item>-->
                    <!--                            <el-select multiple v-model="form.templatevalue" placeholder="Template">-->
                    <!--                                <el-option-->
                    <!--                                        v-for="item in structofform.templateoptions"-->
                    <!--                                        :key="item.value"-->
                    <!--                                        :label="item.label"-->
                    <!--                                        :value="item.value">-->
                    <!--                                </el-option>-->
                    <!--                            </el-select>-->
                    <!--                        </el-form-item>-->
                    <!--                    </el-col>-->
                </el-row>
            </div>

            <div>
                <el-row class="formofrow">
                    <el-col :span="10">
                        <el-form-item>
                            <el-input
                                    type="textarea"
                                    :rows="6"
                                    placeholder="Note to yourself"
                                    v-model="form.notetoyourself">
                            </el-input>
                            <span class="spanofcenter">
                                Only visible to organization
                            </span>
                        </el-form-item>

                    </el-col>
                    <el-col :span="10">
                        <el-form-item>
                            <el-input
                                    type="textarea"
                                    :rows="6"
                                    placeholder="Instruction"
                                    v-model="form.instruction">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

            <div>
                <el-row class="searchofcol">
                    <el-col :span="7" class="divofformbutton">
                        <!--                        <el-form-item>-->
                        <!--                            <el-button>Create draft</el-button>-->
                        <!--                        </el-form-item>-->
                        <el-form-item>
                            <el-button @click="createShipment" :disabled="createShipmentdisabled">Create Shipment
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button :disabled="statusdisabled" @click="handelStatusClick">Status</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>

        <!--Add product-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Select Product" :visible.sync="dialogform.outerVisible" width="90%">
            <!--          内层 Edit  -->

            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    width="70%"
                    title="Edit product"
                    :visible.sync="dialogform.innerVisibleEdit"
                    append-to-body>
                <el-card>
                    <el-form ref="formDialogEdit" :model="dialogform.ByProductEditForm" label-width="80px">
                        <el-form-item>
                            <div class="spanofcenter">
                                Names
                            </div>
                            <el-input v-model="dialogform.ByProductEditForm.name"
                                      prefix-icon="iconfont  icon-zixun1"></el-input>
                            <div class="spanofcenter">
                                Note: Updated product name will only reflect in new offers
                            </div>
                        </el-form-item>

                        <el-row>
                            <el-col :span="10">
                                <el-form-item>
                                    <div class="spanofcenter">
                                        Price
                                    </div>
                                    <el-input v-model="dialogform.ByProductEditForm.price"
                                              prefix-icon="iconfont icon-1"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="10">
                                <el-form-item>
                                    <div class="spanofcenter">
                                        Condition
                                    </div>
                                    <el-select
                                            v-model="dialogform.valueOfCondition"
                                            placeholder="-- All --">
                                        <el-option
                                                v-for="item in dialogform.structDialog.optionsOfCondition"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item>
                            <div class="spanofcenter">
                                ASIN
                            </div>
                            <el-input v-model="dialogform.ByProductEditForm.asin"
                                      prefix-icon="el-icon-crop"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <div class="spanofcenter">
                                SKU
                            </div>
                            <el-input v-model="dialogform.ByProductEditForm.sku"
                                      prefix-icon="el-icon-crop"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <div class="spanofcenter">
                                UPS
                            </div>
                            <el-input v-model="dialogform.ByProductEditForm.ups"
                                      prefix-icon="el-icon-s-shop"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="Note"
                                    v-model="dialogform.ByProductEditForm.note">
                            </el-input>
                        </el-form-item>

                        <div class="searchofcol">
                            <el-button @click="dialogform.innerVisibleEdit = false">Close</el-button>
                            <el-button type="primary" @click="dialogform.innerVisibleEdit = false">Save</el-button>
                        </div>
                    </el-form>
                </el-card>
            </el-dialog>

            <!--            内层 Select innerVisibleSelect-->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    width="90%"
                    title="Select Location"
                    :visible.sync="dialogform.innerVisibleSelect"
                    append-to-body>
                <div>
                    <el-row class="dialogproducttop">
                        <el-col :span="19">
                            <div style="width:200px;margin-right: 10px;font-size: 10px;">
                                <span class="demonstration">User</span>

                                <el-select v-model="dialogform.valueOfUser" placeholder="-- All --">
                                    <el-option
                                            @click.native="getStatusListByUser(item)"
                                            v-for="item in dialogform.structDialog.optionsOfUser"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>

                        <el-col :span="4">
                            <div>
                                <el-input
                                        @input="selectRowFormSon(selecttempdata)"
                                        style="margin-top: 10px;"
                                        placeholder="Search"
                                        suffix-icon="el-icon-search"
                                        clearable
                                        v-model="dialogform.inputSearch"
                                >
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <ByProductSelectTable
                            @funcSizeChange="getDataSizeByProductSelectTable"
                            @funcCurrentChange="getDataCurrentChangeByProductSelectTable"
                            v-if="dialogform.innerVisibleSelectTmp"
                            :pageInfo="pageInfodialogSelectAddRowFormSon"
                            :tableData="dialogform.ByProductSelectTableData"
                            @func="dialogByUserAddRowFormSon"/>
                </div>
            </el-dialog>

            <div>
                <div class="topMenu">
                    <el-menu :default-active="dialogform.activeIndex" class="el-menu-demo" mode="horizontal"
                             @select="handleSelect">
                        <el-menu-item index="1">
                            By product
                        </el-menu-item>
                        <el-menu-item index="2">
                            By user
                        </el-menu-item>
                    </el-menu>
                </div>

                <div>
                    <el-row class="dialogproducttop">
                        <el-col :span="19" class="formofcol">
                            <div style="width:200px;margin-right: 10px;font-size: 10px;"
                                 v-show="dialogform.activeIndex==='2'">
                                <span class="demonstration">User</span>

                                <el-select v-model="dialogform.valueOfUser" placeholder="-- All --">
                                    <el-option
                                            @click.native="handleSelectChange(item)"
                                            v-for="item in dialogform.structDialog.optionsOfUser"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>

                            <!--                            <div>-->
                            <!--                                <el-checkbox v-model="dialogform.checked">pin popup</el-checkbox>-->
                            <!--                            </div>-->
                        </el-col>

                        <el-col :span="4">
                            <div v-show="dialogform.activeIndex==='1'">
                                <el-input
                                        placeholder="Search"
                                        suffix-icon="el-icon-search"
                                        clearable
                                        v-model="dialogform.inputSearch"
                                        @input="getListProduct"
                                >
                                </el-input>
                            </div>
                            <div v-show="dialogform.activeIndex==='2'">
                                <el-input
                                        style="margin-top: 15px;"
                                        placeholder="Search"
                                        suffix-icon="el-icon-search"
                                        clearable
                                        v-model="dialogform.inputSearchuser"
                                        @input="getListUser"
                                >
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <ByProductTable
                            @funcSizeChange="getDataSizeChangeByProductTableData"
                            @funcCurrentChange="getDataCurrentChangeByProductTableData"
                            :pageInfo="pageInfoByProductTableData"
                            v-show="dialogform.activeIndex==='1'"
                            :tableData="dialogform.ByProductTableData"
                            @func="editRowFormSon"
                            @funcSelect="selectRowFormSon"
                    />

                    <ByUserTable
                            @funcSizeChange="getDataSizeChangeByProductByUserTableData"
                            @funcCurrentChange="getDataCurrentChangeByProductByUserTableData"
                            :pageInfo="pageInfoByProductByUserTableData"
                            v-show="dialogform.activeIndex==='2'"
                            :tableData="dialogform.ByProductByUserTableData"
                            @func="dialogByUserAddRowFormSon"
                    />
                    <!--                    <Active msg="" v-show="dialogform.activeIndex==='1'"/>-->
                    <!--                    <Proposed msg="" v-show="dialogform.activeIndex==='2'"/>-->
                    <!--                    <Expired msg="" v-show="activeIndex==='3'"/>-->
                    <!--            <Report msg="" v-show="activeIndex==='4'"/>-->


                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogform.outerVisible = false">Close</el-button>
            </div>
        </el-dialog>

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
                                        <!--                                        <el-form-item style="width:150px;">-->
                                        <!--                                            <el-checkbox v-model="dialog.senderForm.saveOfchecked">Save-->
                                        <!--                                            </el-checkbox>-->
                                        <!--                                        </el-form-item>-->
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
                                            <!--                                            <el-input-->
                                            <!--                                                    placeholder="State"-->
                                            <!--                                                    v-model="dialog.senderForm.valueOfState"-->
                                            <!--                                            >-->
                                            <!--                                            </el-input>-->
                                            <el-select class="marginrightofAll" v-model="dialog.senderForm.valueOfState"
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
                                        <!--                                        <el-form-item style="width:150px;">-->
                                        <!--                                            <el-checkbox v-model="dialog.recipientForm.saveOfchecked">Save-->
                                        <!--                                            </el-checkbox>-->
                                        <!--                                        </el-form-item>-->
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
                                            <!--                                            <el-input-->
                                            <!--                                                    placeholder="State"-->
                                            <!--                                                    v-model="dialog.recipientForm.valueOfState"-->
                                            <!--                                            >-->
                                            <!--                                            </el-input>-->
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

                        <el-row class="dialogofrowbetween">
                            <el-col :span="8">
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
    import axios from "axios";

    const Table = () => import('@/components/provider/Outbound/Create/PaymentCreateTable.vue')
    const ByProductTable = () => import('@/components/provider/Outbound/Create/comp/ByProductTable.vue')
    const ByProductSelectTable = () => import('@/components/provider/Outbound/Create/comp/ByProductSelectTable.vue')
    const ByUserTable = () => import('@/components/provider/Outbound/Create/comp/ByUserTable.vue')

    const ProviderCreateInputTable = () => import('@/components/provider/Outbound/Label/Label/comp/ProviderCreateInputTable.vue')

    import '@/assets/icon/iconfont.css'

    export default {
        name: "ProviderCreate",
        components: {
            Table, ByProductTable, ByProductSelectTable, ByUserTable, ProviderCreateInputTable,
        },
        data() {
            return {
                tabledataTmpLet: [],
                selecttempdata: {},
                selectuserobject: {},

                shipFormRefrules: {
                    // labelid: [
                    //     {required: true, message: 'The label id is empty.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    // tracking_number: [
                    //     {required: true, message: 'The tracking number is empty.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    carrier: [
                        {required: true, message: 'The carrier is empty.', trigger: 'blur'},
                        // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    // email: [
                    //     {required: true, message: 'The email address is badly formatted.', trigger: 'blur'},
                    //     {type: 'email', message: 'The email address is badly formatted.', trigger: ['blur', 'change']},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    // suggestion: [
                    //     {required: true, message: 'Suggestion content is required.', trigger: 'blur'},
                    //     // {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],

                },
                getRateData: [],
                dialogGetRateTableVisible: false,
                optionsOfdropdown: [],
                createLabelSaveDisabled: true,
                dialog: {
                    // Domestic Label    Create label
                    // formDomesticCreate: {},
                    dialogDomesticCreateFormVisible: false,

                    dialogformstruct: {
                        optionsOfAddressName: [],

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

                errormsgshow: false,
                //表单分页
                pageInfoByProductTableData: {
                    pageSize: 500,
                    total: 10,
                    current: 1,
                },
                //表单分页
                pageInfoByProductByUserTableData: {
                    pageSize: 500,
                    total: 10,
                    current: 1,
                },

                //表单分页
                pageInfodialogSelectAddRowFormSon: {
                    pageSize: 500,
                    total: 10,
                    current: 1,
                },

                //表单分页
                pageLabelInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                form: {
                    inputSearch: '',
                    tableData: [],

                    tracking_number: '',
                    labelid: '',

                    fileList: [],
                    fileListTmp: [],
                    servicetype: '',
                    otherservices: '',

                    carrier: '',
                    destination: '',
                    notetoyourself: '',
                    instruction: '',

                    templatevalue: '',

                    label_url: '',
                    destinationcontent: '',
                },

                structofform: {
                    servicetypeoptions: [{
                        value: 'Normal',
                        label: 'Normal'
                    }, {
                        value: 'Expedite',
                        label: 'Expedite'
                    }],

                    otherservicesoptions: [
                        // {
                        //     value: 'all',
                        //     label: 'Select All'
                        // },
                        {
                            value: 'label',
                            label: 'Label'
                        },
                        {
                            value: 'photo',
                            label: 'Photo'
                        }, {
                            value: 'sn',
                            label: 'SN'
                        }],

                    carrieroptions: [{
                        value: 'USPS',
                        label: 'USPS'
                    }, {
                        value: 'Fedex',
                        label: 'Fedex'
                    }, {
                        value: 'UPS',
                        label: 'UPS'
                    }, {
                        value: 'DHL',
                        label: 'DHL'
                    }, {
                        value: 'others',
                        label: 'others'
                    },],

                    destinationoptions: [{
                        value: 'other',
                        label: '-- Other --'
                    },],

                    templateoptions: [{
                        value: 'nodataavailable',
                        label: 'No data available'
                    },],
                },

                // Add product dialog
                dialogform: {
                    outerVisible: false,
                    innerVisibleEdit: false,
                    innerVisibleSelect: false,
                    innerVisibleSelectTmp: false,

                    activeIndex: '1',

                    checked: false,
                    inputSearch: '',
                    inputSearchuser: '',

                    structDialog:
                        {
                            optionsOfUser: [{
                                value: 'all',
                                label: '-- All --'
                            }, {
                                value: '1',
                                label: 'Easygo warehouse'
                            }],

                            optionsOfCondition: [{
                                value: 'new',
                                label: 'new'
                            }, {
                                value: 'used',
                                label: 'used'
                            }, {
                                value: 'refurbished',
                                label: 'refurbished'
                            }],
                        },

                    //ByProductTable data
                    ByProductTableData: [],

                    valueOfUser: '',
                    valueOfCondition: '',

                    //ByProductTable Select data
                    ByProductSelectTableData: [],

                    //ByProductTable by user data
                    ByProductByUserTableData: [],

                    ByProductEditForm: {},
                },

                createShipmentdisabled: true,
                statusdisabled: true,

                //upload
                uploadUrl: axios.defaults.baseURL + "outbound/label/createlabelanduploadsave",
                uploadData: {},
                disabledStart: false,
                uploadForm: new FormData(),
            }
        },
        created() {
            this.initdata()
        },
        methods: {
            destinationChange() {
                // if(this.form.destination && this.form.destination == 'other') {
                //     console.log(this.form.destination)
                // }
            },
            handelStatusClick() {
                this.$router.push('/providerhome/providerstatus')
            },
            newFiles(file) {
                // this.uploadForm.append('file', file)

                // return false
            },
            createShipment() {
                this.$refs.shipFormRef.validate(async valid => {
                    if (!valid) return;
                    if (this.errormsgshow) {
                        return this.$message.error('Site select Error.')
                    }

                    let errTmp = false
                    this.form.tableData.forEach(function (item) {
                        if (item.instockdata.errormsgshowToship || item.instockdata.errormsgshow || !item.instockdata.toship) {
                            errTmp = true
                        }
                    })

                    if (errTmp) {
                        return this.$message.error('Site select data Error.')
                    }

                    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

                    this.form.orgid = window.sessionStorage.getItem("userid")

                    // console.log(this.form)
                    this.uploadForm.delete('uploadData')
                    this.uploadForm.append('uploadData', JSON.stringify(this.form))
                    // console.log(this.uploadForm)
                    const {data: res} = await this.$http.post('outbound/label/createlabelanduploadsave', this.uploadForm)

                    if (res.meta.status != 200) {
                        return this.$message.error('Insert Error.');
                    } else {
                        this.createShipmentdisabled = true
                        this.statusdisabled = false
                        return this.$message.success("Insert ok!")
                    }

                })

                // console.log(this.form)
            },
            createshipmentDisabled() {
                //判断是否能create
                if (this.form.tableData.length > 0
                    && (this.form.fileListTmp.length > 0 || this.form.label_url)
                ) {
                    this.createShipmentdisabled = false
                } else {
                    this.createShipmentdisabled = true
                }
            },
            async initdata() {
                //address get
                this.pageLabelInfo.username = window.sessionStorage.getItem("username")
                this.pageLabelInfo.userid = window.sessionStorage.getItem("userid")
                const {data: res} = await this.$http.post('outbound/label/queryoutboundlabellist', this.pageLabelInfo)
                this.dialog.dialogformstruct.optionsOfAddressName = []
                this.structofform.destinationoptions = []

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    // this.form.tableData = res.pageInfolabelList.list

                    res.addresstmplatelist.forEach(function (item) {
                        item.value = item.id
                        item.label = item.addressname
                    })

                    this.dialog.dialogformstruct.optionsOfAddressName = res.addresstmplatelist
                    this.structofform.destinationoptions = res.addresstmplatelist

                    let tmpOther = {
                        value: 'other',
                        label: '-- Other --'
                    }
                    this.structofform.destinationoptions.push(tmpOther)

                    this.optionsOfdropdown = res.packagesizetemplatelist

                    if (this.pageLabelInfo) {
                        this.pageLabelInfo.current = res.pageInfolabelList.pageNum
                        this.pageLabelInfo.pageSize = res.pageInfolabelList.pageSize
                        this.pageLabelInfo.total = res.pageInfolabelList.total

                    }
                }
            },
            async domesticlabelopen() {
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

                //address get
                this.pageLabelInfo.username = window.sessionStorage.getItem("username")
                this.pageLabelInfo.userid = window.sessionStorage.getItem("userid")
                const {data: res} = await this.$http.post('outbound/label/queryoutboundlabellist', this.pageLabelInfo)
                this.dialog.dialogformstruct.optionsOfAddressName = []

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    // this.form.tableData = res.pageInfolabelList.list

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

                    this.getListOutboundLabelList(res.outboundLabel.id)
                }
            },
            async getListOutboundLabelList(labelid) {
                this.pageLabelInfo.username = window.sessionStorage.getItem("username")
                this.pageLabelInfo.userid = window.sessionStorage.getItem("userid")
                this.pageLabelInfo.labelstatus = this.form.valueOfLabelStatus
                this.pageLabelInfo.searchinput = this.form.inputSearch
                this.pageLabelInfo.startDate = this.form.startDate
                this.pageLabelInfo.endDate = this.form.endDate
                this.pageLabelInfo.labelid = labelid

                // this.pageInfo.startDate = this.startDate
                // this.pageInfo.endDate = this.endDate

                const {data: res} = await this.$http.post('outbound/label/queryoutboundlabellist', this.pageLabelInfo)

                // this.form.tableData = []
                this.dialog.dialogformstruct.optionsOfAddressName = []
                this.optionsOfdropdown = []

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    if (res.pageInfolabelList.list.length > 0) {
                        // console.log(res.pageInfolabelList.list[0])
                        // console.log(res.pageInfolabelList.list[0].outboundShipment)
                        // console.log(res.pageInfolabelList.list[0].outboundShipment.label_url)

                        this.form.labelid = res.pageInfolabelList.list[0].id
                        this.form.tracking_number = res.pageInfolabelList.list[0].outboundShipment.tracking_number
                        this.form.label_url = res.pageInfolabelList.list[0].outboundShipment.label_url
                        this.form.carrier = res.pageInfolabelList.list[0].outboundShipment.carrier
                    }

                    // this.form.tableData = res.pageInfolabelList.list

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

                    this.createshipmentDisabled()
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
            getRowFormSonAndhandleRemove(row) {
                this.dialog.providerCreateInputTableData.splice(row.index, 1)
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
            async handleSelectChange(item) {
                this.pageInfoByProductByUserTableData.userobject = item
                this.pageInfoByProductByUserTableData.orgid = window.sessionStorage.getItem("userid")
                this.pageInfoByProductByUserTableData.searchinput = this.dialogform.inputSearchuser
                const {data: res} = await this.$http.post('taskoffer/queryconfirmofproduct', this.pageInfoByProductByUserTableData)

                this.dialogform.ByProductByUserTableData = []

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.dialogform.ByProductByUserTableData = res.infoinsotckforwarehouse.list

                    this.dialogform.structDialog.optionsOfUser = []

                    let userList = res.userList
                    let tmppush = []
                    userList.forEach(function (item) {
                        let tmpusername;

                        if (item.relname) {
                            tmpusername = item.relname
                        } else if (item.username) {
                            tmpusername = item.username.split('@')[0]
                        }

                        if (item.type) {
                            // console.log("1--" + tmpusername)
                            // console.log("1id" + item.userid)
                        } else {
                            tmpusername = "Bizblock warehouse"
                            // console.log("2--" + tmpusername)
                            // console.log("2id" + item.userid)
                        }

                        let optionsOfUser = {
                            value: item.userid,
                            label: tmpusername
                        }

                        tmppush.push(optionsOfUser)
                    })

                    var obj = {};
                    tmppush = tmppush.reduce(function (item, next) {
                        obj[next.value] ? '' : obj[next.value] = true && item.push(next);
                        return item;
                    }, []);

                    // console.log(tmppush)
                    this.dialogform.structDialog.optionsOfUser = Array.from(new Set(tmppush))

                    // console.log(this.dialogform.ByProductByUserTableData)
                    this.pageInfoByProductByUserTableData.current = res.info.pageNum
                    this.pageInfoByProductByUserTableData.pageSize = res.info.pageSize
                    this.pageInfoByProductByUserTableData.total = res.info.total
                }
            },
            async getListProduct() {
                this.pageInfoByProductTableData.orgid = window.sessionStorage.getItem("userid")
                this.pageInfoByProductTableData.searchinput = this.dialogform.inputSearch
                const {data: res} = await this.$http.post('warehouse/queryListPageProduct', this.pageInfoByProductTableData)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.dialogform.ByProductTableData = res.data

                    this.pageInfoByProductTableData.current = res.info.pageNum
                    this.pageInfoByProductTableData.pageSize = res.info.pageSize
                    this.pageInfoByProductTableData.total = res.info.total
                }
            },
            async getListUser() {
                this.pageInfoByProductByUserTableData.orgid = window.sessionStorage.getItem("userid")
                this.pageInfoByProductByUserTableData.searchinput = this.dialogform.inputSearchuser
                const {data: res} = await this.$http.post('taskoffer/queryconfirmofproduct', this.pageInfoByProductByUserTableData)
                this.dialogform.ByProductByUserTableData = []
                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.dialogform.ByProductByUserTableData = res.infoinsotckforwarehouse.list

                    this.dialogform.structDialog.optionsOfUser = []

                    let userList = res.userList

                    let tmppush = []
                    userList.forEach(function (item) {
                        let tmpusername;

                        if (item.relname) {
                            tmpusername = item.relname
                        } else if (item.username) {
                            tmpusername = item.username.split('@')[0]
                        }

                        if (item.type) {
                            // console.log("1--" + tmpusername)
                            // console.log("1id" + item.userid)
                        } else {
                            tmpusername = "Bizblock warehouse"
                            // console.log("2--" + tmpusername)
                            // console.log("2id" + item.userid)
                        }

                        let optionsOfUser = {
                            value: item.userid,
                            label: tmpusername
                        }

                        tmppush.push(optionsOfUser)
                    })

                    var obj = {};
                    tmppush = tmppush.reduce(function (item, next) {
                        obj[next.value] ? '' : obj[next.value] = true && item.push(next);
                        return item;
                    }, []);

                    // console.log(tmppush)
                    this.dialogform.structDialog.optionsOfUser = Array.from(new Set(tmppush))

                    // console.log(this.dialogform.ByProductByUserTableData)
                    this.pageInfoByProductByUserTableData.current = res.info.pageNum
                    this.pageInfoByProductByUserTableData.pageSize = res.info.pageSize
                    this.pageInfoByProductByUserTableData.total = res.info.total
                }
            },

            getDataSizeChangeByProductTableData(val) {
                this.pageInfoByProductTableData.pageSize = val
                this.getListProduct()
            },
            getDataCurrentChangeByProductTableData(val) {
                this.pageInfoByProductTableData.current = val
                this.getListProduct()
            },

            getDataSizeChangeByProductByUserTableData(val) {
                this.pageInfoByProductByUserTableData.pageSize = val
                // this.getListProduct()
            },
            getDataCurrentChangeByProductByUserTableData(val) {
                this.pageInfoByProductByUserTableData.current = val
                // this.getListProduct()
            },

            handleAddProduct() {
                this.getListProduct()
                this.getListUser()
                this.dialogform.outerVisible = true
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

            handleSelect(key, keyPath) {
                this.dialogform.activeIndex = key
            },

            deleteRowFormSon(data) {
                this.form.tableData.splice(data.index, 1)

                if (this.form.tableData.length <= 0) {
                    return
                }
                let errorlist = []
                this.form.tableData.reduce(function (prev, cur, index, arr) {
                    if (prev != null) {
                        if (prev.instockdata.type != cur.instockdata.type
                            ||
                            prev.instockdata.userid != cur.instockdata.userid
                            ||
                            prev.instockdata.siteid != cur.instockdata.siteid
                        ) {
                            errorlist.push(cur)
                        }
                    }
                    return cur
                })
                if (errorlist.length > 0) {
                    this.errormsgshow = true
                } else {
                    this.errormsgshow = false
                }

                // this.form.packagequantity = this.form.tableData.length
            },

            editRowFormSon(data) {
                this.dialogform.innerVisibleEdit = true
                this.dialogform.ByProductEditForm = data
            },

            getDataSizeByProductSelectTable(val) {
                this.pageInfodialogSelectAddRowFormSon.pageSize = val
                this.selectRowFormSon(this.selecttempdata)
                // console.log(`每页 ${val} 条`);
                // this.getListProduct()
            },
            getDataCurrentChangeByProductSelectTable(val) {
                this.pageInfodialogSelectAddRowFormSon.current = val
                this.selectRowFormSon(this.selecttempdata)
                // console.log(`当前页: ${val}`);
                // this.getListProduct()
            },
            getStatusListByUser(item) {
                this.selectuserobject = item
                this.selectRowFormSon(this.selecttempdata)
            },
            async selectRowFormSon(data) {
                this.selecttempdata = data
                this.pageInfodialogSelectAddRowFormSon.orgid = data.orgid
                this.pageInfodialogSelectAddRowFormSon.productid = data.id
                this.pageInfodialogSelectAddRowFormSon.userobject = this.selectuserobject
                this.pageInfodialogSelectAddRowFormSon.searchinput = this.dialogform.inputSearch

                this.dialogform.innerVisibleSelectTmp = false

                const {data: res} = await this.$http.post('taskoffer/queryconfirmofproduct', this.pageInfodialogSelectAddRowFormSon)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tabledataTmpLet = []

                    // console.log(res.infoinsotckforwarehouse.list)
                    // console.log(res.infoinsotckforwarehouse.list.length)
                    if (res.infoinsotckforwarehouse.list && res.infoinsotckforwarehouse.list.length > 0) {
                        let tmp = {
                            productdata: data,
                            instockdata: res.infoinsotckforwarehouse.list
                        }

                        this.tabledataTmpLet = tmp
                        // console.log(res.infoinsotckforwarehouse.list)
                        // console.log(this.instockTable)

                        this.pageInfodialogSelectAddRowFormSon.current = res.infoinsotckforwarehouse.pageNum
                        this.pageInfodialogSelectAddRowFormSon.pageSize = res.infoinsotckforwarehouse.pageSize
                        this.pageInfodialogSelectAddRowFormSon.total = res.infoinsotckforwarehouse.total
                    }
                    this.dialogform.innerVisibleSelect = true
                    this.dialogform.innerVisibleSelectTmp = true
                }
            },

            // dialogSelectAddRowFormSon(data) {
            //     data.instockdata.toship = ''
            //     data.instockdata.unitprice = ''
            //     data.instockdata.unitcost = ''
            //     data.instockdata.status = '1'
            //     // this.form.tableData.productdata = []
            //
            //     let copytmp = JSON.parse(JSON.stringify(data))
            //
            //     this.form.tableData.push(copytmp)
            //     //从dialog --- select ----add 数据到主页面
            // },

            dialogByUserAddRowFormSon(data) {
                if (data.epquantity && data.epquantity > 0) {
                    data.instockdata.available = data.instockdata.epquantity
                } else {
                    data.instockdata.available = data.instockdata.quantity
                }
                data.instockdata.toship = ''
                data.instockdata.unitprice = ''
                data.instockdata.unitcost = ''
                data.instockdata.status = '1'
                // this.form.tableData.productdata = []

                let copytmp = JSON.parse(JSON.stringify(data))

                let errorlist = []

                this.form.tableData.forEach(function (item) {
                    // console.log(item)
                    if (item.instockdata.type != data.instockdata.type
                        ||
                        item.instockdata.userid != data.instockdata.userid
                        ||
                        item.instockdata.siteid != data.instockdata.siteid
                        ||
                        item.productdata.productid == data.productdata.productid
                    ) {
                        errorlist.push(item)
                    }
                })

                if (errorlist.length > 0) {
                    this.errormsgshow = true
                }

                this.form.tableData.push(copytmp)
                //从dialog --- by  user ----add 数据到主页面
                // console.log(this.form.tableData)
                // this.form.packagequantity = this.form.tableData.length
                this.createshipmentDisabled()
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
                this.createshipmentDisabled()
            },
            // upload
            submitUpload() {
                this.$refs.upload.submit();
            },
        },
        watch: {
            // 监听页码页宽
            tabledataTmpLet() {
                this.dialogform.ByProductSelectTableData = this.tabledataTmpLet
                // console.log(this.dialogform.ByProductSelectTableData )
            },
        },
    }
</script>

<style scoped lang="less">
    .spanofcenter {
        font-size: 10px;
    }

    .searchofcol {
        display: flex;
        justify-content: flex-end;
    }

    .elrowoftop {
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

    .iconofbuy {
        display: flex;
        margin-left: 20px;

        i {
            font-size: 25px;
            margin-top: 7px;
            margin-right: 5px;
        }
    }

    .divofcard {
        display: flex;
    }

    .formofrow {
        display: flex;
        justify-content: space-between;
    }

    .formofcol {
        display: flex;
        justify-content: flex-start;
    }

    .divofformbutton {
        display: flex;

        .el-form-item {
            margin-right: 5px;
        }
    }

    .dialogproducttop {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;

        .el-checkbox {
            margin-left: 20%;
        }
    }

    .errormsg {
        color: red;
        font-size: 12px;
    }

    .errormsgbig {
        color: red;
        font-size: 14px;
        cursor: pointer;
    }

    .handercur {
        cursor: pointer;
    }

    .marginrightofAll {
        margin-right: 10px;
    }

    .el-form-item {
        margin-bottom: 5px;
    }

    .dialogofrowbetween {
        display: flex;
        justify-content: space-between
    }

    .requiredofspan {
        color: red;
        margin-top: 10px;
    }

    /deep/ .el-input-group__prepend {
        padding-right: 5px;
        padding-left: 5px;
    }
</style>