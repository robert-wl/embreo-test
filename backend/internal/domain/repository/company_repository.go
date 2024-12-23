package repository

import "github.com/robert-wl/backend/internal/domain/model"

type CompanyRepository interface {
	FindBySecureID(secureID string) (*model.Company, error)
}
