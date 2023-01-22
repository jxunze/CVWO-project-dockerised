class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :first_name
      t.string :last_name

      t.timestamps
    end

    create_table :posts do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.timestamps
    end

    create_table :comments do |t|
      t.text :body, null: false
      t.timestamps
    end
  end
end
