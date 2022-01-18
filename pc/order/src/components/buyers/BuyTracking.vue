<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2">
                <el-col :span="12">
                    <el-row class="block-col-2">
                        <el-col :span="11">
                            <el-button @click="getRowFormSon('','add')">Add an buy tracking</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <el-divider></el-divider>

        <div>
            <el-card style="margin-top: 20px">
                <el-form :model="formFather">
                    <el-row>
                        <el-col :span="6">
                            <div class="topSpan">
                                Merchant
                            </div>
                            <el-form-item>
                                <el-select v-model="formFather.merchant" placeholder="----">
                                    <el-option
                                            v-for="item in formStruct.optionsOfMerchant"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                source
                            </div>
                            <el-form-item>
                                <el-select v-model="formFather.source" placeholder="----">
                                    <el-option
                                            v-for="item in formStruct.optionsOfSource"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Ship to address
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Ship to address"
                                        v-model="formFather.shiptoaddress"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="topSpan">
                                Date
                            </div>
                            <el-form-item>
                                <el-date-picker
                                        v-model="formFather.startdate"
                                        type="date"
                                        placeholder="Start date">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                To
                            </div>
                            <el-form-item>
                                <el-date-picker
                                        v-model="formFather.enddate"
                                        type="date"
                                        placeholder="End date">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Destination
                            </div>
                            <el-form-item>
                                <el-select v-model="formFather.destination" placeholder="----">
                                    <el-option
                                            v-for="item in formStruct.optionsOfDestination"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="topSpan">
                                Item name
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Item name"
                                        v-model="formFather.itemname"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Status
                            </div>
                            <el-form-item>
                                <el-select v-model="formFather.status" placeholder="----">
                                    <el-option
                                            v-for="item in formStruct.optionsOfStatus"
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
                            <div class="topSpan">
                                Order id
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Order id"
                                        v-model="formFather.orderid"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Tracking number
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Tracking number"
                                        v-model="formFather.trackingnumber"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Web user
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Web user"
                                        v-model="formFather.webuser"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="20" style="display: flex;justify-content: flex-end">
                            <div style="width: 250px">
                                <el-button @click="" suffix-icon="el-icon-search">
                                    Search
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
        </div>

        <div class="body">
            <Table :tableData="tableData"
                   @func="getRowFormSon"
                   propsMsg="active"/>
        </div>

        <!--        Edit-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Please fill in buy tracking information"
                width="95%"
                :visible.sync="dialogFormEditVisible">
            <el-card style="margin-top: 5px">
                <el-form :model="form">
                    <el-row>
                        <el-col :span="6">
                            <div class="topSpan">
                                Order date
                            </div>
                            <el-form-item>
                                <el-date-picker
                                        v-model="form.orderdate"
                                        type="date"
                                        placeholder="Order date">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Item Link
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Item Link"
                                        v-model="form.itemlink"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Item name
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Item name"
                                        v-model="form.itemname"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="topSpan">
                                Unit cost
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Unit cost"
                                        v-model="form.unitcost"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Unit take
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Unit take"
                                        v-model="form.unittake"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Quantity
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Quantity"
                                        v-model="form.quantity"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="topSpan">
                                Merchant
                            </div>
                            <el-form-item>
                                <el-select v-model="form.merchant" placeholder="----">
                                    <el-option
                                            v-for="item in formStruct.optionsOfMerchant"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Web user
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Web user"
                                        v-model="form.webuser"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Destination
                            </div>
                            <el-form-item>
                                <el-select v-model="form.destination" placeholder="----">
                                    <el-option
                                            v-for="item in formStruct.optionsOfDestination"
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
                            <div class="topSpan">
                                source
                            </div>
                            <el-form-item>
                                <el-select v-model="form.source" placeholder="----">
                                    <el-option
                                            v-for="item in formStruct.optionsOfSource"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Ship to address
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Ship to address"
                                        v-model="form.shiptoaddress"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Order id
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Order id"
                                        v-model="form.orderid"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="topSpan">
                                Delivered date
                            </div>
                            <el-form-item>
                                <el-date-picker
                                        v-model="form.delivereddate"
                                        type="date"
                                        placeholder="Delivered date">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Source id
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Source id"
                                        v-model="form.sourceid"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Status
                            </div>
                            <el-form-item>
                                <el-select v-model="form.status" placeholder="----">
                                    <el-option
                                            v-for="item in formStruct.optionsOfStatus"
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
                            <div class="topSpan">
                                Carrier
                            </div>
                            <el-form-item>
                                <el-select v-model="form.carrier" placeholder="----">
                                    <el-option
                                            v-for="item in formStruct.optionsOfCarrier"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Tracking number
                            </div>
                            <el-form-item>
                                <el-input
                                        placeholder="Tracking number"
                                        v-model="form.trackingnumber"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <div class="topSpan">
                                Note
                            </div>
                            <el-form-item>
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 2, maxRows: 4}"
                                        placeholder="Note"
                                        v-model="form.note">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <el-row>
                    <el-col :span="20" class="dialogfooter">
                        <el-button @click="dialogFormEditVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="dialogFormEditVisible = false" v-show="type === 'add'">Add
                        </el-button>
                        <el-button type="primary" @click="dialogFormEditVisible = false" v-show="type === 'edit'">Save
                        </el-button>
                        <el-button type="primary" @click="dialogFormEditVisible = false" v-show="type === 'clone'">Add
                        </el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-dialog>

    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/BuyTracking/BuyTrackingTable.vue')

    import '@/assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table
        },
        data() {
            return {
                inputSearch: '',
                tableData: [
                    {
                        id: '1',
                        orderdate: '2021-08-02',
                        itemlink:
                            ' <a href="https://www.bestbuy.com/site/lenovo-yoga-7i-2-in-1-15-6-touch-screen-laptop-intel-core-i5-8gb-memory-256gb-solid-state-drive-slate-grey/6426705.p?skuId=6426705" target="_blank">' +
                            'https://www.bestbuy.com/site/lenovo-yoga-7i-2-in-1-15-6-touch-screen-laptop-intel-core-i5-8gb-memory-256gb-solid-state-drive-slate-grey/6426705.p?skuId=6426705' +
                            '</a>'
                        ,
                        itemname: 'NEW - Lenovo Yoga 7i 2-in-1 15.6-inch FHD Touchscreen Premium Laptop PC, Intel Quad-Core i5-1135G7, Intel Iris Xe Graphics, 8GB DDR4 RAM, 256GB SSD, Backlit Keyboard, Windows 10 Home 64 bit, Gray',
                        unitcost: '100',
                        unittake: '125',
                        quantity: '1',
                        merchant: 'amazon',
                        webuser: 'suzuka',
                        destination: 'home',
                        shiptoaddress: 'shanghai',
                        orderid: '106',
                        source: 'email',
                        sourceid: '9898',
                        status: 'orderconfirmed',
                        delivereddate: '2021/08/09',
                        carrier: 'UPS',
                        trackingnumber: 'xcxxx1545877',
                        note: 'note',
                    },
                    {
                        id: '2',
                        orderdate: '2021-08-02',
                        itemlink:
                            ' <a href="https://www.bestbuy.com/site/lenovo-yoga-7i-2-in-1-15-6-touch-screen-laptop-intel-core-i5-8gb-memory-256gb-solid-state-drive-slate-grey/6426705.p?skuId=6426705" target="_blank">' +
                            'https://www.bestbuy.com/site/lenovo-yoga-7i-2-in-1-15-6-touch-screen-laptop-intel-core-i5-8gb-memory-256gb-solid-state-drive-slate-grey/6426705.p?skuId=6426705' +
                            '</a>',
                        itemname: 'NEW - Lenovo Yoga 7i 2-in-1 15.6-inch FHD Touchscreen Premium Laptop PC, Intel Quad-Core i5-1135G7, Intel Iris Xe Graphics, 8GB DDR4 RAM, 256GB SSD, Backlit Keyboard, Windows 10 Home 64 bit, Gray',
                        unitcost: '100',
                        unittake: '125',
                        quantity: '1',
                        merchant: 'amazon',
                        webuser: 'suzuka',
                        destination: 'home',
                        shiptoaddress: 'shanghai',
                        orderid: '106',
                        source: 'email',
                        sourceid: '9898',
                        status: 'orderconfirmed',
                        delivereddate: '2021/08/19',
                        carrier: 'UPS',
                        trackingnumber: 'xcxxx1545877',
                        note: 'note',
                    },
                ],

                //dialog
                dialogFormEditVisible: false,

                form: {},
                formFather: {},
                type: '',

                formStruct: {
                    optionsOfMerchant: [
                        {
                            value: 'amazon',
                            label: 'Amazon'
                        },
                        {
                            value: 'walmart',
                            label: 'Walmart'
                        }
                    ],
                    // valueOfMerchant: '',

                    optionsOfSource: [
                        {
                            value: 'email',
                            label: 'Email'
                        },
                        {
                            value: 'viteusa',
                            label: 'Viteusa'
                        }
                    ],
                    // valueOfSource: '',

                    optionsOfDestination: [
                        {
                            value: 'home',
                            label: 'Home'
                        },
                        {
                            value: 'warehouse',
                            label: 'Warehouse'
                        }
                    ],
                    // valueOfShiptoAddress: '',

                    optionsOfStatus: [
                        {
                            value: 'orderplaced',
                            label: 'Order Placed'
                        },
                        {
                            value: 'orderconfirmed',
                            label: 'Order Confirmed'
                        },
                        {
                            value: 'ordercancelled',
                            label: 'Order Cancelled'
                        },
                        {
                            value: 'ordershipped',
                            label: 'Order Shipped'
                        },
                        {
                            value: 'packagedelivered',
                            label: 'Package Delivered'
                        },
                        {
                            value: 'packagerefused',
                            label: 'Package Refused'
                        },
                        {
                            value: 'packageconfirmed',
                            label: 'Package Confirmed'
                        },
                        {
                            value: 'markedasinventory',
                            label: 'Marked as Inventory'
                        },
                        {
                            value: 'outboundshipped',
                            label: 'Outbound Shipped'
                        },
                    ],

                    optionsOfCarrier: [
                        {
                            value: 'ups',
                            label: 'UPS'
                        },
                        {
                            value: 'fedex',
                            label: 'Fedex'
                        }
                    ],
                },
            };
        },
        methods: {
            getRowFormSon(data, type) {
                if (type === 'edit') {
                    this.type = 'edit'
                    this.form = data
                } else if (type === 'add') {
                    this.type = 'add'
                    this.form = {
                        orderdate: '',
                        itemlink: '',
                        itemname: '',
                        unitcost: '',
                        unittake: '',
                        quantity: '',
                        merchant: '',
                        webuser: '',
                        destination: '',
                        shiptoaddress: '',
                        orderid: '',
                        source: '',
                        status: '',
                        delivereddate: '',
                        carrier: '',
                        trackingnumber: '',
                        note: '',
                        startdate: '',
                        enddate: '',
                    }
                } else if (type === 'clone') {
                    this.form = data
                    this.type = 'clone'
                }

                this.dialogFormEditVisible = true
                // console.log(this.form)
            },
        },
    }
</script>

<style scoped lang="less">
    .el-dropdown-link {
        cursor: pointer;
        color: #666666;
        text-decoration: underline;
    }

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

    .topMenu {
        margin-top: 20px;
    }

    .topSpan {
        font-size: 12px;

    }

    .dialogfooter {
        display: flex;
        justify-content: flex-end;
    }
</style>