import React from 'react';
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ProductScreen from './screens/ProductsScreen'
import CartScreen from './screens/CartScreen'
import { PageNotFound } from './components/PageNotFound'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditSreen'
import ProductListScreen from './screens/ProductListScreen'
import NewProductScreen from './screens/NewProductScreen'
import EditProductScreen from './screens/EditProductScreen'
import OrderListScreen from './screens/OrderListScreen'

const App = () => (
    <BrowserRouter>
        <Header />
        <Container className="my-3">
            <Switch>
                <Route path="/products" component={HomeScreen} exact />
                <Route path="/search/:keyword" component={HomeScreen} />
                <Route path="/page/:pagenum" component={HomeScreen} />
                <Route path="/search/:keyword/page/:pagenum" component={HomeScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path='/admin/productlist/:pagenum?' component={ProductListScreen} />
                <Route path='/admin/products/new' component={NewProductScreen} />
                <Route path='/admin/orderlist' component={OrderListScreen} />
                <Route path='/admin/products/:id/edit' component={EditProductScreen} />
                <Route path="/admin/user/:id/edit" component={UserEditScreen} />
                <Route path='/admin/userlist' component={UserListScreen} />
                <Route path="/order/:id" component={OrderScreen} />
                <Route path="/products/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/profile" component={ProfileScreen} />
                <Route component={PageNotFound} />
            </Switch>
        </Container>
        <Footer />
    </BrowserRouter>
)

export default App