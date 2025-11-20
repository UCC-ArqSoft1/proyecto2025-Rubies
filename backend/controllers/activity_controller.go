package controllers

import (
	"net/http"
	"strconv"

	"gimnasio-api/models"
	"gimnasio-api/services"

	"github.com/gin-gonic/gin"
)

func GetActivities(c *gin.Context) {
	search := c.Query("search")

	var activities []models.Activity
	var err error

	if search != "" {
		activities, err = services.SearchActivities(search)
	} else {
		activities, err = services.GetAllActivities()
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener actividades"})
		return
	}

	c.JSON(http.StatusOK, activities)
}

func GetActivity(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	activity, err := services.GetActivityByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Actividad no encontrada"})
		return
	}

	c.JSON(http.StatusOK, activity)
}

func CreateActivity(c *gin.Context) {
	var activity models.Activity
	if err := c.ShouldBindJSON(&activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	if err := services.CreateActivity(&activity); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al crear actividad"})
		return
	}

	c.JSON(http.StatusCreated, activity)
}

func UpdateActivity(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var activity models.Activity
	if err := c.ShouldBindJSON(&activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	if err := services.UpdateActivity(uint(id), &activity); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar actividad"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Actividad actualizada"})
}

func DeleteActivity(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	if err := services.DeleteActivity(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al eliminar actividad"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Actividad eliminada"})
}
