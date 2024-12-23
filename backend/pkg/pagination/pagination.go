package pagination

import (
	"gorm.io/gorm"
)

type Pagination struct {
	Page  *int `form:"page,omitempty" binding:"omitempty,min=1"`
	Limit *int `form:"limit,omitempty" binding:"omitempty,min=1,max=99999"`
}

func (p *Pagination) Paginate() func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Offset((p.GetPage() - 1) * p.GetLimit()).Limit(p.GetLimit())
	}
}

func (p *Pagination) GetPage() int {
	if p.Page == nil || *p.Page < 1 {
		return 1
	}

	return *p.Page
}

func (p *Pagination) GetLimit() int {
	if p.Limit == nil || *p.Limit < 1 {
		return 99999
	}

	if *p.Limit > 99999 {
		return 99999
	}

	return *p.Limit
}

func Process(pagination *Pagination) *Pagination {
	if pagination == nil {
		return new(Pagination)
	}
	return pagination
}
