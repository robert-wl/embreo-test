package model

import (
	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
	"time"
)

type Event struct {
	ID          uint           `json:"-" gorm:"primary_key"`
	SecureID    string         `json:"id" gorm:"type:char(36);uniqueIndex;not null"`
	CompanyID   uint           `json:"company_id" gorm:"not null"`
	UserID      uint           `json:"user_id" gorm:"not null"`
	EventTypeID uint           `json:"event_type_id" gorm:"not null"`
	Dates       pq.StringArray `json:"dates" gorm:"type:timestamp[];not null" swaggertype:"array,string" format:"date-time"`
	Location    string         `json:"location" gorm:"not null"`
	CreatedAt   time.Time      `json:"created_at" gorm:"autoCreateTime;not null"`
	UpdatedAt   time.Time      `json:"updated_at" gorm:"autoUpdateTime;not null"`

	Company   *Company   `json:"company,omitempty" gorm:"foreignKey:CompanyID"`
	EventType *EventType `json:"event_type,omitempty" gorm:"foreignKey:EventTypeID"`
	User      *User      `json:"user,omitempty" gorm:"foreignKey:UserID"`
}

func (a *Event) BeforeCreate(tx *gorm.DB) (err error) {
	a.SecureID = uuid.New().String()
	return
}
