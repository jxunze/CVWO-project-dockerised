class PostsController < ApplicationController
  skip_before_action :is_authorized

  def index
    search = params[:search]
    order = params[:order]
    if order == '0'
      if search.length
        post = Post.joins(:user).where("body ILIKE ? OR title ILIKE ? OR username ILIKE ?", "%#{search}%", "%#{search}%", "%#{search}%").order(created_at: :desc)
      else
        post = Post.all.order(created_at: :desc)
      end
    else
      if search.length
        post = Post.joins(:user).where("body ILIKE ? OR title ILIKE ? OR username ILIKE ?", "%#{search}%", "%#{search}%", "%#{search}%").order(created_at: :asc)
      else
        post = Post.all.order(created_at: :asc)
      end
    end
    render json: post, include: [:user]
  end

  def create
    auth_header = request.headers["Authorization"]
    user_token = auth_header.split(" ")[1]
    @user_id = JWT.decode(user_token, Rails.application.secrets.secret_key_base[0])[0]["user_id"]
    post = Post.create!(title:post_params["title"], body:post_params["body"], user_id: @user_id)
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def show
    post = Post.find(params[:id])
    render json: post, include: [:user]
  end

  def update
    auth_header = request.headers["Authorization"]
    user_token = auth_header.split(" ")[1]
    post = Post.find(params[:id])
    @user_id = JWT.decode(user_token, Rails.application.secrets.secret_key_base[0])[0]["user_id"]
    if post.user.id != @user_id
      render json: {
        error: "Unauthorised user",
        status: 401
      }, status: 401
    else
      res = post.update(post_params)
      render json: res
    end
  end

  def destroy
    auth_header = request.headers["Authorization"]
    user_token = auth_header.split(" ")[1]
    post = Post.find(params[:id])
    @user_id = JWT.decode(user_token, Rails.application.secrets.secret_key_base[0])[0]["user_id"]
    if post.user.id != @user_id
      render json: {
        error: "Unauthorised user",
        status: 401
      }, status: 401
    else
      post&.destroy
      render json: { message: 'Post deleted!' }
    end

  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end

end
