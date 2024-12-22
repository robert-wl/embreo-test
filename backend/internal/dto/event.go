package dto

import "github.com/robert-wl/backend/pkg/pagination"

type CreateEventRequest struct {
	CompanyID   string   `json:"company_id" binding:"required,uuid"`
	EventTypeID string   `json:"event_type_id" binding:"required,uuid"`
	Location    string   `json:"location" binding:"required"`
	Dates       []string `json:"dates" binding:"required,min=3,max=3"`
}

type GetEventRequest struct {
	*pagination.Pagination
	Search *string `form:"search,omitempty" binding:"omitempty"`
}
