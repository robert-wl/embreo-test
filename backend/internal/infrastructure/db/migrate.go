package db

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"gorm.io/gorm"
)

func AutoMigrate(db *gorm.DB) error {
	err := db.AutoMigrate(
		&model.User{},
		&model.EventType{},
		&model.Event{},
		&model.Company{},
		&model.Vendor{},
		&model.EventResponse{},
	)

	return err
}
