package service

import (
	"github.com/robert-wl/backend/internal/application/dto"
	"github.com/robert-wl/backend/internal/domain/model"
)

type EventService interface {
	CreateEvent(user *model.User, dto *dto.CreateEventRequest) error
	FindAll(user *model.User, dto *dto.GetEventRequest) ([]*model.Event, error)
	FindBySecureId(user *model.User, secureID string) (*model.Event, error)
	FindAllType() ([]*model.EventType, error)
	SetStatus(user *model.User, secureID string, dto *dto.SetStatusRequest) error
}
