import React from "react";
import { Link } from "react-router-dom";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }
    componentDidMount() {
        const url = "/api/v1/products/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ products: response }))
            .catch(() => this.props.history.push("/"));
    }
    render() {
        const { products } = this.state;
        const allProducts = products.map((product, index) => (
            <div key={index} className="col-md-6 col-lg-3">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <Link to={`/product/${product.id}`} className="btn custom-button">
                            View Product
            </Link>
                    </div>
                </div>
            </div>
        ));
        const noProduct = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <h4>
                    No products yet. Why not <Link to="/product">add one?</Link>
                </h4>
            </div>
        );

        return (
            <>
                <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container py-5">
                        <h1 className="display-4">Products database</h1>
                        <p className="lead text-muted">
                            This magnificient database has everything you need(probably): from toilet paper to rocket fuel
            </p>
                    </div>
                </section>
                <div className="py-5">
                    <main className="container">
                        <div className="text-right mb-3">
                            <Link to="/product" className="btn custom-button">
                                Create New Product
              </Link>
                        </div>
                        <div className="row">
                            {products.length > 0 ? allProducts : noProduct}
                        </div>
                        <Link to="/" className="btn btn-link">
                            Home
            </Link>
                    </main>
                </div>
            </>
        );
    }

}
export default Products;