package model

import "time"

type EventResponse struct {
	ID        uint      `json:"id"`
	SecureID  string    `json:"secure_id"`
	EventID   uint      `json:"event_id"`
	VendorID  uint      `json:"vendor_id"`
	Status    string    `json:"status" gorm:"not null;default:'pending';check:status IN ('pending', 'approved', 'rejected')"`
	Remarks   string    `json:"remarks"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime;not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime;not null"`

	Event  Event  `json:"event" gorm:"foreignKey:EventID"`
	Vendor Vendor `json:"vendor" gorm:"foreignKey:VendorID"`
}
