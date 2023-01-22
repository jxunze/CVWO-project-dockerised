class User < ApplicationRecord
    has_secure_password
    has_many :comments
    has_many :posts
    validates_presence_of :username, :password_digest
    validates_uniqueness_of :username
end
