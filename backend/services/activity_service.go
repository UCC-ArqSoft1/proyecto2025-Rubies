package services

import (
	"gimnasio-api/config"
	"gimnasio-api/models"
)

func GetAllActivities() ([]models.Activity, error) {
	var activities []models.Activity
	result := config.DB.Find(&activities)
	return activities, result.Error
}

func GetActivityByID(id uint) (*models.Activity, error) {
	var activity models.Activity
	result := config.DB.First(&activity, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &activity, nil
}

func SearchActivities(term string) ([]models.Activity, error) {
	var activities []models.Activity
	searchTerm := "%" + term + "%"
	result := config.DB.Where(
		"title LIKE ? OR category LIKE ? OR schedule LIKE ? OR instructor LIKE ?",
		searchTerm, searchTerm, searchTerm, searchTerm,
	).Find(&activities)
	return activities, result.Error
}

func CreateActivity(activity *models.Activity) error {
	return config.DB.Create(activity).Error
}

func UpdateActivity(id uint, updated *models.Activity) error {
	var activity models.Activity
	if err := config.DB.First(&activity, id).Error; err != nil {
		return err
	}
	return config.DB.Model(&activity).Updates(updated).Error
}

func DeleteActivity(id uint) error {
	return config.DB.Delete(&models.Activity{}, id).Error
}
