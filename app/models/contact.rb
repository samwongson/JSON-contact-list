class Contact < ActiveRecord::Base

  scope :gen, -> (gen){ where("firstname like ? or lastname like ? or email like ?", "%#{gen}%", "%#{gen}%", "%#{gen}%")}

end