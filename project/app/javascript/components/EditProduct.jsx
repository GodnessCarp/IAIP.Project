import React from "react";
import { Link } from "react-router-dom";

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.id,
            name: this.name,
            price: this.price,
            amount: this.amount
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const {
            match: {
                params: { id }
            }
        } = this.props;
        const { name, price, amount } = this.state;
        const body = {
            name,
            price,
            amount: amount.replace(/\n/g, "<br> <br>")
        };
        const url = `/api/v1/edit/${id}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => this.setState({ product: response }))
            .then(() => this.props.history.push("/products"));


    }
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h1 className="font-weight-normal mb-5">
                            Edit your product properties
            </h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="productName">Product name</label>
                                <input
                                    type="text"
                                    defaultValue={this.name}
                                    name="name"
                                    id="productName"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productPrice">Price</label>
                                <input type="number"
                                    name="price"
                                    defaultValue={this.price}
                                    id="productPrice"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                                <small id="Help" className="form-text text-muted">
                                    Better think twice...                </small>
                            </div>
                            <label htmlFor="amount">Amount</label>
                            <input type="number"
                                className="form-control"
                                id="amount"
                                defaultValue={this.amount}
                                name="amount"
                                required
                                onChange={this.onChange}
                            />
                            <button type="submit" className="btn custom-button mt-3">
                                Edit Product
              </button>
                            <Link to="/products" className="btn btn-link mt-3">
                                Back to products
              </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProduct;