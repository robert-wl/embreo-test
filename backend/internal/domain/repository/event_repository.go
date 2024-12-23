package repository

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/pkg/pagination"
)

type EventRepository interface {
	Create(event *model.Event) error
	Update(event *model.Event) error
	FindBySecureID(secureID string) (*model.Event, error)
	FindAllByCompany(companyID string, search *string, pagination *pagination.Pagination) ([]*model.Event, error)
	FindAllByVendor(vendorID string, search *string, pagination *pagination.Pagination) ([]*model.Event, error)
}
