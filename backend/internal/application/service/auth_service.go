package service

import (
	"fmt"
	"github.com/robert-wl/backend/internal/application/dto"
	"github.com/robert-wl/backend/internal/domain/repository"
	"github.com/robert-wl/backend/internal/domain/service"
	"github.com/robert-wl/backend/pkg/utils"
)

type authService struct {
	repo repository.UserRepository
}

func NewAuthService(r repository.UserRepository) service.AuthService {
	return &authService{
		repo: r,
	}
}

func (s *authService) LogIn(dto *dto.LogInRequest) (*string, error) {
	user, err := s.repo.FindByUsername(dto.Username)

	if err != nil {
		return nil, utils.NotFoundError(
			err,
			fmt.Sprintf("user with username %s not found", dto.Username),
		)
	}

	if !utils.Compare(user.Password, dto.Password) {
		return nil, utils.UnauthorizedError(
			nil,
			"invalid password",
		)
	}

	token, err := utils.CreateJWT(user.Username, user.SecureID)

	if err != nil {
		return nil, utils.InternalServerError(
			err,
			"failed to create token",
		)
	}

	return token, nil
}
