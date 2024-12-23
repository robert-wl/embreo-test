package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/robert-wl/backend/internal/domain/service"
	"github.com/robert-wl/backend/pkg/utils"
	"net/http"
)

type VendorHandler struct {
	vendorService service.VendorService
}

func NewVendorHandler(vs service.VendorService) *VendorHandler {
	return &VendorHandler{
		vendorService: vs,
	}
}

// FindAllByEventType Find all vendors by event
// @Summary Find all vendors by event
// @Description Find all vendors by event
// @Tags vendor
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Event ID"
// @Success 200 {array} model.Vendor
// @Failure 400 {object} utils.ErrorResponse
// @Router /events/{id}/vendors [get]
func (h *VendorHandler) FindAllByEventType(ctx *gin.Context) {
	eventID := ctx.Param("id")

	vendors, err := h.vendorService.FindAllByEvent(eventID)

	if err != nil {
		utils.SendError(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, vendors)
}
