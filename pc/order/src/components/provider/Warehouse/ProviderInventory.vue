<template>
    <div class="body">
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    Active
                </el-menu-item>
                <el-menu-item index="2">
                    Archived
                </el-menu-item>
            </el-menu>

        </div>
        <div>
            <ProviderInventoryActive ref="active" msg="" v-show="activeIndex==='1'"/>
            <ProviderInventoryArchived
                    ref="archived"
                    msg="" v-show="activeIndex==='2'"/>
<!--            <ProviderPackaging msg="" v-show="activeIndex==='3'"/>-->
<!--            <Template msg="" v-show="activeIndex==='4'"/>-->
        </div>
    </div>
</template>

<script>
    const ProviderInventoryActive = () => import('@/components/provider/Warehouse/Inventory/ProviderInventoryActive.vue')
    const ProviderInventoryArchived = () => import('@/components/provider/Warehouse/Inventory/ProviderInventoryArchived.vue')


    export default {
        name: "ProviderInventory",
        components:{
            ProviderInventoryActive,
            ProviderInventoryArchived,

        },
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key

                if(key == '1') {
                    this.$refs.active.getListProduct()
                } else if(key == '2'){
                    this.$refs.archived.getListProduct()
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .topMenu{
        margin-bottom: 10px;
        display: flex;justify-content: space-between;
    }


</style>