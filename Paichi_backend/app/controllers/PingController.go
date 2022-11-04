package controllers

import (
	"fmt"
	"time"

	"github.com/sohag1990/Paichi/db"
	"github.com/gin-gonic/gin"
)

func Ping(c *gin.Context) {

	pingErr := db.DB.DB().Ping()
	if pingErr != nil {
		fmt.Println(pingErr)
		c.AbortWithError(400, pingErr)
	} else {
		fmt.Println("Connected")
	}
	time.Sleep(time.Duration(3) * time.Second)

	c.JSON(200, "pong")
}
