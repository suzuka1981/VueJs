<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="4" :offset="20">
                    <el-input placeholder="Search"
                              suffix-icon="el-icon-search"
                              v-model="searchInput"></el-input>
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
    const Table = () => import('@/components/provider/Warehouse/Package/PackageComp/AbnormalPackagesTable.vue')

    export default {
        name: "ProviderPackageBytracking",
        components:{
            Table,
        },
        data() {
            return {
                searchInput:'',

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