<template>
    <div>
        <div class="topMenu">
            <el-row>
                <el-col :span="6">
                    <span class="demonstration">Select vendor</span>

                    <el-select v-model="topForm.valueOfSelectVendor" placeholder="-- All --">
                        <el-option
                                v-for="item in structForm.optionsOfSelectVendor"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="10" :offset="7">
                    <el-card>
                        <el-row class="betweento">
                            <el-col :span="10">
                                <span>Balance: &nbsp;</span>
                                <span>${{balance}}</span>
                            </el-col>
                            <el-col :span="10">
                                <el-button @click="dialogFormOnlinePaymentVisible=true">Deposit</el-button>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>

            <el-row class="topMenu">
                <el-col :span="4">
                    <span class="demonstration">Transaction type</span>

                    <el-select v-model="topForm.valueOfTransactionType" placeholder="-- All --">
                        <el-option
                                v-for="item in structForm.optionsOfTransactionType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-row class="block-col-2">
                        <el-col :span="12">
                            <el-input
                                    placeholder="Search for keywords"
                                    v-model="topForm.inputSearch"
                                    style="margin-top: 20px"
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>

                <el-col :span="10" style="display: flex;justify-content: space-between">
                    <div>
                        <span class="demonstration">Start date</span>
                        <!--                        :picker-options="pickerOptions"-->
                        <el-date-picker
                                v-model="topForm.startDate"
                                type="date"
                                placeholder="Select date"
                        >
                        </el-date-picker>
                    </div>

                    <div>
                        <span class="demonstration">end date</span>
                        <el-date-picker
                                v-model="topForm.endDate"
                                type="date"
                                placeholder="Select date"
                        >
                        </el-date-picker>
                    </div>

                    <div>
                        <el-button @click="" style="margin-top: 21px">Search</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="tableBody">
            <Table
                    @func="getRowhandleDetails"
                    :tableData="tableData"/>
        </div>

        <div class="dialog">
            <!--      details      -->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Details"
                    :visible.sync="dialogDetailsVisible"
                    width="60%">
                <el-row>
                    <el-col :span="12">
                        <span class="demonstration">Label id</span>

                        <el-select
                                class="widthToAll"
                                v-model="dialogDetailsForm.valueOflabelid" placeholder="">
                            <el-option
                                    v-for="(item,index) in dialogDetailsForm.labelid"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row class="display topToMar">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Tracking number:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.trackingnumber}}
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Estimated delivery:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.estimateddelivery}}
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Service type:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.servicetype}}
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Weight:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.weight}}lbs
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Billing weight:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.billingweight}}lbs
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Dimensions:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.dimensions}}lbs
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Shipper:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.shipper}}
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Recipient:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.recipient}}
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Zone:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.zone}}
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Shipment weight:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.shipmentweight}}lbs
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Shipment billing weight:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            {{dialogDetailsForm.shipmentbillingweight}}lbs
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Discounted postage amount:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            ${{dialogDetailsForm.discountedpostageamount}}
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Surcharge - fedExGroundFuelAmount:
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            ${{dialogDetailsForm.surchargefedExGroundFuelAmount}}
                        </span>
                    </el-col>
                </el-row>

                <el-row class="display">
                    <el-col :span="11" class="padright">
                        <span class="widthToAll flexToLeft">
                            Surcharge - residentialDeliverySurchargeAmount
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <span class="widthToAll">
                            ${{dialogDetailsForm.surchargeresidentialDeliverySurchargeAmount}}
                        </span>
                    </el-col>
                </el-row>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogDetailsVisible = false">Close</el-button>
                </span>
            </el-dialog>

            <!--     Online payment       -->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    width="70%"
                    title="Online payment" :visible.sync="dialogFormOnlinePaymentVisible">
                <el-form :model="dialogOPForm">
                    <el-row>
                        <el-col :span="8">
                            <el-radio
                                    @change="radioChange"
                                    v-model="dialogOPForm.radiooftop" label="1">Credit card
                            </el-radio>
                            <el-radio
                                    @change="radioChange"
                                    v-model="dialogOPForm.radiooftop" label="2">ACH
                            </el-radio>
                        </el-col>
                        <el-col :span="5" :offset="8">
                            <span class="fontweight">Vendor: Vite USA</span>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="5">
                            <div class="sizeofspan">
                                Amount
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Amount"
                                        v-model="dialogOPForm.amount"
                                        autocomplete="off"
                                        prefix-icon="iconfont icon-1"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8" :offset="1">
                            <div class="sizeofspan">
                                Receipt email
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Receipt email"
                                        v-model="dialogOPForm.receiptemail"
                                        autocomplete="off"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <!--         Credit card           -->
                    <div v-show="this.radioValue === '1'" class="topToMar">
                        <el-card>
                            <div class="fontweight">
                                3% transaction fee will apply.
                            </div>

                            <el-row>
                                <el-col :span="24">
                                    <el-form-item>
                                        <el-input
                                                placeholder="Address"
                                                v-model="dialogOPForm.address"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-form-item>
                                        <el-input
                                                placeholder="City"
                                                v-model="dialogOPForm.city"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5" :offset="1">
                                    <el-form-item>
                                        <el-input
                                                placeholder="State"
                                                v-model="dialogOPForm.state"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5" :offset="1">
                                    <el-form-item>
                                        <el-input
                                                aria-placeholder=""
                                                placeholder="ZIP"
                                                v-model="dialogOPForm.zip"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="24">
                                    <el-form-item>
                                        <el-input
                                                placeholder="Card number"
                                                v-model="dialogOPForm.cardnumber"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-form-item>
                                        <el-input
                                                placeholder="Card holder name"
                                                v-model="dialogOPForm.cardholdername"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5" :offset="1">
                                    <el-form-item>
                                        <el-input
                                                placeholder="Expiration"
                                                v-model="dialogOPForm.expiration"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5" :offset="1">
                                    <el-form-item>
                                        <el-input
                                                aria-placeholder=""
                                                placeholder="CVC"
                                                v-model="dialogOPForm.cvc"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row class="centerTo">
                                <el-col :span="16">
                                    <el-button
                                            disabled
                                            @click="" class="widthToAll">Pay
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>

                    <!--         ACH           -->
                    <div v-show="this.radioValue === '2'" class="topToMar">
                        <el-card>
                            <div class="fontweight">
                                ACH is currently not supported online. If you want to deposit by ACH, please contact your account manager
                            </div>

                            <el-row>
                                <el-col :span="24">
                                    <el-form-item>
                                        <el-input
                                                placeholder="Bank name"
                                                v-model="dialogOPForm.bankname"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="24">
                                    <el-form-item>
                                        <el-input
                                                placeholder="Routing number"
                                                v-model="dialogOPForm.routingnumber"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="24">
                                    <el-form-item>
                                        <el-input
                                                placeholder="Account number"
                                                v-model="dialogOPForm.accountnumber"
                                                autocomplete="off"
                                        >
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button
                            @click="dialogFormOnlinePaymentVisible = false">Close
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Billing/comp/BillingTable.vue')
    import '../../../assets/icon/iconfont.css'

    export default {
        name: "ProviderBilling",
        components: {
            Table,
        },
        data() {
            return {
                balance: '-86.82',

                topForm: {
                    inputSearch: '',
                    startDate: '',
                    endDate: '',
                    valueOfTransactionType: 'all',
                    valueOfSelectVendor: '1',
                },

                structForm: {
                    optionsOfTransactionType: [
                        {
                            value: 'all',
                            label: '-- All --'
                        },
                        {
                            value: '1',
                            label: 'Fee'
                        },
                        {
                            value: '2',
                            label: 'Adjust'
                        },
                        {
                            value: '3',
                            label: 'Deposit'
                        },
                    ],

                    optionsOfSelectVendor: [
                        {
                            value: '1',
                            label: 'Vite USA'
                        },
                        {
                            value: '2',
                            label: 'Easygo warehouse'
                        },
                    ],
                },

                tableData: [
                    {
                        date: '09/15/2021 11:19',
                        type: 'Adjust',
                        balance: '-86.82',
                        amount: '72.48',
                        labelid: ['1631634478501000B48'],
                        labeltype: '1',
                    },
                    {
                        date: '09/15/2021 11:19',
                        type: 'Adjust',
                        balance: '-86.82',
                        amount: '-72.48',
                        labelid: ['1631634478501000B48', '1631674999258002B96'],
                        labeltype: '2',
                    },
                ],

                //dialog
                //details
                dialogDetailsVisible: false,
                dialogDetailsForm: {},

                //Online payment
                dialogFormOnlinePaymentVisible: false,
                dialogOPForm: {
                    radiooftop: '1',
                    amount: '',
                    receiptemail: 'unitedelectronicsdeals@gmail.com',
                    address: '',
                    city: '',
                    zip: '',
                    cardnumber: '',
                    cardholdername: '',
                    expiration: '',
                    cvc: '',

                    bankname: '',
                    routingnumber: '',
                    accountnumber: '',
                },
                radioValue: '1',
            }
        },
        methods: {
            getRowhandleDetails(row) {
                let data = {
                    trackingnumber: '283665060034',
                    estimateddelivery: '09/15/2021 11:19',
                    servicetype: 'FedEx Home Delivery',
                    weight: '10',
                    billingweight: '15',
                    dimensions: '20"/ 16"/ 10"',
                    shipper: 'United Electronics Deals, , 15009 Manchester Rd, Ballwin, MO 63011',
                    recipient: 'Sara Khorzani, , 370 LAKE CAROLINE DR, RUTHER GLEN, VA 22546',
                    zone: '5',
                    shipmentweight: '10',
                    shipmentbillingweight: '15',
                    discountedpostageamount: '8.29',
                    surchargefedExGroundFuelAmount: '0.92',
                    surchargeresidentialDeliverySurchargeAmount: '2.17',

                    labelid: [],
                }

                this.dialogDetailsForm = data
                this.dialogDetailsForm.labelid = row.labelid

                this.dialogDetailsForm.valueOflabelid = row.labelid[0]
                this.dialogDetailsVisible = true
            },
            radioChange(val) {
                this.radioValue = val
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

    .topMenu {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .betweento {
        display: flex;
        justify-content: space-between;

    }

    .widthToAll {
        width: 100%;
    }

    .flexTo {
        display: flex;
    }

    .flexToLeft {
        display: flex;
        justify-content: flex-end;
    }

    .padright {
        padding-right: 15px;
    }

    .fontweight {
        font-weight: bolder;
        margin-bottom: 15px;
    }

    .topToMar {
        margin-top: 10px;
    }

    .sizeofspan {
        font-size: 12px;
        margin-top: 10px
    }

    .centerTo {
        display: flex;
        justify-content: center;
    }
</style>