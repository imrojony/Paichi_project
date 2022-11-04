package middlewares

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

//Cors set cors to routes
func Cors() gin.HandlerFunc {
	return cors.Default()
}

