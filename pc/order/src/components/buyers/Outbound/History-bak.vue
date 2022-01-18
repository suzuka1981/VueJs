<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2">
                <el-col :span="8" style="margin-top: 15px;display: flex;justify-content: flex-start;">
                    <div style="width:40%;margin-right: 10px;">
                        <span class="demonstration">Organization name</span>

                        <el-select v-model="valueOfOrganization" placeholder="-- All --">
                            <el-option
                                    v-for="item in optionsOfOrganization"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                    <div style="width:60%;margin-top: 20px">
                        <el-input
                                placeholder="Product name / Offer id / Org name / Tracking"
                                v-model="inputSearch"
                        >
                        </el-input>
                    </div>
                </el-col>

                <el-col :span="14" style="display: flex;justify-content: flex-end;">
                    <div>
                        <span class="demonstration">End date</span>
                        <el-date-picker
                                v-model="endDate"
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

        <div class="body">
            <Table :tableData="tableData"
                   @func="funhandleDetailsClick"
                   propsMsg="active"/>
        </div>

        <!--        confirm-->
        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Attachment details" :visible.sync="dialogFormConfirmVisible" width="70%">
            <el-card class="box-card">
                <el-row class="block-col-2">
                    <el-col :span="12">
                        <span class="spanlabel">
                            Shipment ID:
                        </span>

                        {{form.shipmentid}}
                    </el-col>
                    <el-col :span="10">
                        <div v-show="form.tracking !== ''">
                            <span class="spanlabel">
                                Tracking:
                            </span>

                            {{form.tracking}}
                        </div>
                    </el-col>
                </el-row>

                <el-row class="block-col-2" style="margin-top: 10px">
                    <el-col :span="12">
                        <div v-show="form.length > 0 && form.photos.length > 0">
                            <span class="spanlabel">
                                Shipment label:
                            </span>
                            <el-button @click="">Download</el-button>
                        </div>
                    </el-col>
                </el-row>

                <el-row class="block-col-2" style="margin-top: 10px">
                    <el-col :span="12">
                        <span class="spanlabel">
                            Photos::
                        </span>
                    </el-col>
                </el-row>

                <el-row class="block-col-2" style="margin-top: 10px">
                    <el-col :span="22">
                        <div class="demo-image__lazy">
                            <el-image v-for="url in form.photos" :key="url" :src="url" lazy></el-image>
                        </div>
                    </el-col>
                </el-row>

            </el-card>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormTakeVisible = false">Close</el-button>
                <el-button type="primary" @click="dialogFormTakeVisible = false" disabled>Send</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Outbound/comp/HistoryTable.vue')

    import '../../../assets/icon/iconfont.css'

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
                        info: 'Org: ' +
                            '(unitedelectronicsdeals)' +
                            '<br>' +
                            'ID: ' +
                            '1628648087487631',
                        servicetype: 'Normal',
                        outboundshipmentquantity: 'NEW - New Inspiron 15 Touch Laptop (AMD Ryzen™ 5 5500U, 8GB, 256GB SSD)' +
                            '<br>' +
                            'UPC: 884116388470' +
                            '<br>' +
                            'Quantity: 1' +
                            '<br>' +
                            'Other services:',
                        tracking: 'TBA162875787801',
                        pkgqty: '1',
                        Instructions: '非急单，2天内寄走，谢谢',
                        shipmentid: '1628648087487631',
                        photos: ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                            'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                            'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                            'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'],
                        createtime: '08/13/2021 16:05',
                    },
                    {
                        info: 'Org: ' +
                            '(unitedelectronicsdeals)' +
                            '<br>' +
                            'ID: ' +
                            '1628648087487631',
                        servicetype: 'Normal',
                        outboundshipmentquantity: 'NEW - New Inspiron 15 Touch Laptop (AMD Ryzen™ 5 5500U, 8GB, 256GB SSD)' +
                            '<br>' +
                            'UPC: 884116388470' +
                            '<br>' +
                            'Quantity: 1' +
                            '<br>' +
                            'Other services:',
                        tracking: '',
                        pkgqty: '3',
                        Instructions: '',
                        shipmentid: '1628648087487631',
                        photos: [],
                        createtime: '08/13/2021 16:05',
                    },

                ],
                gridData: [{
                    sitename: 'Easygo warehouse - 55 Harvey Road',
                    organizationid: 'XRV',
                    address: '55 Harvey Road, Unit XRV, Londonderry, New Hampshire 03053\n'
                },
                ],

                optionsOfOrganization: [
                    {
                        value: 'all',
                        label: '-- All --'
                    },
                    {
                        value: 'unitedelectronicsdeals',
                        label: 'unitedelectronicsdeals'
                    }
                ],
                valueOfOrganization: '',

                //dialog
                dialogFormConfirmVisible: false,
                dialogFormCancelVisible: false,
                dialogWarehouseTableVisible: false,
                form: [],
                formLabelWidth: '120px',

                endDate: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
            };
        },
        methods: {
            funhandleDetailsClick(data) {
                this.form = data
                this.dialogFormConfirmVisible = true
                // console.log(this.form)
            },
            // getRowCancelFormSon(data) {
            //     this.form = data
            //     this.dialogFormCancelVisible = true
            // },
            // getRowWarehouseClickFormSon(data) {
            //     this.form = data
            //     this.dialogWarehouseTableVisible = true
            // }
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

    .spanlabel {
        font-size: 20px;
        font-family: "Times New Roman", Times, serif;
    }

</style>