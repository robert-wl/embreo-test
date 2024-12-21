package router

import (
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

	authMiddleware := middleware.AuthMiddleware(userRepo)

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
