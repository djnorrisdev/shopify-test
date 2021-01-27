import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
    ResourcePicker,
    TitleBar,
    useRoutePropagation,
    Toast,
} from "@shopify/app-bridge-react";
import axios from "axios";

const EditCustomLink = (props) => {
    const title = props.title;
    const location = useLocation();
    useRoutePropagation(location);
    const history = useHistory();
    const link_id = useParams().id;
    const [resourcePickerOpen, setResourcePickerOpen] = useState(true);
    const [customData, setCustomData] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [formText, setFormText] = useState({
        customTitle: "",
        customUrl: "",
        campaignSource: "",
        campaignMedium: "",
        campaignName: "",
        campaignTerm: "",
        campaignContent: "",
    });

    useEffect(() => {
        axios
            .get(`/api/links/${link_id}`)
            .then((response) => {
                console.log(response);
                setFormText({
                    campaignSource:
                        response.data.campaign_source === null
                            ? ""
                            : response.data.campaign_source,
                    campaignMedium:
                        response.data.campaign_medium === null
                            ? ""
                            : response.data.campaign_medium,
                    campaignName:
                        response.data.campaign_name === null
                            ? ""
                            : response.data.campaign_name,
                    campaignTerm:
                        response.data.campaign_term === null
                            ? ""
                            : response.data.campaign_term,
                    campaignContent:
                        response.data.campaign_content === null
                            ? ""
                            : response.data.campaign_content,
                    customUrl:
                        response.data.original_content_url === null
                            ? ""
                            : response.data.original_content_url,
                    customTitle:
                        response.data.original_content_title === null
                            ? ""
                            : response.data.original_content_title,
                    id:
                        response.data.original_content_id === null
                            ? ""
                            : response.data.original_content_id,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const slugify = (text) =>
        text
            .toString()
            .normalize("NFD")
            .replace(/[\u300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-");

    const handleText = (name, text) => {
        const newState = {
            [name]: text,
        };
        setFormText({
            ...formText,
            ...newState,
        });
        console.log(newState);
    };

    const clickedSavedBtn = () => {
        axios
            .put(`/api/links/${link_id}`, {
                campaign_source: formText.campaignSource,
                campaign_medium: formText.campaignMedium,
                campaign_term: formText.campaignTerm,
                campaign_name: formText.campaignName,
                campaign_content: formText.campaignContent,
                original_content_url: formText.customUrl,
                original_content_title: formText.customTitle,
                original_content_id: formText.id,
                link_type: "custom",
                user_id: document.getElementById("userId").value,
                link_url: `${formText.customUrl}?${
                    formText.campaignSource !== ""
                        ? `utm_source=${formText.campaignSource.replace(
                              / /g,
                              "%20"
                          )}`
                        : ""
                }${
                    formText.campaignMedium !== ""
                        ? `&utm_source=${formText.campaignMedium.replace(
                              / /g,
                              "%20"
                          )}`
                        : ""
                }${
                    formText.campaignName !== ""
                        ? `&utm_source=${formText.campaignName.replace(
                              / /g,
                              "%20"
                          )}`
                        : ""
                }${
                    formText.campaignTerm !== ""
                        ? `&utm_source=${formText.campaignTerm.replace(
                              / /g,
                              "%20"
                          )}`
                        : ""
                }${
                    formText.campaignContent !== ""
                        ? `&utm_source=${formText.campaignContent.replace(
                              / /g,
                              "%20"
                          )}`
                        : ""
                }`,
            })
            .then((response) => {
                console.log(response);
                if (response.data === "Updated Data") {
                    setShowToast(true);
                }
            })
            .catch((error) => {
                setShowErrorToast(true);
                setShowToast(true);
            });
    };

    const deleteLink = (id) => {
        axios
            .delete(`/api/links/${id}`)
            .then((response) => {
                if (response.data === "Link Deleted") {
                    history.push("/app/links/all");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <TitleBar title={title} />
            {showToast ? (
                <Toast
                    content={
                        showErrorToast
                            ? `Error saving link.`
                            : `Custom link with ID: ${link_id} has been updated.`
                    }
                    onDismiss={() => {
                        setShowToast(false);
                        setShowErrorToast(false);
                    }}
                    error={showErrorToast}
                />
            ) : null}
            <div className="app-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div className="page-title-icon">
                            <i className="pe-7s-display1 icon-gradient bg-premium-dark"></i>
                        </div>
                        <div>
                            Edit Custom Link
                            <div className="page-title-subheading">
                                Create a custom link.
                            </div>
                        </div>
                    </div>
                    <div className="page-title-actions">
                        <div className="d-inline-block dropdown">
                            <button
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                className="btn-shadow btn btn-info"
                                onClick={clickedSavedBtn}
                            >
                                <span className="btn-icon-wrapper pr-2 opacity-7">
                                    <i className="fa fa-business-time fa-w-20"></i>
                                </span>
                                Save
                            </button>
                            <button
                                onClick={() => deleteLink(link_id)}
                                className="mb-2 mr-2 btn btn-danger"
                            >
                                <i className="pe-7s-trash"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Content
                customData={customData}
                formText={formText}
                handleText={handleText}
            />
        </>
    );
};

const Content = (props) => {
    console.log("content data: ", props.customData);
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Controls Types</h5>
                            <form>
                                <div className="position-relative form-group">
                                    <label htmlFor="customUrl">
                                        Link Title
                                    </label>
                                    <input
                                        name="customTitle"
                                        id="customTitle"
                                        placeholder="Custom Title"
                                        type="text"
                                        className="form-control"
                                        value={props.formText.customTitle}
                                        onChange={(e) =>
                                            props.handleText(
                                                "customTitle",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="customUrl">
                                        custom URL
                                    </label>
                                    <input
                                        name="customUrl"
                                        id="customUrl"
                                        placeholder="custom URL"
                                        type="text"
                                        className="form-control"
                                        value={props.formText.customUrl}
                                        onChange={(e) =>
                                            props.handleText(
                                                "customUrl",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignSource">
                                        campaign Source
                                    </label>
                                    <input
                                        name="campaignSource"
                                        id="campaignSource"
                                        placeholder="Google, Youtube, Instagram"
                                        type="text"
                                        className="form-control"
                                        value={props.formText.campaignSource}
                                        onChange={(e) =>
                                            props.handleText(
                                                "campaignSource",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignMedium">
                                        campaign Medium
                                    </label>
                                    <input
                                        name="campaignMedium"
                                        id="campaignMedium"
                                        placeholder="CPC Banner, Instagram, Profile Link"
                                        type="text"
                                        className="form-control"
                                        value={props.formText.campaignMedium}
                                        onChange={(e) =>
                                            props.handleText(
                                                "campaignMedium",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignName">
                                        campaign Name
                                    </label>
                                    <input
                                        name="campaignName"
                                        id="campaignName"
                                        placeholder="July42020, Labor Day, Coupon Code 234D"
                                        type="text"
                                        className="form-control"
                                        value={props.formText.campaignName}
                                        onChange={(e) =>
                                            props.handleText(
                                                "campaignName",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignTerm">
                                        Campaign Term (optional)
                                    </label>
                                    <input
                                        name="campaignTerm"
                                        id="campaignTerm"
                                        placeholder="Add Paid Keywords"
                                        type="text"
                                        className="form-control"
                                        value={props.formText.campaignTerm}
                                        onChange={(e) =>
                                            props.handleText(
                                                "campaignTerm",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignContent">
                                        Campaign Content
                                    </label>
                                    <input
                                        name="campaignContent"
                                        id="campaignContent"
                                        placeholder="Girl with laptop image ad, Image 3, Ad 5"
                                        type="text"
                                        className="form-control"
                                        value={props.formText.campaignContent}
                                        onChange={(e) =>
                                            props.handleText(
                                                "campaignContent",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <button className="mt-1 btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Custom</h5>
                            <div className="row mb-3">
                                <div className="col-md-8 d-flex align-items-center">
                                    <h3>{props.customData.title}</h3>
                                </div>
                            </div>
                            <div className="position-relative form-group">
                                <label htmlFor="linkPreview">
                                    Link Preview
                                </label>
                                {console.log("custom url: ", props)}
                                <textarea
                                    name="linkPreview"
                                    id="linkPreview"
                                    placeholder=""
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={`${props.formText.customUrl}?${
                                        props.formText.campaignSource !== ""
                                            ? `utm_source=${props.formText.campaignSource.replace(
                                                  / /g,
                                                  "%20"
                                              )}`
                                            : ""
                                    }${
                                        props.formText.campaignMedium !== ""
                                            ? `&utm_source=${props.formText.campaignMedium.replace(
                                                  / /g,
                                                  "%20"
                                              )}`
                                            : ""
                                    }${
                                        props.formText.campaignName !== ""
                                            ? `&utm_source=${props.formText.campaignName.replace(
                                                  / /g,
                                                  "%20"
                                              )}`
                                            : ""
                                    }${
                                        props.formText.campaignTerm !== ""
                                            ? `&utm_source=${props.formText.campaignTerm.replace(
                                                  / /g,
                                                  "%20"
                                              )}`
                                            : ""
                                    }${
                                        props.formText.campaignContent !== ""
                                            ? `&utm_source=${props.formText.campaignContent.replace(
                                                  / /g,
                                                  "%20"
                                              )}`
                                            : ""
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCustomLink;
