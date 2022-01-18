<template>
    <div class="body">
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    Label
                </el-menu-item>
                <el-menu-item index="2">
                    Address
                </el-menu-item>
                <el-menu-item index="3">
                    Packaging
                </el-menu-item>
<!--                <el-menu-item index="4">-->
<!--                    Template-->
<!--                </el-menu-item>-->
            </el-menu>
            <span class="spanofTopMenu">
                Balance: $ 76.62
            </span>
        </div>
        <div>
            <ProviderLabel ref="label" msg="" v-show="activeIndex==='1'"/>
            <ProviderAddress ref="address" msg="" v-show="activeIndex==='2'"/>
            <ProviderPackaging ref="packaging" msg="" v-show="activeIndex==='3'"/>
            <Template msg="" v-show="activeIndex==='4'"/>
        </div>
    </div>
</template>

<script>
    const ProviderLabel = () => import('@/components/provider/Outbound/Label/Label/ProviderLabel.vue')
    const ProviderAddress = () => import('@/components/provider/Outbound/Address/ProviderAddress.vue')
    const ProviderPackaging = () => import('@/components/provider/Outbound/Label/Packaging/ProviderPackaging.vue')
    const Template = () => import('@/components/provider/Outbound/Label/Template/ProviderTemplate.vue')

    export default {
        name: "Offer",
        components:{
            ProviderLabel,
            ProviderAddress,
            ProviderPackaging,
            Template,
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
                        this.$refs.label.getListOutboundLabelList();
                        break;
                    case '2':
                        this.$refs.address.queryOutboundAddress();
                        break;
                    case '3':
                        this.$refs.packaging.querypackagesizetemplate();
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
        display: flex;justify-content: space-between;
    }

    .spanofTopMenu{
        margin-top: 20px;
    }

</style>