package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"gorm.io/gorm"
)

type UserRepository interface {
	FindBySecureID(secureID string) (*model.User, error)
	FindByUsername(email string) (*model.User, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{
		db: db,
	}
}

func (r *userRepository) FindBySecureID(secureID string) (*model.User, error) {
	var user model.User

	if err := r.db.Where("secure_id = ?", secureID).
		Preload("Company").
		Preload("Vendor").
		First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *userRepository) FindByUsername(username string) (*model.User, error) {
	var user model.User

	if err := r.db.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
