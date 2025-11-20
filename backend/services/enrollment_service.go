package services

import (
	"errors"

	"gimnasio-api/config"
	"gimnasio-api/models"
)

func EnrollUser(userID, activityID uint) error {
	var activity models.Activity
	if err := config.DB.First(&activity, activityID).Error; err != nil {
		return errors.New("actividad no encontrada")
	}

	var existing models.Enrollment
	result := config.DB.Where("user_id = ? AND activity_id = ?", userID, activityID).First(&existing)
	if result.Error == nil {
		return errors.New("ya estás inscripto en esta actividad")
	}

	var count int64
	config.DB.Model(&models.Enrollment{}).Where("activity_id = ?", activityID).Count(&count)
	if int(count) >= activity.Capacity {
		return errors.New("no hay cupo disponible")
	}

	enrollment := models.Enrollment{
		UserID:     userID,
		ActivityID: activityID,
	}
	return config.DB.Create(&enrollment).Error
}

func GetUserEnrollments(userID uint) ([]models.Activity, error) {
	var activities []models.Activity
	err := config.DB.
		Joins("JOIN enrollments ON enrollments.activity_id = activities.id").
		Where("enrollments.user_id = ?", userID).
		Find(&activities).Error
	return activities, err
}
