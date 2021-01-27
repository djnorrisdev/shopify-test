//require('./bootstrap');
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AppProvider, Card, Page } from "@shopify/polaris";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider, TitleBar } from "@shopify/app-bridge-react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CreateNewProductLink from "./pages/Links/products/CreateNewProductLink";
import CreateNewCollectionLink from "./pages/Links/collections/CreateNewCollectionLink";
import EditCollectionLink from "./pages/Links/collections/EditCollectionLink";
import CreateNewCustomLink from "./pages/Links/custom/CreateNewCustomLink";
import EditCustomLink from './pages/Links/custom/EditCustomLink'
import EditProductLink from "./pages/Links/products/EditProductLink";
import ShowAllLinks from "./pages/Links/ShowAllLinks";

export default class App extends Component {
    render() {
        const config = {
            apiKey: document.getElementById("apiKey").value,
            shopOrigin: document.getElementById("shopOrigin").value,
            forceRedirect: true,
        };

        return (
            <AppProvider>
                <Provider config={config}>
                    <Router>
                        <MainLayout>
                            <Switch>
                                <Route path="/app/links/product/new">
                                    <CreateNewProductLink title="Create New Product Link" />
                                </Route>
                                <Route path="/app/links/collection/new">
                                    <CreateNewCollectionLink title="Create New Collection Link" />
                                </Route>
                                <Route path="/app/links/collections/:id/edit">
                                    <EditCollectionLink title="Edit Collection Link" />
                                </Route>
                                <Route path="/app/links/custom/new">
                                    <CreateNewCustomLink title="Create New Custom Link" />
                                </Route>
                                <Route path="/app/links/custom/:id/edit">
                                    <EditCustomLink title="Edit Custom Link" />
                                </Route>
                                <Route path="/app/links/products/:id/edit">
                                    <EditProductLink title="Edit Product Link" />
                                </Route>
                                <Route path="/app/links/all">
                                    <ShowAllLinks title="Show All Links" />
                                </Route>
                                <Route path="/app">
                                    <Home title="Home" />
                                </Route>
                            </Switch>
                        </MainLayout>
                    </Router>
                </Provider>
            </AppProvider>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
