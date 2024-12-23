package dto

import (
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/pkg/pagination"
)

type CreateEventRequest struct {
	CompanyID   string   `json:"company_id" binding:"required,uuid"`
	EventTypeID string   `json:"event_type_id" binding:"required,uuid"`
	Location    string   `json:"location" binding:"required"`
	Dates       []string `json:"dates" binding:"required,min=3,max=3"`
}

type SetStatusRequest struct {
	Status     model.ResponseStatus `json:"status" binding:"required"`
	ApprovedAt *string              `json:"approved_at,omitempty"`
	Remarks    *string              `json:"remarks,omitempty"`
}
type GetEventRequest struct {
	*pagination.Pagination
	Search *string `form:"search,omitempty" binding:"omitempty"`
}

type GetEventTypeRequest struct {
	VendorID *string `form:"vendor_id,omitempty" binding:"omitempty"`
}
