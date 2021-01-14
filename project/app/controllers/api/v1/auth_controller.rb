class AuthController < ApplicationController
  skip_before_action :require_auth
  before_action :fetch_current_user
  before_action :require_anonymous, except: :logout

  def require_anonymous
    redirect_to root_path if @current_user
  end

  def login
    return render unless request.post?

    @user = User.find_by(login: params[:login])
    flash[:notice] = "Invalid credentials"

    return if @user.nil? || !@user.authenticate(params[:password])

    cookies[:user_id] = auth_verifier.generate(@user.id, expires_in: 1.hour, purpose: :auth)
    redirect_to root_path
  end

  def logout
    cookies.delete :user_id
    redirect_to login_path
  end

  def register
    if request.get?
      @user = User.new
    else
      handle_register
    end
  end

  def user_params
    params.permit(:login, :password)
  end

  private

  def handle_register
    @user = User.new(user_params)
    unless (User.find_by(login: params[:login]).nil?)
      flash[:notice] = "User with such username has been already registered."
      redirect_to login_path
      return
    end
    respond_to do |format|
      if @user.save
        format.html { redirect_to login_path, notice: "User was successfully registered." }
        format.json { render "users/show", status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end
end
