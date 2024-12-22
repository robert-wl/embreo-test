package service

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/infrastructure/repository"
	"github.com/robert-wl/backend/pkg/utils"
	"net/http"
)

type EventService interface {
	FindAllType() ([]model.EventType, error)
}

type eventService struct {
	eventRepo     repository.EventRepository
	eventTypeRepo repository.EventTypeRepository
}

func NewEventService(er repository.EventRepository, etr repository.EventTypeRepository) EventService {
	return &eventService{
		eventRepo:     er,
		eventTypeRepo: etr,
	}
}

func (s *eventService) FindAllType() ([]model.EventType, error) {
	res, err := s.eventTypeRepo.FindAll()

	if err != nil {
		return nil, utils.NewAppError(
			err,
			http.StatusInternalServerError,
			"failed to find event types",
		)
	}

	return res, nil
}
