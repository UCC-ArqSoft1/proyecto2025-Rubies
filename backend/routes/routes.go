package routes

import (
	"gimnasio-api/controllers"
	"gimnasio-api/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Rutas públicas de autenticación
	auth := r.Group("/api/auth")
	{
		auth.POST("/login", controllers.Login)
		auth.POST("/register", controllers.Register)
	}

	// Rutas públicas de actividades
	r.GET("/api/activities", controllers.GetActivities)
	r.GET("/api/activities/:id", controllers.GetActivity)

	// Rutas protegidas
	protected := r.Group("/api")
	protected.Use(middlewares.AuthMiddleware())
	{
		protected.POST("/activities/:id/enroll", controllers.Enroll)
		protected.GET("/my-enrollments", controllers.GetMyEnrollments)

		// Solo administradores
		admin := protected.Group("/admin")
		admin.Use(middlewares.AdminMiddleware())
		{
			admin.POST("/activities", controllers.CreateActivity)
			admin.PUT("/activities/:id", controllers.UpdateActivity)
			admin.DELETE("/activities/:id", controllers.DeleteActivity)
		}
	}
}
