package models

import "time"

type Enrollment struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	UserID     uint      `json:"user_id" gorm:"not null"`
	ActivityID uint      `json:"activity_id" gorm:"not null"`
	EnrolledAt time.Time `json:"enrolled_at" gorm:"autoCreateTime"`

	User     User     `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Activity Activity `json:"activity,omitempty" gorm:"foreignKey:ActivityID"`
}
