<template>
    <div class="body">
        <div class="body">
            <Table :tableData="tableData" @func="getRowFormSon" propsMsg="expired"/>
        </div>

        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Take Offer" :visible.sync="dialogFormTakeVisible">
            <el-form :model="form">
                <span style="margin-right: 20px">
                    Offer ID:{{form.id}}
                </span>
                <span>
                    Organization: {{form.Organization}}
                </span>

                <div style="font-size: 12px;margin-top: 10px">
                    Product
                </div>
                <el-form-item>
                    <el-input
                            placeholder="Offer"
                            v-model="form.offer"
                            :disabled="true"
                            prefix-icon="el-icon-shopping-cart-full"
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="form.region" placeholder="local_shipping *" class="selectprefix">
                        <el-option label="Warehouse" value="Warehouse"></el-option>
                        <el-option label="Self" value="Self"></el-option>
                    </el-select>
                </el-form-item>

                <div style="font-size: 12px;margin-top: 10px">
                    Price
                </div>
                <el-form-item>
                    <el-input
                            placeholder="Price"
                            v-model="form.price"

                            prefix-icon="iconfont icon-1"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                            placeholder="Quantity"
                            v-model="form.quantity"
                            prefix-icon="iconfont icon-quantity"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormTakeVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormTakeVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Offer/comp/ReportTable.vue')

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
                        productid: '1',
                        productname: 'productname',
                        username: 'username',
                        quantity: '6',
                        warehousesite: 'Warehousesite',
                    },
                ],

                //dialog
                dialogFormTakeVisible: false,
                form: [],
                formLabelWidth: '120px'
            };
        },
        methods: {
            getRowFormSon(data) {
                this.form = data
                this.form.quantity = ''
                this.dialogFormTakeVisible = true
                // console.log(this.form)
            }
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

    .selectprefix {
        /deep/ .el-input__inner {
            background: url('../../../assets/img/car.png') no-repeat;
            background-size: 16px 14px;
            background-position: 4px 10px;
            padding: 0px 0 0 26px;
            box-sizing: border-box;
            font-size: 14px;
        }
    }

</style>