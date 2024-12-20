package main

import (
	"fmt"
	"github.com/robert-wl/backend/internal/router"
)

func main() {
	fmt.Println("Hello, world!")

	r := router.NewRouter()

	err := r.Run(fmt.Sprintf(":%s", "8080"))

	if err != nil {
		panic(err)
	}

}
