import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Products from "../components/Products";
import Product from "../components/Product";
import NewProduct from "../components/NewProduct";
import EditProduct from "../components/EditProduct";
import Login from "../components/Login";
import Signup from "../components/Signup";
export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" exact component={Products} />
            <Route path="/product/:id" exact component={Product} />
            <Route path="/product" exact component={NewProduct} />
            <Route path="/editProduct/:id" exact component={EditProduct} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
        </Switch>
    </Router>

);