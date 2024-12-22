package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type EventResponse struct {
	ID        uint      `json:"-"`
	SecureID  string    `json:"id"`
	EventID   uint      `json:"event_id"`
	VendorID  uint      `json:"vendor_id"`
	Status    string    `json:"status" gorm:"not null;default:'pending';check:status IN ('pending', 'approved', 'rejected')"`
	Remarks   string    `json:"remarks"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime;not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime;not null"`

	Event  Event  `json:"event" gorm:"foreignKey:EventID"`
	Vendor Vendor `json:"vendor" gorm:"foreignKey:VendorID"`
}

func (a *EventResponse) BeforeCreate(tx *gorm.DB) (err error) {
	a.SecureID = uuid.New().String()
	return
}
