package repository

import "github.com/robert-wl/backend/internal/domain/model"

type UserRepository interface {
	FindBySecureID(secureID string) (*model.User, error)
	FindByUsername(email string) (*model.User, error)
}
