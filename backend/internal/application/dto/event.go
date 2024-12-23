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
	Status  model.ResponseStatus `json:"status" binding:"required"`
	Remarks *string              `json:"remarks,omitempty"`
}
type GetEventRequest struct {
	*pagination.Pagination
	Search *string `form:"search,omitempty" binding:"omitempty"`
}