package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type EventType struct {
	ID        uint      `json:"-" gorm:"primary_key"`
	SecureID  string    `json:"id" gorm:"type:char(36);uniqueIndex;not null"`
	Name      string    `json:"name" gorm:"uniqueIndex;not null"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime;not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime;not null"`
}

func (a *EventType) BeforeCreate(tx *gorm.DB) (err error) {
	a.SecureID = uuid.New().String()
	return
}
