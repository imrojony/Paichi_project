package bindu

import (
	"log"
	"os"
	"regexp"

	"github.com/joho/godotenv"
)

var DbStr DbConString

func Init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	DbStr = DbConString{
		DB_ADAPTER:  os.Getenv("DB_ADAPTER"),
		DB_HOST:     os.Getenv("DB_HOST"),
		DB_DATABASE: os.Getenv("DB_DATABASE"),
		DB_PASSWORD: os.Getenv("DB_PASSWORD"),
		DB_PORT:     os.Getenv("DB_PORT"),
		DB_USERNAME: os.Getenv("DB_USERNAME"),
	}
}

type DbConString struct {
	DB_ADAPTER  string
	DB_HOST     string
	DB_PORT     string
	DB_DATABASE string
	DB_USERNAME string
	DB_PASSWORD string
}

var (
	emailRegexp = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
)

// IsValidEmailFormat Email invalid formate checker
func IsValidEmailFormat(email string) bool {
	if !emailRegexp.MatchString(email) {
		return false
	}
	return true
}
