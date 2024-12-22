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
	FindBySecureId(user *model.User, secureID string) (*model.Event, error)
	FindAllType() ([]*model.EventType, error)
	SetStatus(user *model.User, secureID string, dto *dto.SetStatusRequest) error
}

type eventService struct {
	eventRepo         repository.EventRepository
	eventTypeRepo     repository.EventTypeRepository
	eventResponseRepo repository.EventResponseRepository
	companyRepo       repository.CompanyRepository
	vendorRepo        repository.VendorRepository
}

func NewEventService(
	er repository.EventRepository,
	etr repository.EventTypeRepository,
	err repository.EventResponseRepository,
	cr repository.CompanyRepository,
	vr repository.VendorRepository,
) EventService {
	return &eventService{
		eventRepo:         er,
		eventTypeRepo:     etr,
		eventResponseRepo: err,
		companyRepo:       cr,
		vendorRepo:        vr,
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

func (s *eventService) findAllAsCompany(companyID string, dto *dto.GetEventRequest) ([]*model.Event, error) {
	dto.Pagination = pagination.Process(dto.Pagination)

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

func (s *eventService) findAllAsVendor(vendorID string, dto *dto.GetEventRequest) ([]*model.Event, error) {
	dto.Pagination = pagination.Process(dto.Pagination)

	res, err := s.eventRepo.FindAllByVendor(vendorID, dto.Search, dto.Pagination)

	var resultEvents []*model.Event

	for _, event := range res {
		if event.Status != model.EventApproved {
			resultEvents = append(resultEvents, event)
		}

		event.Status = model.EventPending

		for _, response := range event.EventResponses {
			if response.Vendor.SecureID == vendorID {
				event.Status = model.EventStatus(response.Status)
				break
			}
		}
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

func (s *eventService) FindAll(user *model.User, dto *dto.GetEventRequest) ([]*model.Event, error) {
	var res []*model.Event
	var err error

	switch user.Role {
	case model.CompanyRole:
		res, err = s.findAllAsCompany(user.Company.SecureID, dto)
	case model.VendorRole:
		res, err = s.findAllAsVendor(user.Vendor.SecureID, dto)
	}

	if err != nil {
		return nil, err
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

func (s *eventService) validateVendorAssociation(vendorID, eventID string) error {
	vendors, err := s.vendorRepo.FindAllByEvent(eventID)
	if err != nil {
		return utils.NewAppError(err, http.StatusInternalServerError, "failed to fetch associated vendors")
	}

	for _, vendor := range vendors {
		if vendor.SecureID == vendorID {
			return nil
		}
	}

	return utils.NewAppError(
		fmt.Errorf("unauthorized"),
		http.StatusForbidden,
		"vendor is not associated with this event",
	)
}

func (s *eventService) hasVendorResponded(responses []model.EventResponse, vendorID string) bool {
	for _, response := range responses {
		if response.Vendor.SecureID == vendorID {
			return true
		}
	}
	return false
}

func (s *eventService) SetStatus(user *model.User, secureID string, dto *dto.SetStatusRequest) error {
	event, err := s.eventRepo.FindBySecureID(secureID)

	if err != nil {
		return utils.NewAppError(
			err,
			http.StatusNotFound,
			"event not found",
		)
	}

	if user.Role == model.CompanyRole {
		return utils.NewAppError(
			fmt.Errorf("unauthorized"),
			http.StatusForbidden,
			"unauthorized",
		)
	}

	if err := s.validateVendorAssociation(user.Vendor.SecureID, event.SecureID); err != nil {
		return err
	}

	if s.hasVendorResponded(event.EventResponses, user.Vendor.SecureID) {
		return utils.NewAppError(
			fmt.Errorf("response already set"),
			http.StatusBadRequest,
			"response already set",
		)
	}

	res := &model.EventResponse{
		Status:  dto.Status,
		Remarks: dto.Remarks,
		Event:   *event,
		Vendor:  *user.Vendor,
	}
	err = s.eventResponseRepo.Create(res)

	if err != nil {
		return utils.NewAppError(
			err,
			http.StatusInternalServerError,
			"failed to create event response",
		)
	}

	if res.Status == model.ResponseApproved {
		event.Status = model.EventApproved

		err = s.eventRepo.Update(event)

		if err != nil {
			return utils.NewAppError(
				err,
				http.StatusInternalServerError,
				"failed to update event",
			)
		}
	}

	return nil
}
