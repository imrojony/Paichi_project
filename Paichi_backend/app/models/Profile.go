package models

// Profile public model generated by bindu
type Profile struct {
	FirstName		string
	LastName		string
	Image		string
	UserID uint64 `json:"-"`
	DefaultProperties
}