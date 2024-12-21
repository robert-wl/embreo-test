package service

import "github.com/robert-wl/backend/internal/infrastructure/repository"

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
