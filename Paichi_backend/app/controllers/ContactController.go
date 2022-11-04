package controllers

import (

	"github.com/gin-gonic/gin"
	"github.com/sohag1990/Paichi/app/models"
	"github.com/sohag1990/Paichi/db"
)

// Contact public controllers generated by bindu

// IndexContact to get all data
func IndexContact(c *gin.Context) {
	page := c.Params.ByName("page")
	limit := 10
	var db = db.DB
	var contacts []models.Contact
	db.Find(&contacts).Offset(page).Limit(limit)

	c.JSON(200, contacts)
}

// ShowContact to get single data
func ShowContact(c *gin.Context) {
	id := c.Params.ByName("id")
	var db = db.DB
	var contact models.Contact
	db.Where("id=?",id).Find(&contact)

	c.JSON(200, contact)
}

// CreateContact to a new data
func CreateContact(c *gin.Context) {
	var db = db.DB
	var contact models.Contact
	c.BindJSON(&contact)
	db.Create(&contact)

	c.JSON(200, contact)
}

// UpdateContact to Update data
func UpdateContact(c *gin.Context) {
	id := c.Params.ByName("id")
	var db = db.DB
	var contact models.Contact
	var contact2 models.Contact
	c.BindJSON(&contact)
	if err := db.Where("id=?",id).Find(&contact2).Error; err != nil {
		c.JSON(404, contact2)
		return
	}

	db.Model(&contact2).Update(&contact)

	c.JSON(200, contact)
}

// DestroyContact to delete single data
func DestroyContact(c *gin.Context) {
	id := c.Params.ByName("id")
	var db = db.DB
	var contact models.Contact
	if err := db.Where("id=?",id).Find(&contact).Error; err != nil {
		c.JSON(404, contact)
		return
	}

	db.Delete(&contact)

	c.JSON(200, contact)
}
