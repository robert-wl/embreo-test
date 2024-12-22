package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"gorm.io/gorm"
)

type EventResponseRepository interface {
	Create(eventResponse *model.EventResponse) error
}

type eventResponseRepository struct {
	db *gorm.DB
}

func NewEventResponseRepository(db *gorm.DB) EventResponseRepository {
	return &eventResponseRepository{
		db: db,
	}
}

func (r *eventResponseRepository) Create(eventResponse *model.EventResponse) error {
	return r.db.Create(eventResponse).Error
}
