package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/domain/repository"
	"gorm.io/gorm"
)

type eventResponseRepository struct {
	db *gorm.DB
}

func NewEventResponseRepository(db *gorm.DB) repository.EventResponseRepository {
	return &eventResponseRepository{
		db: db,
	}
}

func (r *eventResponseRepository) Create(eventResponse *model.EventResponse) error {
	return r.db.Create(eventResponse).Error
}
