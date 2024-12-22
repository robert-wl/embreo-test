package service

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/infrastructure/repository"
)

type VendorService interface {
	FindAllByEvent(eventTypeID string) ([]*model.Vendor, error)
}

type vendorService struct {
	vendorRepo repository.VendorRepository
}

func NewVendorService(vr repository.VendorRepository) VendorService {
	return &vendorService{
		vendorRepo: vr,
	}
}

func (s *vendorService) FindAllByEvent(eventTypeID string) ([]*model.Vendor, error) {
	return s.vendorRepo.FindAllByEvent(eventTypeID)
}
