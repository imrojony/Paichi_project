package controllers

import (
	"fmt"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/sohag1990/Paichi/app/models"
	"github.com/sohag1990/Paichi/db"
)

// Registration to a new user
func Registration(c *gin.Context) {
	var db = db.DB
	type registration struct {
		FirstName string
		LastName  string
		Email     string `gorm:"type:varchar(50);unique_index;default:null`
		Phone     string `gorm:"type:varchar(50);unique_index;default:null`
		Username  string `form:"username" json:"username" binding:"required";unique_index;default:null`
		Password  string `form:"password" json:"password" binding:"required" json:"-"`
	}
	var reg registration
	c.BindJSON(&reg)
	var user models.User
	user.Role = "subscriber"
	user.Profile.FirstName = reg.FirstName
	user.Profile.LastName = reg.LastName
	user.Email = reg.Email
	user.Username = reg.Username
	user.Password = reg.Password
	user.Phone = reg.Phone

	db.Create(&user)
	c.JSON(200, user)
}

// ShowUser to get single data
func ShowUser(c *gin.Context) {
	// fmt.Println("Dhukse")
	id := c.Params.ByName("un")
	var db = db.DB
	var user models.User
	db.Where("Username=?", id).Preload("Profile").Find(&user)

	user.Password = ""
	// fmt.Println(user)
	c.JSON(200, user)
}

// UpdateProfileImage update profile image

func UpdateProfileImage(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	username, _ := claims["id"]

	var user models.User

	var db = db.DB
	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		fmt.Println(err)
		return
	}

	var profile models.Profile
	var profile2 models.Profile
	c.BindJSON(&profile)
	if err := db.Where("user_id=?", user.ID).Find(&profile2).Error; err != nil {
		c.JSON(404, profile2)
		return
	}

	db.Model(&profile2).Update(&profile)

	c.JSON(200, profile)

}
