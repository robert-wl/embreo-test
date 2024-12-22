package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/pkg/pagination"
	"gorm.io/gorm"
)

type EventRepository interface {
	Create(event *model.Event) error
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

func (r *eventRepository) FindAllByCompany(companyID string, search *string, pagination *pagination.Pagination) ([]*model.Event, error) {
	var events []*model.Event

	err := r.db.
		Scopes(pagination.Paginate()).
		Joins("JOIN companies ON companies.id = events.company_id").
		Where("companies.secure_id = ?", companyID).
		Where("title LIKE ?", "%"+*search+"%").
		Preload("EventType").
		Find(&events).Error

	if err != nil {
		return nil, err
	}

	return events, nil
}

func (r *eventRepository) FindAllByVendor(vendorID string, search *string, pagination *pagination.Pagination) ([]*model.Event, error) {
	var events []*model.Event

	err := r.db.
		Scopes(pagination.Paginate()).
		Joins("JOIN event_vendors ON event_vendors.event_id = events.id").
		Joins("vendors ON vendors.id = event_vendors.vendor_id").
		Where("vendors.secure_id = ?", vendorID).
		Where("title LIKE ?", "%"+*search+"%").
		Preload("EventType").
		Find(&events).Error

	if err != nil {
		return nil, err
	}

	return events, nil
}
