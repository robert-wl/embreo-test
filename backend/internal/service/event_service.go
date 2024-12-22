package service

import (
	"fmt"
	"github.com/lib/pq"
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/dto"
	"github.com/robert-wl/backend/internal/infrastructure/repository"
	"github.com/robert-wl/backend/pkg/utils"
	"net/http"
	"time"
)

type EventService interface {
	CreateEvent(user *model.User, dto *dto.CreateEventRequest) error
	FindAllType() ([]model.EventType, error)
}

type eventService struct {
	eventRepo     repository.EventRepository
	eventTypeRepo repository.EventTypeRepository
	companyRepo   repository.CompanyRepository
}

func NewEventService(er repository.EventRepository, etr repository.EventTypeRepository, cr repository.CompanyRepository) EventService {
	return &eventService{
		eventRepo:     er,
		eventTypeRepo: etr,
		companyRepo:   cr,
	}
}

func (s *eventService) CreateEvent(user *model.User, dto *dto.CreateEventRequest) error {
	eventType, err := s.eventTypeRepo.FindBySecureID(dto.EventTypeID)

	if err != nil {
		return utils.NewAppError(
			err,
			http.StatusNotFound,
			"event type not found",
		)
	}

	company, err := s.companyRepo.FindBySecureID(dto.CompanyID)

	if err != nil {
		return utils.NewAppError(
			err,
			http.StatusNotFound,
			"company not found",
		)
	}

	var dates pq.StringArray

	for _, date := range dto.Dates {
		parsedTime, err := time.Parse(time.RFC3339, date)

		if err != nil {
			return utils.NewAppError(
				err,
				http.StatusBadRequest,
				"invalid date format",
			)
		}

		if parsedTime.Before(time.Now()) {
			return utils.NewAppError(
				err,
				http.StatusBadRequest,
				"date cannot be in the past",
			)
		}

		dates = append(dates, parsedTime.Format("2006-01-02 15:04:05"))
	}

	event := model.Event{
		EventType: *eventType,
		Company:   *company,
		User:      *user,
		Dates:     dates,
		Location:  dto.Location,
	}

	fmt.Println(event)

	err = s.eventRepo.Create(&event)

	if err != nil {
		return utils.NewAppError(
			err,
			http.StatusInternalServerError,
			"failed to create event",
		)
	}

	return nil
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
