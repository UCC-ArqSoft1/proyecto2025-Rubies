package controllers

import (
	"net/http"
	"strconv"

	"gimnasio-api/services"

	"github.com/gin-gonic/gin"
)

func Enroll(c *gin.Context) {
	userID, _ := c.Get("userID")
	activityID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	if err := services.EnrollUser(userID.(uint), uint(activityID)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Inscripción exitosa"})
}

func GetMyEnrollments(c *gin.Context) {
	userID, _ := c.Get("userID")

	activities, err := services.GetUserEnrollments(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener inscripciones"})
		return
	}

	c.JSON(http.StatusOK, activities)
}
