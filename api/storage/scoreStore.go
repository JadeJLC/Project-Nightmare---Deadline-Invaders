package storage

import (
	"encoding/json"
	"makeyourgame/api/models"

	"os"
)

type ScoreStore struct {
	scores []models.GameScore
	path   string
}

// Fait une mémoire des scores
// pour les charger une seule fois au démarrage du serveur
func NewScoreStore(path string) (*ScoreStore, error) {
	store := &ScoreStore{
		scores: []models.GameScore{},
		path:   path,
	}

	file, err := os.Open(path)
	if err != nil {
		return store, nil
	}

	defer file.Close()

	if err := json.NewDecoder(file).Decode(&store.scores); err != nil {
		return nil, err
	}

	return store, nil

}

// Ajoute un score au fichier json
func AddScore(store *ScoreStore, score models.GameScore) error {
	store.scores = append(store.scores, score)
	return SaveToFile(store)
}

// Ecrit dans le fichier json
func SaveToFile(store *ScoreStore) error {
	file, err := os.Create(store.path)
	if err != nil {
		return err
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", " ")

	return encoder.Encode(store.scores)
}

// Récupère tous les scores
func GetAll(store *ScoreStore) []models.GameScore {
	return store.scores
}
