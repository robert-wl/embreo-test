package db

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/pkg/utils"
	"gorm.io/gorm"
)

type Seeder interface {
	SeedUser() error
}

type seeder struct {
	db *gorm.DB
}

func NewSeeder(db *gorm.DB) Seeder {
	return &seeder{
		db: db,
	}
}

func (s *seeder) SeedUser() error {
	var count int64

	s.db.Model(&model.User{}).Count(&count)

	if count > 0 {
		return nil
	}

	vendorPass, err := utils.Encrypt("vendor")
	if err != nil {
		return err
	}

	companyPass, err := utils.Encrypt("company")
	if err != nil {
		return err
	}

	users := []model.User{
		{
			Username: "vendor",
			Password: vendorPass,
			Role:     "vendor",
		},
		{
			Username: "company",
			Password: companyPass,
			Role:     "company",
		},
	}

	for _, user := range users {
		if err := s.db.Create(&user).Error; err != nil {
			return err
		}
	}

	return nil
}
