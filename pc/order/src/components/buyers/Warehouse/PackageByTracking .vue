<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2">
                <el-col :span="11">
                    <el-row class="block-col-2">
                        <el-col :span="10">
                            <span class="demonstration">Tracking</span>
                            <el-input
                                    placeholder="Tracking"
                                    v-model="inputSearch"
                            >
                            </el-input>
                        </el-col>

                        <el-col :span="7" style="margin-left: 3px">
                            <el-button @click="" style="margin-top: 21px">Search</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <div class="body">
            <Table :tableData="tableData"
                   propsMsg="active"/>
        </div>

    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Warehouse/Package/PackageByTrackingTable.vue')

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
                        trackingnumber: '1',
                        upc: '12347',
                        quantity: '6',
                        warehouse: '1',
                        confirmed: 'Dell - Inspiron 15.6" FHD Touch Laptop -Intel Core i5-1035G1 - 12GB RAM - 256 GB SSD - Black',
                        received: '575',
                    },
                    {
                        trackingnumber: '2',
                        upc: '12347',
                        quantity: '6',
                        warehouse: '1',
                        confirmed: 'Dell - Inspiron 15.6" FHD Touch Laptop -Intel Core i5-1035G1 - 12GB RAM - 256 GB SSD - Black',
                        received: '575',
                    },
                ],

            };
        },
        methods: {

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
        /deep/.el-input__inner {
            background: url('../../../assets/img/car.png') no-repeat;
            background-size: 16px 14px;
            background-position: 4px 10px;
            padding: 0px 0 0 26px;
            box-sizing: border-box;
            font-size: 14px;
        }
    }

</style>