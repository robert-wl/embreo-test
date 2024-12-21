package utils

import (
	"github.com/golang-jwt/jwt/v4"
	"github.com/robert-wl/backend/config"
	"time"
)

func CreateJWT(username, secureID string) (*string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"issuer": username,
			"sub":    secureID,
			"exp":    time.Now().Add(time.Hour).Unix(),
		})

	key := config.Get().JWTKey

	jwtString, err := token.SignedString([]byte(key))

	if err != nil {
		return nil, err
	}

	return &jwtString, nil
}
