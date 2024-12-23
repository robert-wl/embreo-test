package service

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/domain/repository"
	"github.com/robert-wl/backend/internal/domain/service"
)

type vendorService struct {
	vendorRepo repository.VendorRepository
}

func NewVendorService(vr repository.VendorRepository) service.VendorService {
	return &vendorService{
		vendorRepo: vr,
	}
}

func (s *vendorService) FindAllByEvent(eventTypeID string) ([]*model.Vendor, error) {
	return s.vendorRepo.FindAllByEvent(eventTypeID)
}
