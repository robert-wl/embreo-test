package repository

import "github.com/robert-wl/backend/internal/domain/model"

type EventTypeRepository interface {
	FindAll() ([]*model.EventType, error)
	FindBySecureID(secureID string) (*model.EventType, error)
}
