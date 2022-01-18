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

<!--        <div v-show="menuSelect==='9'">-->
<!--            <BuyTracking msg=""/>-->
<!--        </div>-->

        <router-view></router-view>

        <el-dialog
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="Notifications（待做）"
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

    export default {
        name: 'Home',
        components: {
            TopMenu,
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
                    case '2':
                        this.$router.push('/home/offer')
                        break;
                    case '3':
                        this.$router.push('/home/task')
                        break;
                    case '4':
                        this.$router.push('/home/outbound')
                        break;
                    case '5-1':
                        this.$router.push('/home/inventory')
                        break;
                    case '6':
                        this.$router.push('/home/payment')
                        break;
                    case '7':
                        this.$router.push('/home/profile')
                        break;
                    case '9':
                        this.$router.push('/home/buyTracking')
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