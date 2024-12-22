package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type Role string

const (
	CompanyRole Role = "company"
	VendorRole  Role = "vendor"
)

type User struct {
	ID        uint      `json:"-" gorm:"primary_key"`
	SecureID  string    `json:"id" gorm:"type:char(36);uniqueIndex;not null"`
	Username  string    `json:"username" gorm:"uniqueIndex;not null"`
	Password  string    `json:"-" gorm:"not null"`
	Role      Role      `json:"role" gorm:"not null;default:'company';check:role IN ('company', 'vendor')"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime;not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime;not null"`

	CompanyID *uint    `json:"-" gorm:"index"`
	VendorID  *uint    `json:"-" gorm:"index"`
	Company   *Company `json:"company,omitempty" gorm:"foreignKey:CompanyID"`
	Vendor    *Vendor  `json:"vendor,omitempty" gorm:"foreignKey:VendorID"`
}

func (a *User) BeforeCreate(tx *gorm.DB) (err error) {
	a.SecureID = uuid.New().String()
	return
}
