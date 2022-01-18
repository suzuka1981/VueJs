import Vue from 'vue'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'


import {
    Form,
    FormItem,
    Button,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    Link,
    Select,
    Option,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Checkbox,
    Popconfirm,
    DatePicker,
    Popover,
    Image,
    TabPane,
    Tabs,
    Divider,
    Upload,
    Radio,
    Autocomplete,
    RadioGroup,
    Progress,
    CheckboxGroup,
}
    from
        "element-ui";

locale.use(lang)

Vue.use(CheckboxGroup)
Vue.use(Progress)
Vue.use(RadioGroup)
Vue.use(Autocomplete)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(Divider)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Image)
Vue.use(Popover)
Vue.use(DatePicker)
Vue.use(Popconfirm)
Vue.use(Checkbox)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Option)
Vue.use(Select)
Vue.use(Link)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Card)
Vue.use(Col)
Vue.use(Table)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
//消息必须挂载
Vue.prototype.$message = Message
//确认对话框
Vue.prototype.$confirm = MessageBox.confirm
