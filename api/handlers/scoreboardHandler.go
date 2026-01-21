package handlers

import (
	"encoding/json"
	"log"
	"makeyourgame/api/services"
	"makeyourgame/api/storage"
	"net/http"
	"strconv"
)

// Gère l'envoi des scores pour affichage
func ScoreboardHandler(store *storage.ScoreStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Requête à /scoreboardhandler")
		pageIndex := r.URL.Query().Get("page")

		page, err := strconv.Atoi(pageIndex)
		if err != nil || page < 1 {
			log.Printf("Erreur conversion ou page invalide: %v, utilisation page 1", err)
			page = 1
		}

		scores := storage.GetAll(store)
		pageScores := services.GetPaginatedScores(scores, page)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(pageScores)
	}
}
