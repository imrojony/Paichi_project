package models

// CasbinRule model
type CasbinRule struct {
	DefaultProperties
	PType string `gorm:"column:p_type"`
	V0    string `gorm:"column:v0"`
	V1    string `gorm:"column:v1"`
	V2    string `gorm:"column:v2"`
}

// TableName Set TableName name to be `casbin_rule`
func (CasbinRule) TableName() string {
	return "casbin_rule"
}
