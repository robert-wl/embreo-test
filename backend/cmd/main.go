package main

import (
	"fmt"
	"github.com/robert-wl/backend/internal/infrastructure/db"
	"github.com/robert-wl/backend/internal/router"
)

// @title Embreo Backend API
// @version 1.0
// @description This is a backend server for Embreo Test.

// @host localhost:8080
// @BasePath /api/v1

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {
	database := db.Get()
	err := db.AutoMigrate(database)

	if err != nil {
		panic("failed to migrate db" + err.Error())
	}

	seeder := db.NewSeeder(database)
	err = seeder.SeedUser()

	if err != nil {
		panic("failed to migrate db" + err.Error())
	}

	r := router.NewRouter(database)

	err = r.Run(fmt.Sprintf(":%s", "8080"))

	if err != nil {
		panic(err)
	}

	fmt.Println("Server is running on port 8080")
}
