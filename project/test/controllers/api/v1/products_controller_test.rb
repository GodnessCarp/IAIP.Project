require 'test_helper'

class Api::V1::ProductsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_products_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_products_create_url
    assert_response :success
  end

  test "should get edit" do
    get api_v1_products_edit_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_products_show_url
    assert_response :success
  end

  test "should get destroy/Users/ingibitr/Documents/Ruby_labs/final_app_v2" do
    get api_v1_products_destroy/Users/ingibitr/Documents/Ruby_labs/final_app_v2_url
    assert_response :success
  end

end
