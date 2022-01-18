import Vue from 'vue'
import VueRouter from 'vue-router'

const ViewImages = () => import('../components/utils/ViewImages.vue')

const Login = () => import('../views/Login.vue')
const Home = () => import('../views/buyers/Home.vue')

const ProviderHome = () => import('../views/provider/ProviderHome.vue')

//home
const TopMenu = () => import('@/components/buyers/Menu.vue')
const Offer = () => import('@/components/buyers/Offer.vue')
const Task = () => import('@/components/buyers/Task.vue')
const Outbound = () => import('@/components/buyers/Outbound.vue')
const Inventory = () => import('@/components/buyers/Inventory.vue')
// const Package = () => import('@/components/buyers/Package.vue')
const Payment = () => import('@/components/buyers/Payment.vue')
const Profile = () => import('@/components/buyers/Profile.vue')
const BuyTracking = () => import('@/components/buyers/BuyTracking.vue')

//ProviderHome
const ProviderOffer = () => import('@/components/provider/ProviderOffer.vue')
const ProviderTask = () => import('@/components/provider/ProviderTask.vue')
const ProviderCreate = () => import('@/components/provider/Outbound/ProviderCreate.vue')
const ProviderStatus = () => import('@/components/provider/Outbound/ProviderStatus.vue')
const ProviderLabel = () => import('@/components/provider/Outbound/ProviderLabel.vue')
const ProviderInventory = () => import('@/components/provider/Warehouse/ProviderInventory.vue')
const ProviderPackage = () => import('@/components/provider/Warehouse/ProviderPackage.vue')
const ProviderUploadPackages = () => import('@/components/provider/Warehouse/ProviderUploadPackages.vue')
const ProviderSupport = () => import('@/components/provider/Warehouse/ProviderSupport.vue')
const ProviderPayment = () => import('@/components/provider/Payment/ProviderPayment.vue')
const ProviderStaff = () => import('@/components/provider/Setting/Staff/ProviderStaff.vue')
const ProviderMember = () => import('@/components/provider/Setting/Member/ProviderMember.vue')
const ProviderGeneral = () => import('@/components/provider/Setting/General/ProviderGeneral.vue')
const ProviderAnnouncement = () => import('@/components/provider/Setting/Announcement/ProviderAnnouncement.vue')
const ProviderProfile = () => import('@/components/provider/Profile/ProviderProfile.vue')
const ProviderBilling = () => import('@/components/provider/Billing/ProviderBilling.vue')
const ProviderSite = () => import('@/components/provider/Warehouse/Site/ProviderSite.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            requireAuth: true,  // 判断是否需要登录
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Home,
        children: [
            {
                path: 'topmenu',
                component: TopMenu
            },
            {
                path: 'offer',
                component: Offer
            },
            {
                path: 'task',
                component: Task
            },
            {
                path: 'outbound',
                component: Outbound
            },
            {
                path: 'inventory',
                component: Inventory
            },
            {
                path: 'payment',
                component: Payment
            },
            {
                path: 'profile',
                component: Profile
            },
            {
                path: 'buyTracking',
                component: BuyTracking
            },
            {
                path: 'providerPackage',
                component: ProviderPackage
            },
        ]
    },
    {
        path: '/providerhome',
        name: 'ProviderHome',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        meta: {
            requireAuth: true,  // 判断是否需要登录
        },
        component: ProviderHome,
        children: [
            {
                path: 'provideroffer',
                component: ProviderOffer
            },
            {
                path: 'providertask',
                component: ProviderTask
            },
            {
                path: 'providercreate',
                component: ProviderCreate
            },
            {
                path: 'providerstatus',
                component: ProviderStatus
            },
            {
                path: 'providerLabel',
                component: ProviderLabel
            },
            {
                path: 'providerinventory',
                component: ProviderInventory
            },
            {
                path: 'providerpackage',
                component: ProviderPackage
            },
            {
                path: 'Provideruploadpackages',
                component: ProviderUploadPackages
            },
            {
                path: 'providersupport',
                component: ProviderSupport
            },
            {
                path: 'providerpayment',
                component: ProviderPayment
            },
            {
                path: 'providerstaff',
                component: ProviderStaff
            },
            {
                path: 'providermember',
                component: ProviderMember
            },
            {
                path: 'providergeneral',
                component: ProviderGeneral
            },
            {
                path: 'providerannouncement',
                component: ProviderAnnouncement
            },
            {
                path: 'providerprofile',
                component: ProviderProfile
            },
            {
                path: 'providerbilling',
                component: ProviderBilling
            },
            {
                path: 'providersite',
                component: ProviderSite
            },
        ]
    },
    {
        path: '/viewimages',
        name: 'ViewImages',
        component: ViewImages
    }
]

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
