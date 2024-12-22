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
