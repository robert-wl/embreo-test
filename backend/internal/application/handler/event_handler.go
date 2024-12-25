package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/robert-wl/backend/internal/application/dto"
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/internal/domain/service"
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

// CreateEvent Create an event
// @Summary Create an event
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

    ctx.StatusCreated()
}

// SetStatus Set event status
// @Summary Set event status
// @Description Set event status
// @Tags event
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Event ID"
// @Param status body dto.SetStatusRequest true "ResponseStatus"
// @Success 200
// @Failure 400 {object} utils.ErrorResponse
// @Router /events/{id}/status [post]
func (h *EventHandler) SetStatus(ctx *gin.Context) {
	user := ctx.MustGet("user").(*model.User)

	eventID := ctx.Param("id")

	var req dto.SetStatusRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.SendError(ctx, err)
		return
	}

	err := h.eventService.SetStatus(user, eventID, &req)

	if err != nil {
		utils.SendError(ctx, err)
		return
	}

    ctx.StatusOK()
}

// FindAll Find all events
// @Summary Find all events
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

// FindBySecureID Find event by secure id
// @Summary Find event by secure id
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

// FindAllType Find all event types
// @Summary Find all event types
// @Description Find all event types
// @Tags event
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param vendor_id query string false "Vendor ID"
// @Success 200 {array} model.EventType
// @Failure 400 {object} utils.ErrorResponse
// @Router /event/types [get]
func (h *EventHandler) FindAllType(ctx *gin.Context) {
	var req dto.GetEventTypeRequest

	if err := ctx.ShouldBindQuery(&req); err != nil {
		utils.SendError(ctx, err)
		return
	}

	res, err := h.eventService.FindAllType(&req)

	if err != nil {
		utils.SendError(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, res)
}
