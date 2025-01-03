package service

import (
	"fmt"
	"github.com/lib/pq"
	"github.com/robert-wl/backend/internal/application/dto"
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/domain/repository"
	"github.com/robert-wl/backend/internal/domain/service"
	"github.com/robert-wl/backend/pkg/pagination"
	"github.com/robert-wl/backend/pkg/utils"
	"time"
)

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
) service.EventService {
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
		return utils.NotFoundError(
			err,
			fmt.Sprintf("event type with id %s not found", dto.EventTypeID),
		)
	}

	company, err := s.companyRepo.FindBySecureID(dto.CompanyID)

	if err != nil {
		return utils.NotFoundError(
			err,
			fmt.Sprintf("company with id %s not found", dto.CompanyID),
		)
	}

	var dates pq.StringArray

	for _, date := range dto.Dates {
		parsedTime, err := time.Parse(time.RFC3339, date)

		if err != nil {
			return utils.BadRequestError(
				err,
				"invalid date format",
			)
		}

		if parsedTime.Before(time.Now()) {
			return utils.BadRequestError(
				err,
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
		return utils.InternalServerError(
			err,
			"failed to create event",
		)
	}

	return nil
}

func (s *eventService) findAllAsCompany(companyID string, dto *dto.GetEventRequest) ([]*model.Event, error) {
	dto.Pagination = pagination.Process(dto.Pagination)

	res, err := s.eventRepo.FindAllByCompany(companyID, dto.Search, dto.Pagination)

	for _, event := range res {
		event.Status = model.EventPending

		for _, response := range event.EventResponses {
			if response.Status == model.ResponseApproved {
				event.Status = model.EventStatus(response.Status)
				event.ApprovedVendor = response.Vendor
				break
			}
		}
	}

	if err != nil {
		return nil, utils.InternalServerError(
			err,
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

		responses := event.EventResponses
		event.EventResponses = nil
		for _, response := range responses {
			if response.Vendor.SecureID == vendorID {
				event.Status = model.EventStatus(response.Status)
				event.ApprovedVendor = response.Vendor
				break
			}
		}
	}

	if err != nil {
		return nil, utils.InternalServerError(
			err,
			"failed to find events",
		)
	}

	return resultEvents, nil
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
		return nil, utils.InternalServerError(
			err,
			"failed to find events",
		)
	}

	return res, nil
}

func (s *eventService) FindBySecureId(user *model.User, secureID string) (*model.Event, error) {
	event, err := s.eventRepo.FindBySecureID(secureID)

	if err != nil {
		return nil, utils.NotFoundError(
			err,
			"event not found",
		)
	}

	if user.Role == model.CompanyRole && user.Company.SecureID != event.Company.SecureID {
		return nil, utils.ForbiddenError(
			nil,
			"you are not authorized to view this event",
		)
	}

	if user.Role == model.VendorRole {
		vendors, err := s.vendorRepo.FindAllByEventType(event.EventType.SecureID)

		if err != nil {
			return nil, utils.InternalServerError(
				err,
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
			return nil, utils.ForbiddenError(
				nil,
				"you are not authorized to view this event",
			)
		}
	}

	return event, nil
}

func (s *eventService) FindAllType(dto *dto.GetEventTypeRequest) ([]*model.EventType, error) {
	if dto.VendorID == nil {
		res, err := s.eventTypeRepo.FindAll()

		if err != nil {
			return nil, utils.InternalServerError(
				err,
				"failed to find event types",
			)
		}

		return res, nil
	}

	res, err := s.eventTypeRepo.FindAllByVendorID(*dto.VendorID)

	if err != nil {
		return nil, utils.InternalServerError(
			err,
			"failed to find event types",
		)
	}

	return res, nil
}

func (s *eventService) validateVendorAssociation(vendorID, eventID string) error {
	vendors, err := s.vendorRepo.FindAllByEvent(eventID)

	if err != nil {
		return utils.InternalServerError(
			err,
			"failed to fetch associated vendors",
		)
	}

	for _, vendor := range vendors {
		if vendor.SecureID == vendorID {
			return nil
		}
	}

	return utils.ForbiddenError(
		nil,
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
		return utils.NotFoundError(
			err,
			"event not found",
		)
	}

	if user.Role == model.CompanyRole {
		return utils.ForbiddenError(
			nil,
			"you are not authorized to set status",
		)
	}

	if err := s.validateVendorAssociation(user.Vendor.SecureID, event.SecureID); err != nil {
		return err
	}

	if s.hasVendorResponded(event.EventResponses, user.Vendor.SecureID) {
		return utils.BadRequestError(
			nil,
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
		return utils.InternalServerError(
			err,
			"failed to create event response",
		)
	}

	if res.Status == model.ResponseApproved {
		event.Status = model.EventApproved

		date, err := time.Parse(time.RFC3339, *dto.ApprovedAt)

		if err != nil {
			return utils.BadRequestError(
				err,
				"invalid date format",
			)
		}

		event.ApprovedAt = &date

		err = s.eventRepo.Update(event)

		if err != nil {
			return utils.InternalServerError(
				err,
				"failed to update event",
			)
		}
	}

	return nil
}
