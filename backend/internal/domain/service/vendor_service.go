package service

import "github.com/robert-wl/backend/internal/domain/model"

type VendorService interface {
	FindAllByEvent(eventTypeID string) ([]*model.Vendor, error)
}
