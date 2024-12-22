package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/dto"
	"github.com/robert-wl/backend/internal/service"
	"github.com/robert-wl/backend/pkg/utils"
	"net/http"
)

type EventHandler struct {
	eventService service.EventService
}

func NewEventHandler(es service.EventService) *EventHandler {
	return &EventHandler{
		eventService: es,
	}
}

// CreateEvent @Summary Create an event
// @Description Create an event
// @Tags event
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param event body dto.CreateEventRequest true "Event"
// @Success 201
// @Failure 400 {object} utils.ErrorResponse
// @Router /events [post]
func (h *EventHandler) CreateEvent(ctx *gin.Context) {
	user := ctx.MustGet("user").(*model.User)

	var req dto.CreateEventRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.SendError(ctx, err)
		return
	}

	err := h.eventService.CreateEvent(user, &req)

	if err != nil {
		utils.SendError(ctx, err)
		return
	}

	ctx.JSON(http.StatusCreated, nil)
}

// FindAll @Summary Find all events
// @Description Find all events
// @Tags event
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param page query int false "Page"
// @Param limit query int false "Limit"
// @Param search query string false "Search"
// @Success 200 {array} model.Event
// @Failure 400 {object} utils.ErrorResponse
// @Router /events [get]
func (h *EventHandler) FindAll(ctx *gin.Context) {
	user := ctx.MustGet("user").(*model.User)
	var req dto.GetEventRequest

	if err := ctx.ShouldBindQuery(&req); err != nil {
		utils.SendError(ctx, err)
		return
	}

	res, err := h.eventService.FindAll(user, &req)

	if err != nil {
		utils.SendError(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, res)
}

// FindBySecureID @Summary Find event by secure id
// @Description Find event by secure id
// @Tags event
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Secure ID"
// @Success 200 {object} model.Event
// @Failure 400 {object} utils.ErrorResponse
// @Router /events/{id} [get]
func (h *EventHandler) FindBySecureID(ctx *gin.Context) {
	user := ctx.MustGet("user").(*model.User)

	id := ctx.Param("id")

	res, err := h.eventService.FindBySecureId(user, id)

	if err != nil {
		utils.SendError(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, res)
}

// FindAllType @Summary Find all event types
// @Description Find all event types
// @Tags event
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {array} model.EventType
// @Failure 400 {object} utils.ErrorResponse
// @Router /events/types [get]
func (h *EventHandler) FindAllType(ctx *gin.Context) {
	res, err := h.eventService.FindAllType()

	if err != nil {
		utils.SendError(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, res)
}
