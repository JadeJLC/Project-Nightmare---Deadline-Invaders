package handlers

import (
	"encoding/json"
	"log"
	"makeyourgame/api/models"
	"makeyourgame/api/services"
	"makeyourgame/api/storage"
	"net/http"
)

// Gère l'enregistrement d'un score
func ScoreHandler(store *storage.ScoreStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Requête à /scorehandler")

		var newScore models.GameScore

		if err := json.NewDecoder(r.Body).Decode(&newScore); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		if err := storage.AddScore(store, newScore); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		var rankedScore models.ScoreWithRank

		scores := storage.GetAll(store)
		sortedScores := services.SortScores(scores)
		rankedScores := services.GetRank(sortedScores)

		for _, score := range rankedScores {
			if score.Name == newScore.Name && score.Score == newScore.Score && score.Timestamp == newScore.Timestamp && score.Mode == newScore.Mode {
				rankedScore = score
			}
		}

		currentScore := services.GetPercentile(scores, rankedScore)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(currentScore)

	}
}
