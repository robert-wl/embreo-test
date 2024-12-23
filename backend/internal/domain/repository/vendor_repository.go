package repository

import "github.com/robert-wl/backend/internal/domain/model"

type VendorRepository interface {
	FindAllByEvent(eventID string) ([]*model.Vendor, error)
	FindAllByEventType(eventTypeID string) ([]*model.Vendor, error)
}
