package main

import (
	"github.com/sohag1990/Paichi/app/models"
	"github.com/sohag1990/Paichi/bindu"
	"github.com/sohag1990/Paichi/db"
)

func main() {
	bindu.Init()
	db.Con()
	db.DB.AutoMigrate(models.Image{})
	db.DB.AutoMigrate(models.Blog{})
	db.DB.AutoMigrate(models.CasbinRule{})
	db.DB.AutoMigrate(models.Comment{})
	db.DB.AutoMigrate(models.CommentCreate{})
	db.DB.AutoMigrate(models.Contact{})
	db.DB.AutoMigrate(models.Item{})
	db.DB.AutoMigrate(models.Profile{})
	db.DB.AutoMigrate(models.User{})
	defer db.DB.Close()
}