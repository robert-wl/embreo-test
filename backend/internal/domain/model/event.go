package model

import (
	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
	"time"
)

type Event struct {
	ID         uint           `json:"-" gorm:"primary_key"`
	SecureID   string         `json:"id" gorm:"type:char(36);uniqueIndex;not null"`
	Dates      pq.StringArray `json:"dates" gorm:"type:timestamp[];not null" swaggertype:"array,string" format:"date-time"`
	Location   string         `json:"location" gorm:"not null"`
	ApprovedAt *time.Time     `json:"approved_at" gorm:"default:null"`
	CreatedAt  time.Time      `json:"created_at" gorm:"autoCreateTime;not null"`
	UpdatedAt  time.Time      `json:"updated_at" gorm:"autoUpdateTime;not null"`

	Status         EventStatus `json:"status" gorm:"-"`
	ApprovedVendor Vendor      `json:"approved_vendor" gorm:"-"`

	CompanyID   uint       `json:"-" gorm:"not null"`
	Company     *Company   `json:"company,omitempty" gorm:"foreignKey:CompanyID"`
	EventTypeID uint       `json:"-" gorm:"not null"`
	EventType   *EventType `json:"event_type,omitempty" gorm:"foreignKey:EventTypeID"`
	UserID      uint       `json:"-" gorm:"not null"`
	User        *User      `json:"user,omitempty" gorm:"foreignKey:UserID"`

	EventResponses []EventResponse `json:"event_responses,omitempty" gorm:"foreignKey:EventID"`
}

type EventStatus string

// TODO this logic
const (
	EventPending  EventStatus = "pending"
	EventApproved EventStatus = "approved"
)

func (a *Event) BeforeCreate(tx *gorm.DB) (err error) {
	a.SecureID = uuid.New().String()
	return
}
