package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/domain/repository"
	"gorm.io/gorm"
)

type eventTypeRepository struct {
	db *gorm.DB
}

func NewEventTypeRepository(db *gorm.DB) repository.EventTypeRepository {
	return &eventTypeRepository{
		db: db,
	}
}

func (r *eventTypeRepository) FindAll() ([]*model.EventType, error) {
	var events []*model.EventType

	if err := r.db.Find(&events).Error; err != nil {
		return nil, err
	}

	return events, nil
}

func (r *eventTypeRepository) FindAllByVendorID(vendorID string) ([]*model.EventType, error) {
	var events []*model.EventType

	if err := r.db.
		Joins("JOIN vendor_event_types ON vendor_event_types.event_type_id = event_types.id").
		Joins("JOIN vendors ON vendors.id = vendor_event_types.vendor_id").
		Where("vendors.secure_id = ?", vendorID).Find(&events).Error; err != nil {
		return nil, err
	}

	return events, nil
}

func (r *eventTypeRepository) FindBySecureID(secureID string) (*model.EventType, error) {
	var event model.EventType

	if err := r.db.Where("secure_id = ?", secureID).First(&event).Error; err != nil {
		return nil, err
	}

	return &event, nil
}
