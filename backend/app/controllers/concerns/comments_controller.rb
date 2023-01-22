class CommentsController < ApplicationController
  skip_before_action :is_authorized

  def show
    search = params[:search]
    order = params[:order]
    post = Post.find(params[:id])
    if order == '0'
      if search.length
        comment = post.comments.joins(:user).where("body ILIKE ? OR username ILIKE ?", "%#{search}%", "%#{search}%").order(created_at: :desc)
      else
        comment = post.comments.all.order(created_at: :desc)
      end
    else
      if search.length
        comment = post.comments.joins(:user).where("body ILIKE ? OR username ILIKE ?", "%#{search}%", "%#{search}%").order(created_at: :asc)
      else
        comment = post.comments.all.order(created_at: :asc)
      end
    end
    render json: comment, include: [:user]
  end

  def create
    auth_header = request.headers["Authorization"]
    user_token = auth_header.split(" ")[1]
    @user_id = JWT.decode(user_token, Rails.application.secrets.secret_key_base[0])[0]["user_id"]
    post = Post.find(comment_params["post_id"])
    comment = post.comments.create!(body: comment_params["body"],user_id: @user_id)
    if comment
      render json: comment
    else
      render json: comment.errors
    end
  end

  def destroy
    auth_header = request.headers["Authorization"]
    user_token = auth_header.split(" ")[1]
    comment = Comment.find(params[:id])
    @user_id = JWT.decode(user_token, Rails.application.secrets.secret_key_base[0])[0]["user_id"]
    if comment.user.id != @user_id
      render json: {
        error: "Unauthorised user",
        status: 401
      }, status: 401
    else
      comment&.destroy
      render json: { message: 'Comment deleted!' }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:post_id, :body)
  end

end
