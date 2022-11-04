package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sohag1990/Paichi/bindu"
	"github.com/sohag1990/Paichi/db"
	"github.com/sohag1990/Paichi/routes"
)

var err error

func main() {

	bindu.Init()
	db.Con()

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		MaxAge: 15 * time.Second,
	}))
	r = routes.API(r)
	db.Con()
	// db.DB.AutoMigrate(models.Blog{})
	// db.DB.AutoMigrate(models.CasbinRule{})
	// db.DB.AutoMigrate(models.Comment{})
	// db.DB.AutoMigrate(models.Item{})
	// db.DB.AutoMigrate(models.Profile{})
	// db.DB.AutoMigrate(models.User{})
	// defer db.DB.Close()

	defer db.DB.Close()
	r.Run()
}
