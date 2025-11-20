package models

import "time"

type Activity struct {
	ID              uint      `json:"id" gorm:"primaryKey"`
	Title           string    `json:"title" gorm:"not null"`
	Description     string    `json:"description"`
	Category        string    `json:"category" gorm:"not null"`
	Instructor      string    `json:"instructor" gorm:"not null"`
	Day             string    `json:"day" gorm:"not null"`
	Schedule        string    `json:"schedule" gorm:"not null"`
	DurationMinutes int       `json:"duration_minutes" gorm:"not null"`
	Capacity        int       `json:"capacity" gorm:"not null"`
	ImageURL        string    `json:"image_url"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}
