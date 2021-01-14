import React from "react";
import { Link } from "react-router-dom";
import App from "./App";


export default () => (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
                <h1 className="display-4">Food Recipes</h1>
                <p className="lead">
                    A curated list of recipes for the best homemade meal and delicacies.
        </p>
                <p className="my-4"> </p>
                <hr className="my-4" />
                <Link
                    to="/products"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    View Products
        </Link>
                <hr className="my-4" />
                <Link
                    to="/login"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    Login
        </Link>
                <hr className="my-4" />
                <Link
                    to="/signup"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    Sign up
        </Link>
            </div>
        </div>
    </div>
);