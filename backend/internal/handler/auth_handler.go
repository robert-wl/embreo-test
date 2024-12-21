package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/robert-wl/backend/internal/dto"
	"github.com/robert-wl/backend/internal/service"
	"github.com/robert-wl/backend/pkg/utils"
	"net/http"
)

type AuthHandler struct {
	authService service.AuthService
}

func NewAuthHandler(authService service.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

// LogIn @Summary Log in a user
// @Description Authenticate a user with their credentials and return an access token
// @Tags authentication
// @Accept json
// @Produce json
// @Param request body dto.LogInRequest true "User credentials"
// @Success 200 {object} dto.LogInResponse
// @Failure 400 {object} utils.ErrorResponse
// @Router /auth/login [post]
func (h *AuthHandler) LogIn(ctx *gin.Context) {
	var req dto.LogInRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.SendError(ctx, err)
		return
	}

	token, err := h.authService.LogIn(&req)

	if err != nil {
		utils.SendError(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, dto.LogInResponse{
		AccessToken: *token,
	})
}
