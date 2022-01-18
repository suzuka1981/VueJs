<template>
    <div class="body">
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    By tracking
                </el-menu-item>
                <el-menu-item index="2">
                    Favorite
                </el-menu-item>

            </el-menu>
        </div>
        <div>
            <PackageByTracking msg="" v-show="activeIndex==='1'"/>
        </div>

        <div>
            <PackageFavorite msg="" v-show="activeIndex==='2'"/>
        </div>
    </div>
</template>

<script>
    const PackageByTracking = () => import('@/components/buyers/Warehouse/PackageByTracking .vue')
    const PackageFavorite = () => import('@/components/buyers/Warehouse/PackageFavorite.vue')


    export default {
        name: "Offer",
        components:{
            PackageByTracking,
            PackageFavorite,
        },
        data() {
            return {
                activeIndex: '1',
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
    .topMenu{
        margin-bottom: 10px;
    }

</style>