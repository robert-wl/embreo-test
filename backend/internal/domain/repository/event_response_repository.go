package repository

import "github.com/robert-wl/backend/internal/domain/model"

type EventResponseRepository interface {
	Create(eventResponse *model.EventResponse) error
}
