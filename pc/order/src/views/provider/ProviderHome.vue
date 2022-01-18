<template>
    <div class="home" v-title data-title="Home">
        <div class="menutop">
            <TopMenu @func="menuToSelect"/>
        </div>

        <!--        <div v-show="menuSelect==='2'">-->
        <!--            <Offer msg=""/>-->
        <!--        </div>-->

        <!--        <div v-show="menuSelect==='3'">-->
        <!--            <Task msg=""/>-->
        <!--        </div>-->

        <!--        <div v-show="menuSelect==='4'">-->
        <!--            <Outbound msg=""/>-->
        <!--        </div>-->

        <!--        <div v-show="menuSelect==='5-1'">-->
        <!--            <Inventory msg=""/>-->
        <!--        </div>-->

        <!--        <div v-show="menuSelect==='5-2'">-->
        <!--&lt;!&ndash;            <Package msg=""/>&ndash;&gt;-->
        <!--        </div>-->

        <!--        <div v-show="menuSelect==='6'">-->
        <!--            <Payment msg=""/>-->
        <!--        </div>-->

        <!--        <div v-show="menuSelect==='7'">-->
        <!--            <Profile msg=""/>-->
        <!--        </div>-->
        <router-view></router-view>

        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Notifications（待做）"
                :visible.sync="dialogVisible"
                width="75%"
        >
            <span>{{notificationsForm.title}}</span>
            <el-card>
                <div v-html="notificationsForm.note">
                </div>
            </el-card>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">Close</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    const TopMenu = () => import('@/components/provider/ProviderMenu.vue')
    // const Offer = () => import('@/components/provider/ProviderOffer.vue')
    // const Task = () => import('@/components/provider/ProviderTask.vue')
    // const Outbound = () => import('@/components/buyers/Outbound.vue')
    // const Inventory = () => import('@/components/buyers/Inventory.vue')
    // // const Package = () => import('@/components/buyers/Package.vue')
    // const Payment = () => import('@/components/buyers/Payment.vue')
    // const Profile = () => import('@/components/buyers/Profile.vue')


    export default {
        name: 'Home',
        components: {
            TopMenu,
            // Offer,
            // Task,
            // Outbound,
            // Inventory,
            // // PackagePackage,
            // Payment,
            // Profile,
        },
        data() {
            return {
                // menuSelect: '2',
                dialogVisible: false,

                notificationsForm: {
                    title: 'Easygo warehouse',
                    note: '<span style="font-weight: bolder">' +
                        'Easygo warehouse 02/09/2020' +
                        '</span>' +
                        '<br>' +
                        '迅威仓储 55 Harvey 注意事项' +
                        '<br>' +
                        '1. Normal发货，正常出库时间是2个工作日之内（节假日除外），出货时间会根据淡旺季变化进行调整；' +
                        '<br>' +
                        '2.Expedite发货，最晚截止日期2PM EST，可处理当天发货。晚于12PM EST将会顺延到第二天发货；' +
                        '<br>' +
                        '3.Other Services,请根据发货需要的要求来选择不同的服务，目前可提供包裹SN scan;Photo;UPC barcode label的服务。若有其他增值服务，请提前跟客服联系；' +
                        '<br>' +
                        '4.退货：如果包裹有问题，需要退货，将会出现在abnormal packages 的页面。并且可以在里面和仓库沟通，以及上传退货label。如果不需要退货，我们可将产品重新标记成可售；' +
                        '<br>' +
                        '5.入库时间：正常入库是1-3个工作日之内（节假日除外），入库时间会根据淡旺季变化进行调整；' +
                        '<br>' +
                        '其他要求：请通知您的护士在amazon下单时候，去掉Sat/Sun delivery的选项。为了防止amazon driver出现周末投递的情况，以免造成不必要的损失；' +
                        '<br>' +
                        'UPS/FEDEX/USPS我们都会要求司机当场扫描投递，仓库的签名是WU，请查询时候注意下签名。若是其他carrier，如lasership，由于他们随意乱扔包裹，仓库对这类快递服务商产生的任何丢失行为，不承担责任。',
                },
            };
        },
        methods: {
            menuToSelect(key) {
                switch (key) {
                    case '1':
                        this.dialogVisible = true
                        // this.menuSelect = key;
                        break;
                    case '2':
                        this.$router.push('/providerhome/provideroffer')
                        break;
                    case '3':
                        this.$router.push('/providerhome/providertask')
                        // this.$router.replace('/providerhome/providertask')
                        break;
                    case '4-1':
                        this.$router.push('/providerhome/providercreate')
                        break;
                    case '4-2':
                        this.$router.push('/providerhome/providerstatus')
                        break;
                    case '4-3':
                        this.$router.push('/providerhome/ProviderLabel')
                        break;
                    case '5-1':
                        this.$router.push('/providerhome/providerinventory')
                        break;
                    case '5-2':
                        this.$router.push('/providerhome/providerPackage')
                        break;
                    case '5-3':
                        this.$router.push('/providerhome/providersite')
                        break;
                    case '5-4':
                        this.$router.push('/providerhome/providersupport')
                        break;
                    case '5-5':
                        this.$router.push('/providerhome/Provideruploadpackages')
                        break;
                    case '6':
                        this.$router.push('/providerhome/providerpayment')
                        break;
                    case '7-1':
                        this.$router.push('/providerhome/providerstaff')
                        break;
                    case '7-2':
                        this.$router.push('/providerhome/providermember')
                        break;
                    case '7-3':
                        this.$router.push('/providerhome/providergeneral')
                        break;
                    case '7-4':
                        this.$router.push('/providerhome/providerannouncement')
                        break;
                    case '8':
                        this.$router.push('/providerhome/providerprofile')
                        break;
                    case '10':
                        this.$router.push('/providerhome/providerbilling')
                        break;
                    default:
                    // this.$router.push('/providerhome/provideroffer')
                    // this.menuSelect = key;
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