package model

import "time"

type Vendor struct {
	ID        uint      `json:"-" gorm:"primary_key"`
	SecureID  string    `json:"secure_id" gorm:"type:char(36);uniqueIndex;not null"`
	Name      string    `json:"name" gorm:"uniqueIndex;not null"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime;not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime;not null"`

	EventTypes []EventType `json:"event_types" gorm:"many2many:vendor_event_types;"`
	Users      []User      `json:"users" gorm:"foreignKey:VendorID"`
}
