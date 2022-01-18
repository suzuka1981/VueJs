<template>
    <div class="body">
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    Active
                </el-menu-item>
                <el-menu-item index="2">
                    Proposed
                </el-menu-item>
                <el-menu-item index="4">
                    Expired
                </el-menu-item>
                <el-menu-item index="3">
                    Archived
                </el-menu-item>
<!--                <el-menu-item index="4">-->
<!--                    Report-->
<!--                </el-menu-item>-->
            </el-menu>
        </div>
        <div>
            <Active ref="active" msg="" v-show="activeIndex==='1'"/>
            <Proposed ref="proposed" msg="" v-show="activeIndex==='2'"/>
            <Archived ref="archived" msg="" v-show="activeIndex==='3'"/>
            <Expired ref="expired" msg="" v-show="activeIndex==='4'"/>
        </div>
    </div>
</template>

<script>
    const Active = () => import('@/components/provider/Offer/ProviderActive.vue')
    const Expired = () => import('@/components/provider/Offer/ProviderExpired.vue')
    const Proposed = () => import('@/components/provider/Offer/ProviderProposed.vue')
    const Archived = () => import('@/components/provider/Offer/ProviderArchived.vue')
    // const Report = () => import('@/components/buyers/Offer/Report.vue')

    export default {
        name: "Offer",
        components:{
            Active,
            Proposed,
            Archived,
            Expired,
            // Report,
        },
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key

                switch (key) {
                    case '1':
                        this.$refs.active.getListOfferActive();
                        break;
                    case '2':
                        this.$refs.proposed.getListOfferActive();
                        break;
                    case '3':
                        this.$refs.archived.getListOfferActive();
                        break;
                    case '4':
                        this.$refs.expired.getListOfferActive();
                        break;

                    default:

                }
            }
        }
    }
</script>

<style scoped lang="less">
    .topMenu{
        margin-bottom: 10px;
    }
</style>