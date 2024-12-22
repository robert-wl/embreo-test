package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"gorm.io/gorm"
)

type EventTypeRepository interface {
	FindAll() ([]*model.EventType, error)
	FindBySecureID(secureID string) (*model.EventType, error)
}

type eventTypeRepository struct {
	db *gorm.DB
}

func NewEventTypeRepository(db *gorm.DB) EventTypeRepository {
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

func (r *eventTypeRepository) FindBySecureID(secureID string) (*model.EventType, error) {
	var event model.EventType

	if err := r.db.Where("secure_id = ?", secureID).First(&event).Error; err != nil {
		return nil, err
	}

	return &event, nil
}
