import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import App from './components/app';
import { ScrollContext } from 'react-router-scroll-4';

// Components
import Dashboard from './components/dashboard';

// Products physical
import Category from './components/products/physical/category';
import Sub_category from './components/products/physical/sub-category';
import Product_list from './components/products/physical/product-list';
import Add_product from './components/products/physical/add-product';
import Product_detail from './components/products/physical/product-detail';

//Product Digital
import Digital_category from './components/products/digital/digital-category';
import Digital_sub_category from './components/products/digital/digital-sub-category';
import Digital_pro_list from './components/products/digital/digital-pro-list';
import Digital_add_pro from './components/products/digital/digital-add-pro';

//Sales
import Orders from './components/sales/orders';
import Transactions_sales from './components/sales/transactions-sales';
//Coupons
import ListCoupons from './components/coupons/list-coupons';
import Create_coupons from './components/coupons/create-coupons';

//Pages
import Media from './components/media/media';
import List_designer from './components/Designers/list-designer';
import Create_designer from './components/Designers/create-designer';
import List_user from './components/users/list-user';
import List_vendors from './components/vendors/list-vendors';
import Create_vendors from './components/vendors/create.vendors';
import Profile from './components/settings/profile';
import Reports from './components/reports/report';
import Invoice from './components/invoice';
import Datatable from './components/common/datatable'
import Login from './components/auth/login';



class Root extends Component {
    render() {
        return (
            <BrowserRouter basename={'/'}>
                <ScrollContext>
                    <Switch>
                    <Route exact path={"/"} component={Login} />
                        <Route exact path={"/auth/login"} component={Login} />

                        <App>
                            <Route path={"/dashboard"} component={Dashboard} />
                                
                            <Route path={"/products/physical/category"} component={Category} />
                            <Route path={"/products/physical/sub-category"} component={Sub_category} />
                            <Route path={"/products/physical/product-list"} component={Product_list} />
                            <Route path={"/products/physical/product-detail"} component={Product_detail} />
                            <Route path={"/products/physical/add-product"} component={Add_product} />

                            <Route path={"/products/digital/digital-category"} component={Digital_category} />
                            <Route path={"/products/digital/digital-sub-category"} component={Digital_sub_category} />
                            <Route path={"/products/digital/digital-product-list"} component={Digital_pro_list} />
                            <Route path={"/products/digital/digital-add-product"} component={Digital_add_pro} />

                            <Route path={"/sales/orders"} component={Orders} />
                            <Route path={"/sales/transactions"} component={Transactions_sales} />

                            <Route path={"/coupons/list-coupons"} component={ListCoupons} />
                            <Route path={"/coupons/create-coupons"} component={Create_coupons} />

                            <Route path={"/media"} component={Media} />

                            <Route path={"/Designers/list-designer"} component={List_designer} />
                            <Route path={"/Designers/create-designer"} component={Create_designer} />

                            <Route path={"/users/list-user"} component={List_user} />

                            <Route path={"/vendors/list_vendors"} component={List_vendors} />
                            <Route path={"/vendors/create-vendors"} component={Create_vendors} />

                            <Route path={"/reports/report"} component={Reports} />

                            <Route path={"/settings/profile"} component={Profile} />

                            <Route path={"/invoice"} component={Invoice} />

                            <Route path={"/data-table"} component={Datatable} />

                        </App>
                    </Switch>
                </ScrollContext>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


