import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TitleBar, useRoutePropagation } from "@shopify/app-bridge-react";
import axios from "axios";

const Home = (props) => {
    const title = props.title;
    const location = useLocation();
    console.log(location);
    useRoutePropagation(location);
    const [loadingData, setLoadingData] = useState(true);
    const [dashboardData, setDashboardData] = useState(false);

    useEffect(() => {
        axios
            .get(`/api/dashboard`)
            .then((response) => {
                console.log(response);
                setLoadingData(false);
                setDashboardData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <TitleBar title={title} />
            {loadingData ? (
                <h1>Loading</h1>
            ) : (
                <Dashboard dashboardData={dashboardData} />
            )}
        </>
    );
};

const Dashboard = (props) => {
    return (
        <>
            <div className="app-main__inner">
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-car icon-gradient bg-mean-fruit"></i>
                            </div>
                            <div>
                                Last 7 Days Report
                                <div className="page-title-subheading">
                                    This is an example dashboard created using
                                    build-in elements and components.
                                </div>
                            </div>
                        </div>
                        <div className="page-title-actions">
                            <button
                                type="button"
                                data-toggle="tooltip"
                                title="Example Tooltip"
                                data-placement="bottom"
                                className="btn-shadow mr-3 btn btn-dark"
                            >
                                <i className="fa fa-star" />
                            </button>
                            <div className="d-inline-block dropdown">
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    className="btn-shadow dropdown-toggle btn btn-info"
                                >
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <i className="fa fa-business-time fa-w-20" />
                                    </span>
                                    Buttons
                                </button>
                                <div
                                    tabIndex={-1}
                                    role="menu"
                                    aria-hidden="true"
                                    className="dropdown-menu dropdown-menu-right"
                                >
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a href="#;" className="nav-link">
                                                <i className="nav-link-icon lnr-inbox" />
                                                <span>Inbox</span>
                                                <div className="ml-auto badge badge-pill badge-secondary">
                                                    86
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#;" className="nav-link">
                                                <i className="nav-link-icon lnr-book" />
                                                <span>Book</span>
                                                <div className="ml-auto badge badge-pill badge-danger">
                                                    5
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#;" className="nav-link">
                                                <i className="nav-link-icon lnr-picture" />
                                                <span>Picture</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                disabled
                                                href="#;"
                                                className="nav-link disabled"
                                            >
                                                <i className="nav-link-icon lnr-file-empty" />
                                                <span>File Disabled</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>{" "}
                    </div>
                </div>{" "}
                <div className="row">
                    <div className="col-md-6 col-xl-6">
                        <div className="card mb-3 widget-content bg-midnight-bloom">
                            <div className="widget-content-wrapper text-white">
                                <div className="widget-content-left">
                                    <div className="widget-heading">Clicks</div>
                                    <div className="widget-subheading">
                                        Last 7 Days
                                    </div>
                                </div>
                                <div className="widget-content-right">
                                    <div className="widget-numbers text-white">
                                        <span>
                                            {props.dashboardData.totalClicks}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6">
                        <div className="card mb-3 widget-content bg-arielle-smile">
                            <div className="widget-content-wrapper text-white">
                                <div className="widget-content-left">
                                    <div className="widget-heading">Links</div>
                                    <div className="widget-subheading">
                                        Last 7 Days
                                    </div>
                                </div>
                                <div className="widget-content-right">
                                    <div className="widget-numbers text-white">
                                        <span>
                                            {props.dashboardData.totalLinks}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-6">
                        <div className="mb-3 card">
                            <div className="card-header-tab card-header-tab-animation card-header">
                                <div className="card-header-title">
                                    <i className="header-icon lnr-apartment icon-gradient bg-love-kiss">
                                        {" "}
                                    </i>
                                    Sales Report
                                </div>
                                <ul className="nav">
                                    <li className="nav-item">
                                        <a
                                            href="#;"
                                            className="active nav-link"
                                        >
                                            Last
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#;"
                                            className="nav-link second-tab-toggle"
                                        >
                                            Current
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content">
                                    <div
                                        className="tab-pane fade show active"
                                        id="tabs-eg-77"
                                    >
                                        <div className="card mb-3 widget-chart widget-chart2 text-left w-100">
                                            <div className="widget-chat-wrapper-outer">
                                                <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
                                                    {/* Show chart here*/}
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className="text-muted text-uppercase font-size-md opacity-5 font-weight-normal">
                                            Top Authors
                                        </h6>
                                        <div className="scroll-area-sm">
                                            <div className="scrollbar-container">
                                                <ul className="rm-list-borders rm-list-borders-scroll list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <img
                                                                        width={
                                                                            42
                                                                        }
                                                                        className="rounded-circle"
                                                                        src="assets/images/avatars/9.jpg"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="widget-content-left">
                                                                    <div className="widget-heading">
                                                                        Ella-Rose
                                                                        Henry
                                                                    </div>
                                                                    <div className="widget-subheading">
                                                                        Web
                                                                        Developer
                                                                    </div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="font-size-xlg text-muted">
                                                                        <small className="opacity-5 pr-1">
                                                                            $
                                                                        </small>
                                                                        <span>
                                                                            129
                                                                        </span>
                                                                        <small className="text-danger pl-2">
                                                                            <i className="fa fa-angle-down" />
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <img
                                                                        width={
                                                                            42
                                                                        }
                                                                        className="rounded-circle"
                                                                        src="assets/images/avatars/5.jpg"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="widget-content-left">
                                                                    <div className="widget-heading">
                                                                        Ruben
                                                                        Tillman
                                                                    </div>
                                                                    <div className="widget-subheading">
                                                                        UI
                                                                        Designer
                                                                    </div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="font-size-xlg text-muted">
                                                                        <small className="opacity-5 pr-1">
                                                                            $
                                                                        </small>
                                                                        <span>
                                                                            54
                                                                        </span>
                                                                        <small className="text-success pl-2">
                                                                            <i className="fa fa-angle-up" />
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <img
                                                                        width={
                                                                            42
                                                                        }
                                                                        className="rounded-circle"
                                                                        src="assets/images/avatars/4.jpg"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="widget-content-left">
                                                                    <div className="widget-heading">
                                                                        Vinnie
                                                                        Wagstaff
                                                                    </div>
                                                                    <div className="widget-subheading">
                                                                        Java
                                                                        Programmer
                                                                    </div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="font-size-xlg text-muted">
                                                                        <small className="opacity-5 pr-1">
                                                                            $
                                                                        </small>
                                                                        <span>
                                                                            429
                                                                        </span>
                                                                        <small className="text-warning pl-2">
                                                                            <i className="fa fa-dot-circle" />
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <img
                                                                        width={
                                                                            42
                                                                        }
                                                                        className="rounded-circle"
                                                                        src="assets/images/avatars/3.jpg"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="widget-content-left">
                                                                    <div className="widget-heading">
                                                                        Ella-Rose
                                                                        Henry
                                                                    </div>
                                                                    <div className="widget-subheading">
                                                                        Web
                                                                        Developer
                                                                    </div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="font-size-xlg text-muted">
                                                                        <small className="opacity-5 pr-1">
                                                                            $
                                                                        </small>
                                                                        <span>
                                                                            129
                                                                        </span>
                                                                        <small className="text-danger pl-2">
                                                                            <i className="fa fa-angle-down" />
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <img
                                                                        width={
                                                                            42
                                                                        }
                                                                        className="rounded-circle"
                                                                        src="assets/images/avatars/2.jpg"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="widget-content-left">
                                                                    <div className="widget-heading">
                                                                        Ruben
                                                                        Tillman
                                                                    </div>
                                                                    <div className="widget-subheading">
                                                                        UI
                                                                        Designer
                                                                    </div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="font-size-xlg text-muted">
                                                                        <small className="opacity-5 pr-1">
                                                                            $
                                                                        </small>
                                                                        <span>
                                                                            54
                                                                        </span>
                                                                        <small className="text-success pl-2">
                                                                            <i className="fa fa-angle-up" />
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="main-card mb-3 card">
                            <div className="card-header">
                                Campaign Sources
                                <div className="btn-actions-pane-right">
                                    <div
                                        role="group"
                                        className="btn-group-sm btn-group"
                                    >
                                        <button className="active btn btn-focus">
                                            Last Week
                                        </button>
                                        <button className="btn btn-focus">
                                            All Month
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="text-center">
                                                Source
                                            </th>
                                            <th className="text-center">
                                                Total Clicks
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.dashboardData.sourceTotal !==
                                        undefined
                                            ? props.dashboardData.sourceTotal.map(
                                                  (item) => (
                                                      <>
                                                          <tr>
                                                              <td className="text-center">
                                                                  {
                                                                      item.campaign_source
                                                                  }
                                                              </td>
                                                              <td className="text-center">
                                                                  {item.total}
                                                              </td>
                                                          </tr>
                                                      </>
                                                  )
                                              )
                                            : ""}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-block text-center card-footer">
                                <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger">
                                    <i className="pe-7s-trash btn-icon-wrapper">
                                        {" "}
                                    </i>
                                </button>
                                <button className="btn-wide btn btn-success">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
