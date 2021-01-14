class Api::V1::ProductsController < ApplicationController
  def index
    product = Product.all.order(id: :desc)
    render json: product
  end

  def create
    product = Product.create!(product_params)
    if product
      render json: product
    else
      render json: product.errors
    end
  end

  def edit
    @product ||= Product.find("22")
    @product.update(name: params[:name], price: params[:price], amount: params[:amount])
    #@product.update(price: params[:price])
    # @product.update(amount: params[:amount])
    if product
      render json: product
    else
      render json: product.errors
    end
  end

  def show
    if product
      render json: product
    else
      render json: product.errors
    end
  end

  def destroy
    product&.destroy
    render json: { message: "Product deleted!" }
  end

  private

  def product_params
    params.permit(:name, :price, :amount)
  end

  def product
    @product ||= Product.find(params[:id])
  end
end
