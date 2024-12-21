package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/robert-wl/backend/docs"
	"github.com/robert-wl/backend/internal/handler"
	"github.com/robert-wl/backend/internal/handler/middleware"
	"github.com/robert-wl/backend/internal/infrastructure/repository"
	"github.com/robert-wl/backend/internal/service"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"gorm.io/gorm"
)

func NewRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	userRepo := repository.NewUserRepository(db)

	authService := service.NewAuthService(userRepo)

	authHandler := handler.NewAuthHandler(authService)

	docs.SwaggerInfo.Title = "Embreo Backend API"

	corsConfig := cors.New(cors.Config{
		AllowOrigins: []string{"localhost:5173"},
,		AllowMethods: []string{"PUT", "PATCH", "GET", "POST", "DELETE"},
		AllowHeaders: []string{"Content-Type, access-control-allow-origin, access-control-allow-headers, Authorization"},
	})

	authMiddleware := middleware.AuthMiddleware(userRepo)

	r.Use(corsConfig)

	v1 := r.Group("/api/v1")
	{
		v1.GET("/ping", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "pong",
			})
		})

		auth := v1.Group("/auth")
		{
			auth.POST("/login", authHandler.LogIn)

			auth.GET("/me", authMiddleware, authHandler.Me)
		}
	}

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	return r
}
