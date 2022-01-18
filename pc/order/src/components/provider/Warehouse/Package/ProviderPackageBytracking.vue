<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="4">
                    <el-input placeholder="Tracking" v-model="trackingInput"></el-input>
                </el-col>
                <el-col :span="4" class="leftof">
                    <el-button @click="">Search</el-button>
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
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Warehouse/Package/PackageComp/PackageBytrackingTable.vue')

    export default {
        name: "ProviderPackageBytracking",
        components:{
            Table,
        },
        data() {
            return {
                trackingInput:'',

                tabledata:[{

                }],
            }
        },
    }
</script>

<style scoped lang="less">
    .leftof{
        margin-left: 5px;
    }
</style>