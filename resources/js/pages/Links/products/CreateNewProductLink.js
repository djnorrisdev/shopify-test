import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    ResourcePicker,
    TitleBar,
    useRoutePropagation,
    Toast,
} from "@shopify/app-bridge-react";
import axios from "axios";

const CreateNewLink = (props) => {
    const [resourcePickerOpen, setResourcePickerOpen] = useState(true);
    const [productData, setProductData] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [formText, setFormText] = useState({
        discountCode: "",
        campaignSource: "",
        campaignMedium: "",
        campaignName: "",
        campaignTerm: "",
        campaignContent: "",
    });
    const title = props.title;
    const location = useLocation();
    useRoutePropagation(location);
    const history = useHistory();
    const domainUrl = `${productData.productUrl}`.match(/^(?:\/\/|[^\/]+)*/)[0];
    const slug = `${productData.productUrl}`.match(/[^\/]+$/)[0];

    const handleResourcePicker = (resource) => {
        setProductData(resource.selection[0]);
        axios
            .post("/app/graphql", {
                query: `
                {
                    product(id: "${resource.selection[0].id}") {
                        title
                        description
                        onlineStoreUrl
                        onlineStorePreviewUrl
                        images (first: 1 ) {
                            edges {
                              node {
                                id
                                originalSrc
                              }
                            }
                        }
                    }
                }
            `,
            })
            .then((response) => {
                // console.log("response from server: ", response);
                const productInfo = {
                    ...resource.selection[0],
                    productUrl: response.data.product.onlineStorePreviewUrl,
                };
                // console.log("product info: ", productInfo);
                setProductData(productInfo);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const clickedSavedBtn = () => {
        console.log("domainUrl:", domainUrl);
        let link_url = "";
        if (formText.discountCode === "") {
            link_url = `${productData.productUrl}?${
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
            .post("/api/createlink", {
                campaign_source: formText.campaignSource,
                campaign_medium: formText.campaignMedium,
                campaign_term: formText.campaignTerm,
                campaign_name: formText.campaignName,
                campaign_content: formText.campaignContent,
                discount_code: formText.discountCode,
                original_content_url: productData.productUrl,
                original_content_title: productData.title,
                original_content_id: productData.id,
                link_type: "product",
                link_img_url: productData.images[0].originalSrc,
                link_url: link_url,
                user_id: document.getElementById("userId").value,
            })
            .then((response) => {
                console.log(response);
                if (response.data === "Saved data") {
                    setShowToast(true);
                    history.push("/app/links/all");
                }
            })
            .catch((error) => {
                setShowErrorToast(true);
                setShowToast(true);
                console.log(error);
            });
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

    return (
        <>
            <TitleBar title={title} />
            <ResourcePicker
                resourceType="Product"
                open={resourcePickerOpen}
                onSelection={handleResourcePicker}
                onCancel={() => history.push("/app")}
            />
            {showToast ? (
                <Toast
                    content={
                        showErrorToast ? `Error saving link.` : `Created link.`
                    }
                    onDismiss={() => {
                        setShowToast(false);
                        setShowErrorToast(false);
                    }}
                    error={showErrorToast}
                />
            ) : null}
            <div
                className={
                    productData === false
                        ? "app-page-title d-none"
                        : "app-page-title"
                }
            >
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div className="page-title-icon">
                            <i className="pe-7s-display1 icon-gradient bg-premium-dark"></i>
                        </div>
                        <div>
                            Create a New Product Link
                            <div className="page-title-subheading">
                                Choose a product and create a link to promote
                                product.
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
                        </div>
                    </div>
                </div>
            </div>
            {productData === false ? (
                ""
            ) : (
                <Content
                    slug={slug}
                    domainUrl={domainUrl}
                    productData={productData}
                    formText={formText}
                    handleText={handleText}
                />
            )}
        </>
    );
};

const UrlPreview = (props) => {
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
                        value={`${props.productData.productUrl}?${
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
        const domainUrl = `${props.productData.productUrl}`.match(
            /^(?:\/\/|[^\/]+)*/
        )[0];
        const slug = `${props.productData.productUrl}`.match(/[^\/]+$/)[0];
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
                        value={`${domainUrl}/discount/${
                            props.formText.discountCode
                        }?redirect=%2Fproducts%2F${slug}${
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
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Controls Types</h5>
                            <form>
                                <div className="position-relative form-group">
                                    <label htmlFor="productUrl">
                                        Product URL
                                    </label>
                                    <input
                                        name="productUrl"
                                        id="productUrl"
                                        placeholder="Product URL"
                                        type="text"
                                        className="form-control"
                                        defaultValue={
                                            props.productData.productUrl
                                        }
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="discountCode">
                                        Discount Code
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
                            <h5 className="card-title">Product</h5>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <img
                                        src={
                                            props.productData.images[0]
                                                .originalSrc
                                        }
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-md-8 d-flex align-items-center">
                                    <h3>{props.productData.title}</h3>
                                </div>
                            </div>
                            <UrlPreview
                                domainUrl={props.domainUrl}
                                slug={props.slug}
                                productData={props.productData}
                                formText={props.formText}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateNewLink;
