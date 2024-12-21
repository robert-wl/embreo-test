package service

import (
	"fmt"
	"github.com/robert-wl/backend/internal/dto"
	"github.com/robert-wl/backend/internal/infrastructure/repository"
	"github.com/robert-wl/backend/pkg/utils"
	"net/http"
)

type AuthService interface {
}

type authService struct {
	repo repository.UserRepository
}

func NewAuthService(r repository.UserRepository) AuthService {
	return &authService{
		repo: r,
	}
}

func (s *authService) LogIn(dto *dto.LogInRequest) (*string, error) {
	user, err := s.repo.FindByUsername(dto.Username)

	if err != nil {
		return nil, utils.NewAppError(
			fmt.Errorf("user with username %s not found", dto.Username),
			http.StatusNotFound,
			"user not found",
		)
	}

	if !utils.Compare(user.Password, dto.Password) {
		return nil, utils.NewAppError(
			fmt.Errorf("invalid password"),
			http.StatusUnauthorized,
			"invalid password",
		)
	}

	token, err := utils.CreateJWT(user.Username, user.SecureID)

	if err != nil {
		return nil, utils.NewAppError(
			fmt.Errorf("failed to create token"),
			http.StatusInternalServerError,
			"failed to create token",
		)
	}

	return token, nil
}
