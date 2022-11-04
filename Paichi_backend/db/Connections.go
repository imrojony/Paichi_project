package db

import (
	"fmt"

	"github.com/sohag1990/Paichi/bindu"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var DB *gorm.DB
var err error

func Con() {
	bindu.Init()
	adapter := bindu.DbStr.DB_ADAPTER
	host := bindu.DbStr.DB_HOST
	port := bindu.DbStr.DB_PORT
	dbName := bindu.DbStr.DB_DATABASE
	userName := bindu.DbStr.DB_USERNAME
	pass := bindu.DbStr.DB_PASSWORD
	switch adapter {
	case "mysql":
		DB, err = gorm.Open(adapter, userName+":"+pass+"@tcp("+host+":"+port+")/"+dbName+"?charset=utf8&parseTime=True&loc=Local")
	case "sqlite":
		DB, err = gorm.Open(adapter, userName+":"+pass+"@tcp("+host+":"+port+")/"+dbName+"?charset=utf8&parseTime=True&loc=Local")
	case "pgsql":
		DB, err = gorm.Open(adapter, userName+":"+pass+"@tcp("+host+":"+port+")/"+dbName+"?charset=utf8&parseTime=True&loc=Local")
	}

	// fmt.Println(bindu.DbStr)
	if err != nil {
		fmt.Println("statuse: ", err)
	}

	pingErr := DB.DB().Ping()
	if pingErr != nil {
		fmt.Println(pingErr)
	} else {
		fmt.Println("Connected")
	}
}
