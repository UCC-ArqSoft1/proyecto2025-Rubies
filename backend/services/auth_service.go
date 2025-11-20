package services

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"os"
	"time"

	"gimnasio-api/config"
	"gimnasio-api/models"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(getJWTSecret())

func getJWTSecret() string {
	if secret := os.Getenv("JWT_SECRET"); secret != "" {
		return secret
	}
	return "mi_clave_secreta_default"
}

type Claims struct {
	UserID uint   `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// HashPassword genera hash SHA256 de la contraseña
func HashPassword(password string) string {
	hash := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hash[:])
}

// GenerateToken genera un token JWT
func GenerateToken(user models.User) (string, error) {
	claims := Claims{
		UserID: user.ID,
		Email:  user.Email,
		Role:   user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

// ValidateToken valida un token JWT y retorna los claims
func ValidateToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(t *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, errors.New("token inválido")
}

// Login autentica un usuario
func Login(email, password string) (string, error) {
	var user models.User
	result := config.DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return "", errors.New("credenciales inválidas")
	}

	if user.PasswordHash != HashPassword(password) {
		return "", errors.New("credenciales inválidas")
	}

	return GenerateToken(user)
}

// Register crea un nuevo usuario
func Register(email, password, firstName, lastName, role string) (*models.User, error) {
	user := models.User{
		Email:        email,
		PasswordHash: HashPassword(password),
		FirstName:    firstName,
		LastName:     lastName,
		Role:         role,
	}

	result := config.DB.Create(&user)
	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}
