package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"gorm.io/gorm"
)

type VendorRepository interface {
	FindAllByEventType(eventTypeID string) ([]*model.Vendor, error)
}

type vendorRepository struct {
	db *gorm.DB
}

func NewVendorRepository(db *gorm.DB) VendorRepository {
	return &vendorRepository{
		db: db,
	}
}

func (r *vendorRepository) FindAllByEventType(eventTypeID string) ([]*model.Vendor, error) {
	var vendors []*model.Vendor

	err := r.db.
		Joins("JOIN vendor_event_types ON vendors.id = vendor_event_types.vendor_id").
		Joins("JOIN event_types ON event_types.id = vendor_event_types.event_type_id").
		Where("event_types.secure_id = ?", eventTypeID).
		Find(&vendors).Error

	if err != nil {
		return nil, err
	}

	return vendors, nil
}
