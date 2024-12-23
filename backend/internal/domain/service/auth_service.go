package service

import "github.com/robert-wl/backend/internal/application/dto"

type AuthService interface {
	LogIn(dto *dto.LogInRequest) (*string, error)
}
