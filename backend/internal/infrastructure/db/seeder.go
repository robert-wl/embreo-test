package db

import (
	"fmt"
	"github.com/go-faker/faker/v4"
	"github.com/robert-wl/backend/internal/domain/model"
	"github.com/robert-wl/backend/pkg/utils"
	"gorm.io/gorm"
	"math/rand"
	"strings"
)

type Seeder interface {
	Seed() error
	SeedEventType() error
	SeedCompany() error
	SeedVendor() error
	SeedUser() error
	SeedEvent() error
}

type seeder struct {
	db *gorm.DB
}

func NewSeeder(db *gorm.DB) Seeder {
	return &seeder{
		db: db,
	}
}

func shuffleSlice[T any](slice []T) {
	rand.Shuffle(len(slice), func(i, j int) {
		slice[i], slice[j] = slice[j], slice[i]
	})
}

func (s *seeder) checkModelCount(model interface{}) (int64, error) {
	var count int64
	err := s.db.Model(model).Count(&count).Error
	return count, err
}

func (s *seeder) Seed() error {
	if err := s.SeedEventType(); err != nil {
		return err
	}
	fmt.Println("Seeded event types")

	if err := s.SeedCompany(); err != nil {
		return err
	}
	fmt.Println("Seeded companies")

	if err := s.SeedVendor(); err != nil {
		return err
	}
	fmt.Println("Seeded vendors")

	if err := s.SeedUser(); err != nil {
		return err
	}
	fmt.Println("Seeded users")

	if err := s.SeedEvent(); err != nil {
		return err
	}
	fmt.Println("Seeded events")

	return nil
}

var eventSelection = []string{
	"Conference",
	"Seminar",
	"Meeting",
	"Workshop",
	"Trade Show",
	"Networking",
	"Charity Event",
	"Product Launch",
	"Team Building",
	"Training",
	"Webinar",
	"Virtual Event",
	"Hybrid Event",
	"Exhibition",
	"Expo",
}

func (s *seeder) SeedEventType() error {
	if count, err := s.checkModelCount(&model.EventType{}); count > 0 || err != nil {
		return err
	}

	count := rand.Intn(10) + 5
	for i := 0; i < count; i++ {
		eventType := model.EventType{
			Name: eventSelection[i],
		}
		if err := s.db.Create(&eventType).Error; err != nil {
			return err
		}
	}

	return nil
}

var companyLetter = []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

func (s *seeder) SeedCompany() error {
	if count, err := s.checkModelCount(&model.Company{}); count > 0 || err != nil {
		return err
	}

	count := rand.Intn(10) + 5
	for i := 0; i < count; i++ {
		company := model.Company{
			Name: fmt.Sprintf("Company %s", string(companyLetter[i])),
		}
		if err := s.db.Create(&company).Error; err != nil {
			return err
		}
	}

	return nil
}

var vendorLetter = []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

func (s *seeder) SeedVendor() error {
	if count, err := s.checkModelCount(&model.Vendor{}); count > 0 || err != nil {
		return err
	}

	var eventTypes []model.EventType
	if err := s.db.Find(&eventTypes).Error; err != nil {
		return err
	}

	if len(eventTypes) == 0 {
		return nil
	}

	count := rand.Intn(10) + 5
	for i := 0; i < count; i++ {
		typeAmount := rand.Intn(len(eventTypes)) + 1
		shuffleSlice(eventTypes)
		selectedEventTypes := eventTypes[:typeAmount]

		vendor := model.Vendor{
			Name:       fmt.Sprintf("Vendor %s", string(vendorLetter[i])),
			EventTypes: selectedEventTypes,
		}
		if err := s.db.Create(&vendor).Error; err != nil {
			return err
		}
	}

	return nil
}

func (s *seeder) SeedUser() error {
	if count, err := s.checkModelCount(&model.User{}); count > 0 || err != nil {
		return err
	}

	var companies []model.Company
	if err := s.db.Find(&companies).Error; err != nil {
		return err
	}

	var vendors []model.Vendor
	if err := s.db.Find(&vendors).Error; err != nil {
		return err
	}

	if len(companies) == 0 && len(vendors) == 0 {
		return nil
	}

	count := rand.Intn(10) + 5
	roles := []model.Role{model.CompanyRole, model.VendorRole}

	for i := 0; i < count; i++ {
		username := strings.ReplaceAll(faker.Name(), " ", "-")
		password, err := utils.Encrypt(username)
		if err != nil {
			return err
		}

		role := roles[rand.Intn(len(roles))]

		var selectedCompany *model.Company
		var selectedVendor *model.Vendor
		if role == model.CompanyRole && len(companies) > 0 {
			randomIndex := rand.Intn(len(companies))
			selectedCompany = &companies[randomIndex]
		} else if role == model.VendorRole && len(vendors) > 0 {
			randomIndex := rand.Intn(len(vendors))
			selectedVendor = &vendors[randomIndex]
		}

		user := model.User{
			Username: username,
			Password: password,
			Role:     role,
			Company:  selectedCompany,
			Vendor:   selectedVendor,
		}

		if err := s.db.Create(&user).Error; err != nil {
			return err
		}
	}

	if err := s.seedDemoUser(); err != nil {
		return err
	}

	return nil
}

func (s *seeder) seedDemoUser() error {
	var companies []model.Company
	if err := s.db.Find(&companies).Error; err != nil {
		return err
	}

	var vendors []model.Vendor
	if err := s.db.Find(&vendors).Error; err != nil {
		return err
	}

	if len(companies) == 0 && len(vendors) == 0 {
		return nil
	}

	roles := []model.Role{model.CompanyRole, model.VendorRole}

	for i := 0; i < 2; i++ {
		var username string
		if i == 0 {
			username = "company"
		} else {
			username = "vendor"
		}
		password, err := utils.Encrypt(username)
		if err != nil {
			return err
		}

		role := roles[i]

		var selectedCompany *model.Company
		var selectedVendor *model.Vendor
		if role == model.CompanyRole && len(companies) > 0 {
			randomIndex := rand.Intn(len(companies))
			selectedCompany = &companies[randomIndex]
		} else if role == model.VendorRole && len(vendors) > 0 {
			randomIndex := rand.Intn(len(vendors))
			selectedVendor = &vendors[randomIndex]
		}

		user := model.User{
			Username: username,
			Password: password,
			Role:     role,
			Company:  selectedCompany,
			Vendor:   selectedVendor,
		}

		if err := s.db.Create(&user).Error; err != nil {
			return err
		}
	}

	return nil
}

func (s *seeder) SeedEvent() error {
	if count, err := s.checkModelCount(&model.Event{}); count > 0 || err != nil {
		return err
	}

	var companies []model.Company
	if err := s.db.Find(&companies).Error; err != nil {
		return err
	}

	var eventTypes []model.EventType
	if err := s.db.Find(&eventTypes).Error; err != nil {
		return err
	}

	var users []model.User
	if err := s.db.Find(&users).Error; err != nil {
		return err
	}

	if len(companies) == 0 && len(eventTypes) == 0 && len(users) == 0 {
		return nil
	}

	for _, company := range companies {
		count := rand.Intn(10) + 5
		for i := 0; i < count; i++ {
			randomEventType := eventTypes[rand.Intn(len(eventTypes))]
			randomUser := users[rand.Intn(len(users))]

			event := model.Event{
				Dates:     []string{faker.Date(), faker.Date(), faker.Date()},
				Location:  faker.Timezone(),
				Company:   &company,
				EventType: &randomEventType,
				User:      &randomUser,
			}

			if err := s.db.Create(&event).Error; err != nil {
				return err
			}
		}
	}

	return nil
}
