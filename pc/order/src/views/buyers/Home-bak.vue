<template>
    <div class="home" v-title data-title="Home">
        <div class="menutop">
            <TopMenu @func="menuToSelect"/>
        </div>

        <div v-show="menuSelect==='2'">
            <Offer msg=""/>
        </div>

        <div v-show="menuSelect==='3'">
            <Task msg=""/>
        </div>

        <div v-show="menuSelect==='4'">
            <Outbound msg=""/>
        </div>

        <div v-show="menuSelect==='5-1'">
            <Inventory msg=""/>
        </div>

        <div v-show="menuSelect==='5-2'">
<!--            <Package msg=""/>-->
        </div>

        <div v-show="menuSelect==='6'">
            <Payment msg=""/>
        </div>

        <div v-show="menuSelect==='7'">
            <Profile msg=""/>
        </div>

        <div v-show="menuSelect==='9'">
            <BuyTracking msg=""/>
        </div>

        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Notifications"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <span>There is no notification now</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">Close</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    const TopMenu = () => import('@/components/buyers/Menu.vue')
    const Offer = () => import('@/components/buyers/Offer.vue')
    const Task = () => import('@/components/buyers/Task.vue')
    const Outbound = () => import('@/components/buyers/Outbound.vue')
    const Inventory = () => import('@/components/buyers/Inventory.vue')
    // const Package = () => import('@/components/buyers/Package.vue')
    const Payment = () => import('@/components/buyers/Payment.vue')
    const Profile = () => import('@/components/buyers/Profile.vue')
    const BuyTracking = () => import('@/components/buyers/BuyTracking.vue')


    export default {
        name: 'Home',
        components: {
            TopMenu,
            Offer,
            Task,
            Outbound,
            Inventory,
            // PackagePackage,
            Payment,
            Profile,
            BuyTracking,
        },
        data() {
            return {
                menuSelect: '2',
                dialogVisible: false
            };
        },
        methods: {
            menuToSelect(key) {
                switch (key) {
                    case '1':
                        this.dialogVisible = true
                        // this.menuSelect = key;
                        break;
                    default:
                      this.menuSelect = key;
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .menutop {
        width: 100%;
        background-color: #545c64;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        margin-right: 30px;
    }
</style>