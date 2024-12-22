package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"gorm.io/gorm"
)

type CompanyRepository interface {
	FindBySecureID(secureID string) (*model.Company, error)
}

type companyRepository struct {
	db *gorm.DB
}

func NewCompanyRepository(db *gorm.DB) CompanyRepository {
	return &companyRepository{
		db: db,
	}
}

func (r *companyRepository) FindBySecureID(secureID string) (*model.Company, error) {
	var company model.Company

	if err := r.db.Where("secure_id = ?", secureID).First(&company).Error; err != nil {
		return nil, err
	}

	return &company, nil
}
