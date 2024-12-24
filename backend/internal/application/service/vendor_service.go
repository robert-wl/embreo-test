package service

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/domain/repository"
	"github.com/robert-wl/backend/internal/domain/service"
	"github.com/robert-wl/backend/pkg/utils"
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
	res, err := s.vendorRepo.FindAllByEvent(eventTypeID)

	if err != nil {
		return nil, utils.NotFoundError(
			err,
			"vendors not found",
		)
	}

	return res, nil
}
