package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/domain/repository"
	"gorm.io/gorm"
)

type companyRepository struct {
	db *gorm.DB
}

func NewCompanyRepository(db *gorm.DB) repository.CompanyRepository {
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
