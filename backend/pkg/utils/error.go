package utils

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"log"
	"net/http"
)

type ErrorResponse struct {
	StatusCode int      `json:"status_code"`
	Message    string   `json:"message"`
	Error      []string `json:"error"`
}

func NewErrorResponse(message string, code int, errors ...string) *ErrorResponse {
	return &ErrorResponse{
		code,
		message,
		errors,
	}
}

type AppError struct {
	Err     error
	Code    int
	Message string
}

func (e *AppError) Error() string {
	return e.Message
}

func (e *AppError) Unwrap() error {
	return e.Err
}

func NewAppError(err error, code int, message string) *AppError {
	return &AppError{
		Err:     err,
		Code:    code,
		Message: message,
	}
}

func BadRequestError(err error, message string) *AppError {
	return NewAppError(err, http.StatusBadRequest, message)
}

func InternalServerError(err error, message string) *AppError {
	return NewAppError(err, http.StatusInternalServerError, message)
}

func NotFoundError(err error, message string) *AppError {
	return NewAppError(err, http.StatusNotFound, message)
}

func UnauthorizedError(err error, message string) *AppError {
	return NewAppError(err, http.StatusUnauthorized, message)
}

func ForbiddenError(err error, message string) *AppError {
	return NewAppError(err, http.StatusForbidden, message)
}

func formatValidationErrors(validationErrors validator.ValidationErrors) []string {
	var formattedErrors []string

	for _, fieldError := range validationErrors {
		err := fmt.Sprintf(
			"field: %s has an incorrect format: %s",
			fieldError.Field(),
			fieldError.Tag(),
		)

		formattedErrors = append(formattedErrors, err)
	}

	return formattedErrors
}

func SendError(ctx *gin.Context, err error) {
	var appErr *AppError
	if errors.As(err, &appErr) {
		ctx.JSON(
			appErr.Code,
			NewErrorResponse(
				http.StatusText(appErr.Code),
				appErr.Code,
				appErr.Message,
			),
		)
		return
	}

	var valErr validator.ValidationErrors
	if errors.As(err, &valErr) {
		ctx.JSON(
			http.StatusBadRequest,
			NewErrorResponse(
				http.StatusText(http.StatusBadRequest),
				http.StatusBadRequest,
				formatValidationErrors(valErr)...,
			),
		)
		return
	}

	log.Println("An unexpected error occurred: ", err)
	ctx.JSON(
		http.StatusInternalServerError,
		NewErrorResponse(
			http.StatusText(http.StatusInternalServerError),
			http.StatusInternalServerError,
			"An unexpected error occurred. Please try again later.",
		),
	)
}
