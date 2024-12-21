package db

import (
	"fmt"
	"github.com/robert-wl/backend/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func newDatabase() *gorm.DB {
	cfg := config.Get()

	user := cfg.PostgresUsername
	password := cfg.PostgresPassword
	host := cfg.PostgresHost
	port := cfg.PostgresPort
	dbName := cfg.PostgresDB

	url := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", user, password, host, port, dbName)

	db, err := gorm.Open(
		postgres.Open(url),
		&gorm.Config{},
	)

	if err != nil {
		panic("failed to connect db" + err.Error())
	}

	return db
}

func Get() *gorm.DB {
	if db == nil {
		db = newDatabase()
	}

	return db
}
