package models

// Comment public model generated by bindu
type Comment struct {
	Body   string
	BlogID uint64 `json:"-"`
	ItemID uint64 `json:"-"`
	UserID uint64 `json:"-"`
	User   User
	DefaultProperties
}

type CommentCreate struct {
	Body   string
	BlogID uint64
	ItemID uint64
	UserID uint64
	DefaultProperties
}
