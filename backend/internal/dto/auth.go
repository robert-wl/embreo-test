package dto

type LogInRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LogInResponse struct {
	AccessToken string `json:"access_token"`
}
