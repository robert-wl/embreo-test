package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/pkg/pagination"
	"gorm.io/gorm"
)

type EventRepository interface {
	Create(event *model.Event) error
	Update(event *model.Event) error
	FindBySecureID(secureID string) (*model.Event, error)
	FindAllByCompany(companyID string, search *string, pagination *pagination.Pagination) ([]*model.Event, error)
	FindAllByVendor(vendorID string, search *string, pagination *pagination.Pagination) ([]*model.Event, error)
}

type eventRepository struct {
	db *gorm.DB
}

func NewEventRepository(db *gorm.DB) EventRepository {
	return &eventRepository{
		db: db,
	}
}

func (r *eventRepository) Create(event *model.Event) error {
	return r.db.Create(event).Error
}

func (r *eventRepository) Update(event *model.Event) error {
	return r.db.Save(event).Error
}

func (r *eventRepository) FindBySecureID(secureID string) (*model.Event, error) {
	var event model.Event

	err := r.db.
		Where("secure_id = ?", secureID).
		Preload("Company").
		Preload("User").
		Preload("EventType").
		Preload("EventResponses").
		Preload("EventResponses.Vendor").
		First(&event).Error

	if err != nil {
		return nil, err
	}

	return &event, nil
}

func (r *eventRepository) FindAllByCompany(companyID string, search *string, pagination *pagination.Pagination) ([]*model.Event, error) {
	var events []*model.Event

	query := r.db.Model(&model.Event{}).
		Scopes(pagination.Paginate()).
		Joins("Company", r.db.Where(&model.Company{SecureID: companyID}))

	if search != nil && *search != "" {
		query = query.Where("location LIKE ?", "%"+*search+"%")
	}

	err := query.
		Preload("EventType").
		Preload("EventResponses").
		Preload("EventResponses.Vendor").
		Find(&events).Error

	if err != nil {
		return nil, err
	}

	return events, nil
}

func (r *eventRepository) FindAllByVendor(vendorID string, search *string, pagination *pagination.Pagination) ([]*model.Event, error) {
	var events []*model.Event

	query := r.db.Model(&model.Event{}).
		Scopes(pagination.Paginate()).
		Joins("JOIN event_types ON events.event_type_id = event_types.id").
		Joins("JOIN vendor_event_types ON event_types.id = vendor_event_types.event_type_id").
		Joins("JOIN vendors ON vendor_event_types.vendor_id = vendors.id").
		Where("vendors.secure_id = ?", vendorID)

	if search != nil && *search != "" {
		query = query.Where("location LIKE ?", "%"+*search+"%")
	}

	err := query.
		Preload("EventType").
		Preload("EventResponses").
		Preload("EventResponses.Vendor").
		Find(&events).Error

	if err != nil {
		return nil, err
	}

	return events, nil
}
