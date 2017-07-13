class CreatePeople < ActiveRecord::Migration[5.1]
  def change
    create_table :people do |t|
      t.string :name
      t.date :birthday
      t.integer :number
      t.text :description

      t.timestamps
    end
  end
end
