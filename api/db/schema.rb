# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_05_24_004632) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_passwords", force: :cascade do |t|
    t.string "password"
    t.datetime "public_until"
    t.bigint "account_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_account_passwords_on_account_id"
  end

  create_table "accounts", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.float "price", null: false
    t.string "password_digest"
    t.bigint "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_accounts_on_group_id"
  end

  create_table "group_invoices", force: :cascade do |t|
    t.bigint "group_id", null: false
    t.bigint "group_user_id", null: false
    t.bigint "invoice_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_group_invoices_on_group_id"
    t.index ["group_user_id"], name: "index_group_invoices_on_group_user_id"
    t.index ["invoice_id"], name: "index_group_invoices_on_invoice_id"
  end

  create_table "group_user_permissions", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.bigint "group_user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_group_user_permissions_on_account_id"
    t.index ["group_user_id"], name: "index_group_user_permissions_on_group_user_id"
  end

  create_table "group_users", force: :cascade do |t|
    t.string "confirmation_token"
    t.bigint "group_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_group_users_on_group_id"
    t.index ["user_id"], name: "index_group_users_on_user_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_groups_on_user_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.float "price"
    t.datetime "paid_in"
    t.datetime "expires_in"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "account_passwords", "accounts"
  add_foreign_key "accounts", "groups"
  add_foreign_key "group_invoices", "group_users"
  add_foreign_key "group_invoices", "groups"
  add_foreign_key "group_invoices", "invoices"
  add_foreign_key "group_user_permissions", "accounts"
  add_foreign_key "group_user_permissions", "group_users"
  add_foreign_key "group_users", "groups"
  add_foreign_key "group_users", "users"
  add_foreign_key "groups", "users"
end
