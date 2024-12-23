package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/robert-wl/backend/internal/infrastructure/repository"
	"github.com/robert-wl/backend/pkg/utils"
	"net/http"
	"strings"
)

func AuthMiddleware(repo repository.UserRepository) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		header := ctx.GetHeader("Authorization")

		if header == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, utils.NewErrorResponse(
				"Unauthorized",
				http.StatusUnauthorized,
				"token is required",
			))
			return
		}

		header = strings.Replace(header, "Bearer ", "", 1)

		token := strings.Replace(header, "Bearer ", "", 1)

		user, err := utils.ParseJWT(token)

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, utils.NewErrorResponse(
				"Unauthorized",
				http.StatusUnauthorized,
				"invalid token",
			))
			return
		}

		user, err = repo.FindBySecureID(user.SecureID)

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, utils.NewErrorResponse(
				"Unauthorized",
				http.StatusUnauthorized,
				"invalid token",
			))
			return
		}

		ctx.Set("user", user)
	}
}
