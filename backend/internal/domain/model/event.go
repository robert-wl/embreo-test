package model

import "time"

type Event struct {
	ID          uint        `json:"-" gorm:"primary_key"`
	SecureID    string      `json:"id" gorm:"type:char(36);uniqueIndex;not null"`
	EventTypeID uint        `json:"event_type_id" gorm:"not null"`
	Dates       []time.Time `json:"dates" gorm:"type:json;not null"`
	Location    string      `json:"location" gorm:"not null"`

	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime;not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime;not null"`
}
