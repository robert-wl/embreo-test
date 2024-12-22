package service

import (
	"fmt"
	"github.com/lib/pq"
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/dto"
	"github.com/robert-wl/backend/internal/infrastructure/repository"
	"github.com/robert-wl/backend/pkg/pagination"
	"github.com/robert-wl/backend/pkg/utils"
	"net/http"
	"time"
)

type EventService interface {
	CreateEvent(user *model.User, dto *dto.CreateEventRequest) error
	FindAll(user *model.User, dto *dto.GetEventRequest) ([]*model.Event, error)
	FindAllByCompany(companyID string, dto *dto.GetEventRequest) ([]*model.Event, error)
	FindAllByVendor(vendorID string, dto *dto.GetEventRequest) ([]*model.Event, error)
	FindBySecureId(user *model.User, secureID string) (*model.Event, error)
	FindAllType() ([]*model.EventType, error)
}

type eventService struct {
	eventRepo     repository.EventRepository
	eventTypeRepo repository.EventTypeRepository
	companyRepo   repository.CompanyRepository
	vendorRepo    repository.VendorRepository
}

func NewEventService(er repository.EventRepository, etr repository.EventTypeRepository, cr repository.CompanyRepository, vr repository.VendorRepository) EventService {
	return &eventService{
		eventRepo:     er,
		eventTypeRepo: etr,
		companyRepo:   cr,
		vendorRepo:    vr,
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
		EventType: eventType,
		Company:   company,
		User:      user,
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

func (s *eventService) FindAllByCompany(companyID string, dto *dto.GetEventRequest) ([]*model.Event, error) {
	dto.Pagination = pagination.Process(dto.Pagination)

	if dto.Search == nil {
		dto.Search = new(string)
	}

	res, err := s.eventRepo.FindAllByCompany(companyID, dto.Search, dto.Pagination)

	if err != nil {
		return nil, utils.NewAppError(
			err,
			http.StatusInternalServerError,
			"failed to find events",
		)
	}

	return res, nil
}

func (s *eventService) FindAllByVendor(vendorID string, dto *dto.GetEventRequest) ([]*model.Event, error) {
	dto.Pagination = pagination.Process(dto.Pagination)

	if dto.Search == nil {
		dto.Search = new(string)
	}

	res, err := s.eventRepo.FindAllByVendor(vendorID, dto.Search, dto.Pagination)

	if err != nil {
		return nil, utils.NewAppError(
			err,
			http.StatusInternalServerError,
			"failed to find events",
		)
	}

	return res, nil
}

func (s *eventService) FindAll(user *model.User, dto *dto.GetEventRequest) ([]*model.Event, error) {
	dto.Pagination = pagination.Process(dto.Pagination)

	var res []*model.Event
	var err error

	if user.Role == model.CompanyRole {
		res, err = s.FindAllByCompany(user.Company.SecureID, dto)
	} else if user.Role == model.VendorRole {
		res, err = s.FindAllByVendor(user.Vendor.SecureID, dto)
	}

	if err != nil {
		return nil, utils.NewAppError(
			err,
			http.StatusInternalServerError,
			"failed to find events",
		)
	}

	return res, nil
}

func (s *eventService) FindBySecureId(user *model.User, secureID string) (*model.Event, error) {
	event, err := s.eventRepo.FindBySecureID(secureID)

	if err != nil {
		return nil, utils.NewAppError(
			err,
			http.StatusInternalServerError,
			"failed to find event",
		)
	}

	if user.Role == model.CompanyRole && user.Company.SecureID != event.Company.SecureID {
		return nil, utils.NewAppError(
			nil,
			http.StatusForbidden,
			"forbidden",
		)
	}

	if user.Role == model.VendorRole {
		vendors, err := s.vendorRepo.FindAllByEventType(event.EventType.SecureID)

		if err != nil {
			return nil, utils.NewAppError(
				err,
				http.StatusInternalServerError,
				"failed to find vendors",
			)
		}

		hasVendor := false
		for _, vendor := range vendors {
			if vendor.SecureID == user.Vendor.SecureID {
				hasVendor = true
				break
			}
		}

		if !hasVendor {
			return nil, utils.NewAppError(
				nil,
				http.StatusForbidden,
				"forbidden",
			)
		}
	}

	return event, nil
}

func (s *eventService) FindAllType() ([]*model.EventType, error) {
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
