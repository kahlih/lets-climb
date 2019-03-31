class RouteAttempts < ActiveRecord::Migration[5.2]
  def change
    create_table :route_attempts do |t|
      t.string :summary
      t.integer :user_route_id

      t.timestamps
    end
  end
end
