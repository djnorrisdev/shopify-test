import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TitleBar, useRoutePropagation } from "@shopify/app-bridge-react";
import axios from "axios";

const ShowAllLinks = (props) => {
    const title = props.title;
    const location = useLocation();
    console.log(location);
    useRoutePropagation(location);

    const [linksData, setLinksData] = useState([]);

    useEffect(() => {
        axios
            .get("/api/links")
            .then((response) => {
                console.log(response);
                setLinksData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const deleteLink = (id) => {
        axios
            .delete(`/api/links/${id}`)
            .then((response) => {
                if (response.data === "Link Deleted") {
                    const newData = linksData.filter((item) => item.id != id);
                    setLinksData(newData);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <TitleBar title={title} />
            <div className="app-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div className="page-title-icon">
                            <i className="pe-7s-drawer icon-gradient bg-happy-itmeo"></i>
                        </div>
                        <div>
                            View All Links
                            <div className="page-title-subheading">
                                See all the links including custom, product, and
                                collection links.
                            </div>
                        </div>
                    </div>
                    <div className="page-title-actions">
                        <button
                            type="button"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            className="btn-shadow mr-3 btn btn-dark"
                            data-original-title="Example Tooltip"
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
                                role="menu"
                                aria-hidden="true"
                                className="dropdown-menu dropdown-menu-right"
                            >
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-link-icon lnr-inbox" />
                                            <span>Inbox</span>
                                            <div className="ml-auto badge badge-pill badge-secondary">
                                                86
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-link-icon lnr-book" />
                                            <span>Book</span>
                                            <div className="ml-auto badge badge-pill badge-danger">
                                                5
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-link-icon lnr-picture" />
                                            <span>Picture</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            disabled
                                            href="#"
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
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Links</h5>
                            <table className="mb-0 table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Link Type</th>
                                        <th>Discount Code</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {linksData.map((item) => {
                                        let directory = "";
                                        switch (item.link_type) {
                                            case "product":
                                                directory = "products";
                                                break;
                                            case "collection":
                                                directory = "collections";
                                                break;
                                            default:
                                                directory = "custom";
                                        }

                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">{item.id}</th>
                                                <td>
                                                    {
                                                        item.original_content_title
                                                    }
                                                </td>
                                                <td>
                                                    <div
                                                        className={`mb-2 mr-2 badge ${
                                                            item.link_type ===
                                                            "custom"
                                                                ? "badge-warning"
                                                                : "badge-primary"
                                                        }`}
                                                    >
                                                        {item.link_type}{" "}
                                                    </div>
                                                </td>
                                                <td>{item.discount_code}</td>
                                                <td>
                                                    <a
                                                        href={`/app/links/${directory}/${item.id}/edit`}
                                                        className="mb-2 mr-2 btn btn-success"
                                                    >
                                                        <i className="pe-7s-pen"></i>
                                                        Edit
                                                    </a>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={()=>deleteLink(item.id)}
                                                        className="mb-2 mr-2 btn btn-danger"
                                                    >
                                                        <i className="pe-7s-trash"></i>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowAllLinks;
