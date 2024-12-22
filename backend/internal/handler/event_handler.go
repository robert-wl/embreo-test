package handler

import (
	"github.com/gin-gonic/gin"
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
