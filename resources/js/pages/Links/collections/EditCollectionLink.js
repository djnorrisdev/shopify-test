import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
    ResourcePicker,
    TitleBar,
    useRoutePropagation,
    Toast,
} from "@shopify/app-bridge-react";
import axios from "axios";

const EditCollectionLink = (props) => {
    const [resourcePickerOpen, setResourcePickerOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [collectionData, setCollectionData] = useState(false);
    const [formText, setFormText] = useState({
        campaignSource: "",
        campaignMedium: "",
        campaignName: "",
        campaignTerm: "",
        campaignContent: "",
        discountCode: "",
        collectionUrl: ["", ""],
    });

    const domain_regex = /^(?:\/\/|[^\/]+)*/;
    const slug_regex = /[^\/]+$/;
    const domainUrl = `${formText.collectionUrl}`.match(domain_regex)[0];
    let slug = `${formText.collectionUrl}`.match(slug_regex)[0];

    const link_id = useParams().id;
    const title = props.title;
    const location = useLocation();
    useRoutePropagation(location);
    const history = useHistory();

    const slugify = (text) => {
        const format_text = text
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-");
        console.log("TEXT", text);
        return format_text;
    };

    useEffect(() => {
        axios
            .get(`/api/links/${link_id}`)
            .then((response) => {
                console.log(response);
                setFormText({
                    discountCode:
                        response.data.discount_code === null
                            ? ""
                            : response.data.discount_code,
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
                    collectionUrl:
                        response.data.original_content_url === null
                            ? ""
                            : response.data.original_content_url,
                    title:
                        response.data.original_content_title === null
                            ? ""
                            : response.data.original_content_title,
                    id:
                        response.data.original_content_id === null
                            ? ""
                            : response.data.original_content_id,
                    linkImgUrl:
                        response.data.link_img_url === null
                            ? ""
                            : response.data.link_img_url,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleResourcePicker = (resource) => {
        console.log("resource", resource);
        // setCollectionData(resource.selection[0]);

        axios
            .post("/app/graphql", {
                query: `
                {
                    collection(id: "${resource.selection[0].id}") {
                        title
                    }
                }
            `,
            })
            .then((response) => {
                console.log("resource::::::", resource.selection[0]);
                let collectionInfo = {
                    ...resource.selection[0],
                    collectionUrl: `https://codegainzapp.myshopify.com/collections/${slugify(
                        response.data.collection.title
                    )}`,
                    linkImgUrl: resource.selection[0].image.originalSrc,
                };
                setFormText({ ...formText, ...collectionInfo });
            })
            .catch((error) => {
                console.log("THERE WAS AN ERROR!!!!");
                console.log(error);
            });
    };

    const clickedEditCollectionLink = () => {
        setResourcePickerOpen(true);
    };

    const handleText = (name, text) => {
        const newState = {
            [name]: text,
        };
        setFormText({
            ...formText,
            ...newState,
        });
    };

    const clickedSavedBtn = () => {
        let link_url = "";
        if (formText.discountCode === "") {
            link_url = `${formText.collectionUrl}?${
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
            }`;
        } else {
            link_url = `${domainUrl}/discount/${
                formText.discountCode
            }?redirect=%2Fproducts%2F${slug}${
                formText.campaignSource !== ""
                    ? `&utm_source=${formText.campaignSource.replace(
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
            }`;
        }
        axios
            .put(`/api/links/${link_id}`, {
                campaign_source: formText.campaignSource,
                campaign_medium: formText.campaignMedium,
                campaign_term: formText.campaignTerm,
                campaign_name: formText.campaignName,
                campaign_content: formText.campaignContent,
                discount_code: formText.discountCode,
                original_content_url: formText.collectionUrl,
                original_content_title: formText.title,
                original_content_id: formText.id,
                link_type: "collection",
                link_img_url: formText.linkImgUrl,
                user_id: document.getElementById("userId").value,
                link_url: link_url,
            })
            .then((response) => {
                console.log(collectionData);
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
            <ResourcePicker
                resourceType="Collection"
                open={resourcePickerOpen}
                onSelection={handleResourcePicker}
                onCancel={() => setResourcePickerOpen(false)}
            />
            {showToast ? (
                <Toast
                    content={
                        showErrorToast
                            ? `Error saving link.`
                            : `Collection with ID: ${link_id} has been updated.`
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
                            Create a New Collection Link
                            <div className="page-title-subheading">
                                Choose a collection and create a link to promote
                                collection.
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
                domainUrl={domainUrl}
                slug={slug}
                clickedEditCollectionLink={clickedEditCollectionLink}
                collectionData={collectionData}
                formText={formText}
                handleText={handleText}
            />
        </>
    );
};

const UrlPreview = (props) => {
    console.log("Discount Code: ", props.formText);
    if (props.formText.discountCode === "") {
        return (
            <>
                <div className="position-relative form-group">
                    <label htmlFor="linkPreview">Link Preview</label>
                    <textarea
                        name="linkPreview"
                        id="linkPreview"
                        placeholder=""
                        type="text"
                        className="form-control"
                        disabled
                        value={`${props.collectionData.collectionUrl}?${
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
            </>
        );
    } else {
        return (
            <>
                <div className="position-relative form-group">
                    <label htmlFor="linkPreview">Link Preview</label>
                    <textarea
                        name="linkPreview"
                        id="linkPreview"
                        placeholder=""
                        type="text"
                        className="form-control"
                        disabled
                        value={`${props.domainUrl}/discount/${
                            props.formText.discountCode
                        }?redirect=%2Fproducts%2F${props.slug}${
                            props.formText.campaignSource !== ""
                                ? `&utm_source=${props.formText.campaignSource.replace(
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
            </>
        );
    }
};

const Content = (props) => {
    console.log("PROPS", props.formText.collectionUrl);
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Controls Types</h5>
                            <form>
                                <div className="position-relative form-group">
                                    <label htmlFor="collectionUrl">
                                        Collection URL
                                    </label>
                                    <input
                                        readOnly
                                        name="collectionUrl"
                                        id="collectionUrl"
                                        placeholder="Collection URL"
                                        type="text"
                                        className="form-control"
                                        value={props.formText.collectionUrl}
                                        onClick={
                                            props.clickedEditCollectionLink
                                        }
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="discountCode">
                                        Product URL
                                    </label>
                                    <input
                                        name="discountCode"
                                        id="discountCode"
                                        placeholder="50July42020, 2021XMAS20"
                                        type="text"
                                        className="form-control"
                                        defaultValue={
                                            props.formText.discountCode
                                        }
                                        onChange={(e) =>
                                            props.handleText(
                                                "discountCode",
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
                            <h5 className="card-title">Collection</h5>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <img
                                        src={props.formText.linkImgUrl}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-md-8 d-flex align-items-center">
                                    <h3>{props.formText.title}</h3>
                                </div>
                            </div>
                        </div>
                        <UrlPreview
                            domainUrl={props.domainUrl}
                            slug={props.slug}
                            collectionData={props.formText}
                            formText={props.formText}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCollectionLink;
