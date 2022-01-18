<template>
    <div class="body">
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
<!--                <el-menu-item index="1">-->
<!--                    By tracking-->
<!--                </el-menu-item>-->
                <el-menu-item index="2">
                    By upc/date
                </el-menu-item>
<!--                <el-menu-item index="3">-->
<!--                    Unlinked packages-->
<!--                </el-menu-item>-->
<!--                <el-menu-item index="4">-->
<!--                    Abnormal packages-->
<!--                </el-menu-item>-->
<!--                <el-menu-item index="5">-->
<!--                    Sku requests-->
<!--                </el-menu-item>-->
            </el-menu>

        </div>
        <div>
            <ProviderPackageBytracking msg="" v-show="activeIndex==='1'"/>
            <ProviderPackageBypcdate msg="" v-show="activeIndex==='2'"/>
            <ProviderUnlinkedPackages msg="" v-show="activeIndex==='3'"/>
            <ProviderAbnormalPackages msg="" v-show="activeIndex==='4'"/>
            <SkuRequestsTable msg="" v-show="activeIndex==='5'"/>
        </div>
    </div>
</template>

<script>
    const ProviderPackageBytracking = () => import('@/components/provider/Warehouse/Package/ProviderPackageBytracking.vue')
    const ProviderPackageBypcdate = () => import('@/components/provider/Warehouse/Package/ProviderPackageBypcdate.vue')
    const ProviderUnlinkedPackages = () => import('@/components/provider/Warehouse/Package/ProviderUnlinkedPackages.vue')
    const ProviderAbnormalPackages = () => import('@/components/provider/Warehouse/Package/ProviderAbnormalPackages.vue')
    const SkuRequestsTable = () => import('@/components/provider/Warehouse/Package/ProviderSkuRequests.vue')


    export default {
        name: "ProviderPackage",
        components: {
            ProviderPackageBytracking,
            ProviderPackageBypcdate,
            ProviderUnlinkedPackages,
            ProviderAbnormalPackages,
            SkuRequestsTable,
        },
        data() {
            return {
                activeIndex: '2',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key
            }
        }
    }
</script>

<style scoped lang="less">
    .topMenu {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }


</style>