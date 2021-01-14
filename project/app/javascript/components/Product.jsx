import React from "react";
import { Link } from "react-router-dom";


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { product: { name: name } };
        this.deleteProduct = this.deleteProduct.bind(this);

        // this.addHtmlEntities = this.addHtmlEntities.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/api/v1/show/${id}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ product: response }))
            .catch(() => this.props.history.push("/products"));
    }

    deleteProduct() {
        const {
            match: {
                params: { id }
            }
        } = this.props;
        const url = `/api/v1/destroy/${id}`;

        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(() => this.props.history.push("/products"))
            .catch(error => console.log(error.message));
    }
    render() {
        const { product } = this.state;
        const editURL = `/editProduct/${product.id}`;



        return (
            <div className="">
                <div className="hero position-relative d-flex align-items-center justify-content-center">
                    <div className="overlay bg-dark position-absolute" />
                    <h1 className="display-4 position-relative text-white">
                        {product.name}
                    </h1>
                </div>
                <div className="text-right mb-3">
                    <Link to={editURL} className="btn custom-button">
                        Edit Product
              </Link>
                </div>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-sm-12 col-lg-3">
                            <ul className="list-group">
                                <h5 className="mb-2">Product price</h5>
                                {product.price}
                            </ul>
                        </div>
                        <div className="col-sm-12 col-lg-7">
                            <h5 className="mb-2">Product amount left</h5>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${product.amount}`
                                }}
                            />
                        </div>
                        <div className="col-sm-12 col-lg-2">
                            <button type="button" className="btn btn-danger" onClick={this.deleteProduct}>
                                Delete product
              </button>
                        </div>
                    </div>
                    <Link to="/products" className="btn btn-link">
                        Back to list
          </Link>
                </div>
            </div >
        );
    }

}


export default Product;