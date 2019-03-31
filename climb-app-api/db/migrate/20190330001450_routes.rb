class Routes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.string :name
      t.string :description
      t.string :route_type
      t.string :difficulty
      t.integer :location_id

      t.timestamps
    end
  end
end
