import React from "react";
import { Link } from "react-router-dom";

class NewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            amount: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/products/create";
        const { name, price, amount } = this.state;

        if (name.length == 0 || parseInt(amount, 10) == 0 || parseInt(price, 10) == 0)
            return;

        const body = {
            name,
            price,
            amount: amount.replace(/\n/g, "<br> <br>")
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.props.history.push(`/product/${response.id}`))
            .catch(error => console.log(error.message));
    }
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h1 className="font-weight-normal mb-5">
                            Add a new product to our awesome product database.
            </h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="productName">Product name</label>
                                <input
                                    type="text"
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
                                name="amount"
                                required
                                onChange={this.onChange}
                            />
                            <button type="submit" className="btn custom-button mt-3">
                                Create Product
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

export default NewProduct;