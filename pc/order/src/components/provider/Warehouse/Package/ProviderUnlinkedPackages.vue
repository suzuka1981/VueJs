<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="9" :offset="14" class="betweenofcol">
                    <div>
                        <span class="demonstration">Start date</span>
                        <el-date-picker
                                v-model="startDate"
                                type="date"
                                placeholder="Select date"
                                :picker-options="pickerOptions"
                        >
                        </el-date-picker>
                    </div>
                    <div>
                        <span class="demonstration">end date</span>
                        <el-date-picker
                                v-model="endDate"
                                type="date"
                                placeholder="Select date"
                        >
                        </el-date-picker>
                    </div>
                    <div>
                        <el-button @click="" class="topofall">Search
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="tablebody">
            <Table :tableData="tabledata"
                   @funcDetail="handleDetail"
                   @funcLink="handleLinkClick"
            />
        </div>

        <div class="dialog">
            <!--            detail page info-->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Package info" :visible.sync="dialogFormVisible" width="90%">
                <el-form :model="dialogForm">
                    <el-card class="heightofcard">
                        <el-card class="cardofbottom">
                            <div>
                                <span class="bolderofall">Note: </span>
                                <span>UPC: </span>
                                <span>{{dialogForm.upc}}</span>
                                <span>total Qty: </span>
                                <span>{{dialogForm.quantity}}</span>
                                <span>normal Qty: </span>
                                <span>{{dialogForm.quantity}}</span>
                                <span>abnormal Qty: </span>
                                <span>{{dialogForm.quantity}}</span>
                            </div>
                            <div>
                                <el-button
                                        class="topofall"
                                        v-show="imageButtonShow(dialogForm)"
                                        @click="handleImageView(dialogForm)">Image view
                                </el-button>
                            </div>
                        </el-card>

                        <el-card v-for="(item,index) in dialogForm.messagelist" :key="index" class="cardofbottom">
                            <div>
                                <span class="bolderofall tobluecolor">unitedelectronicsdeals &nbsp;</span>
                                <span>{{item.date}}</span>
                            </div>
                            <div class="topofall">
                                {{item.msg}}
                            </div>
                            <div class="topofall">
                                <el-button
                                        v-show="imageButtonShow(item)"
                                        @click="handleImageView(dialogForm)">Image view
                                </el-button>
                            </div>
                        </el-card>
                    </el-card>

                    <div>
                        <div style="font-size: 12px;margin-top: 10px;text-align: right">
                            Message quantity: 0/200
                        </div>
                        <el-form-item>
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="unitedelectronicsdeals"
                                    aria-label="unitedelectronicsdeals"
                                    v-model="dialogForm.message">
                            </el-input>
                        </el-form-item>
                    </div>

                    <div>
                        <div class="iconofupload">
                            <i class="el-icon-upload"></i>
                            <el-upload
                                    class="upload-demo"
                                    ref="upload"
                                    action="#"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="dialogForm.fileList"
                                    :auto-upload="false">
                                <el-button slot="trigger" size="small">Select file</el-button>
                            </el-upload>
                        </div>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Close</el-button>
                    <el-checkbox class="leftandright" v-model="dialogForm.checkedMarkunread">Mark unread</el-checkbox>
                    <el-button type="primary" @click="dialogFormVisible = false">Send</el-button>
                </div>
            </el-dialog>

            <!-- Link product -->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Link product" :visible.sync="dialogFormLinkVisible" width="70%">
                <el-form :model="dialogLinkForm">
                    <el-row>
                        <el-col :span="18">
                            <el-form-item>
                                <el-input
                                        prefix-icon="el-icon-c-scale-to-original"
                                        v-model="dialogLinkForm.name"
                                        placeholder="Names" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" class="leftofcol">
                            <el-form-item>
                                <el-checkbox v-model="dialogLinkForm.checkedUseexistproduct">Use exist product
                                </el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="11">
                            <el-form-item>
                                <div class="spanofcenter">
                                    Price
                                </div>
                                <el-input
                                        class="selectwidth"
                                        prefix-icon="iconfont icon-1"
                                        v-model="dialogLinkForm.price"
                                        placeholder="Price" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item>
                                <div class="spanofcenter">
                                    Condition
                                </div>
                                <el-select
                                        class="selectwidth"
                                        v-model="dialogLinkForm.condition"
                                        placeholder="-- All --">
                                    <el-option
                                            v-for="item in formstruct.optionsOfCondition"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item>
                        <el-input
                                prefix-icon="el-icon-aim"
                                v-model="dialogLinkForm.asin"
                                placeholder="ASIN" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input
                                prefix-icon="el-icon-aim"
                                v-model="dialogLinkForm.sku"
                                placeholder="SKU" autocomplete="off"></el-input>
                    </el-form-item>

                    <div class="leftofdiv">
                        <el-form-item class="selectwidth">
                            <el-input
                                    prefix-icon="el-icon-s-flag"
                                    v-model="dialogLinkForm.upcsku"
                                    placeholder="UPC" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-button
                                type="text"
                                size="small"
                                @click="" disabled> Check archive
                        </el-button>
                    </div>

                    <el-form-item>
                        <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="Note"
                                v-model="dialogLinkForm.note">
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
    const Table = () => import('@/components/provider/Warehouse/Package/PackageComp/UnlinkedPackagesTable.vue')

    export default {
        name: "ProviderPackageBytracking",
        components: {
            Table,
        },
        data() {
            return {
                startDate: '',
                endDate: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },

                tabledata: [
                    {
                        trackingnumber: 'TBA165362443701',
                        upcsku: '193199796035',
                        description: 'new - Acer Nitro 5 Gaming Laptop, 9th Gen Intel Core i5-9300H, NVIDIA GeForce GTX 1650, 15.6" Full HD IPS Display, 8GB DDR4, 256GB NVMe SSD, Wi-Fi 6, Backlit Keyboard, Alexa Built-in, AN515-54-5812\t',
                        quantity: '2',
                        warehouse: 'New Hampshire - 03053 - 55 Harvey Road',
                        confirmed: '09/10/2021 04:44',
                        linked: '09/10/2021 04:44',
                        received: '09/10/2021 04:44',
                        message: '',
                        urls: ['http://localhost:8080/Upload/picsample.png', 'http://localhost:8080/Upload/picsample.png', 'http://localhost:8080/Upload/picsample.png'],
                        messagelist: [
                            {
                                date: '09/06/2021 23:59',
                                msg: '你好，请用这个label return掉，谢谢',
                                urls: [],
                            },
                            {
                                date: '09/06/2021 23:59',
                                msg: '你好，请用这个label return掉，谢谢',
                                urls: ['http://localhost:8080/Upload/picsample.png', 'http://localhost:8080/Upload/picsample.png', 'http://localhost:8080/Upload/picsample.png'],
                            },
                        ],
                        fileList: [],
                        checkedUseexistproduct: true,
                        checkedMarkunread: false,
                    },
                    {
                        trackingnumber: 'TBA165362443701',
                        upcsku: '193199796035',
                        description: 'new - Acer Nitro 5 Gaming Laptop, 9th Gen Intel Core i5-9300H, NVIDIA GeForce GTX 1650, 15.6" Full HD IPS Display, 8GB DDR4, 256GB NVMe SSD, Wi-Fi 6, Backlit Keyboard, Alexa Built-in, AN515-54-5812\t',
                        quantity: '2',
                        warehouse: 'New Hampshire - 03053 - 55 Harvey Road',
                        confirmed: '',
                        linked: '',
                        received: '09/10/2021 04:44',
                        message: '',
                        urls: [],
                        messagelist: [
                            {
                                date: '09/06/2021 23:59',
                                msg: '你好，请用这个label return掉，谢谢',
                                urls: [],
                            }
                        ],
                        fileList: [],
                        checkedUseexistproduct: true,
                        checkedMarkunread: false,
                    },
                ],

                formstruct: {
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

                //dialog
                //detail
                dialogFormVisible: false,
                dialogForm: {
                    urls: [],
                    fileList: [],
                },

                //link product
                dialogFormLinkVisible: false,
                dialogLinkForm: {},
            }
        },
        methods: {
            handleDetail(row) {
                this.dialogForm = row
                this.dialogFormVisible = true
            },
            handleLinkClick(row) {
                this.dialogLinkForm = row
                this.dialogFormLinkVisible = true
            },
            handleImageView(row) {
                //跳转新页面router写法
                const routeData = this.$router.resolve({
                    name: 'ViewImages',
                    query: {urls: row.urls, rowlength: row.urls.length},
                    // params: {urls: row}
                })

                window.open(routeData.href, '_blank');
            },
            imageButtonShow(row) {
                // console.log(this.dialogForm.urls.length)
                return row.urls.length > 0
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
        },
        computed: {},
    }
</script>

<style scoped lang="less">
    .betweenofcol {
        display: flex;
        justify-content: space-between;
    }

    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 12px;
        /*margin-bottom: 5px;*/
    }

    .topofall {
        margin-top: 15px;
    }

    .heightofcard {
        height: 300px;
        overflow-y: auto;
    }

    .bolderofall {
        font-weight: bolder;
    }

    /deep/ .el-dialog__body {
        padding-bottom: 0px;
    }

    .tobluecolor {
        color: #42b983;
    }

    .cardofbottom {
        margin-bottom: 5px;
    }

    .iconofupload {
        display: flex;
        font-size: 25px;

        i {
            margin-top: 7px;
            margin-right: 5px;
        }
    }

    .el-form-item {
        margin-bottom: 5px;
    }

    .spanofcenter {
        font-size: 10px;
    }

    /deep/ .selectwidth {
        width: 70%;
    }

    .leftofdiv {
        display: flex;
        justify-content: left;

        .el-button {
            margin-top: -20px;
            margin-left: 10px;
        }
    }

    .leftofcol {
        padding-left: 15px;
    }

    .leftandright{
        margin-left: 10px;
        margin-right: 10px;
    }

</style>